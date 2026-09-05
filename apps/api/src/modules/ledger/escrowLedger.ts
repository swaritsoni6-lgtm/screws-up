import { EscrowStatus, calculateCooperativeSplit, LedgerSplitDTO } from "@screws-up/shared-types";

export interface JournalEntry {
  entryId: string;
  transactionId: string;
  account: "ESCROW_HOLDING" | "CUSTOMER_PAYABLE" | "ARTISAN_UPI" | "WELFARE_POOL_8" | "PLATFORM_OPS_4";
  debit: number;
  credit: number;
  timestamp: Date;
}

export interface LedgerTransaction {
  transactionId: string;
  bookingId: string;
  totalAmount: number;
  split: LedgerSplitDTO;
  status: EscrowStatus;
  createdAt: Date;
  settledAt?: Date | null;
  journal: JournalEntry[];
}

export class EscrowLedgerService {
  private transactions: Map<string, LedgerTransaction> = new Map();
  private welfarePoolAccumulated: number = 24500.0; // Seed cooperative reserve (₹24,500)
  private platformOpsAccumulated: number = 8200.0; // Seed platform compute reserve (₹8,200)

  /**
   * 1. Hold Funds in Escrow upon customer payment confirmation
   */
  holdEscrow(bookingId: string, amount: number): LedgerTransaction {
    const transactionId = `txn_${crypto.randomUUID()}`;
    const split = calculateCooperativeSplit(amount);

    // Double-entry journal entries for escrow deposit
    const journal: JournalEntry[] = [
      {
        entryId: `j_${crypto.randomUUID()}`,
        transactionId,
        account: "ESCROW_HOLDING",
        debit: split.totalAmount,
        credit: 0,
        timestamp: new Date(),
      },
      {
        entryId: `j_${crypto.randomUUID()}`,
        transactionId,
        account: "CUSTOMER_PAYABLE",
        debit: 0,
        credit: split.totalAmount,
        timestamp: new Date(),
      },
    ];

    const transaction: LedgerTransaction = {
      transactionId,
      bookingId,
      totalAmount: split.totalAmount,
      split,
      status: EscrowStatus.HELD,
      createdAt: new Date(),
      journal,
    };

    this.transactions.set(bookingId, transaction);
    return transaction;
  }

  /**
   * 2. Settle 88-8-4 Split upon verified job completion
   */
  settleEscrow(bookingId: string): LedgerTransaction {
    const txn = this.transactions.get(bookingId);
    if (!txn) {
      throw new Error(`Transaction for booking ${bookingId} not found.`);
    }
    if (txn.status !== EscrowStatus.HELD) {
      throw new Error(`Cannot settle transaction in state: ${txn.status}`);
    }

    // Double-entry settlement entries:
    // Debit Escrow Holding, Credit Artisan (88%), Credit Welfare (8%), Credit Platform (4%)
    const settlementEntries: JournalEntry[] = [
      {
        entryId: `j_${crypto.randomUUID()}`,
        transactionId: txn.transactionId,
        account: "ESCROW_HOLDING",
        debit: 0,
        credit: txn.totalAmount,
        timestamp: new Date(),
      },
      {
        entryId: `j_${crypto.randomUUID()}`,
        transactionId: txn.transactionId,
        account: "ARTISAN_UPI",
        debit: txn.split.artisanShare88,
        credit: 0,
        timestamp: new Date(),
      },
      {
        entryId: `j_${crypto.randomUUID()}`,
        transactionId: txn.transactionId,
        account: "WELFARE_POOL_8",
        debit: txn.split.welfarePool8,
        credit: 0,
        timestamp: new Date(),
      },
      {
        entryId: `j_${crypto.randomUUID()}`,
        transactionId: txn.transactionId,
        account: "PLATFORM_OPS_4",
        debit: txn.split.platformFee4,
        credit: 0,
        timestamp: new Date(),
      },
    ];

    txn.journal.push(...settlementEntries);
    txn.status = EscrowStatus.RELEASED;
    txn.settledAt = new Date();

    // Increment cooperative welfare & platform accounts
    this.welfarePoolAccumulated += txn.split.welfarePool8;
    this.platformOpsAccumulated += txn.split.platformFee4;

    return txn;
  }

  /**
   * 3. Freeze payout when customer files a dispute
   */
  freezeForDispute(bookingId: string): LedgerTransaction {
    const txn = this.transactions.get(bookingId);
    if (!txn) {
      throw new Error(`Transaction for booking ${bookingId} not found.`);
    }
    txn.status = EscrowStatus.DISPUTED;
    return txn;
  }

  /**
   * Query live welfare balance & accounting status
   */
  getWelfarePoolStatus() {
    return {
      welfarePoolReserve: Math.round(this.welfarePoolAccumulated * 100) / 100,
      platformOpsReserve: Math.round(this.platformOpsAccumulated * 100) / 100,
      totalTransactionsProcessed: this.transactions.size,
      activeEscrowHoldCount: Array.from(this.transactions.values()).filter(
        (t) => t.status === EscrowStatus.HELD
      ).length,
      toolLibraryUnitsAvailable: 48,
    };
  }

  getTransaction(bookingId: string): LedgerTransaction | undefined {
    return this.transactions.get(bookingId);
  }

  getAllTransactions(): LedgerTransaction[] {
    return Array.from(this.transactions.values());
  }
}

export const globalEscrowLedger = new EscrowLedgerService();
