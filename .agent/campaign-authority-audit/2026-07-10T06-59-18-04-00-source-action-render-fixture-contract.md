# Campaign Authority Audit — Source / Action / Render Fixture Contract

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Timestamp:** `2026-07-10T06-59-18-04-00`

## Contract goal

Move the campaign from inline-only authority toward source-owned descriptor rows and fixture-readable action/render proof while preserving the current playable scene.

## Source contract

```txt
CampaignSourceLedger
  route: game.html
  sceneModule: src/campaign/campaign-scene.js
  sourceWidth: 640
  sourceHeight: 360
  ringCount: 7
  laneCount: 4
  generatedPadCount
  towerTypes: spire, lantern, ward
  unitArchetypes: guard, archer, runner, shield, zealot, brute, wraith
  waveCount: 6
  starterAllyCount: 6
```

## Action contract

```txt
ActionIntent
ActionResult
ActionJournal
```

Rows should cover:

```txt
select ally
select pad
clear selection
build accepted
build rejected
order move
order attack
start wave accepted
start wave rejected
wave clear
win
loss
```

## Render contract

```txt
RenderReadback
  rings
  lanes
  pads
  units
  towers
  projectiles
  effects
  HUD
  minimap
  CRT pass
```

## GameHost contract

Keep existing fields:

```txt
wave
waveActive
souls
core
units
towers
won
lost
zoom
```

Add only additive diagnostics:

```txt
campaign.source
campaign.latestAction
campaign.actionJournal
campaign.simulationFrame
campaign.renderReadback
campaign.fixtureStatus
```

## Non-goals

```txt
no branch
no PR
no renderer replacement
no new content before fixture
no campaign scene rewrite before helper proof
```
