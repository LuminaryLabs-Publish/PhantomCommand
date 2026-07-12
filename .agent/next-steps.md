# PhantomCommand Next Steps

**Timestamp:** `2026-07-11T21-31-19-04-00`

## Summary

Implement Gate 1 before extending save/load. Continue must be derived from a validated candidate, and campaign startup must explicitly choose NEW or RESUME. The existing victory summary should be classified as legacy completion metadata until a real checkpoint schema exists.

## Plan ledger

**Goal:** replace raw storage presence and ignored query parameters with typed candidate resolution and atomic campaign admission.

- [ ] Create a versioned PhantomCommand save envelope.
- [ ] Define game ID, campaign ID, content revision and checkpoint kind.
- [ ] Read candidates with key and storage-scope provenance.
- [ ] Parse without mutating or overwriting raw bytes.
- [ ] Classify the existing victory summary as non-resumable legacy data.
- [ ] Add deterministic precedence across keys and storage scopes.
- [ ] Publish a typed Continue capability result.
- [ ] Parse and admit `campaign=new|continue`.
- [ ] Stage and validate a complete campaign graph before commit.
- [ ] Add run epoch, checkpoint ID and state fingerprint.
- [ ] Publish a typed resume result.
- [ ] Prove the first resumed frame consumed the selected checkpoint.
- [ ] Add rejected-candidate and storage-failure fixtures.

## Gate 1 implementation sequence

1. Add `src/persistence/save-envelope.js`.
2. Add `src/persistence/save-candidate-resolver.js`.
3. Add `src/persistence/checkpoint-schema.js`.
4. Add `src/persistence/checkpoint-migrations.js`.
5. Add `src/persistence/checkpoint-validation.js`.
6. Replace `hasCampaignSave()` with `resolveContinueCapability()`.
7. Store the selected candidate ID in menu state.
8. Preserve raw rejected candidates and expose a non-destructive error result.
9. Parse `campaign` route intent in `campaign-scene.js`.
10. Reject unsupported or stale resume requests instead of silently starting fresh.
11. Add `createNewCampaignState()` and `hydrateCampaignState(checkpoint)`.
12. Stage IDs, units, towers, pads, queues and derived references off-line.
13. Commit one new run epoch only after full validation.
14. Publish `CampaignStartResult`.
15. Correlate the first rendered frame with checkpoint and run identity.
16. Add candidate, migration, hydration and first-frame fixtures.

## Target files

```txt
src/menu/graveyard-menu.js
src/campaign/campaign-scene.js
src/persistence/save-envelope.js
src/persistence/save-candidate-resolver.js
src/persistence/checkpoint-schema.js
src/persistence/checkpoint-migrations.js
src/persistence/checkpoint-validation.js
src/persistence/campaign-hydration.js
tests/save-candidate.fixture.mjs
tests/continue-route.fixture.mjs
tests/campaign-hydration.fixture.mjs
scripts/smoke-continue-resume.mjs
package.json
```

## Required fixtures

```txt
no candidates -> Continue disabled
malformed candidate -> rejected, raw bytes preserved
foreign nexus.sceneSnapshot -> wrong-game rejection
multiple candidates -> deterministic selected candidate
session-only candidate -> provenance retained
legacy victory summary -> not resumable
campaign=new -> fresh defaults, no storage hydration
campaign=continue without selected candidate -> typed rejection
valid checkpoint -> exact staged state and rebuilt references
invalid semantic checkpoint -> zero live-state mutation
storage read failure -> unavailable result, no false Continue
first resumed frame -> matching checkpointId, fingerprint, runEpoch and frameId
```
