# Terminal Overlay and Committed Outcome Gap

**Timestamp:** `2026-07-11T13-28-37-04-00`

## Summary

The terminal overlay reads live `won` and `lost` booleans and prioritizes `won`. A state that contains both values is rendered as victory, with no terminal result, frame identity or consumer acknowledgement proving what outcome was committed.

## Plan ledger

**Goal:** make terminal presentation consume one immutable outcome result rather than resolve conflicting mutable booleans locally.

- [x] Trace `drawUI()` terminal selection.
- [x] Trace state mutation ordering before render.
- [x] Trace CRT upload and `GameHost` observation.
- [x] Define terminal-frame receipt requirements.
- [ ] Implement and test terminal render consumption.

## Current projection

```txt
state.won ? "GRAVE RING SECURED"
  : state.lost ? "SANCTUM LOST"
  : "PAUSED"
```

This presentation rule silently arbitrates a domain conflict. It is not a valid outcome policy because:

```txt
it runs in the renderer
it has no run or tick identity
it does not control persistence
it does not update GameHost semantics
it cannot reject mixed state
it cannot prove which terminal transition produced the frame
```

## Mixed terminal frame

```txt
core = 0
lost = true
won = true
message = victory message
  -> world draws destroyed-core state
  -> HUD reports core 0
  -> overlay reports GRAVE RING SECURED
  -> CRT uploads the contradictory source canvas
```

The visible frame can therefore combine defeat evidence and victory presentation.

## Required render input

```txt
TerminalRenderSnapshot
  frameId
  tickId
  runEpoch
  terminalResultId
  terminalOutcome
  terminalReason
  coreHealth
  waveIndex
  stateFingerprint
  message
```

## Required consumer acknowledgements

```txt
world
HUD
minimap
terminal overlay
CRT source upload
CRT draw
GameHost diagnostics
```

Every consumer must acknowledge the same:

```txt
terminalResultId
stateFingerprint
frameId
```

## Rejection rules

```txt
reject missing terminal result for terminal phase
reject ACTIVE result with terminal overlay
reject VICTORY when coreHealth <= 0
reject DEFEAT with victory persistence decision
reject mixed run epoch or state fingerprint
reject stale terminal frame after restart
```

## Required fixture

Construct the simultaneous breach/final-clear state, commit the expected defeat result, render one frame and assert:

```txt
overlay = SANCTUM LOST
HUD core = 0
no victory save
all consumers acknowledge the defeat result ID
```