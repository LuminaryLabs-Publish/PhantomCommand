# PhantomCommand Campaign Authority Audit — Source Action Render Fixture Contract

**Timestamp:** `2026-07-10T08-20-42-04-00`

## Authority today

`src/campaign/campaign-scene.js` is the live campaign authority.

It owns:

```txt
source canvas size
rings
lane angles
build pad generation
unit archetypes
tower archetypes
wave scripts
state shape
starter units
select/build/order/start-wave commands
simulation update
render draw pass
HUD/minimap projection
save-on-win
GameHost aggregate diagnostics
```

## Problem

The live authority is compact and playable, but proof is not separable from browser runtime.

There is no DOM-free source of truth that can answer:

```txt
what rings should exist?
what pads should exist?
what archetypes are valid?
what tower types are valid?
what waves are valid?
what action was attempted?
why was it accepted or rejected?
what did the frame mutate?
what did render consume?
what does GameHost expose beyond aggregate counters?
```

## Contract for next cut

The next implementation should add source-owned modules without breaking legacy behavior:

```txt
src/campaign/campaign-source-ledger.js
src/campaign/campaign-source-manifest.js
src/campaign/ring-lane-descriptors.js
src/campaign/build-pad-descriptors.js
src/campaign/unit-archetypes.js
src/campaign/tower-archetypes.js
src/campaign/wave-scripts.js
src/campaign/action-results.js
src/campaign/simulation-frame.js
src/campaign/render-readback.js
src/campaign/gamehost-diagnostics.js
tests/phantom-command-campaign-fixture.mjs
```

## Required compatibility

```txt
index.html route unchanged
game.html route unchanged
existing window.GameHost.state unchanged
existing window.GameHost.camera unchanged
existing window.GameHost.startWave unchanged
existing window.GameHost.build unchanged
existing window.GameHost.getState legacy fields unchanged
existing window.GameHost.setZoom unchanged
new diagnostics additive only under GameHost.getState().campaign
```

## Fixture gate

Before build/runtime wiring, the fixture should prove:

```txt
sourceWidth === 640
sourceHeight === 360
ringCount === 7
laneCount === 4
towerTypes include spire, lantern, ward
unitArchetypes include guard, archer, runner, shield, zealot, brute, wraith
waveCount === 6
starterAllyCount === 6
ActionResult rows cover select/build/order/start-wave/damage/reward/win/loss
render readback rows cover rings/lanes/pads/units/towers/projectiles/HUD/minimap/CRT
legacy GameHost compatibility remains intact
```
