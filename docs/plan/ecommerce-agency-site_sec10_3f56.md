## 10. Quality Budgets, Security, Accessibility, and Compliance

This chapter turns the chapter 6 invariants and chapter 9 pipeline into enforceable numbers: every budget has a target, a measurement point, and release-blocking enforcement. Chapter 11 cites these gates as acceptance criteria; chapter 12 quotes the 10.2 register verbatim.

### 10.1 Quality policy

#### 10.1.1 The site is itself a portfolio artifact — scores are sales evidence; quality is release-blocking

GenMedha Hub sells ecommerce engineering; its own Lighthouse and Core Web Vitals (CWV) scores are the proof a prospect checks before booking, and a performance agency whose site fails CWV is a contradiction found in one PageSpeed run. Three rules follow. Budgets are release-blocking: a breach fails continuous integration (CI), not a quarterly review. Budgets cover public templates only — `/admin` and `/api` are excluded per the 6.9 invariant. Every target carries a source or a judgment-call label; unsourced numbers are not budgets.

### 10.2 Performance and Core Web Vitals budgets

#### 10.2.1 Budget register and per-template budgets

Field targets use Chrome UX Report (CrUX) p75 on mobile: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1[^84^]. Interaction to Next Paint (INP) is the most-failed metric (~43% of sites miss it); the lever is less JavaScript — exactly what the 6.3 RSC-first strategy delivers[^85^]. Lab targets: TTFB <800ms (goal <200ms cached), FCP <1.8s[^85^]. Lighthouse mobile: Performance ≥90 (95 excellent), Accessibility 100, Best Practices ≥95, SEO 100[^87^][^88^]. Accessibility baseline: WCAG 2.2 AA[^86^].

**Quality budget register.**

| Category | Metric | Target | Source | Where measured | Enforcement |
|---|---|---|---|---|---|
| CWV (field) | LCP, mobile p75 | ≤2.5s | [^84^] | CrUX / PageSpeed Insights | Regression alert; 9.4 rollback trigger |
| CWV (field) | INP, mobile p75 | ≤200ms | [^84^][^85^] | CrUX / PageSpeed Insights | Regression alert |
| CWV (field) | CLS, mobile p75 | ≤0.1 | [^84^] | CrUX / PageSpeed Insights | Lighthouse CI gate |
| Lab | TTFB, key templates | <800ms (goal <200ms) | [^85^] | Lighthouse CI; Uptime Kuma | CI gate |
| Lab | FCP | <1.8s | [^85^] | Lighthouse CI | CI gate |
| Lighthouse | Performance, mobile | ≥90 (95 excellent) | [^87^][^88^] | Lighthouse CI, 6 key templates | Blocks merge |
| Lighthouse | Accessibility | 100 | [^87^] | Lighthouse CI + 10.3 audit | Blocks merge |
| Lighthouse | Best Practices | ≥95 | [^88^] | Lighthouse CI | Blocks merge |
| Lighthouse | SEO | 100 | [^87^] | Lighthouse CI | Blocks merge |
| JavaScript | First-load JS, marketing pages | ≤200KB compressed (judgment call) | — | `next build` bundle output | Blocks merge |
| Images | LCP/hero image | ≤150KB AVIF/WebP; ≤500KB/page total (judgment call) | — | Build-time size check (6.7)[^56^] | Blocks merge |
| Accessibility | WCAG 2.2 AA | 10.3 checklist 100% | [^86^] | axe + manual audit per release | Pre-launch gate |
| Availability | Uptime | ≥99.9%/month (judgment call) | — | Uptime Kuma + external monitor[^82^][^83^] | 9.6 alerts |
| Disaster recovery | Restore test | Quarterly, signed off | [^79^] | Throwaway Dokploy restore (9.5) | Calendar gate |

