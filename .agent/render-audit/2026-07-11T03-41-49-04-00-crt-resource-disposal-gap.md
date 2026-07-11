# CRT Resource Disposal Gap

**Timestamp:** `2026-07-11T03-41-49-04-00`

## Summary

The CRT renderer correctly owns its WebGL drawing operations but does not expose lifecycle ownership. Program, buffer and texture objects remain alive until browser context destruction, and callers cannot prove that rendering stopped before route transition.

## Plan ledger

**Goal:** preserve the exact CRT visual output while adding explicit preparation, render admission, resource deletion and disposal proof.

- [x] Trace WebGL allocations.
- [x] Trace per-frame upload and draw.
- [x] Identify escaped handles and missing deletion.
- [x] Define resource-owner result shape.
- [ ] Implement disposal and fixtures.

## Current allocations

```txt
WebGLRenderingContext
vertex shader
fragment shader
program
position attribute
uniform locations
vertex buffer
source texture
```

## Current frame consumption

```txt
resize output canvas
use program
bind buffer
enable and configure attribute
bind texture
upload complete source canvas with texSubImage2D
set uniforms
draw six vertices
```

## Gaps

```txt
createProgram does not retain or delete shader objects after linking
renderer return value exposes raw gl
no disposed flag
no dispose method
no deleteTexture
no deleteBuffer
no deleteProgram
no optional WEBGL_lose_context release policy
no typed render result
no frame ID or session ID
no render-after-dispose rejection
no resource counters
```

## Required CRT resource owner

```txt
createCrtRenderer(...)
  -> {
       render(frame): CrtRenderResult,
       resize(): CrtResizeResult,
       screenToSource(...): ProjectionResult,
       dispose(reason): CrtDisposeResult,
       getState(): CrtLifecycleSnapshot
     }
```

Result fields:

```txt
sessionId
rendererId
frameId
status
reason
sourceWidth
sourceHeight
outputWidth
outputHeight
uploaded
drawn
disposed
resourceCounts
```

## Disposal order

```txt
reject new frame admission
unbind texture and buffer where useful
delete texture
delete buffer
delete program
delete retained shaders if not already deleted after link
mark disposed
publish exactly-once result
```

## Fixtures

```txt
successful allocation and draw
shader compile failure rollback
program link failure rollback
texture/buffer allocation failure rollback
dispose before first render
dispose after many renders
double dispose
render after dispose
resize after dispose
two renderer mount/dispose cycles
resource create/delete parity
```
