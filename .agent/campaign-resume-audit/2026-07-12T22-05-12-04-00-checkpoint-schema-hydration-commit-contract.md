# Campaign Checkpoint Schema, Hydration and Commit Contract

**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Timestamp:** `2026-07-12T22-05-12-04-00`

## Summary

The existing victory record is a completion marker, not a resumable campaign checkpoint. A valid resume contract needs a canonical envelope, explicit participant coverage, deterministic transient-state policy, detached hydration, invariant validation, atomic installation and rollback evidence.

## Plan ledger

**Goal:** define the minimum durable and runtime contract required for truthful Continue behavior.

- [x] Classify the current three-field record as non-resumable.
- [x] Define envelope identity and compatibility fields.
- [x] Define required participant coverage.
- [x] Define migration and validation responsibilities.
- [x] Define atomic commit and rollback receipts.
- [x] Define fixture expectations.
- [ ] Implement the contract later.

## Current record

```txt
key: phantomCommand.save
written: final victory only
shape:
  scene
  souls
  wave
```

Missing:

```txt
schema/version
checksum
checkpoint and run identity
source-build fingerprint
complete simulation and entity state
camera and interaction state
participant reset policy
write/read receipts
migration
validation
atomic install
rollback proof
```

## Canonical envelope

```txt
CampaignCheckpointEnvelope {
  schema: phantom-command.campaign-checkpoint
  schemaVersion
  checkpointId
  checkpointRevision
  runId
  runGeneration
  createdAt
  sourceFingerprint
  authoredContentFingerprint
  stateFingerprint
  checksum
  participantManifest
  participants
}
```

## Required participant coverage

```txt
campaign:
  time, souls, core, wave, waveActive, spawn, paused, won, lost, message

units:
  complete unit records including IDs, type, team, position, HP, cooldown,
  animation, action, target, move and authored archetype reference

towers:
  complete tower records and tower-type references

pads:
  pad ID to tower ID occupancy map

projectiles:
  complete records or explicit deterministic reset policy

effects:
  complete records or explicit presentation-only reset policy

identities:
  uid, pid, tid or successor-allocation counters proven collision-free

selection:
  selected unit IDs, selected pad and active tower type

camera:
  x, z, zoom, targetZoom, velocity and limits/policy revision

simulation:
  fixed-step boundary, accumulator policy and scheduler generation linkage
```

## Compatibility checks

```txt
schema is recognized
version is directly supported or has an explicit migration chain
checksum and state fingerprint validate
authored scene and content fingerprints match or have migration policy
all participant names are known
all required participants are present
all IDs are unique
all references resolve
all numeric fields are finite and within policy
balances and core are within admitted ranges
wave/spawn state agrees with authored wave catalog
outcome flags are mutually coherent
```

## Hydration contract

```txt
read raw slot
  -> return Missing | ReadFailed | Bytes
  -> parse detached envelope
  -> validate immutable envelope metadata
  -> migrate detached data if required
  -> create detached participant candidates
  -> validate each candidate
  -> validate cross-participant references
  -> compute successor fingerprint
  -> return CandidateReady
```

No live campaign object may be mutated during read, parse, migration or candidate validation.

## Commit contract

```txt
CampaignBootstrapCommit {
  commandId
  predecessorRunGeneration
  successorRunGeneration
  checkpointId
  checkpointRevision
  participantCandidates
  expectedStateFingerprint
}

commit
  -> verify predecessor and command are current
  -> install every participant under one successor generation
  -> publish one terminal result
  -> retire predecessor exactly once

failure
  -> preserve predecessor or execute verified rollback
  -> report actual rollback result
  -> start no simulation and publish no successor frame
```

## Continue availability

The menu must not scan raw keys. It should consume:

```txt
ContinueAvailabilityResult {
  available
  checkpointId | null
  checkpointRevision | null
  schemaVersion | null
  sourceCompatibility
  reason | null
}
```

## Required fixtures

```txt
fresh new preset fingerprint
full checkpoint roundtrip
non-default economy/wave/entity/camera restore
missing slot
malformed JSON
wrong schema
unsupported version
checksum mismatch
content fingerprint mismatch
missing participant
broken entity reference
ID-counter collision
commit failure and verified rollback
duplicate/stale bootstrap command
first visible restored frame
source/build/Pages parity
```

## Validation boundary

No save schema, storage behavior, hydration or campaign runtime changed. No checkpoint fixture was executed.