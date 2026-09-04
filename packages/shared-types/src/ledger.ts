import { EscrowStatus } from "./enums.js";

export interface LedgerSplitDTO {
  totalAmount: number;
  artisanShare88: number;
  welfarePool8: number;
  platformFee4: number;
}

export interface FinancialTransactionDTO {
  transactionId: string;
  bookingId: string;
  totalAmount: number;
  artisanShare88: number;
  welfarePool8: number;
  platformFee4: number;
  escrowStatus: EscrowStatus;
  upiTransactionRef?: string | null;
  createdAt: Date;
}

/**
 * Utility function to compute 88-8-4 split accurately
 */
export function calculateCooperativeSplit(totalAmount: number): LedgerSplitDTO {
  const roundedTotal = Math.round(totalAmount * 100) / 100;
  const artisanShare88 = Math.round(roundedTotal * 0.88 * 100) / 100;
  const welfarePool8 = Math.round(roundedTotal * 0.08 * 100) / 100;
  // Ensure the platform takes the exact remaining balance so sum === totalAmount
  const platformFee4 = Math.round((roundedTotal - artisanShare88 - welfarePool8) * 100) / 100;

  return {
    totalAmount: roundedTotal,
    artisanShare88,
    welfarePool8,
    platformFee4,
  };
}
