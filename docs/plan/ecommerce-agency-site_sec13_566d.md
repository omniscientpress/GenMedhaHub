## 13. Risks, Assumptions, Open Questions, and Change Control

Chapters 3–12 state what will be built; this chapter states what can go wrong, what is taken on trust, what still needs a client decision, and the only lawful procedure for changing anything once execution starts.

### 13.1 Risk register

#### 13.1.1 Minimum items: Payload 4.0 mid-build; Figma-acquisition drift; EOS dates passing; Listmonk single-maintainer; thin migration content; contested claims; AI-agent scope drift; plus scope-change, compliance, and estimate risks

Likelihood and Impact are qualitative judgments (judgment call), not measured probabilities.

| Risk | Likelihood | Impact | Mitigation | Chapter ref |
|---|---|---|---|---|
| Payload 4.0 ships mid-build | Med | High | Pin 3.86 exactly; upgrade watch; no majors pre-launch[^1^][^3^][^57^] | 6.1 |
| Figma-acquisition roadmap drift | Low | Low | Self-host chosen; MIT core; exit = pinned fork[^58^] | 6.1 |
| EOS dates pass during build, staling urgency copy | Med | Med | Freshness rule: EOS anchors re-verified at P6 gate[^44^] | 4.11, 8 |
| Listmonk single-maintainer stalls | Med | Med | Managed fallbacks (Buttondown, MailerLite); Postgres subscriber export[^66^][^67^] | 7.5 |
| Thin content on 6 migration pages | Med | High | Anti-thinness gate: ≥800 words, pair-differentiation, phased publishing[^35^] | 3.1.1, 8 |
| Thin region pages read as doorway pages (D8) | Med | High | Same gate + mandatory market context, logistics, compliance notes[^35^] | 3.1.1, 8.3.2 |
| Contested claims published as fact | Med | High | Attribution discipline per 13.5; superlatives blocked at P4 sign-off[^28^] | 2, 13.5 |
| Scope drift in AI-agent execution | High | High | Ch.12 scope-outs + stop conditions; phase-gate evidence rule | 11.1, 12 |
| Positioning dilution across 6 pillars (D8) | Med | High | Anti-dilution rule: never claim equal depth; hero stays ecommerce | 2.1, 2.8 (D1) |
| Scope-creep precedent from mid-build expansion (D8) | Med | Med | All additions route through 13.4; scope frozen at D8 baseline | 13.4 |
| UAE/Saudi PDPL, DPDP summaries unverified | Med | High | (judgment call / verify with counsel) flags; counsel confirms pre-launch | 10.5 |
| 85–116 person-day estimate misses | Med | Med | Judgment bands; sanity-checked vs observed build/migration tiers; additions re-roll, never absorb[^23^][^39^] | 11.10 |

The highest-severity cluster is execution discipline — scope drift, dilution, claims hygiene — not technology: every technical risk carries a structural mitigation already priced into the plan, while the discipline risks carry only procedural ones, which is why chapter 12's stop conditions and 13.4 exist. Both content risks terminate at the P4 anti-thinness gate, which converts missing copy into a hard blocker and protects GenMedha Hub from the Pointer-pattern failure of programmatic pages without substance[^35^]. The three High-impact rows warrant client review at every phase gate.

### 13.2 Assumption register

#### 13.2.1 Verified vs client-input vs judgment: naming, entity, case studies, team size, benchmark acceptance, Kimi Code capability, and expanded-scope assumptions

