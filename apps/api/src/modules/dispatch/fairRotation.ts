import { ServiceCategory, GuildTier } from "@screws-up/shared-types";

export interface CandidateArtisan {
  id: string;
  fullName: string;
  phoneNumber: string;
  primaryTrade: ServiceCategory;
  currentTier: GuildTier;
  mfssScore: number;
  latitude: number;
  longitude: number;
  isAvailable: boolean;
  todayEarnings: number;
  lastCompletedJobAt: Date;
}

export interface DispatchMatchResult {
  candidate: CandidateArtisan;
  priorityScore: number;
  distanceKm: number;
  matchingBreakdown: {
    normalizedWait: number;
    normalizedMfss: number;
    normalizedEarnings: number;
    tierBonus: number;
  };
}

/**
 * Calculates Great-Circle distance using Haversine formula (km)
 */
export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 100) / 100;
}

// In-memory seed cohort of verified cooperative artisans (Bangalore cluster)
export const SEED_ARTISANS: CandidateArtisan[] = [
  {
    id: "art-ravi-01",
    fullName: "Ravi Kumar",
    phoneNumber: "+91 98450 11234",
    primaryTrade: ServiceCategory.ELECTRICAL,
    currentTier: GuildTier.MASTER,
    mfssScore: 92.4,
    latitude: 12.9285,
    longitude: 77.6755, // Bellandur (0.2 km away)
    isAvailable: true,
    todayEarnings: 440,
    lastCompletedJobAt: new Date(Date.now() - 3600 * 1000 * 3), // 3 hours ago
  },
  {
    id: "art-manjunath-02",
    fullName: "Manjunath S.",
    phoneNumber: "+91 98450 22345",
    primaryTrade: ServiceCategory.ELECTRICAL,
    currentTier: GuildTier.JOURNEYMAN,
    mfssScore: 78.0,
    latitude: 12.9340,
    longitude: 77.6820, // 1.2 km away
    isAvailable: true,
    todayEarnings: 0, // Hasn't earned yet today - boost in fair rotation!
    lastCompletedJobAt: new Date(Date.now() - 3600 * 1000 * 6), // 6 hours ago
  },
  {
    id: "art-shankar-03",
    fullName: "Shankar Narayan",
    phoneNumber: "+91 98450 33456",
    primaryTrade: ServiceCategory.PLUMBING,
    currentTier: GuildTier.MASTER,
    mfssScore: 89.5,
    latitude: 12.9250,
    longitude: 77.6710, // 0.6 km away
    isAvailable: true,
    todayEarnings: 880,
    lastCompletedJobAt: new Date(Date.now() - 3600 * 1000 * 1.5),
  },
  {
    id: "art-anand-04",
    fullName: "Anand Gowda",
    phoneNumber: "+91 98450 44567",
    primaryTrade: ServiceCategory.PLUMBING,
    currentTier: GuildTier.JOURNEYMAN,
    mfssScore: 81.2,
    latitude: 12.9310,
    longitude: 77.6790, // 0.8 km away
    isAvailable: true,
    todayEarnings: 0, // Needs income today
    lastCompletedJobAt: new Date(Date.now() - 3600 * 1000 * 5),
  },
  {
    id: "art-imran-05",
    fullName: "Imran Pasha",
    phoneNumber: "+91 98450 55678",
    primaryTrade: ServiceCategory.CARPENTRY,
    currentTier: GuildTier.JOURNEYMAN,
    mfssScore: 75.6,
    latitude: 12.9220,
    longitude: 77.6690, // 1.1 km away
    isAvailable: true,
    todayEarnings: 350,
    lastCompletedJobAt: new Date(Date.now() - 3600 * 1000 * 4),
  },
];

/**
 * Fair-Rotation Dispatch Engine
 * Calculates priority based on:
 * - Idle wait time (40%)
 * - MFSS Skill Score (35%)
 * - Inverted Daily Earnings (25%) -> prevents income skew across the cohort
 * - Tier bonus (Master: +0.15, Journeyman: +0.05, Apprentice: 0)
 */
export function findBestCandidate(
  category: ServiceCategory,
  customerLat: number,
  customerLon: number,
  maxRadiusKm = 5.0,
  preferredArtisanId?: string
): DispatchMatchResult | null {
  // 1. If preferred artisan specified and available, return directly
  if (preferredArtisanId) {
    const preferred = SEED_ARTISANS.find(
      (a) => a.id === preferredArtisanId && a.isAvailable
    );
    if (preferred) {
      const dist = calculateDistanceKm(
        customerLat,
        customerLon,
        preferred.latitude,
        preferred.longitude
      );
      return {
        candidate: preferred,
        priorityScore: 100.0,
        distanceKm: dist,
        matchingBreakdown: {
          normalizedWait: 1.0,
          normalizedMfss: preferred.mfssScore / 100,
          normalizedEarnings: 0,
          tierBonus: 0.15,
        },
      };
    }
  }

  // 2. Filter candidates by trade, availability, and radius
  const candidates = SEED_ARTISANS.filter((artisan) => {
    if (!artisan.isAvailable) return false;
    if (category !== ServiceCategory.EMERGENCY_SOS && artisan.primaryTrade !== category) {
      return false;
    }
    const dist = calculateDistanceKm(
      customerLat,
      customerLon,
      artisan.latitude,
      artisan.longitude
    );
    return dist <= maxRadiusKm;
  });

  if (candidates.length === 0) {
    return null;
  }

  // 3. Compute priority scores for each candidate
  const now = Date.now();
  const maxWaitSeconds = 3600 * 8; // 8 hours cap for normalization
  const dailyEarningsCap = 2500; // ₹2500 daily benchmark cap

  const scoredCandidates: DispatchMatchResult[] = candidates.map((candidate) => {
    const dist = calculateDistanceKm(
      customerLat,
      customerLon,
      candidate.latitude,
      candidate.longitude
    );
    const waitSeconds = Math.max(
      0,
      (now - candidate.lastCompletedJobAt.getTime()) / 1000
    );
    const normalizedWait = Math.min(1.0, waitSeconds / maxWaitSeconds);
    const normalizedMfss = candidate.mfssScore / 100;
    const normalizedEarnings = Math.min(
      1.0,
      candidate.todayEarnings / dailyEarningsCap
    );

    let tierBonus = 0.0;
    if (candidate.currentTier === GuildTier.MASTER) tierBonus = 0.15;
    else if (candidate.currentTier === GuildTier.JOURNEYMAN) tierBonus = 0.05;

    // Fair Priority Formula
    const priority =
      0.4 * normalizedWait +
      0.35 * normalizedMfss -
      0.25 * normalizedEarnings +
      tierBonus;

    return {
      candidate,
      priorityScore: Math.round(priority * 100) / 100,
      distanceKm: dist,
      matchingBreakdown: {
        normalizedWait,
        normalizedMfss,
        normalizedEarnings,
        tierBonus,
      },
    };
  });

  // Sort descending by priority score
  scoredCandidates.sort((a, b) => b.priorityScore - a.priorityScore);

  return scoredCandidates[0] || null;
}
