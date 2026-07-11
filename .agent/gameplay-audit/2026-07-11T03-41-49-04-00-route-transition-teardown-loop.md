# Route Transition and Teardown Loop

**Timestamp:** `2026-07-11T03-41-49-04-00`

## Summary

Gameplay and menu transitions currently rely on browser navigation to terminate the active JavaScript environment. There is no explicit transaction that stops input, freezes command admission, completes resource teardown and then performs navigation.

## Plan ledger

**Goal:** make Begin, Continue, Restart and Exit deterministic lifecycle commands without changing their visible behavior.

- [x] Trace menu Begin and Continue.
- [x] Trace campaign Restart and Exit.
- [x] Identify admission and teardown gaps.
- [x] Define target transition loop.
- [ ] Implement typed transition authority.

## Current menu transition

```txt
activate Begin or Continue
  -> set targetUrl and transitionStartedAt
  -> keep menu input/listeners/RAF/audio alive
  -> advance fade in RAF
  -> assign window.location.href after 0.95 seconds
```

## Current campaign transitions

```txt
R
  -> location.reload()

Escape
  -> location.href = "./"
```

## Failure modes

```txt
repeated input during transition remains admitted
no typed accepted/rejected transition result
no state that prevents new audio, pointer or keyboard work
no teardown completion barrier
no proof that RAF stopped before navigation
no proof that WebGL/audio resources were released
no cancellation path if navigation is blocked
no stale callback fence after a test or embedded remount
```

## Target loop

```txt
source request
  -> normalized TransitionCommand
  -> lifecycle preflight
  -> accepted/rejected/no-op result
  -> state = transitioning
  -> stop menu/gameplay command admission
  -> cancel pending RAF
  -> cancel timers
  -> remove listeners
  -> release global
  -> stop/close audio
  -> dispose CRT
  -> publish teardown result
  -> execute navigation effect
  -> publish transition completion or failure
```

## Command types

```txt
BEGIN_NEW_CAMPAIGN
CONTINUE_CAMPAIGN
RESTART_CAMPAIGN
RETURN_TO_MENU
DISPOSE_ROUTE
```

## Required reasons

```txt
accepted
already-transitioning
already-disposed
invalid-target
save-not-resumable
teardown-failed
navigation-failed
no-op-same-target
```

## Gameplay invariants

```txt
no simulation tick after transition admission
no build/order/wave command after transition admission
no camera mutation after transition admission
no world/HUD/minimap/CRT draw after teardown starts
navigation occurs at most once
```
