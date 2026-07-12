# Campaign Action Result Authority DSK Map

**Timestamp:** `2026-07-12T18-11-53-04-00`

## Summary

The campaign has action behavior but no action authority. `startWave`, `build`, `selectAt`, `order`, keyboard mutations and public `GameHost` methods operate directly on shared state and publish no command or terminal result.

## Parent domain

```txt
phantom-command-campaign-action-result-authority-domain
```

## Domain boundary

The parent owns campaign action identity, source, schema, capability, expected revisions, admission, preparation, atomic commit, rollback, terminal results, observations and visible-frame correlation. It does not own combat algorithms, rendering implementation or menu routing.

## Composition

```txt
identity
  campaign-session-id-kit
  campaign-session-generation-kit
  campaign-state-revision-kit
  campaign-action-id-kit
  campaign-action-sequence-kit

intent
  campaign-action-source-kind-kit
  campaign-action-kind-kit
  campaign-action-command-kit
  campaign-action-payload-schema-kit
  campaign-action-capability-kit

admission
  campaign-action-admission-kit
  campaign-phase-revision-kit
  campaign-selection-revision-kit
  campaign-economy-revision-kit
  campaign-pad-revision-kit
  campaign-target-revision-kit
  stale-campaign-action-rejection-kit
  duplicate-campaign-action-rejection-kit

transaction
  campaign-action-plan-kit
  campaign-action-prepare-kit
  campaign-action-commit-kit
  campaign-action-rollback-kit
  campaign-action-change-set-kit

result and proof
  campaign-action-result-kit
  campaign-action-observation-kit
  campaign-action-journal-kit
  campaign-action-visible-frame-ack-kit
  campaign-action-source-fixture-kit
  campaign-action-rejection-fixture-kit
  campaign-action-idempotency-fixture-kit
  public-gamehost-action-fixture-kit
  browser-campaign-action-smoke-kit
  pages-campaign-action-smoke-kit
```

## Existing owners to update

```txt
src/campaign/campaign-scene.js
pixel-campaign-runtime-kit
fixed-step-campaign-simulation-kit
pixel-campaign-render-kit
legacy-gamehost-diagnostics-kit
campaign-static-check-kit
scripts/check-campaign.mjs
package.json
```

## Command contract

```txt
CampaignActionCommand {
  actionId
  sequence
  sourceKind
  capabilityId?
  sessionId
  sessionGeneration
  actionKind
  payload
  expectedCampaignRevision
  expectedPhaseRevision
  expectedSelectionRevision?
  expectedEconomyRevision?
  expectedPadRevision?
  expectedTargetRevision?
}
```

## Result contract

```txt
CampaignActionResult {
  actionId
  status
  reason?
  predecessorRevision
  successorRevision
  changedResources[]
  selectedIdsAdded[]
  selectedIdsRemoved[]
  economyDelta?
  createdEntityIds[]
  removedEntityIds[]
  phaseDelta?
  messageDelta?
  committedAtStep?
}
```

## Required invariants

```txt
one action ID has one terminal result
all rejection paths perform zero mutation
multi-resource build and wave mutations commit atomically
stale phase, selection, economy, pad and target evidence rejects
public and browser sources are distinguishable
results carry predecessor/successor revisions
renderer and public readback consume committed results
first visible frame acknowledges the committed result
```

## Dependency position

```txt
Runtime Session Resource Lifecycle Authority
  -> Campaign Action Result Authority
  -> Campaign World-Pointer Admission Authority
  -> Campaign Phase Admission Authority
  -> Fixed-Step Command Scheduling Replay Authority
  -> Public Host Committed Read Model
```

No new runtime kit should be added before determining whether the existing campaign runtime, simulation, render and diagnostics owners can implement these responsibilities.