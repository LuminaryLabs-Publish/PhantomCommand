# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-10T11-10-08-04-00`

## Selection

Selected `LuminaryLabs-Publish/PhantomCommand`.

No checked public non-Cavalry repo was new, missing from the central ledger, missing sampled root `.agent` state, recently added, or otherwise undocumented. `TheCavalryOfRome` remains excluded by rule. `PhantomCommand` was the oldest eligible documented fallback after `HorrorCorridor` advanced to `2026-07-10T10-58-54-04-00`.

## Interaction loop

```txt
index.html
  -> src/menu/graveyard-menu.js
  -> Begin Campaign or Continue routes to game.html
  -> game.html imports src/campaign/campaign-scene.js
  -> campaign-scene creates 640 x 360 source canvas and CRT display renderer
  -> inline rings, lanes, pads, archetypes, tower types, waves, input, camera, and state initialize
  -> starter guards and archers spawn around the sanctum
  -> pointer click selects allies or empty build pads
  -> repeat click on selected empty pad attempts tower build when souls cover cost
  -> right-click orders selected units or targets nearest enemy
  -> Space starts queued wave spawns
  -> update loop advances spawns, units, towers, projectiles, damage, rewards, effects, wave clear, win, and loss
  -> draw loop renders world, HUD, minimap, modal state, and CRT pass
  -> GameHost returns aggregate campaign counters and zoom controls
```

## Domains in use

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
campaign-source-ledger-next
campaign-action-result-next
campaign-render-readback-next
campaign-gamehost-fixture-next
central-ledger-sync
```

## Kits and services

Current kits provide menu route, settings/save detection, CRT source-canvas display, graveyard art, campaign route shell, inline pixel campaign runtime, aggregate `GameHost` diagnostics, static checks, static artifact copy, and legacy construct spiral support.

Next-cut kits should provide campaign source ledger, source manifest/fingerprint, ring/lane descriptors, build-pad descriptors, unit archetypes, tower archetypes, wave scripts, action intent/result rows, simulation frame summaries, render readback rows, additive JSON-safe GameHost diagnostics, DOM-free campaign fixture, build fixture gate, and central ledger readback.

## Main finding

`PhantomCommand` should not start next with camera rewrites, larger campaign content, renderer replacement, new enemy art, economy expansion, RTS system expansion, or construct-profile work.

The blocker is campaign fixture readback. `src/campaign/campaign-scene.js` still owns source descriptors, mutation, input, simulation, rendering, HUD, minimap, save-on-win, and `GameHost` inline. The next useful cut is to prove source/action/render parity through rows and fixture diagnostics before adding gameplay or visual surface area.

## Next safe ledge

```txt
PhantomCommand Campaign Fixture Readback Ledger Refresh + GameHost Gate
```

## Validation

Docs-only pass.

```txt
runtime source changed: no
branch created: no
pull request created: no
npm run check: not run
npm run build: not run
construct smoke: not run
campaign fixture: not run because proof files do not exist yet
browser smoke: not run
```
