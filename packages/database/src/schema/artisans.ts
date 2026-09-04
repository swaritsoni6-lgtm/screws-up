import { pgTable, uuid, varchar, numeric, integer, boolean, timestamp, doublePrecision } from "drizzle-orm/pg-core";
import { users } from "./users.js";

export const artisans = pgTable("artisans", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  primaryTrade: varchar("primary_trade", { length: 50 }).notNull(),
  currentTier: varchar("current_tier", { length: 30 }).default("APPRENTICE").notNull(),
  mfssScore: numeric("mfss_score", { precision: 5, scale: 2 }).default("60.00").notNull(),
  ftrRatio: numeric("ftr_ratio", { precision: 5, scale: 2 }).default("100.00").notNull(),
  pgaScore: numeric("pga_score", { precision: 3, scale: 2 }).default("4.00").notNull(),
  pbtScore: numeric("pbt_score", { precision: 5, scale: 2 }).default("75.00").notNull(),
  pisScore: numeric("pis_score", { precision: 5, scale: 2 }).default("90.00").notNull(),
  totalCompletedJobs: integer("total_completed_jobs").default(0).notNull(),
  todayEarnings: numeric("today_earnings", { precision: 10, scale: 2 }).default("0.00").notNull(),
  latitude: doublePrecision("latitude"),
  longitude: doublePrecision("longitude"),
  isAvailable: boolean("is_available").default(true).notNull(),
  lastAssignedAt: timestamp("last_assigned_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});
