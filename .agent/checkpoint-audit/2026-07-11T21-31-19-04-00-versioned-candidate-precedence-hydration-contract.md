# Checkpoint Audit: Versioned Candidate Precedence and Hydration Contract

**Timestamp:** `2026-07-11T21-31-19-04-00`

## Summary

PhantomCommand needs to distinguish terminal summaries, compatible checkpoints, foreign data and corrupt bytes before enabling Continue. Browser storage is an input boundary, not an authoritative campaign graph.

## Plan ledger

**Goal:** define a non-destructive, versioned and deterministic save admission contract.

- [x] Inventory current keys and scopes.
- [x] Classify the current victory payload.
- [x] Define envelope and candidate results.
- [x] Define precedence and migration requirements.
- [x] Define atomic hydration and rollback.
- [ ] Implement schemas and fixtures.

## Current candidates

```txt
phantomCommand.save
nexus.sceneSnapshot
phantom.command.campaign
```

Each can exist in:

```txt
localStorage
sessionStorage
```

## Proposed envelope

```json
{
  "schemaVersion": 1,
  "gameId": "phantom-command",
  "campaignId": "grave-ring",
  "contentRevision": "<stable content fingerprint>",
  "checkpointId": "<unique id>",
  "checkpointKind": "wave-boundary",
  "runEpoch": 3,
  "stateRevision": 118,
  "stateFingerprint": "<canonical fingerprint>",
  "payload": {}
}
```

## Precedence policy

A deterministic policy must be explicit and fixture-backed. Recommended order:

```txt
1. valid canonical phantomCommand.save envelope
2. valid supported legacy phantom.command.campaign candidate after migration
3. valid game-owned nexus.sceneSnapshot adapter candidate
4. otherwise no resumable candidate
```

Within one source, select by compatible schema, content identity, state revision and deterministic tie-breaker. Do not use browser object enumeration order or timestamp alone.

## Current summary classification

```txt
{ scene, souls, wave }
  -> LEGACY_TERMINAL_SUMMARY
  -> may preserve completion metadata
  -> must not enable active-run Continue
```

## Hydration requirements

```txt
parse and validate detached data
construct candidate state off-line
allocate or validate entity and projectile IDs
restore pad/tower references
restore unit targets only when referenced entities exist
restore spawn rows under checkpoint-kind policy
rebuild derived selections and indexes
validate economy, core, wave and terminal consistency
compute canonical fingerprint
commit one run epoch atomically
rollback all staged ownership on failure
```

## Non-destructive failure rule

Malformed, unsupported or semantically invalid candidates remain untouched. The resolver may publish a bounded diagnostic, but it must not replace raw bytes with defaults during discovery or failed resume.
