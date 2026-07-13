# Frame, Step and Render Admission Map

**Timestamp:** `2026-07-13T11-41-10-04-00`

## Summary

Frame delivery, input mutation, camera motion, fixed-step updates and rendering currently meet through shared mutable objects. A scheduler authority must admit each phase under one generation and reject stale callbacks, commands and presentation work.

## Plan ledger

**Goal:** map every interaction entering or leaving the frame scheduler and assign a typed admission result.

- [x] Map RAF ingress.
- [x] Map keyboard, pointer, wheel, blur and GameHost ingress.
- [x] Map camera and simulation mutation.
- [x] Map source-canvas and CRT egress.
- [x] Define stale, superseded, paused and failed outcomes.
- [ ] Implement command identities and fixtures later.

## Admission map

```txt
RAF callback
  -> validate route and scheduler generation
  -> admit WallTimeSample

browser input
  -> update bounded input candidate
  -> consume only at an admitted frame/step boundary

GameHost command
  -> bind command ID and expected scheduler/simulation revision
  -> accept, reject, stale, duplicate or retired

camera update
  -> consume the admitted wall-time sample
  -> publish CameraFrameState

simulation drain
  -> consume accumulator and fixed-step budget
  -> publish FixedStepDrainResult

render preparation
  -> bind camera and previous/current simulation revisions
  -> publish CampaignPresentationFrame

Canvas2D projection
  -> return Prepared, Failed, Stale or Cancelled

CRT projection
  -> return Presented, ContextUnavailable, Failed, Stale or Cancelled

frame commit
  -> return Complete, Partial, Failed, Superseded or Retired
```

## Stale work

```txt
callback from predecessor route generation
input command targeting predecessor simulation revision
visibility-resume callback from predecessor scheduler generation
render request for a superseded presentation frame
CRT result from a retired context/resource generation
```

Stale work must produce zero campaign mutation and zero visible-completion claim.

## Public diagnostics

`window.GameHost` should expose detached scheduler, simulation and presentation receipts. It should not expose raw mutable state or unversioned `startWave`, `build` and `setZoom` mutations as proof of committed completion.

## Required first-frame sequence

```txt
Accepted CampaignFrameCommand
  -> Accepted FixedStepDrainResult
  -> Accepted CampaignPresentationFrame
  -> Complete FrameCommitResult
  -> matching VisibleFrameAck
```

No earlier phase may report that the frame is visibly complete.