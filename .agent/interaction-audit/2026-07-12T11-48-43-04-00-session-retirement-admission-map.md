# Interaction Audit: Session Retirement Admission Map

**Timestamp:** `2026-07-12T11-48-43-04-00`

## Summary

Browser events are installed directly on canvases, `document` and `window`. The callbacks read and mutate live route state without a runtime-session token or lifecycle admission result, and most listener functions are anonymous so the route cannot remove them explicitly.

## Plan ledger

**Goal:** require every input callback to prove current session ownership and make route retirement revoke input before navigation or resource teardown.

- [x] Inventory menu pointer, keyboard and hidden-button listeners.
- [x] Inventory campaign pointer, wheel, keyboard, blur and context-menu listeners.
- [x] Confirm anonymous callback removal handles are absent.
- [x] Define listener leases and lifecycle admission statuses.
- [x] Define retirement ordering and stale callback results.
- [ ] Implement and prove the interaction boundary.

## Current interaction ownership

```txt
menu canvas
  pointermove
  pointerdown
  pointerleave

menu document
  keydown
  hidden button click listeners

campaign canvas
  pointermove
  pointerdown
  pointerup
  contextmenu
  wheel

campaign window
  keydown
  keyup
  blur
```

## Missing admission

```txt
runtimeSessionId: absent
runtimeGeneration: absent
route phase: absent
listener lease ID: absent
input generation: absent
retirement revision: absent
callback sequence: absent
stale callback rejection: absent
removed-listener receipt: absent
```

## Required callback result

```txt
RuntimeCallbackAdmissionResult
  status: Admitted | RejectedStarting | RejectedRetiring | RejectedRetired | RejectedStaleGeneration
  runtimeSessionId
  runtimeGeneration
  listenerLeaseId
  callbackSequence
  routePhase
  reason
```

## Retirement ordering

```txt
RetireRuntime command
  -> transition phase to RETIRING
  -> reject all new callback admission
  -> cancel pointer gestures and held-key generations
  -> remove canvas/document/window listener leases
  -> cancel RAF and timer leases
  -> retire audio and WebGL resources
  -> revoke public hosts
  -> publish RETIRED result
  -> perform route navigation
```

## Required invariants

```txt
A callback from generation N cannot mutate generation N+1.
No listener remains installed after its lease is retired.
Retirement rejects new pointer, keyboard, wheel and hidden-button commands.
Held keys and pointer gestures are cancelled before route transition.
Duplicate retirement does not remove resources owned by a successor session.
Every removed listener is counted in the retirement result.
```

Documentation only. Interaction behavior was not changed.