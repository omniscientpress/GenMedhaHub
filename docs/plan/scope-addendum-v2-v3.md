# Scope Addendum v2 (2026-07-28) — SUPERSEDES outline where conflicting

## Approved scope change
Client directive (mid-build): add three core competencies to the agency's offer —
**Web Application development**, **Mobile Application development**, and **Digital Marketing services** —
with target markets **India, USA, GCC countries, and UAE**. Medusa/composable commerce remains
the special core competency and flagship. This addendum is binding on chapters 2, 3, 4, 5, 8, 10,
11, 12, 13 and 1. Chapters 6, 7, 9 are unaffected except where noted.

## Orchestrator-resolved decisions (writers must not re-decide these)

### D1. Positioning hierarchy — "ecommerce-first digital engineering studio"
- Flagship (hero, deepest proof): composable commerce — Medusa core + Vendure/Shopify/Adobe Commerce.
- Adjacent pillars ("Build & Grow"): Web App development, Mobile App development, Digital Marketing.
- Revised working positioning statement:
  "{{BRAND}} is an ecommerce-first digital engineering studio. Our flagship practice designs, builds,
  migrates, and supports composable commerce — with Medusa as our core competency, plus Vendure,
  Shopify, and Adobe Commerce. The same TypeScript/React engineering core delivers web applications
  and mobile apps, and our digital marketing practice grows what we build — for clients across India,
  the USA, and the GCC/UAE."
- Anti-dilution rule: never claim equal depth across all pillars. Ecommerce carries certification/OSS
  proof; app dev and marketing carry stack-coherence + content-engine proof (see D5).

### D2. Stack coherence for new pillars (judgment calls, client may override)
- Web apps: Next.js / React / Node.js / PostgreSQL (same stack as the site — dogfooding narrative).
- Mobile apps: React Native (Expo) with TypeScript; native modules where required.
- Digital marketing: SEO/GEO, performance marketing (Google/Meta Ads), content marketing,
  lifecycle email, analytics/CRO — NOT a full-service creative agency scope.

### D3. IA additions (ch.3)
- New capability pages (P3): /services/web-app-development, /services/mobile-app-development,
  /services/digital-marketing.
