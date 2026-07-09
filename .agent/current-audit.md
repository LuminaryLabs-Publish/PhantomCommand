# PhantomCommand Current Audit

**Timestamp:** `2026-07-09T01-28-10-04-00`

## Summary

`PhantomCommand` is still a static two-route proof: `index.html` is the menu and `game.html` is the live Three.js construct scene.

The visible construct should be preserved. The active risk remains source authority and consumer proof: the live `smooth-ring-handoff-v6` profile, ring descriptors, piece descriptors, timeline math, HUD mutation, and `GameHost` projection are still coupled to `game.html`.

This pass keeps runtime files unchanged and narrows the next implementation to **Central SourceProfile Ledger Freeze + GameHost Consumer Fixture Gate**.

## Selection audit

Full accessible `LuminaryLabs-Publish` repo list checked:

```txt
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent present / latest central 2026-07-09T01-09-24-04-00
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / latest central 2026-07-09T00-00-41-04-00
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / latest central 2026-07-09T00-40-20-04-00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PhantomCommand      selected / central ledger catch-up from 2026-07-08T22-58-02-04-00 and repo-local 2026-07-09T01-20-59-04-00
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / latest central 2026-07-09T00-09-22-04-00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present / latest central 2026-07-08T23-40-55-04-00
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / latest central 2026-07-09T00-50-00-04-00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / latest central 2026-07-09T00-20-08-04-00
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent present / latest central 2026-07-08T23-19-33-04-00
```

No checked non-Cavalry Publish repo was fully new, central-ledger absent, undocumented, recently added but undocumented, or missing root `.agent/START_HERE.md` state.

`PhantomCommand` was selected because central tracking was stale relative to repo-local `.agent` state and the source-profile consumer readback/build gate remains unresolved.

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
  -> construct(seq) animates each piece by ring delay and part delay
  -> pan, zoom, skip, and restart controls mutate inline runtime state
  -> HUD reports constructed count, phase, build id, and progress
  -> window.GameHost exposes skipConstruct(), restartConstruct(), and getState()
```

## Current runtime evidence

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

## Domains

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

## Services

### App shell services

```txt
serve index.html menu
route Start button to game.html
route Open Scene link to game.html
copy static files into dist during build
serve GitHub Pages from main workflow artifact
```

### Live inline runtime services

```txt
create Three.js renderer
create scene, fog, lights, camera, materials, HUD, and input state
create smooth-ring-handoff-v6 source constants inline
create ring descriptors inline
create piece counts inline from circumference
create wedge geometry inline
create seam meshes inline
create center disc, Grim Reaper Totem, and Phantom Commander inline
animate radial/drop construct pieces
track progress and phase
pan, zoom, skip, restart
publish construct diagnostics through window.GameHost
```

### Implemented kit services

```txt
construct-spiral-intro-kit
  -> create generic construct piece ids
  -> create generic spiral/window schedules
  -> install pieces
  -> reset state
  -> tick progress
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

### Needed source-profile fixture services

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
game.html sourceProfile consumer readback
legacy GameHost compatibility fixture
central ledger latest-tracker readback
fixture build integration
construct complete event blocker map
scenario bootstrap blocker map
```

## Kits

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

## Main architectural read

The repo already has a generic construct scheduling kit and smoke test, but the live construct proof does not yet consume a source-owned PhantomCommand profile.

The next implementation should not start RTS gameplay or rewrite rendering. It should create deterministic, DOM-free source-profile, descriptor, fingerprint, snapshot, parity, central-ledger-readback, fixture-build, and GameHost diagnostic modules that reproduce the live v6 values, then splice those diagnostics into `game.html` additively.

Construct event/result work is a second step. It should only start after sourceProfile fixture rows prove that the visible build is sourced from stable records rather than inline browser constants.
