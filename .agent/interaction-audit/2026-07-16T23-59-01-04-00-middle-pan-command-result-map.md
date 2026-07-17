# Interaction Audit — Middle-Pan Command/Result Map

**Timestamp:** `2026-07-16T23-59-01-04-00`  
**Status:** `isometric-middle-pan-anchor-convergence-authority-audited`

## Current evidence path

```txt
pointerdown(button=1)
  -> middle=true
  -> last source x/y

pointermove while middle
  -> direct camera mutation

pointerup(button=1) or blur
  -> middle=false
```

No typed command, result, idempotency key, revision guard or frame receipt exists.

## Required commands

### `MiddlePanAdmissionCommand`

```txt
documentRevision
routeRevision
canvasRevision
sourceViewportRevision
pointerId
button
panGeneration
cameraRevision
zoomRevision
sourceStart
```

### `MiddlePanProjectionCommand`

```txt
panGeneration
expectedCameraRevision
sourceCurrent
sourceDelta
grabbedWorldAnchor
frameRevision
```

## Required results

### `MiddlePanAdmissionResult`

```txt
accepted | rejected | stale | outside | cancelled
panGeneration
cameraSnapshot
grabbedWorldAnchor
```

### `MiddlePanResult`

```txt
accepted | unchanged | clamped | stale | cancelled | rejected
previousCamera
requestedCamera
settledCamera
sourceAnchorError
generation and revision bindings
```

### Frame receipts

```txt
FirstMiddlePanFrameAck
PanAnchorConvergenceAck
```

## Cancellation

Pointer cancel, blur, route exit, canvas retirement, pointer identity change and stale camera generation must terminate the active pan exactly once and reject later movement evidence.