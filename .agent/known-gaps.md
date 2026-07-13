# PhantomCommand Known Gaps

**Timestamp:** `2026-07-13T00-40-00-04-00`

## Summary

The leading combat gap is Combat Modifier Application Authority. Grave Ward projectiles carry `slow: 0.34`, but impact discards it. There is no target modifier state, duration, stacking, movement derivation, expiry, typed result or visible-frame proof.

## Plan ledger

**Goal:** close effect-specification, impact-admission, target-state, movement, expiry and proof gaps while preserving existing persistence, input and action boundaries.

- [x] Record the unused Ward payload.
- [x] Record effect semantic and target-state gaps.
- [x] Record movement, expiry and retirement gaps.
- [x] Record result, diagnostics and visible-frame gaps.
- [x] Record deterministic and deployed proof gaps.
- [x] Reconcile repo-local findings with central tracking.
- [ ] Implement in dependency order.

## Effect specification gaps

```txt
stable effect spec ID and version
unambiguous magnitude interpretation
authored duration
stacking policy
refresh policy
maximum stack/cap policy
resistance and immunity policy
source/content fingerprint
```

## Impact admission gaps

```txt
projectile impact command ID
runtime session and run generation
source, projectile and target generations
expected combat revision
source and target liveness validation
phase admission
stale and duplicate rejection
atomic damage-plus-modifier commit
one terminal impact result
```

## Target-state and movement gaps

```txt
active modifier instance ID
target modifier revision
applied and expiry fixed steps
immutable base-speed boundary
derived current movement speed
modifier set snapshot and fingerprint
restart/death/replacement policy
```

## Expiry and retirement gaps

```txt
deterministic expiry boundary
exactly-once modifier retirement
target-death cleanup
run-restart cleanup
stale predecessor quarantine
duplicate retirement idempotency
retirement result and journal evidence
```

## Concrete current risks

```txt
Grave Ward does not slow enemies
55-soul control tower behaves as damage-only
special projectile visuals can imply a nonexistent effect
future direct speed mutation could make restoration unsafe
multiple Ward hits have undefined stacking behavior
no duration means no deterministic replay boundary
no target generation permits stale impact ambiguity
no retirement policy permits leaked modifier state after future implementation
```

## Result and render gaps

```txt
ProjectileImpactCommand
ProjectileImpactAdmissionResult
DamageApplicationResult
CombatModifierResult
TargetMovementDerivationResult
CombatModifierRetirementResult
bounded combat observations and journal
modifier revision in world/HUD/minimap snapshots
persistent slow-state indicator
first visible modifier-frame acknowledgement
```

## Test gaps

```txt
single Ward slow application
slowed versus unslowed distance comparison
exact fixed-step duration and expiry
refresh behavior
stacking and cap behavior
resistance and immunity
stale projectile generation
duplicate impact
missing/dead target
target retirement
run restart with active modifier
first visible slow-state frame
source/build/Pages parity
```

## Retained authority gaps

```txt
Runtime Session Resource Lifecycle Authority
Campaign Bootstrap and Continue Resume Authority
Versioned Full Campaign Checkpoint Capture Authority
Campaign Keyboard Command Admission Authority
Campaign Action Result Authority
Campaign Spatial Input Admission Authority
Menu Pointer-Hit Admission Authority
Public Host Owner Quarantine and Typed Command Admission
CRT Display/Input Projection Authority
Campaign Phase Admission Authority
Fixed-Step Command Scheduling Replay and Committed Frame Authority
Public Host Committed Read Model
Combat Resolution and Entity Liveness Authority
Exclusive Terminal Outcome Transaction
Menu Audio Activation and Lifecycle Authority
WebGL context loss/restore and disposal
complete campaign replay
source/build/Pages production proof
```

## Completion boundary

A Ward projectile containing `slow`, a distinct cyan color or an impact ring is not slow-effect proof. Completion requires explicit effect semantics, accepted target modifier state, deterministic movement difference, duration and retirement results, and the first presented frame citing the matching modifier revision.