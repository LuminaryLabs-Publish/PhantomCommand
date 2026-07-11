# PhantomCommand Command Preflight and Result Loop

**Timestamp:** `2026-07-10T23-40-35-04-00`

## Current gameplay loop

```txt
player input
  -> select units or pad
  -> possibly build immediately on second pad click
  -> assign move or target orders
  -> start a scripted wave
  -> fixed-step update advances spawn queue, AI, towers, projectiles, damage, rewards, and terminal state
  -> render live state
```

## Current command behavior

### Selection

```txt
selectAt(worldPoint, additive)
  -> select nearest ally
  -> else select nearest empty pad
  -> if the same pad is selected, call build()
  -> else clear selection
```

A single function owns ally selection, pad selection, deselection, and construction triggering. The player cannot observe whether the request selected, toggled, cleared, or built through a typed result.

### Building

```txt
build()
  -> find selected pad
  -> read selected tower type
  -> return silently if pad missing, occupied, or unaffordable
  -> allocate tower ID
  -> attach tower to pad
  -> debit souls
  -> create tower
  -> emit effect and message
```

### Orders

```txt
order(worldPoint)
  -> return silently when selection is empty
  -> choose nearest enemy within radius, otherwise create formation destinations
  -> mutate every selected unit target or move field
  -> emit effect
```

### Wave start

```txt
startWave()
  -> return silently when active, terminal, or script is exhausted
  -> build and sort spawn queue
  -> set waveActive
  -> update message
```

## Missing result vocabulary

```txt
selection-replaced
selection-toggled
selection-cleared
pad-selected
build-accepted
pad-not-found
pad-occupied
insufficient-souls
order-accepted
no-selection
invalid-order-target
wave-started
wave-already-active
campaign-terminal
wave-script-exhausted
```

## Correct gameplay transaction

```txt
request
  -> command envelope
  -> pure preflight against committed state
  -> typed result
  -> accepted command queued for target tick
  -> mutation at tick boundary
  -> ordered events
  -> committed state fingerprint
  -> presentation frame
```

## Required invariants

```txt
- a rejected build never changes souls, pad ownership, tower IDs, effects, or message
- a rejected order never changes unit target or move fields
- a rejected wave start never changes spawn queue, waveActive, or message
- selection and building are separate commands
- command sequence order is stable across input sources
- command application happens only at fixed-step boundaries
- state-owned ID counters are part of deterministic replay
- terminal state closes gameplay command admission with one stable reason
- accepted commands emit exactly one result and a deterministic event set
```

## Replay matrix

```txt
same seed + same initial state + same commands + same target ticks
  -> same IDs
  -> same results
  -> same events
  -> same state fingerprints
  -> same committed frames
```

Scenarios required:

```txt
successful tower build
insufficient-souls build
occupied-pad build
move order with two selected units
combat-target order
order with no selection
wave start
second wave-start request while active
request after campaign win
request after campaign loss
multiple commands assigned to the same target tick
commands assigned across adjacent ticks
```

## Do not change in this slice

```txt
wave scripts
unit and tower balance
AI behavior
camera feel
pixel-art presentation
CRT shader
menu flow
save schema
```
