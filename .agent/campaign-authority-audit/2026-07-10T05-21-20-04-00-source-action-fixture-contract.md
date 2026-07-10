# Campaign Authority Audit: Source Action Fixture Contract

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Timestamp:** `2026-07-10T05-21-20-04-00`

## Contract need

The campaign scene needs a source-owned fixture contract before gameplay or visual expansion.

## Required source facts

```txt
route: game.html
sceneModule: src/campaign/campaign-scene.js
sourceWidth: 640
sourceHeight: 360
ringCount: 7
laneCount: 4
padCount: generated from ring 1..5 excluding lane blockers
unitArchetypes: guard, archer, runner, shield, zealot, brute, wraith
towerTypes: spire, lantern, ward
waveCount: 6
starterAllies: 6
initialSouls: 145
initialCore: 24
```

## Required fixture rows

```txt
source manifest row
descriptor fingerprint row
ring/lane/pad rows
unit archetype rows
tower archetype rows
wave script rows
select unit accepted row
select pad accepted row
build accepted/rejected rows
order move/attack rows
start wave accepted/rejected rows
simulation frame summary rows
render readback rows
GameHost legacy compatibility row
GameHost campaign diagnostics row
```

## First source files to add next

```txt
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

## Authority finding

The current inline scene should stay visually stable. Build a source/action fixture first, then splice helpers into the browser route while preserving legacy `GameHost` fields.
