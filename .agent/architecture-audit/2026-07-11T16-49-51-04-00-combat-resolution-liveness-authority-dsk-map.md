# PhantomCommand Combat Resolution and Liveness Authority DSK Map

**Timestamp:** `2026-07-11T16-49-51-04-00`

## Summary

The fixed-step loop lacks a composed owner for entity order, liveness, intent collection, damage resolution, retirement, reference cleanup and committed combat evidence. The current implementation mutates and deletes entities while traversing a captured array, allowing a retired entity to execute later in the same tick.

## Plan ledger

**Goal:** define the domain boundaries and kit services required to convert mutable insertion-order combat into one deterministic committed result.

- [x] Map current combat owners.
- [x] Identify mutation and liveness boundaries.
- [x] Separate input, intent, resolution, retirement and terminal evidence.
- [x] Define kit responsibilities and dependency order.
- [ ] Implement and fixture-gate the composed domain.

## Current ownership map

```txt
campaign-scene.js
  owns content data
  owns mutable unit/tower/projectile/effect state
  owns spawn timers
  owns target search
  owns movement
  owns attack timing
  owns immediate damage
  owns deletion and rewards
  owns core breach
  owns wave completion
  owns rendering
  owns input and GameHost
```

This concentration prevents independent validation, deterministic ordering and rollback.

## Existing domains

```txt
spawn-queue-domain
unit-ai-domain
enemy-pathing-domain
ally-targeting-domain
tower-targeting-domain
projectile-domain
damage-reward-domain
effect-domain
sanctum-core-health-domain
wave-clear-predicate-domain
fixed-step-simulation-domain
world-render-domain
hud-projection-domain
minimap-domain
```

## Missing parent domain

```txt
phantom-command-combat-resolution-authority-domain
```

## Required kit map

| Kit | Owns | Offers |
|---|---|---|
| `phantom-command-combat-frame-input-kit` | Immutable tick-local state and admitted commands | `captureCombatFrameInput()` |
| `phantom-command-entity-liveness-index-kit` | Alive/retired identity truth for the tick | `isAlive()`, `requireAlive()` |
| `phantom-command-deterministic-entity-order-kit` | Versioned stable order policy | `sortEntityIds()` |
| `phantom-command-spawn-admission-phase-kit` | Due-spawn admission and first-action policy | `admitSpawns()` |
| `phantom-command-unit-intent-kit` | Movement/idle/attack intent collection | `collectUnitIntents()` |
| `phantom-command-target-selection-policy-kit` | Stable nearest-target and tie-break policy | `selectTarget()` |
| `phantom-command-attack-intent-kit` | Melee, ranged and tower attack intent | `collectAttackIntents()` |
| `phantom-command-damage-intent-kit` | Normalized direct and splash damage rows | `createDamageIntent()` |
| `phantom-command-damage-resolution-policy-kit` | Sequential or simultaneous declared damage policy | `resolveDamage()` |
| `phantom-command-entity-retirement-kit` | Exactly-once death and removal | `retireEntities()` |
| `phantom-command-reference-cleanup-kit` | Selection, target, projectile and ownership cleanup | `cleanReferences()` |
| `phantom-command-reward-settlement-kit` | Exactly-once soul rewards | `settleRewards()` |
| `phantom-command-core-breach-event-kit` | Typed sanctum damage evidence | `resolveCoreBreaches()` |
| `phantom-command-wave-clear-evaluation-kit` | Post-resolution wave-clear predicate | `evaluateWaveClear()` |
| `phantom-command-combat-resolution-result-kit` | Immutable accepted combat result | `publishCombatResolution()` |
| `phantom-command-combat-resolution-journal-kit` | Bounded event and fingerprint rows | `appendCombatJournal()` |
| `phantom-command-dead-entity-no-action-fixture-kit` | Retired actor proof | `runDeadEntityFixture()` |
| `phantom-command-combat-order-parity-fixture-kit` | Insertion-order parity proof | `runOrderParityFixture()` |
| `phantom-command-checkpoint-order-parity-fixture-kit` | Hydration/rebuild parity proof | `runCheckpointOrderFixture()` |
| `phantom-command-ghost-action-frame-smoke-kit` | Visible-frame provenance proof | `runGhostActionFrameSmoke()` |

## Required dependency graph

```txt
fixed-step command queue
  -> CombatFrameInput
  -> spawn admission
  -> liveness index
  -> deterministic order
  -> unit and target intents
  -> attack and damage intents
  -> damage resolution
  -> retirement
  -> reference cleanup
  -> reward and core-breach settlement
  -> wave-clear evidence
  -> CombatResolutionResult
  -> terminal arbitration
  -> committed state fingerprint
  -> render snapshot and frame acknowledgement
```

## Required identities

```txt
sessionId
runEpoch
simulationTickId
combatResolutionId
entityOrderPolicyVersion
spawnPolicyVersion
damagePolicyVersion
entityId
intentSequence
damageSequence
retirementSequence
stateFingerprint
frameId
```

## Required result

```txt
CombatResolutionResult {
  combatResolutionId,
  simulationTickId,
  admittedSpawnIds,
  actedEntityIds,
  rejectedDeadActorIds,
  movementEvents,
  attackEvents,
  projectileEvents,
  damageEvents,
  retiredEntityIds,
  rewardEvents,
  coreDamageEvents,
  waveClearEvidence,
  entityOrderPolicyVersion,
  damagePolicyVersion,
  stateFingerprint,
  status
}
```

## Invariants

```txt
only alive entities may produce intents
an entity retires at most once
a retired entity cannot attack, move, spawn a projectile or damage the core
rewards settle at most once per retired enemy
all target references resolve to alive entities at commit
insertion order cannot change the result
checkpoint reconstruction order cannot change the result
terminal predicates consume only the completed CombatResolutionResult
rendering consumes only the committed post-cleanup state
```

## Integration order

```txt
1. fixed-step command and tick identities
2. combat frame input and liveness index
3. deterministic order and target policy
4. intent collection
5. damage resolution and retirement
6. cleanup, rewards and core events
7. combat result and journal
8. terminal arbitration
9. committed-frame acknowledgement
10. parity and ghost-action fixtures
```
