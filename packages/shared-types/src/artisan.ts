import { z } from "zod";
import { GuildTier, ServiceCategory } from "./enums.js";
import { CoordinatesSchema, Coordinates } from "./booking.js";

export const ArtisanTelemetrySchema = z.object({
  artisanId: z.string().uuid(),
  location: CoordinatesSchema,
  isAvailable: z.boolean(),
  timestamp: z.number(),
});
export type ArtisanTelemetryInput = z.infer<typeof ArtisanTelemetrySchema>;

export interface MfssScoreBreakdownDTO {
  mfssTotal: number;
  ftrScore: number;
  pgaScore: number;
  pbtScore: number;
  pisScore: number;
  tier: GuildTier;
  calculatedAt: Date;
}

export interface ArtisanDTO {
  id: string;
  userId: string;
  fullName: string;
  phoneNumber: string;
  primaryTrade: ServiceCategory;
  currentTier: GuildTier;
  mfssScore: number;
  ftrRatio: number;
  pgaScore: number;
  pbtScore: number;
  pisScore: number;
  totalCompletedJobs: number;
  currentLocation?: Coordinates | null;
  isAvailable: boolean;
  todayEarnings: number;
}
