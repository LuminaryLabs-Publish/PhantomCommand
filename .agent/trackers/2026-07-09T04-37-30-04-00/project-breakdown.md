# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-09T04-37-30-04-00`

## Goal

Refresh the internal repo docs for `LuminaryLabs-Publish/PhantomCommand`, compare the full accessible `LuminaryLabs-Publish` repo set against central tracking, and keep the next implementation focused on source-profile fixture/build/central-ledger sync rather than gameplay or render expansion.

## Selection result

`LuminaryLabs-Publish/PhantomCommand` was selected.

The checked Publish organization set did not reveal a non-Cavalry repo that was fully new, missing from the central ledger, missing root `.agent` state, or otherwise undocumented. `LuminaryLabs-Publish/TheCavalryOfRome` stayed excluded. `HorrorCorridor` had already advanced to a fresh `2026-07-09T04-19-00-04-00` central/root-agent state, while `PhantomCommand` still had central drift: the central ledger pointed at `2026-07-09T01-28-10-04-00` while repo-local root `.agent` had already advanced to `2026-07-09T04-24-06-04-00`.

This run refreshes repo-local `.agent` state and updates the central ledger to the new `2026-07-09T04-37-30-04-00` source-profile fixture sync.

## Publish repository comparison

```txt
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest observed 2026-07-09T03-50-12-04-00
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest observed 2026-07-09T04-19-00-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest observed 2026-07-09T02-50-39-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest observed 2026-07-09T02-05-52-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest observed 2026-07-09T02-11-07-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest observed 2026-07-09T02-31-41-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest observed 2026-07-09T03-29-29-04-00
LuminaryLabs-Publish/PhantomCommand       selected / repo-local root had advanced beyond central ledger
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest observed 2026-07-09T03-10-05-04-00
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
  -> menu renders Phantom Command title, subtitle, Start button, and Open Scene link
  -> Start or Open Scene routes to game.html
  -> game.html imports Three.js from CDN
  -> inline runtime creates renderer, scene, fog, lights, camera, HUD, materials, and input state
  -> inline smooth-ring-handoff-v6 constants create 10 contiguous no-gap construct rings
  -> inline ringParts() computes [5,5,5,5,6,8,10,12,16,20]
  -> inline wedge geometry creates 92 stone pieces
  -> construct(seq) animates each piece by ringStartTimes[ring] + idx * PART_STAGGER
  -> WASD/arrows pan the camera target
  -> mouse wheel adjusts zoom target
  -> Space or Skip completes the construct
  -> R or Restart resets the construct
  -> HUD reports constructed count, phase, build id, and progress
  -> window.GameHost exposes skipConstruct(), restartConstruct(), and getState()
```

## Current source evidence

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

### Current runtime services

```txt
serve static index.html menu
serve static game.html route
route Start and Open Scene to game.html
build static dist through scripts/build-static.mjs
load Three.js from CDN
create renderer, scene, camera, fog, lights, materials, HUD, and input state inline
create live smooth-ring-handoff-v6 constants inline
create ring descriptors inline
create piece counts from circumference inline
create wedge and seam geometry inline
create construct proxy objects inline
animate construct pieces through radial/drop interpolation
track progress, phase, total pieces, ring gaps, part counts, and animation config
allow pan, zoom, skip, and restart controls
publish construct diagnostics through window.GameHost.getState()
```

### Implemented kit services

```txt
construct-spiral-intro-kit
  -> create generic construct piece ids
  -> create generic construct schedules
  -> install pieces
  -> reset state
  -> update progress
  -> emit snapshots
  -> expose schedule, pending, active, settled, newlyActive, and newlySettled pieces
  -> report per-piece progress and status

construct-spiral-intro-kit-smoke
  -> assert kit id and domain path
  -> install generated ring pieces
  -> assert schedule ordering
  -> tick until complete
  -> assert active count cap
  -> assert active ring window
  -> assert all pieces settled
```

### Needed next services

```txt
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
construct completion result precondition map
scenario bootstrap blocker map
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

## Main finding

`PhantomCommand` should not start RTS gameplay, scenario bootstrap, renderer extraction, or visual replacement next.

The route already has a stable visual proof, but `game.html` still owns source constants, descriptor generation, timing policy, construct animation, HUD mutation, and GameHost projection inline. The next implementation should create source-owned profile/descriptor/timeline/fingerprint/snapshot/parity modules, prove them with DOM-free fixture rows, then splice additive `sourceProfile` diagnostics into `window.GameHost.getState()` without changing the legacy surface.

## Next safe ledge

```txt
PhantomCommand SourceProfile Fixture Build Sync + Central Ledger Consumer Gate
```

## Required next source files

```txt
src/kits/phantom-command-smooth-handoff-profile-kit/index.js
src/kits/phantom-command-ring-descriptor-kit/index.js
src/kits/phantom-command-piece-descriptor-kit/index.js
src/kits/phantom-command-handoff-timeline-contract-kit/index.js
src/kits/phantom-command-source-profile-fingerprint-kit/index.js
src/kits/phantom-command-source-profile-snapshot-kit/index.js
src/kits/phantom-command-profile-parity-report-kit/index.js
src/kits/phantom-command-gamehost-source-diagnostics-kit/index.js
tests/phantom-command-source-profile-fixture.mjs
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
