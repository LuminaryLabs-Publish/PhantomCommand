# PhantomCommand Pause, Wave, and Terminal Mutation Contract

**Timestamp:** `2026-07-12T03-00-46-04-00`

## Summary

This contract defines how pause, wave, and terminal phases must govern mutation. It closes the current split where simulation is phase-gated but direct actions are not.

## Plan ledger

**Goal:** make phase behavior explicit enough that browser, host, simulation, render, and persistence implementations cannot disagree.

- [x] Define canonical live, paused, terminal, and disposed phases.
- [x] Define transition constraints.
- [x] Define gameplay and presentation action classes.
- [x] Define zero-mutation rejection semantics.
- [x] Define terminal closure and frame evidence.
- [ ] Implement policy after upstream command/projection boundaries.

## Canonical phases

```txt
BOOT
PLANNING
RUNNING_WAVE
PAUSED_PLANNING
PAUSED_WAVE
WON
LOST
DISPOSED
```

## Legal transitions

```txt
BOOT -> PLANNING
PLANNING -> RUNNING_WAVE
PLANNING -> PAUSED_PLANNING
RUNNING_WAVE -> PAUSED_WAVE
RUNNING_WAVE -> PLANNING
RUNNING_WAVE -> WON
RUNNING_WAVE -> LOST
PAUSED_PLANNING -> PLANNING
PAUSED_WAVE -> RUNNING_WAVE
any live phase -> DISPOSED
WON/LOST -> DISPOSED or explicit new-session replacement
```

All other transitions require a typed rejection.

## Mutation classes

```txt
DURABLE_GAMEPLAY
  wave admission
  construction
  orders
  economy
  combat
  outcome

PLANNING_STATE
  selection
  selected tower type

PRESENTATION_ONLY
  camera pan
  camera zoom
  camera focus

LIFECYCLE
  pause
  restart
  exit
```

## Pause contract

```txt
paused phases do not advance gameplay simulation
paused phases reject durable gameplay mutation
planning-state mutation policy is explicit
presentation-only camera policy is explicit
resume creates one legal successor phase revision
no action queues hidden durable work unless the policy returns a typed queued result
```

## Wave contract

```txt
START_WAVE admitted only from PLANNING
one accepted start produces one queue and one RUNNING_WAVE revision
active-wave duplicate start is rejected without mutation
wave completion produces PLANNING or WON through one committed transition
build-during-wave policy is declared centrally
```

## Terminal contract

```txt
WON and LOST are mutation-closed for durable gameplay
terminal outcome is exclusive
post-terminal gameplay actions return typed rejections
terminal state fingerprint remains stable
presentation-only actions are separately policy controlled
restart creates a replacement runtime/session instead of reopening terminal owners
first terminal frame cites terminalRevision and phaseRevision
```

## Invalid combinations

```txt
paused + won
paused + lost
won + lost
waveActive + won
waveActive + lost
```

A canonical phase constructor must reject or deterministically normalize these combinations before publication. Raw booleans must not remain public authority.

## Proof obligations

```txt
rejected action -> same durable-state fingerprint
pause -> zero committed gameplay ticks until resume
terminal -> zero durable mutation until replacement session
public host and browser adapters -> same action results
frame -> phase/action/terminal revisions agree
```

## Validation boundary

Documentation only. The runtime does not yet enforce this contract.