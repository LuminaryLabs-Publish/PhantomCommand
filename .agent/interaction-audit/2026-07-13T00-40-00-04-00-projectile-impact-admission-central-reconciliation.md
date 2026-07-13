# Projectile Impact Modifier Admission Map

**Timestamp:** `2026-07-13T00-40-00-04-00`

## Summary

Projectile impact currently mutates damage directly from the recursive fixed-step loop. There is no typed impact command, generation fence, duplicate protection, phase admission, atomic damage-plus-modifier commit or terminal modifier result.

## Plan ledger

**Goal:** insert one command/result boundary between impact detection and target mutation.

- [x] Trace tower fire through projectile retirement.
- [x] Identify direct damage mutation and discarded modifier payload.
- [x] Define required admission inputs and terminal outcomes.
- [x] Define zero-mutation stale, duplicate and invalid results.
- [ ] Implement and exercise the command boundary later.

## Current interaction

```txt
updateProjectiles(dt)
  -> resolve target by mutable ID
  -> detect impact distance
  -> calculate splash hit list
  -> call damage() directly
  -> create transient effect
  -> delete projectile
```

## Missing admission evidence

```txt
command ID
runtime session and run generation
projectile generation
source entity generation
target entity generation
expected combat revision
phase admission
immutable effect spec identity
stale and duplicate rejection
atomic damage-plus-modifier commit
terminal result
```

## Required command

```txt
ProjectileImpactCommand {
  commandId
  runtimeSessionId
  runGeneration
  projectileId
  projectileGeneration
  sourceEntityId
  sourceGeneration
  targetEntityId
  targetGeneration
  effectSpecId
  effectSpecVersion
  expectedCombatRevision
}
```

## Required result

```txt
ProjectileImpactResult {
  commandId
  kind: Applied | Refreshed | Stacked | Resisted | Immune | Rejected | Stale | Duplicate
  damageResultId?
  modifierResultId?
  targetEntityId
  targetGeneration
  combatRevision
  targetModifierRevision?
  rejectionReason?
  firstVisibleFrameAckId?
}
```

## Claim boundary

The current impact path is direct mutable code. No admission or result type was implemented in this run.