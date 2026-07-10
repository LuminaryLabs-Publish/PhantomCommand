# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-10T12-40-45-04-00`

## Selected repo

```txt
LuminaryLabs-Publish/PhantomCommand
```

## Selection reason

No checked public non-Cavalry repo was new, central-ledger absent, missing root `.agent`, recently added, or otherwise undocumented. `PhantomCommand` was selected as the oldest eligible documented fallback after `HorrorCorridor` advanced.

`TheCavalryOfRome` remained excluded by rule.

## Interaction loop

```txt
index.html graveyard menu
  -> Begin Campaign or Continue
  -> game.html
  -> src/campaign/campaign-scene.js
  -> 640 x 360 source canvas
  -> CRT renderer
  -> inline campaign source: rings, lanes, pads, units, towers, waves
  -> pointer selects units or build pads
  -> repeat selected empty pad click builds tower if souls allow
  -> right-click orders selected units or targets enemies
  -> Space starts wave
  -> update loop advances spawns, units, towers, projectiles, damage, rewards, win/loss
  -> draw loop renders world, HUD, minimap, modal, CRT pass
  -> GameHost exposes aggregate state and zoom controls
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
campaign-source-fingerprint-next
campaign-action-result-next
campaign-simulation-frame-next
campaign-render-readback-next
campaign-gamehost-fixture-next
central-ledger-sync
```

## Kits and services

```txt
crt-renderer-kit: source canvas display, CRT pass, pointer source mapping.
graveyard-art-kit: menu art composition.
menu-route-kit: start, continue, settings, local save detection.
campaign-route-shell-kit: game.html canvas route and accessible controls.
pixel-campaign-runtime-kit: inline rings, lanes, pads, units, towers, waves, input, update, draw, HUD, minimap, save, GameHost.
legacy-gamehost-diagnostics-kit: aggregate state, camera, startWave, build, setZoom.
construct-spiral-intro-kit: legacy construct profile proof target, not current campaign authority.
phantom-command-campaign-source-ledger-kit next: source-owned campaign rows.
phantom-command-source-fingerprint-kit next: route/source descriptor fingerprints.
phantom-command-action-result-kit next: select/build/order/start-wave/damage/reward/win/loss rows.
phantom-command-simulation-frame-kit next: deterministic spawn/unit/tower/projectile frame summaries.
phantom-command-render-readback-kit next: render consumption rows for world, HUD, minimap, and CRT pass.
phantom-command-gamehost-diagnostics-kit next: JSON-safe campaign diagnostics.
phantom-command-campaign-fixture-kit next: DOM-free campaign parity proof.
phantom-command-build-fixture-gate-kit next: build/check integration.
```

## Main finding

`PhantomCommand` should not start next with camera rewrites, larger campaign content, renderer replacement, new enemy art, economy expansion, RTS system expansion, construct-profile work, or visual polish.

The blocker is campaign source/action/render readback. `src/campaign/campaign-scene.js` still owns descriptors, mutation, input, simulation, render, HUD, minimap, save-on-win, and `GameHost` inline.

## Next safe ledge

```txt
PhantomCommand Campaign Source Action Render Readback Refresh + GameHost Fixture Gate
```

## Validation

```txt
runtime source changed: no
branch created: no
pull request created: no
npm run check: not run
npm run build: not run
construct smoke: not run
campaign fixture: not run because proof files do not exist yet
browser smoke: not run
pushed to main: yes
central ledger updated: pending at repo-local write time
```
