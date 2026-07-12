# PhantomCommand Next Steps

**Timestamp:** `2026-07-12T03-00-46-04-00`

## Summary

Preserve Continue, public-host, and CRT-projection gates, then replace independent campaign booleans with one revisioned phase model. Every wave, build, order, selection, pause, camera, and host action must consume the same phase snapshot and return a typed result before fixed-step scheduling and replay work proceeds.

## Plan ledger

**Goal:** close paused and terminal mutation leaks without creating separate phase logic in keyboard, pointer, simulation, renderer, and `GameHost` paths.

- [ ] Preserve Continue/checkpoint Gate 1.
- [ ] Preserve public-host owner quarantine and typed command admission.
- [ ] Preserve CRT display/input projection admission.
- [ ] Add one canonical campaign phase schema and legal transition table.
- [ ] Derive one phase from campaign state at a committed boundary.
- [ ] Add phase identity and monotonically increasing revision.
- [ ] Define one action-kind policy matrix.
- [ ] Route Space, pointer, number, pause, camera, and host actions through admission.
- [ ] Fence gameplay mutation while paused.
- [ ] Make WON and LOST mutation-closed.
- [ ] Return typed results for accepted and rejected actions.
- [ ] Correlate action, phase, tick, terminal outcome, and visible frame.
- [ ] Add pure, browser, public-host, and Pages fixtures.

## Immediate safe ledge

1. Add a pure `CampaignPhase` derivation from existing state.
2. Reject illegal overlapping combinations before mutating gameplay.
3. Add `CampaignActionKind` and an explicit phase policy matrix.
4. Wrap `startWave`, `build`, `order`, `selectAt`, pause and tower-type changes.
5. Return typed results without exposing live owners.
6. Keep camera/presentation actions in a separately declared policy class.
7. Add paused and terminal zero-mutation fixtures before changing scheduling.

## Full implementation sequence

1. Add `src/campaign/phase/campaign-phase.js`.
2. Add `src/campaign/phase/campaign-phase-transition-table.js`.
3. Add `src/campaign/actions/campaign-action-envelope.js`.
4. Add `src/campaign/actions/campaign-action-policy.js`.
5. Add `src/campaign/actions/campaign-action-result.js`.
6. Extract pure action preflight and mutation staging from `campaign-scene.js`.
7. Route keyboard actions through the command adapter.
8. Route pointer selection, build and order through the command adapter.
9. Route pause and tower-type changes through the command adapter.
10. Classify camera pan, zoom and focus as presentation or gameplay actions.
11. Replace `GameHost` mutators with legacy adapters over admitted commands.
12. Add phase revision and action result to the committed read model.
13. Add terminal mutation fencing.
14. Add phase/action render receipts.
15. Add fixture coverage before fixed-step command scheduling work.

## Target files

```txt
src/campaign/campaign-scene.js
src/campaign/phase/campaign-phase.js
src/campaign/phase/campaign-phase-transition-table.js
src/campaign/actions/campaign-action-envelope.js
src/campaign/actions/campaign-action-policy.js
src/campaign/actions/campaign-action-result.js
tests/campaign-phase.fixture.mjs
tests/campaign-action-admission.fixture.mjs
tests/campaign-terminal-mutation.fixture.mjs
scripts/smoke-campaign-phase.mjs
scripts/check-campaign.mjs
package.json
```

## Required policy decisions

```txt
Can towers be built during RUNNING_WAVE?
Can selection change while paused?
Can camera pan/zoom continue while paused or terminal?
Does Space while paused queue the next wave or reject?
Can terminal screens permit presentation-only camera inspection?
Which actions are durable gameplay versus local presentation state?
```

Each answer belongs in the policy matrix, not in scattered handler conditionals.

## Required fixtures

```txt
Space during PLANNING -> accepted once
Space during active wave -> typed rejection, zero mutation
Space while paused -> typed rejection or explicit queued-wave result
build while paused -> zero durable mutation
order while paused -> zero durable mutation
build after WON -> rejected, Souls/towers unchanged
order after LOST -> rejected, units/effects unchanged
P after terminal -> rejected or explicit presentation-only result
invalid boolean combinations -> rejected or normalized deterministically
stale phase revision -> zero mutation
GameHost and browser action parity
first visible accepted-action frame cites actionResultId and phaseRevision
terminal overlay frame cites immutable terminal revision
```

## Dependency order

```txt
Continue admission
  -> public host owner quarantine
  -> CRT projection admission
  -> campaign phase admission
  -> fixed-step command scheduling and replay
  -> committed read model
  -> combat liveness
  -> exclusive terminal transaction
  -> runtime lifecycle
  -> checkpoint capture
```

## Do not claim

Do not claim pause correctness, terminal immutability, legal phase transitions, action admission, public-host parity, or phase-coherent rendering until the fixtures pass on `main`.