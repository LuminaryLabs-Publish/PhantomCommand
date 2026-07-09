# PhantomCommand Current Audit

**Timestamp:** `2026-07-09T12-38-16-04-00`

## Summary

`PhantomCommand` remains a static Vite/Three.js construct proof with a menu route and a live `game.html` route.

The visual construct should stay intact. The architectural blocker is proofability: the live `smooth-ring-handoff-v6` source profile, ring descriptors, piece descriptors, timeline, HUD mutation, camera control, and `GameHost` projection are still owned by inline browser code.

This pass keeps runtime source unchanged and aligns repo-local docs plus central tracking around **PhantomCommand Live SourceProfile Consumer Sync + Fixture Build Gate**.

## Selection audit

```txt
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-09T12-08-46-04-00
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-09T12-20-08-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest 2026-07-09T11-30-50-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T10-40-00-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T11-00-39-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T11-39-50-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T11-50-08-04-00
LuminaryLabs-Publish/PhantomCommand       selected / oldest eligible central fallback / central latest 2026-07-09T10-29-02-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T12-00-36-04-00
```

No checked non-Cavalry Publish repo was fully new, central-ledger absent, missing root `.agent/START_HERE.md`, recently added but undocumented, or otherwise undocumented.

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
package.json:
  start/dev/preview use Vite on port 4173
  build calls node scripts/build-static.mjs

index.html:
  menu says Single-player PvE RTS prototype
  Start button and Open Scene link route to game.html

game.html:
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
  GameHost: skipConstruct, restartConstruct, getState

construct-spiral-intro-kit:
  implemented generic sequence kit
  domain path: n:sequence:construct:spiral-intro
  services: installPieces, reset, update, snapshot, schedule, piece queries
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
repo-local-agent-pointer-parity
fixture-build-integration
fixture-before-static-artifact
construct-event-envelope-deferred
construct-event-result-deferred
construct-completion-idempotency-deferred
scenario-bootstrap-gate-deferred
scenario-bootstrap-blocker
```

## Services in use

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
create center disc, Grim Reaper Totem proxy, and Phantom Commander proxy inline
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

### Needed source-profile consumer services

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
fixture build integration before static artifact copy
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

`game.html` remains the source authority for live constants, descriptors, timing, geometry, HUD, animation, and `GameHost` projection.

The next implementation should source-own the profile, prove exact parity through DOM-free fixture rows, and add only additive `GameHost.getState().sourceProfile` diagnostics before render extraction, construct result contracts, or scenario bootstrap work.
