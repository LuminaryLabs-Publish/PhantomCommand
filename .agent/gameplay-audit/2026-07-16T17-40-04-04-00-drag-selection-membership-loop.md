# Gameplay Audit — Drag Selection Membership Loop

**Timestamp:** `2026-07-16T17-40-04-04-00`  
**Status:** `isometric-marquee-selection-geometry-authority-audited`

## Plan ledger

**Goal:** preserve RTS selection intent by making drag membership deterministic, camera-bound and equal to the rectangle the player sees.

- [x] Trace drag start, update and completion.
- [x] Trace additive Shift behavior.
- [x] Trace selected-state consumers.
- [x] Identify the geometry mismatch.
- [ ] Implement deterministic membership and gameplay fixtures.

## Current loop

```txt
drag start
  -> store source x/y and Shift state

drag update
  -> update source pointer
  -> draw rectangle

drag completion
  -> click threshold under 5x5 selects one unit or pad
  -> otherwise inverse-transform two diagonal corners
  -> filter allies by derived world x/z box
  -> replace selected IDs

selected-state consumers
  -> draw selection rings
  -> right-click assigns move or attack orders
  -> F centers camera on selected group
```

An incorrect membership result changes later gameplay commands: orders and focus operate on the accepted set, not on the visible rectangle. The gap is therefore gameplay-semantic even though the source defect is coordinate geometry.

## Required gameplay result

```txt
accepted gesture
  -> exact candidate membership
  -> explicit replace/add/toggle policy
  -> one monotonic selection revision
  -> deterministic selected IDs
  -> downstream orders bind that revision
```

## Validation boundary

No unit order, combat, balance or selection behavior was changed.
