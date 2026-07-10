# PhantomCommand project breakdown

Timestamp: 2026-07-10T14-11-51-04-00

## Selection

Selected `LuminaryLabs-Publish/PhantomCommand` after comparing the current Publish org list against the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger. `TheCavalryOfRome` stayed excluded. No checked non-Cavalry repo was new, ledger-missing, missing root `.agent`, recently added, or otherwise undocumented. `PhantomCommand` was the oldest eligible fallback after `HorrorCorridor` advanced.

## Interaction loop

```txt
index.html menu
  -> game.html
  -> src/campaign/campaign-scene.js
  -> 640 x 360 source canvas
  -> CRT display renderer
  -> inline rings, lanes, pads, archetypes, towers, waves, camera, input, state
  -> click/drag select units or pads
  -> repeat selected pad click builds selected tower if souls cover cost
  -> right click orders units or targets enemies
  -> Space starts the next wave queue
  -> update loop advances spawns, units, towers, projectiles, damage, rewards, wave clear, win, and loss
  -> draw loop renders rings, lanes, pads, entities, HUD, minimap, modal state, and CRT pass
  -> window.GameHost exposes aggregate state and control hooks
```

## Domains in use

- static route shell
- menu route
- campaign route
- source canvas and CRT display renderer
- ring map domain
- lane domain
- build pad domain
- unit archetype domain
- tower archetype domain
- wave script domain
- souls economy domain
- sanctum core health domain
- selection, build, order, and wave-start actions
- unit, enemy, ally, tower, projectile, damage, reward, and effect simulation domains
- camera pan/zoom and keyboard/pointer input domains
- HUD, minimap, save-on-win, and GameHost diagnostics domains

## Kits and services

Current kits/services:

- `crt-renderer-kit`: source canvas display, CRT pass, pointer source mapping.
- `graveyard-art-kit`: menu art composition.
- `menu-route-kit`: start, continue, settings, save detection.
- `campaign-route-shell-kit`: game route canvas and accessible controls.
- `pixel-campaign-runtime-kit`: inline campaign descriptors, mutation, simulation, rendering, HUD, minimap, save, GameHost.
- `legacy-gamehost-diagnostics-kit`: aggregate state, camera, startWave, build, setZoom.
- `construct-spiral-intro-kit`: legacy construct proof target, not current live campaign authority.

Next kits needed:

- campaign source ledger and manifest
- source fingerprint
- ring/lane/build-pad/unit/tower/wave descriptor kits
- action intent and action result kits
- deterministic simulation frame kit
- render readback kit
- additive GameHost diagnostics kit
- DOM-free campaign fixture kit
- build/check fixture gate kit

## Main finding

`PhantomCommand` should not start next with camera rewrites, larger campaign content, renderer replacement, new enemy art, economy expansion, RTS system expansion, construct-profile work, or visual polish.

The blocker is campaign action-result source authority. `src/campaign/campaign-scene.js` still owns descriptors, mutation, input, simulation, render, HUD, minimap, save-on-win, and `GameHost` inline.

## Next safe ledge

```txt
PhantomCommand Campaign Action Result Source Ledger Refresh + GameHost Fixture Gate
```
