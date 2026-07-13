# Combat Modifier Application DSK Map

**Timestamp:** `2026-07-13T00-40-00-04-00`  
**Parent domain:** `phantom-command-combat-modifier-application-authority-domain`

## Summary

The current campaign owns damage and projectile travel but has no domain that owns target-bound modifiers. The Grave Ward's `slow: 0.34` reaches projectile impact and is discarded. Combat modifiers need one explicit authority between effect specification, impact admission, target state, movement derivation, expiry and presentation.

## Plan ledger

**Goal:** define the minimum DSK composition required to turn an authored effect payload into deterministic target state and visible evidence.

- [x] Locate effect declaration and projectile transport.
- [x] Locate impact, unit movement and rendering consumers.
- [x] Separate immutable effect specification from live modifier instances.
- [x] Define admission, application, expiry, retirement and observation boundaries.
- [x] Preserve current combat and rendering owners as consumers.
- [ ] Implement the authority and fixtures later.

## Current ownership

```txt
towerTypes.ward
  owns authored slow number only

projectile()
  transports slow number only

updateProjectiles()
  owns travel, impact proximity, damage and projectile deletion
  does not admit or apply modifiers

state.units / updateUnit() / moveToward()
  own entity state and movement
  expose no active-modifier collection or derived speed

drawEntity() / drawWorld() / drawUI() / drawMinimap()
  present entities and transient effects
  expose no modifier revision or duration
```

## Required bounded domains

```txt
Combat Effect Specification
  stable effect ID and version
  magnitude semantics
  duration, stacking, refresh, cap, resistance and immunity policy

Projectile Impact Admission
  command identity
  session/run/projectile/target generations
  source and target liveness
  phase and duplicate admission

Target Modifier State
  immutable base attributes
  revisioned active modifier set
  applied and expiry fixed steps
  effect source and stack identity

Derived Movement
  current speed from base speed plus accepted modifiers
  bounded combination policy
  no destructive mutation of authored base speed

Expiry and Retirement
  deterministic expiry boundary
  death, replacement and restart retirement
  exactly-once result and journal evidence

Presentation and Observation
  immutable modifier read model
  world/HUD/minimap indicator
  first visible frame acknowledgement
```

## Candidate kits

```txt
combat-effect-spec-id-kit
combat-effect-spec-version-kit
projectile-impact-command-id-kit
projectile-impact-envelope-kit
projectile-generation-kit
combat-target-generation-kit
combat-modifier-kind-kit
combat-modifier-magnitude-kit
combat-modifier-duration-kit
combat-modifier-stacking-policy-kit
combat-modifier-refresh-policy-kit
combat-modifier-resistance-policy-kit
combat-modifier-application-kit
combat-modifier-result-kit
unit-active-modifier-set-kit
unit-derived-movement-speed-kit
combat-modifier-expiry-kit
combat-modifier-retirement-kit
stale-impact-rejection-kit
duplicate-impact-rejection-kit
combat-effect-observation-kit
combat-effect-journal-kit
combat-modifier-visible-frame-ack-kit
```

## Required transaction

```txt
ProjectileImpactCommand
  -> validate session, run, projectile, source and target generations
  -> resolve immutable damage/effect specification
  -> evaluate phase, duplicate, stacking, refresh and resistance policy
  -> atomically commit damage plus accepted modifier state
  -> publish one terminal result
  -> derive movement from accepted modifier state
  -> expire or retire exactly once
  -> acknowledge the first matching visible frame
```

## Existing owners to update

```txt
src/campaign/campaign-scene.js
pixel-campaign-runtime-kit
fixed-step-campaign-simulation-kit
pixel-campaign-render-kit
legacy-gamehost-diagnostics-kit
campaign-static-check-kit
scripts/check-campaign.mjs
package.json
game.html
```

## Claim boundary

This map defines ownership only. No runtime DSK, effect application, duration, stacking, expiry, diagnostics or visible-frame receipt has been implemented.