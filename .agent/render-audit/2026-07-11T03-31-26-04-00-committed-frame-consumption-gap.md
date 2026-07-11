# Committed Frame Consumption Gap

**Timestamp:** `2026-07-11T03-31-26-04-00`

## Current frame path

```txt
requestAnimationFrame(now)
  -> compute clamped variable dt
  -> update camera velocity and position with variable dt
  -> add dt to accumulator
  -> execute zero or more update(1/60) calls
  -> draw world and UI from mutable state
  -> upload source canvas through CRT renderer
  -> request the next animation frame
```

## Gap

The runtime has no committed-frame record. `render()` returns no structured result and the campaign does not retain a CRT upload acknowledgement. The world, HUD, minimap, terminal modal, selection overlay, CRT output, and `GameHost.getState()` can be sampled at different moments from the same mutable object graph.

Missing frame facts:

```txt
sessionId
frameId
sourceRafTime
frameDt
firstSimulationTick
lastSimulationTick
simulationStepCount
appliedCommandSequences
preRenderStateFingerprint
worldConsumptionResult
hudConsumptionResult
minimapConsumptionResult
modalConsumptionResult
crtUploadResult
committedAt
```

## Required render contract

```txt
simulation commit
  -> immutable presentation snapshot
  -> world consumer
  -> HUD consumer
  -> minimap consumer
  -> modal consumer
  -> source-canvas completion
  -> CRT upload acknowledgement
  -> committed-frame result
  -> GameHost observation
```

## Failure handling

A frame must not be marked committed when:

- a consumer throws,
- source-canvas drawing is incomplete,
- the CRT upload fails,
- the state fingerprint changes during rendering,
- the frame consumes commands not applied in its declared tick range.

Failure should produce a bounded frame-failure row while preserving the last successful committed frame.

## Validation gate

A DOM-free frame fixture should prove that every consumer receives the same immutable presentation snapshot and fingerprint. A browser fixture should then prove source-canvas and CRT acknowledgement parity without changing the current pixel presentation.