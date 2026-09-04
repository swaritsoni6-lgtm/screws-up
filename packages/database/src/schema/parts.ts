import { pgTable, uuid, varchar, numeric, integer, timestamp } from "drizzle-orm/pg-core";
import { bookings } from "./bookings.js";

export const partsLedger = pgTable("parts_ledger", {
  id: uuid("id").primaryKey().defaultRandom(),
  bookingId: uuid("booking_id").references(() => bookings.id).notNull(),
  barcode: varchar("barcode", { length: 100 }).notNull(),
  brand: varchar("brand", { length: 100 }).notNull(),
  partName: varchar("part_name", { length: 150 }).notNull(),
  distributorWholesalePrice: numeric("distributor_wholesale_price", { precision: 10, scale: 2 }).notNull(),
  customerBilledPrice: numeric("customer_billed_price", { precision: 10, scale: 2 }).notNull(),
  warrantyMonths: integer("warranty_months").default(12).notNull(),
  scannedAt: timestamp("scanned_at", { withTimezone: true }).defaultNow().notNull(),
});
