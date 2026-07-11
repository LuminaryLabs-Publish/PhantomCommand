# PhantomCommand Validation

**Timestamp:** `2026-07-11T18-21-09-04-00`

## Summary

This pass changed documentation only. Source inspection confirms that one final-wave update can set defeat when the sanctum reaches zero and then set victory after the breaching last enemy deletes itself. The same update can overwrite the defeat message, grant the wave reward and write a victory summary. Existing checks do not execute this simultaneous-evidence path.

## Plan ledger

**Goal:** separate verified source facts from planned terminal authority and future executable proof.

- [x] Confirm default branch `main`.
- [x] Compare all ten accessible Publish repositories.
- [x] Confirm all nine eligible repositories have central and root `.agent` coverage.
- [x] Select only `PhantomCommand`.
- [x] Read core breach, enemy deletion, update continuation, wave clear, reward, save, overlay and GameHost paths.
- [x] Verify that `lost` can be set before wave-clear evaluation.
- [x] Verify that final-wave clear can set `won` later in the same update.
- [x] Verify that victory persistence is not gated by exclusive arbitration.
- [x] Define simultaneous-evidence, latch, persistence and frame fixtures.
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
terminal state representation: won:boolean + lost:boolean
exclusive terminal enum: absent
terminal mutation guard: update entry only
core-breach location: inside enemy update
core-breach side effects: decrement core, delete enemy, set lost, set message
processing after lost mutation: remaining units, towers, projectiles, effects and wave clear
wave-clear location: end of fixed update
final-wave side effects: set won, set message, grant reward, write localStorage summary
simultaneous won/lost state possible: yes
overlay precedence when both true: victory first
GameHost exposes both flags: yes
terminal policy ID/version: absent
terminal result ID: absent
terminal latch: absent
persistence admission result: absent
terminal frame receipt: absent
```

## Concrete simultaneous-evidence fixture

```txt
prepare final wave
set spawn queue empty
retain one enemy
place enemy within core breach stop distance
set core health <= enemy core damage
execute one fixed tick

required policy for current survival objective:
  one CoreBreachEvidence row
  one FinalWaveClearEvidence row
  one TerminalOutcomeResult
  outcome = DEFEAT
  won/lost dual state impossible
  victory reward rejected or rolled back
  victory save write rejected
  defeat message projected
  world, HUD, overlay, CRT and GameHost acknowledge the same result
```

## Victory-only fixture

```txt
prepare final wave
keep core health above zero
remove final enemy through accepted combat damage
execute one fixed tick

required:
  final-wave-clear evidence accepted
  no core-breach evidence
  outcome = VICTORY
  terminal result latches once
  one victory persistence result
  one terminal frame acknowledgement
```

## Defeat-only fixture

```txt
prepare non-final wave with remaining enemies or spawn rows
breach core to zero
execute one fixed tick

required:
  core-breach evidence accepted
  outcome = DEFEAT
  no wave advance after terminal commit
  no victory reward
  no victory persistence
```

## Idempotency and stale-evidence fixture

```txt
submit the same TerminalEvidenceInput twice
  -> same result or explicit duplicate no-op

submit later victory evidence after a committed defeat
  -> rejected as terminal-latched

submit evidence from another run epoch
  -> rejected as stale or foreign
```

## Browser terminal-frame smoke

```txt
load deterministic simultaneous-evidence fixture
execute one admitted tick
read TerminalOutcomeResult
capture world, HUD, overlay, CRT and GameHost observations
assert one outcome, resultId, runEpoch, frameId and stateFingerprint
assert no victory summary exists when outcome is DEFEAT
```

## Existing check limitations

`check-campaign.mjs` verifies declarations and source patterns. It does not import a pure simulation, construct final-wave/core-breach state, execute a fixed tick, inspect terminal evidence, observe storage effects or compare terminal consumers.

## Missing future gates

```txt
npm run fixture:terminal-victory
npm run fixture:terminal-defeat
npm run fixture:terminal-simultaneous
npm run fixture:terminal-latch
npm run fixture:terminal-persistence
npm run fixture:terminal-run-epoch
npm run smoke:terminal-frame
```

## Current claim boundary

```txt
repo inventory compared: yes
root .agent state confirmed: yes
repo-local documentation pushed to main: yes
runtime terminal authority implemented: no
exclusive outcome state: no
simultaneous evidence arbitrated: no
victory persistence gated: no
terminal result identity: no
committed terminal frame proof: no
```