- Digital marketing child pages (P4, substantive or don't publish — anti-thinness rule):
  /services/digital-marketing/seo-geo, /services/digital-marketing/performance-marketing,
  /services/digital-marketing/content-marketing, /services/digital-marketing/email-lifecycle.
- New market pages (P4): /markets (index), /markets/india, /markets/usa, /markets/uae-gcc.
  Region pages MUST be substantive: market context, engagement logistics (timezone, contracting,
  payments), compliance notes, relevant proof. NOT doorway/city pages (Pointer warning stands).
- Nav: Services dropdown gains two groups — "Commerce" (Ecommerce Builds, Replatforming & Migration,
  Support & Retainers) and "Build & Grow" (Web App Development, Mobile App Development, Digital
  Marketing). Markets pages linked from footer, About, and contextual service-page links; NOT top-nav.
- Ecommerce remains the hero of the homepage; new pillars appear as a secondary capability band.

### D4. CMS additions (ch.5)
- Services collection: add servicePillar select (commerce | build-grow) and serviceCategory values
  (web-app, mobile-app, digital-marketing + children).
- New collection Markets (region pages): name, region (india | usa | uae-gcc), marketContext,
  engagementLogistics (timezone/contracting/payments), complianceNotes, proofLinks, seo group.
- CaseStudies: metrics array value types extended for marketing (ROAS, CPL, CAC, organic growth %)
  and apps (launch timeline, crash-free %, store rating); add serviceCategories relationship to the
  three new pillars; add markets relationship (regions served).
- No other schema changes; existing collections unchanged.

### D5. Messaging additions (ch.2)
- New audience segments: startup/SME founder (web/mobile app mandate), marketing-mandate buyer
  (founder/CMO in target regions).
- Cross-sell narrative: "Build → Migrate → Support → Grow" lifecycle — digital marketing closes the loop.
- Digital-marketing proof strategy: the agency's own SEO/GEO/content engine (ch.8) is the living case
  study — "we practice on ourselves first" (build-in-public metrics: rankings, traffic, newsletter growth).
- App-dev proof: stack coherence (same Next.js/React/TS core), dogfooding, OSS.
- Claims discipline unchanged: no unverifiable superlatives; regional claims must be logistical
  (timezones, engagement models) not fake local-office claims. Do NOT claim physical offices.

### D6. SEO/content additions (ch.8)
- New keyword clusters (P2 priority): web app development company (India/USA/UAE intent),
  React Native app development, ecommerce digital marketing, "Shopify/Medusa SEO services".
- Geo-targeting approach: substantive /markets pages + Search Console/geo signals + localized proof;
  NO hreflang at launch (single language); note as future option.
- Editorial calendar: add 2 marketing-practice articles + 1 app-dev article per month (judgment call),
  incl. build-in-public marketing metrics posts.
- Digital marketing service pages must demonstrate the practice they sell (own rankings, own schema,
  own CWV as proof artifacts).

### D7. Compliance additions (ch.10)
- Privacy register additions: UAE PDPL and Saudi PDPL rows (processor inventory + data-transfer notes);
  India's DPDP Act 2023 row. GDPR row stays conditional on EU targeting.
- Cookie-banner decision tree extended with GCC/UAE jurisdictions — still options, not verdicts.

### D8. Phase plan additions (ch.11–12)
- P3 scope += 3 new service pages. P4 scope += 4 marketing child pages + 4 market pages.
- P3/P4 effort estimates increase ~30–40%; total estimate must be re-rolled with this noted.
- New risk for ch.13: positioning dilution (mitigation per D1 anti-dilution rule); thin region pages
  (mitigation: anti-thinness gate); scope creep precedent (change control per ch.13.4).

### D9. Homepage change (ch.4)
- Hero stays ecommerce. New "Build & Grow" band after capability cards: three pillar cards
  (Web Apps, Mobile Apps, Digital Marketing) each with one-line stack-coherence proof + link.
- Markets strip in footer region: "Serving India · USA · UAE & GCC" linking /markets.

## What does NOT change
- Locked stack (Next.js 16.2.x + Payload 3.86 + PostgreSQL + Tailwind v4 + shadcn/ui, single Dockerfile).
- Hosting/CI-CD (ch.9), integrations (ch.7), technical architecture (ch.6).
- Phase numbering P0–P7; phase-gate model; prompt-pack structure (9-part skeleton).
- All verified numbers and citations (registry unchanged).

---

# Scope Addendum v3 (2026-07-29) — Sales/CRM & outbound stack — SUPERSEDES outline where conflicting

Client directive: add **HubSpot** (CRM, free tier initially) plus **Apollo** and **Clay** with other
outreach tools, free tiers initially. Binding on chapters 1, 7, 11, 12, 13.

## Orchestrator-resolved decisions (D10–D15)

### D10. HubSpot Free = CRM of record for INBOUND leads
- Website forms (native Payload form-builder — on-brand UX kept) and Cal.com bookings auto-sync
  into HubSpot via API/webhook. Cal.com REMAINS the booking UX: HubSpot free's single branded
  meeting page is inferior to Cal.com's white-label routing forms[^94^].
- HubSpot Free 2026 limits (verified): 1,000 contacts, 2 users, 1 pipeline, 10 custom properties,
  2,000 branded marketing emails/mo, 1 automated email per form, restricted API[^94^][^98^].
- Upgrade triggers documented: >1,000 contacts, >2 users, branding removal, or multi-step
  automation → Starter hub at $20/seat/mo[^94^].

### D11. Apollo Free = outbound prospecting + sending layer (no website integration)
- Use for list-building + sequences (free: 2 active sequences, ~250 emails/day, 900 data
  credits/seat/yr, 5 mobile + 10 export credits/mo)[^95^][^96^].
- NO CRM integration on free tier → HubSpot sync is manual CSV (10 exports/mo cap) or
  log-on-reply. Upgrade trigger: >2 sequences or native HubSpot sync needed → Basic
  $49/user/mo[^95^][^96^].
- Data-quality caution: reported bounce rates 15–25% — verification pass before sending[^96^].

### D12. Clay Free = evaluation only; not in launch architecture
- Free tier (100 Data Credits + 500 Actions/mo, no phone enrichment, no CRM integration[^97^])
  is a proof-of-concept sandbox. Real adoption deferred; trigger = Growth $495/mo with CRM
  sync when outbound volume justifies it[^97^].

### D13. Cold-outreach domain separation (deliverability, non-negotiable)
- Never send cold outreach from genmedhahub.com. Purchase a lookalike sending domain
  (e.g., genmedhahub.co), separate Google Workspace mailbox, SPF/DKIM/DMARC, 2–3 week
  warm-up, bounce <2%[^98^]. Apollo sequences send from the outreach domain only.

### D14. Email tool boundaries (unchanged roles, clarified)
- Resend = transactional (confirmations, download links). Listmonk = newsletter/marketing
  nurture (HubSpot free's 2,000 branded emails/mo insufficient + off-brand). HubSpot = CRM +
  manual 1:1 sales emails (500/day via connected inbox)[^98^]. No tool overlap.

### D15. Lead-source attribution
- Every inbound record carries a source tag (organic / booking / lead-magnet / calculator /
  outreach) via hidden form fields + HubSpot properties — implements the ch.7.9 attribution goal.

## Impact
- Ch.7: new section 7.10 "CRM and outbound sales stack"; integration matrix + form inventory
  updated with HubSpot destination; GDPR register + failure modes extended.
- Ch.11: P5 scope += HubSpot wiring (form→HubSpot, booking→HubSpot, source tags); +2–3
  person-days → total estimate 87–119 person-days.
- Ch.12: P5 prompt scope updated. Ch.1: locked-decision register += HubSpot row.
- Ch.13: open decisions += Apollo Basic upgrade trigger, Clay adoption trigger, outreach-domain
  purchase (blocks P5 wiring? no — post-launch), HubSpot Starter trigger.
