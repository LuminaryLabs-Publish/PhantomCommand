# Checkpoint Envelope and Atomic Resume Contract

**Timestamp:** `2026-07-11T05-50-43-04-00`

## Summary

The persistence contract must be versioned, content-aware, canonical and transaction-safe. Browser storage is only an adapter; it cannot define whether a value is a valid PhantomCommand checkpoint.

## Plan ledger

**Goal:** establish the envelope, admission, migration, hydration, rollback and proof contract for resumable campaign state.

- [x] Define envelope identity fields.
- [x] Define authoritative payload families.
- [x] Define transient exclusions.
- [x] Define admission and migration order.
- [x] Define atomic commit and rollback.
- [x] Define observation and retention rules.
- [ ] Implement and fixture-gate the contract.

## Envelope shape

```json
{
  "schema": "phantom-command.campaign-checkpoint",
  "schemaVersion": 1,
  "contentId": "grave-ring-campaign",
  "contentVersion": 1,
  "createdAt": "ISO-8601",
  "checkpointId": "...",
  "sessionId": "...",
  "runId": "...",
  "tick": 0,
  "commandSequence": 0,
  "stateFingerprint": "...",
  "payload": {}
}
```

## Admission order

```txt
raw storage read
  -> size/type limit
  -> JSON parse
  -> schema identity
  -> schema version
  -> content identity/version
  -> supported migration path
  -> canonical payload fingerprint
  -> invariant validation
  -> staged hydration
  -> atomic commit
```

## Atomicity contract

```txt
active session remains readable and unchanged during staging
staged state is not visible to render, input or GameHost
all references and counters validate before commit
commit swaps one complete state graph
resume epoch advances exactly once
failure disposes staged allocations
rollback preserves the previous active session
result and journal record every terminal path
```

## Storage policy

```txt
storage keys are candidate locations, not save identities
localStorage/sessionStorage precedence is resolved separately
writes use a temporary key then verified promotion when possible
read failures, quota failures and parse failures are typed
removal is explicit and never a side effect of failed admission
```

## Observation policy

Public persistence readback may expose:

```txt
selected candidate metadata
schema/content versions
checkpointId and fingerprint
last save/load result
resume epoch
bounded journal
```

It must not expose:

```txt
raw storage handles
live campaign maps or arrays
DOM/WebGL/audio objects
mutable lifecycle owners
unredacted malformed payloads
```

## Compatibility policy

A migration may transform an older supported schema into the current canonical envelope. It may not silently reinterpret unknown content, drop authoritative fields without a declared rule or commit a partially migrated graph.
