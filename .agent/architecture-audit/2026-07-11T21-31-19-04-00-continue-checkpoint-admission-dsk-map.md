# Architecture Audit: Continue and Checkpoint Admission DSK Map

**Timestamp:** `2026-07-11T21-31-19-04-00`

## Summary

The menu currently owns a Boolean save-presence check while the campaign owns a fresh default constructor. No domain connects those surfaces. The required composition owns candidate resolution, route intent, atomic hydration and resumed-frame evidence without taking ownership away from campaign simulation or rendering.

## Plan ledger

**Goal:** map one DSK/domain boundary from raw browser storage to a committed campaign generation.

- [x] Identify current menu and campaign owners.
- [x] Identify missing candidate and admission results.
- [x] Define coordinating kits.
- [x] Define dependency and ownership rules.
- [ ] Implement the composition.

## Parent domain

```txt
phantom-command-continue-checkpoint-admission-authority-domain
```

## DSK map

```txt
save-candidate-dsk
  -> key registry
  -> storage-scope provenance
  -> raw read result
  -> detached parse
  -> candidate classification
  -> deterministic precedence

checkpoint-contract-dsk
  -> schema version
  -> game and campaign identity
  -> content revision
  -> checkpoint kind
  -> migration registry
  -> structural and semantic validation
  -> state fingerprint

campaign-start-dsk
  -> NEW or RESUME route intent
  -> expected candidate identity
  -> startup admission
  -> staged campaign graph
  -> reference and ID rebuild
  -> atomic run-epoch commit
  -> CampaignStartResult

resume-observation-dsk
  -> selected candidate provenance
  -> checkpoint fingerprint
  -> committed run epoch
  -> first resumed-frame acknowledgement
  -> bounded journal
```

## Candidate kits

```txt
phantom-command-campaign-route-intent-kit
phantom-command-save-key-registry-kit
phantom-command-save-candidate-read-kit
phantom-command-save-envelope-version-kit
phantom-command-save-content-identity-kit
phantom-command-save-candidate-classification-kit
phantom-command-save-candidate-precedence-kit
phantom-command-save-schema-validator-kit
phantom-command-save-semantic-validator-kit
phantom-command-save-migration-registry-kit
phantom-command-corrupt-save-quarantine-kit
phantom-command-continue-capability-result-kit
phantom-command-new-campaign-admission-kit
phantom-command-resume-admission-kit
phantom-command-checkpoint-kind-policy-kit
phantom-command-checkpoint-fingerprint-kit
phantom-command-atomic-campaign-hydration-kit
phantom-command-resume-result-kit
phantom-command-first-resumed-frame-kit
phantom-command-resume-observation-kit
phantom-command-resume-journal-kit
phantom-command-save-candidate-fixture-kit
phantom-command-continue-route-fixture-kit
phantom-command-resume-first-frame-fixture-kit
```

## Ownership rules

```txt
menu owns projection of ContinueCapabilityResult
persistence domain owns raw candidate admission and checkpoint contracts
campaign factory owns new-state construction and hydrated graph staging
simulation remains owner of live campaign mutation
renderer remains owner of visible-frame submission
resume authority owns correlation only
```

## Dependency rule

Continue admission must precede all command, combat, terminal and lifecycle work for a resumed run. Versioned checkpoint capture can evolve later, but no save may be advertised as resumable until this admission boundary classifies it as `RESUMABLE`.
