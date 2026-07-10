# PhantomCommand Campaign Authority Audit: Source Fixture Contract

**Timestamp:** `2026-07-10T03-59-57-04-00`

## Contract goal

Make the live campaign scene source-owned and fixture-readable before expanding the game.

## Required source manifest

```txt
route: game.html
sceneModule: src/campaign/campaign-scene.js
sourceWidth: 640
sourceHeight: 360
ringCount: 7
laneCount: 4
towerTypes: spire, lantern, ward
unitArchetypes: guard, archer, runner, shield, zealot, brute, wraith
waveCount: 6
starterUnitCount: 6
```

## Required source fingerprints

```txt
ringsFingerprint
lanesFingerprint
padsFingerprint
unitArchetypesFingerprint
towerArchetypesFingerprint
wavesFingerprint
controlsFingerprint
renderSurfaceFingerprint
```

## Required fixture rows

```txt
source manifest row
ring/lane descriptor row
pad generation row
unit archetype row
tower archetype row
wave script row
select action row
build action row
order action row
start wave row
simulation frame row
render readback row
GameHost legacy compatibility row
GameHost campaign diagnostics row
```

## Required GameHost additive diagnostics

```txt
getState().campaign.source
getState().campaign.actions
getState().campaign.render
getState().campaign.fixture
```

Do not remove the existing aggregate fields from `GameHost.getState()`.
