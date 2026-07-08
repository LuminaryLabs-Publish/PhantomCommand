# PhantomCommand Current Audit

**Timestamp:** `2026-07-08T04:40:21-04:00`

## Summary

`PhantomCommand` is playable as a static two-route proof: a menu route in `index.html` and a Three.js construct scene in `game.html`.

The repo has a useful generic `construct-spiral-intro-kit`, but the live scene still depends on a large inline runtime in `game.html` for the actual sequential-ring-v5 construct.

This pass confirms the next highest-value internal-doc focus is not new RTS gameplay yet. The next cut should preserve the public construct visual while extracting source authority, descriptor parity, event results, scenario bootstrap gating, and DOM-free fixture replay.

## Selection audit

Full `LuminaryLabs-Publish` repo list checked:

```txt
IntoTheMeadow
HorrorCorridor
AetherVale
ZombieOrchard
TheUnmappedHouse
MyCozyIsland
TheOpenAbove
PhantomCommand      selected by oldest eligible follow-up rotation
TheCavalryOfRome   excluded by rule
PrehistoricRush
```

Central ledger state already tracks `PhantomCommand`, so this run treated it as a follow-up documentation pass rather than a first-time intake.

## Current interaction loop

```txt
open index.html
  -> main menu renders title, subtitle, Start button, and Open Scene link
  -> Start or Open Scene routes to game.html
  -> game.html imports Three.js from CDN
  -> inline runtime creates renderer, scene, camera, fog, lights, materials, HUD, and input state
  -> inline constants define sequential-ring-v5
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
camera-navigation
keyboard-pan-input
wheel-zoom-input
button-input
hud-diagnostics
gamehost-authority
inline-construct-runtime
sequential-ring-v5-profile
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
scenario-bootstrap-command
scenario-bootstrap-preflight
scenario-bootstrap-result
scenario-bootstrap-gate
scenario-bootstrap-journal
scenario-bootstrap-snapshot
scenario-mode-state-machine
scenario-boundary-placeholder
fixture-script-runner
legacy-gamehost-compatibility
```

## Current services

### App shell services

```txt
serve index.html menu
route Start button to game.html
route Open Scene link to game.html
copy index.html, game.html, docs, and config into dist during static build
```

### Live inline runtime services

```txt
create Three.js renderer
create scene, fog, lights, camera, materials, HUD, and input state
create ring constants inline
create ring descriptors inline
create wedge geometry inline
create center disc, Grim Reaper Totem, and Phantom Commander inline
animate radial construct pieces
track progress and phase
pan, zoom, skip, restart
publish GameHost diagnostics
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
```

### Needed fixture-gate services

```txt
source-owned sequential-ring-v5 profile
source profile normalizer
source fingerprint service
source snapshot service
ring descriptor generator
piece descriptor generator
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
inline-sequential-ring-v5-profile
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
phantom-command-source-construct-profile-kit
phantom-command-ring-descriptor-kit
phantom-command-piece-descriptor-kit
phantom-command-inner-first-timeline-contract-kit
phantom-command-profile-parity-report-kit
phantom-command-construct-event-result-kit
phantom-command-construct-snapshot-contract-kit
phantom-command-scenario-bootstrap-result-kit
phantom-command-scenario-bootstrap-snapshot-kit
phantom-command-gamehost-diagnostics-adapter-kit
phantom-command-fixture-script-runner-kit
```

## Main architectural read

The current runtime is visually useful but source-authority weak.

The next implementation cut should not rework rendering first. It should create deterministic, DOM-free profile and result authority that exactly reproduces the live values now embedded in `game.html`: 10 rings, zero gaps, ring parts `[5,5,5,5,6,8,10,12,16,20]`, 92 pieces, `sequential-ring-v5`, and `GameHost` compatibility.
