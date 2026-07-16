# Architecture Audit — Isometric Marquee Selection DSK Map

**Timestamp:** `2026-07-16T17-40-04-04-00`  
**Status:** `isometric-marquee-selection-geometry-authority-audited`

## Plan ledger

**Goal:** place drag evidence, coordinate transforms, membership evaluation, selected-state settlement and visible-frame proof under one explicit domain boundary.

- [x] Map current pointer, camera, transform, selection and render owners.
- [x] Preserve existing campaign and CRT responsibilities.
- [x] Identify the missing geometry and result boundary.
- [x] Define one parent domain and 18 coordinating surfaces.
- [ ] Implement the authority without moving gameplay truth into browser handlers.

## Current ownership

| Surface | Current owner | Current service |
|---|---|---|
| Pointer evidence | `pixel-campaign-runtime-kit` | Direct pointer listeners and mutable input state. |
| Browser-to-source mapping | `crt-renderer-kit` | `screenToSource(clientX, clientY)`. |
| Drag state | `pixel-campaign-runtime-kit` | Source-space origin plus current pointer. |
| Visible rectangle | `pixel-campaign-render-kit` | Normalized source-space stroke rectangle. |
| Source-to-world mapping | `pixel-campaign-runtime-kit` | Isometric inverse using current camera. |
| Membership | `pixel-campaign-runtime-kit` | Two-corner world x/z box filter. |
| Selected truth | campaign state | Array of allied unit IDs. |
| Visible selection | `pixel-campaign-render-kit` | Selection ellipse per selected unit. |
| CRT output | `crt-renderer-kit` | Canvas upload and WebGL presentation. |

## Missing domain boundary

`phantom-command-isometric-marquee-selection-geometry-authority-domain`

```txt
pointer evidence
  -> pointer-drag-evidence-observer-kit
  -> source-viewport-admission-kit
  -> marquee-drag-generation-kit
  -> selection-camera-snapshot-kit
  -> selection-rectangle-normalizer-kit
  -> unit-source-projection-kit
  -> rectangle-membership-evaluator-kit
  -> selection-modifier-policy-kit
  -> marquee-selection-result-kit
  -> selected-state-commit-kit
  -> pixel-campaign-render-kit
  -> first-marquee-selection-frame-ack-kit
```

## Command contract

```txt
MarqueeSelectionCommand {
  documentGeneration
  routeGeneration
  canvasRevision
  sourceViewportRevision
  cameraRevision
  selectionRevision
  dragGeneration
  pointerId
  startSource
  endSource
  shiftModifier
}
```

## Result contract

```txt
MarqueeSelectionResult {
  status
  dragGeneration
  cameraRevision
  sourceRectangle
  candidateUnitIds
  acceptedUnitIds
  rejectedUnitIds
  selectionMode
  nextSelectionRevision
}
```

## Separation rules

- Browser listeners emit drag evidence; they do not own accepted selected truth.
- Camera and source viewport identity must be stable for one admitted gesture.
- Fixed-step combat remains independent of marquee geometry.
- Click selection remains a separate threshold outcome of the same pointer gesture.
- Orders and building consume the committed selected-state revision.
- Pointer capture/cancellation remains responsible for gesture continuity.
- Route retirement rejects stale drag completion.
- CRT presentation acknowledges but does not decide selection membership.

## Validation boundary

Architecture documentation only. No DSK, adapter, runtime path or fixture was implemented.
