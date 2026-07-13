# Accessible Command Identity, Focus and Status Contract

**Timestamp:** `2026-07-13T02-49-07-04-00`

## Summary

This contract defines the semantic boundary required for keyboard, native control, assistive technology, visual canvas and public-host parity.

## Plan ledger

**Goal:** specify invariant-level requirements before changing DOM or runtime behavior.

- [x] Define identities and revisions.
- [x] Define admission and deduplication.
- [x] Define focus and panel lifecycle.
- [x] Define accessible status projection.
- [x] Define proof gates.
- [ ] Implement and validate later.

## Identities

```txt
AccessibilitySurfaceId
AccessibilitySurfaceGeneration
FocusGeneration
AccessibleControlId
VisualCommandId
NativeControlCommandId
ActivationId
EventSequenceId
MenuCommandResultId
CampaignCommandResultId
AccessibleStatusRevision
```

## Invariants

1. One event sequence produces at most one accepted command.
2. A native control activation resolves the native control's command unless an explicit policy rejects it.
3. Visual selection never silently overrides a different focused native control.
4. Disabled visual actions are disabled and non-focusable natively.
5. A modal panel owns focus while open.
6. Background menu controls are inert while a modal panel is open.
7. Closing a panel restores focus to the accepted invoking control when still valid.
8. Campaign live output derives from committed bounded state, not raw frame spam.
9. Public activation uses the same command admission and result types.
10. Visual and accessible acknowledgements cite the same state revision.

## Results

```txt
Accepted
Unavailable
Duplicate
StaleFocus
FocusCommandConflict
InvalidControl
InvalidSource
PanelScopeMismatch
RouteMismatch
Retired
```

## Status projection policy

```txt
high priority:
  terminal win/loss
  sanctum critical change
  wave start/clear
  accepted build/order failure

normal priority:
  souls/core/wave summary changes
  tower-type selection
  pause/resume

suppressed:
  per-frame positions
  animation frames
  projectile/effect churn
```

## Proof gates

```txt
native Enter/Space exactly-once fixture
focused-versus-selected conflict fixture
disabled Continue fixture
panel focus transfer/inertness/restore fixture
settings parity fixture
campaign live status fixture
public activation parity fixture
source/build/Pages parity fixture
```
