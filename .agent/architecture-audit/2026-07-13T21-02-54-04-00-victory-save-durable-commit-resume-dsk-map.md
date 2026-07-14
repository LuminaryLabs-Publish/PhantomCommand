# Victory Save Durable Commit and Resume DSK Map

**Timestamp:** `2026-07-13T21-02-54-04-00`

## Summary

Persistence mechanics remain in the browser-storage owner. Campaign outcome semantics remain in the campaign runtime. A composition authority must join outcome revision, canonical save preparation, durable promotion, Continue projection, resume admission and visible proof.

## Plan ledger

**Goal:** define bounded ownership and the smallest coordinating domain needed for reliable persistence.

- [x] Preserve menu, campaign, render and storage owners.
- [x] Define identity, schema, commit, admission, result and proof surfaces.
- [x] Keep storage implementation and gameplay semantics outside the coordinator.
- [ ] Implement later.

## Ownership

```txt
pixel-campaign-runtime-kit
  owns campaign state, victory conditions and reconstruction inputs
menu-save-presence-kit
  owns menu projection of admitted save availability
browser storage adapter
  owns localStorage/sessionStorage mechanics and exceptions
pixel-campaign-render-kit
  owns visible outcome and resumed-state projection
persistence authority
  owns generation identity, preparation, validation, promotion, result correlation and proof
```

## DSK tree

```txt
phantom-command-victory-save-durable-commit-resume-authority-domain
  identity
    campaign-session-id-kit
    campaign-state-revision-kit
    campaign-save-version-kit
  preparation
    campaign-save-schema-kit
    campaign-save-candidate-kit
    campaign-save-fingerprint-kit
    resume-state-reconstruction-kit
  validation
    campaign-save-validation-kit
    storage-failure-classification-kit
    save-candidate-quarantine-kit
  commit
    campaign-save-staging-kit
    campaign-save-readback-kit
    campaign-save-promotion-kit
  commands and results
    campaign-outcome-command-kit
    campaign-outcome-result-kit
    campaign-save-commit-result-kit
    resume-command-kit
    resume-admission-result-kit
  projection and proof
    continue-capability-projection-kit
    first-durable-outcome-frame-ack-kit
    first-resumed-frame-ack-kit
    storage-failure-fixture-kit
    source-build-pages-persistence-fixture-kit
```

## Composition rule

Victory may be simulated before persistence, but the visible outcome must classify durability. Continue may be enabled only from a parsed, validated and compatible save generation. Resume must reconstruct the same accepted generation before the route claims readiness.