# PhantomCommand Architecture Audit — Campaign Source Action Render Proof

**Timestamp:** `2026-07-10T08-20-42-04-00`

## Architecture read

`PhantomCommand` currently has two browser routes:

```txt
index.html -> src/menu/graveyard-menu.js
game.html  -> src/campaign/campaign-scene.js
```

`game.html` is a thin route shell. `src/campaign/campaign-scene.js` is the live campaign authority.

## DSK / domain map

```txt
static-route-shell
  -> index.html
  -> game.html

menu-route-kit
  -> graveyard-menu.js
  -> graveyard-art.js
  -> crt-renderer.js
  -> settings persistence
  -> save detection
  -> campaign routing

campaign-route-shell-kit
  -> game.html canvas
  -> campaign-scene.js module import

pixel-campaign-runtime-kit
  -> 640 x 360 source canvas
  -> CRT display renderer
  -> ring/lane/pad descriptors inline
  -> archetype/tower/wave descriptors inline
  -> state mutation inline
  -> update/draw loops inline

campaign-interaction-domain
  -> pointer click select
  -> pointer drag select
  -> second click build
  -> right-click order
  -> number tower selection
  -> space wave start
  -> keyboard pan / wheel zoom

campaign-simulation-domain
  -> spawn queue
  -> unit AI
  -> enemy path to core
  -> ally target acquisition
  -> tower target acquisition
  -> projectile travel
  -> damage, reward, win, loss

campaign-render-domain
  -> rings
  -> lanes
  -> pads
  -> grave props
  -> units
  -> towers
  -> projectiles
  -> effects
  -> HUD
  -> minimap
  -> CRT pass

legacy-gamehost-diagnostics
  -> state
  -> camera
  -> startWave
  -> build
  -> getState aggregate
  -> setZoom
```

## Current kit services

```txt
route mounting
menu rendering
CRT post pass
source canvas containment
campaign descriptor creation
unit/tower/wave runtime mutation
input handling
HUD/minimap projection
save-on-win
aggregate GameHost readback
static copy build
```

## Missing proof services

```txt
campaign source manifest
source fingerprint
ring/lane/pad source rows
unit/tower/wave source rows
action intent rows
action result rows
simulation frame rows
render consumption rows
GameHost campaign diagnostics
DOM-free campaign fixture rows
build fixture gate
central ledger readback
```

## Main architectural gap

The route has a playable campaign, but the source descriptors and behavior contracts live in the same runtime file as DOM/canvas rendering.

That makes visual/gameplay expansion risky because there is no stable fixture that proves the source rows, accepted/rejected actions, frame outcomes, or render consumption before the browser route draws.

## Next safe ledge

```txt
PhantomCommand Campaign Source Action Render Proof Refresh + GameHost Fixture Gate
```
