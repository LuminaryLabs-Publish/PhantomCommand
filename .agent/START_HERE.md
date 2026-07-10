# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Last aligned:** `2026-07-10T12-40-45-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for breakdown and implementation work on `PhantomCommand`.

Read this folder before changing runtime code.

## Current selection result

The current public `LuminaryLabs-Publish` repository list was checked against the tracked/documented repo ledger in `LuminaryLabs-Dev/LuminaryLabs` and sampled repo-local root `.agent` state.

No checked public non-Cavalry repo was new, missing from the central ledger, missing root `.agent`, recently added, or otherwise undocumented.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`PhantomCommand` was selected as the oldest eligible public documented fallback after `HorrorCorridor` advanced to `2026-07-10T12-29-26-04-00`.

## Current product read

`PhantomCommand` is a static Vite canvas game with two routes:

```txt
index.html
  -> src/menu/graveyard-menu.js
  -> game.html
  -> src/campaign/campaign-scene.js
```

The active game route is a live pixel campaign scene. `game.html` is a thin route shell that imports `src/campaign/campaign-scene.js`.

The live campaign scene is a 640 x 360 internal canvas rendered through a CRT/pixel display adapter. It implements 7 concentric grave rings, 4 enemy lanes, generated build pads, player guards/archers, three tower types, six enemy waves, projectiles, minimap, camera pan/zoom, wave start, pause, reload, save-on-win, and `window.GameHost` readback.

## Current interaction loop

```txt
open index.html
  -> graveyard menu renders through crt-renderer and graveyard-art
  -> Begin Campaign or Continue routes to game.html
  -> game.html imports src/campaign/campaign-scene.js
  -> campaign-scene creates 640 x 360 source canvas and CRT display renderer
  -> inline descriptors define 7 rings, 4 lanes, generated pads, unit archetypes, tower archetypes, waves, camera, input, and campaign state
  -> starter guards and archers spawn around sanctum core
  -> pointer click selects allies or empty build pads
  -> repeat click on selected empty pad builds selected tower if souls cover selected tower cost
  -> right-click orders selected units or targets nearest enemy
  -> Space starts queued wave spawns
  -> update loop advances wave spawn queue, unit AI, towers, projectiles, damage, rewards, effects, win, and loss
  -> draw loop renders rings, lanes, pads, grave props, units, towers, projectiles, effects, HUD, minimap, modal state, and CRT pass
  -> GameHost exposes state, camera, startWave, build, getState, and setZoom
```

## First files to read next

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/2026-07-10T12-40-45-04-00-campaign-source-action-render-readback-dsk-map.md
.agent/render-audit/2026-07-10T12-40-45-04-00-pixel-campaign-render-readback-ledger-gap.md
.agent/gameplay-audit/2026-07-10T12-40-45-04-00-wave-build-order-result-loop.md
.agent/interaction-audit/2026-07-10T12-40-45-04-00-select-build-order-action-result-map.md
.agent/campaign-authority-audit/2026-07-10T12-40-45-04-00-campaign-source-action-render-readback-contract.md
.agent/deploy-audit/2026-07-10T12-40-45-04-00-campaign-fixture-check-build-gate.md
.agent/source-profile-audit/2026-07-10T12-40-45-04-00-legacy-construct-profile-still-demoted.md
.agent/trackers/2026-07-10T12-40-45-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-10T12-40-45-04-00.md
.agent/kit-registry.json
```

## Source files to inspect next

```txt
package.json
index.html
game.html
scripts/build-static.mjs
scripts/check-campaign.mjs
src/menu/graveyard-menu.js
src/menu/crt-renderer.js
src/campaign/campaign-scene.js
src/kits/construct-spiral-intro-kit/index.js
tests/construct-spiral-intro-kit-smoke.mjs
```

## Current next safe ledge

```txt
PhantomCommand Campaign Source Action Render Readback Refresh + GameHost Fixture Gate
```

Build this before camera rewrites, expanded enemy animation, economy expansion, renderer replacement, RTS scenario expansion, construct-profile work, or additional campaign content.
