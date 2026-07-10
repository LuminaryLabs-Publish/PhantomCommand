# PhantomCommand Architecture Audit: Campaign Scene Source Manifest DSK Map

**Timestamp:** `2026-07-10T03-59-57-04-00`

## Current DSK map

```txt
index.html
  -> src/menu/graveyard-menu.js
  -> src/menu/crt-renderer.js
  -> src/menu/graveyard-art.js
  -> game.html
  -> src/campaign/campaign-scene.js
  -> window.GameHost aggregate diagnostics
```

## Current campaign source ownership

```txt
src/campaign/campaign-scene.js
  -> owns 640 x 360 source canvas
  -> owns CRT renderer consumer
  -> owns ring descriptors
  -> owns lane angles
  -> owns pad generation
  -> owns unit archetypes
  -> owns tower archetypes
  -> owns wave scripts
  -> owns camera and input state
  -> owns campaign state mutation
  -> owns select/build/order/start-wave actions
  -> owns unit, tower, projectile, damage, reward, win, and loss update
  -> owns world, HUD, minimap, and CRT draw calls
  -> owns GameHost aggregate readback
```

## Target DSK map

```txt
campaign-source-manifest-kit
  -> route id
  -> scene module id
  -> source dimensions
  -> descriptor fingerprints

ring-lane-descriptor-kit
  -> ring rows
  -> lane rows
  -> outer radius

build-pad-descriptor-kit
  -> generated pad rows
  -> blocked lane gaps
  -> buildability rows

unit-archetype-kit
  -> guard / archer / runner / shield / zealot / brute / wraith descriptors

 tower-archetype-kit
  -> spire / lantern / ward descriptors

wave-script-kit
  -> six wave rows
  -> spawn timing rows
  -> lane assignment rows

action-intent-kit
  -> select, build, order, start-wave, camera, tower-type intents

action-result-kit
  -> accepted / rejected / no-op rows
  -> before/after summaries
  -> reason catalog

simulation-frame-kit
  -> unit/tower/projectile/effect/wave summaries

render-readback-kit
  -> rings/lane/pad/unit/tower/projectile/HUD/minimap/CRT consumption rows

gamehost-campaign-diagnostics-kit
  -> additive GameHost campaign manifest
  -> action journal
  -> render readback
  -> fixture status
```

## Domains covered

```txt
static-route-shell
menu-route
campaign-route
vite-static-build
static-artifact-copy
low-resolution-source-canvas
crt-display-renderer
pixel-campaign-render-loop
ring-map-domain
lane-domain
build-pad-domain
unit-archetype-domain
tower-archetype-domain
wave-script-domain
souls-economy-domain
sanctum-core-health-domain
selection-domain
build-action-domain
order-action-domain
wave-start-action-domain
unit-ai-domain
enemy-pathing-domain
ally-targeting-domain
tower-targeting-domain
projectile-domain
damage-reward-domain
effect-domain
camera-pan-zoom-domain
keyboard-input-domain
pointer-input-domain
hud-projection-domain
minimap-domain
save-on-win-domain
legacy-gamehost-campaign-diagnostics
construct-spiral-intro-kit-legacy-support
campaign-source-manifest-next
campaign-action-result-next
campaign-render-readback-next
campaign-gamehost-fixture-next
central-ledger-sync
```

## Architecture risk

`campaign-scene.js` is compact and playable, but it is too monolithic to grow safely. Source descriptors, runtime mutation, draw code, input handling, and diagnostics all live in one file.

Do not expand gameplay or visuals until the campaign source manifest and fixture rows are in place.
