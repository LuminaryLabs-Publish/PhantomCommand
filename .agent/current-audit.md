# PhantomCommand Current Audit

**Timestamp:** `2026-07-09T16-20-45-04-00`

## Summary

`PhantomCommand` remains a static Vite/Three.js construct proof with a menu route and a live `game.html` route.

The visual construct should stay intact. The architectural blocker is still proofability: the live `smooth-ring-handoff-v6` source profile, ring descriptors, piece descriptors, timeline, HUD mutation, camera control, and `GameHost` projection are owned by inline browser code.

This pass keeps runtime source unchanged and aligns repo-local docs plus central tracking around **PhantomCommand SourceProfile Fixture Row Refresh + GameHost Consumer Readback Gate**.

## Selection audit

```txt
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-09T15-56-42-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest 2026-07-09T14-16-00-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T15-09-09-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PhantomCommand       selected / oldest eligible fallback / central latest 2026-07-09T13-00-37-04-00 before this update
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T15-31-40-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T13-18-48-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-09T15-39-08-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T14-39-07-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T13-38-15-04-00
```

No checked non-Cavalry Publish repo was fully new, central-ledger absent, missing root `.agent/START_HERE.md`, recently added but undocumented, or otherwise undocumented. `PhantomCommand` was selected as the oldest eligible documented-selection fallback.

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
  -> construct(seq) animates each piece by ring delay plus part delay
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
three-cdn-runtime
browser-render-loop
inline-construct-profile
ring-descriptor-inline-math
piece-descriptor-inline-math
construct-timeline-inline-math
wedge-geometry-authoring
material-palette
lighting-and-fog
hud-projection
input-pan-control
camera-orbit-zoom-control
skip-restart-control
legacy-gamehost-diagnostics
construct-spiral-intro-kit
construct-spiral-schedule
construct-piece-state-machine
source-profile-parity-next
source-fingerprint-next
source-snapshot-next
profile-fixture-next
gamehost-sourceprofile-readback-next
build-fixture-gate-next
central-ledger-sync
```

## Services kits offer today

```txt
construct-spiral-intro-kit:
  create default intro timing config
  normalize and sort piece schedules
  compute piece ids
  install pieces
  reset sequence state
  update active/settled/pending states by dt
  expose active, pending, settled, ring-window, time, and estimated-total snapshots

game.html inline runtime:
  define live smooth-ring-handoff-v6 constants
  derive ring widths, gaps, part counts, and start times
  create wedge meshes and seam geometry
  animate radial/drop/rotation placement
  report HUD progress and phase
  process pan, zoom, skip, and restart input
  expose legacy window.GameHost state

build-static script:
  copy static route into dist
  currently does not gate build on source-profile parity fixture
```

## Current kits

```txt
construct-spiral-intro-kit
construct-spiral-schedule-kit
construct-piece-id-kit
construct-piece-state-kit
construct-sequence-update-kit
legacy-inline-smooth-ring-handoff-profile
legacy-inline-ring-descriptor-runtime
legacy-inline-piece-descriptor-runtime
legacy-inline-timeline-runtime
legacy-inline-gamehost-diagnostics
```

## Next-cut kits

```txt
phantom-command-smooth-handoff-profile-kit
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

Do not start with scenario bootstrap, RTS gameplay, economy, renderer replacement, or command result authority. The next useful pass is still source-profile proof: move the live constants and descriptor math into source-owned modules, prove parity without DOM/Three/browser timing, and only then splice additive diagnostics into `window.GameHost.getState()`.

## Next safe ledge

```txt
PhantomCommand SourceProfile Fixture Row Refresh + GameHost Consumer Readback Gate
```
