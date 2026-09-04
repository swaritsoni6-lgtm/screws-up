import { pgTable, uuid, varchar, integer, text, timestamp } from "drizzle-orm/pg-core";
import { bookings } from "./bookings.js";
import { artisans } from "./artisans.js";

export const panchayatDisputes = pgTable("panchayat_disputes", {
  id: uuid("id").primaryKey().defaultRandom(),
  bookingId: uuid("booking_id").references(() => bookings.id).unique().notNull(),
  juror1Id: uuid("juror_1_id").references(() => artisans.id).notNull(),
  juror2Id: uuid("juror_2_id").references(() => artisans.id).notNull(),
  juror3Id: uuid("juror_3_id").references(() => artisans.id).notNull(),
  verdict: varchar("verdict", { length: 30 }).default("PENDING").notNull(),
  votesWorker: integer("votes_worker").default(0).notNull(),
  votesCustomer: integer("votes_customer").default(0).notNull(),
  jurorComments: text("juror_comments"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  closedAt: timestamp("closed_at", { withTimezone: true }),
});
