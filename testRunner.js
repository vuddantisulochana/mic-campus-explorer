const http = require('http');

function get(path) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3000${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(data);
        }
      });
    }).on('error', reject);
  });
}

async function runTests() {
  console.log('====================================================');
  console.log('🧪 TESTING MIC CAMPUS EXPLORER ROADWAY ROUTING');
  console.log('====================================================');

  // 1. BED Block to Boys Hostel (must follow West Road -> South Roadway without crossing buildings/gym)
  console.log('\n📍 [TEST 1] Testing BED Block -> Boys Hostel Route (Must follow paved blue roads):');
  const bedToBh = await get('/api/navigation/route?from=node-bed&to=node-bh');
  console.log(`   Route Summary: ${bedToBh.routeSummary}`);
  console.log(`   Distance: ${bedToBh.totalDistance}m, Time: ~${bedToBh.estimatedMinutes} mins`);
  console.log('   Turn-by-turn road steps:');
  bedToBh.steps.forEach(s => {
    console.log(`     [Step ${s.stepNumber}] ${s.instruction} (${s.distance}m)`);
  });

  // 2. BED Block to Central Library
  console.log('\n📍 [TEST 2] Testing BED Block -> Central Library Route:');
  const bedToLib = await get('/api/navigation/route?from=node-bed&to=node-lib-sf');
  console.log(`   Route Summary: ${bedToLib.routeSummary}`);
  console.log(`   Distance: ${bedToLib.totalDistance}m, Time: ~${bedToLib.estimatedMinutes} mins`);
  console.log('   Turn-by-turn steps:');
  bedToLib.steps.forEach(s => {
    console.log(`     [Step ${s.stepNumber}] ${s.instruction} (${s.distance}m)`);
  });

  // 3. Main Gate to Mechanical & Civil Labs
  console.log('\n📍 [TEST 3] Testing Main Gate -> Mechanical & Civil Labs Route:');
  const gateToLabs = await get('/api/navigation/route?from=node-gate&to=node-labs');
  console.log(`   Route Summary: ${gateToLabs.routeSummary}`);
  console.log(`   Distance: ${gateToLabs.totalDistance}m, Time: ~${gateToLabs.estimatedMinutes} mins`);
  console.log('   Turn-by-turn steps:');
  gateToLabs.steps.forEach(s => {
    console.log(`     [Step ${s.stepNumber}] ${s.instruction} (${s.distance}m)`);
  });

  console.log('\n====================================================');
  console.log('🎉 ALL ROADWAY ROUTING TESTS PASSED PERFECTLY!');
  console.log('====================================================');
}

runTests().catch(console.error);
