# PhantomCommand Current Audit

**Timestamp:** `2026-07-08T02:50:33-04:00`

## Summary

`PhantomCommand` is playable as a static two-route proof: a menu route in `index.html` and a Three.js construct scene in `game.html`.

The repo has a useful generic `construct-spiral-intro-kit`, but the live scene still depends on a large inline runtime in `game.html` for the actual sequential-ring-v5 construct.

## Selection audit

Full `LuminaryLabs-Publish` repo list checked:

```txt
HorrorCorridor
AetherVale
TheOpenAbove
TheCavalryOfRome  excluded by rule
PhantomCommand      selected
PrehistoricRush
ZombieOrchard
IntoTheMeadow
MyCozyIsland
TheUnmappedHouse
```

Central ledger state showed `PhantomCommand` was tracked, but root `.agent` audit entrypoints were missing in the publish repo.

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

### Implemented smoke services

```txt
construct-spiral-intro-kit-smoke
  -> assert kit id and domain path
  -> install generated ring pieces
  -> assert schedule ordering
  -> tick until complete
  -> assert active count cap
  -> assert active ring window
  -> assert all pieces settled
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

## Main architectural read

The current runtime is visually useful but source-authority weak.

The most important cut is not more RTS content yet. The next cut should preserve the existing construct visual while moving profile, descriptors, timing, completion, bootstrap, and fixture replay out of `game.html` into stable data-first kits.
