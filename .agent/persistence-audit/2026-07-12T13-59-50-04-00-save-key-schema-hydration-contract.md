# Save-Key, Schema and Hydration Contract

**Timestamp:** `2026-07-12T13-59-50-04-00`

## Summary

PhantomCommand currently treats three storage keys across two browser storage scopes as interchangeable save evidence. The campaign writes only one minimal unversioned payload and never reads any payload. This audit defines ownership, schema, migration and atomic hydration requirements.

## Plan ledger

**Goal:** replace ambient storage presence with one owned, versioned and verifiable campaign persistence contract.

- [x] Inventory probed keys and storage scopes.
- [x] Inventory the campaign writer payload.
- [x] Identify missing schema, version, validation and migration behavior.
- [x] Define candidate-graph and commit requirements.
- [ ] Implement persistence adapters and fixtures.

## Current key registry

```txt
phantomCommand.save
nexus.sceneSnapshot
phantom.command.campaign
```

The menu checks each key in both `localStorage` and `sessionStorage`. It does not identify which scope or key matched and does not parse the bytes.

## Current writer

```json
{
  "scene": "grave-ring",
  "souls": 0,
  "wave": 6
}
```

The actual values vary, but the shape contains only `scene`, `souls` and `wave`. There is no schema name, version, content fingerprint, created timestamp, committed tick, checksum or complete campaign graph.

## Required owned key policy

```txt
primary key: phantomCommand.campaign.v1
storage scope: explicit localStorage by default
legacy keys: read-only migration adapters
sessionStorage: separate ephemeral-session policy, never implicit fallback
```

A key registry must return ownership and compatibility metadata rather than one boolean.

## Required envelope

```txt
CampaignSaveEnvelope
  schema: phantom-command.campaign
  version
  saveId
  createdAtMs
  updatedAtMs
  contentFingerprint
  committedTick
  bootstrapRevision
  stateFingerprint
  payload
```

## Required payload

```txt
phase
simulation time
economy and core
wave and spawn queue
units with IDs and references
towers with IDs and pad references
pads or deterministic pad-occupancy projection
projectiles with IDs and targets
selection and tower type
camera
next ID counters
explicit transient policy
```

## Read pipeline

```txt
read bytes
  -> identify key and scope
  -> parse JSON
  -> validate envelope schema
  -> validate version
  -> verify fingerprint
  -> migrate when supported
  -> validate referential integrity and numeric bounds
  -> build detached candidate
  -> commit atomically
```

## Failure behavior

```txt
missing bytes -> Missing
malformed JSON -> Malformed
foreign schema -> Foreign
unsupported version -> UnsupportedVersion
fingerprint mismatch -> Corrupt
invalid references -> InvalidGraph
storage exception -> StorageUnavailable
candidate failure -> FailedCandidate
```

None of these failures may partially mutate the live campaign or silently fall back to Continue-as-New unless the policy explicitly returns that result.

## Write pipeline

```txt
capture one committed campaign snapshot
  -> canonicalize and fingerprint
  -> serialize versioned envelope
  -> write to selected scope
  -> read back or receive adapter receipt
  -> publish CampaignSaveWriteResult
  -> only then project Saved/Continue availability
```

## Migration policy

The three existing keys must not remain permanently co-equal. Each requires one of:

```txt
owned current key
supported legacy adapter
foreign key rejection
explicit quarantine and user-facing recovery option
```

## Completion boundary

A truthy storage string is not a save. Completion requires an owned key, versioned envelope, complete payload, typed read/write results, atomic hydration and migration fixtures.