The register separates field budgets (CrUX, what Google evaluates) from lab budgets (Lighthouse CI, enforceable per pull request), with lab thresholds stricter so CI fails before rankings do. The two judgment-call rows are the levers protecting the sourced metrics: INP failure is at root a JavaScript problem[^85^], and LCP failure on this design is almost always an oversized hero. The availability and recovery rows exist because a down site scores nothing: 99.9% permits ~43 minutes of monthly downtime, which the 9.6 dual-monitor setup detects within 2 minutes, and the quarterly restore test is the only proof the 9.5 backups work.

**Page/component performance budget table.**

| Template | LCP element | Budget notes |
|---|---|---|
| Home | Hero headline text | Text-LCP keeps LCP ≈ FCP; hero visual loads after |
| Platform hub | H1 + intro paragraph | As home; badge-strip images ≤20KB each |
| Migration-pair page | H1 | No image above fold; TCO table is SSR HTML |
| Case study | Hero image permitted — `priority`, ≤150KB | Text-LCP variant preferred |
| Article | H1 text | Inline images lazy, ≤100KB, explicit dimensions (CLS) |
| /book | Static-shell headline | Cal.com island lazy; embed script deferred |

Usage note: each template declares its LCP element in review; an image becoming LCP requires `priority` and the 150KB cap, or the pull request is rejected.

One decision drives all six rows: text, not images, is the LCP element wherever layout allows. Text LCP paints with the first HTML, making the ≤2.5s field target nearly free on an ISR cache hit at <200ms TTFB; image LCP adds fetch, decode, and render latency that consumes most of the budget on mid-tier mobile. The case-study template is the sole exception — portfolio pages sell through visuals — so Lighthouse CI watches it most closely. The /book row enforces the 6.3 island rule: the Cal.com embed is the heaviest third-party script on the site and must never enter any page's critical rendering path.

### 10.3 Accessibility budget

#### 10.3.1 WCAG 2.2 AA baseline + Lighthouse A11y 100 + manual audit

Lighthouse Accessibility 100 is an automated subset, not proof. The budget is WCAG 2.2 AA conformance[^86^], verified by this checklist on every key template per release, plus editor guardrails blocking non-conforming content at publish (alt text required per 6.7; heading order enforced by the rich-text renderer).

**WCAG 2.2 AA checklist.**

- [ ] Full keyboard operability; no traps (menus, dialogs, accordion, Cal.com pop-up).
- [ ] Visible focus indicator on every interactive element; never CSS-suppressed.
- [ ] Text contrast ≥4.5:1 (≥3:1 large text); non-text UI ≥3:1; tokens verified in `@theme`.
- [ ] Programmatic label per form field; errors in text, announced via `aria-describedby`.
- [ ] Server re-validation errors map to fields; no silent submission failures.
- [ ] Alt text enforced: required Media field; renderer refuses images without it (6.7).
- [ ] Logical heading hierarchy (one H1, no skips) in all block combinations.
- [ ] `prefers-reduced-motion` respected; animations disabled or reduced.
- [ ] Pointer targets ≥24×24 CSS pixels (2.2 addition, 2.5.8).
- [ ] Focus never obscured by sticky header or consent UI (2.2 addition, 2.4.11).
- [ ] Dragging has a single-pointer alternative (2.2 addition, 2.5.7); calculator sliders keyboard-operable.
- [ ] Landmarks (`header`, `nav`, `main`, `footer`) plus skip-to-content link.
- [ ] Unique descriptive page titles; `lang` attribute set.
- [ ] Status messages (form success, toast) announced via `aria-live` without focus theft.
- [ ] Editor guardrails: rich-text renderer enforces list/table semantics; empty links blocked at publish.

### 10.4 Security controls

#### 10.4.1 Application/admin/database/secrets/upload/form/dependency/transport/infrastructure controls

**Threat-and-control matrix.**

