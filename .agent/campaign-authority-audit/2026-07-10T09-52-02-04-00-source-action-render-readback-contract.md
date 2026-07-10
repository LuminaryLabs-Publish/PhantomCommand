# Campaign Authority Audit: Source Action Render Readback Contract

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Timestamp:** `2026-07-10T09-52-02-04-00`

## Authority seam today

```txt
src/campaign/campaign-scene.js
  owns source constants
  owns state shape
  owns mutation functions
  owns input handlers
  owns simulation update
  owns draw/render pipeline
  owns HUD/minimap projection
  owns save-on-win
  owns GameHost surface
```

This is convenient, but it blocks safe expansion because source rows and runtime rows cannot be compared outside the browser.

## Required contract

```txt
CampaignSourceLedger
  route
  sceneModule
  sourceWidth
  sourceHeight
  rings
  lanes
  buildPads
  unitArchetypes
  towerArchetypes
  waveScripts
  starterAllies

ActionResultJournal
  select rows
  build rows
  order rows
  start-wave rows
  damage rows
  reward rows
  win/loss rows

SimulationFrameSummary
  frameId
  wave
  spawnQueue
  unitCounts
  towerCounts
  projectileCounts
  damageEvents
  rewardEvents
  win/loss flags

RenderReadbackLedger
  ring/lane/pad rows
  unit/tower/projectile/effect rows
  HUD rows
  minimap rows
  CRT pass row

GameHostCampaignDiagnostics
  sourceLedger
  latestActionResult
  latestSimulationFrame
  latestRenderReadback
  fixtureStatus
  legacyCompatibility
```

## Fixture proof required

```txt
sourceWidth === 640
sourceHeight === 360
ringCount === 7
laneCount === 4
towerTypes include spire, lantern, ward
unitArchetypes include guard, archer, runner, shield, zealot, brute, wraith
waveCount === 6
starterAllyCount === 6
build accepted/rejected rows pass
order accepted/ignored rows pass
wave start accepted/rejected rows pass
win/loss rows pass
render readback rows pass
legacy GameHost fields still exist
```

## Implementation order

```txt
1. Add source ledger and descriptor helpers.
2. Add source fingerprint and source snapshot.
3. Add ActionIntent and ActionResult helpers.
4. Add simulation frame summary helper.
5. Add render readback helper.
6. Add GameHost campaign diagnostics helper.
7. Add DOM-free campaign fixture.
8. Wire helper imports into campaign-scene after fixture proof.
9. Gate npm run build with the campaign fixture.
```

## Non-goal

Do not delete or rewrite the legacy construct kit during this proof cut. It is separate from the live `game.html` campaign route.
