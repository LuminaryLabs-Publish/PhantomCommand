# Pointer Affordance Command and Result Map

**Timestamp:** `2026-07-15T18-39-30-04-00`

## Summary

The current event handlers mutate campaign and camera state directly. This map inserts an immutable pointer-feedback result before those existing command owners without redefining their gameplay semantics.

## Plan ledger

**Goal:** make the visible candidate, committed command and resulting frame cite one coherent revision chain.

- [x] Map pointer samples to current direct mutations.
- [x] Define feedback and command result boundaries.
- [x] Define stale, outside and miss outcomes.
- [ ] Implement the result chain.
- [ ] Execute candidate/commit/frame convergence fixtures.

## Result chain

```txt
PointerEvent
  -> PointerSampleCommand
  -> PointerProjectionResult
  -> PointerHoverQuery
  -> PointerFeedbackResult
  -> PointerFeedbackFrameResult
  -> FirstPointerFeedbackFrameAck

accepted button or wheel transition
  -> CampaignPointerCommand citing PointerFeedbackRevision
  -> SelectionResult | BuildResult | OrderResult | CameraGestureResult
  -> CampaignStateRevision or CameraRevision
  -> matching world and feedback frame acknowledgement
```

## Feedback result statuses

```txt
accepted-ally-candidate
accepted-pad-candidate
accepted-enemy-candidate
accepted-ground-candidate
accepted-drag-candidates
outside-source
no-candidate
stale-surface
stale-projection
stale-camera
stale-entity-set
stale-pad-set
retired-route
unsupported-device-mode
```

## Continuity rules

```txt
point selection must not silently substitute a different candidate after feedback
build must revalidate occupancy affordability tower type and pad revision
order must revalidate enemy identity or ground point
wheel zoom must cite the visible anchor and camera revision
middle pan must cite pointer sequence and surface generation
drag commit must cite the candidate preview polygon and entity revision
blocking overlays must settle or suppress feedback explicitly
```

## Existing direct paths retained

```txt
selectAt -> selection or selectedPad mutation
build -> souls pad and tower mutation
order -> target or movement mutation
camera gesture handlers -> camera mutation
```

The authority wraps admission and feedback around these paths. It does not require replacing them with a new gameplay model.