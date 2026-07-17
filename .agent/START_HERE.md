# PhantomCommand Agent State

**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Latest audit:** `2026-07-17T11-39-49-04-00`  
**Status:** `campaign-camera-coverage-bounds-authority-audited`

## Summary

PhantomCommand combines a procedural Canvas2D menu, WebAudio, a fixed-step isometric campaign, Canvas2D world/HUD/minimap rendering, WebGL CRT presentation, persistence, static validation, build and Pages delivery.

The current audit isolates camera-boundary ownership. The circular arena has an outer radius of `147`, while the frame independently clamps camera `x` and `z` to `[-147,147]`. That square admits camera centers up to `207.89` units from the arena origin and does not account for zoom, the asymmetric isometric source footprint or an explicit arena-coverage policy.

## Intent

Make one camera-coverage authority settle keyboard pan, middle drag, wheel-anchor zoom, focus commands and public host mutations against the same accepted arena, viewport, projection, zoom and policy revisions before rendering.

## Checklist

- [x] Compare the complete 11-repository Publish inventory with central tracking.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible ledgers, root `.agent` states and synchronized heads.
- [x] Select only PhantomCommand through the oldest documented-selection rule.
- [x] Identify the complete interaction loop and active domains.
- [x] Preserve all 20 implemented kits and offered services.
- [x] Define 19 camera-coverage authority surfaces.
- [x] Add the timestamped audit family.
- [ ] Implement the camera envelope and source/artifact/Pages fixtures.

## Complete interaction loop

```txt
menu
  -> settings, save presence, procedural Canvas2D and WebAudio
  -> WebGL CRT presentation
  -> campaign route

campaign
  -> keyboard, pointer and wheel evidence
  -> camera intent and fixed-step simulation
  -> selection, construction, orders, waves, combat and outcomes
  -> world, HUD, controls, minimap and overlays
  -> CRT presentation

camera path
  -> keyboard, middle-pan, wheel, focus or public-host mutation
  -> camera center/zoom changes
  -> independent x/z center clamp
  -> no circular or visible-footprint policy result
  -> source frame and CRT frame commit
  -> no FirstCameraBoundsFrameAck
```

## Inventory

```txt
implemented source-backed kits: 20
planned camera-coverage authority surfaces: 19
```

## Required parent domain

`phantom-command-campaign-camera-coverage-bounds-authority-domain`

## Read this pass first

```txt
.agent/trackers/2026-07-17T11-39-49-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-17T11-39-49-04-00.md
.agent/architecture-audit/2026-07-17T11-39-49-04-00-campaign-camera-coverage-bounds-dsk-map.md
.agent/render-audit/2026-07-17T11-39-49-04-00-square-center-clamp-visible-coverage-gap.md
.agent/gameplay-audit/2026-07-17T11-39-49-04-00-camera-coverage-gameplay-loop.md
.agent/interaction-audit/2026-07-17T11-39-49-04-00-camera-intent-boundary-result-map.md
.agent/camera-bounds-audit/2026-07-17T11-39-49-04-00-visible-footprint-envelope-contract.md
.agent/deploy-audit/2026-07-17T11-39-49-04-00-camera-bounds-browser-fixture-gate.md
.agent/central-sync-audit/2026-07-17T11-39-49-04-00-oldest-selection-camera-bounds-reconciliation.md
```

## Retained authorities

Campaign input-region arbitration, middle-pan anchor convergence, marquee geometry, wheel zoom, motion preference, campaign audio, pointer capture/cancellation, pointer feedback, menu audio lifecycle, diagnostics, device coverage, render order, pause input, terminal settlement, startup readiness, settings adoption, victory persistence, route retirement, fixed-step scheduling, WebGL recovery, accessibility, combat modifiers, campaign bootstrap, keyboard commands and broad spatial input remain separate retained authorities.