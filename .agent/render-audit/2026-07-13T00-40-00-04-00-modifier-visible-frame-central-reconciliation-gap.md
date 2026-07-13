# Combat Modifier Visible-Frame Gap

**Timestamp:** `2026-07-13T00-40-00-04-00`

## Summary

The renderer can show a cyan Ward projectile and a transient impact ring, but no committed slow state exists for it to present. Entity, HUD, minimap and CRT output carry no modifier identity, magnitude, duration, target revision or first-visible-frame receipt.

## Plan ledger

**Goal:** require presentation to consume committed combat-modifier state rather than infer gameplay from projectile color or transient effects.

- [x] Trace projectile and effect rendering.
- [x] Trace entity, HUD, minimap and CRT presentation.
- [x] Confirm no modifier read model exists.
- [x] Confirm no visible frame cites a combat/modifier revision.
- [ ] Add persistent committed-state projection and frame acknowledgement later.

## Current path

```txt
Ward projectile
  -> projectile color is drawn
  -> impact effect ring is drawn
  -> projectile is deleted
  -> target has no slow state
  -> later frames show unchanged movement
```

## Missing render evidence

```txt
modifier instance ID
modifier kind and magnitude
applied and expiry fixed steps
remaining duration
target modifier revision
derived movement speed
combat result ID
world/HUD/minimap projection
CRT frame correlation
first visible modifier-frame acknowledgement
```

## Required presentation contract

```txt
Committed CombatModifierResult
  -> immutable target modifier read model
  -> render snapshot cites target and modifier revisions
  -> world/HUD/minimap indicator derives from the snapshot
  -> CRT presentation cites source-frame identity
  -> VisibleModifierFrameAck records the first matching presented frame
```

## Claim boundary

Projectile color and impact animation do not prove a slow effect. No render behavior was changed or executed.