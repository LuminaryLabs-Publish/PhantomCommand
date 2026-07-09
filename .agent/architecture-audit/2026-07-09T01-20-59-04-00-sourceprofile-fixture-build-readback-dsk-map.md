# PhantomCommand Architecture Audit: SourceProfile Fixture Build Readback DSK Map

**Timestamp:** `2026-07-09T01-20-59-04-00`

## Scope

Documentation-only breakdown for `LuminaryLabs-Publish/PhantomCommand`.

No runtime/source implementation files changed in this pass.

## Current architecture

```txt
index.html
  -> menu shell
  -> Start button / Open Scene link
  -> game.html
    -> Three.js CDN import
    -> inline render host
    -> inline scene/fog/light/material setup
    -> inline smooth-ring-handoff-v6 profile constants
    -> inline ring descriptor math
    -> inline piece descriptor math
    -> inline wedge geometry construction
    -> inline construct animation loop
    -> inline HUD mutation
    -> inline GameHost projection
```

## Current interaction loop

```txt
open menu
  -> enter game route
  -> construct scene initializes
  -> no-gap rings and pieces are created inline
  -> animation advances by ringStartTimes + partIndex * PART_STAGGER
  -> player pans, zooms, skips, or restarts
  -> HUD reports count/phase/progress
  -> GameHost exposes construct diagnostics
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
construct-profile-normalization
construct-source-fingerprint
construct-source-snapshot
ring-descriptor-generation
piece-descriptor-generation
handoff-timeline-contract
profile-parity-report
source-profile-fixture-row-contract
source-profile-consumer-splice
construct-event-result-blocker
scenario-bootstrap-blocker
```

## Services currently offered

```txt
index.html:
  - static menu render
  - Start route to game.html
  - Open Scene link to game.html

package/build:
  - Vite dev/preview scripts
  - static build script that copies index.html, game.html, docs, and config to dist

game.html:
  - create Three.js renderer, scene, camera, fog, lights, and materials
  - compute smooth-ring-handoff-v6 rings inline
  - compute live ring part counts inline
  - create 92 piece meshes inline
  - animate pieces into the construct
  - expose pan/zoom/skip/restart controls
  - mutate HUD and progress bar
  - expose window.GameHost.skipConstruct
  - expose window.GameHost.restartConstruct
  - expose window.GameHost.getState

construct-spiral-intro-kit:
  - generate generic construct piece ids
  - generate generic schedules
  - install/reset/update state
  - expose snapshots and pending/active/settled/newly active/newly settled queries
```

## Kits identified

```txt
implemented:
  construct-spiral-intro-kit
  construct-spiral-intro-kit-smoke

inline runtime kits:
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

next-cut source kits:
  phantom-command-smooth-handoff-profile-kit
  phantom-command-ring-descriptor-kit
  phantom-command-piece-descriptor-kit
  phantom-command-handoff-timeline-contract-kit
  phantom-command-source-profile-fingerprint-kit
  phantom-command-source-profile-snapshot-kit
  phantom-command-profile-parity-report-kit
  phantom-command-gamehost-source-diagnostics-kit
  phantom-command-source-profile-fixture-kit
  phantom-command-gamehost-source-consumer-kit
  phantom-command-fixture-build-integration-kit
```

## Main finding

The live route is visually coherent but architecturally monolithic.

The correct next cut is not scenario gameplay. It is a sourceProfile fixture and consumer readback cut that proves the visible construct can be reproduced from explicit source records while preserving the current browser route and GameHost compatibility.

## Next architecture ledge

```txt
source profile module
  -> profile normalizer
  -> ring descriptor module
  -> piece descriptor module
  -> timeline contract module
  -> fingerprint module
  -> snapshot module
  -> parity report module
  -> source diagnostics module
  -> DOM-free fixture
  -> build script gate
  -> additive game.html sourceProfile consumer
```
