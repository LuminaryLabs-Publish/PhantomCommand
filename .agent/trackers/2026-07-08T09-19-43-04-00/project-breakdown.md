# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-08T09:19:43-04:00`

## Plan ledger

**Goal:** Compare the full accessible `LuminaryLabs-Publish` repo list against the central ledger, choose one eligible repo, update root `.agent/` docs, identify interaction loop/domains/services/kits, and log the work centrally.

**Checklist**

- [x] Listed accessible `LuminaryLabs-Publish` repos.
- [x] Compared checked repos against `LuminaryLabs-Dev/LuminaryLabs` ledger state.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Selected one repo only: `LuminaryLabs-Publish/PhantomCommand`.
- [x] Read repo-local `.agent/START_HERE.md`.
- [x] Read repo-local current, gap, next-step, validation, and kit-registry docs.
- [x] Read `README.md`.
- [x] Read `package.json`.
- [x] Read `game.html`.
- [x] Read `src/kits/construct-spiral-intro-kit/index.js`.
- [x] Read `tests/construct-spiral-intro-kit-smoke.mjs`.
- [x] Identified the interaction loop.
- [x] Identified all active and target domains.
- [x] Identified kit services.
- [x] Identified current and next-cut kits.
- [x] Updated required root `.agent/` files.
- [x] Added architecture audit.
- [x] Added render audit.
- [x] Added system-specific scenario bootstrap audit.
- [x] Added timestamped tracker entry.
- [x] Added timestamped turn-ledger entry.
- [x] Updated central ledger.
- [x] Added central internal change-log entry.
- [ ] Did not run local or browser validation.

## Repo selected

```txt
LuminaryLabs-Publish/PhantomCommand
```

## Selection reason

No checked non-Cavalry Publish repo was fully new, central-ledger absent, undocumented, or missing root `.agent/START_HERE.md` state.

`PhantomCommand` was selected as the oldest eligible fallback follow-up because the live `smooth-ring-handoff-v6` proof still has a source/result authority gap:

```txt
game.html visual completion
  != typed construct result
  != typed scenario bootstrap gate
  != fixture-readable source snapshot
```

## Publish repos checked

```txt
LuminaryLabs-Publish/HorrorCorridor      tracked with root .agent
LuminaryLabs-Publish/AetherVale          tracked with root .agent
LuminaryLabs-Publish/TheOpenAbove        tracked with root .agent
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PhantomCommand      selected fallback follow-up
LuminaryLabs-Publish/PrehistoricRush     tracked with root .agent
LuminaryLabs-Publish/ZombieOrchard       tracked with root .agent
LuminaryLabs-Publish/IntoTheMeadow       tracked with root .agent
LuminaryLabs-Publish/MyCozyIsland        tracked with root .agent
LuminaryLabs-Publish/TheUnmappedHouse    tracked with root .agent
```

## Current product read

`PhantomCommand` is a static Vite / Three.js single-player PvE undead RTS prototype.

Current route:

```txt
index.html
  -> game.html
  -> inline smooth-ring-handoff-v6 construct proof
```

`README.md` says `index.html` is the main menu, `game.html` is the opening construct scene, and Pages deployment runs from `main` through `.github/workflows/deploy-pages.yml`.

`package.json` exposes:

```txt
npm start -> vite --host 0.0.0.0 --port 4173
npm dev -> vite --host 0.0.0.0 --port 4173
npm run build -> node scripts/build-static.mjs
npm preview -> vite preview --host 0.0.0.0 --port 4173
```

## Current interaction loop

```txt
open index.html
  -> main menu renders title, subtitle, Start button, and Open Scene link
  -> Start/Open Scene routes to game.html
  -> game.html imports Three.js from CDN
  -> inline runtime creates renderer, scene, camera, fog, lights, materials, HUD, and input state
  -> inline constants define smooth-ring-handoff-v6
  -> inline ring math creates 10 no-gap construct rings
  -> inline wedge geometry creates 92 stone pieces
  -> construct(seq) animates each piece by ring delay and part delay
  -> WASD/arrows pan the camera
  -> mouse wheel zooms
  -> Space/Skip jumps to complete
  -> R/Restart restarts
  -> HUD reports constructed count, phase, build id, and progress
  -> window.GameHost exposes skipConstruct(), restartConstruct(), and getState()
```

## Domains identified

```txt
static-app-shell
main-menu-routing
static-game-route
vite-static-build
github-pages-deploy
browser-render-host
webgl-canvas-host
three-render-scene
scene-fog-lighting
stone-material-palette
camera-navigation
keyboard-pan-input
wheel-zoom-input
button-input
hud-diagnostics
gamehost-authority
inline-construct-runtime
smooth-ring-handoff-v6-profile
construct-source-authority
construct-profile-normalization
construct-profile-parity
construct-source-fingerprint
construct-source-snapshot
construct-descriptor-authority
ring-count-policy
ring-width-policy
ring-growth-policy
no-gap-radius-policy
ring-part-count-policy
ring-descriptor-generation
piece-descriptor-generation
piece-id-policy
piece-seed-policy
piece-angle-policy
piece-start-pose-policy
piece-final-pose-policy
piece-delay-policy
piece-settle-policy
wedge-geometry-generation
stone-material-detail
construct-animation-timeline
inner-first-timeline-contract
ring-transition-margin-policy
construct-event-envelope
construct-event-result
construct-event-reducer
construct-completion-idempotency
construct-event-journal
construct-snapshot-contract
construct-diagnostics-projection
scenario-bootstrap-command
scenario-bootstrap-preflight
scenario-bootstrap-result
scenario-bootstrap-gate
scenario-bootstrap-journal
scenario-bootstrap-snapshot
scenario-mode-state-machine
rts-boundary-placeholder
fixture-script-runner
legacy-gamehost-compatibility
```

