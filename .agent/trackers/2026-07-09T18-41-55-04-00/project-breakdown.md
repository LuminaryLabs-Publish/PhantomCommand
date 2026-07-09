# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-09T18-41-55-04-00`

## Selection

Selected repo: `LuminaryLabs-Publish/PhantomCommand`

The current public `LuminaryLabs-Publish` repository list was checked against central tracking and sampled root `.agent` state. No checked public non-Cavalry repository was new, absent from the central ledger, missing root `.agent` state, recently added but undocumented, or otherwise undocumented.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`PhantomCommand` was selected by the oldest documented-selection fallback. Its central ledger was at `2026-07-09T16-29-23-04-00`, older than the other eligible public entries observed after the latest HorrorCorridor, ZombieOrchard, TheUnmappedHouse, MyCozyIsland, TheOpenAbove, PrehistoricRush, and IntoTheMeadow refreshes.

## Public Publish repositories checked

```txt
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T17-48-20-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T16-58-52-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T16-38-14-04-00
LuminaryLabs-Publish/PhantomCommand       selected / oldest eligible public documented fallback / central latest 2026-07-09T16-29-23-04-00
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-09T18-30-30-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T18-11-58-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-09T18-20-18-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T17-58-53-04-00
```

## Product read

`PhantomCommand` is a static Vite/Three.js construct proof with a menu route and a live `game.html` route.

The visible route is a stable construct animation. It should not be replaced before the source profile is fixture-owned.

## Current interaction loop

```txt
open index.html
  -> menu renders Phantom Command route controls
  -> Start or Open Scene routes to game.html
  -> game.html imports Three.js 0.160.0 from CDN
  -> inline runtime creates renderer, scene, fog, lights, camera, HUD, materials, and input state
  -> inline constants define smooth-ring-handoff-v6
  -> inline ring math creates 10 no-gap construct rings
  -> inline ringParts() computes [5,5,5,5,6,8,10,12,16,20]
  -> inline wedge geometry creates 92 stone pieces
  -> construct(seq) animates each piece by ring delay plus part delay
  -> WASD/arrows pan the target
  -> mouse wheel changes zoom target
  -> Space/Skip jumps to completion
  -> R/Restart resets build timing
  -> frame loop advances construct, tower, command figure, camera, HUD, and renderer
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
inline-smooth-ring-handoff-profile
ring-descriptor-inline-math
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
construct-spiral-schedule
construct-piece-state-machine
source-profile-parity-next
source-fingerprint-next
source-snapshot-next
gamehost-sourceprofile-readback-next
profile-fixture-next
build-fixture-gate-next
central-ledger-sync
```

## Kit services in use

```txt
construct-spiral-intro-kit:
  normalize piece ids
  create and sort schedules
  install pending piece states
  advance active / settled / pending status by dt
  enforce active caps and ring windows
  emit schedule snapshots

inline game.html runtime:
  define live smooth-ring-handoff-v6 constants
  derive ring widths, zero gaps, ring part counts, ring starts, and total build time
  create wedge meshes, seams, center disc, tower, and command figure
  animate radial/drop/rotation placement
  mutate HUD progress and phase
  process pan, zoom, skip, restart, resize, and blur controls
  expose legacy GameHost state

build-static script:
  copy index.html, game.html, docs, and config into dist
  does not yet run a source-profile parity fixture
```

## Kits identified

Current explicit kits:

```txt
construct-spiral-intro-kit
construct-spiral-schedule-kit
construct-piece-id-kit
construct-piece-state-kit
construct-sequence-update-kit
```

Current inline/runtime kits:

```txt
legacy-inline-smooth-ring-handoff-profile
legacy-inline-ring-descriptor-runtime
legacy-inline-piece-descriptor-runtime
legacy-inline-timeline-runtime
legacy-inline-hud-projection
legacy-inline-camera-input-runtime
legacy-inline-gamehost-diagnostics
```

Next-cut kits:

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

Do not start next with scenario bootstrap, RTS gameplay, economy, renderer extraction, camera changes, or new visual work.

The durable blocker is still source-profile authority. `game.html` owns the exact live profile inline, while `src/kits/construct-spiral-intro-kit/index.js` is a generic schedule helper and does not prove the live `smooth-ring-handoff-v6` profile.

The next implementation should source-own the live constants, ring descriptors, piece descriptors, timeline descriptors, fingerprint, snapshot, profile parity report, additive `GameHost.getState().sourceProfile`, DOM-free fixture, and build fixture gate.

## Source constants captured

```txt
BUILD_ID = smooth-ring-handoff-v6
RING_COUNT = 10
RING_GAP_BASE = 0
RING_GAP_GROWTH = 0
MOVE_SECONDS = 2.6
RING_HANDOFF = 0.72
PART_STAGGER = 0.025
PREWARM_SECONDS = 0.45
ringParts = [5,5,5,5,6,8,10,12,16,20]
totalPieces = 92
totalBuildSeconds = 19.923
```

## Next safe ledge

```txt
PhantomCommand SourceProfile Handoff Ledger Refresh + GameHost Fixture Gate
```

## Validation

Documentation-only pass. Runtime source was not changed. No local checkout, `npm install`, `npm run build`, construct smoke test, source-profile fixture, browser smoke, branch, or pull request was created.
