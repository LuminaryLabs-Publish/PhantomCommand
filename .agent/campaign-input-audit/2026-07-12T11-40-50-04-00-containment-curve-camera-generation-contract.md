# Campaign Input Audit: Containment, Curve and Camera Generation Contract

**Timestamp:** `2026-07-12T11-40-50-04-00`

## Summary

Campaign input needs one immutable projection contract spanning DOM coordinates, contain letterboxing, optional CRT curvature, source coordinates, camera revision and world coordinates. The current implementation exposes these as unrelated mutable calculations.

## Plan ledger

**Goal:** define the exact identities and invariants required for reproducible campaign pointer projection and command admission.

- [x] Define display, camera, event and gesture identities.
- [x] Define projection stages and result types.
- [x] Define boundary-crossing policy.
- [x] Define stale-generation rejection.
- [x] Define observation and fixture requirements.
- [ ] Implement the contract.

## Identity model

```txt
inputSessionId
pointerEventId
gestureId
displayGeneration
sourceFrameRevision
crtSettingsRevision
cameraRevision
campaignStateRevision
frameId
```

## Projection stages

```txt
client coordinates
  -> canvas-local normalized coordinates
  -> contain-frame classification
  -> OutsideSurface or contained display coordinates
  -> inverse CRT curve when enabled
  -> bounded source coordinates
  -> camera-bound sourceToWorld transform
  -> WorldProjectionResult
```

## Result model

```txt
CampaignPointerProjectionResult
  status: Projected | OutsideSurface | InvalidCurveInverse | StaleDisplay | StaleCamera
  pointerEventId
  displayGeneration
  sourceFrameRevision
  crtSettingsRevision
  cameraRevision
  clientX/clientY
  sourceX/sourceY
  worldX/worldZ
  insideSurface
  errorTolerancePx
  reason
```

## Gesture rules

```txt
A drag owns one gestureId.
The drag start must be admitted before updates or completion.
A display-generation change cancels the gesture.
A camera-revision change follows explicit recompute or reject policy.
Leaving the surface follows explicit cancel or clamp policy.
Pointer capture ownership is explicit and released once.
Blur, route exit and runtime stop cancel active gestures.
```

## Invariants

```txt
No campaign mutation from OutsideSurface.
No world projection without a cited camera revision.
No CRT-enabled command without inverse-compatible projection.
No stale display or gesture result can mutate current state.
No command can produce more than one terminal result.
No applied result is complete until a matching frame receipt is observable.
```

## Evidence gate

```txt
analytic contain round-trip
analytic curve/inverse-curve round-trip
pixel-grid projection comparison
letterbox no-op matrix
camera-revision stale fixture
drag boundary fixture
browser screenshots with pointer marker and world marker
Pages parity against the deployment commit
```

No runtime input contract was implemented.