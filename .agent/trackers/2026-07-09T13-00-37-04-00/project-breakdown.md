# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-09T13-00-37-04-00`

## Selection result

`LuminaryLabs-Publish/PhantomCommand` was selected as the documentation consistency target.

The accessible `LuminaryLabs-Publish` repo list was compared against the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger and sampled root `.agent` state. No checked non-Cavalry repo was new, central-ledger absent, missing root `.agent`, recently added but undocumented, or otherwise undocumented.

`TheCavalryOfRome` remains excluded.

`PhantomCommand` was selected because repo-local `.agent` state had advanced to `2026-07-09T12-55-20-04-00`, while the central ledger still pointed at `2026-07-09T12-38-16-04-00` before this run.

## Publish organization repositories observed

```txt
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-09T12-08-46-04-00
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-09T12-30-09-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest 2026-07-09T11-30-50-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T10-40-00-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T11-00-39-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T11-39-50-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T11-50-08-04-00
LuminaryLabs-Publish/PhantomCommand       selected / repo-local 2026-07-09T12-55-20-04-00 / central 2026-07-09T12-38-16-04-00 before this run
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T12-00-36-04-00
```

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
central-ledger-sync
```

## Kit services

```txt
construct-spiral-intro-kit:
  create default timing config
  normalize piece schedules
  compute piece ids
  install piece state
  reset sequence state
  update active/settled/pending rows by dt
  expose schedule and state-machine snapshots

live inline game.html runtime:
  define live smooth-ring-handoff-v6 constants
  derive contiguous ring descriptors
  derive piece descriptors and geometry placement
  drive timeline delay and part stagger
  animate pieces, tower, command figure, camera, and HUD
  handle pan, zoom, skip, restart, resize, and blur
  expose legacy GameHost diagnostics

next source-profile kits:
  source-own the live profile
  normalize profile defaults
  derive ring descriptors
  derive piece descriptors
  derive timeline descriptors
  fingerprint and snapshot the source profile
  report parity against live legacy GameHost fields
  expose additive sourceProfile diagnostics
  prove fixture rows without DOM, canvas, or Three.js
```

## Kits identified

### Implemented/source-backed

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

### Next-cut kits

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

`PhantomCommand` should not start next with renderer extraction, scenario bootstrap, RTS gameplay, economy, or construct-result authority. The blocking boundary is still source-profile proof: the exact live `smooth-ring-handoff-v6` constants and descriptor math must be source-owned, fixture-proven, and then consumed additively through `GameHost`.

## Next safe ledge

```txt
PhantomCommand SourceProfile Ledger Repair + Consumer Fixture Gate
```

## Validation

```txt
runtime source changed: no
branch created: no
pull request created: no
npm install: not run
npm run build: not run
source-profile fixture: not run because it does not exist yet
browser smoke: not run
pushed to main: yes
```
