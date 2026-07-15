# Render Frame Command Result Map

**Timestamp:** `2026-07-14T23-38-29-04-00`

## Summary

Rendering is currently an untyped direct call over mutable campaign state. There is no command identity, render-plan result, draw receipt or visible-frame acknowledgement that can prove the sanctum and moving objects used one ordering policy.

## Plan ledger

**Goal:** make frame preparation and adoption inspectable without moving gameplay authority into the renderer.

- [x] Identify current direct-call boundary.
- [x] Define command identity and input revisions.
- [x] Define accepted plan and draw result.
- [x] Define stale-frame rejection and visible-frame acknowledgement.
- [ ] Implement the command/result surfaces.

## Current interaction

```txt
frame()
  -> update mutable campaign state
  -> render()
  -> drawWorld() reads live state
  -> drawUI() reads live state
  -> crt.render() uploads and presents
```

## Required interaction

```txt
IsometricRenderFrameCommand
  commandId
  frameId
  simulationRevision
  cameraRevision
  viewportRevision
  renderPolicyRevision

PrepareIsometricRenderPlanResult
  accepted or rejected
  planFingerprint
  orderedItemIds
  layer boundaries
  rejection reason

ExecuteCanvasFrameResult
  sourceCanvasRevision
  draw receipts
  skipped or missing items
  planFingerprint

FirstVisibleDepthOrderedFrameAck
  visibleCanvasRevision
  sourceCanvasRevision
  planFingerprint
  timestamp
```

## Admission rules

```txt
reject stale simulation revision
reject stale camera or viewport revision
reject duplicate FrameId
reject items without stable identity
reject world items without depth classification
reject hidden class-order fallbacks
preserve the last accepted visible frame when preparation fails
```

## Public readback

A future diagnostic surface should expose immutable frame metadata only. It should not expose mutable campaign state or allow callers to rewrite render order directly.
