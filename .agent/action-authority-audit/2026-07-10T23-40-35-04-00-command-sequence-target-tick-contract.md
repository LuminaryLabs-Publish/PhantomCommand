# PhantomCommand Command Sequence and Target Tick Contract

**Timestamp:** `2026-07-10T23-40-35-04-00`

## Intent

Define one deterministic admission contract for every campaign-state request before the existing fixed-step simulation mutates state.

## Command envelope

```txt
CampaignCommand
  schema: phantom-command.campaign-command.v1
  commandId
  sessionId
  sequence
  source
  sourceEventId
  kind
  targetTick
  payload
```

## Sequence rules

```txt
- sequence is monotonic within one campaign session
- sequence is allocated before preflight
- rejected and no-op requests consume a sequence
- sequence never depends on wall-clock time
- replay preserves original sequence values
- duplicate command IDs are rejected with duplicate-command
- stale session IDs are rejected with stale-session
```

## Target tick rules

```txt
- browser and compatibility-host commands default to committedTick + 1
- explicit replay ticks must be integers greater than the committed tick
- commands for a past or already-drained tick are rejected as stale-command
- commands are drained by targetTick then sequence
- all commands assigned to one tick complete before simulation systems advance that tick
- results record both targetTick and appliedTick
```

## Result contract

```txt
CampaignCommandResult
  schema: phantom-command.campaign-command-result.v1
  commandId
  sessionId
  sequence
  kind
  targetTick
  appliedTick
  status: accepted | rejected | no-op
  reason
  beforeFingerprint
  afterFingerprint
  eventIds
```

## Preflight ownership

Preflight is pure and reads one committed state snapshot.

```txt
selection commands
  -> validate referenced units and requested selection policy

pad selection
  -> validate pad identity

build request
  -> validate selected or explicit pad
  -> validate tower type
  -> validate vacancy
  -> validate souls
  -> validate non-terminal campaign

unit order
  -> validate selected unit identities
  -> validate destination or target
  -> validate non-terminal campaign

wave start
  -> validate inactive wave
  -> validate remaining wave script
  -> validate non-terminal campaign
```

## Application ownership

Application happens only after accepted preflight at the target tick.

```txt
- allocate tower, unit, projectile, and event IDs from state-owned counters
- perform mutation once
- emit ordered events
- calculate afterFingerprint
- publish the result
```

## Reason vocabulary

```txt
accepted
selection-unchanged
no-selection
unit-not-found
pad-not-found
pad-already-selected
pad-occupied
unsupported-tower-type
insufficient-souls
invalid-destination
target-not-found
wave-already-active
wave-script-exhausted
campaign-terminal
unsupported-command
duplicate-command
stale-command
stale-session
session-not-running
```

## Fingerprint contract

The canonical fingerprint includes simulation-authoritative values in stable order:

```txt
session seed and source revision
tick and sequence counters
economy and sanctum health
wave state and spawn queue
units, towers, projectiles, and effects sorted by ID
pad occupancy
selection and selected pad
campaign flags and message
ID counters
```

It excludes browser timestamps, canvas size, pointer location, and CRT animation time.

## Journal limits

```txt
command journal: last 512 rows
result journal: last 512 rows
event journal: last 2048 rows
committed frame journal: last 120 rows
render consumption journal: last 240 rows
```

Limits may be tuned, but eviction must be deterministic and expose first/last retained sequence.

## Compatibility policy

```txt
GameHost.startWave()
  -> submit wave.start
  -> return command receipt

GameHost.build()
  -> submit build.request for the currently selected pad
  -> return command receipt

legacy mutable state and camera fields
  -> retain temporarily
  -> mark non-authoritative
  -> never use them in fixtures
```

## Deterministic fixture assertions

```txt
- repeated fixture runs produce identical results, events, IDs, and fingerprints
- rejected commands preserve beforeFingerprint == afterFingerprint
- two commands for one tick apply by sequence
- a command near a browser accumulator boundary targets the same tick in replay
- terminal state rejects later gameplay commands consistently
- clone mutation of returned journals cannot alter internal state
```
