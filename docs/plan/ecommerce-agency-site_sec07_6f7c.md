## 7. Integrations and Lead Flows

This chapter wires every service to the stack fixed in chapter 6 — Next.js 16.2.x + Payload CMS 3.86 (embedded, PostgreSQL) + React 19 + Tailwind CSS v4 + shadcn/ui, delivered as a single Dockerfile — and specifies each lead flow end to end. **Env-var cross-reference:** configuration uses the 6.8 table's exact names — RESEND_API_KEY, EMAIL_FROM, S3_ENDPOINT, S3_BUCKET, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY, S3_REGION, CALCOM_EMBED_URL, LISTMONK_URL, LISTMONK_API_USER, LISTMONK_API_TOKEN, UMAMI_SCRIPT_URL, UMAMI_WEBSITE_ID. This chapter adds no variables; an integration needing one is rejected until 6.8 is amended.

### 7.1 Integration architecture and ownership

#### 7.1.1 External vs self-hosted boundary map; data crossing each boundary; failure ownership

Three services cross the VPS boundary — Cloudflare R2 (media), Resend (mail), Cal.com Cloud (scheduling) — each with an in-boundary fallback (MinIO, SES SMTP, Cal.com self-host)[^56^][^62^]. Personal data stays on the VPS: submissions and consent records in PostgreSQL, subscribers in Listmonk, analytics in Umami. The matrix is the review artifact: an unlisted flow does not get built.

**Integration contract matrix.**

| # | Trigger | Source | Payload | Destination | Owner | Failure mode |
|---|---|---|---|---|---|---|
| 1 | Slot confirmed | Cal.com embed (client island) | Event time, attendee, event-type key | Cal.com Cloud; Cal.com sends confirmation | Cal.com | Script failure → booking-link card; Cal.com down → /contact fallback (6.9) |
| 2 | Routing Form submit | Cal.com routing form | Budget band, project type, name, email | Cal.com routing engine → calendar | Cal.com | As #1; unqualified reroute to /contact |
| 3 | Contact submit | `contact-general` form | name, email, message | Postgres + Resend | GenMedha Hub | Resend failure → submission retained; job retries |
| 4 | Audit request submit | `audit-inquiry` form | + company, platform, spend band | Postgres + Resend (agency + lead) | GenMedha Hub | As #3 |
| 5 | Lead-magnet gate submit | `leadmagnet-gate` form | name, email, consent flag | Postgres + Listmonk list + Resend delivery + signed R2 URL | GenMedha Hub | Listmonk down → sync queued |
| 6 | Newsletter subscribe | `newsletter-footer` form | email | Listmonk (double opt-in) | GenMedha Hub | As #5; form shows success regardless |
| 7 | Transactional send | Payload server hook | Rendered React Email + vars | Resend API | GenMedha Hub | Retry ×3 backoff; then alert |
| 8 | Subscriber sync | Submission hook | email, name, list ID, consent timestamp | Listmonk API (internal network) | GenMedha Hub | Postgres job queue; nightly reconciliation (7.9.1) |
| 9 | Media upload | Payload admin | File + generated sizes | R2 via `@payloadcms/storage-s3` | GenMedha Hub | R2 outage → placeholders; MinIO swap via S3_* envs |
| 10 | Campaign send | Listmonk campaign | HTML + list | SES or Resend SMTP | GenMedha Hub | Listmonk retry queue; bounce processing on |
| 11 | Analytics event | Browser interaction | Event name + props, no PII | Umami beacon | GenMedha Hub | Blocked → silent by design |
| 12 | Form lead → CRM | Submission hook (after Postgres write) | name, email, form key, source tag, landing URL, UTMs | HubSpot Contacts API (upsert by email; private-app token — free-tier limits, verify at implementation)[^94^] | GenMedha Hub | HubSpot outage → Postgres remains system of record; retry ×3; nightly reconciliation (7.9.1) |
| 13 | Booking → CRM | Cal.com webhook relay | name, email, event type, routing answers, slot | HubSpot Contacts API + engagement note on contact | GenMedha Hub | As #12 — booking confirmation never depends on HubSpot |
| 14 | Lead-magnet tag sync | Submission hook | LeadMagnet key, consent timestamp | HubSpot contact properties (lead_source, magnet_interest) | GenMedha Hub | Property-write retry; tag drift reconciled nightly |

