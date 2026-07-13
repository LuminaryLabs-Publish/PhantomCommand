# Combat Modifier Application DSK Map

**Timestamp:** `2026-07-13T00-31-09-04-00`

## Summary

The campaign has owners for tower specs, projectile travel, impact damage and unit movement, but no owner for converting a declared projectile modifier into durable target state and a derived movement result.

## Plan ledger

**Goal:** define a coordinating combat-effect domain without moving tower construction, projectile travel, unit movement or rendering into one monolith.

- [x] Map current owners.
- [x] Identify the missing modifier boundary.
- [x] Define transaction identities and results.
- [x] Define candidate kits and proof gates.
- [ ] Implement later.

## Parent domain

```txt
phantom-command-combat-modifier-application-authority-domain
```

## Current owners

```txt
pixel-campaign-runtime-kit
  -> tower selection, build command and mutable state

fixed-step-campaign-simulation-kit
  -> tower cooldowns, projectile creation, travel, impact damage and unit movement

pixel-campaign-render-kit
  -> projectile, impact effect, entity, HUD and minimap projection

campaign-static-check-kit
  -> source-token assertions only
```

## Missing ownership

```txt
immutable combat-effect specification
modifier kind, magnitude and duration
impact-to-target admission
stacking and refresh policy
resistance or immunity policy
active modifier identity and revision
derived movement speed
expiry and exactly-once retirement
typed application result
combat observation and journal
visible modifier-frame acknowledgement
```

## Required transaction

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

  -> validate source, projectile and target liveness
  -> resolve immutable damage and modifier spec
  -> evaluate resistance, stacking and refresh policy
  -> commit damage and accepted modifier atomically
  -> increment combat and target-modifier revisions
  -> publish one terminal CombatModifierResult
  -> derive unit movement from active modifiers
  -> expire and retire modifiers exactly once
  -> acknowledge first visible matching frame
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

## Invariants

```txt
one admitted impact produces one terminal result
dead, replaced or stale targets receive no modifier
modifier magnitude and duration are finite and bounded
base speed remains authored and immutable
current speed is derived from base speed plus active modifiers
stacking and refresh follow one explicit policy
expiry removes the modifier exactly once
unit deletion retires all active modifiers
rendered slow state cites the same modifier revision as simulation
rejected, stale or duplicate impact performs zero mutation
```

## Proof gates

```txt
Grave Ward impact applies slow
slow changes distance traveled over a fixed deterministic interval
slow expires at the declared boundary
refresh and stacking policies are deterministic
dead-target impact is rejected
stale projectile generation is rejected
duplicate impact is idempotent
source, built output and Pages agree
first visible slow-state frame cites the accepted result
```
