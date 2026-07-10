# PhantomCommand Next Steps

**Timestamp:** `2026-07-10T15-38-40-04-00`

## Next safe ledge

```txt
PhantomCommand Campaign Session Authority + Command Correlation Fixture Gate
```

## Goal

Make Begin and Continue explicit, testable session contracts and make every campaign command produce an ordered result that can be correlated with fixed-step simulation and render readback.

Preserve current routes, visuals, controls, gameplay constants, and legacy `window.GameHost` fields while adding DOM-free authority modules and immutable diagnostics.

## Full checklist

```txt
[ ] Keep index.html and game.html route structure unchanged.
[ ] Keep current campaign visuals and controls unchanged.
[ ] Keep existing window.GameHost fields and methods compatible.
[ ] Add src/campaign/session-mode.js.
[ ] Parse campaign=new and campaign=continue deterministically.
[ ] Add src/campaign/save-schema.js with schema, version, sourceRevision, sceneId, sessionId, state, commandSequence, simulationTick, and checksum.
[ ] Classify existing phantomCommand.save victory payloads as legacy completion summaries.
[ ] Do not hydrate nexus.sceneSnapshot or phantom.command.campaign without explicit adapters.
[ ] Add src/campaign/save-hydration.js.
[ ] Add accepted hydration, rejected hydration, and deterministic fallback-new results.
[ ] Move fresh-state construction into a DOM-free campaign state factory.
[ ] Preserve 7 rings, 4 lanes, 58 generated pads, 6 starter allies, 3 tower types, 7 unit archetypes, and 6 waves.
[ ] Add src/campaign/command-envelope.js.
[ ] Add sequence, commandId, sessionId, requestedFrameId, source, type, and payload.
[ ] Add src/campaign/action-results.js.
[ ] Return accepted, rejected, no-op, skipped, and unsupported statuses.
[ ] Split pad selection from build execution at the command layer while preserving second-click UI behavior.
[ ] Add explicit rejection reasons for no selection, no selected pad, occupied pad, insufficient souls, invalid tower type, active wave, complete campaign, won state, and lost state.
[ ] Add src/campaign/action-journal.js with a bounded ordered journal.
[ ] Add src/campaign/frame-correlation.js.
[ ] Correlate command sequence to fixed-step simulation tick and render frame.
[ ] Add src/campaign/render-readback.js.
[ ] Add immutable world, HUD, minimap, overlay, and CRT consumer rows.
[ ] Add src/campaign/gamehost-readback.js.
[ ] Expose additive session, commandJournal, simulation, render, source, and fixture blocks without exposing new mutable references.
[ ] Add tests/phantom-command-session-fixture.mjs.
[ ] Prove new session creation.
[ ] Prove valid continue hydration.
[ ] Prove legacy completion-summary classification.
[ ] Prove invalid continue rejection and deterministic fallback.
[ ] Prove accepted and rejected build, order, and wave-start commands.
[ ] Prove rejected commands preserve state fingerprints.
[ ] Prove deterministic command replay produces the same final state fingerprint.
[ ] Prove render-frame rows correlate with the applied command high-water mark.
[ ] Prove legacy GameHost fields remain present.
[ ] Add the session fixture to npm run check only after it passes independently.
[ ] Gate npm run build with the session fixture only after independent proof.
[ ] Run node tests/phantom-command-session-fixture.mjs.
[ ] Run node tests/phantom-command-campaign-fixture.mjs if retained separately.
[ ] Run node tests/construct-spiral-intro-kit-smoke.mjs.
[ ] Run npm run check.
[ ] Run npm run build.
[ ] Push only to main.
```

## Acceptance rows

```txt
session.mode === new | continue
session.result.status === created | hydrated | rejected | fallback-new
session.save.schema is versioned
session.save.sceneId === grave-ring
campaign.sourceWidth === 640
campaign.sourceHeight === 360
campaign.ringCount === 7
campaign.laneCount === 4
campaign.padCount === 58
campaign.starterAllyCount === 6
campaign.towerTypes === [spire, lantern, ward]
campaign.waveCount === 6
command results cover accepted and rejected build/order/start-wave
rejected command stateBeforeFingerprint === stateAfterFingerprint
journal sequence is monotonic
simulation tick is correlated with command high-water mark
render frame is correlated with simulation tick
legacy window.GameHost fields remain available
central latest tracker equals repo-local latest tracker
```

## Defer until after proof

```txt
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
