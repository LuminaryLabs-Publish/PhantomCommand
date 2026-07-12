# PhantomCommand Next Steps

**Timestamp:** `2026-07-11T23-28-29-04-00`

## Summary

Preserve Continue admission as Gate 1, then remove raw `state` and `camera` references from `window.GameHost`. Public mutation must become a typed command path, and public observation must come from one immutable committed-frame record rather than independently sampled live owners.

## Plan ledger

**Goal:** close the public owner-bypass path without creating a second command or frame authority.

- [ ] Preserve the existing Continue/checkpoint Gate 1 ordering.
- [ ] Define the supported public read and command capabilities.
- [ ] Remove raw `state` and `camera` references from `window.GameHost`.
- [ ] Remove direct public `startWave`, `build` and `setZoom` mutators.
- [ ] Add command IDs, host session identity and expected run/phase revisions.
- [ ] Validate all numeric inputs as finite and bounded.
- [ ] Route accepted host commands through the same command authority as browser input.
- [ ] Publish typed rejection, pending, committed and failed results.
- [ ] Build an immutable host read model from a committed frame.
- [ ] Correlate host observations with simulation tick, run epoch and render receipt.
- [ ] Retain a bounded public journal with no owner handles.
- [ ] Add host-isolation, stale-command, terminal and frame-coherence fixtures.

## Immediate safe ledge

1. Replace the current host assignment with a factory that closes over private owners.
2. Publish explicit capability descriptors.
3. Return `structuredClone` plus deep freeze from read methods.
4. Remove the raw `state` and `camera` properties.
5. Reject every mutation until a typed command gateway exists.
6. Keep browser controls operating through existing internal functions.
7. Add a temporary compatibility result for callers that previously expected direct mutators.

## Full implementation sequence

1. Add `src/host/host-capabilities.js`.
2. Add `src/host/host-command-schema.js`.
3. Add `src/host/host-command-admission.js`.
4. Add `src/host/host-read-model.js`.
5. Add `src/host/host-journal.js`.
6. Introduce `hostSessionId`, `runEpoch`, `phaseRevision` and `frameId`.
7. Refactor browser actions into reusable internal command handlers.
8. Route public commands to those handlers through explicit capability checks.
9. Reject non-finite zoom and coordinate values before mutation.
10. Replace public `state` and `camera` with immutable descriptors.
11. Publish `getCommittedState()` only after render commit.
12. Publish `HostCommandResult` with command and frame correlation.
13. Add teardown so old hosts reject commands after navigation or reload.
14. Add pure fixtures and one browser smoke.

## Target files

```txt
src/campaign/campaign-scene.js
src/host/host-capabilities.js
src/host/host-command-schema.js
src/host/host-command-admission.js
src/host/host-read-model.js
src/host/host-journal.js
tests/host-mutation-isolation.fixture.mjs
tests/host-command-admission.fixture.mjs
tests/host-read-model.fixture.mjs
scripts/smoke-public-host.mjs
scripts/check-campaign.mjs
package.json
```

## Required fixtures

```txt
host object contains no raw state or camera reference
mutating returned read model cannot mutate runtime
unsupported capability performs zero mutation
missing command ID is rejected
stale host session is rejected
stale run epoch is rejected
stale phase revision is rejected
NaN, Infinity and out-of-range zoom are rejected
terminal-state wave/build commands are rejected
accepted browser and host commands produce equivalent internal results
getCommittedState remains unchanged between frame commits
host frameId matches the visible render receipt
old host rejects commands after disposal or navigation
legacy compatibility exposes no owner handle
```
