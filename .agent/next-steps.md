# PhantomCommand Next Steps

**Timestamp:** `2026-07-13T00-31-09-04-00`

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
- [ ] Bind source, projectile and target generations.
- [ ] Reject missing, stale, duplicate and terminal-phase impact.
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
- [ ] Bind HUD, world, minimap and CRT frame data to combat/modifier revisions.
- [ ] Publish immutable combat results and bounded observations.
- [ ] Acknowledge the first visible frame citing the accepted modifier result.
- [ ] Keep `GameHost` from exposing mutable modifier internals.

### Proof

- [ ] Add a deterministic single-Ward slow fixture.
- [ ] Compare distance traveled by slowed and unslowed enemies over equal fixed steps.
- [ ] Add exact duration and expiry fixtures.
- [ ] Add refresh, stacking and cap fixtures.
- [ ] Add resistance and immunity fixtures.
- [ ] Add stale projectile, duplicate impact and dead-target fixtures.
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

## Minimal correction sequence

```txt
1. Define one unambiguous Grave Ward effect spec.
2. Add target and projectile generations.
3. Admit impact through one command/result boundary.
4. Commit damage plus modifier state atomically.
5. Preserve base speed and derive current speed.
6. Implement duration, refresh, stacking and expiry.
7. Retire modifiers on target/run lifecycle boundaries.
8. Publish immutable results and observations.
9. Bind visible indicators to modifier revisions.
10. Prove source/build/Pages parity.
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