Flows 1–2 are the only ones where lead data lives primarily outside GenMedha Hub's infrastructure — the reason Cal.com keeps the self-host escape hatch (7.2.1). Flows 3–6 share one principle: the Postgres write lands first and is the system of record, so downstream failure degrades to a retry, never a lost lead. Flow 8 runs on the internal network, so a Listmonk outage never reaches the visitor; flow 11 is deliberately expendable — analytics never gates the conversion path it measures. Ownership follows the data: GenMedha Hub owns everything in Postgres, Listmonk, or R2; Cal.com owns scheduling metadata until self-hosting brings it in-boundary. Thank-you routing note: flows 3–4 land on /thank-you/booking, which renders the lead-variant state specified in 7.3.1; the post-booking variant remains exclusive to flow 1.

### 7.2 Cal.com booking flow

#### 7.2.1 Cloud tier at launch; three embed patterns; Routing Form qualification; self-host deferred

Launch on Cal.com Cloud's free tier with three embed patterns[^60^]: **inline embed** on /book; **pop-up via element click** on every nav, hero, and CtaBand "Book a call" button; and an embeddable **Routing Form** that qualifies before showing availability — budget bands mirroring the Medusa Experts application ($1k–$5k to +$1M)[^11^] plus project type (new build, migration, retainer, audit). Cloud beats Calendly: Calendly has no self-host path and gates its API; Cal.com offers a free tier, open API/webhooks, white-label, routing forms[^61^].

**Booking sequence in words.** Booking CTA click → pop-up Routing Form → budget band and project type → routing sends qualified leads to the 30-minute discovery event type, unqualified to /contact → inline calendar → slot picked → Cal.com creates the booking, fires the webhook behind `booking_complete`, sends confirmation → /thank-you/booking (4.15.1).

**Options with recommendation — cloud vs self-host.** Self-hosting is AGPL, Docker-deployable on the same VPS, but needs Postgres plus Redis, ~4GB RAM, and 60–90 minutes of OAuth/SMTP setup; the community image lags cloud[^62^]. Recommendation: cloud at launch per the cross-verification resolution; self-host only if EU data residency (7.9.1) demands it, amending the 6.9 no-Redis invariant by recorded decision.

### 7.3 Lead capture and Payload forms

#### 7.3.1 plugin-form-builder; form inventory; spam controls; thank-you routing

All capture uses `@payloadcms/plugin-form-builder` as shipped (v3.83.0 UI improvements)[^3^]; submissions persist in PostgreSQL per the 5.6 boundary — Payload owns capture and storage; this chapter owns delivery hooks. Spam controls on every form: honeypot, time-to-submit check, server-side re-validation, Traefik rate limiting; no CAPTCHA (friction outweighs bot volume at launch scale — judgment call).

**Form inventory.**

| Form | Fields | Validation | Spam control | Destination action | Thank-you URL (ch.3) |
|---|---|---|---|---|---|
| contact-general | name, email, message | email format; message 20–2,000 chars | honeypot + time + rate limit | Resend notification; lead confirmation | /thank-you/booking |
| audit-inquiry | name, email, company, currentPlatform, monthlyPlatformSpend, message | email format; platform from PlatformHubs keys | honeypot + time + rate limit | Postgres + Resend agency + lead mails | /thank-you/booking |
| leadmagnet-gate | name, email, company (opt), consent (req) | email format; consent = true | honeypot + time | Listmonk list per LeadMagnet + signed URL + delivery mail | /thank-you/download |
| newsletter-footer | email | email format | honeypot + double opt-in | Listmonk subscribe | /thank-you/newsletter |
| calculator-gate (P5) | name, email | email format | honeypot + time | Results mail + Listmonk sync | Inline result reveal (7.6.1) |

Usage note: keys match the 5.6.1 seed documents; thank-you URLs are `noindex` per 3.7.

**Thank-you routing spec note — /thank-you/booking lead variant.** Ch. 3/ch. 4 (4.15.1) define /thank-you/booking as the post-booking page with exactly one next step; that definition stands unchanged for the booking flow (7.2). For contact-general and audit-inquiry form leads, the same route renders a defined lead-variant state: headline "Request received", and exactly one next step offered — book a discovery call or read a migration guide. The variant is a content state of the existing route, keyed on the arriving form submission, `noindex` unchanged; no new route is created.

**Gated-download sequence in words.** Gate-form submit on /resources/{slug} → Postgres write → Resend delivery email with the signed R2 asset URL → sync queues to Listmonk with the LeadMagnet's `listmonkListId` → double-opt-in confirmation sent → /thank-you/download renders the download plus the audit pitch (4.15.1).

