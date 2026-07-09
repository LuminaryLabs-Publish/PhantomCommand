# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-08T20-52-00-04-00`

## Plan ledger

**Goal:** Refresh repo-local `.agent` docs for one eligible Publish repo, identify loop/domains/services/kits, and keep the central LuminaryLabs ledger aligned without touching runtime source.

**Checklist:**

- [x] Compared accessible `LuminaryLabs-Publish` repository list.
- [x] Compared Publish repo list against `LuminaryLabs-Dev/LuminaryLabs` central repo-ledger state.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Selected one repo only: `LuminaryLabs-Publish/PhantomCommand`.
- [x] Read repo-local `.agent` state.
- [x] Read `package.json`.
- [x] Read `game.html`.
- [x] Read `src/kits/construct-spiral-intro-kit/index.js`.
- [x] Identified interaction loop.
- [x] Identified all domains in use.
- [x] Identified all services the kits offer.
- [x] Identified implemented, inline, and next-cut kits.
- [x] Updated required root `.agent` files.
- [x] Added architecture, render, gameplay, source-profile, scenario-bootstrap, and deploy audits.
- [x] Added timestamped turn-ledger entry.
- [x] Updated central repo ledger.
- [x] Added central internal change log.
- [x] Pushed to main.

## Selection result

`PhantomCommand` was selected as the oldest eligible fallback by central sampled alignment after excluding `TheCavalryOfRome` and after confirming no checked non-Cavalry Publish repo was fully new, ledger-absent, undocumented, recently added but undocumented, or missing sampled root `.agent` state.

## Publish organization repositories checked

```txt
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent observed / latest central 2026-07-08T20-30-19-04-00
LuminaryLabs-Publish/AetherVale          tracked / root .agent observed / latest central 2026-07-08T18-58-10-04-00
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent observed / latest central 2026-07-08T20-10-32-04-00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PhantomCommand      selected / oldest sampled central 2026-07-08T18-41-41-04-00
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent observed / latest central 2026-07-08T19-30-31-04-00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent observed / latest central 2026-07-08T19-21-15-04-00
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent observed / latest central 2026-07-08T20-21-59-04-00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent observed / latest central 2026-07-08T19-50-20-04-00
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent observed / latest central 2026-07-08T18-51-55-04-00
```

## Current route read

```txt
index.html
  -> game.html
  -> Three.js CDN
  -> inline smooth-ring-handoff-v6 construct runtime
```

## Interaction loop

```txt
open index.html
  -> Start/Open Scene routes to game.html
  -> game.html creates Three.js renderer, scene, fog, lights, camera, HUD, materials, and input state inline
  -> smooth-ring-handoff-v6 constants generate 10 no-gap construct rings
  -> ringParts() computes [5,5,5,5,6,8,10,12,16,20]
  -> makePiece() creates 92 wedge/seam piece groups
  -> requestAnimationFrame drives construct(seq), camera orbit, pan, zoom, and renderer.render
  -> user can pan, zoom, skip, and restart
  -> HUD shows constructed count, phase, build id, and progress
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
construct-source-fixture-row-contract
construct-source-fixture-runner
construct-descriptor-authority
ring-descriptor-generation
piece-descriptor-generation
piece-delay-policy
piece-settle-policy
handoff-timeline-contract
gamehost-source-diagnostics
gamehost-source-profile-readback
gamehost-legacy-compatibility
central-ledger-readback
source-profile-consumer-splice
fixture-build-integration
construct-event-envelope
construct-event-result
construct-completion-idempotency
scenario-bootstrap-gate
scenario-bootstrap-blocker
```

## Services identified

```txt
current runtime services:
  serve menu route
  serve game route
  route Start/Open Scene to game.html
  create Three.js renderer/scene/camera/lights/materials/HUD/input state
  create live source constants inline
  derive ring descriptors inline
  derive piece counts inline
  create wedge/seam geometry inline
  animate construct pieces by ringStartTimes and PART_STAGGER
  handle pan, zoom, skip, restart, resize, and blur
  mutate HUD phase/progress/count/status
  expose GameHost skipConstruct/restartConstruct/getState

implemented kit services:
  construct-spiral-intro-kit creates ids, schedules, installed piece state, reset/update snapshots, pending/active/settled/newlyActive/newlySettled queries, progress, and status
  construct-spiral-intro-kit-smoke validates generic schedule behavior

needed next services:
  source-owned smooth-ring-handoff-v6 profile
  profile normalizer
  ring descriptor generator
  piece descriptor generator
  timeline contract generator
  source fingerprint and source snapshot
  parity report rows
  additive GameHost sourceProfile diagnostics
  central ledger readback
  fixture build gate
  scenario bootstrap blocker
```

## Kits identified

```txt
implemented:
  construct-spiral-intro-kit
  construct-spiral-intro-kit-smoke

inline / candidate extraction:
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

next-cut:
  phantom-command-smooth-handoff-profile-kit
  phantom-command-source-profile-fingerprint-kit
  phantom-command-source-profile-snapshot-kit
  phantom-command-ring-descriptor-kit
  phantom-command-piece-descriptor-kit
  phantom-command-handoff-timeline-contract-kit
  phantom-command-profile-parity-report-kit
  phantom-command-gamehost-source-diagnostics-kit
  phantom-command-source-profile-fixture-kit
  phantom-command-gamehost-source-consumer-kit
  phantom-command-central-ledger-readback-kit
  phantom-command-fixture-build-integration-kit
  phantom-command-construct-event-envelope-kit
  phantom-command-construct-event-result-kit
  phantom-command-scenario-bootstrap-gate-kit
  phantom-command-scenario-bootstrap-blocker-kit
```

## Main finding

The live construct is visually stable and should not be rewritten first. The missing high-value proof is that `smooth-ring-handoff-v6` can be represented as source-owned profile/descriptors, proven by DOM-free fixture rows, then consumed additively by `GameHost.getState().sourceProfile` without changing legacy fields.

## Next safe ledge

```txt
PhantomCommand SourceProfile Consumer Readback + Fixture Build Gate
```

## Files changed

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-08T20-52-00-04-00-source-profile-consumer-readback-dsk-map.md
.agent/render-audit/2026-07-08T20-52-00-04-00-gamehost-sourceprofile-shape-contract.md
.agent/gameplay-audit/2026-07-08T20-52-00-04-00-construct-to-scenario-blocker-loop.md
.agent/source-profile-audit/2026-07-08T20-52-00-04-00-fixture-row-consumer-readback-contract.md
.agent/scenario-bootstrap-audit/2026-07-08T20-52-00-04-00-bootstrap-deferral-contract.md
.agent/deploy-audit/2026-07-08T20-52-00-04-00-fixture-build-validation-gate.md
.agent/trackers/2026-07-08T20-52-00-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T20-52-00-04-00.md
```

## Validation

Documentation-only pass.

```txt
runtime source changed: no
branch created: no
pull request created: no
local npm install: no
local npm run build: no
node fixture run: no
browser smoke: no
pushed to main: yes
```
