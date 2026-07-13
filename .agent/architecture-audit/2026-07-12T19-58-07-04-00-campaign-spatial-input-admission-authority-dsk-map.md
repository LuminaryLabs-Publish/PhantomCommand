# Campaign Spatial Input Admission Authority DSK Map

**Timestamp:** `2026-07-12T19-58-07-04-00`

## Summary

The campaign currently couples DOM pointer events, CRT projection, camera transforms, selection, order targeting and direct state mutation inside one module. The missing parent authority must validate spatial evidence before the existing Campaign Action Result authority admits gameplay mutation.

## Plan ledger

**Goal:** separate input-surface evidence, geometric projection and gameplay action ownership while preserving the existing campaign, renderer and simulation kits.

- [x] Identify existing owners.
- [x] Define the parent authority boundary.
- [x] Define input, projection, selection, order, result and proof services.
- [x] Preserve all 20 implemented kits.
- [x] Keep action mutation under Campaign Action Result Authority.
- [ ] Implement after the command/result prerequisite exists.

## Existing ownership

```txt
crt-renderer-kit
  owns aspect containment, visible CRT transform and source presentation

pixel-campaign-runtime-kit
  owns browser listeners, input state, camera, screen/world transforms,
  point selection, rectangle selection, orders and direct campaign calls

fixed-step-campaign-simulation-kit
  owns deterministic gameplay advancement after accepted mutations

pixel-campaign-render-kit
  owns visible source geometry, HUD, minimap and overlays

legacy-gamehost-diagnostics-kit
  owns public readback and direct mutation capabilities
```

## Required parent domain

```txt
phantom-command-campaign-spatial-input-admission-authority-domain
```

### Owns

```txt
campaign input-surface identity and generation
pointer sample, sequence and gesture identity
primary pointer/button policy
pointer capture, cancellation and terminal lifecycle
viewport and CRT transform revisions
visible-to-source inverse projection
source containment result
source-to-world projection result
selection gesture polygon and membership result
order target evidence
camera gesture result
spatial command/result identity
stale and duplicate rejection
spatial observation and journal
first visible spatial-result frame acknowledgement
```

### Does not own

```txt
campaign action mutation
wave, build, order or selection business policy
fixed-step combat
entity lifecycle
HUD styling
CRT shader implementation
browser persistence
```

Those remain in their existing bounded owners.

## Composition

```txt
DOM PointerEvent
  -> campaign-input-surface-id-kit
  -> campaign-pointer-sample-id-kit
  -> campaign-pointer-sequence-kit
  -> campaign-primary-pointer-policy-kit
  -> campaign-pointer-button-policy-kit
  -> campaign-pointer-capture-kit
  -> campaign-viewport-transform-revision-kit
  -> campaign-crt-transform-revision-kit
  -> campaign-crt-inverse-projection-kit
  -> campaign-source-containment-result-kit
  -> campaign-world-projection-result-kit
  -> campaign-selection-gesture-kit / campaign-order-target-admission-kit / campaign-camera-gesture-result-kit
  -> campaign-spatial-input-command-kit
  -> campaign-spatial-input-result-kit
  -> Campaign Action Result Authority
  -> pixel-campaign-render-kit
  -> campaign-spatial-visible-frame-ack-kit
```

## Candidate kits

```txt
campaign-input-surface-id-kit
campaign-input-surface-generation-kit
campaign-pointer-sample-id-kit
campaign-pointer-sequence-kit
campaign-primary-pointer-policy-kit
campaign-pointer-button-policy-kit
campaign-pointer-capture-kit
campaign-pointer-cancel-kit
campaign-viewport-transform-revision-kit
campaign-crt-transform-revision-kit
campaign-crt-inverse-projection-kit
campaign-source-containment-result-kit
campaign-screen-point-kit
campaign-source-point-kit
campaign-world-point-kit
campaign-world-projection-result-kit
campaign-selection-gesture-kit
campaign-selection-polygon-kit
campaign-selection-membership-result-kit
campaign-order-target-admission-kit
campaign-camera-gesture-result-kit
campaign-spatial-input-command-kit
campaign-spatial-input-result-kit
stale-campaign-input-rejection-kit
duplicate-campaign-input-rejection-kit
campaign-spatial-input-observation-kit
campaign-spatial-input-journal-kit
campaign-spatial-visible-frame-ack-kit
campaign-containment-fixture-kit
campaign-crt-projection-fixture-kit
campaign-drag-selection-geometry-fixture-kit
campaign-pointer-identity-fixture-kit
campaign-pages-spatial-input-smoke-kit
```

## Domain service contract

```txt
admitPointerSample(sample, expectedSurfaceGeneration, expectedTransformRevision)
  -> SourceContainmentResult

projectVisiblePoint(sample, containment, cameraRevision)
  -> WorldProjectionResult

beginSelectionGesture(pointerIdentity, sourcePoint, revisions)
  -> SelectionGestureResult

updateSelectionGesture(pointerIdentity, sourcePoint, revisions)
  -> SelectionGestureResult

completeSelectionGesture(pointerIdentity, sourcePoint, entityRevision)
  -> SelectionMembershipResult

admitOrderTarget(pointerIdentity, worldPoint, selectionRevision, entityRevision)
  -> OrderTargetAdmissionResult

applyCameraGesture(pointerIdentity, delta, cameraRevision)
  -> CameraGestureResult

observeSpatialInput()
  -> detached bounded snapshot
```

## Required invariants

```txt
outside-source evidence cannot reach gameplay mutation
visible and logical geometry use the same transform revision
one pointer owns one active gesture
cancel and capture loss terminate the gesture exactly once
selection membership is evaluated in visible source space or a complete four-corner polygon
stale camera/entity/selection evidence rejects
spatial result precedes campaign action result
visible frame cites both accepted results
```

## Dependency order

```txt
Runtime Session Resource Lifecycle Authority
  -> Campaign Action Result Authority
  -> Campaign Spatial Input Admission Authority
  -> CRT Display/Input Projection Authority
  -> Fixed-Step Command Scheduling Replay Authority
  -> Public Host Committed Read Model
```
