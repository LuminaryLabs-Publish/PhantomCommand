# PhantomCommand Combat Order and Liveness Fixture Gate

**Timestamp:** `2026-07-11T16-49-51-04-00`

## Summary

The existing campaign check verifies source declarations only. Deployment currently has no executable proof that dead entities cannot act, insertion order cannot change combat, rewards settle once, references are clean, or rendered damage has source provenance.

## Plan ledger

**Goal:** block combat-authority claims and future deployment changes on deterministic Node fixtures plus one browser committed-frame smoke.

- [x] Review current `npm run check` coverage.
- [x] Define pure combat fixtures.
- [x] Define browser frame-provenance smoke.
- [x] Define deployment admission criteria.
- [ ] Implement scripts and wire them into `npm run check`.

## Existing validation

```txt
npm run check
  -> scripts/check-menu.mjs
  -> scripts/check-campaign.mjs
```

`check-campaign.mjs` checks source patterns such as canvas presence, content declarations, camera target zoom, CRT upload and `window.GameHost`. It does not execute the simulation.

## Required scripts

```txt
tests/combat-dead-entity.fixture.mjs
tests/combat-order-parity.fixture.mjs
tests/combat-target-tie.fixture.mjs
tests/combat-reward-settlement.fixture.mjs
tests/combat-reference-cleanup.fixture.mjs
tests/combat-spawn-eligibility.fixture.mjs
tests/combat-checkpoint-order.fixture.mjs
tests/combat-terminal-evidence.fixture.mjs
scripts/check-combat-runtime.mjs
scripts/smoke-combat-frame.mjs
```

## Required pure fixture cases

```txt
1. earlier actor kills later captured enemy
   -> enemy produces no action

2. same canonical state with reversed object insertion order
   -> identical CombatResolutionResult and fingerprint

3. equal-distance targets in different container order
   -> same target ID

4. two lethal damage intents against one enemy
   -> one retirement and one reward

5. selected entity retires
   -> selection and target references clean before commit

6. projectile target retires before projectile phase
   -> declared orphan policy result

7. spawn becomes due on tick
   -> first-action timing matches policy

8. checkpoint hydrates entities in another order
   -> same next-tick outcome

9. core breach and final enemy death share a tick
   -> explicit evidence feeds terminal arbitration
```

## Required browser smoke

```txt
load deterministic campaign fixture
  -> capture pre-tick state and source frame
  -> execute lethal-before-turn tick
  -> assert no dead actor event
  -> assert core and ally health match CombatResolutionResult
  -> assert visible entity set excludes retired actor
  -> assert world, HUD, minimap and CRT acknowledge one frame ID
  -> assert no unexplained projectile or effect appears
```

## Package gate

```txt
npm run check
  -> existing static checks
  -> pure combat fixtures
  -> combat source/runtime consistency check

npm run smoke:combat-frame
  -> browser committed-frame smoke
```

## Deployment admission

```txt
static source checks pass
all combat fixtures pass
state fingerprints match across insertion orders
checkpoint-order parity passes
dead-entity no-action proof passes
terminal evidence fixture passes
browser committed-frame smoke passes
build output contains the tested source revision
```

## Current status

```txt
pure combat fixture harness: absent
browser combat smoke: absent
combat result type: absent
entity order policy: absent
liveness index: absent
state fingerprint: absent
committed frame receipt: absent
deployment gate: not wired
```
