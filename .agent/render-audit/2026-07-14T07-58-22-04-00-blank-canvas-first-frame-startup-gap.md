# Blank Canvas and First-Frame Startup Gap

**Timestamp:** `2026-07-14T07-58-22-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`

## Summary

Both routes can fail before producing a visible source or CRT frame. The application has no render-readiness downgrade, DOM fallback, render probe result or first-frame acknowledgement tied to the accepted startup attempt.

## Plan ledger

**Goal:** make visible route readiness depend on a proved source frame and a proved CRT frame, with an independently visible fallback when either cannot be produced.

- [x] Trace source-canvas creation and first draw paths.
- [x] Trace WebGL context, shader, buffer and texture creation.
- [x] Trace first `texSubImage2D` and `drawArrays` submission.
- [x] Identify the absence of a render probe and visible failure state.
- [x] Define first-frame and fallback evidence.
- [ ] Implement browser fixtures later.

## Current render bootstrap

```txt
source canvas and 2D context
  -> product draw
  -> WebGL source texture upload
  -> CRT shader draw
  -> browser compositor
```

The code requests RAF after initialization, but no result proves that the callback ran, the source canvas drew, texture upload succeeded, `drawArrays` completed or pixels reached the displayed canvas.

## Failure surfaces

```txt
missing display canvas
missing Canvas2D context
missing WebGL context
shader compile failure
program link failure
buffer allocation failure
texture allocation failure
texture upload failure
uniform or draw failure
RAF never delivered
context lost before first accepted frame
```

## Visible behavior gap

```txt
menu failure
  -> full-screen canvas can remain blank
  -> hidden native buttons may have no listeners
  -> no visible error or retry control

campaign failure
  -> full-screen role=application canvas can remain blank
  -> static instructions remain but no playable surface
  -> no visible error, back control or retry
```

## Required evidence

```txt
RenderBootstrapProbeResult
  routeId
  startupAttemptId
  sourceCanvasGeneration
  webglContextGeneration
  crtResourceGeneration
  sourceFrameRevision
  crtFrameRevision
  status: accepted | degraded | failed
  failedPhase

FirstRouteFrameAck
  routeId
  startupAttemptId
  sourceFrameRevision
  crtFrameRevision
  viewportRevision
  settingsRevision when available
  presentedAt
```

## Required fallback

The fallback must be outside the failing WebGL path and must provide:

```txt
route identity
bounded failure summary
retry action
return-to-menu action on campaign
keyboard and pointer reachability
accessible status
current retry attempt state
```

## Validation boundary

No render source, HTML, shader, browser fixture or deployment behavior changed.