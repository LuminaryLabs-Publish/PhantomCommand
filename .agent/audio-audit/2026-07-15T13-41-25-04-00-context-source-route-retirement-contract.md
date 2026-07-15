# Context, Source and Route Retirement Contract

**Timestamp:** `2026-07-15T13-41-25-04-00`

## Summary

The menu audio graph needs one generation identity and explicit ownership for context state, persistent sources, transient sources, delayed callbacks and route retirement.

## Plan ledger

**Goal:** ensure every accepted audio resource is resumed, suspended or retired exactly once and cannot be affected by stale callbacks.

- [x] Inventory context, master, drone, wind and UI-tone resources.
- [x] Trace the delayed close callback.
- [x] Define ownership and retirement receipts.
- [ ] Implement and execute lifecycle fixtures.

## Current resources

```txt
state.audio
  context
  master
  drone oscillator
  wind buffer source

transient per cue
  oscillator
  gain

untracked
  delayed context-close timeout
  context state transitions
  source ended state
  route and document retirement
```

## Required contract

```txt
AudioContextGeneration
  owns one context and master bus
  observes suspended running closed state

PersistentAmbienceLease
  owns drone and wind
  stops and disconnects exactly once

TransientCueLease
  owns one oscillator and gain
  self-retires on ended or settlement

AudioRetirementReceipt
  records stopped disconnected suspended or closed resources

LateAudioCallbackRejection
  prevents a predecessor timeout from closing a later generation
```

## Lifecycle policy

```txt
preference disabled -> fade then retire sources and context
visibility hidden   -> suspend or silence by policy
visibility visible  -> resume only after accepted state
route transition    -> settle predecessor graph
pagehide             -> stop disconnect and close exactly once
```

No audible behavior was changed.