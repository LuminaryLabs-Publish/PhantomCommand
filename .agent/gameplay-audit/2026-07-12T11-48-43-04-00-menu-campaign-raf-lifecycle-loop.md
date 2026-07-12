# Gameplay Audit: Menu and Campaign RAF Lifecycle Loop

**Timestamp:** `2026-07-12T11-48-43-04-00`

## Summary

Both routes start recursive RAF loops that schedule their successors unconditionally. Route transition, reload, Escape, blur, context loss and public-host use are not mediated by a runtime-session generation or retirement barrier.

## Plan ledger

**Goal:** document how gameplay and presentation callbacks survive until browser navigation rather than retiring through an explicit route-owned transaction.

- [x] Trace menu RAF and transition fade.
- [x] Trace campaign RAF, fixed-step drain and rendering.
- [x] Trace reload and route-exit commands.
- [x] Trace blur cleanup and its limits.
- [x] Define stale-callback and retirement invariants.
- [ ] Implement lifecycle ownership.

## Current loop

```txt
menu frame
  -> update pointer velocity and flash
  -> advance transition fade
  -> possibly assign location.href
  -> draw graveyard and UI
  -> draw CRT frame
  -> requestAnimationFrame(frame)

campaign frame
  -> sample keyboard movement
  -> update camera
  -> drain fixed 1/60 simulation steps
  -> render world and UI
  -> draw CRT frame
  -> requestAnimationFrame(frame)
```

## Current retirement behavior

```txt
menu to campaign
  -> navigation is expected to destroy menu resources

campaign Escape
  -> location.href = "./"

campaign R
  -> location.reload()

blur
  -> clears keys, middle-pan and drag only

WebGL context loss
  -> no route or gameplay lifecycle transition
```

## Gameplay risks

```txt
callbacks have no runtime generation fence
retirement cannot be acknowledged before navigation
no duplicate-start or duplicate-retire result
no proof that a stale callback cannot mutate camera or simulation
public GameHost remains live until page destruction
context loss does not pause or reject simulation/render coordination
menu transition continues rendering and audio until unload
```

## Required gameplay lifecycle

```txt
route enters STARTING
  -> allocate candidate resources and callbacks
  -> commit READY once all required owners are admitted

READY frame
  -> validate runtime session/generation
  -> consume admitted input
  -> update simulation and camera
  -> present frame
  -> schedule successor only while still READY

route exit
  -> move to RETIRING
  -> reject new input and simulation commands
  -> cancel successor scheduling
  -> retire all leases
  -> publish RETIRED
  -> navigate only after retirement policy completes or times out with a typed result
```

## Required proof

```txt
no successor RAF after RETIRED
no camera or state mutation from a stale callback
repeated route mount produces one active frame owner
repeated retirement returns AlreadyRetired
context loss cannot leave simulation claiming a presented frame
GameHost and PhantomMenu are revoked at retirement
```

Documentation only. Gameplay behavior was not changed.