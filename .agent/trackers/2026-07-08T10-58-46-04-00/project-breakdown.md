# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-08T10-58-46-04-00`

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

## Plan ledger

**Goal:** Refresh the internal `.agent` documentation for one eligible Publish repo, compare it against central repo tracking, and narrow the next work into a concrete construct-to-scenario acceptance matrix.

**Checklist:**

- [x] Listed accessible `LuminaryLabs-Publish` repos.
- [x] Compared the Publish set against central `LuminaryLabs-Dev/LuminaryLabs` repo-ledger state.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Selected `LuminaryLabs-Publish/PhantomCommand` as fallback follow-up.
- [x] Read root `.agent/START_HERE.md`.
- [x] Read root audit docs.
- [x] Read `README.md`.
- [x] Read `package.json`.
- [x] Read `game.html`.
- [x] Read `src/kits/construct-spiral-intro-kit/index.js`.
- [x] Identified the current interaction loop.
- [x] Identified active and target domains.
- [x] Identified current and next-needed services.
- [x] Identified implemented, inline, and next-cut kits.
- [x] Added timestamped architecture, render, and scenario-bootstrap audits.
- [x] Refreshed root `.agent` files.
- [x] Refreshed `.agent/kit-registry.json`.
- [x] Added timestamped turn ledger.
- [x] Updated central `LuminaryLabs-Dev/LuminaryLabs` ledger and change log.
- [ ] Run `npm install`.
- [ ] Run `npm run build`.
- [ ] Run existing construct kit smoke.
- [ ] Run the future source acceptance fixture.
- [ ] Browser smoke `index.html -> game.html`.

## Selection audit

Accessible Publish repos checked:

```txt
LuminaryLabs-Publish/IntoTheMeadow       tracked with root .agent
LuminaryLabs-Publish/HorrorCorridor      tracked with root .agent
LuminaryLabs-Publish/AetherVale          tracked with root .agent
LuminaryLabs-Publish/ZombieOrchard       tracked with root .agent
LuminaryLabs-Publish/TheUnmappedHouse    tracked with root .agent
LuminaryLabs-Publish/MyCozyIsland        tracked with root .agent
LuminaryLabs-Publish/TheOpenAbove        tracked with root .agent
LuminaryLabs-Publish/PhantomCommand      selected fallback follow-up
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PrehistoricRush     tracked with root .agent
```

No checked non-Cavalry repo was fully new, central-ledger absent, undocumented, or missing sampled root `.agent/START_HERE.md` state.

`PhantomCommand` was selected because it still has a high-value unresolved seam between the live construct proof, typed construct completion, and scenario bootstrap.

## Current interaction loop

```txt
open index.html
  -> render static Phantom Command menu
  -> Start/Open Scene routes to game.html
  -> game.html imports Three.js from CDN
  -> inline smooth-ring-handoff-v6 constants define the construct
  -> inline ring math derives 10 no-gap rings
  -> inline ringParts() produces [5,5,5,5,6,8,10,12,16,20]
  -> inline makePiece() creates 92 wedge pieces
  -> requestAnimationFrame drives construct(seq)
  -> keyboard/mouse/buttons pan, zoom, skip, and restart
  -> HUD writes count, progress, phase, and build id
  -> GameHost exposes skipConstruct/restartConstruct/getState
  -> visual phase becomes command online
```

## Target interaction loop

```txt
load source-owned smooth-ring-handoff-v6 profile
  -> normalize profile
  -> emit source fingerprint
  -> emit source snapshot
  -> derive ring descriptors
  -> derive piece descriptors
  -> derive timing and margin descriptors
  -> prove parity against current game.html values
  -> accept construct_complete exactly once
  -> reject duplicate construct_complete
  -> project ConstructSnapshot
  -> reject scenario bootstrap before construct completion
  -> accept scenario_001_raise_the_host after completion
  -> reject duplicate bootstrap
  -> project ScenarioBootstrapSnapshot
  -> expose additive GameHost diagnostics
  -> prove the flow through DOM-free fixtures
```

## Domains in use

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

## Services

### Current runtime services

```txt
serve static menu route
serve static game route
route Start and Open Scene to game.html
create Three.js renderer, scene, camera, lights, fog, materials, HUD, and input state inline
create live smooth-ring-handoff-v6 source constants inline
create ring descriptors inline
create piece counts from circumference inline
create wedge geometry and seam meshes inline
animate radial/drop construct pieces
track progress, phase, total pieces, gaps, part counts, animation config, and completion
allow pan, zoom, skip, and restart controls
expose construct diagnostics through window.GameHost.getState
```

### Current kit services

```txt
construct-spiral-intro-kit
  -> create generic construct piece ids
  -> create generic spiral/window schedules
  -> install pieces
  -> reset state
  -> update progress over time
  -> emit snapshots
  -> expose schedule, pending, active, settled, newlyActive, and newlySettled pieces
  -> report per-piece progress and status
```

### Next-needed services

```txt
source-owned smooth-ring-handoff-v6 profile
profile normalization
source fingerprint generation
source snapshot generation
ring descriptor generation
piece descriptor generation
delay and settle descriptor generation
handoff timeline margin reporting
profile parity report
construct event envelope creation
construct result reducer
construct completion idempotency guard
construct event journal projection
ConstructSnapshot projection
scenario bootstrap command creation
scenario bootstrap preflight
scenario bootstrap result reducer
scenario bootstrap journal projection
ScenarioBootstrapSnapshot projection
GameHost diagnostics adapter
DOM-free fixture runner
```

## Kits

### Implemented kits

```txt
construct-spiral-intro-kit
construct-spiral-intro-kit-smoke
```

### Inline runtime kits to extract

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

### Next-cut kits

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

## Files changed

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-08T10-58-46-04-00-scenario-acceptance-dsk-breakdown.md
.agent/render-audit/2026-07-08T10-58-46-04-00-gamehost-render-readback.md
.agent/scenario-bootstrap-audit/2026-07-08T10-58-46-04-00-construct-scenario-acceptance-matrix.md
.agent/trackers/2026-07-08T10-58-46-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T10-58-46-04-00.md
```

## Main finding

The current route should not start full RTS gameplay yet. The next useful implementation pass is a fixture-backed acceptance matrix that proves source parity, construct completion idempotency, scenario bootstrap gating, snapshot serialization, and GameHost compatibility.

## Next safe ledge

```txt
PhantomCommand Construct Scenario Acceptance Matrix
```

Stop when one DOM-free fixture proves profile parity, ring parity, piece parity, timeline parity, construct completion idempotency, scenario bootstrap gating, snapshot serialization, and additive GameHost diagnostics shape.
