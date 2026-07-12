# Interaction Audit: Campaign Pointer Command Admission Map

**Timestamp:** `2026-07-12T11-40-50-04-00`

## Summary

Campaign pointer events currently flow directly from DOM listeners into mutable camera and gameplay owners. The campaign has no command identity, phase admission, display generation, camera revision, gesture lease or terminal result.

## Plan ledger

**Goal:** convert each pointer gesture into a typed command that is admitted against current display, camera, runtime and campaign state.

- [x] Map event-to-mutation paths.
- [x] Separate camera commands from gameplay commands.
- [x] Define gesture lifecycle and stale-result policy.
- [x] Define command/result observation.
- [ ] Implement the command boundary.

## Current map

```txt
pointermove
  -> update source point
  -> if middle, mutate camera immediately

pointerdown left
  -> create mutable drag object

pointerup left
  -> selectAt(world point) or direct rectangle assignment

pointerdown right
  -> order(world point)

wheel
  -> mutate targetZoom and camera position
```

## Required map

```txt
DOM event
  -> PointerEventEnvelope
  -> DisplayProjectionResult
  -> CameraBoundWorldProjectionResult
  -> CampaignPointerCommand
  -> admission policy
  -> gameplay or camera owner
  -> CampaignPointerCommandResult
  -> observation and frame receipt
```

## Command policy

| Command | Required admission |
|---|---|
| `SelectPoint` | inside surface, valid inverse projection, active campaign phase, current camera revision |
| `SelectRectangle` | valid drag lease, admitted start and end, current display generation |
| `IssueOrder` | inside surface, selected live units, active phase, valid world projection |
| `BeginPan` | inside surface, current display generation |
| `UpdatePan` | current pan lease and camera revision |
| `EndPan` | current pan lease |
| `ZoomAtPoint` | inside surface, valid world anchor, current camera revision |

## Rejection results

```txt
OutsideSurface
RejectedStaleDisplay
RejectedStaleCamera
RejectedInvalidProjection
RejectedInactivePhase
RejectedNoSelection
CancelledGesture
```

## Observation

Every result should expose command identity, event identity, gesture identity, display generation, camera/state revisions, mutation summary, reason and correlated frame receipt.

No interaction behavior changed.