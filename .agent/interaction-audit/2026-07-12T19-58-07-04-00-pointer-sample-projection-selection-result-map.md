# Pointer Sample, Projection and Selection Result Map

**Timestamp:** `2026-07-12T19-58-07-04-00`

## Summary

The current interaction path passes raw projected coordinates directly into campaign helpers. This map defines the missing identities and terminal results between DOM evidence, geometric projection and gameplay mutation.

## Plan ledger

**Goal:** replace raw pointer-coordinate flow with a typed result chain that rejects outside, stale, duplicate or mismatched evidence before mutation.

- [x] Map every campaign pointer ingress.
- [x] Map current projection and mutation points.
- [x] Define required identities and results.
- [x] Define rejection reasons.
- [ ] Implement after Campaign Action Result Authority.

## Current map

```txt
PointerEvent
  -> setPointer
  -> screenToSource
  -> raw {x,y,inside}
  -> inside ignored
  -> screenToWorld or raw source delta
  -> selectAt / order / camera mutation
  -> undefined return
  -> no result journal
```

## Required map

```txt
PointerEvent
  -> PointerSample {
       sampleId, sequence, pointerId, pointerType, button,
       clientPoint, surfaceId, surfaceGeneration, focusGeneration
     }
  -> PointerPolicyResult
  -> ViewportProjectionResult
  -> CrtInverseProjectionResult
  -> SourceContainmentResult
  -> WorldProjectionResult
  -> SelectionGestureResult / OrderTargetAdmissionResult / CameraGestureResult
  -> SpatialInputCommand
  -> SpatialInputResult
  -> CampaignActionCommand
  -> CampaignActionResult
  -> VisibleSpatialResultFrameAck
```

## Required rejection reasons

```txt
RejectedWrongSurface
RejectedUnfocused
RejectedNonPrimaryPointer
RejectedUnsupportedButton
RejectedOutsideSource
RejectedPointerMismatch
RejectedCaptureLost
RejectedCancelled
RejectedStaleSurface
RejectedStaleTransform
RejectedStaleCamera
RejectedStaleEntities
RejectedStaleSelection
RejectedDuplicate
RejectedNoHit
RejectedNoEffect
```

Every rejection must prove zero campaign, selection, camera and feedback mutation.

## Selection result shape

```txt
SelectionMembershipResult {
  gestureId
  sourcePolygon
  transformRevision
  cameraRevision
  entityRevision
  consideredEntityIds[]
  selectedEntityIds[]
  rejectedEntityIds[]
  predecessorSelectionRevision
  expectedSuccessorSelectionRevision
}
```

## Order result shape

```txt
OrderTargetAdmissionResult {
  commandId
  sourcePoint
  worldPoint
  transformRevision
  cameraRevision
  selectionRevision
  entityRevision
  targetEntityId?
  moveDestination?
  status
  reason?
}
```

## Observation boundary

Observations must be detached and bounded. They may expose identities, revisions, projection values and terminal statuses, but not mutable campaign owners or raw mutation capabilities.
