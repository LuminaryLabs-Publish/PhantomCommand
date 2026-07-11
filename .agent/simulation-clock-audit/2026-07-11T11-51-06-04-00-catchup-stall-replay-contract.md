# Catch-Up, Stall and Replay Contract

**Timestamp:** `2026-07-11T11-51-06-04-00`

## Summary

The current 50 ms delta clamp silently removes elapsed duration. A deterministic campaign needs an explicit visibility, catch-up and overrun policy whose decisions are recorded in replay evidence.

## Plan ledger

**Goal:** define how wall-clock samples become simulation ticks without hidden time loss.

- [x] Trace raw RAF delta, clamp and accumulator behavior.
- [x] Identify accidental three-tick catch-up ceiling.
- [x] Define explicit policy and receipt fields.
- [ ] Implement policy fixtures.

## Current behavior

```txt
rawDelta = now - last
dt = min(50 ms, rawDelta)
accumulator += dt
while accumulator >= 16.666... ms
  update one tick
```

Any raw duration beyond 50 ms disappears. Because the accepted duration is capped, one frame can normally run no more than three ticks. Neither fact is represented in diagnostics or replay data.

## Required policy

Choose and version one policy for each state:

```txt
visible short stall:
  bounded catch-up, then explicit dropped-duration receipt

hidden tab:
  suspend authoritative time or bounded catch-up by declared rule

manual pause:
  simulation ticks stop; presentation may continue

terminal state:
  mutation admission closes; presentation policy remains explicit
```

## ClockOverrunResult

```txt
clockPolicyVersion
frameSampleId
visibilityState
rawElapsedMs
acceptedElapsedMs
simulatedTicks
remainingAccumulatorMs
droppedMs
suspendedMs
reason
```

## Replay contract

A replay journal must contain the simulation start identity, command sequence, target ticks, clock-policy version and any overrun/suspension decisions that affect authoritative progression. Replaying the journal must reproduce the same committed state fingerprint.

## Required fixture schedules

```txt
20 Hz
30 Hz
60 Hz
120 Hz
alternating 8/24 ms
single 49 ms frame
single 51 ms frame
250 ms stall
2 second hidden interval
pause/resume interval
```