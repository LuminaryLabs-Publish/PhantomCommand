# PhantomCommand Agent State

**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Latest audit:** `2026-07-17T06-38-14-04-00`  
**Status:** `campaign-input-region-arbitration-authority-audited`

## Summary

PhantomCommand combines a procedural Canvas2D menu, WebAudio, a fixed-step isometric campaign, Canvas2D world/HUD/minimap rendering, WebGL CRT presentation, persistence, static validation, build and Pages delivery.

The current audit isolates pointer-region ownership. World, HUD, tower controls, minimap and modal overlays share one 640×360 source surface. Campaign pointer handlers preserve source `x`, `y` and `inside`, but click, marquee and right-click order paths do not consume `inside` or classify the topmost visible region before converting evidence through `screenToWorld()`.

## Intent

Make one source-region authority decide whether pointer evidence belongs to the world, HUD, controls, minimap, modal overlay or excluded letterbox space before any world command is admitted.

## Checklist

- [x] Compare the complete 11-repository Publish inventory with central tracking.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible ledgers, root `.agent` states and synchronized heads.
- [x] Select only PhantomCommand through the oldest documented-selection rule.
- [x] Identify the complete interaction loop and active domains.
- [x] Preserve all 20 implemented kits and offered services.
- [x] Define 18 campaign input-region authority surfaces.
- [x] Add the timestamped audit family.
- [ ] Implement region manifests, arbitration and browser/artifact/Pages fixtures.

## Complete interaction loop

```txt
menu
  -> settings, save presence, procedural Canvas2D and WebAudio
  -> WebGL CRT presentation
  -> campaign route

campaign
  -> keyboard, pointer and wheel evidence
  -> camera and fixed-step simulation
  -> selection, construction, orders, waves, combat and outcomes
  -> world, HUD, controls, minimap and modal overlays
  -> CRT presentation

pointer region path
  -> browser point maps to source x/y/inside
  -> no visible-region decision
  -> click, marquee or order resolves through screenToWorld
  -> no typed region result or matching frame acknowledgement
```

## Inventory

```txt
implemented source-backed kits: 20
planned input-region authority surfaces: 18
```

## Required parent domain

`phantom-command-campaign-input-region-arbitration-authority-domain`

## Read this pass first

```txt
.agent/trackers/2026-07-17T06-38-14-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-17T06-38-14-04-00.md
.agent/architecture-audit/2026-07-17T06-38-14-04-00-campaign-input-region-arbitration-dsk-map.md
.agent/render-audit/2026-07-17T06-38-14-04-00-visible-ui-world-command-occlusion-gap.md
.agent/gameplay-audit/2026-07-17T06-38-14-04-00-visible-region-world-command-loop.md
.agent/interaction-audit/2026-07-17T06-38-14-04-00-input-region-command-result-map.md
.agent/input-region-audit/2026-07-17T06-38-14-04-00-source-region-occlusion-contract.md
.agent/deploy-audit/2026-07-17T06-38-14-04-00-input-region-browser-fixture-gate.md
.agent/central-sync-audit/2026-07-17T06-38-14-04-00-oldest-selection-input-region-reconciliation.md
```

## Retained authorities

Middle-pan anchor convergence, marquee geometry, wheel zoom, motion preference, campaign audio, pointer capture/cancellation, pointer feedback, menu audio lifecycle, diagnostics, device coverage, render order, pause input, terminal settlement, startup readiness, settings adoption, victory persistence, route retirement, fixed-step scheduling, WebGL recovery, accessibility, combat modifiers, campaign bootstrap, keyboard commands and broad spatial input remain separate retained authorities.