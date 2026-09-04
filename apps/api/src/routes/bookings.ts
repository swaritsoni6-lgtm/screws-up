import type { FastifyPluginAsync } from "fastify";
import { CreateBookingSchema, BookingStatus } from "@screws-up/shared-types";
import { calculateCooperativeSplit } from "@screws-up/shared-types";

export const bookingRoutes: FastifyPluginAsync = async (fastify) => {
  // Create a new booking
  fastify.post("/api/v1/bookings", async (request, reply) => {
    const parseResult = CreateBookingSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send({
        error: "Validation failed",
        details: parseResult.error.format(),
      });
    }

    const input = parseResult.data;
    const split = calculateCooperativeSplit(input.baseLaborFee);

    // Initial mock response (database integration wired in next sprint)
    const booking = {
      id: crypto.randomUUID(),
      customerId: input.customerId,
      artisanId: input.preferredArtisanId || null,
      serviceCategory: input.serviceCategory,
      subCategory: input.subCategory || null,
      status: BookingStatus.PENDING_TRIAGE,
      customerAddress: input.customerAddress,
      location: input.location,
      descriptionText: input.descriptionText || null,
      mediaUrls: input.mediaUrls,
      voiceNoteUrl: input.voiceNoteUrl || null,
      baseLaborFee: input.baseLaborFee,
      partsTotalFee: 0,
      finalAmount: input.baseLaborFee,
      isPreferredArtisan: input.isPreferredArtisan,
      ftrClaimExpiresAt: null,
      hasCallbackOccurred: false,
      createdAt: new Date(),
      cooperativeSplit: split,
    };

    return reply.status(201).send(booking);
  });
};
