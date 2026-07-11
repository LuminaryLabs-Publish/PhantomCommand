# Simulation Tick and Render Frame Correlation Gap

**Timestamp:** `2026-07-11T11-51-06-04-00`

## Summary

A PhantomCommand frame is not an immutable projection of one committed campaign tick. Rendering reads live state after zero or more updates, combines it with variable-step camera state and uses independent CRT wall-clock time without a frame receipt.

## Plan ledger

**Goal:** make every visible frame prove the exact committed state and presentation revisions consumed by all render surfaces.

- [x] Trace world, HUD, minimap, overlay and CRT rendering.
- [x] Identify live-state and variable-camera reads.
- [x] Identify missing frame identity and consumer acknowledgements.
- [ ] Implement immutable render snapshots and frame receipts.

## Current frame composition

```txt
simulation state
  -> zero to three 1/60 updates
camera
  -> variable dt integration
pointer/drag
  -> browser event state
CRT time
  -> performance.now()/1000
render
  -> live world + HUD + minimap + overlay + CRT
```

## Gaps

```txt
no render snapshot boundary
no simulation tick ID
no state fingerprint
no applied command cursor
no camera revision
no projection revision
no frame ID
no consumer acknowledgement
no stale-frame rejection
```

The world, HUD, minimap and overlay are drawn sequentially from mutable objects. A future command or callback inserted between consumers could create mixed-state output. The CRT renderer then samples the source canvas with its own presentation time, which is not correlated with simulation time.

## Required render transaction

```txt
CommittedTickReceipt
  -> extract immutable RenderSnapshot
  -> attach camera/projection descriptors
  -> draw world
  -> draw HUD
  -> draw minimap
  -> draw overlay
  -> upload source texture
  -> draw CRT output
  -> publish consumer acknowledgements
  -> commit CommittedFrameReceipt
```

## Required receipt

```txt
frameId
tickId
stateFingerprint
commandCursor
cameraRevision
projectionRevision
presentationTime
worldAck
hudAck
minimapAck
overlayAck
crtUploadAck
crtDrawAck
```

## Required fixture

Run the same command journal under several frame schedules and assert that each frame receipt references a valid committed tick, all consumers share one fingerprint and no stale camera/projection revision is accepted.