# Render audit: campaign render action result readback gap

Timestamp: 2026-07-10T14-11-51-04-00

## Render surface

The active render surface is `src/campaign/campaign-scene.js` drawing into a 640 x 360 source canvas and projecting through `createCrtRenderer`.

The render path covers:

- grave rings and lane lines;
- generated build pads;
- procedural grave props;
- towers, units, projectiles, and effects;
- sanctum core;
- HUD, tower picker, message strip, and minimap;
- paused/won/lost modal overlay;
- CRT final pass.

## Gap

Render is tied directly to live aggregate state. It does not emit rows for:

- source descriptor consumed;
- descriptor skipped or unsupported;
- action result displayed;
- rejected/no-op command visible to HUD;
- wave/state snapshot tied to a frame;
- minimap source rows;
- CRT pass source frame ID.

## Risk

A visual smoke can pass while action outcomes remain invisible to fixtures. Build rejection, no selected unit, already-active wave, and unaffordable tower paths can collapse into no visible change.

## Next check

Add a render readback helper that produces JSON-safe rows for rings, lanes, pads, units, towers, projectiles, HUD, minimap, modal state, and CRT pass without requiring canvas drawing.