## Kit services identified

### Current app/runtime services

```txt
serve static menu route
serve static game route
route Start and Open Scene to game.html
build Three.js renderer, scene, camera, lights, fog, HUD, materials, and input state inline
create live source constants inline
create ring descriptors inline from constants
create piece counts from circumference inline
create wedge geometry and seam meshes inline
animate construct pieces through radial and drop interpolation
track progress, phase, total pieces, gaps, part counts, animation config, and completion
allow pan, zoom, skip, and restart controls
expose construct diagnostics through window.GameHost.getState
```

### Implemented source-kit services

```txt
construct-spiral-intro-kit
  -> create generic construct piece ids
  -> create generic construct schedules
  -> install pieces
  -> reset state
  -> update progress over time
  -> emit snapshots
  -> report pending, active, settled, newly active, and newly settled pieces
  -> report per-piece progress and status
```

### Needed source/result services

```txt
own live smooth-ring-handoff-v6 profile outside game.html
normalize profile values
emit source fingerprint
emit source snapshot
emit serializable ring descriptors
emit serializable piece descriptors
emit serializable delay and settle descriptors
emit serializable timeline margin descriptors
prove zero gaps and live part-count parity
prove 92 total pieces
prove total build seconds 19.923
emit accepted and rejected construct event envelopes
emit construct event results
reject duplicate construct completion with stable reason duplicate_construct_complete
project ConstructSnapshot without DOM or Three.js dependency
preflight scenario bootstrap with explicit accepted/rejected result
reject scenario bootstrap before construct completion with stable reason construct_incomplete
accept scenario bootstrap after construct completion
reject duplicate scenario bootstrap with stable reason duplicate_scenario_bootstrap
project ScenarioBootstrapSnapshot with RTS boundary placeholders only
expand window.GameHost diagnostics without breaking current surface
```

## Kits identified

Current:

```txt
construct-spiral-intro-kit
construct-spiral-intro-kit-smoke
```

Inline kits to extract:

```txt
inline-smooth-ring-handoff-v6-profile
inline-ring-descriptor-runtime
inline-piece-descriptor-runtime
inline-piece-delay-runtime
inline-piece-settle-runtime
inline-wedge-geometry-runtime
inline-construct-animation-runtime
inline-construct-hud-runtime
inline-camera-navigation-runtime
inline-gamehost-construct-runtime
```

Next-cut local kits:

```txt
phantom-command-smooth-handoff-profile-kit
phantom-command-source-profile-fingerprint-kit
phantom-command-source-profile-snapshot-kit
phantom-command-ring-descriptor-kit
phantom-command-piece-descriptor-kit
phantom-command-piece-delay-policy-kit
phantom-command-piece-settle-policy-kit
phantom-command-handoff-timeline-contract-kit
phantom-command-profile-parity-report-kit
phantom-command-construct-event-envelope-kit
phantom-command-construct-event-result-kit
phantom-command-construct-event-reducer-kit
phantom-command-construct-completion-idempotency-kit
phantom-command-construct-event-journal-kit
phantom-command-construct-snapshot-contract-kit
phantom-command-scenario-bootstrap-command-kit
phantom-command-scenario-bootstrap-preflight-kit
phantom-command-scenario-bootstrap-result-kit
phantom-command-scenario-bootstrap-gate-kit
phantom-command-scenario-bootstrap-journal-kit
phantom-command-scenario-bootstrap-snapshot-kit
phantom-command-gamehost-diagnostics-adapter-kit
phantom-command-fixture-script-runner-kit
```

## Files changed in `LuminaryLabs-Publish/PhantomCommand`

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-08T09-19-43-04-00-dsk-domain-breakdown.md
.agent/render-audit/2026-07-08T09-19-43-04-00-render-source-authority-map.md
.agent/scenario-bootstrap-audit/2026-07-08T09-19-43-04-00-source-wire-map.md
.agent/trackers/2026-07-08T09-19-43-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T09-19-43-04-00.md
```

## Main finding

The repo has a useful generic `construct-spiral-intro-kit`, but the live v6 construct remains inline in `game.html`. The safest next implementation is not full RTS gameplay and not render extraction. It is a source-profile and result-authority fixture gate that proves the live values, construct completion idempotency, scenario bootstrap gating, and additive GameHost diagnostics.

## Next safe ledge

```txt
PhantomCommand Source Profile + Construct/Scenario Result Wire Map
```

## Validation status

Performed:

```txt
GitHub repo-list read
central ledger readback
repo-local .agent readback
repo-local source readback
documentation writes to PhantomCommand main
central ledger/change-log writes to LuminaryLabs main
```

Not performed:

```txt
local checkout
npm install
npm run build
npm start
node tests/construct-spiral-intro-kit-smoke.mjs
browser smoke
GitHub Pages smoke
runtime source edit
```
