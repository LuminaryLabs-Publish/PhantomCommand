# Gameplay Audit: Letterbox Pointer Mutates Campaign Loop

**Timestamp:** `2026-07-12T11-40-50-04-00`

## Summary

Campaign gameplay accepts pointer coordinates even when the CRT projection marks them outside the visible source frame. Letterbox clicks and gestures can therefore select, order, pan or zoom the campaign despite targeting no visible world pixel.

## Plan ledger

**Goal:** require current visible-surface admission before any pointer-driven campaign or camera mutation.

- [x] Trace left, right, middle and wheel paths.
- [x] Trace drag start and drag completion.
- [x] Identify all mutations reachable from `inside: false`.
- [x] Define typed no-op and stale results.
- [ ] Implement and execute fixtures.

## Failure loops

```txt
right click in letterbox
  -> screenToSource returns inside=false and an out-of-range x/y
  -> screenToWorld converts that x/y
  -> order() mutates selected units and creates an effect

left click or drag in letterbox
  -> drag state starts
  -> pointerup calls selectAt() or rectangle selection
  -> selection or selectedPad may change

middle drag in letterbox
  -> camera x/z changes from out-of-range source deltas

wheel in letterbox
  -> before/after world points are derived
  -> targetZoom and camera x/z change
```

## Gameplay risks

```txt
orders can target locations never shown on screen
selection can change from non-world pixels
build-pad selection can be driven from invalid projection
camera can jump when wheel or pan begins in margins
pointer gestures can cross the surface boundary without cancellation
recorded state has no command or projection receipt
```

## Required policy

```txt
OutsideSurface -> typed no-op
StaleDisplay -> typed rejection
InvalidInverseProjection -> typed rejection
StaleCamera -> recompute or reject by policy
GestureLeavesSurface -> cancel or clamp explicitly, never silently continue
Applied -> exactly one state/camera revision and one visible-frame receipt
```

## Fixture set

```txt
right-click left/right letterbox no-op
right-click top/bottom letterbox no-op
left-click letterbox no selection
rectangle drag starting outside no-op
rectangle drag ending outside explicit cancellation policy
middle pan outside no-op
wheel outside no-op
CRT curved-edge target parity
stale camera revision rejection
```

No gameplay source changed.