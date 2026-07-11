# Command Preflight and Application Loop

**Timestamp:** `2026-07-11T03-31-26-04-00`

## Current gameplay loop

```txt
input callback
  -> direct selection/build/order/wave mutation
  -> return undefined
  -> later fixed-step update advances AI, spawning, combat, economy, and terminal state
  -> render observes the resulting mutable state
```

## Source-backed rejection paths

### `startWave()`

Silently returns when:

```txt
wave already active
campaign won
campaign lost
wave index is beyond the wave table
```

### `build()`

Silently returns when:

```txt
selected pad does not resolve
pad already has a tower
souls are below the selected tower cost
```

### `order()`

Silently returns when:

```txt
no allied units are selected
```

### `selectAt()`

Combines several distinct actions:

```txt
single-unit select
toggle-unit select
pad select
second-click build
selection clear
```

## Gameplay risk

Because commands apply outside `update(1/60)`, two equivalent request sequences can produce different outcomes depending on browser event timing relative to the accumulator. Examples include:

- starting a wave before or after a fixed step,
- building before or after tower targeting runs,
- issuing an order before or after ally targeting chooses an enemy,
- toggling pause between accumulator steps,
- invoking `GameHost.build()` while browser input is also changing the selected pad or tower type.

## Required loop

```txt
source request
  -> normalize command
  -> assign sequence and target tick
  -> pure preflight against target-tick state
  -> accepted/rejected/no-op result
  -> apply accepted commands in sequence at tick boundary
  -> emit ordered domain events
  -> compute canonical state fingerprint
  -> publish tick commit
```

## Initial event catalog

```txt
selection-changed
pad-selected
tower-type-selected
tower-built
unit-order-assigned
wave-started
pause-changed
camera-focus-requested
command-rejected
command-no-op
```

## Proof requirements

- Same initial state plus same command sequence produces the same final fingerprint.
- Rejected and no-op requests never mutate state.
- A wave-start request applies on its assigned target tick only.
- A build request spends souls and occupies one pad exactly once.
- Duplicate command IDs do not duplicate mutation.
- Multiple commands targeting one tick apply in sequence order.
- Browser and GameHost sources produce identical results for equivalent payloads.