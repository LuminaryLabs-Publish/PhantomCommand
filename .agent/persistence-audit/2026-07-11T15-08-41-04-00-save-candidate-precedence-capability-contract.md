# Persistence Audit: Save Candidate Precedence and Continue Capability Contract

**Timestamp:** `2026-07-11T15-08-41-04-00`

## Summary

PhantomCommand has three historical key names and two browser storage layers, but no save format registry or candidate precedence contract. The only active writer produces a completion summary, while the menu treats every nonempty value as resumable.

## Plan ledger

**Goal:** distinguish storage presence, candidate validity, completion evidence and resumable checkpoint state before any payload can enable Continue or enter campaign startup.

- [x] Enumerate keys, storage layers and current writer.
- [x] Separate completion summary from resumable checkpoint semantics.
- [x] Define candidate kinds and typed results.
- [x] Define deterministic precedence and failure behavior.
- [x] Define startup revalidation and hydration requirements.
- [ ] Implement persistence authority and migrations.

## Current storage surface

```txt
keys:
  phantomCommand.save
  nexus.sceneSnapshot
  phantom.command.campaign

layers:
  localStorage
  sessionStorage
```

## Current active writer

```txt
key: phantomCommand.save
layer: localStorage
trigger: final-wave victory branch
payload:
  scene
  souls
  wave
```

The writer returns no typed success/failure result and swallows storage errors.

## Candidate kinds

```txt
resumable-checkpoint
completion-summary
legacy-resumable-snapshot
legacy-completion-summary
unsupported-payload
malformed-payload
```

Only a supported `resumable-checkpoint` or explicitly migratable `legacy-resumable-snapshot` may enable Continue.

## Required candidate envelope

```txt
schema
schemaVersion
candidateKind
checkpointId
campaignContentId
campaignContentRevision
capturedAt
runId
runEpoch
simulationTickId
commandCursor
phase
terminalResultId
stateFingerprint
payload
```

## Required slot read result

```txt
slotId
key
storageLayer
status
rawHash
byteLength
errorCode
```

## Required candidate classification result

```txt
candidateId
slotId
kind
status
schemaVersion
contentRevision
capturedAt
stateFingerprint
reason
migratable
```

## Precedence policy

A versioned policy must rank only valid or migratable candidates. Suggested order:

```txt
1. supported resumable checkpoint matching current content
2. migratable resumable checkpoint
3. supported legacy resumable snapshot
4. completion summaries as non-Continue evidence only
5. unsupported or malformed payloads rejected
```

Within the same class:

```txt
newer committed tick
  > newer capturedAt
  > explicit storage-layer preference
  > stable slot ID tie-break
```

The exact order is less important than being declared, versioned and fixture-backed.

## Failure behavior

```txt
one slot denied -> record denial, continue evaluating others
one slot malformed -> reject candidate, continue evaluating others
higher-priority slot invalid -> valid lower slot may still win
all candidates invalid -> Continue disabled with typed reason
candidate changes after resolution -> startup rejects stale fingerprint
```

## Startup revalidation

Campaign startup must not trust the menu's stale in-memory candidate. It must:

```txt
re-read exact selected slot
compare raw hash
reparse and reclassify
compare candidate ID and fingerprint
verify content revision
prepare detached hydration
commit atomically or fail unchanged
```

## Completion summary policy

The current `{ scene, souls, wave }` record can be retained as completion evidence, but must be renamed or classified so it cannot claim mid-run resumability. It may support future unlock or chapter-select behavior.

## Required persistence fixtures

```txt
all slots empty
malformed JSON
unsupported schema
completion summary only
valid checkpoint only
valid checkpoint plus newer completion summary
valid lower slot plus malformed higher slot
same candidate in local and session
conflicting valid candidates
storage denial
candidate mutation between menu and startup
hydration rollback
```

## Validation boundary

Documentation only. No storage key, payload or write behavior changed.