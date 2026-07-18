# Architecture Audit — Menu Pointer Target Admission DSK Map

**Timestamp:** `2026-07-17T23-41-44-04-00`  
**Status:** `menu-pointer-target-admission-authority-audited`

## Summary

PhantomCommand already separates CRT coordinate mapping, menu hit-test helpers, menu state, panel state, action functions and rendering. The missing boundary is the admitted result between hit testing and action execution. Pointer and keyboard producers currently converge too early: a pointer miss still consumes the keyboard-style selected row.

## Current DSK/domain map

```txt
phantom-command browser product
├─ menu presentation domain
│  ├─ graveyard-art-kit
│  ├─ crt-renderer-kit
│  └─ menu-route-kit
├─ menu state and service domain
│  ├─ menu-settings-persistence-kit
│  ├─ menu-save-presence-kit
│  └─ menu-audio-kit
├─ campaign domain
│  ├─ campaign-route-shell-kit
│  ├─ pixel-campaign-runtime-kit
│  ├─ fixed-step-campaign-simulation-kit
│  ├─ pixel-campaign-render-kit
│  └─ legacy-gamehost-diagnostics-kit
├─ construct domain
│  ├─ construct-spiral-intro-kit
│  ├─ construct-spiral-schedule-kit
│  ├─ construct-piece-id-kit
│  ├─ construct-piece-state-kit
│  └─ construct-sequence-update-kit
└─ delivery and proof domain
   ├─ menu-static-check-kit
   ├─ campaign-static-check-kit
   ├─ static-build-copy-kit
   └─ pages-deploy-kit
```

## Implemented services

| Kit | Services |
|---|---|
| `crt-renderer-kit` | WebGL context, shaders, source upload, resize, CRT effects, contain mapping and screen-to-source mapping. |
| `graveyard-art-kit` | Procedural graveyard, fog, twinkle, characters, pointer parallax, panels and selection pulse. |
| `menu-route-kit` | Selection, panel state, enabled rows, transitions and navigation. |
| `menu-settings-persistence-kit` | Settings defaults, parsing, mutation and storage. |
| `menu-save-presence-kit` | Save-key probing and Continue availability. |
| `menu-audio-kit` | AudioContext, ambience graph, generated wind, UI tones and retirement. |
| `campaign-route-shell-kit` | Campaign document, application canvas, semantic fallback and bootstrap. |
| `pixel-campaign-runtime-kit` | Arena, camera, input, entities, construction, selection and orders. |
| `fixed-step-campaign-simulation-kit` | Tick accumulation, spawning, movement, combat, rewards and outcomes. |
| `pixel-campaign-render-kit` | World, entities, HUD, minimap, selection and overlays. |
| `legacy-gamehost-diagnostics-kit` | Readback and controlled host mutations. |
| `menu-static-check-kit` | Menu entry and source-marker checks. |
| `campaign-static-check-kit` | Campaign entry and source-marker checks. |
| `static-build-copy-kit` | Static artifact assembly. |
| `pages-deploy-kit` | Pages artifact upload and deployment. |
| `construct-spiral-intro-kit` | Opening choreography. |
| `construct-spiral-schedule-kit` | Timed construction schedule. |
| `construct-piece-id-kit` | Stable piece identity. |
| `construct-piece-state-kit` | Piece state and visibility. |
| `construct-sequence-update-kit` | Sequence advancement and settlement. |

## Missing authority

```txt
phantom-command-menu-pointer-target-admission-authority-domain
├─ crt-source-pointer-evidence-kit
├─ menu-main-hit-region-kit
├─ menu-panel-hit-region-kit
├─ menu-visible-layer-order-kit
├─ menu-item-enablement-admission-kit
├─ menu-background-click-rejection-kit
├─ menu-stale-selection-pointer-rejection-kit
├─ keyboard-selection-activation-separation-kit
├─ menu-pointer-target-result-kit
├─ menu-action-admission-kit
├─ menu-action-result-kit
├─ first-menu-pointer-action-frame-ack-kit
├─ menu-pointer-browser-fixture-kit
├─ built-artifact-menu-pointer-parity-kit
├─ pages-menu-pointer-parity-kit
└─ menu-pointer-static-policy-check-kit
```

## Command/result contract

```txt
MenuPointerEvidenceCommand
  inputs:
    routeGeneration
    sourceMappingGeneration
    panelGeneration
    rowLayoutGeneration
    pointer coordinates

MenuPointerTargetAdmissionCommand
  output MenuPointerTargetResult:
    outside-source
    background
    disabled-item
    main-item(actionId)
    settings-item(settingId)
    dismiss-target

MenuActionAdmissionCommand
  consumes only accepted target results
  preserves keyboard activation as a separate explicit producer

MenuActionResult
  records navigation, setting mutation, panel change or rejection

FirstMenuPointerActionFrameAck
  proves the visible frame belongs to the accepted action generation
```

## Smallest implementation cut

Keep the existing menu and panel hit-test helpers. Add one function that returns a typed target, and make pointer-down return on `outside-source`, `background` and `disabled-item`. Do not route pointer misses through `menu.selected` or `state.panel.selected`. Keyboard selection activation can remain unchanged.

## Boundary

This is architecture documentation only. No DSK, runtime API, JavaScript or build behavior was implemented.