**CRM sync (all forms).** After the Postgres write, every form fires a second post-write hook: a HubSpot contact upsert (create-or-update by email) carrying the source tag taxonomy — `organic`, `booking`, `lead-magnet`, `calculator`, `outreach` — plus landing URL and first-touch UTMs, implementing the 7.9.1 attribution goal inside the CRM (7.10). Ordering rule is unchanged: Postgres lands first and is the system of record; the HubSpot call is a retryable job, invisible to the visitor, and its failure degrades to nightly reconciliation, never to a lost or blocked lead.

### 7.4 Transactional email through Resend

#### 7.4.1 email-resend adapter; React Email templates; EU residency flag

Transactional mail runs through the official Payload `email-resend` adapter: free tier 3,000 emails/month (100/day), Pro $20/month at 50k[^64^]; React Email is the templating standard[^65^]. **GDPR decision flag:** EU data residency requires Pro or higher[^64^] — if 7.9.1 puts EU subjects in scope, budget Pro from day one.

**Email template inventory.**

| Template | Trigger | From | Tool | Notes (React Email) |
|---|---|---|---|---|
| contact-notification | Form #3/#4 submit | EMAIL_FROM | Resend | Plain-text-first; reply-to = lead |
| contact-confirmation | Form #3/#4 submit | EMAIL_FROM | Resend | States 1-business-day response expectation |
| leadmagnet-delivery | Form #5 submit | EMAIL_FROM | Resend | Signed URL + expiry; audit CTA |
| calculator-results | Calculator gate submit | EMAIL_FROM | Resend | Result table; estimate disclaimer (7.6.1) |
| booking-confirmation | Cal.com booking | Cal.com | Cal.com native | White-labeled; not React Email |
| newsletter-optin | Listmonk subscribe | Listmonk | Listmonk native | Double opt-in; brand-skinned |
| newsletter-campaign | Manual campaign | Listmonk | Listmonk + SES/Resend SMTP | HTML + plain-text part mandatory |

Usage note: the last three rows render outside React Email; the rest live in `emails/` with snapshot tests (ch.10).

**Audit-request sequence in words.** audit-inquiry submit (from /contact?offer=audit, a migration-pair page, or /pricing) → Postgres write → Resend sends the agency notification (platform and spend band pre-parsed) plus the lead confirmation → /thank-you/booking pitches the scoping call — converting a form lead into flow #1.

### 7.5 Listmonk newsletter flow

#### 7.5.1 Self-hosted Listmonk; double opt-in; cost math; managed fallbacks

Listmonk v6.1.0 (Go + PostgreSQL, ~512MB idle, AGPL) runs on the same VPS with its own database[^63^][^66^]; double opt-in is mandatory on every subscribe path. With no built-in SMTP, campaigns route through SES ($0.10 per 1,000 emails) or Resend SMTP; Payload→Listmonk sync uses the REST API over the internal network. Accepted caveats: single maintainer, no drip automation[^66^] — the 4-email nurture sequence (3.5.1) runs as four dated campaigns.

**Campaign send sequence in words.** Editor authors the campaign → selects the list → per-subscriber copies rendered → handoff to SES/Resend SMTP → delivery; bounces flow back for list hygiene → Umami captures resulting visits via UTM links.

**Options with recommendation — self-host vs managed fallback.**

| Option | Cost at 5–10k subs | Data location | Recommendation |
|---|---|---|---|
| Listmonk + SES | ~$8–10/mo [^66^] | On VPS | **Launch default** |
| Buttondown | ~$9–29/mo [^67^] | Vendor (US) | Fallback if ops burden bites |
| MailerLite | ~$10–73/mo [^67^] | Vendor (EU) | Fallback if automation is required |

The savings versus MailerLite (~$32–73/mo at comparable tiers[^66^]) are real but small; the decision rests on data ownership — the subscriber store sits beside the submission store, eliminating dual-write drift (5.6.1) — and on VPS consolidation. The fallback trigger is explicit: if the single-maintainer risk materializes or the nurture program outgrows dated campaigns into behavioral automation, migrate to MailerLite (EU-hosted, easing 7.9.1). The subscriber schema (email, name, list, consent timestamp) is built for one-shot export, so migration is an afternoon, not a project.

### 7.6 TCO calculator and gated resources

#### 7.6.1 Inputs/outputs spec, result capture, email gating, estimate boundary

