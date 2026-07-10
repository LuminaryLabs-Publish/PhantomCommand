# PhantomCommand Next Steps

**Timestamp:** `2026-07-10T17-08-36-04-00`

## Next safe ledge

```txt
PhantomCommand Save Admission Authority + Resume Fidelity Fixture Gate
```

## Goal

Make Continue truthful and deterministic. The menu must enable it only for a classified resumable save, and the campaign must hydrate a versioned full-state envelope whose restored fingerprint matches the state that was saved.

Preserve current routes, visuals, controls, gameplay constants, and legacy `window.GameHost` fields while adding DOM-free persistence modules and immutable session diagnostics.

## Full checklist

```txt
[ ] Keep index.html and game.html route structure unchanged.
[ ] Keep current campaign visuals, controls, constants, and fixed 1/60 simulation unchanged.
[ ] Keep existing window.GameHost fields and methods compatible.
[ ] Add src/campaign/save-candidate-registry.js.
[ ] Define candidate key, storage layer, source owner, expected schema family, and priority.
[ ] Add src/campaign/save-classifier.js.
[ ] Classify absent, invalid-json, foreign-schema, legacy-completion-summary, resumable-current, resumable-migrated, unsupported-version, and checksum-failed candidates.
[ ] Treat nexus.sceneSnapshot and phantom.command.campaign as foreign until explicit adapters exist.
[ ] Treat the current { scene, souls, wave } phantomCommand.save payload as a legacy completion summary, not a resumable save.
[ ] Enable Continue only when at least one candidate classifies as resumable-current or resumable-migrated.
[ ] Expose the selected candidate and classification reason through PhantomMenu.getState().
[ ] Add src/campaign/session-mode.js.
[ ] Parse campaign=new and campaign=continue deterministically.
[ ] Add src/campaign/save-envelope.js.
[ ] Include schema, version, sourceRevision, sceneId, sessionId, savedAtMs, simulationTick, commandSequence, and checksum.
[ ] Include uid, pid, and tid counters.
[ ] Include time, souls, core, wave, waveActive, spawn queue, units, towers, pad occupancy, projectiles, effects, selected units, selected pad, tower type, paused, won, lost, and message.
[ ] Include camera x, z, zoom, targetZoom, and any required resume-safe camera values.
[ ] Decide explicitly whether transient pointer, drag, pressed-key, and accumulator state is reset or persisted.
[ ] Add src/campaign/session-state-snapshot.js.
[ ] Normalize object maps and arrays into a stable JSON-safe envelope.
[ ] Add src/campaign/session-fingerprint.js.
[ ] Produce stable before-save and after-hydration fingerprints.
[ ] Add src/campaign/save-hydration.js.
[ ] Return typed created, hydrated, rejected, migrated, and fallback-new results.
[ ] Preserve the rejected candidate and reason in diagnostics.
[ ] Use deterministic fallback-new behavior for invalid Continue requests.
[ ] Add src/campaign/resume-result.js.
[ ] Record selected candidate, classification, schema version, fingerprint, migration status, and fallback decision.
[ ] Add src/campaign/gamehost-session-readback.js.
[ ] Expose immutable additive session, persistence, source, and fixture blocks.
[ ] Do not expose new mutable state references.
[ ] Add tests/phantom-command-save-admission-fixture.mjs.
[ ] Prove empty storage disables Continue.
[ ] Prove malformed JSON disables Continue with invalid-json classification.
[ ] Prove foreign nexus.sceneSnapshot does not enable Continue without an adapter.
[ ] Prove foreign phantom.command.campaign does not enable Continue without an adapter.
[ ] Prove legacy victory summary is classified but not hydrated.
[ ] Prove current resumable envelope enables Continue.
[ ] Prove candidate priority is deterministic across storage layers.
[ ] Add tests/phantom-command-resume-fidelity-fixture.mjs.
[ ] Save a nontrivial campaign state with units, towers, damaged core, active wave, camera, queues, and counters.
[ ] Hydrate the envelope into a fresh runtime state factory.
[ ] Prove saved and hydrated fingerprints match.
[ ] Prove the next generated unit, projectile, and tower identifiers do not collide.
[ ] Prove the next fixed-step update advances from the restored simulation tick.
[ ] Prove rejected hydration does not partially mutate live state.
[ ] Prove legacy GameHost fields remain present.
[ ] Add both fixtures to npm run check only after each passes independently.
[ ] Gate npm run build only after independent fixture proof.
[ ] Run node tests/phantom-command-save-admission-fixture.mjs.
[ ] Run node tests/phantom-command-resume-fidelity-fixture.mjs.
[ ] Run node tests/construct-spiral-intro-kit-smoke.mjs if retained.
[ ] Run npm run check.
[ ] Run npm run build.
[ ] Push only to main.
```

## Acceptance rows

```txt
menu.continueEnabled === false when no resumable candidate exists
menu.continueEnabled === false for malformed, foreign, unsupported, or legacy-summary candidates
menu.selectedSaveCandidate.classification === resumable-current | resumable-migrated
session.mode === new | continue
session.result.status === created | hydrated | migrated | rejected | fallback-new
session.save.schema is versioned
session.save.sceneId === grave-ring
session.save.sourceRevision is present
session.save.checksum is verified
session.beforeFingerprint === session.afterHydrationFingerprint
session.hydration is atomic
campaign.sourceWidth === 640
campaign.sourceHeight === 360
campaign.ringCount === 7
campaign.laneCount === 4
campaign.padCount === 58
campaign.starterAllyCount === 6
campaign.towerTypes === [spire, lantern, ward]
campaign.waveCount === 6
uid, pid, and tid counters resume without collisions
simulation tick resumes deterministically
legacy window.GameHost fields remain available
central latest tracker equals repo-local latest tracker
```

## Defer until after proof

```txt
command journal and frame correlation implementation
new campaign waves
new unit or tower types
economy expansion
save/load UI redesign
camera rewrite
renderer replacement
pixel art expansion
multiplayer or RTS scenario expansion
legacy construct-profile parity work
```
