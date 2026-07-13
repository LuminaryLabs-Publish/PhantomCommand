# Menu and Campaign Presentation-Liveness Loop

**Timestamp:** `2026-07-13T05-59-03-04-00`

## Summary

Both route loops advance source state before submitting the CRT draw and request the successor RAF only after that synchronous draw returns. Presentation failure is therefore coupled to loop liveness even though menu state and campaign simulation are separate owners.

## Plan ledger

**Goal:** keep route/gameplay truth deterministic while making presentation failure explicit, isolated and recoverable.

- [x] Trace menu state update, source draw, CRT draw and RAF request.
- [x] Trace campaign fixed-step update, source draw, CRT draw and RAF request.
- [x] Record missing presentation result and scheduler isolation.
- [x] Record source/display divergence.
- [ ] Split simulation scheduling from recoverable display submission later.

## Current menu loop

```txt
transition/pointer update
  -> graveyard source draw
  -> CRT render
  -> requestAnimationFrame
```

## Current campaign loop

```txt
camera update
  -> fixed-step simulation
  -> world/HUD/minimap source draw
  -> CRT render
  -> requestAnimationFrame
```

## Risks

```txt
render exception can prevent successor RAF scheduling
context loss can blank the display without stopping source-state mutation
campaign truth can advance without a matching visible frame
menu transition can continue without visible fade confirmation
no route-level degraded or fatal result exists
no restart/recovery policy cites the failed frame
```

## Required separation

```txt
route/gameplay scheduler
  owns source-state advancement

presentation scheduler
  owns admitted GPU submission and retry/recovery

frame coordinator
  binds source revision to terminal visible/degraded result
```

Gameplay correctness and presentation recovery must remain separate, but their revisions must be correlated.