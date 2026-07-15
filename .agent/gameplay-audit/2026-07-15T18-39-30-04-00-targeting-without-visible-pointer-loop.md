# Targeting Without Visible Pointer Loop

**Timestamp:** `2026-07-15T18-39-30-04-00`

## Summary

Point selection, build-pad selection and right-click orders resolve from a hidden pointer location. The game publishes accepted selection and order effects after mutation, but does not preview the target candidate before commit.

## Plan ledger

**Goal:** make campaign targeting legible before mutation while preserving the existing selection, build and order owners.

- [x] Trace point selection and fixed hit radii.
- [x] Trace build-pad selection and double-activation behavior.
- [x] Trace enemy-versus-ground order resolution.
- [x] Trace post-commit feedback.
- [ ] Add candidate previews and explicit miss results.
- [ ] Prove candidate-to-command continuity.

## Gameplay path

```txt
left point command
  -> hidden source point
  -> inverse project to world
  -> nearest ally within 7 units
  -> otherwise nearest empty pad within 7 units
  -> mutate selected units or selectedPad

second pad activation
  -> build using current tower type when affordable
  -> mutate souls pad occupancy and tower collection

right point command
  -> hidden source point
  -> inverse project to world
  -> nearest enemy within 8 units
  -> assign attack target or movement destinations
  -> emit an effect after the assignment
```

## Missing gameplay feedback

```txt
which ally would be selected: not shown
which pad would be selected: not shown
whether a selected pad would build on this activation: not shown
which enemy would receive the order: not shown
where a ground move order would land: not shown
whether the point is outside the visible source: not shown
whether the command would miss: not shown
```

## Required gameplay contract

```txt
PointerFeedbackResult
  -> classify ally pad enemy ground outside or miss
  -> publish candidate identity and command class
  -> project a visible preview

CampaignPointerCommand
  -> cite candidate and projection revisions
  -> revalidate current eligibility
  -> settle exactly once as accepted stale outside miss unaffordable occupied or unsupported
  -> publish selection build order or camera result
```

## Boundary

This audit does not change hit radii, tower costs, command semantics, unit movement or campaign balance.