| Assumption | Type | Source / where used | Impact if wrong |
|---|---|---|---|
| GenMedha Hub naming pending; placeholder used | Client input | All chapters | Global find-replace pre-launch; no rework |
| India-based entity; GDPR conditional on EU targeting | Client input | 10.5 jurisdiction rows | Counsel re-review of rows + cookie tree |
| No existing client case studies | Client input | 5.4.1 placeholder schema; ch.8 build-in-public | Placeholders swapped for real proof — an upgrade |
| 1–2 developers, full-time | Judgment call | 11.1.1 estimation basis | All phase bands re-roll |
| Client accepts published benchmark bands | Judgment call | 2.5 pricing; 13.3 | Pricing-page redesign |
| Kimi Code executes 9-part prompt packs within scope-outs | Judgment call | Ch.12 structure | Stop conditions trigger; human takes the phase |
| Build & Grow pillars carry equal build priority | Client input (confirm) | D3 IA; 11.5 | P3/P4 re-sequencing |
| Stack-coherence choices accepted (Next.js; React Native/Expo) | Judgment call per D2; client may override | 2.5 narratives | Three service pages rewritten |
| No physical offices claimed in any market | Client input | D5; markets pages | Claims rewrite; trust damage |
| Markets prioritized India / USA / UAE-GCC | Client input | Ch.3; 8.3; 10.5 | Markets pages, compliance rows re-scoped |
| Content writing resourced separately from mid-P2 | Judgment call | 11.10 critical path | P4 calendar slips |
| Entry tiers suffice at launch (Cal.com free; Resend 3,000/mo; Listmonk+SES ~$8–10/mo) | Judgment call | Ch.7; 11.10[^60^][^64^][^66^] | Tier upgrades; modest cost uplift |

Usage note: a violated assumption is a 13.4 change-control trigger for the chapters in its row, not an informal adjustment.

### 13.3 Open decisions

#### 13.3.1 Decision-needed register with options and blocks-which-phase

| Question | Options | Recommendation | Blocks which phase |
|---|---|---|---|
| Final brand name and domain | Register new / use existing | No research default — client decision | P0; hard block P7 (DNS) |
| Confirm target-market jurisdictions | Addendum set ± additions | Default: India/USA/UAE-GCC (D3) | P4, P6 |
| Final pricing numbers | Bands / POA / hybrid | Bands — transparency differentiates[^41^][^52^] | P4 (/pricing) |
| Medusa Expert application timing | Now / after first Cloud project | After ≥1 live Cloud project — the eligibility rule[^11^] | Post-launch |
| Cal.com cloud vs self-host | Cloud free / AGPL self-host | Cloud at launch; self-host only for residency demands[^60^][^61^][^62^] | P5 |
| Resend EU residency tier | Free (US) / Pro+ EU | Pro if GDPR in scope[^64^] | P5 |
| R2 vs MinIO | R2 / on-VPS MinIO | R2 for zero egress; MinIO env-var fallback[^56^] | P2 |
| HubSpot tier at launch | Free / Starter $20/seat/mo | Free until triggers: >1,000 contacts, >2 users, branding removal, multi-step automation[^94^] | P5 |
| Apollo tier | Free / Basic $49/user/mo | Free; upgrade on >2 active sequences or native HubSpot sync need[^95^][^96^] | Post-launch |
| Clay adoption | Free evaluation / Growth $495/mo | Free as evaluation sandbox only; Growth when outbound volume justifies CRM sync[^97^] | Post-launch |
| Outreach sending domain | Lookalike domain / primary domain | Lookalike (e.g., genmedhahub.co) + separate mailbox + 2–3 week warm-up — never cold-send from genmedhahub.com[^98^] | Post-launch (before outreach starts) |
| Marketing tool-stack ownership (ad accounts, analytics) | Agency-owned / client-owned | Client-owned properties, agency admin access (judgment call) | Post-launch |
| Apple/Google developer accounts | Now / on first app engagement | Blocks nothing at build; needed before store-linked app claims | Post-launch |
| hreflang / multilingual | Single-language / prepare hreflang | Single language at launch; future option (D6) | Blocks nothing |

Only three decisions gate the build: brand/domain, market confirmation, and pricing numbers must close before their blocking phases; the integration-tier rows carry researched defaults acceptable as-is; the post-launch rows are recorded so they are not rediscovered mid-engagement. Clear the P0-blocking row in week one and the two P4-blocking rows while P0–P2 execute. Every accepted default locks on client sign-off and thereafter moves only through 13.4.

