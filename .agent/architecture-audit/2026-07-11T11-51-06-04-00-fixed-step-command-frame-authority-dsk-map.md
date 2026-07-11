# Fixed-Step Command and Frame Authority DSK Map

**Timestamp:** `2026-07-11T11-51-06-04-00`

## Summary

The campaign owns a fixed simulation step but not a fixed command or frame transaction. This DSK map defines the boundary that admits commands, assigns target ticks, applies them exactly once, fingerprints committed state and publishes correlated render receipts.

## Plan ledger

**Goal:** define one deterministic authority chain from event intent to committed tick and visible frame.

- [x] Map current event, clock, simulation and render owners.
- [x] Identify direct mutation bypasses.
- [x] Define required DSKs and service contracts.
- [x] Preserve projection and phase authority as prerequisites.
- [ ] Implement and fixture-gate the boundary.

## Current ownership split

```txt
browser callbacks
  own immediate selection/build/order/wave/pause/tower/camera mutation

frame()
  owns wall-clock sample, 50 ms clamp, camera integration and accumulator

update(1/60)
  owns combat simulation only

render()
  reads live state and camera

GameHost
  exposes mutable state/camera and direct actions
```

## Target parent domain

```txt
phantom-command-fixed-step-command-frame-authority-domain
```

## DSK breakdown

### Clock DSK

```txt
phantom-command-monotonic-frame-sample-kit
phantom-command-simulation-clock-kit
phantom-command-fixed-step-accumulator-kit
phantom-command-catchup-budget-kit
phantom-command-clock-overrun-result-kit
```

Services:

```txt
capture monotonic frame samples
apply visibility policy
retain raw elapsed duration
compute bounded tick count
report simulated, suspended or dropped duration
publish clock counters and overrun receipts
```

### Command DSK

```txt
phantom-command-command-envelope-kit
phantom-command-command-sequence-kit
phantom-command-target-tick-policy-kit
phantom-command-fixed-step-command-queue-kit
phantom-command-command-application-kit
```

Services:

```txt
normalize source intent
attach session, command, phase and projection identity
assign monotonic sequence and deterministic target tick
sort by target tick then sequence
reject stale, duplicate or illegal commands
apply exactly once before the target tick update
```

### Commit and replay DSK

```txt
phantom-command-simulation-tick-id-kit
phantom-command-state-fingerprint-kit
phantom-command-committed-tick-receipt-kit
phantom-command-replay-journal-kit
```

Services:

```txt
advance tick identity
record applied command cursor and ordered domain events
canonicalize authoritative state
calculate fingerprint
publish immutable committed-tick receipt
replay a journal and compare fingerprints
```

### Render-frame DSK

```txt
phantom-command-render-frame-id-kit
phantom-command-committed-frame-receipt-kit
phantom-command-frame-consumer-ack-kit
```

Services:

```txt
extract detached render snapshot
attach tick, fingerprint and command cursor
attach camera and projection revisions
assign frame identity
record world, HUD, minimap, overlay and CRT acknowledgements
reject stale or mixed-revision consumption
```

### Proof DSK

```txt
phantom-command-cadence-parity-fixture-kit
phantom-command-stall-policy-fixture-kit
phantom-command-command-replay-fixture-kit
phantom-command-frame-correlation-fixture-kit
```

## Required contracts

### CampaignCommand

```txt
sessionId
runId
commandId
sequence
source
observedPhase
projectionRevision
targetTick
payload
```

### ClockOverrunResult

```txt
frameSampleId
rawElapsedMs
acceptedElapsedMs
simulatedTicks
remainingAccumulatorMs
droppedMs
suspendedMs
policy
```

### CommittedTickReceipt

```txt
tickId
simulationTime
appliedCommandCursor
appliedCommandIds
domainEvents
stateFingerprint
```

### CommittedFrameReceipt

```txt
frameId
tickId
stateFingerprint
appliedCommandCursor
cameraRevision
projectionRevision
presentationTime
consumerAcks
```

## Admission order

```txt
projection preflight
  -> phase preflight
  -> gameplay preflight
  -> sequence and target tick
  -> queue
  -> fixed-step application
  -> state commit
  -> render snapshot
  -> frame commit
```

## Dependency order

```txt
Continue resolver
  -> display/input projection
  -> campaign phase admission
  -> fixed-step command/frame authority
  -> lifecycle ownership
  -> checkpoint capture/resume
```