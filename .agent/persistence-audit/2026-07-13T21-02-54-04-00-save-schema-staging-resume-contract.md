# Save Schema Staging and Resume Contract

**Timestamp:** `2026-07-13T21-02-54-04-00`

## Summary

The current `phantomCommand.save` value is an unversioned completion marker. Reliable persistence requires a canonical manifest, staged write, verified readback, atomic promotion, compatibility admission and deterministic resume contract.

## Plan ledger

**Goal:** define the persistence contract without changing browser storage behavior in this run.

- [x] Classify current records as unversioned and non-resumable.
- [x] Define canonical identity and schema fields.
- [x] Define staging, verification, promotion and quarantine states.
- [x] Define resume admission and reconstruction evidence.
- [ ] Implement and test later.

## Canonical manifest

```txt
schema: phantom-command.campaign-save.v1
saveGeneration
campaignSessionId
campaignDefinitionVersion
createdAtRevision
outcome
checkpointPolicy
stateFingerprint
payload
```

## Commit protocol

```txt
prepare canonical candidate
  -> validate all fields and deterministic reconstruction evidence
  -> write staging key
  -> read staging key back
  -> compare fingerprint and generation
  -> promote to canonical key
  -> remove staging key
  -> publish commit result
```

## Admission protocol

```txt
read canonical candidate
  -> parse
  -> validate schema and ranges
  -> compare campaign definition compatibility
  -> migrate, admit, quarantine or reject
  -> derive Continue capability
```

## Recovery policy

```txt
staging exists and canonical absent
  -> verify staging and promote or quarantine
canonical malformed
  -> quarantine raw evidence and disable Continue
storage unavailable
  -> classify session as non-durable and render that status
old marker-only save
  -> classify incompatible or migrate only through an explicit bounded rule
```

## Invariant

No route may claim a resumed campaign from raw key presence. No victory may claim durability without a verified promoted generation.