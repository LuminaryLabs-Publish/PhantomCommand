# PhantomCommand Agent State

**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Latest audit:** `2026-07-16T10-38-36-04-00`  
**Status:** `wheel-zoom-delta-anchor-convergence-authority-audited`

## Summary

PhantomCommand combines a procedural Canvas2D menu, menu WebAudio, a fixed-step isometric campaign, Canvas2D world/HUD/minimap rendering, WebGL CRT presentation, persistence, static validation, build and Pages delivery. The active audit isolates wheel zoom: the campaign consumes raw `WheelEvent.deltaY` without `deltaMode` normalization, and its attempted pointer-anchor correction compares world coordinates before the current zoom changes, producing zero correction before RAF easing moves the visible world beneath the pointer.

## Plan ledger

**Goal:** make every accepted wheel or trackpad zoom resolve through one device-normalized camera command that preserves the intended world anchor and acknowledges the matching rendered frame.

- [x] Compare the full 11-repository Publish inventory with central tracking.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible ledgers, root `.agent` states and synchronized heads.
- [x] Select only PhantomCommand by the oldest synchronized timestamp.
- [x] Trace menu, CRT, campaign, camera, pointer, wheel, validation and deployment surfaces.
- [x] Preserve all 20 implemented kits and their services.
- [x] Define 19 wheel-zoom authority surfaces.
- [x] Add the timestamped audit family.
- [ ] Implement and execute pixel, line, page, trackpad and pointer-anchor fixtures.

## Complete interaction loop

```txt
menu
  -> restore settings and save presence
  -> procedural Canvas2D and CRT presentation
  -> route to campaign

campaign
  -> keyboard pointer and wheel evidence
  -> fixed-step simulation and camera projection
  -> Canvas2D world HUD minimap and CRT presentation

wheel zoom
  -> read raw deltaY
  -> update targetZoom
  -> compare before/after using unchanged current zoom
  -> apply zero anchor correction
  -> RAF later eases current zoom
  -> world beneath pointer drifts without a typed result or frame acknowledgement
```

## Inventory

```txt
implemented source-backed kits: 20
planned wheel-zoom authority surfaces: 19
```

## Required parent domain

`phantom-command-wheel-zoom-delta-anchor-convergence-authority-domain`

## Read this pass first

```txt
.agent/trackers/2026-07-16T10-38-36-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-16T10-38-36-04-00.md
.agent/architecture-audit/2026-07-16T10-38-36-04-00-wheel-zoom-delta-anchor-dsk-map.md
.agent/render-audit/2026-07-16T10-38-36-04-00-pointer-anchor-visible-frame-gap.md
.agent/gameplay-audit/2026-07-16T10-38-36-04-00-device-dependent-camera-zoom-loop.md
.agent/interaction-audit/2026-07-16T10-38-36-04-00-wheel-zoom-command-result-map.md
.agent/camera-zoom-audit/2026-07-16T10-38-36-04-00-delta-normalization-anchor-convergence-contract.md
.agent/deploy-audit/2026-07-16T10-38-36-04-00-wheel-zoom-browser-fixture-gate.md
.agent/central-sync-audit/2026-07-16T10-38-36-04-00-oldest-selection-wheel-zoom-reconciliation.md
```

## Retained authorities

Motion preference, campaign audio, pointer capture/cancellation, pointer feedback, menu audio lifecycle, diagnostics, device coverage, render order, pause input, terminal settlement, startup readiness, settings adoption, victory persistence, route retirement, fixed-step scheduling, WebGL recovery, accessibility, combat modifiers, campaign bootstrap, keyboard commands and broad spatial input remain separate retained authorities.