# PhantomCommand Scenario Acceptance DSK Breakdown

**Timestamp:** `2026-07-08T10-58-46-04-00`

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

## Selection result

The accessible `LuminaryLabs-Publish` repo list was compared against the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger.

No checked non-Cavalry repo was fully new, central-ledger absent, undocumented, or missing root `.agent/START_HERE.md` state.

`PhantomCommand` was selected as the fallback follow-up because it has a clear unresolved transition seam:

```txt
smooth-ring-handoff-v6 visual completion
  -> typed construct completion event
  -> scenario bootstrap gate
  -> future RTS play mode
```

## Current architecture

```txt
index.html
  -> game.html
  -> inline Three.js renderer
  -> inline smooth-ring-handoff-v6 profile constants
  -> inline ring descriptor math
  -> inline piece descriptor and wedge mesh creation
  -> inline construct(seq) animation and HUD mutation
  -> inline skip/restart controls
  -> inline window.GameHost getState surface
```

`src/kits/construct-spiral-intro-kit/index.js` is implemented and useful, but it is not yet the live v6 authority. It owns a generic spiral/window sequence model with install, reset, update, snapshot, and piece query services.

## Required DSK boundary

The next cut should keep the live route stable and add source-owned, DOM-free authority around completion and bootstrap.

```txt
phantom-command-smooth-handoff-profile-kit
  -> owns build id, ring count, width/gap/timing constants

phantom-command-source-fingerprint-kit
  -> canonicalizes profile values
  -> emits stable fingerprint

phantom-command-ring-descriptor-kit
  -> derives 10 no-gap rings
  -> proves ring parts [5,5,5,5,6,8,10,12,16,20]

phantom-command-piece-descriptor-kit
  -> derives 92 serializable piece descriptors
  -> owns piece ids, ring indexes, part indexes, angles, delays, and settle windows

phantom-command-construct-result-kit
  -> accepts construct_complete exactly once
  -> rejects duplicate construct_complete
  -> projects ConstructSnapshot

phantom-command-scenario-bootstrap-kit
  -> rejects bootstrap before completion
  -> accepts scenario_001_raise_the_host after completion
  -> rejects duplicate bootstrap
  -> projects ScenarioBootstrapSnapshot with RTS placeholders only

phantom-command-gamehost-diagnostics-adapter-kit
  -> adds profile, construct result, scenario result, and fixture summary readback to GameHost without removing existing skip/restart/getState compatibility
```

## Interaction loop

```txt
open index.html
  -> Start/Open Scene routes to game.html
  -> game.html imports Three.js from CDN
  -> smooth-ring-handoff-v6 source values define 10 contiguous rings
  -> 92 wedge pieces animate inside-out
  -> player can pan, zoom, skip, and restart
  -> HUD shows progress and phase
  -> window.GameHost.getState exposes build id, piece counts, ring parts, gaps, timing, and completion phase
  -> target fixture layer accepts/rejects construct and bootstrap events with stable reasons
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
ring-descriptor-generation
piece-descriptor-generation
piece-delay-policy
piece-settle-policy
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

## Services offered by kits

### Current implemented kit services

```txt
construct-spiral-intro-kit
  -> create generic piece ids
  -> create generic spiral/window schedules
  -> install pieces
  -> reset sequence state
  -> update sequence time
  -> emit sequence snapshots
  -> expose scheduled, pending, active, settled, newly active, and newly settled pieces
  -> expose per-piece progress/status
```

### Needed local game services

```txt
source profile normalization
source fingerprint generation
source snapshot projection
ring descriptor generation
piece descriptor generation
handoff delay and settle descriptor generation
transition margin proof
profile parity report
construct event envelope creation
construct event result reduction
construct completion idempotency
construct journal projection
construct snapshot projection
scenario bootstrap preflight
scenario bootstrap result reduction
scenario bootstrap journal projection
scenario bootstrap snapshot projection
GameHost diagnostic projection
DOM-free fixture replay
```

## All kits

### Implemented

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

## Architecture finding

The next implementation should not add full RTS mechanics yet. The correct ledge is an acceptance matrix that proves the construct-to-scenario transition is deterministic, idempotent, and fixture-readable before units, enemies, economy, waves, or combat are attached.
