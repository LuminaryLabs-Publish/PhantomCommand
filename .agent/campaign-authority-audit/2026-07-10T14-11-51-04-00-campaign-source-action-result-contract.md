# Campaign authority audit: source action result contract

Timestamp: 2026-07-10T14-11-51-04-00

## Authority boundary

The active campaign authority is `src/campaign/campaign-scene.js`.

It owns:

- source dimensions;
- rings and lane angles;
- generated build pads;
- unit archetypes;
- tower archetypes;
- wave scripts;
- initial allies;
- souls/core/wave state;
- selection, build, order, and wave-start handlers;
- update and render loops;
- localStorage save-on-win;
- `window.GameHost`.

## Contract gap

The repo needs a contract that separates source rows from consumers:

```txt
source rows: route, dimensions, rings, lanes, pads, units, towers, waves
intent rows: select, build, order, start-wave
result rows: accepted, rejected, skipped, no-op, unsupported
simulation rows: spawn, AI, tower fire, projectile hit, damage, reward, wave clear, win, loss
render rows: consumed by ring/lane/pad/unit/tower/HUD/minimap/CRT consumers
GameHost rows: fixture-readable campaign block while preserving legacy fields
```

## Why now

The game can be expanded visually, but every expansion will be brittle until command outcomes are source-owned and fixture-readable.

## Next safe contract

`GameHost.getState()` should keep its current aggregate fields and add a JSON-safe `campaign` block with source fingerprint, latest action results, frame summaries, render readback rows, and fixture status.
