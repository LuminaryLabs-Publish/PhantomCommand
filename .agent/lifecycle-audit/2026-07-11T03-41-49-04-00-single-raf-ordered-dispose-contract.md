# Single RAF and Ordered Dispose Contract

**Timestamp:** `2026-07-11T03-41-49-04-00`

## Summary

The core lifecycle proof is a one-RAF lease plus reverse-order cleanup. Without those two mechanisms, route remount and startup failure cannot be made deterministic.

## Plan ledger

**Goal:** define the exact scheduler and cleanup contract for menu and campaign sessions.

- [x] Identify discarded RAF IDs.
- [x] Define one-pending-request invariant.
- [x] Define generation-fenced callback admission.
- [x] Define reverse cleanup order.
- [x] Define idempotent terminal results.
- [ ] Implement and prove with a fake scheduler.

## RAF contract

```txt
start()
  -> increment runGeneration
  -> request one frame
  -> retain requestId

callback(requestId, generation)
  -> reject if disposed
  -> reject if generation != active generation
  -> clear pending request before work
  -> execute admitted frame
  -> request exactly one successor if still running
```

Invariants:

```txt
pendingRafCount is 0 or 1
stop/dispose cancels the retained request
stale callback does not mutate, render or schedule a successor
start while running returns no-op or rejection
restart cannot overlap generations
```

## Resource acquisition order

```txt
session identity/state
source canvas/context
art or campaign descriptors/state
CRT renderer
audio owner when activated
listeners
global exposure
RAF lease
```

## Required cleanup order

```txt
close command/input admission
advance generation fence
cancel RAF
cancel transition/audio timers
remove listeners
release global exposure
stop/disconnect/close audio
dispose CRT/WebGL
clear route-owned mutable references
publish disposal report
mark disposed
```

Startup rollback uses the reverse of actual successful acquisition order.

## Disposal result

```txt
sessionId
runId
runGeneration
sequence
status
reason
stateBefore
stateAfter
cancelledRafCount
cancelledTimerCount
removedListenerCount
releasedGlobalCount
stoppedAudioSourceCount
closedAudioContextCount
deletedTextureCount
deletedBufferCount
deletedProgramCount
deletedShaderCount
errors
```

## Idempotence

First disposal:

```txt
status = completed | completed-with-errors
resource releases execute
```

Later disposal:

```txt
status = no-op
reason = already-disposed
resource release counts = 0
```

## Fake scheduler fixtures

```txt
start schedules one callback
callback schedules one successor
stop cancels pending callback
stale callback after restart is rejected
double start does not create a second chain
dispose from inside callback does not schedule successor
transition during callback completes teardown once
```