| Threat | Asset | Control | Residual risk |
|---|---|---|---|
| Form spam/abuse | Postgres, Resend quota | Honeypot + time-to-submit + server re-validation + Traefik rate limit (7.3.1); no CAPTCHA (judgment call) | Low; Turnstile if volume grows |
| Credential stuffing on /admin | CMS, all content | 2FA on all admin accounts; Traefik rate limit on /admin | Low |
| Secret leakage | 6.8 secrets, DB, R2 | Dokploy env store only; zod boot validation; gitleaks in CI | Low |
| Dependency vulnerability | Supply chain | Dependabot weekly; `pnpm audit`; Trivy HIGH+ blocks (9.3) | Medium; 14-day patch SLA |
| Upload abuse | R2 bucket | Admin-only uploads; MIME allowlist; size cap; AVIF/WebP pipeline[^56^] | Low |
| DDoS / flood | VPS availability | Traefik rate limits; single 80/443 perimeter; CDN-fronted R2 | Medium; accept at launch scale |
| Container escape | Host, sibling containers | Non-root app user (6.1); no privileged containers; DBs internal-only | Low |
| Data loss | Postgres ×3, media | Nightly `pg_dump`, rclone off-VPS, quarterly restore (9.5)[^79^] | Low; RPO ≤24h |
| Supply-chain (base images) | Image provenance | Pinned digests; official images; monthly patched rebuild (9.7) | Medium; pinning enforced |
| Newsletter abuse | Listmonk, sender reputation | Double opt-in mandatory; admin IP-allowlist; bounce processing (7.5) | Low |

Usage note: the matrix is the security review artifact — new integrations or collections add rows before merge; every "medium" row carries a named owner and review date.

### 10.5 Privacy and compliance baseline

#### 10.5.1 Cookieless analytics, consent boundaries, retention, processor inventory

GenMedha Hub is an India-based entity serving India, USA, UAE & GCC markets; GDPR applies conditionally on EU targeting — 7.9.1 records the determination, recommended "in scope" given the European buyer market. The target-market footprint adds three framework obligations beyond GDPR: India's Digital Personal Data Protection (DPDP) Act 2023 applies as the entity's home jurisdiction; the UAE Personal Data Protection Law (PDPL, Federal Decree-Law No. 45/2021) and Saudi Arabia's PDPL (with its 2023/2024 amendments and cross-border transfer rules) apply to GCC/UAE marketing and lead capture (Source: official legislation references, to be verified by client counsel). Exposure is minimized by design: Umami is cookieless and stores no IPs[^81^]; submissions and consent records stay in VPS PostgreSQL; Listmonk enforces double opt-in everywhere[^63^].

**Privacy/data-processing register.**

