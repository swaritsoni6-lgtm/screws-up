import React from "react";

export function App() {
  return (
    <div style={{ padding: "32px", maxWidth: "1200px", margin: "0 auto" }}>
      <header style={{ borderBottom: "1px solid #334155", paddingBottom: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "800", color: "#f59e0b" }}>
            Screws Up <span style={{ color: "#f8fafc", fontWeight: "400" }}>Guild Master Console</span>
          </h1>
          <p style={{ margin: "4px 0 0 0", color: "#94a3b8", fontSize: "14px" }}>
            Cooperative Governance, Panchayat Hearings & Tool Library
          </p>
        </div>
        <span style={{ background: "#065f46", color: "#6ee7b7", padding: "4px 12px", borderRadius: "9999px", fontSize: "12px", fontWeight: "600" }}>
          Master Juror Active
        </span>
      </header>

      <main style={{ marginTop: "32px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
        <div style={{ background: "#1e293b", padding: "24px", borderRadius: "12px", border: "1px solid #334155" }}>
          <h2 style={{ fontSize: "18px", marginTop: 0, color: "#f8fafc" }}>⚖️ Panchayat Dispute Hearing Room</h2>
          <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: "1.5" }}>
            Active Blind Juror Cases: <strong>0 pending</strong>
          </p>
          <p style={{ color: "#64748b", fontSize: "13px" }}>
            When a customer contests work, 3 Guild Masters review photos and parts receipts anonymously.
          </p>
        </div>

        <div style={{ background: "#1e293b", padding: "24px", borderRadius: "12px", border: "1px solid #334155" }}>
          <h2 style={{ fontSize: "18px", marginTop: 0, color: "#f8fafc" }}>🧰 Cooperative Tool Pool</h2>
          <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: "1.5" }}>
            Available Heavy Machinery: <strong>48 units</strong> (Rotary Hammers, Drain Cameras, Core Cutters)
          </p>
          <p style={{ color: "#64748b", fontSize: "13px" }}>
            Funded by the 8% Welfare Pool. Leased to Journeyman and Master artisans at ₹50–₹100/day.
          </p>
        </div>
      </main>
    </div>
  );
}
