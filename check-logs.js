import { searchLogs } from "./src/tools/logs.js";

const result = await searchLogs({
  service: "payment",
  level: "ERROR",
  limit: 10
});

console.log(JSON.stringify(result, null, 2));