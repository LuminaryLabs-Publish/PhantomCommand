# CRT Context-Loss Visible-Frame Gap

**Timestamp:** `2026-07-13T05-59-03-04-00`

## Summary

Menu and campaign source canvases can produce valid frames while the final WebGL CRT surface is lost or invalid. The current renderer publishes no context state, draw result or visible-frame acknowledgement, so diagnostics cannot distinguish simulated/drawn source state from actually presented output.

## Plan ledger

**Goal:** bind every visible CRT frame to one source revision, one context generation, one resource generation and one terminal presentation result.

- [x] Trace source-canvas production.
- [x] Trace texture upload and full-screen draw.
- [x] Confirm context/resource revisions are absent.
- [x] Confirm context loss and restore are unhandled.
- [x] Confirm no last-presented or recovered-frame readback exists.
- [ ] Implement typed frame correlation later.

## Current frame chain

```txt
menu/campaign truth
  -> 2D source canvas
  -> gl.texSubImage2D
  -> gl.drawArrays
  -> unknown browser presentation state
```

## Missing frame evidence

```txt
sourceFrameRevision
contextId
contextGeneration
resourceGeneration
uploadResult
drawResult
presentationResult
lastPresentedFrame
fallbackFrameRevision
firstRecoveredFrameAck
```

## Failure states requiring explicit projection

```txt
ContextLost
RestorePending
RestoreRejected
ResourceRebuildFailed
UploadFailed
DrawFailed
Disposed
StaleGeneration
FallbackVisible
RecoveredFrameVisible
```

## Completion rule

A source canvas draw is not proof that pixels reached the display. Completion requires a terminal presentation result and a visible acknowledgement tied to the same source/context/resource revisions.