# Interaction Audit — Marquee Selection Command and Result Map

**Timestamp:** `2026-07-16T17-40-04-04-00`  
**Status:** `isometric-marquee-selection-geometry-authority-audited`

## Plan ledger

**Goal:** convert mutable pointer state into explicit selection commands, terminal results and frame acknowledgements.

- [x] Map current browser evidence.
- [x] Define admission and cancellation states.
- [x] Define selection and commit results.
- [x] Define visible-frame acknowledgement.
- [ ] Implement command routing and fixtures.

## Command map

```txt
PointerDragStartEvidence
  -> MarqueeDragAdmissionCommand
  -> accepted | outside | blocked | invalid | retired

PointerDragMoveEvidence
  -> MarqueeDragUpdateCommand
  -> updated | unchanged | stale | cancelled

PointerDragEndEvidence
  -> MarqueeSelectionCommand
  -> click | marquee | cancelled | stale | invalid
```

## Result map

```txt
MarqueeSelectionResult
  status
  dragGeneration
  sourceRectangle
  cameraRevision
  candidateUnitIds
  acceptedUnitIds
  selectionMode

SelectionCommitResult
  status
  previousSelectionRevision
  nextSelectionRevision
  selectedUnitIds

FirstMarqueeSelectionFrameAck
  selectionRevision
  frameRevision
  visibleSelectedUnitIds
```

## Rejection rules

- Reject completion from a retired pointer or route generation.
- Reject completion if the camera changed and policy requires a frozen camera.
- Reject outside-source evidence.
- Reject duplicate completion after terminal settlement.
- Settle an empty rectangle with an explicit empty-selection result.
- Preserve click selection through a declared threshold.

## Validation boundary

No browser handler, command bus, selected-state store or frame observer was implemented.
