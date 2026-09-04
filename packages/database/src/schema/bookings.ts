import { pgTable, uuid, varchar, numeric, boolean, timestamp, text, doublePrecision } from "drizzle-orm/pg-core";
import { users } from "./users.js";
import { artisans } from "./artisans.js";

export const bookings = pgTable("bookings", {
  id: uuid("id").primaryKey().defaultRandom(),
  customerId: uuid("customer_id").references(() => users.id).notNull(),
  artisanId: uuid("artisan_id").references(() => artisans.id),
  serviceCategory: varchar("service_category", { length: 50 }).notNull(),
  subCategory: varchar("sub_category", { length: 50 }),
  status: varchar("status", { length: 40 }).default("PENDING_TRIAGE").notNull(),
  customerAddress: text("customer_address").notNull(),
  latitude: doublePrecision("latitude").notNull(),
  longitude: doublePrecision("longitude").notNull(),
  descriptionText: text("description_text"),
  mediaUrls: text("media_urls").array(),
  voiceNoteUrl: text("voice_note_url"),
  baseLaborFee: numeric("base_labor_fee", { precision: 10, scale: 2 }).notNull(),
  partsTotalFee: numeric("parts_total_fee", { precision: 10, scale: 2 }).default("0.00").notNull(),
  finalAmount: numeric("final_amount", { precision: 10, scale: 2 }),
  isPreferredArtisan: boolean("is_preferred_artisan").default(false).notNull(),
  ftrClaimExpiresAt: timestamp("ftr_claim_expires_at", { withTimezone: true }),
  hasCallbackOccurred: boolean("has_callback_occurred").default(false).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  closedAt: timestamp("closed_at", { withTimezone: true }),
});
