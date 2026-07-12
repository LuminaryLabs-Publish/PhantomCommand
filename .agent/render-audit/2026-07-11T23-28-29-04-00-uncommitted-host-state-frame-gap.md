# Render Audit: Uncommitted Host State and Frame Gap

**Timestamp:** `2026-07-11T23-28-29-04-00`

## Summary

`GameHost.getState()` samples mutable campaign and camera fields, but the visible frame is committed later by the campaign RAF. Public mutation can therefore make host readback newer than the current CPU canvas and CRT output. The host has no frame ID or render receipt that can distinguish this condition.

## Plan ledger

**Goal:** require host observations to describe one proven visible frame.

- [x] Trace the campaign RAF order.
- [x] Trace public state and camera mutation.
- [x] Trace `getState()` fields.
- [x] Identify missing frame provenance.
- [x] Define a committed read-model contract.
- [ ] Implement frame receipts and browser fixtures.

## Current order

```txt
external code may mutate GameHost.state or camera
  -> getState can sample the mutation immediately

next campaign RAF
  -> update camera
  -> execute fixed simulation steps
  -> draw CPU world and UI
  -> submit CRT WebGL frame
  -> schedule next RAF
```

## Concrete gap

```txt
visible HUD shows SOULS 145
  -> external caller sets GameHost.state.souls = 999
  -> caller invokes GameHost.getState()
  -> result reports souls = 999
  -> visible HUD still shows 145 until a later RAF
```

The same mismatch can affect:

```txt
wave and waveActive
core
unit and tower counts
won and lost
camera zoom
```

## Missing evidence

```txt
frameId
simulationTick
renderStartedAt
renderSubmittedAt
CPU canvas revision
CRT source-upload revision
CRT draw receipt
runEpoch
phaseRevision
stateFingerprint
```

## Required committed frame record

```txt
CommittedCampaignFrame {
  runEpoch,
  phaseRevision,
  simulationTick,
  frameId,
  stateFingerprint,
  campaignReadModel,
  cameraReadModel,
  cpuCanvasRevision,
  crtUploadRevision,
  renderReceipt
}
```

`getCommittedState()` must return only the latest immutable record. A public command may return `ACCEPTED_PENDING`, but it must not claim a visible effect until a later frame cites the command ID.

## Required fixtures

```txt
host mutation is impossible through public data
getCommittedState remains stable between render commits
command accepted before render does not advance committed read model
following render advances frameId exactly once
state and camera fields match the rendered HUD/world
CRT submit failure does not publish a new committed frame
terminal overlay and host terminal state share one frameId
```

## Validation boundary

No render code changed and no browser smoke ran. Host/frame coherence remains unproved.
