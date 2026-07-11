# PhantomCommand Validation

**Timestamp:** `2026-07-11T16-49-51-04-00`

## Summary

This pass changed documentation only. Source inspection confirms a same-tick dead-actor path: `update()` captures the unit collection, `damage()` can delete a later actor, and `updateUnit()` can still execute that deleted actor from the captured array. Existing checks are source-pattern checks and do not execute combat order, liveness, cleanup or frame provenance.

## Plan ledger

**Goal:** separate verified source facts from planned combat authority and future executable proof.

- [x] Confirm default branch `main`.
- [x] Compare all ten accessible Publish repositories.
- [x] Confirm all nine eligible repositories have central and root `.agent` coverage.
- [x] Select only `PhantomCommand`.
- [x] Read spawn, unit, targeting, damage, deletion, reward, core, wave, render and check paths.
- [x] Verify that unit iteration captures an array before lethal deletion.
- [x] Verify that `updateUnit()` has no live-membership rejection.
- [x] Verify that rendering reads post-deletion live maps.
- [x] Define combat-order, liveness, checkpoint parity and frame fixtures.
- [ ] Run behavioral validation after runtime extraction exists.

## Current scripts

```txt
npm run check
  -> node scripts/check-menu.mjs
  -> node scripts/check-campaign.mjs

npm run build
  -> node scripts/build-static.mjs
```

## This pass

```txt
runtime source changed: no
package scripts changed: no
dependencies changed: no
routes changed: no
gameplay changed: no
rendering changed: no
persistence changed: no
deployment workflow changed: no
branch created: no
pull request created: no
npm run check: not run
npm run build: not run
browser smoke: not run
```

## Verified by source inspection

```txt
simulation step: 1/60
unit collection: object keyed by unit ID
unit iteration snapshot: Object.values(state.units)
lethal unit removal: delete state.units[target.id]
liveness check at updateUnit entry: absent
same-tick dead actor execution possible: yes
spawned enemies included in same-tick unit snapshot: yes
spawn first-action policy declared: no
actor order policy declared: no
actor order source: object insertion order
nearest-target tie-break policy declared: no
nearest-target tie behavior: first encountered
melee damage mode: immediate sequential
entity retirement result ID: absent
reference cleanup transaction: absent
combat result identity: absent
combat event journal: absent
combat state fingerprint: absent
render frame correlation: absent
```

## Concrete dead-actor fixture

```txt
create ally A and enemy E
place A before E in stable/captured order
set E health <= A lethal melee damage
set E close enough to attack A or breach core
execute one tick

required:
  E retires once
  E produces no movement
  E produces no attack
  E creates no projectile
  E creates no post-retirement effect
  E causes no core damage
  reward settles once
  committed frame omits E and contains no E-sourced consequence
```

## Order parity fixture

```txt
build two semantically identical states
state 1 inserts entities in order A,B,C
state 2 inserts entities in order C,B,A
execute same admitted commands and tick
assert identical:
  target choices
  movement events
  attack events
  damage events
  retired IDs
  rewards
  core health
  wave evidence
  state fingerprint
```

## Checkpoint order fixture

```txt
capture committed state
hydrate entity records in a different container insertion order
rebuild references and counters
execute next tick
assert CombatResolutionResult and fingerprint match original continuation
```

## Browser frame smoke

```txt
load deterministic lethal-before-turn fixture
execute one admitted tick
read CombatResolutionResult
capture world/HUD/minimap/CRT acknowledgements
assert one shared frameId and stateFingerprint
assert no damage/effect/projectile references a rejected dead actor
```

## Existing check limitations

`check-campaign.mjs` verifies declarations and source patterns. It does not import a pure simulation, create deterministic state, execute a tick, inspect events, compare order variants, validate references or observe a committed frame.

## Missing future gates

```txt
npm run fixture:combat-dead-entity
npm run fixture:combat-order-parity
npm run fixture:combat-target-tie
npm run fixture:combat-reward-settlement
npm run fixture:combat-reference-cleanup
npm run fixture:combat-spawn-eligibility
npm run fixture:combat-checkpoint-order
npm run fixture:combat-terminal-evidence
npm run smoke:combat-frame
```

## Current claim boundary

```txt
repo inventory compared: yes
root .agent state confirmed: yes
repo-local documentation pushed to main: yes
runtime combat authority implemented: no
dead actor rejected after retirement: no
deterministic entity order: no
checkpoint order parity: no
combat result identity: no
committed combat frame proof: no
```
