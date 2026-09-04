# Screws Up 🛠️
> **A Digital Guild Protocol & Platform for Skilled Trades**

Screws Up is an open, worker-owned cooperative gig platform designed to replace predatory 25–30% intermediary commissions with a transparent **88-8-4 economic model**:
- **88%** to the skilled artisan via instant UPI
- **8%** to the District Cooperative Welfare Pool (tool lending, emergency funds)
- **4%** to lean platform operations

---

## Monorepo Architecture (Turborepo + pnpm)

```
screws-up/
├── apps/
│   ├── web/               # Next.js 14 Customer Booking & RWA Society Portal
│   ├── mobile-customer/   # Expo / React Native iOS & Android Customer App
│   ├── mobile-artisan/    # Expo / React Native Android Partner App (Offline SQLite + Barcode)
│   ├── guild-console/     # Vite + React Guild Master & Panchayat Dispute Console
│   ├── api/               # Fastify + TypeScript Core Gateway & PostGIS Fair Rotation
│   └── worker/            # BullMQ + Redis Processor (Midnight MFSS Batch & 30-Day FTR Audit)
└── packages/
    ├── database/          # PostgreSQL 16 + PostGIS schema & Drizzle ORM
    ├── shared-types/      # Canonical Zod schemas, DTOs & 88-8-4 split calculator
    ├── api-client/        # Cross-platform typed fetch client
    ├── config-tailwind/   # Cooperative brand design tokens
    ├── config-typescript/ # Standardized tsconfigs
    └── config-eslint/     # Shared linting rules
```

---

## Core Innovations

1. **Coil's Proof-of-Skill Engine (MFSS v1 - Zero AI):**
   $$\text{MFSS} = (0.50 \times \text{FTR}) + (0.25 \times \text{PGA}) + (0.15 \times \text{PBT}) + (0.10 \times \text{PIS})$$
   Evaluates workers on real mechanical reliability (30-day First-Time-Right zero callback ratio, peer master audits, bench testing) instead of easily manipulated 5-star customer reviews.

2. **FairParts OEM Barcode Scanner:**
   Artisans scan genuine replacement components in front of the customer to verify distributor wholesale MSRP + fixed labor fee.

3. **Panchayat Peer Dispute Tribunal:**
   Contested jobs are arbitrated by 3 randomly summoned Guild Masters via a double-blind review, preventing arbitrary de-platforming.

---

## Getting Started

### Prerequisites
- Node.js `20.x` or higher
- pnpm `11.x`
- PostgreSQL 16 with PostGIS extension (optional for mock mode)
- Redis 7.x (for BullMQ background jobs)

### Installation & Build

```bash
# Clone the repository
git clone https://github.com/swaritsoni6-lgtm/screws-up.git
cd screws-up

# Install dependencies
pnpm install

# Type-check all packages and apps
pnpm turbo type-check

# Build the entire monorepo
pnpm turbo build
```

### Running Development Servers

```bash
# Start all apps in parallel
pnpm turbo dev

# Or start individual apps
pnpm --filter @screws-up/web dev          # Web on http://localhost:3000
pnpm --filter @screws-up/api dev          # API on http://localhost:4000
pnpm --filter @screws-up/guild-console dev # Console on http://localhost:3001
```

---

## License
Cooperative Guild License / Proprietary to Screws Up Contributors.
