# PhantomCommand Agent State

**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Latest audit:** `2026-07-16T17-40-04-04-00`  
**Status:** `isometric-marquee-selection-geometry-authority-audited`

## Summary

PhantomCommand combines a procedural Canvas2D menu, menu WebAudio, a fixed-step isometric campaign, Canvas2D world/HUD/minimap rendering, WebGL CRT presentation, persistence, static validation, build and Pages delivery. The active audit isolates drag selection: the campaign converts only the top-left and bottom-right screen corners into world coordinates, then selects against an axis-aligned world x/z box. Under the isometric inverse transform, the omitted top-right and bottom-left corners carry the z extrema, so the accepted selection set can diverge from the rectangle visibly drawn by the player.

## Plan ledger

**Goal:** make every marquee gesture resolve through one camera-bound screen-space selection transaction whose accepted unit set matches the visible rectangle and matching rendered frame.

- [x] Compare the complete 11-repository Publish inventory with central tracking.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible ledgers, root `.agent` states and synchronized heads.
- [x] Select only PhantomCommand by the oldest synchronized timestamp.
- [x] Trace menu, CRT, campaign, camera, pointer, drag, selection, validation and deployment surfaces.
- [x] Preserve all 20 implemented kits and their services.
- [x] Define 19 marquee-selection authority surfaces.
- [x] Add the timestamped audit family.
- [ ] Implement and execute camera, drag-direction, edge and artifact fixtures.

## Complete interaction loop

```txt
menu
  -> restore settings and save presence
  -> procedural Canvas2D and CRT presentation
  -> route to campaign

campaign
  -> keyboard pointer and wheel evidence
  -> camera and fixed-step simulation
  -> Canvas2D world HUD minimap and CRT presentation

marquee selection
  -> pointerdown stores one source-space corner
  -> pointermove draws a visible screen rectangle
  -> pointerup converts only two diagonal corners to world space
  -> world x/z axis-aligned bounds are derived
  -> allies are filtered against those bounds
  -> accepted selection can differ from the visible rectangle
  -> no typed selection result or frame acknowledgement exists
```

## Inventory

```txt
implemented source-backed kits: 20
planned marquee-selection authority surfaces: 19
```

## Required parent domain

`phantom-command-isometric-marquee-selection-geometry-authority-domain`

## Read this pass first

```txt
.agent/trackers/2026-07-16T17-40-04-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-16T17-40-04-04-00.md
.agent/architecture-audit/2026-07-16T17-40-04-04-00-isometric-marquee-selection-dsk-map.md
.agent/render-audit/2026-07-16T17-40-04-04-00-visible-rectangle-selected-set-gap.md
.agent/gameplay-audit/2026-07-16T17-40-04-04-00-drag-selection-membership-loop.md
.agent/interaction-audit/2026-07-16T17-40-04-04-00-marquee-selection-command-result-map.md
.agent/selection-geometry-audit/2026-07-16T17-40-04-04-00-screen-rectangle-isometric-membership-contract.md
.agent/deploy-audit/2026-07-16T17-40-04-04-00-marquee-selection-browser-fixture-gate.md
.agent/central-sync-audit/2026-07-16T17-40-04-04-00-oldest-selection-marquee-geometry-reconciliation.md
```

## Retained authorities

Wheel zoom, motion preference, campaign audio, pointer capture/cancellation, pointer feedback, menu audio lifecycle, diagnostics, device coverage, render order, pause input, terminal settlement, startup readiness, settings adoption, victory persistence, route retirement, fixed-step scheduling, WebGL recovery, accessibility, combat modifiers, campaign bootstrap, keyboard commands and broad spatial input remain separate retained authorities.
