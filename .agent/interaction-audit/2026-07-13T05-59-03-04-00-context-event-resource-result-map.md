# Context Event to Resource Result Map

**Timestamp:** `2026-07-13T05-59-03-04-00`

## Summary

Browser WebGL context events currently have no command/result path. They must be converted into revisioned lifecycle evidence before resource retirement, fallback projection or restored-resource adoption can occur.

## Plan ledger

**Goal:** map browser context evidence into one deterministic lifecycle transaction with zero partial adoption.

- [x] Identify context-loss and context-restored ingress.
- [x] Identify missing identity, generation and predecessor checks.
- [x] Identify resource retirement and rebuild outputs.
- [x] Identify presentation/fallback acknowledgements.
- [ ] Implement later.

## Required event map

```txt
webglcontextlost
  -> ContextLifecycleEvent
  -> validate route/surface/context generation
  -> classify recoverable or terminal
  -> optionally preventDefault under policy
  -> retire ResourceGeneration N
  -> ContextLossResult
  -> fallback projection

webglcontextrestored
  -> ContextLifecycleEvent
  -> reject stale/unexpected restore
  -> prepare ResourceGeneration N+1
  -> compile/link program
  -> allocate buffer/texture/locations
  -> probe upload and draw
  -> ResourceRebuildResult
  -> atomically adopt or discard
  -> FirstRecoveredFrameAck
```

## Terminal results

```txt
LostRecoverable
LostTerminal
RestorePending
RestoredAccepted
RestoreRejected
ResourceRebuildFailed
FallbackProjected
Disposed
Duplicate
Stale
```

## Zero-mutation rejection

A duplicate or stale event must not retire the current valid generation, adopt a partial candidate, resume GPU submission or change the visible fallback state.