# PhantomCommand Ghost Action Visible-Frame Provenance Gap

**Timestamp:** `2026-07-11T16-49-51-04-00`

## Summary

A unit deleted during the captured unit loop can still act later in the same fixed step, while rendering reads the post-deletion `state.units` map. The next frame may therefore show sanctum damage, allied damage, a projectile or an effect without drawing the actor that caused it.

## Plan ledger

**Goal:** require every visible combat consequence to identify an admitted alive source, a committed combat event and the frame that consumed it.

- [x] Trace simulation deletion and later same-tick execution.
- [x] Trace world, HUD, minimap and CRT consumers.
- [x] Identify missing source/event/frame correlation.
- [ ] Add committed combat-event and consumer acknowledgement fixtures.

## Current path

```txt
captured unit array
  -> earlier unit applies lethal damage
  -> target removed from state.units
  -> removed target still executes from captured array
  -> target may mutate state or create projectile/effect
  -> drawWorld() reads state.units and omits target
  -> drawUI() displays changed core/health/message
  -> drawMinimap() omits target
  -> CRT uploads the unexplained result
```

## Missing provenance

```txt
combatResolutionId
sourceEntityId
sourceLivenessRevision
attackEventId
damageEventId
coreDamageEventId
projectileCreationEventId
retirementEventId
simulationTickId
renderFrameId
worldConsumerAck
hudConsumerAck
minimapConsumerAck
crtUploadAck
```

## Required frame contract

```txt
CommittedCombatFrame {
  sessionId,
  runEpoch,
  simulationTickId,
  combatResolutionId,
  stateFingerprint,
  frameId,
  visibleEntityIds,
  visibleProjectileIds,
  combatEventRange,
  coreHealth,
  worldAck,
  hudAck,
  minimapAck,
  crtAck
}
```

## Required assertions

```txt
no frame contains damage from a rejected dead actor
all core damage rows have a source or declared environment cause
all newly visible projectiles have an admitted creation event
retired entities are absent from both state and visible consumer sets
HUD core health matches the committed combat result
minimap and world entity sets share the same frame identity
CRT upload acknowledges the same source-frame fingerprint
```

## Fixture target

Create a deterministic scene where an allied unit kills an enemy before that enemy's position in the unit order. Assert that the enemy produces no later attack, projectile, move, core damage or effect and that the first committed frame contains no unexplained consequence.
