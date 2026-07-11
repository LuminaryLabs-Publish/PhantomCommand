# PhantomCommand Menu and Campaign Stop, Dispose, and Restart Contract

**Timestamp:** `2026-07-10T21-49-26-04-00`

## Lifecycle states

```txt
created
starting
running
pausing
paused
terminal
stopping
stopped
disposing
disposed
failed
```

Menu and campaign may use different allowed transitions, but both must use one lifecycle result vocabulary.

## Session snapshot

```txt
sessionId
routeKind
status
startedSequence
stoppedSequence
disposedSequence
activeFrameRequestId
listenerRegistrationCount
liveAudioResourceCount
liveRenderResourceCount
inputAdmissionOpen
transitionState
terminalReason
lastLifecycleResult
```

## Start transaction

```txt
allocate sessionId
  -> create state and source canvas
  -> create child renderer/resources
  -> register listeners
  -> publish route host
  -> schedule first frame
  -> commit running result
```

Any failure must roll back completed steps in reverse order and commit a failed result with released-resource counts.

## Stop contract

`stop(reason)` must:

```txt
close new input/command admission
prevent frame rescheduling
cancel the retained frame request
stop simulation advancement
retain clone-safe final observations
return an idempotent stop result
```

## Dispose contract

`dispose(reason)` must:

```txt
call stop if required
remove all listener registrations
stop menu audio sources and close AudioContext
release CRT texture, buffer, program, and shaders
clear route-owned exported globals only when still owned by this session
release child references
append bounded lifecycle and resource results
return disposed status and zero live owned resource counts
```

## Restart contract

`restart(reason)` must:

```txt
dispose active session
allocate a new sessionId
construct fresh route state
install one listener set
schedule one frame loop
publish one active route host
return old/new session IDs and lifecycle results
```

## Idempotency

```txt
stop twice -> second result reports already-stopped, no duplicate cancellation
 dispose twice -> second result reports already-disposed, no duplicate resource deletion
 restart during stopping -> serialized or rejected with stable reason
 restart during transition -> explicit policy and stable result
 stale callback -> rejected with stale-session reason
```

## GameHost and PhantomMenu additions

Additive, clone-safe surfaces:

```txt
getLifecycleState()
getLifecycleJournal(limit)
stop(reason)
dispose(reason)
restart(reason)
```

Preserve existing fields and methods until compatibility removal is separately approved.

## Lifecycle result shape

```json
{
  "sequence": 1,
  "sessionId": "campaign-1",
  "operation": "dispose",
  "status": "accepted",
  "reason": "restart",
  "before": "running",
  "after": "disposed",
  "released": {
    "frameRequests": 1,
    "listeners": 8,
    "audioResources": 0,
    "renderResources": 4
  },
  "remainingOwnedResources": 0
}
```

## Non-goals

```txt
renderer replacement
route unification
visual or control changes
campaign content changes
save-schema implementation
multiplayer lifecycle
legacy construct runtime revival
```