import { z } from "zod";
import { BookingStatus, ServiceCategory } from "./enums.js";

export const CoordinatesSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});
export type Coordinates = z.infer<typeof CoordinatesSchema>;

export const CreateBookingSchema = z.object({
  customerId: z.string().uuid(),
  serviceCategory: z.nativeEnum(ServiceCategory),
  subCategory: z.string().optional(),
  customerAddress: z.string().min(5),
  location: CoordinatesSchema,
  descriptionText: z.string().optional(),
  mediaUrls: z.array(z.string().url()).max(5).default([]),
  voiceNoteUrl: z.string().url().optional(),
  isPreferredArtisan: z.boolean().default(false),
  preferredArtisanId: z.string().uuid().optional(),
  baseLaborFee: z.number().positive(),
});
export type CreateBookingInput = z.infer<typeof CreateBookingSchema>;

export interface BookingDTO {
  id: string;
  customerId: string;
  artisanId?: string | null;
  serviceCategory: ServiceCategory;
  subCategory?: string | null;
  status: BookingStatus;
  customerAddress: string;
  location: Coordinates;
  descriptionText?: string | null;
  mediaUrls: string[];
  voiceNoteUrl?: string | null;
  baseLaborFee: number;
  partsTotalFee: number;
  finalAmount?: number | null;
  isPreferredArtisan: boolean;
  ftrClaimExpiresAt?: Date | null;
  hasCallbackOccurred: boolean;
  createdAt: Date;
  closedAt?: Date | null;
}
