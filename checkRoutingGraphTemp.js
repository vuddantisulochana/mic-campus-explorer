const { loadGraph } = require('./routingEngine');

(async () => {
  const { nodesMap, adjacency } = await loadGraph();

  console.log("Gate neighbors:");
  console.table(adjacency['node-gate']);

  console.log("East South neighbors:");
  console.table(adjacency['node-east-road-south']);

  console.log("East Mid neighbors:");
  console.table(adjacency['node-east-road-mid']);

  console.log("Central Mid neighbors:");
  console.table(adjacency['node-central-road-mid']);

  console.log("Main Junction neighbors:");
  console.table(adjacency['node-main-junction']);

  console.log("West BED Road neighbors:");
  console.table(adjacency['node-west-road-bed']);

  console.log("BED neighbors:");
  console.table(adjacency['node-bed']);
})();

