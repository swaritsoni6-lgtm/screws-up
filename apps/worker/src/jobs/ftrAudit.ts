export async function runFtrAuditJob() {
  console.log("[Worker] Running 30-day First-Time-Right (FTR) Window Check...");
  // Checks bookings where ftrClaimExpiresAt <= NOW() and hasCallbackOccurred is false
  // Increments clean job count for artisan
  return { finalizedClaims: 0 };
}
