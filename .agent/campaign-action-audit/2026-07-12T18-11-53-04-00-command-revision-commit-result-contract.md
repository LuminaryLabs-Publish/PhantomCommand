# Campaign Action Command, Revision, Commit and Result Contract

**Timestamp:** `2026-07-12T18-11-53-04-00`

## Purpose

Define the minimum contract required to replace direct campaign mutation and silent no-op helpers with deterministic, observable and replayable action results.

## Current ownership problem

```txt
campaign-scene.js owns input, state, actions, simulation, rendering and public capabilities
all action helpers close over the same mutable state
all helpers return undefined
callers cannot distinguish committed, rejected or no-effect paths
```

## Required state identities

```txt
campaignSessionId
campaignSessionGeneration
campaignRevision
phaseRevision
selectionRevision
economyRevision
padRevision
targetRevision
cameraRevision
renderRevision
```

## Required command fields

```txt
CampaignActionCommand {
  actionId
  sequence
  sourceKind
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

## Required prepare results

```txt
ActionSchemaResult
ActionSourceResult
ActionPhaseResult
ActionSelectionResult
ActionEconomyResult
ActionTargetResult
ActionPlanResult
```

Every prepare result must be immutable and cite the command plus the predecessor revision it inspected.

## Commit contract

```txt
1. Freeze one predecessor campaign revision.
2. Validate the command and all required revisions.
3. Build a detached change set.
4. Validate cross-resource invariants.
5. Commit all changes once or commit none.
6. Advance the campaign revision once.
7. Publish one terminal result.
8. Project feedback and readback from that result.
9. Acknowledge the first visible successor frame.
```

## Action-specific atomic sets

```txt
Build
  pad occupancy
  souls balance
  tower registry
  effect list
  message

StartWave
  spawn queue
  waveActive
  phase revision
  message

Selection
  selected IDs
  selectedPad

Order
  selected unit target/move fields
  effect list
```

## Idempotency

The action ledger must retain at least the action ID, terminal status, predecessor revision, successor revision and result digest. Replaying the same action ID returns the retained result without reapplying mutation.

## Observation boundary

Observations and journals must contain detached values only. They must not expose the mutable `state`, `camera`, pad objects or entity objects.

## Completion criteria

```txt
all campaign actions use the command path
all action paths return one terminal result
all rejection paths prove zero mutation
all successful paths advance one campaign revision
public and browser paths have explicit source identities
browser, build and Pages fixtures produce equivalent results
accepted results correlate with the first visible frame
```

No runtime implementation was performed.