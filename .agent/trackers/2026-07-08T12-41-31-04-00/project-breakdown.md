# PhantomCommand Project Breakdown — 2026-07-08T12-41-31-04-00

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Branch:** `main`

**Result type:** documentation-only internal breakdown update

## Goal

Refresh the repo-local `.agent` docs after comparing the full `LuminaryLabs-Publish` repo set against the central `LuminaryLabs-Dev/LuminaryLabs` ledger, then narrow `PhantomCommand` from a broad construct-scenario acceptance plan into a concrete source-profile implementation boundary.

## Checklist

- [x] Compare the accessible Publish repo list against central ledger state.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Select one repo only.
- [x] Read repo-local `.agent` state.
- [x] Read central repo ledger state.
- [x] Read README/package/runtime source.
- [x] Identify the current interaction loop.
- [x] Identify domains in use.
- [x] Identify services offered by the kits.
- [x] Identify implemented, inline, and next-cut kits.
- [x] Add timestamped architecture, render, and scenario-bootstrap audits.
- [x] Refresh required root `.agent` docs.
- [x] Update central `LuminaryLabs-Dev/LuminaryLabs` repo ledger.
- [x] Add central internal change-log entry.
- [x] Push only to `main`.

## Publish repo comparison

```txt
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / latest sampled follow-up 2026-07-08T12:01:23-04:00
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent present / latest sampled follow-up 2026-07-08T12:29:17-04:00
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / latest sampled follow-up 2026-07-08T12:21:20-04:00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / latest sampled follow-up 2026-07-08T11:40:00-04:00
LuminaryLabs-Publish/PhantomCommand      selected fallback / previous central update 2026-07-08T10:58:46-04:00
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / latest sampled follow-up 2026-07-08T12:09:27-04:00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / latest sampled follow-up 2026-07-08T11:49:04-04:00
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent present / latest sampled follow-up 2026-07-08T11:28:38-04:00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present / latest sampled follow-up 2026-07-08T11:19:53-04:00
```

No checked non-Cavalry repo was fully new, absent from the central ledger, missing root `.agent` state, or otherwise undocumented.

`PhantomCommand` was selected by the oldest eligible fallback rule and because the live construct proof still needs a source-owned profile boundary before scenario bootstrap or RTS gameplay expansion.

## Current interaction loop

```txt
open index.html
  -> show Phantom Command menu
  -> Start/Open Scene routes to game.html
  -> game.html imports Three.js from CDN
  -> inline runtime creates renderer, scene, fog, lights, camera, HUD, material palette, and input state
  -> inline smooth-ring-handoff-v6 constants define the construct
  -> inline ring math creates 10 contiguous zero-gap ring descriptors
  -> inline ringParts() derives [5,5,5,5,6,8,10,12,16,20]
  -> inline makePiece() creates 92 stone wedge pieces and seam markers
  -> requestAnimationFrame drives construct(seq)
  -> pan, zoom, skip, and restart mutate the visual runtime
  -> HUD reports constructed count, phase, progress, and build id
  -> window.GameHost exposes skipConstruct(), restartConstruct(), and getState()
  -> phase becomes command online when all pieces settle
```

## Target implementation boundary loop

```txt
PhantomProfileSource
  -> normalizeSmoothHandoffProfile()
  -> createProfileFingerprint()
  -> createProfileSnapshot()
  -> deriveRingDescriptors()
  -> derivePieceDescriptors()
  -> deriveTimingDescriptors()
  -> createProfileParityReport()
  -> expose additive GameHost diagnostics
  -> feed ConstructEventResult / ScenarioBootstrapResult later
```