The /tools/replatforming-calculator (blueprint 4.15.1; benchmark: Fraction Studio[^51^]) is a client island per 6.3. **Inputs:** current platform, monthly GMV band, SKU-count band, integrations count, current platform+app spend. **Outputs:** a three-year TCO comparison (current vs Medusa Cloud tiers $29/$99/$299/mo, 0% GMV fee[^6^]) plus a one-line migration-effort estimate. Results are email-gated via calculator-gate (7.3.1): the page shows a teaser range; the breakdown arrives via the calculator-results template. Boundary rule, on page and in email: figures are static illustrative estimates, not proposals — binding numbers come only from the paid audit. Static math suffices at launch; the interactive calculator ships in Phase 5.

### 7.7 Object-storage integration

#### 7.7.1 storage-s3 config, R2 vs MinIO, public vs private assets, URL generation

Media flows through `@payloadcms/storage-s3` (region `auto`, custom endpoint, path-style URLs) per 6.7[^56^]. R2 is the default for zero egress and off-VPS durability; MinIO is the fallback via S3_* env vars only — no code change. Public assets (images, OG) serve through long-cache public URLs; gated PDFs are private, served via time-limited signed URLs generated server-side after form capture (flows #5, #9). The frontend consumes `url` fields from Payload responses and never constructs object URLs, so an R2→MinIO swap is invisible to renderers.

### 7.8 Analytics and conversion events

#### 7.8.1 Self-hosted Umami; event inventory

Umami (self-hosted, cookieless, GDPR-friendly) runs on the VPS, loaded from UMAMI_SCRIPT_URL with UMAMI_WEBSITE_ID[^81^]. Events fire only from client islands, preserving the RSC-first invariant.

**Analytics event inventory.**

| Event | Trigger element | Tool | Purpose |
|---|---|---|---|
| cta_click | nav / hero / footer CTAs (location prop) | Umami | CTA performance per 3.6 table |
| booking_complete | Cal.com webhook-confirmed booking | Umami | Primary conversion KPI |
| routingform_qualified | Routing Form passes qualification | Umami | Lead-quality mix by budget band |
| form_start | First field focus, per form key | Umami | Funnel entry per form |
| form_submit | Successful submit, per form key | Umami | Form conversion rate |
| download_complete | Gate submit + /thank-you/download view | Umami | Magnet ROI per checklist |
| newsletter_subscribe | Double opt-in confirmed | Umami | List growth |
| calculator_gate_submit | Gated result requested | Umami | Tool engagement → audit pipeline |

Vocabulary note: `cta_click`, `form_submit`, `booking_complete`, `download_complete`, `newsletter_subscribe`, and `calculator_gate_submit` are the ch. 4 canonical Umami vocabulary; `form_start` and `routingform_qualified` are additive events that extend — never replace — the canonical set.

Usage note: events carry names, locations, and form keys only — no personal data; Umami's cookieless design (no cookies, no persistent identifiers)[^81^].

### 7.9 Failure, consent, and reconciliation rules

#### 7.9.1 Graceful degradation, retries, duplicates, consent records, attribution, manual recovery

Per 6.9: the Postgres write precedes external calls; Resend and Listmonk retry three times with backoff as Payload jobs; a nightly job diffs `form-submissions` against Listmonk subscribers and Resend logs, re-queuing gaps. Duplicates: idempotency keys (form key + email + day) on hooks; Cal.com webhooks deduplicated by event ID. Attribution: submissions store landing URL, referrer, and first-touch UTMs — channel ROI without a CRM. Manual recovery: failed deliveries re-trigger from /admin.

**GDPR-relevant decisions checklist** (GenMedha Hub is India-based; GDPR applies conditionally on EU targeting — decisions recorded, not assumed):

- [ ] **Target-market determination** — Are EU prospects actively targeted (EUR pricing, EU case studies, EU-directed marketing)? Yes → GDPR in scope; no → Indian DPDP Act baseline applies. Recommendation: assume in scope; the Medusa/Vendure buyer market is heavily European.
- [ ] **Resend data residency** — Free tier (US processing) vs Pro+ EU residency ($20/mo)[^64^]. Recommendation: Pro if GDPR in scope.
- [ ] **Umami cookieless baseline** — Keep the cookieless default: no analytics cookies, no banner trigger from analytics[^81^].
- [ ] **Listmonk double opt-in + consent records** — Mandatory on all subscribe paths; consent text and timestamp stored per submission; one-click unsubscribe per campaign.
- [ ] **Cal.com data location** — Cloud (vendor-controlled) vs VPS self-host. Deferred per 7.2.1; revisit if GDPR-in-scope leads object.
- [ ] **Cookie-banner decision tree** — Any non-essential cookies? Umami: no. Cal.com embed may set third-party cookies → if EU in scope, load the embed only behind the visitor's click (the pop-up pattern already does this) and disclose in /legal/cookies; a full banner ships only if a future integration (e.g., ad pixels) adds non-essential cookies. Re-run at every integration addition.
- [ ] **HubSpot as processor** — CRM data hosted vendor-side (US/EU region selectable at account creation; choose EU if GDPR in scope). Consent text + timestamp sync per contact; deletion requests propagate via API. Add HubSpot to the 10.5 processor register.
- [ ] **Outbound tools as processors** — Apollo/Clay process prospect data sourced outbound (legitimate-interest basis for B2B outreach where applicable; verify per jurisdiction). Prospect lists live in Apollo, not on the VPS; suppression/unsubscribe lists must sync back to Apollo sequences.

### 7.10 CRM and outbound sales stack

#### 7.10.1 HubSpot Free as CRM of record; Apollo for outbound; Clay deferred; deliverability separation

The integration boundary extends one step further than the pre-CRM design: **HubSpot (free tier) is the CRM of record for inbound**, while the website stack stays the system of capture. The division of labor across the four email-adjacent tools is strict — Resend = transactional, Listmonk = newsletter nurture, HubSpot = CRM + manual 1:1 sales emails (500/day via connected inbox), Apollo = outbound sequences[^98^]. No tool overlaps another's role; overlap is where deliverability and data quality go to die.

**HubSpot Free limits (verified 2026) and upgrade triggers.** Free tier covers ~1,000 contacts, 2 users, 1 pipeline, 10 custom properties, 2,000 branded marketing emails/mo, 1 automated email per form, and restricted API[^94^][^98^]. This is sufficient for launch: the website handles capture UX, HubSpot handles storage, pipeline, and manual follow-up. Triggers for Starter ($20/seat/mo): >1,000 contacts, a third sales user, branding removal on forms/emails, or multi-step automation[^94^]. Marketing-email nurture does NOT move to HubSpot — the 2,000 branded sends/mo lose to Listmonk's economics and ownership (7.5).

**Booking stays on Cal.com.** HubSpot free's single branded meeting page loses to Cal.com's white-label routing forms on every axis that matters here (qualification routing, embed patterns, self-host escape hatch)[^94^][^60^]; Cal.com remains the booking UX per 7.2, and bookings sync to HubSpot via webhook (matrix row 13).

**Apollo Free = outbound prospecting + sending, no CRM sync.** Free tier: 2 active sequences, ~250 emails/day fair use, 900 data credits/seat/yr, 5 mobile + 10 export credits/mo — and critically, **no HubSpot integration on free**[^95^][^96^]. Operating model: build and verify lists in Apollo (reported bounce rates 15–25% make the verification pass mandatory[^96^]), run sequences inside Apollo, and log replies into HubSpot manually or via the 10-export-credit CSV path. Upgrade trigger: >2 concurrent sequences or native HubSpot sync → Apollo Basic at $49/user/mo[^95^].

**Clay Free = evaluation sandbox only.** 100 Data Credits + 500 Actions/mo, 200-row tables, no phone enrichment, no CRM integration[^97^] — enough to prove an enrichment workflow, not to run one. Clay enters the production stack only at the Growth tier ($495/mo, CRM sync) when outbound volume justifies it; it is documented here so the architecture has a placeholder, not a dependency.

**Deliverability separation (non-negotiable).** Cold outreach never sends from genmedhahub.com. A lookalike sending domain (e.g., genmedhahub.co) with its own mailbox, SPF/DKIM/DMARC records, and a 2–3 week warm-up carries all Apollo sequences; bounce rate stays under 2%[^98^]. One burned domain at launch would poison the primary domain's transactional and newsletter deliverability — the highest-leverage cheap insurance in this entire stack (judgment call, standard outbound practice).

**Outbound-to-inbound handshake.** When an outbound prospect converts (books a call, submits a form), the contact already exists in Apollo; the website's HubSpot sync upserts by email, so the CRM record merges rather than duplicates, and the source tag becomes `outreach` — closing the attribution loop D15 requires without any paid integration.
