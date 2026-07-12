# PhantomCommand Pointer Projection Command Admission Map

**Timestamp:** `2026-07-12T01-20-00-04-00`

## Summary

Pointer observations are converted directly into menu or campaign mutations without a typed mapping result, projection revision or stale-result check. Menu hit tests honor the mapper's `inside` flag, while campaign handlers ignore it.

## Plan ledger

**Goal:** route all pointer-driven actions through one settings-aware projection result and explicit command admission boundary.

- [x] Map menu pointer move and down.
- [x] Map campaign pointer move, down, up and wheel.
- [x] Compare inside/outside behavior.
- [x] Define result and rejection classes.
- [x] Define route-specific adapters without duplicating authority.
- [ ] Implement and test the admission path.

## Current ingress

```txt
menu pointermove
  -> screenToSource
  -> menuHitIndex/panelHitIndex
  -> selection mutation

menu pointerdown
  -> screenToSource
  -> menuHitIndex/panelHitIndex
  -> activateMain/activatePanel

campaign pointermove
  -> screenToSource
  -> pointer owner mutation
  -> optional middle-pan camera mutation

campaign pointerdown
  -> screenToSource
  -> drag start, order or middle-pan start

campaign pointerup
  -> screenToSource
  -> click selection or drag-region selection

campaign wheel
  -> screenToSource
  -> before/after world anchor
  -> zoom and camera mutation
```

## Missing admission fields

```txt
pointerSampleId
routeId
runtimeSessionId
outputSurfaceRevision
sourceSurfaceRevision
projectionId
projectionRevision
crtSettingsRevision
visibleFrameId
mappingStatus
semanticSamplePolicy
sourcePointFingerprint
cameraRevision
```

## Required mapping results

```txt
MAPPED_INSIDE_VISIBLE_SOURCE
REJECTED_OUTSIDE_CANVAS
REJECTED_LETTERBOX_OR_PILLARBOX
REJECTED_CURVED_BLACK_REGION
REJECTED_ZERO_AREA_SURFACE
REJECTED_STALE_SURFACE
REJECTED_STALE_SETTINGS
REJECTED_STALE_FRAME
REJECTED_NON_FINITE_COORDINATE
```

## Route adapters

```txt
menu adapter
  -> consumes admitted source point
  -> resolves canonical menu/panel action
  -> returns typed activation result

campaign adapter
  -> consumes admitted source point/region
  -> derives world target under cited camera revision
  -> submits selection/order/pan/zoom command
  -> returns typed command result
```

## Invariants

```txt
no rejected mapping mutates selection, menu, camera or gameplay
menu and campaign share projection authority
route adapters cannot alter projection math
pointerdown uses its own event sample
resize or CRT-toggle invalidates predecessor mapping results
action result cites mapping result and visible frame
```

## Boundary

No listener or command behavior changed. This file records the required interaction boundary only.