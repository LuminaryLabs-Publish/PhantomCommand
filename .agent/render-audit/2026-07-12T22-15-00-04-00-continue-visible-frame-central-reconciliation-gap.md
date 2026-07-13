# Continue Visible-Frame Provenance Gap

**Timestamp:** `2026-07-12T22-15-00-04-00`

## Summary

A Continue click can lead to a valid-looking campaign frame even though no checkpoint was read. The visible world, HUD, minimap and CRT frame carry no bootstrap result, run generation or checkpoint revision.

## Plan ledger

**Goal:** make the first campaign frame prove whether it came from a fresh preset or one validated restored checkpoint.

- [x] Trace menu route to campaign render.
- [x] Record missing provenance.
- [ ] Add bootstrap/frame correlation later.

## Current path

```txt
Continue label
  -> game.html?campaign=continue
  -> fresh defaults
  -> draw world/HUD/minimap
  -> CRT present
```

## Required acknowledgement

```txt
CampaignGenerationFrameAck {
  frameId
  runtimeSessionId
  bootstrapResultId
  entryIntent
  runId
  runGeneration
  checkpointId?
  checkpointRevision?
  sourceFrameRevision
  crtPresentationRevision
}
```
