# Campaign Bootstrap and Continue Resume Authority DSK Map

**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Timestamp:** `2026-07-12T22-05-12-04-00`

## Summary

The menu currently owns save presence and route intent while the campaign module independently owns state construction. No domain joins those surfaces into a validated bootstrap transaction. This map defines one authority that selects New or Continue, constructs a detached complete candidate, validates cross-domain invariants, installs one run generation atomically and proves the first matching frame.

## Plan ledger

**Goal:** place route intent, durable checkpoint admission, participant hydration, atomic installation, rollback and visible-frame proof under one parent domain while retaining existing campaign, simulation, input and renderer ownership.

- [x] Keep menu presentation and navigation in menu-route-kit.
- [x] Keep combat and fixed-step updates in fixed-step-campaign-simulation-kit.
- [x] Keep drawing and CRT effects in pixel-campaign-render-kit and crt-renderer-kit.
- [x] Give bootstrap/resume one command/result boundary.
- [x] Require complete participant registration and cross-reference validation.
- [x] Require atomic installation, rollback and generation fencing.
- [x] Require explicit New, ContinueUnavailable, Invalid, Unsupported and Restored results.
- [x] Require first visible generation-frame proof.
- [ ] Implement proposed kits later.

## Parent domain

```txt
phantom-command-campaign-bootstrap-resume-authority-domain
```

## Ownership boundary

```txt
owns:
  campaign entry intent
  bootstrap command identity and admission
  run ID and generation allocation
  canonical save slot selection
  checkpoint envelope, schema, checksum and source fingerprint
  migration registry
  participant manifest and detached candidate construction
  hydration and cross-participant validation
  atomic install, rollback and predecessor retirement
  stale and duplicate result rejection
  bootstrap observations, journal and first-frame receipt

does not own:
  menu artwork or fade rendering
  campaign action semantics
  pointer projection or selection geometry
  fixed-step combat progression
  CRT shader effects
  storage adapter implementation below typed read/write results
  deployment
```

## Candidate kit composition

### Intent and identity

```txt
campaign-entry-intent-kit
campaign-bootstrap-command-id-kit
campaign-bootstrap-command-kit
campaign-bootstrap-admission-kit
campaign-run-id-kit
campaign-run-generation-kit
campaign-checkpoint-id-kit
campaign-checkpoint-revision-kit
```

### Storage and compatibility

```txt
campaign-save-slot-id-kit
campaign-save-envelope-kit
campaign-save-schema-version-kit
campaign-save-checksum-kit
campaign-save-source-fingerprint-kit
campaign-save-read-result-kit
campaign-save-migration-registry-kit
campaign-continue-availability-kit
```

### Candidate construction

```txt
campaign-new-run-preset-kit
campaign-participant-registry-kit
campaign-participant-snapshot-kit
campaign-candidate-state-kit
campaign-state-hydration-kit
campaign-state-validation-kit
```

### Commit lifecycle

```txt
campaign-bootstrap-commit-kit
campaign-bootstrap-rollback-kit
campaign-predecessor-retirement-kit
stale-campaign-bootstrap-rejection-kit
duplicate-campaign-bootstrap-rejection-kit
campaign-bootstrap-result-kit
```

### Observation and proof

```txt
campaign-bootstrap-observation-kit
campaign-bootstrap-journal-kit
first-campaign-generation-frame-ack-kit
campaign-fresh-run-fixture-kit
campaign-continue-roundtrip-fixture-kit
campaign-invalid-save-fixture-kit
campaign-unsupported-version-fixture-kit
campaign-partial-checkpoint-rejection-fixture-kit
campaign-build-pages-resume-parity-fixture-kit
```

## State machine

```txt
IDLE
  -> ADMITTING(command, entryIntent)

ADMITTING(new)
  -> BUILDING_FRESH(candidateGeneration)

ADMITTING(continue)
  -> READING_SLOT
  -> VALIDATING_ENVELOPE
  -> MIGRATING when required
  -> HYDRATING(candidateGeneration)

BUILDING_FRESH | HYDRATING
  -> VALIDATING_CANDIDATE
  -> COMMITTING

COMMITTING
  -> ACTIVE(successorGeneration)
  -> ROLLED_BACK(predecessor preserved)

any pre-commit phase
  -> REJECTED(unavailable | invalid | unsupported | stale | duplicate)
```

## Participant manifest

A resumable checkpoint must declare every mutable participant or an explicit reset policy:

```txt
campaign metadata:
  run ID, generation, checkpoint ID/revision, schema, source fingerprint

simulation:
  time, fixed-step boundary, wave, waveActive, spawn queue

economy and objective:
  souls, core, won, lost, message

entities:
  units, towers, projectiles, effects, uid, pid, tid

world references:
  pad tower occupancy and authored content fingerprint

interaction/presentation:
  selected IDs, selected pad, tower type, pause state
  camera position, velocity, zoom and target zoom
```

Transient participants such as projectiles or effects may be intentionally reset only when the checkpoint policy records that decision and hydration validates the resulting step boundary.

## Admission invariants

```txt
New and Continue are distinct typed intents
Continue never silently falls back to New
Continue availability derives from validated compatibility, not string presence
one bootstrap command has one terminal result
one active run generation exists
all participant snapshots cite the same run/checkpoint identity
restored unit, tower and projectile IDs are unique
ID counters exceed all restored IDs
pad occupancy and tower records are reciprocal
selection references only existing allied units
spawn queue entries reference authored wave/archetype content
failed validation mutates no installed participant
predecessor retirement occurs exactly once after successor commit
first world/HUD/minimap/CRT frame cites the committed generation
```

## Required coordination

```txt
menu-save-presence-kit
  -> request ContinueAvailabilityResult
  -> do not inspect raw storage truthiness

menu-route-kit
  -> emit CampaignEntryIntent
  -> show typed unavailable/invalid feedback

pixel-campaign-runtime-kit
  -> expose participant construct/snapshot/validate/install contracts
  -> stop module-evaluation side effects from defining authority

fixed-step-campaign-simulation-kit
  -> admit stepping only after ACTIVE generation commit

pixel-campaign-render-kit
  -> render committed generation only
  -> publish first-frame acknowledgement

legacy-gamehost-diagnostics-kit
  -> expose immutable bootstrap result/read model
  -> expose no raw candidate or mutable participant handles
```

## Completion boundary

The domain is not complete when storage parses or state objects are assigned. Completion requires one validated committed generation, verified predecessor handling, a terminal bootstrap result and the first visible frame citing that same result.