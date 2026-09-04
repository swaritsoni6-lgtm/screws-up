import { z } from "zod";

export const ScanBarcodeSchema = z.object({
  bookingId: z.string().uuid(),
  barcode: z.string().min(4).max(64),
});
export type ScanBarcodeDTO = z.infer<typeof ScanBarcodeSchema>;

export interface VerifiedPartDTO {
  id: string;
  barcode: string;
  brand: string;
  partName: string;
  modelNumber?: string;
  distributorWholesalePrice: number;
  customerBilledPrice: number;
  standardFittingFee: number;
  warrantyMonths: number;
}
