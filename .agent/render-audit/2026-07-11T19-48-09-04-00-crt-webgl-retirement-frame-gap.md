# Render Audit: CRT WebGL Retirement and Frame Gap

**Timestamp:** `2026-07-11T19-48-09-04-00`

## Summary

The shared CRT renderer allocates WebGL shaders, a program, buffer and texture, but exposes no disposal service. Both menu and campaign RAF chains call it indefinitely and publish no final-frame or resource-retirement receipt.

## Plan ledger

**Goal:** define exact render ownership and proof required for stop, disposal and replacement.

- [x] Inspect CRT allocation and return surface.
- [x] Inspect both render loops.
- [x] Identify missing retirement and frame identities.
- [ ] Add disposal and frame fixtures during implementation.

## Current gap

```txt
createCrtRenderer()
  -> compile vertex shader
  -> compile fragment shader
  -> create and link program
  -> create position buffer
  -> create scene texture
  -> return render, resize, screenToSource and raw gl

missing:
  dispose()
  resource generation
  context-loss result
  final submitted frame receipt
  retirement receipt
```

## Required proof

```txt
stop prevents further texSubImage2D and drawArrays calls
dispose deletes texture, buffer, program and shaders exactly once
old-generation render rejects after restart
first replacement frame cites new session and renderer generation
20 start/dispose cycles keep live WebGL resource counts stable
```
