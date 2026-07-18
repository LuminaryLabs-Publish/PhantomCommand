# PhantomCommand Agent State

**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Latest audit:** `2026-07-17T23-41-44-04-00`  
**Status:** `menu-pointer-target-admission-authority-audited`

## Summary

PhantomCommand combines a procedural Canvas2D menu, WebAudio, a fixed-step isometric campaign, Canvas2D world/HUD/minimap rendering, WebGL CRT presentation, persistence, static validation, build and Pages delivery.

The current audit isolates menu pointer-target admission. Main-menu and settings-panel hit-test helpers correctly return `-1` for background or outside-source presses, but the pointer-down handler still activates the retained selected row. Keyboard activation is intentionally selection-based; pointer activation currently uses selection state even when no pointer target exists.

## Intent

Make one pointer-target authority classify CRT containment, visible layer, row identity and enablement before pointer input can navigate, mutate settings or dismiss a panel.

## Checklist

- [x] Compare the complete 11-repository Publish inventory with central tracking.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible ledgers, root `.agent` states and synchronized heads.
- [x] Select only PhantomCommand through the oldest documented-selection rule.
- [x] Identify the complete interaction loop and active domains.
- [x] Preserve all 20 implemented kits and offered services.
- [x] Define 17 menu pointer-target product/runtime/fixture surfaces plus central reconciliation.
- [x] Add the timestamped audit family.
- [ ] Implement pointer-target admission and source/artifact/Pages fixtures.

## Complete interaction loop

```txt
menu
  -> restore settings and save presence
  -> procedural Canvas2D and WebAudio
  -> WebGL CRT presentation
  -> keyboard selection or pointer evidence
  -> main action, settings mutation, panel change or campaign route

pointer path today
  -> screenToSource
  -> menuHitIndex or panelHitIndex may return -1
  -> selected row remains retained
  -> activateMain or activatePanel still executes
  -> no MenuPointerTargetResult or FirstMenuPointerActionFrameAck

campaign
  -> fixed-step selection, construction, orders, waves, combat and outcomes
  -> Canvas2D source render and CRT presentation
```

## Inventory

```txt
implemented source-backed kits: 20
planned menu pointer-target authority surfaces: 17
```

## Required parent domain

`phantom-command-menu-pointer-target-admission-authority-domain`

## Read this pass first

```txt
.agent/trackers/2026-07-17T23-41-44-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-17T23-41-44-04-00.md
.agent/architecture-audit/2026-07-17T23-41-44-04-00-menu-pointer-target-admission-dsk-map.md
.agent/render-audit/2026-07-17T23-41-44-04-00-background-click-visible-action-gap.md
.agent/gameplay-audit/2026-07-17T23-41-44-04-00-menu-pointer-action-loop.md
.agent/interaction-audit/2026-07-17T23-41-44-04-00-pointer-target-command-result-map.md
.agent/menu-input-audit/2026-07-17T23-41-44-04-00-background-and-letterbox-admission-contract.md
.agent/deploy-audit/2026-07-17T23-41-44-04-00-menu-pointer-browser-fixture-gate.md
.agent/central-sync-audit/2026-07-17T23-41-44-04-00-oldest-selection-menu-pointer-reconciliation.md
```

## Retained authorities

Camera coverage, campaign input-region arbitration, middle-pan anchor convergence, marquee geometry, wheel zoom, motion preference, campaign audio, pointer capture/cancellation, pointer feedback, menu audio lifecycle, diagnostics, device coverage, render order, pause input, terminal settlement, startup readiness, settings adoption, victory persistence, route retirement, fixed-step scheduling, WebGL recovery, accessibility, combat modifiers, campaign bootstrap, keyboard commands and broad spatial input remain separate retained authorities.