# Gameplay audit: wave build order action result loop

Timestamp: 2026-07-10T14-11-51-04-00

## Gameplay loop

```txt
prepare grave-ring defenses
  -> choose tower type with 1/2/3
  -> click or drag to select allies or build pad
  -> repeat selected pad click to build
  -> right-click to order units or target enemies
  -> Space starts the next wave
  -> waves spawn from four lanes
  -> units/towers/projectiles resolve combat
  -> rewards, core damage, wave clear, win, and loss mutate state
```

## Current gameplay authority

The gameplay authority is inline in `campaign-scene.js`: descriptors, command handlers, mutations, update loop, reward flow, and win/loss state all live together.

## Missing gameplay proof

The next cut needs ActionResult rows for:

- select unit;
- select pad;
- build accepted;
- build rejected for no pad, occupied pad, unaffordable tower, invalid tower type, won/lost state;
- order accepted;
- order rejected for no selection;
- wave start accepted;
- wave start rejected for active wave, won/lost state, or exhausted waves;
- damage/reward/wave-clear/win/loss outcomes.

## Next ledge

Create a DOM-free gameplay fixture with deterministic source rows and action-result rows before tuning camera, economy, enemies, or campaign length.
