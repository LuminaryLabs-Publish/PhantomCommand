# PhantomCommand Next Steps

**Timestamp:** `2026-07-12T18-11-53-04-00`

## Summary

The next implementation boundary is Campaign Action Result Authority. Replace void campaign helpers and direct public mutations with one command path that validates expected revisions, returns one terminal result and correlates committed actions with the first visible campaign frame.

## Plan ledger

**Goal:** implement one deterministic campaign action transaction from intent through admission, detached planning, atomic commit, terminal result and visible proof.

- [ ] Introduce campaign session identity and generation.
- [ ] Add one monotonic campaign revision.
- [ ] Add phase, selection, economy, pad, target and camera revisions where required.
- [ ] Define `CampaignActionCommand` and action-kind payload schemas.
- [ ] Give browser, accessibility, public host, replay and fixture paths explicit source identities.
- [ ] Allocate stable action IDs and sequences.
- [ ] Reject duplicate action IDs without repeating mutation.
- [ ] Reject stale expected revisions.
- [ ] Replace direct `startWave()` mutation with a planned action transaction.
- [ ] Replace direct `build()` mutation with an atomic pad/economy/tower/effect/message transaction.
- [ ] Replace `selectAt()` with typed selection and build results.
- [ ] Replace `order()` with typed selection/target admission and per-unit change sets.
- [ ] Route tower-type, pause, restart and camera actions through the command path.
- [ ] Replace raw `GameHost` mutators with typed public command admission.
- [ ] Return one terminal `CampaignActionResult` for every action.
- [ ] Guarantee zero mutation for every rejected path.
- [ ] Add commit rollback for participant failure.
- [ ] Publish detached action observations and a bounded journal.
- [ ] Project HUD feedback and public readback from committed results.
- [ ] Add first-visible-action-frame acknowledgement.
- [ ] Add headless action, rejection, stale, duplicate and rollback fixtures.
- [ ] Add browser source, built-output and Pages parity fixtures.
- [ ] Run `npm run check` and `npm run build` after fixture wiring.

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
game.html
```

## Command shape

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

## Result shape

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

## Required terminal statuses

```txt
Committed
RejectedInvalidSchema
RejectedUnsupportedAction
RejectedSource
RejectedPhase
RejectedSelection
RejectedTarget
RejectedOccupied
RejectedInsufficientResources
RejectedTerminal
RejectedPaused
RejectedStale
RejectedDuplicate
RejectedNoEffect
FailedPrepare
FailedCommit
RolledBack
```

## Minimal correction sequence

```txt
1. Wrap current action helpers behind one dispatcher.
2. Allocate action IDs and source identities at every ingress.
3. Capture expected campaign and resource revisions.
4. Validate without mutation.
5. Build a detached change set.
6. Commit all changes once or none.
7. Return one terminal result.
8. Derive feedback and public readback from that result.
9. Acknowledge the first visible successor frame.
```

## Fixture gate

```txt
wave start success and all rejection reasons
build success, missing pad, occupied pad and insufficient souls
selection add, remove, clear and rectangle selection
order success, empty selection and stale entity reference
valid and invalid tower type
pause and restart phase policy
duplicate action ID idempotency
stale campaign/resource revisions
prepare failure and rollback
public GameHost source identity
source/build/Pages parity
first visible frame correlation
```

## Dependency order

```txt
Runtime Session Resource Lifecycle Authority
  -> Campaign Action Result Authority
  -> Campaign World-Pointer Admission Authority
  -> Campaign Phase Admission Authority
  -> Fixed-Step Command Scheduling Replay Authority
  -> Public Host Committed Read Model
```

Do not patch only the silent `return` statements with booleans. The correction requires stable command identity, revision admission, one terminal result, zero-mutation rejection and visible-frame proof.