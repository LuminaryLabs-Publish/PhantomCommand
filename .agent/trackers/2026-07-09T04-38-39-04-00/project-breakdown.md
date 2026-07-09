# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-09T04-38-39-04-00`

## Goal

Refresh repo-local and central documentation for `LuminaryLabs-Publish/PhantomCommand`, with the next implementation focused on source-profile fixture/build proof and legacy GameHost consumer readback.

## Selection result

`LuminaryLabs-Publish/PhantomCommand` was selected after comparing the accessible `LuminaryLabs-Publish` repo set against the central `LuminaryLabs-Dev/LuminaryLabs` ledger and sampled root `.agent` state.

No checked non-Cavalry repo was new, missing from central tracking, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state. `LuminaryLabs-Publish/TheCavalryOfRome` remained excluded.

`PhantomCommand` was selected because the central ledger was stale relative to repo-local `.agent` state: central still pointed at `2026-07-09T01-28-10-04-00`, while the repo-local root had already advanced to `2026-07-09T04-24-06-04-00`.

## Publish repository comparison

```txt
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent present / central latest observed 2026-07-09T04-19-00-04-00
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / central latest observed 2026-07-09T02-50-39-04-00
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / central latest observed 2026-07-09T03-29-29-04-00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PhantomCommand      selected / tracked / root .agent present / central stale at 2026-07-09T01-28-10-04-00 / repo-local previous 2026-07-09T04-24-06-04-00
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / central latest observed 2026-07-09T03-10-05-04-00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present / central latest observed 2026-07-09T02-05-52-04-00
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / central latest observed 2026-07-09T03-50-12-04-00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / central latest observed 2026-07-09T02-31-41-04-00
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent present / central latest observed 2026-07-09T02-11-07-04-00
```

## Current route

```txt
index.html
  -> game.html
  -> Three.js CDN
  -> inline smooth-ring-handoff-v6 construct runtime
```

## Current interaction loop

```txt
open index.html
  -> main menu renders title, subtitle, Start button, and Open Scene link
  -> Start or Open Scene routes to game.html
  -> game.html imports Three.js from CDN
  -> inline runtime creates renderer, scene, fog, lights, camera, HUD, materials, and input state
  -> inline smooth-ring-handoff-v6 constants create 10 no-gap construct rings
  -> inline ringParts() computes [5,5,5,5,6,8,10,12,16,20]
  -> inline wedge geometry creates 92 stone pieces
  -> construct(seq) animates pieces by ringStartTimes and partIndex * PART_STAGGER
  -> WASD/arrows pan the camera
  -> mouse wheel zooms
  -> Space/Skip completes the construct
  -> R/Restart resets the construct
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

## Services that kits offer

```txt
current runtime:
  serve static menu and game routes
  copy static files into dist through scripts/build-static.mjs
  create Three.js renderer, scene, camera, fog, lights, materials, HUD, and input state inline
  create live smooth-ring-handoff-v6 source constants inline
  create ring descriptors, ring part counts, wedge geometry, and seam meshes inline
  animate construct pieces through radial/drop interpolation
  expose progress, phase, ring parts, ring gaps, ring start times, and animation values through GameHost
  allow pan, zoom, skip, and restart controls

implemented kit services:
  construct-spiral-intro-kit creates generic piece ids, generic schedules, install/reset/update snapshots, pending/active/settled/newly active/newly settled queries, and per-piece progress/status
  construct-spiral-intro-kit-smoke proves generic install, scheduling, active-window, and completion behavior

needed next services:
  source-owned smooth-ring-handoff-v6 profile
  source profile normalizer
  ring descriptor generator
  piece descriptor generator
  handoff/timeline descriptor generator
  source fingerprint service
  source snapshot service
  profile parity report
  additive GameHost source diagnostics adapter
  DOM-free source profile fixture runner
  legacy GameHost compatibility fixture
  central ledger latest-tracker readback
  fixture build integration
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

`PhantomCommand` should not begin RTS gameplay, scenario bootstrap, renderer extraction, or shared-kit promotion next. The next source pass should make the live `smooth-ring-handoff-v6` profile fixture-readable, build-gated, and visible through additive `GameHost.getState().sourceProfile` diagnostics while preserving the current visual and legacy GameHost surface.

## Next safe ledge

```txt
PhantomCommand SourceProfile Fixture Build Gate + Legacy GameHost Consumer Readback
```

## Validation status

```txt
runtime source changed: no
local validation run: no
browser validation run: no
fixture replay run: no
branch created: no
pushed to main: yes
```
