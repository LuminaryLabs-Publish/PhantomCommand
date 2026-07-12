# Host Capability Audit: Owner Quarantine, Read Model and Command Contract

**Timestamp:** `2026-07-11T23-28-29-04-00`

## Summary

The public host must become a narrow capability gateway. Runtime owners remain private; observations are detached records from a committed frame; mutations are explicit commands carrying lifecycle and revision expectations.

## Plan ledger

**Goal:** specify the complete contract required to replace the current raw `window.GameHost` object.

- [x] Define forbidden public values.
- [x] Define allowed read capabilities.
- [x] Define allowed command capabilities.
- [x] Define command and result schemas.
- [x] Define frame-provenance requirements.
- [x] Define lifecycle and compatibility rules.
- [ ] Implement and fixture-gate the contract.

## Forbidden public values

```txt
live state object
live camera object
units, towers, projectiles, effects or pad collections
CanvasRenderingContext2D
WebGL context, program, texture or renderer handles
functions that directly mutate ambient runtime state
mutable references nested inside read results
```

## Public surface

```txt
window.GameHost = Object.freeze({
  version,
  sessionId,
  capabilities,
  getCommittedState,
  getJournal,
  submit
});
```

## Capability descriptor

```txt
HostCapabilities {
  apiVersion,
  gameId,
  sessionId,
  reads: ["campaign.committed-state", "campaign.journal"],
  commands: [
    "campaign.wave.start",
    "campaign.camera.zoom",
    "campaign.camera.focus",
    "campaign.selection.clear"
  ]
}
```

Capabilities are descriptive, not owner handles.

## Committed read model

```txt
CampaignCommittedState {
  gameId,
  sessionId,
  runEpoch,
  phase,
  phaseRevision,
  simulationTick,
  frameId,
  stateFingerprint,
  renderReceipt,
  campaign: {
    time,
    souls,
    core,
    wave,
    waveActive,
    selectedCount,
    selectedPadId,
    towerType,
    unitCount,
    enemyCount,
    towerCount,
    projectileCount,
    paused,
    outcome,
    message
  },
  camera: {
    x,
    z,
    zoom,
    targetZoom
  }
}
```

The result must be detached and deeply immutable. Internal entity objects and collections are never returned.

## Command schema

```txt
HostCommand {
  commandId,
  capability,
  hostSessionId,
  expectedRunEpoch,
  expectedPhaseRevision,
  expectedFrameId?,
  payload
}
```

## Command result schema

```txt
HostCommandResult {
  commandId,
  capability,
  status,
  reason?,
  hostSessionId,
  runEpoch,
  phaseRevision,
  admittedAtTick?,
  committedAtTick?,
  committedFrameId?,
  stateFingerprint?
}
```

## Lifecycle contract

```txt
module startup
  -> create private runtime owners
  -> allocate hostSessionId
  -> publish frozen capability gateway

navigation, reload or disposal
  -> mark host session disposed
  -> reject new commands
  -> release public global or replace with tombstone descriptor
  -> retire journals and callbacks
```

## Finite-value policy

Every numeric field must satisfy:

```txt
Number.isFinite(value)
within capability-specific minimum and maximum
within per-command payload budget
```

`NaN`, positive/negative Infinity, coercive strings and oversized values are rejected before any mutation.

## Compatibility policy

```txt
legacy getState
  -> may delegate to getCommittedState temporarily
  -> must return detached data
  -> must include deprecation metadata

legacy startWave/build/setZoom
  -> may translate to submit(command) temporarily
  -> must return typed results
  -> must not infer hidden mutable targets except through explicit migration policy

legacy state/camera properties
  -> removed without compatibility aliases
```

## Required proofs

```txt
Object.isFrozen(window.GameHost) is true
no public property reaches a runtime owner
returned state remains unchanged after attempted mutation
runtime remains unchanged after attempted mutation
NaN zoom rejected
stale session/run/phase rejected
terminal wave/build rejected
command result and frame receipt correlate
old session rejects after navigation/disposal
```
