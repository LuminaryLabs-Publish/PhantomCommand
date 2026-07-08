# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-08T07:50:47-04:00`

## Goal

Update internal docs for one chosen `LuminaryLabs-Publish` repo by comparing the full Publish repo list against the central `LuminaryLabs-Dev/LuminaryLabs` ledger, selecting the next eligible repo, and writing a repo-local `.agent` breakdown plus a central change log.

## Checklist

- [x] Listed the accessible `LuminaryLabs-Publish` repos.
- [x] Compared checked repos against central ledger/readback state.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Selected one repo only: `LuminaryLabs-Publish/PhantomCommand`.
- [x] Read current repo-local `.agent` state.
- [x] Read `README.md`.
- [x] Read `package.json`.
- [x] Read `index.html`.
- [x] Read `game.html`.
- [x] Read `src/kits/construct-spiral-intro-kit/index.js`.
- [x] Identified interaction loop.
- [x] Identified domains in use.
- [x] Identified services offered by kits.
- [x] Identified implemented, inline, and next-cut kits.
- [x] Added a timestamped architecture DSK/domain audit.
- [x] Added a timestamped render handoff audit.
- [x] Added a scenario-bootstrap fixture matrix.
- [x] Updated required root `.agent` files.
- [x] Updated `.agent/kit-registry.json`.
- [x] Added this timestamped tracker entry.
- [x] Added a timestamped turn-ledger entry.
- [x] Updated the central ledger.
- [x] Added a central internal change-log entry.

## Selection result

`PhantomCommand` was selected as the fallback follow-up target.

All checked non-Cavalry Publish repos are represented in the central ledger and have root `.agent` state. `PhantomCommand` is the oldest checked target with a still-unclosed construct-to-scenario authority seam in this cycle.

## Current product read

`PhantomCommand` is a static Vite / Three.js single-player PvE undead RTS prototype.

The active route is:

```txt
index.html
  -> game.html
  -> inline smooth-ring-handoff-v6 construct proof
```

The live app currently presents a menu and then a visual construct scene where 10 contiguous stone rings assemble around a Grim Reaper Totem and a Phantom Commander blockout.

## Interaction loop

```txt
open index.html
  -> Start/Open Scene routes to game.html
  -> Three.js scene initializes inline
  -> smooth-ring-handoff-v6 constants define the construct
  -> rings and pieces are generated inline
  -> requestAnimationFrame drives construct(seq)
  -> HUD mutates progress/count/phase/status
  -> player can pan, zoom, skip, and restart
  -> GameHost exposes skipConstruct/restartConstruct/getState
  -> phase becomes command online when all pieces settle
```

## Runtime evidence

```txt
BUILD_ID: smooth-ring-handoff-v6
RING_COUNT: 10
RING_GAP_BASE: 0
RING_GAP_GROWTH: 0
MOVE_SECONDS: 2.6
DROP_START_SECONDS: 0.08
RING_HANDOFF: 0.72
PART_STAGGER: 0.025
PREWARM_SECONDS: 0.45
START_RADIUS_MULTIPLIER: 1.38
START_HEIGHT_BASE: 24
ringParts: [5,5,5,5,6,8,10,12,16,20]
totalPieces: 92
totalBuildSeconds: 19.923
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
construct-source-fingerprint
construct-source-snapshot
ring-descriptor-generation
piece-descriptor-generation
piece-delay-policy
piece-settle-policy
inner-first-timeline-contract
ring-transition-margin-policy
construct-event-envelope
construct-event-result
construct-event-reducer
construct-completion-idempotency
construct-event-journal
construct-snapshot-contract
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

## Services the current kit offers

```txt
construct-spiral-intro-kit
  -> create generic construct piece ids
  -> create generic construct schedules
  -> install pieces
  -> reset state
  -> update progress over time
  -> emit snapshots
  -> expose schedule/pending/active/settled piece queries
  -> expose newly active and newly settled piece queries
  -> expose per-piece progress/status queries
```

## Kits identified

Implemented:

```txt
construct-spiral-intro-kit
construct-spiral-intro-kit-smoke
```

Inline runtime kits to extract:

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

Next-cut kits:

```txt
phantom-command-smooth-handoff-profile-kit
phantom-command-source-profile-fingerprint-kit
phantom-command-ring-descriptor-kit
phantom-command-piece-descriptor-kit
phantom-command-handoff-timeline-contract-kit
phantom-command-profile-parity-report-kit
phantom-command-construct-event-result-kit
phantom-command-construct-snapshot-contract-kit
phantom-command-scenario-bootstrap-result-kit
phantom-command-scenario-bootstrap-snapshot-kit
phantom-command-gamehost-diagnostics-adapter-kit
phantom-command-fixture-script-runner-kit
```

## Main finding

The repo should not jump from construct viewer directly into RTS gameplay.

The next meaningful proof is a construct result and scenario bootstrap fixture gate:

```txt
source profile parity
  -> ring/piece/timing descriptors
  -> ConstructEventResult idempotency
  -> ConstructSnapshot
  -> ScenarioBootstrapResult gating
  -> ScenarioBootstrapSnapshot
  -> additive GameHost diagnostics
```

## Files changed in this pass

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-08T07-50-47-04-00-dsk-domain-breakdown.md
.agent/render-audit/2026-07-08T07-50-47-04-00-construct-render-handoff.md
.agent/scenario-bootstrap-audit/construct-result-fixture-matrix.md
.agent/trackers/2026-07-08T07-50-47-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T07-50-47-04-00.md
```

## Next safe ledge

```txt
PhantomCommand Construct Result + Scenario Bootstrap Fixture Gate
```

Keep `index.html -> game.html`, the `smooth-ring-handoff-v6` visual, and `window.GameHost.skipConstruct/restartConstruct/getState` stable while adding source-owned parity descriptors, construct event results, scenario bootstrap results, snapshots, and DOM-free fixtures.
