# Public Capability Command and Result Map

**Timestamp:** `2026-07-15T08-41-37-04-00`

## Summary

The current public surface exposes object references and functions rather than commands and results. This map defines the minimum interaction contract for safe readback, mutation and retirement.

## Plan ledger

**Goal:** replace ambient GameHost calls with explicit command/result pairs bound to capability, caller and expected revisions.

- [x] Map each current GameHost member.
- [x] Separate observation from mutation.
- [x] Define stale, duplicate and retired rejection.
- [x] Define visible-frame acknowledgement.
- [ ] Implement the map.

## Current surface

| Current member | Type | Current effect |
|---|---|---|
| `state` | live object reference | unrestricted campaign mutation |
| `camera` | live object reference | unrestricted camera mutation |
| `startWave()` | direct function | invokes wave admission immediately |
| `build()` | direct function | invokes construction immediately |
| `getState()` | copied summary | readback without revision identity |
| `setZoom(z)` | direct function | mutates camera target zoom |

## Required commands and results

| Command | Result |
|---|---|
| `PublicCapabilityPublicationCommand` | `PublicCapabilitySetResult` |
| `PublicCampaignSnapshotQuery` | `ImmutableCampaignSnapshotResult` |
| `PublicCameraSnapshotQuery` | `ImmutableCameraSnapshotResult` |
| `PublicStartWaveCommand` | `PublicCampaignMutationResult` |
| `PublicBuildTowerCommand` | `PublicCampaignMutationResult` |
| `PublicSetCameraZoomCommand` | `PublicCameraMutationResult` |
| `PublicCapabilityRetirementCommand` | `PublicCapabilityRetirementResult` |

## Required envelope

```txt
CapabilitySetId
CallerLeaseId
CommandId
RouteRevision
RuntimeGeneration
ExpectedCampaignRevision
ExpectedCameraRevision
RequestedAction
Payload
```

## Rejection classes

```txt
CapabilityUnavailable
CallerLeaseExpired
CapabilityRetired
UnsupportedAction
StaleCampaignRevision
StaleCameraRevision
DuplicateCommand
RouteSuperseded
RuntimeSuperseded
TerminalStateIneligible
```

## Frame acknowledgement

Every accepted mutation result must be cited by one matching `CanvasFrameResult`, one matching `CrtFrameResult` and `FirstPublicMutationVisibleFrameAck`.