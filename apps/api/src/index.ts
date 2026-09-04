import Fastify from "fastify";
import cors from "@fastify/cors";
import sensible from "@fastify/sensible";
import { healthRoutes } from "./routes/health.js";
import { bookingRoutes } from "./routes/bookings.js";
import { artisanRoutes } from "./routes/artisans.js";

const fastify = Fastify({
  logger: {
    level: process.env.LOG_LEVEL || "info",
  },
});

await fastify.register(cors, {
  origin: true,
});
await fastify.register(sensible);

// Register routes
await fastify.register(healthRoutes);
await fastify.register(bookingRoutes);
await fastify.register(artisanRoutes);

const port = Number(process.env.PORT) || 4000;
const host = process.env.HOST || "0.0.0.0";

try {
  await fastify.listen({ port, host });
  fastify.log.info(`Screws Up API running at http://${host}:${port}`);
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
