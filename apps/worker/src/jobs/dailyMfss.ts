import { GuildTier } from "@screws-up/shared-types";

export interface MfssInputParams {
  ftrRatio: number; // 0 to 100
  pgaScore: number; // 1.00 to 5.00
  pbtScore: number; // 0 to 100
  pisScore: number; // 0 to 100
  totalCompletedJobs: number;
}

export function computeMfssScore(params: MfssInputParams): {
  score: number;
  tier: GuildTier;
} {
  // Normalize PGA from 1-5 scale to 0-100 scale
  const normalizedPga = Math.min(100, Math.max(0, ((params.pgaScore - 1) / 4) * 100));

  const weightedScore =
    0.5 * params.ftrRatio +
    0.25 * normalizedPga +
    0.15 * params.pbtScore +
    0.1 * params.pisScore;

  const score = Math.round(weightedScore * 100) / 100;

  // Determine Guild Tier
  let tier = GuildTier.APPRENTICE;
  if (score >= 85 && params.ftrRatio >= 92 && params.totalCompletedJobs >= 150) {
    tier = GuildTier.MASTER;
  } else if (score >= 65) {
    tier = GuildTier.JOURNEYMAN;
  }

  return { score, tier };
}

export async function runDailyMfssAggregation() {
  console.log("[Worker] Running Midnight MFSS Batch Computation...");
  // In Phase 3, this reads from PostgreSQL DB and updates all active artisans
  return { processed: 0, updated: 0 };
}
