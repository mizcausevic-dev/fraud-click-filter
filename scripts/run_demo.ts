import { payload, summary } from "../src/services/trafficFilterService";

console.log("fraud-click-filter demo");
console.log(JSON.stringify(summary(), null, 2));
console.log(JSON.stringify(payload().signals, null, 2));
