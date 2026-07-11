# Paused and Terminal Mutation Loop

**Timestamp:** `2026-07-11T07-38-25-04-00`

## Summary

Pause and terminal flags stop fixed-step simulation updates but do not stop direct gameplay mutations. This produces a split loop in which simulation is frozen while selection, construction, orders and wave admission remain callable.

## Plan ledger

**Goal:** define gameplay invariants for every campaign phase and prevent callback-side mutation outside the active phase.

- [x] Trace pause and terminal checks.
- [x] Trace selection, build, order and wave mutations.
- [x] Identify mutation paths that bypass `update()`.
- [x] Define phase-specific gameplay invariants.
- [ ] Move gameplay mutation behind typed commands.
- [ ] Add paused and terminal fixtures.

## Current gameplay mutation paths

```txt
fixed-step path
  update(1/60)
    -> returns immediately if paused/won/lost
    -> otherwise spawn, AI, movement, combat, rewards and terminal checks

direct callback path
  selectAt()
    -> selection mutation
    -> optional build()
  build()
    -> souls decrement
    -> pad ownership mutation
    -> tower creation
  order()
    -> target and move mutation
  startWave()
    -> spawn queue creation
    -> waveActive mutation
```

Only the fixed-step path checks `paused`, `won` and `lost` as a group. `startWave()` checks win/loss but not pause. Selection, build and order do not enforce any campaign phase.

## Failure scenarios

### Build while paused

```txt
pause
  -> select empty pad
  -> click same pad again
  -> build() deducts souls and creates tower
  -> simulation remains frozen
  -> paused frame renders new tower and lower souls
```

### Start wave while paused

```txt
pause before wave
  -> press Space
  -> startWave() fills spawn queue and sets waveActive
  -> update() remains frozen
  -> resume starts an already-admitted wave
```

### Mutate after terminal state

```txt
win or loss
  -> update() stops
  -> pointer callbacks remain active
  -> selection/order/build can still mutate state
  -> terminal state is not immutable
```

## Required gameplay invariants

```txt
ACTIVE:
  gameplay commands may be admitted through normal preflight

PAUSED:
  state.time, economy, entities, spawn queue, ownership, targets and selections remain unchanged
  resume/restart/exit remain typed lifecycle or phase commands

WON or LOST:
  all gameplay state is terminal and immutable
  only restart/exit/observation commands may be admitted

TRANSITIONING or DISPOSED:
  no gameplay mutation
```

Camera behavior while paused or terminal must be declared explicitly as either presentation-only and non-authoritative or fully blocked. It must not remain accidental.

## Required results

```txt
accepted command
rejected command with phase reason
idempotent duplicate
phase transition result
state fingerprint before and after
applied fixed-step tick when applicable
```

## Fixture cases

```txt
pause then select
pause then build
pause then order
pause then start wave
pause then change tower type
pause then pan/zoom
win then select/build/order/start wave
loss then select/build/order/start wave
transition then send every command kind
GameHost attempts the same bypasses
all rejected cases preserve authoritative fingerprint
```