import type { FastifyPluginAsync } from "fastify";
import { globalEscrowLedger } from "../modules/ledger/escrowLedger.js";

export const ledgerRoutes: FastifyPluginAsync = async (fastify) => {
  // Live Welfare Pool & Platform Ops Reserve
  fastify.get("/api/v1/ledger/welfare-pool", async () => {
    return globalEscrowLedger.getWelfarePoolStatus();
  });

  // All Double-Entry Ledger Transactions
  fastify.get("/api/v1/ledger/transactions", async () => {
    return globalEscrowLedger.getAllTransactions();
  });

  // Transaction details for a specific booking
  fastify.get("/api/v1/ledger/transactions/:bookingId", async (request, reply) => {
    const { bookingId } = request.params as { bookingId: string };
    const txn = globalEscrowLedger.getTransaction(bookingId);
    if (!txn) {
      return reply.status(404).send({ error: "Transaction record not found" });
    }
    return txn;
  });
};
