import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema/index.js";

export * from "./schema/index.js";

let client: postgres.Sql | null = null;

export function getDb(connectionString?: string) {
  const url = connectionString || process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/screws_up_db";
  if (!client) {
    client = postgres(url, { max: 10 });
  }
  return drizzle(client, { schema });
}

export type ScrewsUpDb = ReturnType<typeof getDb>;