This pass deliberately stops before construct event reducers and scenario bootstrap reducers. The source-profile boundary must be proven first.

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
construct-animation-timeline
inner-first-timeline-contract
ring-transition-margin-policy
construct-event-envelope
construct-event-result
construct-completion-idempotency
construct-snapshot-contract
scenario-bootstrap-command
scenario-bootstrap-preflight
scenario-bootstrap-result
scenario-bootstrap-gate
scenario-bootstrap-snapshot
fixture-script-runner
legacy-gamehost-compatibility
```

## Services that the kits offer

### Current runtime services

```txt
serve static menu route
serve static game route
route Start and Open Scene to game.html
copy static assets into dist
create Three.js renderer, scene, fog, lights, camera, materials, HUD, and input state inline
create live smooth-ring-handoff-v6 source constants inline
create ring descriptors inline from constants
create piece counts from circumference inline
create wedge geometry and seam meshes inline
animate construct pieces through radial/drop interpolation
track progress, phase, total pieces, gaps, part counts, animation config, and completion
allow pan, zoom, skip, and restart controls
expose construct diagnostics through window.GameHost.getState
```

### Implemented kit services

```txt
construct-spiral-intro-kit
  -> createConstructSpiralIntroPieceId
  -> createConstructSpiralIntroSchedule
  -> createConstructSpiralIntroKit
  -> installPieces
  -> reset
  -> update
  -> snapshot
  -> schedule
  -> activePieces
  -> settledPieces
  -> pendingPieces
  -> newlyActivePieces
  -> newlySettledPieces
  -> getPieceProgress
  -> getPieceStatus

construct-spiral-intro-kit-smoke
  -> asserts generic kit identity and schedule behavior
  -> installs generated ring pieces
  -> ticks the generic construct kit until complete
  -> asserts active count cap, active ring window, and settled pieces
```

### Needed next services

```txt
own smooth-ring-handoff-v6 profile outside game.html
normalize profile constants
emit source fingerprint
emit source snapshot
emit serializable ring descriptors
emit serializable piece descriptors
emit timing descriptors for delay, settle, handoff, prewarm, and total build seconds
emit profile parity report
prove zero gaps and live part-count parity
prove 92 total pieces
prove total build seconds 19.923
project additive GameHost source diagnostics
run DOM-free source-profile fixture
```

## Kits identified

### Implemented / source-backed

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
phantom-command-gamehost-source-diagnostics-kit
phantom-command-source-profile-fixture-kit
phantom-command-construct-event-envelope-kit
phantom-command-construct-event-result-kit
phantom-command-scenario-bootstrap-command-kit
phantom-command-scenario-bootstrap-result-kit
phantom-command-scenario-bootstrap-snapshot-kit
```

## Main finding

`game.html` is still the source of truth for the live `smooth-ring-handoff-v6` values. It owns `BUILD_ID`, ring count, gap policy, timing policy, `ringParts()`, wedge creation, construct animation, completion phase, HUD writes, and `window.GameHost` inline.

The existing `construct-spiral-intro-kit` is useful, but it is generic spiral/window scheduling. It should remain a regression guard until a Phantom-specific source profile and parity fixture prove the live construct values outside `game.html`.

## Files changed in this pass

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-08T12-41-31-04-00-dsk-domain-breakdown.md
.agent/render-audit/2026-07-08T12-41-31-04-00-gamehost-source-profile-readback.md
.agent/scenario-bootstrap-audit/2026-07-08T12-41-31-04-00-source-profile-implementation-boundary.md
.agent/trackers/2026-07-08T12-41-31-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T12-41-31-04-00.md
```

## Validation

Performed:

```txt
GitHub source readback
central ledger readback
repo-local .agent readback
README/package/game source inspection
construct-spiral-intro-kit source inspection
repo-local documentation update
central ledger update
central internal change-log entry
```

Not performed:

```txt
npm install
npm run build
npm start
node tests/construct-spiral-intro-kit-smoke.mjs
browser smoke
GitHub Pages deploy check
runtime source edit
```

## Next safe ledge

```txt
PhantomCommand Source Profile Implementation Boundary
```

Start by adding source-profile and descriptor parity modules. Do not implement scenario bootstrap reducers or RTS gameplay until the source profile fixture passes without DOM, canvas, Three.js, or HUD mutation.