| Processor | Data | Location | Legal basis | Retention | Notes |
|---|---|---|---|---|---|
| Hosting VPS | All site data, logs | Region recorded at provisioning | Contract / legitimate interest | Per component | Only Traefik exposes 80/443 |
| PostgreSQL (app) | Submissions, consent flags, UTMs | On VPS | Consent (gated); legitimate interest (contact) | 24 months, then purge | System of record (7.1) |
| Resend | Recipient name/email, content | US free; EU on Pro+[^64^] | Contract | Resend policy | EU-residency decision per 7.9.1 |
| Cal.com Cloud | Attendee name/email, event time | Vendor (US/EU) | Contract (lead-initiated) | Booking + 12 months | Self-host escape hatch[^62^] |
| Listmonk | Subscriber email/name, consent timestamp | On VPS | Consent (double opt-in) | Unsubscribe + 30 days | One-click unsubscribe |
| Umami | Pageviews, events; no PII/IPs/cookies | On VPS | Legitimate interest[^81^] | 12 months aggregated | No banner trigger |
| Cloudflare R2 / MinIO | Media; gated PDFs | R2 global / VPS | Legitimate interest | Asset lifetime | Signed URLs for gated assets[^56^] |
| GitHub / GHCR | Code, image digests, CI logs | Vendor (US) | Contract | Repo lifetime | No personal data in repo (CI-enforced) |
| India — DPDP Act 2023 (jurisdiction framework) | Personal data of India data principals across all rows above (submissions, subscribers, booking attendees) | Per processor rows above | Consent with notice, or "legitimate uses" (voluntary submission) (judgment call / verify with counsel) | Per component rows above | Home-jurisdiction law: notice + consent, data-principal rights, breach notification to the Data Protection Board; no localization mandate for this data class (Source: official legislation reference, to be verified by client counsel) |
| UAE — PDPL, Federal Decree-Law No. 45/2021 (jurisdiction framework) | Personal data of UAE data subjects captured via site forms, bookings, newsletter | On VPS / vendor locations per rows above — cross-border transfer notes required | Consent or contract (judgment call / verify with counsel) | Per component rows above | Applies to UAE targeting; transfers permitted to adequate jurisdictions or with contractual safeguards — record transfer basis per processor (Source: official legislation reference, to be verified by client counsel) |
| Saudi Arabia — PDPL incl. 2023/2024 amendments (jurisdiction framework) | Personal data of Saudi data subjects captured via site forms, bookings, newsletter | On VPS / vendor locations per rows above — transfer rules tightened by 2023/2024 amendments | Consent; narrow legitimate-interest carve-outs (judgment call / verify with counsel) | Per component rows above | Amended transfer rules allow transfers under adequacy/safeguards but with registration and documentation duties; stricter than UAE posture (Source: official legislation reference, to be verified by client counsel) |

Usage note: this register is the data-protection inventory; a new processor requires a row plus a 7.9.1 decision record before launch. The three jurisdiction rows are framework references, not legal determinations — every obligation summarized above carries a (judgment call / verify with counsel) flag and must be confirmed by client counsel against the official texts before launch in each market.

**Cookie-banner decision tree (jurisdiction-dependent — options, not a verdict):**

1. Any non-essential cookies for the visitor's jurisdiction? Umami sets none[^81^]; if "no", no banner is required — disclose the cookieless posture in /legal/cookies and stop.
2. Does the Cal.com embed set third-party cookies? If EU subjects are in scope, keep the embed behind the visitor's click (the pop-up pattern already does) and disclose; or self-host Cal.com to remove the third party[^62^].
3. If a future integration adds non-essential cookies, a banner becomes mandatory for EU visitors — ship one then; re-run this tree at every integration addition.
4. UAE visitors: the UAE PDPL requires consent as the default basis for processing, but it does not prescribe an EU-style cookie-banner mechanism; the cookieless default (step 1) and disclosed click-to-load embeds (step 2) satisfy the posture without a banner (Source: official legislation reference, to be verified by client counsel). If non-essential cookies are ever added, extend the EU banner to UAE visitors as the low-risk option (judgment call / verify with counsel).
5. Saudi visitors: Saudi PDPL's amended consent and transfer rules are the strictest in the target set; the cookieless/no-third-party-cookie posture avoids the question entirely. If tracking cookies are added later, treat Saudi as banner-mandatory with prior consent (judgment call / verify with counsel).
6. India and USA visitors: India's DPDP Act 2023 centers on notice and consent for processing, not cookie banners; the USA has no federal cookie-banner requirement (state laws such as CCPA/CPRA impose opt-out-of-sale/share duties that the cookieless posture moots). No banner is triggered while step 1's "no non-essential cookies" condition holds (judgment call / verify with counsel).

### 10.6 Testing strategy

#### 10.6.1 Test matrix

