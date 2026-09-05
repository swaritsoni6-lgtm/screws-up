import React, { useState } from "react";

interface JurorCase {
  id: string;
  bookingId: string;
  trade: string;
  customerClaim: string;
  artisanDefense: string;
  evidencePhoto: string;
  votesWorker: number;
  votesCustomer: number;
  myVote: "WORKER" | "CUSTOMER" | null;
  verdict: "PENDING" | "WORKER_UPHELD" | "CUSTOMER_REFUNDED";
}

interface ArtisanCohortMember {
  name: string;
  trade: string;
  tier: "APPRENTICE" | "JOURNEYMAN" | "MASTER";
  mfssScore: number;
  ftrRatio: number;
  todayEarnings: number;
  status: "AVAILABLE" | "ON_JOB" | "IDLE";
}

export function App() {
  const [welfareReserve, setWelfareReserve] = useState<number>(24580);
  const [activeTab, setActiveTab] = useState<"PANCHAYAT" | "COHORT" | "TOOLS">("PANCHAYAT");

  const [activeCase, setActiveCase] = useState<JurorCase>({
    id: "disp_sample_01",
    bookingId: "bk_9812",
    trade: "Electrical (MCB Installation)",
    customerClaim: "Technician installed 16A MCB instead of 32A, resulting in trip when water geyser is toggled.",
    artisanDefense: "Existing internal conduit wires are 1.5 sq mm; installing 32A breaker would cause concealed wire melting hazard.",
    evidencePhoto: "wire_gauge_inspection.jpg",
    votesWorker: 1,
    votesCustomer: 0,
    myVote: null,
    verdict: "PENDING",
  });

  const cohortList: ArtisanCohortMember[] = [
    { name: "Ravi Kumar", trade: "Electrical", tier: "MASTER", mfssScore: 92.4, ftrRatio: 96.8, todayEarnings: 440, status: "ON_JOB" },
    { name: "Shankar Narayan", trade: "Plumbing", tier: "MASTER", mfssScore: 89.5, ftrRatio: 94.2, todayEarnings: 880, status: "AVAILABLE" },
    { name: "Anand Gowda", trade: "Plumbing", tier: "JOURNEYMAN", mfssScore: 81.2, ftrRatio: 91.0, todayEarnings: 0, status: "AVAILABLE" },
    { name: "Manjunath S.", trade: "Electrical", tier: "JOURNEYMAN", mfssScore: 78.0, ftrRatio: 89.5, todayEarnings: 0, status: "AVAILABLE" },
    { name: "Imran Pasha", trade: "Carpentry", tier: "JOURNEYMAN", mfssScore: 75.6, ftrRatio: 88.0, todayEarnings: 350, status: "IDLE" },
  ];

  const handleVote = (voteType: "WORKER" | "CUSTOMER") => {
    if (activeCase.myVote) return;

    const newVotesWorker = voteType === "WORKER" ? activeCase.votesWorker + 1 : activeCase.votesWorker;
    const newVotesCustomer = voteType === "CUSTOMER" ? activeCase.votesCustomer + 1 : activeCase.votesCustomer;

    let newVerdict = activeCase.verdict;
    if (newVotesWorker >= 2) {
      newVerdict = "WORKER_UPHELD";
      setWelfareReserve((prev) => prev + 40); // Escrow settled
    } else if (newVotesCustomer >= 2) {
      newVerdict = "CUSTOMER_REFUNDED";
    }

    setActiveCase({
      ...activeCase,
      myVote: voteType,
      votesWorker: newVotesWorker,
      votesCustomer: newVotesCustomer,
      verdict: newVerdict,
    });
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0f172a", color: "#f8fafc", fontFamily: "Inter, system-ui, sans-serif" }}>
      {/* Top Navigation */}
      <header style={{ borderBottom: "1px solid #334155", backgroundColor: "#1e293b", padding: "16px 32px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "10px", backgroundColor: "#f59e0b", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "900", color: "#0f172a" }}>
              SU
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: "20px", fontWeight: "900", letterSpacing: "-0.5px" }}>
                Screws Up <span style={{ color: "#f59e0b" }}>Guild Console</span>
              </h1>
              <span style={{ fontSize: "11px", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px" }}>
                Labour Cooperative Federation • Bangalore District
              </span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ textAlign: "right" }}>
              <span style={{ fontSize: "11px", color: "#94a3b8", textTransform: "uppercase" }}>8% Welfare Pool Reserve</span>
              <div style={{ fontSize: "18px", fontWeight: "800", color: "#34d399" }}>₹{welfareReserve.toLocaleString()}</div>
            </div>
            <span style={{ background: "rgba(16, 185, 129, 0.2)", color: "#34d399", border: "1px solid rgba(16, 185, 129, 0.4)", padding: "4px 12px", borderRadius: "9999px", fontSize: "12px", fontWeight: "700" }}>
              Master Juror Active
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ maxWidth: "1200px", margin: "32px auto", padding: "0 32px" }}>
        {/* Navigation Tabs */}
        <div style={{ display: "flex", gap: "12px", borderBottom: "1px solid #334155", paddingBottom: "12px", marginBottom: "28px" }}>
          <button
            onClick={() => setActiveTab("PANCHAYAT")}
            style={{
              background: activeTab === "PANCHAYAT" ? "#f59e0b" : "transparent",
              color: activeTab === "PANCHAYAT" ? "#0f172a" : "#94a3b8",
              border: "none",
              padding: "8px 16px",
              borderRadius: "8px",
              fontWeight: "700",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            ⚖️ Panchayat Dispute Hearing Room
          </button>
          <button
            onClick={() => setActiveTab("COHORT")}
            style={{
              background: activeTab === "COHORT" ? "#f59e0b" : "transparent",
              color: activeTab === "COHORT" ? "#0f172a" : "#94a3b8",
              border: "none",
              padding: "8px 16px",
              borderRadius: "8px",
              fontWeight: "700",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            👥 Artisan Cohort & MFSS Scores
          </button>
          <button
            onClick={() => setActiveTab("TOOLS")}
            style={{
              background: activeTab === "TOOLS" ? "#f59e0b" : "transparent",
              color: activeTab === "TOOLS" ? "#0f172a" : "#94a3b8",
              border: "none",
              padding: "8px 16px",
              borderRadius: "8px",
              fontWeight: "700",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            🧰 Cooperative Tool Pool (48 Units)
          </button>
        </div>

        {/* Tab 1: Panchayat Dispute Room */}
        {activeTab === "PANCHAYAT" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "24px" }}>
            <div style={{ background: "#1e293b", borderRadius: "16px", padding: "28px", border: "1px solid #334155" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #334155", paddingBottom: "16px", marginBottom: "20px" }}>
                <div>
                  <span style={{ fontSize: "11px", color: "#f59e0b", textTransform: "uppercase", fontWeight: "700", letterSpacing: "1px" }}>
                    Active Blind Jury Case #{activeCase.id}
                  </span>
                  <h2 style={{ margin: "4px 0 0 0", fontSize: "18px", color: "#ffffff" }}>{activeCase.trade}</h2>
                </div>
                <span
                  style={{
                    background: activeCase.verdict === "PENDING" ? "#eab308" : activeCase.verdict === "WORKER_UPHELD" ? "#10b981" : "#ef4444",
                    color: "#0f172a",
                    fontWeight: "800",
                    fontSize: "11px",
                    padding: "4px 10px",
                    borderRadius: "6px",
                  }}
                >
                  {activeCase.verdict}
                </span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
                <div style={{ background: "#0f172a", padding: "16px", borderRadius: "12px", border: "1px solid #334155" }}>
                  <span style={{ fontSize: "11px", color: "#ef4444", fontWeight: "700", textTransform: "uppercase" }}>Customer Complaint</span>
                  <p style={{ fontSize: "13px", color: "#cbd5e1", marginTop: "6px", lineHeight: "1.5" }}>"{activeCase.customerClaim}"</p>
                </div>
                <div style={{ background: "#0f172a", padding: "16px", borderRadius: "12px", border: "1px solid #334155" }}>
                  <span style={{ fontSize: "11px", color: "#34d399", fontWeight: "700", textTransform: "uppercase" }}>Artisan Defense Statement</span>
                  <p style={{ fontSize: "13px", color: "#cbd5e1", marginTop: "6px", lineHeight: "1.5" }}>"{activeCase.artisanDefense}"</p>
                </div>
              </div>

              <div style={{ background: "#0f172a", padding: "16px", borderRadius: "12px", border: "1px solid #334155", marginBottom: "24px" }}>
                <span style={{ fontSize: "11px", color: "#94a3b8", fontWeight: "700", textTransform: "uppercase" }}>On-Site Evidence Review</span>
                <p style={{ fontSize: "13px", color: "#e2e8f0", marginTop: "4px" }}>
                  Attached Photo: <code style={{ color: "#f59e0b" }}>{activeCase.evidencePhoto}</code> (Wire cross-section micrometer gauge: 1.48 mm verified).
                </p>
              </div>

              {/* Juror Voting Controls */}
              {activeCase.myVote ? (
                <div style={{ background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.3)", padding: "16px", borderRadius: "12px", textAlign: "center" }}>
                  <p style={{ margin: 0, color: "#34d399", fontWeight: "700", fontSize: "14px" }}>
                    ✓ Your ballot was cryptographically cast: Voted {activeCase.myVote === "WORKER" ? "to Uphold Artisan" : "to Refund Customer"}.
                  </p>
                </div>
              ) : (
                <div>
                  <span style={{ fontSize: "12px", color: "#94a3b8", fontWeight: "700", textTransform: "uppercase", display: "block", marginBottom: "10px" }}>
                    Cast Your Ballot (Master Juror #2)
                  </span>
                  <div style={{ display: "flex", gap: "12px" }}>
                    <button
                      onClick={() => handleVote("WORKER")}
                      style={{ flex: 1, backgroundColor: "#10b981", color: "#ffffff", border: "none", padding: "12px", borderRadius: "10px", fontWeight: "700", cursor: "pointer" }}
                    >
                      🛡️ Uphold Artisan (Safety Protocol Followed)
                    </button>
                    <button
                      onClick={() => handleVote("CUSTOMER")}
                      style={{ flex: 1, backgroundColor: "#ef4444", color: "#ffffff", border: "none", padding: "12px", borderRadius: "10px", fontWeight: "700", cursor: "pointer" }}
                    >
                      ⚠️ Refund Customer (Defective Service)
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Quorum Tally Side Panel */}
            <div style={{ background: "#1e293b", borderRadius: "16px", padding: "24px", border: "1px solid #334155", height: "fit-content" }}>
              <h3 style={{ margin: "0 0 16px 0", fontSize: "16px", color: "#ffffff" }}>3-Master Quorum Tally</h3>
              <div style={{ marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "4px" }}>
                  <span style={{ color: "#94a3b8" }}>Votes for Artisan:</span>
                  <strong style={{ color: "#34d399" }}>{activeCase.votesWorker} / 2 required</strong>
                </div>
                <div style={{ height: "6px", backgroundColor: "#0f172a", borderRadius: "3px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${(activeCase.votesWorker / 2) * 100}%`, backgroundColor: "#34d399" }}></div>
                </div>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "4px" }}>
                  <span style={{ color: "#94a3b8" }}>Votes for Customer:</span>
                  <strong style={{ color: "#ef4444" }}>{activeCase.votesCustomer} / 2 required</strong>
                </div>
                <div style={{ height: "6px", backgroundColor: "#0f172a", borderRadius: "3px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${(activeCase.votesCustomer / 2) * 100}%`, backgroundColor: "#ef4444" }}></div>
                </div>
              </div>

              <p style={{ fontSize: "12px", color: "#64748b", lineHeight: "1.5", margin: 0 }}>
                💡 <strong>Cooperative Protection:</strong> If 2 of 3 Guild Masters uphold the worker, the escrowed 88% is released immediately with zero algorithmic penalties.
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: Cohort & MFSS Scores */}
        {activeTab === "COHORT" && (
          <div style={{ background: "#1e293b", borderRadius: "16px", padding: "24px", border: "1px solid #334155" }}>
            <h2 style={{ margin: "0 0 20px 0", fontSize: "18px" }}>Active District Artisan Roster & MFSS Calibration</h2>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #334155", color: "#94a3b8" }}>
                    <th style={{ padding: "12px" }}>Artisan Name</th>
                    <th style={{ padding: "12px" }}>Primary Trade</th>
                    <th style={{ padding: "12px" }}>Tier</th>
                    <th style={{ padding: "12px" }}>Coil MFSS Score</th>
                    <th style={{ padding: "12px" }}>30-Day FTR Ratio</th>
                    <th style={{ padding: "12px" }}>Today's Earnings</th>
                    <th style={{ padding: "12px" }}>Dispatch Status</th>
                  </tr>
                </thead>
                <tbody>
                  {cohortList.map((worker, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #334155" }}>
                      <td style={{ padding: "12px", fontWeight: "700", color: "#ffffff" }}>{worker.name}</td>
                      <td style={{ padding: "12px", color: "#cbd5e1" }}>{worker.trade}</td>
                      <td style={{ padding: "12px" }}>
                        <span style={{ fontSize: "11px", fontWeight: "700", background: worker.tier === "MASTER" ? "rgba(245, 158, 11, 0.2)" : "rgba(59, 130, 246, 0.2)", color: worker.tier === "MASTER" ? "#f59e0b" : "#60a5fa", padding: "2px 8px", borderRadius: "4px" }}>
                          {worker.tier}
                        </span>
                      </td>
                      <td style={{ padding: "12px", fontWeight: "800", color: "#f8fafc" }}>{worker.mfssScore}</td>
                      <td style={{ padding: "12px", color: "#34d399", fontWeight: "700" }}>{worker.ftrRatio}%</td>
                      <td style={{ padding: "12px", color: "#cbd5e1" }}>₹{worker.todayEarnings}</td>
                      <td style={{ padding: "12px" }}>
                        <span style={{ color: worker.status === "AVAILABLE" ? "#34d399" : worker.status === "ON_JOB" ? "#f59e0b" : "#94a3b8", fontWeight: "600" }}>
                          ● {worker.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Cooperative Tool Library */}
        {activeTab === "TOOLS" && (
          <div style={{ background: "#1e293b", borderRadius: "16px", padding: "24px", border: "1px solid #334155" }}>
            <h2 style={{ margin: "0 0 16px 0", fontSize: "18px" }}>Welfare Pool Equipment Vault</h2>
            <p style={{ color: "#94a3b8", fontSize: "14px", marginBottom: "24px" }}>
              Heavy machinery purchased via the 8% Cooperative Welfare Reserve. Available for member checkout at ₹50–₹100/day.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
              <div style={{ background: "#0f172a", padding: "16px", borderRadius: "12px", border: "1px solid #334155" }}>
                <h3 style={{ margin: "0 0 4px 0", fontSize: "15px", color: "#ffffff" }}>Bosch SDS-Max Rotary Hammer</h3>
                <p style={{ fontSize: "12px", color: "#94a3b8" }}>Total: 12 units • Available: <strong>8 units</strong></p>
                <span style={{ fontSize: "12px", color: "#f59e0b", fontWeight: "700" }}>₹75 / day lease</span>
              </div>

              <div style={{ background: "#0f172a", padding: "16px", borderRadius: "12px", border: "1px solid #334155" }}>
                <h3 style={{ margin: "0 0 4px 0", fontSize: "15px", color: "#ffffff" }}>FLIR E4 Thermal Imaging Camera</h3>
                <p style={{ fontSize: "12px", color: "#94a3b8" }}>Total: 6 units • Available: <strong>4 units</strong></p>
                <span style={{ fontSize: "12px", color: "#f59e0b", fontWeight: "700" }}>₹100 / day lease</span>
              </div>

              <div style={{ background: "#0f172a", padding: "16px", borderRadius: "12px", border: "1px solid #334155" }}>
                <h3 style={{ margin: "0 0 4px 0", fontSize: "15px", color: "#ffffff" }}>Rothenberger Pipe Inspection Snake</h3>
                <p style={{ fontSize: "12px", color: "#94a3b8" }}>Total: 8 units • Available: <strong>6 units</strong></p>
                <span style={{ fontSize: "12px", color: "#f59e0b", fontWeight: "700" }}>₹50 / day lease</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