### 13.4 Change control

#### 13.4.1 How locked decisions, page scope, integrations, budgets, and estimates may change; change-request template

Five artifact classes lock at client sign-off: stack pins (6.1), the 54-route page scope (3.x), the integration matrix (ch.7), infrastructure budgets (ch.9), and the 85–116 person-day bands (11.10). Any change follows one procedure: submit the template below; assess impact against every lock touched; approver signs accept, reject, or defer; affected chapters are amended with a version note. The 2026-07-28 scope expansion is the canonical worked example — processed as a binding addendum that re-rolled P3/P4 up ~30–40% and amended nine chapters by recorded decision (D1–D9), not by drift.

**Change-request template** (one per change; copy verbatim):

| Field | Entry |
|---|---|
| Requested change | One sentence; the artifact(s) touched |
| Trigger | Client directive / violated assumption / new verified fact / execution blocker |
| Impact on locked decisions, scope, phases, estimates | Per artifact: which lock moves, which phases re-roll, new estimate band |
| Alternatives considered | Including "do nothing" and "defer to post-launch" |
| Decision | Accept / reject / defer, with rationale |
| Approver | Named client-side approver |
| Date | Decision date |
| Applied to chapters | Chapters and sections amended; version-note reference |

### 13.5 Claims hygiene and final handover

#### 13.5.1 Contested and single-source claims; final handover checklist and immediate execution sequence

**Claims-hygiene checklist** — each contested or single-source claim handled per cross-verification:

- [ ] Nebulab's "Shopify discourages headless" used only as "some analysts argue" with attribution, or omitted — contradicted by Shopify's Hydrogen update[^27^][^28^]
- [ ] INP-as-ranking-signal omitted or qualified as single-source; CWV thresholds (LCP ≤2.5s, INP ≤200ms, CLS ≤0.1) stand as confirmed[^84^]
- [ ] Adobe Commerce license figures attributed as partner estimates, never Adobe-published pricing[^38^]
- [ ] Shopify ecosystem scale stats attributed as secondary-aggregator estimates[^25^][^26^]
- [ ] Rigby, Webbers, and Diff excluded as factual references — unverifiable at research time
- [ ] No exact count or ordering of Medusa Experts listings stated as fact[^10^]
- [ ] UAE PDPL, Saudi PDPL, and DPDP Act 2023 summaries flagged (judgment call / verify with counsel); counsel confirms pre-launch (10.5)
- [ ] llms.txt positioned as ship-as-hygiene, never a ranking or AI-citation lever[^74^]

**Final handover checklist — required before Phase 0:**

- [x] Final brand name and domain registered — GenMedha Hub, genmedhahub.com (locked 2026-07-28)
- [ ] DNS, GitHub/GHCR, and VPS (Dokploy) access credentials delivered
- [ ] HubSpot free account created (EU data region if GDPR in scope); private-app token issued for the P5 wiring (7.10)[^94^]
- [ ] Outreach sending domain registered (genmedhahub.co or similar) with warm-up scheduled before Apollo sequences begin — post-launch, not a P0 blocker (7.10)[^98^]
- [ ] Cal.com account created (cloud free tier unless 13.3 decides otherwise)[^60^]
- [ ] Resend account and sending domain verified[^64^]
- [ ] S3/R2 bucket provisioned, credentials separate from backups[^56^][^79^]
- [ ] Client review cadence agreed: ≤3 business days per phase gate (11.10)

**Immediate execution sequence:** close the three build-gating open decisions (13.3) → issue the Phase 0 prompt from chapter 12 → close the P0 gate on runnable evidence (11.1) → proceed P1–P7 in dependency order, one gate at a time → P7 cutover, restore test, +14-day review → operational handover per the 9.8 runbook.

From here forward, this document is the single source of truth for the build: every prompt chapter 12 issues quotes it, every phase gate measures against it, and every disagreement resolves back to it — or changes it, through 13.4 and only through 13.4.
