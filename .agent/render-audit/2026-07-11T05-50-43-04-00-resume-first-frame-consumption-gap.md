# Resume First-Frame Consumption Gap

**Timestamp:** `2026-07-11T05-50-43-04-00`

## Summary

A resumed campaign cannot be considered committed merely because state was hydrated. The first world/HUD/minimap/CRT frame must prove that it consumed the new resume epoch and checkpoint fingerprint rather than stale pre-load state.

## Plan ledger

**Goal:** define the render-side evidence required after atomic resume without moving checkpoint semantics into the renderer.

- [x] Trace current world-to-CRT render path.
- [x] Identify missing frame identity.
- [x] Identify stale-state risk during resume.
- [x] Define render-consumption rows.
- [x] Define first-frame assertions.
- [ ] Implement after committed-frame authority exists.

## Current render path

```txt
live mutable campaign state
  -> drawWorld
  -> drawUI
  -> drawMinimap
  -> terminal overlay
  -> source canvas
  -> CRT texture upload
  -> CRT draw
```

Current gaps:

```txt
no simulation tick on render input
no checkpoint fingerprint on render input
no resume epoch
no world/HUD/minimap consumption result
no CRT upload acknowledgement
no first-frame completion barrier
```

## Required frame chain

```txt
resume commit result
  -> resumeEpoch
  -> checkpointFingerprint
  -> committed simulation tick
  -> world projection result
  -> HUD/minimap projection result
  -> CRT upload acknowledgement
  -> renderedFrameId
  -> firstResumeFrameResult
```

## Required assertions

```txt
no frame is emitted from partially staged state
no pre-resume frame is attributed to the new epoch
world, HUD and minimap consume the same tick/fingerprint
CRT upload consumes the same source-frame identity
first-frame acknowledgement is emitted exactly once per resume epoch
failed resume produces no new frame acknowledgement
stale RAF callback cannot render the replaced session
```

## Render-safe output

The public proof row should be detached and JSON-safe:

```json
{
  "frameId": 0,
  "resumeEpoch": 0,
  "tick": 0,
  "checkpointFingerprint": "...",
  "worldApplied": true,
  "hudApplied": true,
  "minimapApplied": true,
  "crtUploaded": true,
  "status": "committed"
}
```
