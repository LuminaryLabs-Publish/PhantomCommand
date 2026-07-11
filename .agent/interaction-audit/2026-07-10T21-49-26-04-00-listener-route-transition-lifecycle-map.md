# PhantomCommand Listener and Route Transition Lifecycle Map

**Timestamp:** `2026-07-10T21-49-26-04-00`

## Menu listeners

```txt
displayCanvas pointermove -> named onPointerMove
displayCanvas pointerdown -> anonymous handler
displayCanvas pointerleave -> anonymous handler
document keydown -> anonymous handler
hidden menu buttons click -> one anonymous handler per button
```

## Campaign listeners

```txt
canvas pointermove -> anonymous handler
canvas pointerdown -> anonymous handler
canvas pointerup -> anonymous handler
canvas contextmenu -> anonymous handler
canvas wheel -> anonymous passive:false handler
window keydown -> anonymous handler
window keyup -> anonymous handler
window blur -> anonymous handler
```

## Route and restart effects

```txt
menu Begin/Continue -> set target URL and timed fade -> location navigation
campaign R -> location.reload()
campaign Escape -> location.href = "./"
```

No listener registration ledger, removal service, transition cancellation service, or lifecycle result exists.

## Interaction risks

```txt
- anonymous handlers cannot be removed without restructuring
- repeated route mounts in one document would duplicate admission paths
- input can remain active while a transition fade is running
- no state says that transition admission has closed menu interaction
- no state says a stopped campaign rejects pointer/keyboard input
- hidden button handlers and canvas handlers can diverge in future lifecycle behavior
- blur clears transient input but is not teardown
- reload/navigation is treated as cleanup without observable result
```

## Required interaction lifecycle services

```txt
registerListener(sessionId, targetId, eventType, handlerId, options)
removeListener(sessionId, registrationId)
closeInputAdmission(sessionId, reason)
submitRouteTransition(sessionId, target, source)
cancelRouteTransition(sessionId, reason)
recordRouteTransitionResult(sessionId, accepted, target, reason)
rejectStaleSessionInput(sessionId, activeSessionId)
```

## Required behavior

- Named handlers or registration records must make every listener removable.
- Menu transition start must close duplicate transition admission while preserving fade rendering.
- Campaign stop must reject pointer, keyboard, GameHost, and future replay commands.
- Disposal must remove listeners before child state and renderer resources are released.
- Hidden accessible controls and visible canvas controls must route through the same admission service.
- Transition results must identify source, target, session, timestamp/sequence, and teardown status.
- Stale-session events must never mutate the active session.

## Fixture matrix

```txt
menu mount/dispose/remount -> one response per pointer and keyboard event
Begin double activation -> one accepted transition and one duplicate rejection
transition in progress -> settings/menu mutation rejected or explicitly allowed by policy
campaign dispose -> subsequent pointer/key callbacks cannot mutate state
campaign restart -> old listener registrations removed before new registrations activate
hidden button Begin and canvas Begin -> same transition command/result shape
```

## Constraint

Keep current controls and accessibility surfaces. The change is ownership and proof, not a control redesign.