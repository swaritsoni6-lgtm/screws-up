import { runDailyMfssAggregation } from "./jobs/dailyMfss.js";
import { runFtrAuditJob } from "./jobs/ftrAudit.js";

console.log("⚡ Screws Up Background Worker initialized.");

// Run initial check
await runFtrAuditJob();
await runDailyMfssAggregation();

console.log("⚡ Worker standing by for BullMQ queues (Redis: 6379)...");
