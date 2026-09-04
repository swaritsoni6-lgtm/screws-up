import { pgTable, uuid, numeric, varchar, timestamp } from "drizzle-orm/pg-core";
import { bookings } from "./bookings.js";

export const financialLedger = pgTable("financial_ledger", {
  transactionId: uuid("transaction_id").primaryKey().defaultRandom(),
  bookingId: uuid("booking_id").references(() => bookings.id).notNull(),
  totalAmount: numeric("total_amount", { precision: 12, scale: 2 }).notNull(),
  artisanShare88: numeric("artisan_share_88", { precision: 12, scale: 2 }).notNull(),
  welfarePool8: numeric("welfare_pool_8", { precision: 12, scale: 2 }).notNull(),
  platformFee4: numeric("platform_fee_4", { precision: 12, scale: 2 }).notNull(),
  escrowStatus: varchar("escrow_status", { length: 30 }).default("HELD").notNull(),
  upiTransactionRef: varchar("upi_transaction_ref", { length: 120 }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  settledAt: timestamp("settled_at", { withTimezone: true }),
});
