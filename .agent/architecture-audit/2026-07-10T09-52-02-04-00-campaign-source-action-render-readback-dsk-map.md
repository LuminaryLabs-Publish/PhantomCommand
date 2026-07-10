# Architecture Audit: Campaign Source Action Render Readback DSK Map

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Timestamp:** `2026-07-10T09-52-02-04-00`

## Architecture summary

`PhantomCommand` is a static Vite canvas game. The active route is a low-resolution pixel campaign scene rendered through a CRT/display adapter.

The architecture has a playable route, but the live source authority is concentrated in `src/campaign/campaign-scene.js`. The next cut should externalize source rows and proof rows before expanding gameplay or visuals.

## DSK/domain map

```txt
Domain: static-route-shell
Services: index route, game route, static build artifact copy.
Kits: menu-route-kit, campaign-route-shell-kit.
Status: implemented.

Domain: display-adapter
Services: source canvas, screen-to-source pointer mapping, CRT render pass.
Kits: crt-renderer-kit.
Status: implemented.

Domain: menu
Services: graveyard menu art, campaign start, continue state, settings surface.
Kits: graveyard-art-kit, menu-route-kit.
Status: implemented.

Domain: campaign-source
Services: source width/height, rings, lanes, pads, unit archetypes, tower archetypes, wave scripts.
Kits: pixel-campaign-runtime-kit today; campaign-source-ledger-kit next.
Status: implemented inline, proof missing.

Domain: interaction
Services: select unit, select pad, build tower, order units, start wave, choose tower type, camera pan/zoom.
Kits: pixel-campaign-runtime-kit today; action-intent-kit and action-result-kit next.
Status: implemented inline, result rows missing.

Domain: simulation
Services: wave spawn queue, unit AI, tower targeting, projectiles, damage, rewards, effects, wave clear, win, loss.
Kits: pixel-campaign-runtime-kit today; simulation-frame-kit next.
Status: implemented inline, deterministic frame summaries missing.

Domain: render-readback
Services: rings, lanes, pads, props, units, towers, projectiles, effects, HUD, minimap, modal, CRT pass.
Kits: pixel-campaign-runtime-kit today; render-readback-kit next.
Status: rendered inline, consumption rows missing.

Domain: GameHost diagnostics
Services: aggregate state, zoom control, wave/build calls.
Kits: legacy-gamehost-diagnostics-kit today; campaign-gamehost-diagnostics-kit next.
Status: aggregate only, source/action/render proof missing.

Domain: legacy construct support
Services: construct spiral intro smoke target and construct piece update helpers.
Kits: construct-spiral-intro-kit, construct-spiral-schedule-kit, construct-piece-id-kit, construct-piece-state-kit, construct-sequence-update-kit.
Status: present, not live campaign authority.

Domain: central-ledger-sync
Services: repo-local .agent alignment, central ledger, internal change log.
Kits: central-ledger-readback-kit.
Status: maintained by docs pass.
```

## Current seam

```txt
game.html
  -> imports campaign-scene.js
  -> campaign-scene.js owns source descriptors, state, mutation, input, render, save, and GameHost
  -> GameHost.getState() returns aggregate campaign counters only
  -> no source fingerprint, action result journal, simulation frame rows, render consumption rows, or fixture status
```

## Target seam

```txt
source ledger
  -> descriptor fingerprints
  -> action intents
  -> action results
  -> simulation frame summaries
  -> render readback ledger
  -> additive GameHost campaign diagnostics
  -> DOM-free campaign fixture
  -> build/check gate
```

## Non-goals

```txt
- camera rewrite
- isometric perspective rewrite
- enemy art expansion
- larger campaign content
- economy expansion
- renderer replacement
- deleting construct-spiral-intro-kit
```
