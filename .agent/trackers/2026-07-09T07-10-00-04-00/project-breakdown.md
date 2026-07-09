# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-09T07-10-00-04-00`

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Branch policy:** only `main`; no new branches; no PR.

## Summary

This pass compared the accessible `LuminaryLabs-Publish` organization repo list against the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger and sampled repo-local `.agent` state. No non-Cavalry repo was new, ledger-missing, root-agent-missing, or otherwise undocumented. `TheCavalryOfRome` remained excluded.

`PhantomCommand` was selected because it had the oldest eligible central ledger timestamp at first read: `2026-07-09T04-50-00-04-00`. The unresolved ledge is still the source-profile proof seam for the live `smooth-ring-handoff-v6` construct.

## Publish repository comparison

```txt
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-09T06-28-53-04-00
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-09T06-51-11-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest 2026-07-09T06-01-30-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T05-11-22-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T05-20-42-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T05-38-20-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T06-20-00-04-00
LuminaryLabs-Publish/PhantomCommand       selected / oldest eligible central-ledger fallback / previous central latest 2026-07-09T04-50-00-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T06-10-35-04-00
```

## Current interaction loop

```txt
open index.html
  -> menu renders Phantom Command route controls
  -> Start button or Open Scene link routes to game.html
  -> game.html imports Three.js from CDN
  -> inline runtime creates renderer, scene, fog, lights, camera, HUD, materials, and input state
  -> inline constants define smooth-ring-handoff-v6
  -> inline ring math creates ten contiguous zero-gap construct rings
  -> inline ringParts() computes [5,5,5,5,6,8,10,12,16,20]
  -> inline wedge geometry creates 92 stone pieces
  -> construct(seq) animates each piece from start pose to final ring position
  -> WASD/arrows pan
  -> wheel zooms
  -> Space/Skip jumps to completion
  -> R/Restart resets
  -> HUD reports constructed count, phase, build id, and progress
  -> window.GameHost exposes skipConstruct(), restartConstruct(), and getState()
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
construct-profile-normalization
construct-source-fingerprint
construct-source-snapshot
ring-descriptor-generation
piece-descriptor-generation
piece-delay-policy
piece-settle-policy
handoff-timeline-contract
source-profile-parity-report
source-profile-fixture-row-contract
gamehost-source-diagnostics
gamehost-source-profile-readback
legacy-gamehost-compatibility
central-ledger-readback
fixture-before-static-artifact
construct-event-envelope-deferred
construct-event-result-deferred
scenario-bootstrap-gate-deferred
```

## Services offered by the current kits

### Implemented kit services

```txt
construct-spiral-intro-kit
  -> exports CONSTRUCT_SPIRAL_INTRO_KIT_ID
  -> exports CONSTRUCT_SPIRAL_INTRO_DOMAIN_PATH
  -> exposes createConstructSpiralIntroPieceId(piece)
  -> exposes createConstructSpiralIntroSchedule(pieces, config)
  -> exposes createConstructSpiralIntroKit(options)
  -> installs pieces
  -> resets schedule state
  -> ticks active/settled/pending state
  -> emits snapshot()
  -> exposes schedule(), activePieces(), settledPieces(), pendingPieces()
  -> exposes newlyActivePieces(), newlySettledPieces()
  -> exposes getPieceProgress(pieceId) and getPieceStatus(pieceId)

construct-spiral-intro-kit-smoke
  -> builds generated ring pieces
  -> asserts kit id and domain path
  -> asserts schedule ordering
  -> ticks until complete
  -> asserts active cap and active ring window
  -> asserts all pieces settled
```

### Inline runtime services still embedded in game.html

```txt
create Three.js renderer
create scene, fog, lighting, camera, materials, and HUD
own smooth-ring-handoff-v6 constants inline
own ring descriptor math inline
own ring part count policy inline
own wedge/seam geometry creation inline
own construct animation inline
own HUD mutation inline
own camera pan/zoom/orbit inline
own GameHost legacy state inline
```

## Kits identified

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

### Next-cut local kits

```txt
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
phantom-command-construct-completion-idempotency-kit
phantom-command-scenario-bootstrap-gate-kit
phantom-command-scenario-bootstrap-blocker-kit
```

## Runtime evidence

```txt
BUILD_ID: smooth-ring-handoff-v6
RING_COUNT: 10
FIRST_INNER_RADIUS: 10
FIRST_RING_WIDTH: 7
RING_WIDTH_GROWTH: 1.25
MAX_RING_WIDTH: 120
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

## Main finding

`PhantomCommand` should not start RTS gameplay, scenario bootstrap, renderer extraction, or shared-kit promotion next. The blocker is source authority: `game.html` still owns the live build profile and the only browser-consumable `GameHost` projection.

The next implementation should make the live `smooth-ring-handoff-v6` profile fixture-readable, prove parity without DOM/canvas/Three.js, splice additive `GameHost.getState().sourceProfile` diagnostics, wire the source-profile fixture before static artifact copy, and keep central ledger pointers aligned.

## Next safe ledge

```txt
PhantomCommand SourceProfile Ledger Catch-up + Fixture Build Consumer Gate
```

## Validation

Runtime source was not changed. No build, test, browser smoke, or Pages smoke was run in this documentation-only pass.
