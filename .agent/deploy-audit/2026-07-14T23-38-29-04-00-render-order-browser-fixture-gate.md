# Render Order Browser Fixture Gate

**Timestamp:** `2026-07-14T23-38-29-04-00`

## Summary

The existing campaign check validates source markers only. It does not execute Canvas2D painter ordering, sample pixels, verify CRT projection or compare source with built and deployed output.

## Plan ledger

**Goal:** require deterministic render-order evidence before source, build or Pages output can be treated as depth-correct.

- [x] Inspect available package scripts and campaign checks.
- [x] Identify missing render-order execution proof.
- [x] Define headless, browser and deployment fixtures.
- [ ] Implement and execute the fixtures.

## Existing validation

```txt
npm run check
  -> check menu source markers
  -> check campaign HTML and source markers

npm run build
  -> copy static product files
```

`check-campaign.mjs` confirms the presence of the canvas, campaign module, rings, lanes, archetypes, tower types, waves, animation markers, camera target zoom, GameHost, CRT upload markers and build source copying. It does not render a campaign frame.

## Required fixture matrix

```txt
headless plan fixture
  far unit depth < sanctum depth < near unit depth
  stable equal-depth identity ordering
  projectile and effect depth classification

browser source fixture
  deterministic seeded frame state
  Canvas2D pixel probes around sanctum edges
  near entity visible in front of sanctum
  far entity correctly occluded
  health-bar policy verified
  CRT-visible frame acknowledgement

build fixture
  run the same deterministic scenario from dist
  compare plan and pixel fingerprints

Pages fixture
  load public game route
  verify product revision
  run or inspect the same render-order proof
  compare visible-frame fingerprint
```

## Gate

No deployment should claim render-order correctness unless all mandatory items have receipts for the same product revision and render policy.

## Current status

```txt
source marker check available: yes
render plan fixture available: no
Canvas2D pixel probe available: no
CRT frame fixture available: no
built-output parity available: no
Pages parity available: no
```
