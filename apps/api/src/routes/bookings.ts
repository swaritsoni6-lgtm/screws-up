import type { FastifyPluginAsync } from "fastify";
import { CreateBookingSchema, BookingStatus, BookingDTO } from "@screws-up/shared-types";
import { findBestCandidate } from "../modules/dispatch/fairRotation.js";
import { globalEscrowLedger } from "../modules/ledger/escrowLedger.js";

// In-memory bookings store for rapid Phase 1 testing
const activeBookings: Map<string, any> = new Map();

export const bookingRoutes: FastifyPluginAsync = async (fastify) => {
  // 1. Create a new booking with Fair-Rotation dispatch & Escrow Hold
  fastify.post("/api/v1/bookings", async (request, reply) => {
    const parseResult = CreateBookingSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send({
        error: "Validation failed",
        details: parseResult.error.format(),
      });
    }

    const input = parseResult.data;
    const bookingId = crypto.randomUUID();

    // Find best nearby artisan via Fair-Rotation Engine
    const match = findBestCandidate(
      input.serviceCategory,
      input.location.latitude,
      input.location.longitude,
      5.0,
      input.preferredArtisanId
    );

    // Create 88-8-4 double-entry escrow record
    const ledgerTxn = globalEscrowLedger.holdEscrow(bookingId, input.baseLaborFee);

    const booking = {
      id: bookingId,
      customerId: input.customerId,
      artisanId: match?.candidate.id || null,
      assignedArtisan: match
        ? {
            id: match.candidate.id,
            fullName: match.candidate.fullName,
            phoneNumber: match.candidate.phoneNumber,
            tier: match.candidate.currentTier,
            mfssScore: match.candidate.mfssScore,
            distanceKm: match.distanceKm,
            priorityScore: match.priorityScore,
          }
        : null,
      serviceCategory: input.serviceCategory,
      subCategory: input.subCategory || null,
      status: match ? BookingStatus.DISPATCHED : BookingStatus.PENDING_TRIAGE,
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
      cooperativeSplit: ledgerTxn.split,
      escrowStatus: ledgerTxn.status,
    };

    activeBookings.set(bookingId, booking);
    return reply.status(201).send(booking);
  });

  // 2. Fetch specific booking
  fastify.get("/api/v1/bookings/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const booking = activeBookings.get(id);
    if (!booking) {
      return reply.status(404).send({ error: "Booking not found" });
    }
    return booking;
  });

  // 3. Pre-Visit Human Triage Confirmation (Artisan confirms parts needed)
  fastify.post("/api/v1/bookings/:id/triage-confirm", async (request, reply) => {
    const { id } = request.params as { id: string };
    const { partsPreAdvised, estimatedArrivalMins } = (request.body as any) || {};

    const booking = activeBookings.get(id);
    if (!booking) {
      return reply.status(404).send({ error: "Booking not found" });
    }

    booking.status = BookingStatus.ON_SITE;
    booking.triageNotes = {
      partsPreAdvised: partsPreAdvised || [],
      estimatedArrivalMins: estimatedArrivalMins || 20,
      confirmedAt: new Date(),
    };

    return reply.send({
      success: true,
      status: booking.status,
      triageNotes: booking.triageNotes,
    });
  });

  // 4. Complete Job & Settle 88-8-4 Escrow
  fastify.post("/api/v1/bookings/:id/complete", async (request, reply) => {
    const { id } = request.params as { id: string };
    const booking = activeBookings.get(id);
    if (!booking) {
      return reply.status(404).send({ error: "Booking not found" });
    }

    // Settle double-entry escrow
    const settledTxn = globalEscrowLedger.settleEscrow(id);

    booking.status = BookingStatus.COMPLETED;
    booking.closedAt = new Date();
    booking.escrowStatus = settledTxn.status;
    booking.ftrClaimExpiresAt = new Date(Date.now() + 30 * 24 * 3600 * 1000); // 30 days FTR window

    return reply.send({
      success: true,
      booking,
      payoutReleased: settledTxn.split,
    });
  });

  // 5. Dispute Job & Freeze Escrow for Panchayat Tribunal
  fastify.post("/api/v1/bookings/:id/dispute", async (request, reply) => {
    const { id } = request.params as { id: string };
    const { disputeReason } = (request.body as any) || {};

    const booking = activeBookings.get(id);
    if (!booking) {
      return reply.status(404).send({ error: "Booking not found" });
    }

    globalEscrowLedger.freezeForDispute(id);

    booking.status = BookingStatus.DISPUTED;
    booking.disputeReason = disputeReason || "Customer contested workmanship";
    booking.disputeId = `disp_${crypto.randomUUID()}`;

    return reply.send({
      success: true,
      status: booking.status,
      disputeId: booking.disputeId,
      message: "Escrow payment frozen. Case transferred to 3-Master Panchayat Tribunal.",
    });
  });
};
