# Render Audit: WebGL Resource Retirement and Context Gap

**Timestamp:** `2026-07-12T11-48-43-04-00`

## Summary

The CRT renderer allocates a WebGL context, two shaders, one program, one buffer and one texture, then exposes rendering and the raw context without a resource inventory, disposal service, context generation or context-loss handling.

## Plan ledger

**Goal:** make every visible CRT frame cite an admitted WebGL context generation and ensure every owned GPU resource is recoverable or retired exactly once.

- [x] Inspect shader compile/link ownership.
- [x] Inspect program, buffer and texture allocation.
- [x] Inspect render, resize and source upload paths.
- [x] Confirm no disposal or context-loss listeners exist.
- [x] Define resource inventory, restoration and frame-proof requirements.
- [ ] Implement and execute browser fixtures.

## Current allocation

```txt
createCrtRenderer
  -> acquire WebGL context
  -> compile vertex shader
  -> compile fragment shader
  -> link program
  -> query attribute and uniform locations
  -> allocate fullscreen vertex buffer
  -> allocate source texture
  -> return render, resize, screenToSource and raw gl
```

## Gaps

```txt
shader handles retained for successful deletion: no
program deletion service: no
buffer deletion service: no
texture deletion service: no
aggregate resource inventory: no
link-failure rollback across all resources: no
webglcontextlost listener: no
preventDefault loss policy: no
webglcontextrestored listener: no
context generation: no
restored resource rebuild transaction: no
frame result with context/resource generation: no
```

The shader compiler deletes a shader only when compilation fails. Successful shaders are attached to the program but never explicitly deleted. A link failure throws without an aggregate rollback receipt. Menu and campaign rendering continue to call `render()` through recursive RAF ownership, with no typed result when the context is lost.

## Required frame contract

```txt
CrtFrameResult
  status: Presented | SkippedContextLost | RejectedStaleContext | FailedUpload | FailedDraw
  runtimeSessionId
  runtimeGeneration
  webglContextGeneration
  resourceLedgerRevision
  sourceFrameRevision
  displayFrameRevision
  reason
```

## Required retirement order

```txt
stop new frame admission
  -> cancel RAF lease
  -> detach context listeners
  -> delete texture
  -> delete buffer
  -> delete program
  -> delete retained shaders when owned
  -> clear resource ledger
  -> revoke raw context exposure
  -> publish retirement result
```

## Required restoration order

```txt
context restored event
  -> verify current runtime session
  -> allocate new context generation
  -> compile/link detached program candidate
  -> allocate buffer and texture candidates
  -> validate locations and upload path
  -> atomically install candidate resource ledger
  -> present first restored frame
  -> publish first-frame receipt
```

## Proof gate

```txt
forced context loss stops draw admission
stale pre-loss callbacks cannot draw
restoration creates a higher context generation
resource counts return to one active set after restore
route retirement leaves zero owned WebGL resources
first restored frame cites the restored context generation
```

Documentation only. No renderer behavior changed.