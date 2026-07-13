# Campaign Pointer Selection and Order Loop

**Timestamp:** `2026-07-12T19-58-07-04-00`

## Summary

Campaign pointer input can mutate selection, orders and camera state without proving visible-source containment, pointer ownership or revision-correct geometry. Rectangle selection can omit visibly enclosed allies because its source rectangle is converted into the wrong world region.

## Plan ledger

**Goal:** trace every pointer-driven gameplay path and define the zero-mutation rejection boundary before campaign actions are admitted.

- [x] Trace left click, additive click and selected-pad behavior.
- [x] Trace drag selection.
- [x] Trace right-click order targeting.
- [x] Trace middle-drag camera pan.
- [x] Trace wheel zoom anchoring.
- [x] Record all current mutation points.
- [ ] Route accepted spatial results into typed campaign actions.

## Current gameplay loop

```txt
left down
  -> begin drag at projected source point

left up under five pixels
  -> source-to-world
  -> nearest ally within seven world units
  -> otherwise nearest empty pad within seven world units
  -> mutate selected IDs or selectedPad
  -> second selected-pad click may build

left up over five pixels
  -> inverse-project top-left and bottom-right only
  -> derive world x/z intervals
  -> replace selected IDs from interval test

right down
  -> source-to-world
  -> nearest enemy within eight world units
  -> mutate target or move for every selected unit
  -> add effect

middle drag
  -> use projected source deltas
  -> mutate camera x/z

wheel
  -> source-to-world before and after targetZoom mutation
  -> shift camera to retain pointer anchor
```

## Current mutation risks

```txt
outside visible source can select, order, pan or zoom
another pointer can move or terminate a gesture
pointer cancellation does not clear through a typed terminal result
selection rectangle membership differs from visible marquee
point hit radius is world-fixed rather than visible-geometry-derived
camera and entity revisions are not cited
second-click selection can transition into build without spatial/action correlation
no rejection reason or zero-mutation proof exists
```

## Required gameplay result chain

```txt
SpatialInputResult
  -> SelectionActionCommand / OrderActionCommand / CameraActionCommand
  -> CampaignActionAdmissionResult
  -> CampaignActionResult
  -> updated selection/order/camera read model
  -> visible feedback frame acknowledgement
```

## Required fixtures

```txt
outside-source left/right/middle/wheel inputs mutate nothing
single and additive point selection
all four drag directions
thin, square, wide and tall drag rectangles
multi-pointer down/move/up mismatch
pointercancel and lost capture
order hit, miss and stale target
zoom anchor under CRT on/off
selection-to-build second click correlation
```

## Claim boundary

This audit documents gameplay reachability and mutation risk. It does not claim input admission, selection geometry or action-result authority is implemented.
