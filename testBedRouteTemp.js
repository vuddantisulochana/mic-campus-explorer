const { findShortestRoute } = require('./routingEngine');

(async () => {
  try {
    const route = await findShortestRoute('node-gate', 'node-bed');

    console.log("SUCCESS:", route.success);
    console.log("DISTANCE:", route.totalDistance);
    console.log("MINUTES:", route.estimatedMinutes);

    console.log("\nPATH:");
    route.pathNodes.forEach((n, i) => {
      console.log(`${i + 1}. ${n.id} -> ${n.label}`);
    });

    console.log("\nSTEPS:");
    route.steps.forEach(s => {
      console.log(`${s.stepNumber}. ${s.instruction} (${s.distance}m)`);
    });

  } catch (err) {
    console.error("\nROUTE ERROR:", err.message);
  }
})();
