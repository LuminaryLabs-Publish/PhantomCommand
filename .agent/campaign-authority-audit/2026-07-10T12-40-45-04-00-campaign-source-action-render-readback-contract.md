# PhantomCommand Campaign Authority Audit: Source Action Render Readback Contract

**Timestamp:** `2026-07-10T12-40-45-04-00`

## Authority problem

The campaign route has useful game structure, but `src/campaign/campaign-scene.js` is still the single authority for campaign source descriptors, action mutation, simulation frames, render consumption, and GameHost diagnostics.

## Contract to add

```txt
CampaignSourceLedger
  route
  sceneModule
  sourceCanvas
  rings
  lanes
  pads
  unitArchetypes
  towerArchetypes
  waves
  sourceFingerprint

CampaignActionResult
  action
  status
  reason
  beforeSummary
  afterSummary
  changed
  sourceIds
  simulationFrameId
  renderHints

CampaignSimulationFrame
  frame
  spawns
  unitUpdates
  towerUpdates
  projectileUpdates
  damageRows
  rewardRows
  waveClearRows
  winLossRows

CampaignRenderReadback
  sourceCanvas
  rings
  lanes
  pads
  props
  units
  towers
  projectiles
  effects
  HUD
  minimap
  CRT pass

GameHostCampaignDiagnostics
  sourceLedgerSummary
  latestActionResult
  latestSimulationFrame
  latestRenderReadback
  fixtureStatus
  legacyCompatibility
```

## Additive rule

Do not remove existing `window.GameHost` fields. Add campaign proof under an additive `campaign` or `proof` block after fixture proof.

## Build gate

`npm run build` should eventually run the campaign fixture before copying static artifacts.
