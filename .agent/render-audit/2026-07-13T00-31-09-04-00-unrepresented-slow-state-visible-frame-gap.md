# Unrepresented Slow State Visible-Frame Gap

**Timestamp:** `2026-07-13T00-31-09-04-00`

## Summary

The Grave Ward uses a distinct color and its projectile produces an impact ring, but the frame cannot prove that the target received any persistent slow state. No unit snapshot, render descriptor or HUD/minimap projection carries modifier identity, remaining duration or modifier revision.

## Plan ledger

**Goal:** make visible control effects derive from committed simulation state rather than projectile color or transient impact particles.

- [x] Trace Ward projectile rendering.
- [x] Trace impact effects and unit rendering.
- [x] Confirm no active modifier state reaches the frame.
- [x] Define a visible-frame acknowledgement.
- [ ] Implement later.

## Current path

```txt
Grave Ward fires cyan projectile
  -> projectile reaches target
  -> damage is applied
  -> transient impact ellipse is drawn
  -> target continues with base movement speed
  -> no persistent status indicator exists
```

## Missing frame data

```txt
modifier instance ID
modifier kind
modifier magnitude
remaining duration
target modifier revision
combat result ID
run generation
source tower/projectile identity
first visible frame acknowledgement
```

## Required acknowledgement

```txt
CombatModifierVisibleFrameAck {
  frameId
  runtimeSessionId
  runGeneration
  combatRevision
  modifierResultId
  targetEntityId
  targetGeneration
  targetModifierRevision
  modifierKind
  remainingDuration
  sourceCanvasRevision
  crtPresentationRevision
}
```

## Claim boundary

A colored projectile or impact ring is not proof that slowing occurred. Proof requires a committed modifier result, deterministic movement difference, matching unit projection and the first presented frame citing that modifier revision.
