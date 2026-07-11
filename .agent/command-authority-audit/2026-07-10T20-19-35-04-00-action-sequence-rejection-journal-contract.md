# Action Sequence and Rejection Journal Contract

**Timestamp:** `2026-07-10T20-19-35-04-00`

## Problem statement

The campaign currently has mutation functions but no command authority. A request that succeeds and a request that is rejected both return `undefined`, and rejected requests leave no evidence. This prevents deterministic fixtures, replay, trustworthy GameHost diagnostics, and render correlation.

## Required command receipt

The request adapter should return immediately with a receipt:

```txt
commandId
sequence
source
requestedAtFrame
targetTick
type
payloadFingerprint
queued
shapeValid
reason
```

A receipt proves admission to the queue, not gameplay success.

## Required action result

Execution at the target tick should produce:

```txt
resultId
commandId
sequence
type
status: accepted | rejected | no-op
reason
executedAtTick
stateFingerprintBefore
stateFingerprintAfter
affectedEntityIds
eventIds
```

## Rejection journal rule

Every validly shaped command must produce one terminal result row, including rejected commands. Invalid command shapes should produce an adapter-level rejected receipt and must not enter the simulation queue.

## Initial rejection vocabulary

```txt
invalid-command
invalid-payload
unknown-action
no-target
no-selected-pad
pad-occupied
insufficient-souls
no-selected-units
wave-already-active
campaign-won
campaign-lost
no-wave-remaining
invalid-tower-type
paused
stale-state
```

The vocabulary should be versioned and stable enough for UI copy, fixtures, replay inspection, and analytics.

## Sequence rules

```txt
- sequence is monotonic within one campaign session
- every source uses the same sequence allocator
- sequence is assigned before queue admission
- simulation commands declare a deterministic target tick
- results preserve their source command sequence
- a tick may consume zero or more sequential commands
- committed frames preserve the consumed sequence range
- replay inputs use the original command sequence and target tick
```

## Bounded journal model

```txt
commandJournal:
  last 256 command receipts

actionResultJournal:
  last 256 terminal results

eventJournal:
  last 512 gameplay events

frameJournal:
  last 120 committed frame summaries
```

Bounds are initial proof values, not product tuning. Eviction should preserve monotonic counters and the first/last retained sequence.

## Event rows

Initial event types:

```txt
selection.changed
pad.selected
tower.built
order.issued
wave.started
enemy.spawned
unit.damaged
unit.defeated
souls.changed
sanctum.damaged
wave.cleared
campaign.won
campaign.lost
```

Each event should include:

```txt
eventId
tickId
causedByCommandId | null
type
entityIds
payload
stateFingerprintAfter
```

AI and fixed-step events may have no user command cause but must still preserve tick ownership.

## GameHost readback

Add clone-safe methods while preserving legacy fields:

```txt
submitCommand(command)
getCommandReceipts()
getActionResults()
getEvents()
getCommittedFrames()
getObservation()
```

`getObservation()` should include bounded immutable rows and never return raw `state`, `camera`, Sets, DOM objects, WebGL resources, or mutation functions as proof.

## Fixture contract

A DOM-free fixture should:

1. create a deterministic initial state;
2. submit a fixed action sequence;
3. advance exact ticks;
4. assert one terminal result per valid command;
5. assert rejection reasons and unchanged fingerprints for rejected actions;
6. assert expected events for accepted actions;
7. assert monotonic sequence, tick, result, event, and frame IDs;
8. replay the same sequence and compare all canonical rows.

## Dependency note

The shared Continue resolver remains ahead of this campaign-internal slice in the implementation queue. The command contract should not depend on storage or hydration so it can be built and tested as a pure campaign subsystem after session-mode authority is established.