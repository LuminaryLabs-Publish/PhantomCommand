# Hitch and High-Refresh Simulation Loop Audit

**Timestamp:** `2026-07-13T11-41-10-04-00`

## Summary

Gameplay advances at 60 fixed steps per second, but the browser scheduler silently clamps elapsed time to 50 ms and renders only the latest complete state. This preserves bounded work but does not expose how much time was discarded, how many steps ran or whether a visible discontinuity occurred.

## Plan ledger

**Goal:** preserve deterministic fixed-step gameplay while making workload, dropped time, pause/resume and presentation discontinuities explicit.

- [x] Trace accumulator creation and drain.
- [x] Trace pause, win and loss early returns.
- [x] Trace blur behavior and missing visibility policy.
- [x] Identify high-refresh and hitch behavior.
- [ ] Add scheduler receipts and deterministic fixtures later.

## Current behavior

```txt
frame elapsed <= 50 ms
  -> add elapsed to accumulator
  -> run update(1/60) until accumulator < 1/60
  -> render latest state

frame elapsed > 50 ms
  -> replace elapsed with 50 ms
  -> silently discard remainder
  -> run at most three steps
  -> render latest state

paused/won/lost
  -> fixed-step update returns immediately
  -> accumulator is still drained
  -> camera and rendering continue
```

## Gameplay risks

```txt
spawn cadence and combat time lose unreported wall time after stalls
camera can advance under variable dt while gameplay advances under fixed steps
high-refresh displays repeat complete states without interpolation
multiple fixed steps can collapse into one visible update
background suspension has no explicit scheduler reset or resume generation
replay cannot reconstruct dropped-time decisions from state alone
public diagnostics cannot explain why visible cadence changed
```

## Required gameplay contract

```txt
FixedStepDrainResult {
  commandId
  schedulerGeneration
  elapsedWallTime
  admittedWallTime
  droppedWallTime
  fixedStep
  stepBudget
  stepsExecuted
  previousSimulationRevision
  currentSimulationRevision
  accumulatorRemainder
  status
}
```

## Invariants

1. The fixed step remains exactly `1/60` unless a versioned policy changes it.
2. Work per frame is bounded by an explicit step budget.
3. Discarded time is reported, not hidden.
4. Pause and visibility transitions produce typed generation changes.
5. Simulation state can be replayed from admitted samples and commands.
6. Rendering cannot claim a coherent frame without the matching drain result.
7. Restart or terminal outcome retires predecessor scheduler work.