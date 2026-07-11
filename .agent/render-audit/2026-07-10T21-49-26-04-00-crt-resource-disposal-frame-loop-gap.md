# PhantomCommand CRT Resource Disposal and Frame Loop Gap

**Timestamp:** `2026-07-10T21-49-26-04-00`

## Render surfaces

```txt
menu source canvas: 480 x 270
campaign source canvas: 640 x 360
shared presentation: WebGL CRT renderer
sampling: nearest
output: full-window canvas with contain mapping
```

## Current allocation path

`createCrtRenderer()` allocates:

```txt
WebGL context
vertex shader
fragment shader
linked program
position buffer
source texture
uniform and attribute locations
```

It returns:

```txt
render
resize
screenToSource
gl
```

It does not return a disposal service.

## Current frame ownership

Both route modules call `requestAnimationFrame(frame)` recursively. Neither stores the returned request ID. The campaign also keeps camera smoothing, the fixed-step accumulator, simulation updates, rendering, and next-frame scheduling in one callback.

## Gaps

```txt
- no retained RAF request ID
- no stopped/disposed guard before rendering or rescheduling
- no cancellation result
- no WebGL texture deletion
- no buffer deletion
- no program deletion
- shader objects are not retained for explicit deletion
- no context-loss or release policy
- no source-canvas release policy
- no render-resource ownership ledger
- no resource counts before and after disposal
- no proof that a remount has one render loop
- no proof that an old session cannot submit after restart
```

## Required render lifecycle services

```txt
retainFrameRequest(sessionId, requestId)
cancelFrameRequest(sessionId, reason)
registerRenderResource(sessionId, type, handle)
releaseRenderResource(sessionId, resourceId)
disposeCrtRenderer(sessionId)
recordRenderLoopState(sessionId, scheduled, running, stopped)
recordFinalRenderSubmission(sessionId, frameId)
```

## Fixture expectations

```txt
mount menu -> one RAF owner, one CRT program, one buffer, one texture
stop menu -> no further frame submissions
restart menu -> old session submits zero frames, new session owns one loop
dispose menu -> renderer resource ledger reaches zero live owned resources
mount campaign -> one RAF owner and one CRT resource set
dispose campaign -> no simulation or render after disposal
double dispose -> one effective release per resource and stable idempotent result
partial renderer failure -> already-created shaders/program/buffer/texture are rolled back
```

## Constraint

Do not replace the CRT renderer or change visual output during lifecycle work. Add ownership and disposal around the existing renderer first.