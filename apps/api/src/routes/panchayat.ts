import type { FastifyPluginAsync } from "fastify";
import { PanchayatVerdict } from "@screws-up/shared-types";
import { globalEscrowLedger } from "../modules/ledger/escrowLedger.js";

interface PanchayatCase {
  id: string;
  bookingId: string;
  customerClaim: string;
  artisanDefense: string;
  mediaUrls: string[];
  jurors: { jurorId: string; jurorName: string; hasVoted: boolean; vote?: "WORKER" | "CUSTOMER" }[];
  votesWorker: number;
  votesCustomer: number;
  verdict: PanchayatVerdict;
  createdAt: Date;
  resolvedAt?: Date | null;
}

// Seed active dispute cases for live testing
const disputeCases: Map<string, PanchayatCase> = new Map([
  [
    "disp_sample_01",
    {
      id: "disp_sample_01",
      bookingId: "bk_sample_99",
      customerClaim: "Technician installed 16A MCB instead of 32A, resulting in geyser breaker trip.",
      artisanDefense: "Existing internal conduit wires are 1.5 sq mm; installing 32A would cause wire melting hazard.",
      mediaUrls: ["https://s3.screwsup.in/media/dispute_wire_gauge.jpg"],
      jurors: [
        { jurorId: "juror-01", jurorName: "Master Juror #1 (HVAC)", hasVoted: true, vote: "WORKER" },
        { jurorId: "juror-02", jurorName: "Master Juror #2 (Electrical)", hasVoted: false },
        { jurorId: "juror-03", jurorName: "Master Juror #3 (Plumbing)", hasVoted: false },
      ],
      votesWorker: 1,
      votesCustomer: 0,
      verdict: PanchayatVerdict.PENDING,
      createdAt: new Date(Date.now() - 3600 * 1000 * 4),
    },
  ],
]);

export const panchayatRoutes: FastifyPluginAsync = async (fastify) => {
  // 1. Get all active dispute cases
  fastify.get("/api/v1/panchayat/disputes", async () => {
    return Array.from(disputeCases.values());
  });

  // 2. Cast juror vote
  fastify.post("/api/v1/panchayat/disputes/:id/vote", async (request, reply) => {
    const { id } = request.params as { id: string };
    const { jurorId, vote, jurorNotes } = (request.body as any) || {};

    const dispute = disputeCases.get(id);
    if (!dispute) {
      return reply.status(404).send({ error: "Dispute case not found" });
    }

    const juror = dispute.jurors.find((j) => j.jurorId === jurorId);
    if (!juror) {
      return reply.status(400).send({ error: "Juror not assigned to this case" });
    }
    if (juror.hasVoted) {
      return reply.status(400).send({ error: "Juror has already cast a vote" });
    }

    juror.hasVoted = true;
    juror.vote = vote;

    if (vote === "WORKER") dispute.votesWorker += 1;
    else dispute.votesCustomer += 1;

    // Check if majority reached (2 out of 3)
    if (dispute.votesWorker >= 2) {
      dispute.verdict = PanchayatVerdict.WORKER_UPHELD;
      dispute.resolvedAt = new Date();
      // Release escrowed payment to artisan
      try {
        globalEscrowLedger.settleEscrow(dispute.bookingId);
      } catch (e) {
        // Mock fallback if booking was seed
      }
    } else if (dispute.votesCustomer >= 2) {
      dispute.verdict = PanchayatVerdict.CUSTOMER_REFUNDED;
      dispute.resolvedAt = new Date();
    }

    return reply.send({
      success: true,
      case: dispute,
      verdictReached: dispute.verdict !== PanchayatVerdict.PENDING,
    });
  });
};
