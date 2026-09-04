import type { FastifyPluginAsync } from "fastify";
import { ArtisanTelemetrySchema } from "@screws-up/shared-types";

export const artisanRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post("/api/v1/artisans/telemetry", async (request, reply) => {
    const parseResult = ArtisanTelemetrySchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send({
        error: "Invalid telemetry payload",
        details: parseResult.error.format(),
      });
    }

    const telemetry = parseResult.data;
    // Log telemetry - ingestion queue integration in Phase 1
    fastify.log.info({ artisanId: telemetry.artisanId, loc: telemetry.location }, "Artisan heartbeat received");

    return { success: true, recordedAt: new Date().toISOString() };
  });
};
