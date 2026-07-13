# Checkpoint Hydration and Commit Contract

**Timestamp:** `2026-07-12T22-15-00-04-00`

## Summary

The current three-field victory marker cannot recreate the live campaign aggregate. A resumable checkpoint must declare every durable participant and an explicit policy for transient participants.

## Plan ledger

**Goal:** define a versioned, complete and rollback-safe checkpoint contract.

- [x] Inventory current mutable participants.
- [x] Record missing envelope fields.
- [x] Define validation invariants.
- [ ] Implement and prove later.

## Required durable participants

```txt
run identity and generation
campaign schema and source fingerprint
time and fixed-step boundary
souls, core, wave and wave activity
spawn queue
units and ID counter
towers, pads and ID counter
selection and selected pad
camera and zoom targets
pause, win, loss and message state
```

## Explicit transient policy

```txt
projectiles: persist or deterministically clear
effects: persist or clear
input held state: clear under a new generation
pointer/drag state: clear
public diagnostic cache: rebuild
render-only state: rebuild
```

## Invariants

```txt
pad occupancy matches towers
selected IDs reference live allied units
unit/tower/projectile IDs cannot collide
spawn entries reference valid archetypes and lanes
balances and wave indices are bounded
terminal flags are mutually compatible
camera values are finite and bounded
all participants cite one run generation
failed hydration mutates nothing
```
