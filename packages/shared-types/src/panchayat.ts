import { z } from "zod";
import { PanchayatVerdict } from "./enums.js";

export const SubmitVerdictSchema = z.object({
  disputeId: z.string().uuid(),
  jurorId: z.string().uuid(),
  verdict: z.enum(["UPHOLD_WORKER", "UPHOLD_CUSTOMER"]),
  jurorNotes: z.string().optional(),
});
export type SubmitVerdictDTO = z.infer<typeof SubmitVerdictSchema>;

export interface PanchayatDisputeDTO {
  id: string;
  bookingId: string;
  jurorIds: [string, string, string];
  verdict: PanchayatVerdict;
  votesWorker: number;
  votesCustomer: number;
  customerClaimText: string;
  technicianDefenseText?: string;
  mediaUrls: string[];
  createdAt: Date;
  closedAt?: Date | null;
}
