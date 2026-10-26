// Dijkstra Routing Engine for MIC Campus Navigation System
const { db } = require('./database');

// Fetch all nodes and edges from DB to construct path graph
function loadGraph() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM nav_nodes', (err, nodes) => {
      if (err) return reject(err);
      db.all('SELECT * FROM nav_edges', (err2, edges) => {
        if (err2) return reject(err2);

        const nodesMap = {};
        nodes.forEach(n => {
          nodesMap[n.id] = n;
        });

        const adjacency = {};
        nodes.forEach(n => {
          adjacency[n.id] = [];
        });
        edges.forEach(e => {
          if (adjacency[e.from_node] && adjacency[e.to_node]) {

            // Forward direction
            adjacency[e.from_node].push({
              node: e.to_node,
              distance: e.distance,
              hint: e.hint
            });

            // Reverse direction
            // All campus roads are usable in both directions
            adjacency[e.to_node].push({
              node: e.from_node,
              distance: e.distance,
              hint: `Continue towards ${nodesMap[e.from_node].label}.`
            });
          }
        });

        resolve({ nodesMap, adjacency });
      });
    });
  });
}

// Compute Shortest Path using Dijkstra Algorithm
async function findShortestRoute(startNodeId, targetNodeId) {
  const { nodesMap, adjacency } = await loadGraph();

  if (!nodesMap[startNodeId]) {
    throw new Error(`Starting location node "${startNodeId}" was not found.`);
  }
  if (!nodesMap[targetNodeId]) {
    throw new Error(`Destination location node "${targetNodeId}" was not found.`);
  }

  if (startNodeId === targetNodeId) {
    return {
      success: true,
      totalDistance: 0,
      estimatedMinutes: 0,
      pathNodes: [nodesMap[startNodeId]],
      steps: [
        {
          stepNumber: 1,
          instruction: `You are already at ${nodesMap[startNodeId].label}.`,
          distance: 0,
          floor: nodesMap[startNodeId].floor_id
        }
      ],
      spokenInstructions: [
        `You have already arrived at your destination, ${nodesMap[startNodeId].label}.`
      ],
      routeSummary: nodesMap[startNodeId].label
    };
  }

  const distances = {};
  const previous = {};
  const edgeHints = {};
  const unvisited = new Set();

  Object.keys(nodesMap).forEach(nodeId => {
    distances[nodeId] = Infinity;
    previous[nodeId] = null;
    unvisited.add(nodeId);
  });

  distances[startNodeId] = 0;

  while (unvisited.size > 0) {
    let current = null;
    let minDistance = Infinity;

    for (const node of unvisited) {
      if (distances[node] < minDistance) {
        minDistance = distances[node];
        current = node;
      }
    }

    if (current === null || distances[current] === Infinity) {
      break;
    }

    if (current === targetNodeId) {
      break;
    }

    unvisited.delete(current);

    const neighbors = adjacency[current] || [];

    for (const neighbor of neighbors) {
      if (!unvisited.has(neighbor.node)) continue;

      // Main Gate is only for entering/exiting the campus.
      // Never pass through Main Gate between two campus locations.
      if (
        neighbor.node === 'node-gate' &&
        startNodeId !== 'node-gate' &&
        targetNodeId !== 'node-gate'
      ) {
        continue;
      }

      const alt = distances[current] + neighbor.distance;
      if (alt < distances[neighbor.node]) {
        distances[neighbor.node] = alt;
        previous[neighbor.node] = current;
        edgeHints[`${current}->${neighbor.node}`] = {
          distance: neighbor.distance,
          hint: neighbor.hint
        };
      }
    }
  }

  if (distances[targetNodeId] === Infinity) {
    throw new Error(`No available walkable road found between ${nodesMap[startNodeId].label} and ${nodesMap[targetNodeId].label}. Note: Access is through the Main Gate only.`);
  }

  // Reconstruct path
  const path = [];
  let u = targetNodeId;
  while (u) {
    path.unshift(u);
    u = previous[u];
  }

  const pathNodes = path.map(nodeId => nodesMap[nodeId]);
  const steps = [];
  const spokenInstructions = [];

  spokenInstructions.push(`Starting navigation from ${pathNodes[0].label} to ${pathNodes[pathNodes.length - 1].label}.`);

  for (let i = 0; i < path.length - 1; i++) {
    const fromId = path[i];
    const toId = path[i + 1];
    const fromNode = nodesMap[fromId];
    const toNode = nodesMap[toId];
    const edgeData = edgeHints[`${fromId}->${toId}`] || { distance: 15, hint: `Proceed towards ${toNode.label}` };

    let instruction = `Follow paved road towards ${toNode.label}.`;

    // Dynamic contextual instruction based on node types and positions
    if (fromNode.floor_id !== toNode.floor_id && (fromNode.type === 'vertical' || toNode.type === 'vertical')) {
      const targetFloorName = toNode.floor_id ? (toNode.floor_id.includes('ff') ? 'First Floor' : toNode.floor_id.includes('sf') ? 'Second Floor' : 'Ground Floor') : 'Ground Level';
      instruction = `Take the central staircase or elevator to the ${targetFloorName}.`;
    } else if (toId === 'node-stair-gf') {
      instruction = `Enter Main Academic Block and proceed to the central staircase and elevator core.`;
    } else if (toId === 'node-macb-west-conn') {
      instruction = `Walk from Diploma Blocks across to Main Academic Block West entrance.`;
    } else if (toId === 'node-dip-conn') {
      instruction = `Walk along the paved walkway to Diploma Blocks.`;
    } else if (toId === 'node-bed') {
      instruction = `Turn into B.Ed Block entrance.`;
    } else if (toId === 'node-bh') {
      instruction = `Turn north into Boys Hostel entrance.`;
    } else if (toId === 'node-canteen') {
      instruction = `Turn into Campus Canteen & Auditorium.`;
    } else if (toId === 'node-labs') {
      instruction = `Turn west into Mechanical & Civil Engineering Labs.`;
    } else if (toId === 'node-gh') {
      instruction = `Enter Girls Hostel & Dining Hall gate.`;
    } else if (toId === 'node-macb-entrance') {
      instruction = `Walk straight up to the Grand Porch entrance of Main Academic Block.`;
    } else if (toId === 'node-lib-sf' || toId === 'node-lib-ff') {
      instruction = `Walk north along the corridor to enter Central Library.`;
    } else if (toId === 'node-west-road-south') {
      instruction = `Follow the road to the South-West junction corner.`;
    } else if (toId === 'node-south-road-bh') {
      instruction = `Follow the south paved road to the Boys Hostel front road junction.`;
    } else if (toId === 'node-south-road-gym') {
      instruction = `Follow the south paved road past Open Gym & Staff Quarters.`;
    } else if (toId === 'node-main-junction') {
      instruction = `Follow the central boulevard road to the main junction facing Main Academic Block.`;
    } else if (toId === 'node-east-road-mid') {
      instruction = `Follow the road to the Playground corner junction along the eastern avenue.`;
    } else if (edgeData.hint) {
      instruction = edgeData.hint;
    }

    steps.push({
      stepNumber: i + 1,
      fromNode: fromNode.label,
      toNode: toNode.label,
      distance: Math.round(edgeData.distance),
      instruction: instruction,
      floorChange: fromNode.floor_id !== toNode.floor_id,
      fromFloor: fromNode.floor_id,
      toFloor: toNode.floor_id,
      coordinates: { x: toNode.x, y: toNode.y }
    });

    spokenInstructions.push(instruction);
  }

  const totalDistanceMeters = Math.round(distances[targetNodeId]);
  const estimatedMinutes = Math.max(1, Math.round(totalDistanceMeters / 70));

  spokenInstructions.push(`You have reached ${pathNodes[pathNodes.length - 1].label}.`);

  // Always name the actual endpoints. Previously intermediate Main Block
  // nodes could make a route summary imply that the destination was MACB.
  let routeSummary = `${pathNodes[0].label} ➔ ${pathNodes[pathNodes.length - 1].label}`;
  const intermediateSummary = pathNodes.map(n => {
    if (n.id === 'node-bed') return 'BED Block';
    if (n.id === 'node-dip-conn') return 'Diploma Blocks';
    if (n.id === 'node-macb-west-conn') return 'Main Academic Block';
    if (n.id === 'node-stair-gf') return 'Ground Floor';
    if (n.id === 'node-stair-ff' || n.id === 'node-macb-foyer-ff') return 'First Floor';
    if (n.id === 'node-stair-sf' || n.id === 'node-macb-foyer-sf') return 'Second Floor';
    if (n.id === 'node-lib-sf' || n.id === 'node-lib-ff') return 'Central Library';
    if (n.id === 'node-gate') return 'Main Gate';
    if (n.id === 'node-bh') return 'Boys Hostel';
    if (n.id === 'node-canteen') return 'Canteen';
    if (n.id === 'node-labs') return 'Engg Labs';
    if (n.id === 'node-gh') return 'Girls Hostel';
    if (n.id === 'node-cse-gf') return 'CSE Dept';
    return null;
  }).filter((v, idx, arr) => v && arr.indexOf(v) === idx);
  // Keep intermediate landmarks only when they do not obscure the endpoint.
  if (intermediateSummary.length > 0) {
    routeSummary = `${pathNodes[0].label} ➔ ${intermediateSummary.join(' ➔ ')} ➔ ${pathNodes[pathNodes.length - 1].label}`;
  }

  return {
    success: true,
    origin: nodesMap[startNodeId],
    destination: nodesMap[targetNodeId],
    totalDistance: totalDistanceMeters,
    estimatedMinutes: estimatedMinutes,
    pathNodes: pathNodes,
    steps: steps,
    spokenInstructions: spokenInstructions,
    routeSummary: routeSummary
  };
}

module.exports = {
  loadGraph,
  findShortestRoute
};