| Test type | Tool/approach | Scope | When run | Gate? (Y/N) |
|---|---|---|---|---|
| Unit | Vitest | lib/, JSON-LD builders, hooks | Every PR | Y |
| Integration | Vitest + test Postgres | Form → DB → Resend mock; Listmonk sync | Every PR | Y |
| A11y (automated) | axe via Playwright | 6 key templates | Every PR | Y |
| A11y (manual) | 10.3 checklist; keyboard + screen reader | Key templates | Per release | Y (pre-launch) |
| Visual regression | Playwright screenshots vs baseline | Key templates, 2 viewports | PRs with UI diff | N (manual approve) |
| Performance | Lighthouse CI, mobile profile | 6 key templates | Every PR | Y (10.2 thresholds) |
| SEO validation | Schema validator; sitemap/robots fetch | JSON-LD all templates; sitemap.xml, robots.txt | Every PR; pre-launch live | Y |
| Form end-to-end | Playwright on staging | DB row + Resend email + redirect, 4 forms | Pre-launch + monthly | Y (pre-launch) |
| Booking end-to-end | Scripted manual test | Embed, routing form, fallback card | Pre-launch | Y (pre-launch) |
| Newsletter end-to-end | Scripted manual test | Subscribe → double opt-in → list | Pre-launch | Y (pre-launch) |
| Backup/restore | Throwaway Dokploy restore (9.5) | Full app DB rebuild | Quarterly | Y (calendar) |
| Cross-browser | Playwright: Chromium, Firefox, WebKit; real iOS Safari | Key templates | Every PR; device pass per release | Y |

Usage note: "Gate? Y" blocks the action in its "When run" column; visual regression stays advisory because CMS-driven screenshot diffs need human triage.

### 10.7 Release and regression gates

#### 10.7.1 Per-PR gates, per-phase gates, pre-launch gates

Per-PR, the 9.3 pipeline gains Lighthouse CI and axe stages after Build; a budget breach blocks merge with no override. Per-phase, chapter 11's acceptance criteria cite this register (P6 owns performance hardening). Pre-launch, the checklist below is release-blocking.

**Launch quality-gate checklist.**

- [ ] Lighthouse mobile on all 6 key templates: Performance ≥90, Accessibility 100, Best Practices ≥95, SEO 100[^87^][^88^].
- [ ] CWV field eligibility confirmed: CrUX collecting; origin summary live in PageSpeed Insights.
- [ ] JSON-LD validates on every template (Organization, Service, Article, FAQPage, BreadcrumbList per ch.8).
- [ ] sitemap.xml enumerates all launch URLs; robots.txt live with the ch.8 crawler policy.
- [ ] 10.3 WCAG 2.2 AA checklist passed on all key templates; sign-off dated.
- [ ] Forms end-to-end: Postgres row, Resend delivery, thank-you redirect — all 4 launch forms.
- [ ] Booking end-to-end: routing form qualifies; booking confirms; fallback card renders with embed disabled.
- [ ] Newsletter end-to-end: subscribe → double opt-in → list entry → unsubscribe.
- [ ] Backup verified: manual dump of all three databases restored into a throwaway instance[^79^].
- [ ] Rollback armed: previous GHCR tag recorded; external monitor live (9.4, 9.6).
- [ ] Compliance register (10.5) re-verified against current target markets — any change in target markets (new regions, dropped regions) re-triggers counsel review of the jurisdiction rows and the cookie-banner decision tree before launch.

**Enforcement-loop figure (describe to designer).** A six-node cycle: "Pull request opened" → "CI gates: lint, typecheck, unit/integration, axe" → "Lighthouse CI gate: 10.2 register on 6 key templates" → diamond "Budgets green?" — NO returns to "Pull request opened" with the failing metric annotated; YES → "Merge → image → Dokploy deploy (9.3)" → "Field monitoring: CrUX p75 + Umami + Uptime Kuma" → diamond "Regression? (LCP >20% post-deploy, CWV p75 breach, uptime alert)" — NO loops back to field monitoring; YES → "Regression alert → fix branch (9.4 rollback if severe)", feeding back into "Pull request opened". Annotate the field-monitoring node: "Lab gates catch breaches pre-merge; field monitoring catches what labs cannot — real devices, real networks." A Mermaid rendering may accompany the figure.
