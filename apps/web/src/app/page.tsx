"use client";

import { useState } from "react";

interface ArtisanMatch {
  name: string;
  phone: string;
  tier: "APPRENTICE" | "JOURNEYMAN" | "MASTER";
  trade: string;
  mfssScore: number;
  ftrRatio: number;
  distanceKm: number;
  estimatedArrivalMins: number;
}

export default function HomePage() {
  const [selectedTrade, setSelectedTrade] = useState<string>("ELECTRICAL");
  const [description, setDescription] = useState<string>("MCB switch sparks when water geyser is switched on");
  const [selectedPhoto, setSelectedPhoto] = useState<string>("sparking_mcb.jpg");
  const [address, setAddress] = useState<string>("Flat 402, Green Glen Layout, Bellandur, Bangalore");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [matchedArtisan, setMatchedArtisan] = useState<ArtisanMatch | null>(null);
  const [showPassport, setShowPassport] = useState<boolean>(false);

  // Trade benchmarks & standard labor base rates
  const tradeCatalog: Record<string, { label: string; icon: string; baseFee: number; sampleIssue: string; samplePhoto: string }> = {
    ELECTRICAL: {
      label: "Electrical",
      icon: "⚡",
      baseFee: 450,
      sampleIssue: "MCB switch sparks when water geyser is switched on",
      samplePhoto: "sparking_mcb.jpg",
    },
    PLUMBING: {
      label: "Plumbing",
      icon: "🚰",
      baseFee: 380,
      sampleIssue: "Concealed pipe leak under kitchen sink basin",
      samplePhoto: "sink_leak.jpg",
    },
    CARPENTRY: {
      label: "Carpentry",
      icon: "🪚",
      baseFee: 400,
      sampleIssue: "Master bedroom door sagging and latch jammed",
      samplePhoto: "door_hinge.jpg",
    },
    APPLIANCE: {
      label: "Appliances",
      icon: "🧊",
      baseFee: 550,
      sampleIssue: "Inverter refrigerator cooling coil frozen",
      samplePhoto: "fridge_ice.jpg",
    },
    EMERGENCY_SOS: {
      label: "1-Tap SOS Emergency",
      icon: "🚨",
      baseFee: 650,
      sampleIssue: "Main water line burst causing flooding in utility area",
      samplePhoto: "pipe_burst.jpg",
    },
  };

  const currentConfig = tradeCatalog[selectedTrade] || tradeCatalog.ELECTRICAL;

  // 88-8-4 Split Math
  const totalBill = currentConfig.baseFee;
  const worker88 = Math.round(totalBill * 0.88);
  const welfare8 = Math.round(totalBill * 0.08);
  const platform4 = totalBill - worker88 - welfare8;

  const handleTradeSelect = (key: string) => {
    setSelectedTrade(key);
    const item = tradeCatalog[key];
    if (item) {
      setDescription(item.sampleIssue);
      setSelectedPhoto(item.samplePhoto);
      setMatchedArtisan(null);
    }
  };

  const handleBookNow = () => {
    setIsSubmitting(true);
    setMatchedArtisan(null);

    // Simulate PostGIS Fair-Rotation matching query
    setTimeout(() => {
      setIsSubmitting(false);
      if (selectedTrade === "PLUMBING") {
        setMatchedArtisan({
          name: "Shankar Narayan",
          phone: "+91 98450 33456",
          tier: "MASTER",
          trade: "Plumbing",
          mfssScore: 89.5,
          ftrRatio: 94.2,
          distanceKm: 0.6,
          estimatedArrivalMins: 12,
        });
      } else if (selectedTrade === "CARPENTRY") {
        setMatchedArtisan({
          name: "Imran Pasha",
          phone: "+91 98450 55678",
          tier: "JOURNEYMAN",
          trade: "Carpentry",
          mfssScore: 75.6,
          ftrRatio: 88.0,
          distanceKm: 1.1,
          estimatedArrivalMins: 18,
        });
      } else {
        setMatchedArtisan({
          name: "Ravi Kumar",
          phone: "+91 98450 11234",
          tier: "MASTER",
          trade: "Electrical",
          mfssScore: 92.4,
          ftrRatio: 96.8,
          distanceKm: 0.2,
          estimatedArrivalMins: 8,
        });
      }
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Navigation Header */}
      <nav className="w-full bg-white border-b border-slate-200 sticky top-0 z-30 px-6 py-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-coop-amber-500 flex items-center justify-center text-white font-extrabold text-xl shadow-md">
              SU
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-slate-900">
                Screws <span className="text-coop-amber-600">Up</span>
              </span>
              <span className="block text-[11px] font-semibold text-slate-400 -mt-1 tracking-wider uppercase">
                Cooperative Guild Protocol
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowPassport(true)}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-700 hover:bg-slate-100 transition"
            >
              📒 Home Passport
            </button>
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-coop-green-50 border border-coop-green-500/30 text-coop-green-800 text-xs font-bold">
              <span className="h-2 w-2 rounded-full bg-coop-green-500 animate-pulse"></span>
              88-8-4 Worker Owned
            </div>
          </div>
        </div>
      </nav>

      {/* Main Interactive Container */}
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Interactive Show the Problem Booking Flow */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-coop-amber-50 border border-coop-amber-500/20 text-coop-amber-800 text-xs font-bold mb-4">
                <span>📸 Show the Problem</span>
                <span>•</span>
                <span>Human Pre-Visit Triage</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                Tell us what is broken.
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Upload a photo or video. A nearby certified artisan reviews it and arrives with genuine OEM parts on visit #1.
              </p>

              {/* Trade Selector */}
              <div className="mt-6">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                  1. Select Trade Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mt-2">
                  {Object.entries(tradeCatalog).map(([key, item]) => (
                    <button
                      key={key}
                      onClick={() => handleTradeSelect(key)}
                      className={`flex items-center gap-2 p-3 rounded-xl border text-left font-medium text-sm transition ${
                        selectedTrade === key
                          ? "border-coop-amber-600 bg-coop-amber-50/50 text-slate-900 ring-2 ring-coop-amber-500/20"
                          : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span className="truncate">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Photo & Video Simulator */}
              <div className="mt-6">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                  2. Upload Fault Photo / 30s Video
                </label>
                <div className="mt-2 p-4 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/70 flex flex-col sm:flex-row items-center gap-4">
                  <div className="h-16 w-16 rounded-xl bg-slate-200 flex items-center justify-center text-2xl text-slate-500 border border-slate-300 shrink-0">
                    📷
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <p className="text-sm font-semibold text-slate-800">
                      Attached Media: <code className="text-coop-amber-700 bg-coop-amber-100 px-2 py-0.5 rounded text-xs">{selectedPhoto}</code>
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Artisan inspects terminal connections & parts model before traveling.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => alert("Camera capture modal: Simulated in web preview")}
                    className="text-xs font-bold bg-white border border-slate-300 text-slate-700 px-3 py-2 rounded-lg hover:bg-slate-100"
                  >
                    Change File
                  </button>
                </div>
              </div>

              {/* Description Input */}
              <div className="mt-6">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                  3. Issue Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-coop-amber-500 bg-white"
                  placeholder="Describe the issue or unusual noises..."
                />
              </div>

              {/* Address Pin */}
              <div className="mt-6">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                  4. Service Address (Bangalore Cluster)
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-coop-amber-500 bg-white"
                />
              </div>

              {/* Book Action Button */}
              <div className="mt-8">
                <button
                  onClick={handleBookNow}
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-xl text-white font-extrabold text-base shadow-lg transition flex items-center justify-center gap-2 ${
                    selectedTrade === "EMERGENCY_SOS"
                      ? "bg-red-600 hover:bg-red-700 shadow-red-500/20"
                      : "bg-slate-900 hover:bg-slate-800 shadow-slate-900/20"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>PostGIS Fair-Rotation Matching...</span>
                    </>
                  ) : (
                    <>
                      <span>{selectedTrade === "EMERGENCY_SOS" ? "🚨 Dispatch Emergency SOS (10-Min)" : "Confirm Booking with Fair-Rotation"}</span>
                      <span>→</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: 88-8-4 Split Transparency & Live Dispatch Result */}
          <div className="lg:col-span-5 space-y-6">
            {/* Live Cooperative Ledger Breakdown */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Transparent Estimate
                  </span>
                  <div className="text-3xl font-black text-slate-900">
                    ₹{totalBill}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-coop-green-700 bg-coop-green-50 px-2.5 py-1 rounded-full border border-coop-green-500/20">
                    0% Middleman Gouge
                  </span>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-coop-green-500"></span>
                    <span className="font-semibold text-slate-700">88% Artisan Take-Home</span>
                  </div>
                  <span className="font-bold text-coop-green-700">₹{worker88}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-coop-amber-500"></span>
                    <span className="font-semibold text-slate-700">8% Cooperative Welfare Pool</span>
                  </div>
                  <span className="font-bold text-coop-amber-700">₹{welfare8}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-slate-400"></span>
                    <span className="font-semibold text-slate-700">4% Platform Operations</span>
                  </div>
                  <span className="font-bold text-slate-600">₹{platform4}</span>
                </div>
              </div>

              <div className="mt-5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 leading-relaxed">
                💡 <strong>Cooperative Guarantee:</strong> The 8% Welfare contribution finances community tool lockers (rotary hammers, drain cameras) and rainy-day liquidity for technicians.
              </div>
            </div>

            {/* Live Dispatch Match Card */}
            {matchedArtisan ? (
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 border border-slate-800 shadow-xl animate-fadeIn">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                  <span className="flex items-center gap-2 text-xs font-bold text-coop-green-400 uppercase tracking-wider">
                    <span className="h-2 w-2 rounded-full bg-coop-green-400 animate-ping"></span>
                    Artisan Dispatched
                  </span>
                  <span className="text-xs bg-coop-amber-500/20 text-coop-amber-400 border border-coop-amber-500/40 px-2.5 py-0.5 rounded-full font-bold">
                    {matchedArtisan.tier}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-coop-amber-500 flex items-center justify-center text-white font-black text-2xl shadow-inner shrink-0">
                    {matchedArtisan.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{matchedArtisan.name}</h3>
                    <p className="text-xs text-slate-400">
                      {matchedArtisan.trade} • {matchedArtisan.distanceKm} km away ({matchedArtisan.estimatedArrivalMins} mins ETA)
                    </p>
                    <p className="text-xs text-coop-amber-400 font-medium mt-0.5">
                      📞 {matchedArtisan.phone} (Proxy Masked)
                    </p>
                  </div>
                </div>

                {/* Coil's MFSS Metric Pill Bar */}
                <div className="mt-5 pt-4 border-t border-slate-800 grid grid-cols-2 gap-3 text-center">
                  <div className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/50">
                    <div className="text-lg font-black text-white">{matchedArtisan.mfssScore}</div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Coil MFSS Score</div>
                  </div>
                  <div className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/50">
                    <div className="text-lg font-black text-coop-green-400">{matchedArtisan.ftrRatio}%</div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">30-Day Zero Callback</div>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => alert("Triage Call: Connecting virtual telephony proxy...")}
                    className="flex-1 bg-coop-amber-500 text-slate-950 font-bold text-xs py-2.5 rounded-xl hover:bg-coop-amber-400 transition"
                  >
                    📞 Pre-Visit Voice Call
                  </button>
                  <button
                    onClick={() => alert("Preferred Artisan: Ravi Kumar saved to your 1-Tap list!")}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs px-3 py-2.5 rounded-xl border border-slate-700 transition"
                  >
                    ⭐ Make Preferred
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-8 rounded-3xl border border-dashed border-slate-300 bg-white text-center">
                <div className="text-3xl mb-2">📡</div>
                <h4 className="font-bold text-slate-800 text-sm">PostGIS Fair-Rotation Radar Ready</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                  Hit "Confirm Booking" to match with the nearest certified guild artisan based on wait-time & MFSS skill rating.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Home Health Passport Drawer / Modal */}
      {showPassport && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">📒</span>
                <h3 className="font-extrabold text-slate-900 text-lg">Home Health Passport</h3>
              </div>
              <button
                onClick={() => setShowPassport(false)}
                className="text-slate-400 hover:text-slate-700 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500 mt-2">
              Verified digital service record for <strong>{address}</strong>.
            </p>

            <div className="mt-4 space-y-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <div className="flex justify-between font-bold text-slate-800">
                  <span>Havells 32A C-Curve MCB Replacement</span>
                  <span className="text-coop-green-700">Active (10 Mo left)</span>
                </div>
                <p className="text-slate-500 mt-0.5">Installed by Ravi Kumar (Master) • Barcode: 8901234567890</p>
                <p className="text-[11px] text-slate-400">Scanned OEM Wholesale: ₹380 • Labor: ₹150</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <div className="flex justify-between font-bold text-slate-800">
                  <span>Jaquar Ceramic Tap Cartridge 35mm</span>
                  <span className="text-coop-green-700">Active (4 Mo left)</span>
                </div>
                <p className="text-slate-500 mt-0.5">Installed by Shankar Narayan (Master) • Barcode: 8909876543210</p>
                <p className="text-[11px] text-slate-400">Scanned OEM Wholesale: ₹220 • Labor: ₹160</p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowPassport(false)}
                className="bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-xl"
              >
                Close Passbook
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
