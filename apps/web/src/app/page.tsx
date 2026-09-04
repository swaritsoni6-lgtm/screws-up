export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 md:p-24">
      {/* Header */}
      <nav className="w-full max-w-6xl flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-coop-amber-500 flex items-center justify-center text-white font-bold text-xl shadow-md">
            SU
          </div>
          <span className="text-2xl font-black tracking-tight text-slate-900">
            Screws <span className="text-coop-amber-600">Up</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-coop-green-100 text-coop-green-700 border border-coop-green-500/20">
            88% Worker Owned
          </span>
          <button className="bg-slate-900 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-slate-800 transition">
            Book a Service
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="my-16 text-center max-w-4xl">
        <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-coop-amber-50 border border-coop-amber-500/30 text-coop-amber-700 font-medium text-sm">
          🛠️ Dismantling the 30% Aggregator Middleman Commission
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
          Skilled Trades. Direct Guilds. <br />
          <span className="text-coop-amber-600">Zero Exploitative Cuts.</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Screws Up connects homeowners directly to certified local technicians through a fair cooperative protocol. 
          88% goes directly to the worker, 8% to the community tool & welfare fund, and 4% to platform operations.
        </p>

        {/* 88-8-4 Cooperative Card Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="text-3xl font-black text-coop-green-600">88%</div>
            <h3 className="mt-2 text-lg font-bold text-slate-900">Artisan Take-Home</h3>
            <p className="mt-1 text-sm text-slate-600">
              Direct UPI transfer upon verified completion. No lead pack fees, zero bidding cuts.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="text-3xl font-black text-coop-amber-600">8%</div>
            <h3 className="mt-2 text-lg font-bold text-slate-900">Welfare & Tool Pool</h3>
            <p className="mt-1 text-sm text-slate-600">
              Community leasing for heavy power tools (rotary hammers, drain cameras) and emergency buffers.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="text-3xl font-black text-slate-700">4%</div>
            <h3 className="mt-2 text-lg font-bold text-slate-900">Platform Operations</h3>
            <p className="mt-1 text-sm text-slate-600">
              Zero venture rent extraction. Lean compute, PostGIS rotation engine, and SMS/voice gateways.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full max-w-6xl border-t border-slate-200 pt-6 text-center text-sm text-slate-500">
        © 2026 Screws Up Cooperative Guild Protocol. All rights reserved.
      </footer>
    </main>
  );
}
