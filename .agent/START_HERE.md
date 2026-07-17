# PhantomCommand Agent State

**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Latest audit:** `2026-07-16T23-59-01-04-00`  
**Status:** `isometric-middle-pan-anchor-convergence-authority-audited`

## Summary

PhantomCommand combines a procedural Canvas2D menu, menu WebAudio, a fixed-step isometric campaign, Canvas2D world/HUD/minimap rendering, WebGL CRT presentation, persistence, static validation, build and Pages delivery. The active audit isolates middle-button camera pan: the campaign duplicates the inverse isometric transform and uses `1 / (zoom * 0.72)` for horizontal source motion where the canonical transform uses `1 / (zoom * 1.44)`. Horizontal grab-pan displacement is therefore twice the amount required to preserve the world point under the pointer.

## Plan ledger

**Goal:** make every accepted middle-button camera gesture resolve through the canonical screen/source/world transform and acknowledge the first frame in which the grabbed world anchor remains converged.

- [x] Compare the complete 11-repository Publish inventory with central tracking.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible ledgers and root `.agent` states.
- [x] Select only PhantomCommand by the oldest documented-selection rule.
- [x] Trace menu, CRT, campaign, camera, middle-pointer, fixed-step, render, validation and deployment surfaces.
- [x] Preserve all 20 implemented kits and their services.
- [x] Define 19 middle-pan anchor authority surfaces.
- [x] Add the timestamped audit family.
- [ ] Implement and execute browser, artifact and Pages anchor-convergence fixtures.

## Complete interaction loop

```txt
menu
  -> restore settings and save presence
  -> procedural Canvas2D and CRT presentation
  -> route to campaign

campaign
  -> keyboard, pointer and wheel evidence
  -> camera and fixed-step simulation
  -> Canvas2D world, HUD, minimap and CRT presentation

middle pan
  -> browser coordinates map to source coordinates
  -> middle pointerdown stores source x/y
  -> pointermove derives source dx/dy
  -> duplicated transform mutates camera x/z
  -> horizontal displacement is 2x canonical inverse displacement
  -> next frame clamps and renders camera
  -> no typed result or anchor/frame acknowledgement exists
```

## Inventory

```txt
implemented source-backed kits: 20
planned middle-pan authority surfaces: 19
```

## Required parent domain

`phantom-command-isometric-middle-pan-anchor-convergence-authority-domain`

## Read this pass first

```txt
.agent/trackers/2026-07-16T23-59-01-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-16T23-59-01-04-00.md
.agent/architecture-audit/2026-07-16T23-59-01-04-00-isometric-middle-pan-anchor-dsk-map.md
.agent/render-audit/2026-07-16T23-59-01-04-00-middle-pan-grabbed-anchor-visible-frame-gap.md
.agent/gameplay-audit/2026-07-16T23-59-01-04-00-camera-grab-pan-control-loop.md
.agent/interaction-audit/2026-07-16T23-59-01-04-00-middle-pan-command-result-map.md
.agent/camera-pan-audit/2026-07-16T23-59-01-04-00-source-delta-world-anchor-contract.md
.agent/deploy-audit/2026-07-16T23-59-01-04-00-middle-pan-browser-fixture-gate.md
.agent/central-sync-audit/2026-07-16T23-59-01-04-00-oldest-selection-middle-pan-reconciliation.md
```

## Retained authorities

Marquee selection, wheel zoom, motion preference, campaign audio, pointer capture/cancellation, pointer feedback, menu audio lifecycle, diagnostics, device coverage, render order, pause input, terminal settlement, startup readiness, settings adoption, victory persistence, route retirement, fixed-step scheduling, WebGL recovery, accessibility, combat modifiers, campaign bootstrap, keyboard commands and broad spatial input remain separate retained authorities.