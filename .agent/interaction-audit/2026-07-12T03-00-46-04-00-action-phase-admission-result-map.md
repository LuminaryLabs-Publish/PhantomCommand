# PhantomCommand Action to Phase Admission Result Map

**Timestamp:** `2026-07-12T03-00-46-04-00`

## Summary

Campaign inputs currently call mutators directly and infer success from later state. This map defines the required path from browser or public-host intent through phase admission to a typed result.

## Plan ledger

**Goal:** route every action source through one command/result boundary without duplicating phase rules.

- [x] Map keyboard sources.
- [x] Map pointer and wheel sources.
- [x] Map public host sources.
- [x] Identify current direct mutations.
- [x] Define required action/result classes.
- [ ] Implement adapters after host and projection gates.

## Current sources

```txt
Space -> startWave
1/2/3 -> towerType mutation
P -> paused toggle
F -> camera focus
left click -> selectAt or build
left drag -> selection replacement
right click -> order
middle drag -> camera pan
wheel -> camera zoom anchor
GameHost.startWave -> startWave
GameHost.build -> build
GameHost.setZoom -> camera targetZoom
GameHost.state/camera -> unrestricted owner mutation
```

## Required path

```txt
input observation
  -> projection admission when spatial
  -> CampaignAction envelope
  -> runtime/session/capability admission
  -> phase snapshot and revision check
  -> action policy matrix
  -> non-mutating preflight
  -> atomic mutation and legal phase transition
  -> CampaignActionResult
  -> committed read model
  -> first visible action frame receipt
```

## Action kinds

```txt
START_WAVE
BUILD_TOWER
SELECT_POINT
SELECT_RECTANGLE
ORDER_UNITS
SET_TOWER_TYPE
TOGGLE_PAUSE
CAMERA_PAN
CAMERA_ZOOM
CAMERA_FOCUS
RESTART
EXIT
```

## Result fields

```txt
CampaignActionResult {
  actionResultId
  actionId
  status
  reason
  phaseId
  phaseRevisionBefore
  phaseRevisionAfter
  committedTickId
  terminalRevision
  stateFingerprintBefore
  stateFingerprintAfter
  firstVisibleFrameId
}
```

## Result classes

```txt
ACCEPTED
REJECTED_PAUSED
REJECTED_TERMINAL
REJECTED_ACTIVE_WAVE
REJECTED_NOT_BUILDABLE_PHASE
REJECTED_NOT_COMMANDABLE_PHASE
REJECTED_INVALID_TARGET
REJECTED_INSUFFICIENT_SOULS
REJECTED_STALE_PHASE
REJECTED_STALE_PROJECTION
REJECTED_DUPLICATE_ACTION
REJECTED_DISPOSED_SESSION
```

## Adapter rules

```txt
browser and GameHost adapters produce identical envelopes
spatial actions require an admitted projection result
no adapter receives raw mutable state or camera owners
rejected actions return results without mutation
presentation-only camera actions remain explicitly classified
```

## Validation boundary

Documentation only. No input, host, command, or result behavior changed.