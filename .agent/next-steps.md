# PhantomCommand Next Steps

**Timestamp:** `2026-07-13T00-40-00-04-00`

## Summary

Implement Combat Modifier Application Authority before claiming the Grave Ward slows enemies. The Ward payload must become one admitted target modifier with explicit magnitude, duration, stacking, expiry, movement derivation and visible-frame proof.

## Plan ledger

**Goal:** replace the unused `slow` payload with a deterministic, target-bound and testable combat-effect transaction.

### Effect specification

- [ ] Give every combat effect a stable spec ID and version.
- [ ] Define whether `0.34` means a 34 percent reduction or a final 0.34 multiplier.
- [ ] Add an authored duration in fixed-step terms.
- [ ] Define stacking, refresh, cap, resistance and immunity policy.
- [ ] Fingerprint the effect spec with authored combat content.

### Impact admission

- [ ] Add `ProjectileImpactCommand` identity and expected combat revision.
- [ ] Bind runtime session, run, source, projectile and target generations.
- [ ] Reject missing, stale, duplicate and terminal-phase impacts.
- [ ] Resolve damage and modifiers from one immutable effect spec.
- [ ] Commit damage and accepted modifier state atomically.
- [ ] Publish one terminal impact/modifier result.

### Target modifier state

- [ ] Add a revisioned active-modifier set per target generation.
- [ ] Preserve immutable archetype/base speed.
- [ ] Derive current movement speed from active modifiers.
- [ ] Apply one explicit stacking and refresh policy.
- [ ] Expire modifiers at deterministic fixed-step boundaries.
- [ ] Retire all target modifiers exactly once on death, replacement or restart.

### Rendering and diagnostics

- [ ] Add modifier identity, kind, magnitude and remaining duration to target read models.
- [ ] Project a persistent slow indicator from committed state.
- [ ] Bind world, HUD, minimap and CRT frames to combat/modifier revisions.
- [ ] Publish immutable results and bounded observations.
- [ ] Acknowledge the first visible frame citing the accepted modifier result.
- [ ] Remove mutable modifier internals from public `GameHost` access.

### Proof

- [ ] Add deterministic single-Ward slow and unslowed-control fixtures.
- [ ] Compare distance traveled over equal fixed steps.
- [ ] Add exact duration, expiry, refresh, stacking and cap fixtures.
- [ ] Add resistance, immunity, stale projectile, duplicate impact and dead-target fixtures.
- [ ] Add target-death and run-restart retirement fixtures.
- [ ] Add first visible modifier-frame fixture.
- [ ] Run source, built-output and GitHub Pages parity checks.
- [ ] Run `npm run check` and `npm run build` after fixture wiring.

## Existing owners to update

```txt
src/campaign/campaign-scene.js
fixed-step-campaign-simulation-kit
pixel-campaign-runtime-kit
pixel-campaign-render-kit
legacy-gamehost-diagnostics-kit
campaign-static-check-kit
scripts/check-campaign.mjs
package.json
game.html
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
CombatModifierResult {
  commandId
  impactResultId
  kind
  targetEntityId
  targetGeneration
  modifierId?
  modifierKind?
  magnitude?
  appliedStep?
  expiresStep?
  targetModifierRevision?
  combatRevision
  rejectionReason?
  firstVisibleFrameAckId?
}
```

## Dependency order

```txt
Runtime Session Resource Lifecycle Authority
  -> Campaign Bootstrap and Continue Resume Authority
  -> Campaign Phase and Entity Liveness Authority
  -> Combat Modifier Application Authority
  -> Fixed-Step Replay and Committed Frame Authority
  -> visible combat-effect proof
```

Do not patch only `moveToward()` with a mutable speed multiplier. The correction requires explicit effect semantics, generation-fenced admission, durable target modifier state, deterministic expiry and typed visible proof.