# PhantomCommand Current Audit

**Timestamp:** `2026-07-08T09:19:43-04:00`

## Summary

`PhantomCommand` is a playable static two-route proof: `index.html` is the menu and `game.html` is the live Three.js construct scene.

The live scene is visually useful and source-readable, but it still keeps the canonical `smooth-ring-handoff-v6` profile, descriptor generation, timing, completion phase, and `GameHost` output inside `game.html`.

This pass keeps runtime files unchanged and narrows the next implementation ledge into a concrete source-profile plus construct/scenario result wire map.

## Selection audit

Full accessible `LuminaryLabs-Publish` repo list checked:

```txt
HorrorCorridor      tracked with root .agent
AetherVale          tracked with root .agent
TheOpenAbove        tracked with root .agent
TheCavalryOfRome    excluded by rule
PhantomCommand      selected fallback follow-up
PrehistoricRush     tracked with root .agent
ZombieOrchard       tracked with root .agent
IntoTheMeadow       tracked with root .agent
MyCozyIsland        tracked with root .agent
TheUnmappedHouse    tracked with root .agent
```

No checked non-excluded Publish repo was fully new, central-ledger absent, undocumented, or missing root `.agent/START_HERE.md` state.

`PhantomCommand` was selected as the oldest eligible fallback follow-up because its prior root alignment was older than the latest checked eligible repos and the live source profile / construct result / scenario bootstrap authority seam remains unresolved.

## Current interaction loop

```txt
open index.html
  -> main menu renders title, subtitle, Start button, and Open Scene link
  -> Start or Open Scene routes to game.html
  -> game.html imports Three.js from CDN
  -> inline runtime creates renderer, scene, camera, fog, lights, materials, HUD, and input state
  -> inline constants define smooth-ring-handoff-v6
  -> inline ring math creates 10 no-gap construct rings
  -> inline wedge geometry creates 92 stone pieces
  -> construct(seq) animates each piece by ring delay and part delay
  -> WASD/arrows pan the camera
  -> mouse wheel zooms
  -> Space/Skip jumps to complete
  -> R/Restart restarts
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

## Current domains

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
construct-descriptor-authority
ring-count-policy
ring-width-policy
ring-growth-policy
no-gap-radius-policy
ring-part-count-policy
ring-descriptor-generation
piece-descriptor-generation
piece-id-policy
piece-seed-policy
piece-angle-policy
piece-start-pose-policy
piece-final-pose-policy
piece-delay-policy
piece-settle-policy
wedge-geometry-generation
stone-material-detail
construct-animation-timeline
inner-first-timeline-contract
ring-transition-margin-policy
construct-event-envelope
construct-event-result
construct-event-reducer
construct-completion-idempotency
construct-event-journal
construct-snapshot-contract
construct-diagnostics-projection
scenario-bootstrap-command
scenario-bootstrap-preflight
scenario-bootstrap-result
scenario-bootstrap-gate
scenario-bootstrap-journal
scenario-bootstrap-snapshot
scenario-mode-state-machine
rts-boundary-placeholder
fixture-script-runner
legacy-gamehost-compatibility
```

## Current services

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

### Needed fixture-gate services

```txt
source-owned smooth-ring-handoff-v6 profile
source profile normalizer
source fingerprint service
source snapshot service
ring descriptor generator
piece descriptor generator
delay descriptor generator
settle descriptor generator
transition margin descriptor generator
profile parity report
construct event envelope factory
construct result reducer
construct completion idempotency guard
construct journal projector
construct snapshot projector
scenario bootstrap command factory
scenario bootstrap preflight service
scenario bootstrap result reducer
scenario bootstrap snapshot projector
legacy GameHost diagnostics adapter
DOM-free fixture runner
```

## Current kits

Implemented:

```txt
construct-spiral-intro-kit
construct-spiral-intro-kit-smoke
```

Inline runtime kits to extract:

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

Next-cut local kits:

```txt
phantom-command-smooth-handoff-profile-kit
phantom-command-source-profile-fingerprint-kit
phantom-command-source-profile-snapshot-kit
phantom-command-ring-descriptor-kit
phantom-command-piece-descriptor-kit
phantom-command-piece-delay-policy-kit
phantom-command-piece-settle-policy-kit
phantom-command-handoff-timeline-contract-kit
phantom-command-profile-parity-report-kit
phantom-command-construct-event-envelope-kit
phantom-command-construct-event-result-kit
phantom-command-construct-event-reducer-kit
phantom-command-construct-completion-idempotency-kit
phantom-command-construct-event-journal-kit
phantom-command-construct-snapshot-contract-kit
phantom-command-scenario-bootstrap-command-kit
phantom-command-scenario-bootstrap-preflight-kit
phantom-command-scenario-bootstrap-result-kit
phantom-command-scenario-bootstrap-gate-kit
phantom-command-scenario-bootstrap-journal-kit
phantom-command-scenario-bootstrap-snapshot-kit
phantom-command-gamehost-diagnostics-adapter-kit
phantom-command-fixture-script-runner-kit
```

## Main architectural read

The repo already has a generic construct scheduling kit and smoke test, but the live `game.html` proof does not yet consume a source-owned PhantomCommand profile. That creates two authorities: generic kit behavior in `src/kits/construct-spiral-intro-kit/index.js`, and live v6 behavior in `game.html`.

The next implementation should not start RTS gameplay or rewrite rendering. It should create deterministic, DOM-free source and result authority that reproduces the live v6 values, then use those records to gate `scenario_001_raise_the_host` safely.