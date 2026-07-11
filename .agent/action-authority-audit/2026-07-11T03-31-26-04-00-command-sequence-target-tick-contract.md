# Command Sequence and Target Tick Contract

**Timestamp:** `2026-07-11T03-31-26-04-00`

## Authority statement

A campaign request is not authoritative when a DOM callback or `GameHost` method mutates `state`. Authority begins when one admitted campaign session assigns a command ID, monotonic sequence, and deterministic target tick, and ends when one terminal result and one committed-state fingerprint are published.

## Required state

```txt
sessionId
nextCommandSequence
currentSimulationTick
pendingCommandsByTick
appliedCommandJournal
commandResultJournal
domainEventJournal
lastStateFingerprint
lastCommittedFrameId
```

## Target-tick policy

Initial policy:

```txt
request observed before tick application
  -> target currentSimulationTick + 1

multiple requests before the same tick
  -> same target tick
  -> apply in monotonic sequence order

request observed during command application
  -> target following tick

duplicate command ID
  -> return prior terminal result
  -> do not apply again
```

The policy must be independent of browser event timestamps and requestAnimationFrame cadence.

## Preflight boundary

Preflight receives:

```txt
immutable target-tick state
command envelope
content descriptors
```

It returns:

```txt
accepted application plan
or rejected/no-op terminal result
```

It must not mutate state, consume souls, create IDs, append effects, alter selection, or start a spawn queue.

## Application boundary

Application may mutate only through the accepted plan and must record:

```txt
appliedTick
changed paths
allocated entity IDs
ordered domain events
post-state fingerprint
```

## Journal bounds

Use bounded journals with explicit dropped-row counts. Journal truncation must never alter command sequence, replay state, or fingerprints.

## Replay contract

```txt
initial session snapshot
  + ordered command envelopes
  + deterministic content descriptors
  -> identical terminal results
  -> identical event order
  -> identical tick fingerprints
  -> identical final state fingerprint
```

Camera-only presentation commands may use a separate presentation journal, but their classification and committed-frame attribution must still be explicit.

## Compatibility gate

Do not change current controls or balance while introducing this authority. Add adapters around existing behavior first, then move mutation behind fixed-step application after fixtures prove result parity.