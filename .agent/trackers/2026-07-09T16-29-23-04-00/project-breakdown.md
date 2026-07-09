# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-09T16-29-23-04-00`

## Goal

Refresh the repo-local `.agent` breakdown and central ledger pointer for `LuminaryLabs-Publish/PhantomCommand` without changing runtime source.

## Selection result

`PhantomCommand` was selected after comparing the accessible `LuminaryLabs-Publish` repo list against central ledger state and sampled repo-local `.agent` state.

No checked non-Cavalry repo was new, missing from central tracking, missing root `.agent`, recently added but undocumented, or otherwise undocumented.

`TheCavalryOfRome` was excluded.

`PhantomCommand` needed central source-profile pointer repair because repo-local `.agent` already had `2026-07-09T16-25-16-04-00` source-profile docs while the central ledger still pointed at `2026-07-09T13-00-37-04-00` at read time.

## Publish organization repositories observed

```txt
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-09T16-00-13-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest 2026-07-09T14-16-00-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T15-09-09-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PhantomCommand       selected / central-ledger sourceprofile pointer repair
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T15-31-40-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T13-18-48-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-09T15-39-08-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T14-39-07-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T13-38-15-04-00
```

## Interaction loop

```txt
open index.html
  -> menu renders Phantom Command copy and route controls
  -> Start button or Open Scene link navigates to game.html
  -> game.html imports Three.js from CDN
  -> inline runtime creates renderer, scene, fog, lights, camera, materials, HUD nodes, and input state
  -> inline constants define smooth-ring-handoff-v6
  -> inline ring math creates 10 no-gap construct rings
  -> inline ringParts() computes [5,5,5,5,6,8,10,12,16,20]
  -> inline wedge geometry creates 92 stone pieces
  -> frame loop calls construct(time - startedAt)
  -> construct(seq) updates piece transforms, progress, phase, and HUD
  -> WASD/arrows pan the camera target
  -> mouse wheel updates zoom target
  -> Space/Skip moves construct to completion
  -> R/Restart resets construct timing
  -> renderer renders the scene
  -> window.GameHost exposes skipConstruct(), restartConstruct(), and getState()
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

## Kit services

```txt
construct-spiral-intro-kit:
  create default intro timing config
  normalize piece ids
  normalize and sort piece schedules
  install piece schedules
  reset sequence state
  update active, pending, and settled piece state by dt
  expose snapshots with active count, pending count, settled count, ring window, time, progress, and estimated total seconds

game.html inline runtime:
  define live smooth-ring-handoff-v6 constants
  derive ring widths, zero gaps, part counts, and start times
  create wedge geometry, seams, center disc, tower, and command figure
  animate radial/drop/rotation placement
  update HUD progress and phase
  process pan, zoom, skip, restart, resize, and blur controls
  expose legacy window.GameHost state

build-static script:
  copy index.html, game.html, docs, and config into dist
  does not yet run a source-profile parity fixture before static artifact copy
```

## Kits

```txt
Current explicit kits:
  construct-spiral-intro-kit
  construct-spiral-schedule-kit
  construct-piece-id-kit
  construct-piece-state-kit
  construct-sequence-update-kit

Current inline/runtime kits:
  legacy-inline-smooth-ring-handoff-profile
  legacy-inline-ring-descriptor-runtime
  legacy-inline-piece-descriptor-runtime
  legacy-inline-timeline-runtime
  legacy-inline-wedge-geometry-runtime
  legacy-inline-hud-projection-runtime
  legacy-inline-camera-input-runtime
  legacy-inline-gamehost-diagnostics

Next-cut kits:
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

The runtime should not move to scenario bootstrap, RTS gameplay, renderer extraction, camera changes, or economy systems next.

The next useful cut is source-profile proof: extract and source-own the exact live `smooth-ring-handoff-v6` constants and descriptor math, prove parity in a DOM-free fixture, then splice additive `sourceProfile` diagnostics into `window.GameHost.getState()` while preserving legacy fields.

## Validation

Runtime source was not changed. No branch or PR was created. Local npm/build/browser validation was not run for this docs-only pass.