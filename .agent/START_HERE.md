# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Last aligned:** `2026-07-10T03-59-57-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `PhantomCommand`.

Read this folder before changing runtime code.

## Current selection result

The current public `LuminaryLabs-Publish` repository list was checked against the tracked/documented repo ledger in `LuminaryLabs-Dev/LuminaryLabs` and sampled repo-local root `.agent` state.

No checked public non-Cavalry repo was new, missing from the central ledger, missing root `.agent`, recently added but undocumented, or otherwise undocumented.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`PhantomCommand` was selected as the oldest eligible public documented fallback after `HorrorCorridor` advanced to `2026-07-10T03-49-48-04-00`.

## Public Publish repos checked

```txt
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-10T03-01-42-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-10T02-51-39-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-10T02-38-56-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-10T02-31-58-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-10T02-19-14-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-10T02-10-16-04-00
LuminaryLabs-Publish/PhantomCommand       selected / oldest eligible fallback / prior central latest 2026-07-10T02-02-24-04-00
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-10T03-49-48-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
```

## Current product read

`PhantomCommand` is now a static Vite canvas game with two routes:

```txt
index.html
  -> src/menu/graveyard-menu.js
  -> game.html
  -> src/campaign/campaign-scene.js
```

The active game route is no longer an inline `game.html` construct proof. `game.html` is a thin route shell that imports `src/campaign/campaign-scene.js`.

The live campaign scene is a 640 x 360 internal canvas rendered through a CRT/pixel display adapter. It implements concentric grave rings, four enemy lanes, build pads, player guards/archers, tower placement, enemy waves, projectiles, minimap, camera pan/zoom, wave start, pause, reload, and `window.GameHost` readback.

## Current interaction loop

```txt
open index.html
  -> graveyard menu renders into low-res canvas through crt-renderer
  -> Begin Campaign routes to game.html?campaign=new
  -> game.html imports src/campaign/campaign-scene.js
  -> campaign-scene creates 640 x 360 source canvas and CRT renderer
  -> rings, lanes, pads, archetypes, towers, waves, camera, input, and state are declared inline
  -> starter guards and archers spawn around center
  -> pointer selects units or build pads
  -> double-select empty pad builds selected tower when souls are sufficient
  -> right-click orders selected units or targets enemies
  -> Space starts queued wave spawns
  -> enemies path from lane edge toward sanctum core
  -> towers/allies acquire targets and fire projectiles
  -> enemies damage sanctum core if they reach center
  -> update loop resolves units, towers, projectiles, effects, wave clear, win/loss
  -> draw loop renders rings, lanes, pads, props, units, towers, projectiles, effects, HUD, minimap, and CRT pass
  -> window.GameHost exposes state, camera, startWave, build, getState, and setZoom
```

## Next target loop

```txt
campaign source manifest
  -> ring/lane/pad descriptor kit
  -> unit archetype descriptor kit
  -> tower descriptor kit
  -> wave descriptor kit
  -> input/action intent contract
  -> build/order/wave ActionResult rows
  -> simulation tick frame rows
  -> render readback rows
  -> additive GameHost campaign diagnostics
  -> DOM-free campaign fixture
  -> build fixture gate
  -> central ledger latest-tracker sync
```

## First files to read next

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/2026-07-10T03-59-57-04-00-campaign-scene-source-manifest-dsk-map.md
.agent/render-audit/2026-07-10T03-59-57-04-00-pixel-campaign-render-readback.md
.agent/gameplay-audit/2026-07-10T03-59-57-04-00-wave-build-action-loop.md
.agent/interaction-audit/2026-07-10T03-59-57-04-00-select-build-order-action-results.md
.agent/campaign-authority-audit/2026-07-10T03-59-57-04-00-campaign-source-fixture-contract.md
.agent/deploy-audit/2026-07-10T03-59-57-04-00-campaign-fixture-build-gate.md
.agent/trackers/2026-07-10T03-59-57-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-10T03-59-57-04-00.md
.agent/kit-registry.json
```

## Source files to inspect next

```txt
package.json
index.html
game.html
scripts/build-static.mjs
src/menu/graveyard-menu.js
src/menu/crt-renderer.js
src/campaign/campaign-scene.js
src/kits/construct-spiral-intro-kit/index.js
tests/construct-spiral-intro-kit-smoke.mjs
```

## Current next safe ledge

```txt
PhantomCommand Campaign Scene Source Manifest + GameHost Fixture Gate
```

Build this before deeper camera rewrites, expanded enemy animation, economy expansion, renderer replacement, or additional campaign content.
