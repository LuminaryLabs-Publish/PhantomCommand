# Fixed-Step Drain and Presentation Contract

**Timestamp:** `2026-07-13T11-41-10-04-00`

## Summary

This contract defines the authoritative boundary between browser wall time, deterministic 60 Hz simulation, variable-rate camera motion, interpolated presentation and visible CRT output.

## Plan ledger

**Goal:** make every frame deterministic enough to explain, replay and validate without moving gameplay or renderer semantics into the scheduler domain.

- [x] Define command and result identities.
- [x] Define wall-time and step-budget policy.
- [x] Define state-pair and interpolation requirements.
- [x] Define visibility and lifecycle behavior.
- [x] Define presentation completion and failure outcomes.
- [ ] Implement in existing owners later.

## Command

```txt
CampaignFrameCommand {
  commandId
  routeGeneration
  schedulerGeneration
  visibilityGeneration
  wallTimeSampleId
  wallTimeNow
  expectedSimulationRevision
  expectedCameraRevision
  expectedPresentationRevision
}
```

## Wall-time result

```txt
WallTimeAdmissionResult {
  elapsed
  admitted
  dropped
  clampPolicyRevision
  status: Accepted | Hidden | Stale | Invalid | Retired
}
```

## Drain result

```txt
FixedStepDrainResult {
  commandId
  schedulerGeneration
  fixedStep: 1/60
  stepBudget
  stepsExecuted
  accumulatorBefore
  accumulatorAfter
  previousSimulationRevision
  currentSimulationRevision
  droppedWallTime
  status: Advanced | NoStep | Paused | Terminal | Stale | Failed
}
```

## Presentation result

```txt
CampaignPresentationFrame {
  frameId
  sourceCommandId
  schedulerGeneration
  simulationPreviousRevision
  simulationCurrentRevision
  cameraRevision
  interpolationAlpha
  visibilityGeneration
  temporalDiscontinuity
  fingerprint
}

FrameCommitResult {
  frameId
  canvasResult
  crtResult
  visibleAck
  status: Complete | Partial | Failed | Stale | Superseded | Cancelled
}
```

## Policies

```txt
step budget
  explicit and versioned
  no unbounded while loop

elapsed clamp
  permitted only with a dropped-time result

high refresh
  zero-step frames interpolate between immutable state revisions

hitch
  multiple steps may run within budget
  remaining debt is retained or explicitly dropped by policy

visibility hidden
  scheduler enters Suspended
  predecessor RAF callbacks become stale

visibility resumed
  allocate successor generation
  reset or classify elapsed before simulation admission

restart/route exit
  retire scheduler generation
  reject predecessor commands and presentation results
```

## Consumer obligations

```txt
pixel-campaign-runtime-kit
  consumes only accepted drain results

pixel-campaign-render-kit
  renders one immutable CampaignPresentationFrame

crt-renderer-kit
  returns a typed result citing the same frame ID

legacy-gamehost-diagnostics-kit
  exposes detached receipts and fingerprints
```

## Completion

The scheduler is not proven by stable average frame rate. It is proven when cadence, hitch, pause, background/resume, restart and failure fixtures reproduce the same admitted step sequence and matching visible frame receipts.