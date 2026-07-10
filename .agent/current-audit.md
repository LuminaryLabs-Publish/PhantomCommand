# PhantomCommand Current Audit

**Timestamp:** `2026-07-10T00-30-20-04-00`

## Summary

`PhantomCommand` remains a static Vite / Three.js construct proof with a menu route and live `game.html` route.

The visible construct is stable. The architectural blocker is proofability: the live `smooth-ring-handoff-v6` profile, ring descriptors, piece descriptors, timeline, HUD mutation, camera/input handling, and `GameHost` projection are still owned by inline browser code.

This pass keeps runtime source unchanged and aligns repo-local docs plus central tracking around **PhantomCommand SourceProfile Fixture Readback Catch-up + GameHost Gate**.

## Selection audit

```txt
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T23-58-41-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T23-51-04-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T23-41-15-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T23-28-35-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T23-20-43-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-10T00-09-51-04-00
LuminaryLabs-Publish/PhantomCommand       selected / oldest eligible fallback / central latest 2026-07-09T23-02-05-04-00
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-10T00-18-38-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
```

No checked public non-Cavalry repo was new, central-ledger absent, missing root `.agent/START_HERE.md`, recently added but undocumented, or otherwise undocumented.

## Current interaction loop

```txt
open index.html
  -> menu renders Phantom Command copy and route controls
  -> Start or Open Scene routes to game.html
  -> game.html imports Three.js from CDN
  -> inline runtime creates renderer, scene, fog, lights, camera, HUD, materials, and input state
  -> inline constants define smooth-ring-handoff-v6
  -> inline ring math creates 10 no-gap construct rings
  -> inline ringParts() computes [5,5,5,5,6,8,10,12,16,20]
  -> inline wedge geometry creates 92 stone pieces
  -> keyboard and buttons mutate skip/restart/pan state
  -> mouse wheel mutates zoom target
  -> frame loop advances construct, camera, tower, command figure, HUD, and renderer
  -> window.GameHost.getState() reports legacy buildId, phase, progress, pieces, rings, ringParts, ringGaps, ringStartTimes, and animation constants
```

## Domains in use

```txt
static-route-shell
menu-route
scene-route
vite-static-build
static-artifact-copy
three-cdn-runtime
browser-render-loop
inline-smooth-ring-handoff-profile
inline-ring-start-time-policy
ring-descriptor-inline-math
inline-ring-part-count-policy
piece-descriptor-inline-math
construct-timeline-inline-math
wedge-geometry-authoring
material-palette
lighting-and-fog
hud-projection
keyboard-pan-control
wheel-zoom-control
skip-restart-control
legacy-gamehost-diagnostics
construct-spiral-intro-kit
generic-construct-schedule-state
source-profile-parity-next
source-fingerprint-next
source-snapshot-next
profile-fixture-next
gamehost-sourceprofile-readback-next
build-fixture-gate-next
central-ledger-sync
```

## Kit services in use

```txt
construct-spiral-intro-kit:
  normalize piece ids, schedules, active windows, state transitions, and snapshots

game.html inline runtime:
  define live profile constants, derive rings/pieces/timing, create meshes, animate construct, mutate HUD, handle input, expose GameHost

build-static script:
  copy static artifacts into dist without fixture gating
```

## Kits

Current:

```txt
construct-spiral-intro-kit
construct-spiral-schedule-kit
construct-piece-id-kit
construct-piece-state-kit
construct-sequence-update-kit
legacy-inline-smooth-ring-handoff-profile
legacy-inline-ring-start-time-policy
legacy-inline-ring-descriptor-runtime
legacy-inline-piece-descriptor-runtime
legacy-inline-wedge-geometry-runtime
legacy-inline-timeline-runtime
legacy-inline-gamehost-diagnostics
legacy-static-build-copy-kit
```

Next-cut:

```txt
phantom-command-smooth-handoff-profile-kit
phantom-command-profile-normalizer-kit
phantom-command-ring-descriptor-kit
phantom-command-piece-descriptor-kit
phantom-command-handoff-timeline-contract-kit
phantom-command-source-profile-fingerprint-kit
phantom-command-source-profile-snapshot-kit
phantom-command-profile-parity-report-kit
phantom-command-gamehost-source-diagnostics-kit
phantom-command-sourceprofile-consumer-readback-kit
phantom-command-sourceprofile-fixture-kit
phantom-command-build-fixture-gate-kit
central-ledger-readback-kit
```

## Main finding

Do not start with scenario bootstrap, RTS gameplay, economy, renderer replacement, command result authority, or scene expansion.

The next useful pass is source-profile proof: source-own the exact live constants and descriptor math, prove parity without DOM/Three/browser timing, then splice additive diagnostics into `window.GameHost.getState()` and keep central ledger pointers synchronized with repo-local audit state.
