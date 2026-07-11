# PhantomCommand Next Steps

**Timestamp:** `2026-07-11T05-50-43-04-00`

## Summary

Keep the dependency order intact. Candidate resolution, fixed-step action authority and runtime lifecycle must land before the versioned checkpoint/resume transaction. The checkpoint implementation must capture only committed state, validate a complete staged graph, advance a resume epoch atomically and prove first-frame consumption.

## Plan ledger

**Goal:** implement deterministic Continue from candidate selection through an acknowledged resumed frame without allowing partial hydration, stale callbacks or invalid relational state.

- [ ] Finish save-candidate resolution first.
- [ ] Finish fixed-step command/action-result authority second.
- [ ] Finish runtime lifecycle ownership third.
- [ ] Add committed checkpoint admission.
- [ ] Add versioned envelope and content identity.
- [ ] Add canonical fingerprint and migration registry.
- [ ] Add staged hydration and invariant validation.
- [ ] Add atomic resume commit, rollback and resume epoch.
- [ ] Add detached persistence observation and first-frame acknowledgement.
- [ ] Add roundtrip, corruption, migration and browser resume gates.

## Ordered implementation sequence

### Gate 1: Continue capability

1. Replace Boolean save presence with a candidate-slot registry.
2. Parse each local/session candidate independently.
3. Classify schema, content identity and provenance.
4. Apply deterministic precedence.
5. Publish one selected candidate or a typed rejection.
6. Pass candidate identity into campaign startup.

### Gate 2: Campaign action authority

1. Normalize pointer, keyboard and GameHost sources into commands.
2. Add command IDs, sequences and target ticks.
3. Preflight commands without mutation.
4. Apply accepted commands only inside fixed-step updates.
5. Publish typed results, domain events and canonical state fingerprints.
6. Publish committed-frame consumption rows.

### Gate 3: Runtime lifecycle

1. Extract menu and campaign factories from module scope.
2. Add session identity and lifecycle states.
3. Add startup transaction and rollback.
4. Lease RAF, listeners, timers, globals, audio and CRT resources.
5. Complete teardown before navigation, reload or restart.
6. Fence stale callbacks by run generation.
7. Expose detached lifecycle observation.

### Gate 4: Versioned checkpoint and atomic resume

1. **Add a committed checkpoint boundary**
   - Capture only after a completed fixed simulation tick.
   - Require no partially applied command.
   - Record tick and applied command sequence cursor.
   - Reset or reject nonzero accumulator remainder.

2. **Define schema and content identity**
   - `schema = phantom-command.campaign-checkpoint`.
   - Explicit schema version.
   - Explicit campaign content ID/version.
   - Stable content hash for rings, lanes, pads, archetypes and waves.

3. **Capture a canonical detached payload**
   - Scalars: time, souls, core, wave, waveActive.
   - Entity state: spawn, units, towers, projectiles.
   - Relationships: pad tower ownership, selection, targets.
   - Identity: uid, pid, tid.
   - Continuity: selectedPad, towerType, camera.
   - Terminal: paused, won, lost, message.
   - Exclude live DOM, WebGL, audio, listeners, timers, RAF and input handles.

4. **Fingerprint the checkpoint**
   - Canonical key and collection ordering.
   - Stable numeric normalization.
   - Fingerprint covers all authoritative payload fields.
   - Roundtrip capture must reproduce the same fingerprint.

5. **Add admission and migration**
   - Enforce size/type limits before parsing.
   - Reject malformed JSON, unknown schema and content mismatch.
   - Migrate only through declared deterministic functions.
   - Recompute and verify fingerprint after migration.

6. **Stage hydration off-line**
   - Build new maps/arrays/counters away from the live session.
   - Restore units and towers before references.
   - Rebuild pads, selection, target and projectile links.
   - Restore counters only after collision checks.

7. **Validate invariants**
   - Unique IDs.
   - Valid references.
   - Valid archetypes, lanes and wave bounds.
   - Counter monotonicity.
   - Valid terminal combinations.
   - Canonical fingerprint parity.

8. **Commit atomically**
   - Preserve the active session while staging.
   - Stop new input/command admission.
   - Replace one complete state graph.
   - Advance `resumeEpoch` exactly once.
   - Reset input, wall-clock timestamp and accumulator.
   - Roll back to the unchanged prior session on failure.

9. **Acknowledge the first resumed frame**
   - World, HUD and minimap consume the same tick/fingerprint.
   - CRT upload acknowledges the same source frame.
   - Publish one first-frame result for the resume epoch.
   - Reject stale pre-resume RAF callbacks.

10. **Add persistence observation**
    - Selected candidate metadata.
    - Last save/load result.
    - Schema/content versions.
    - Checkpoint ID/fingerprint.
    - Resume epoch.
    - Bounded clone-safe journal.

11. **Add fixtures**
    - Fresh and mid-wave roundtrip.
    - Active towers, projectiles, selections and camera continuity.
    - Paused and terminal states.
    - Corrupt fingerprint.
    - Unsupported schema and content mismatch.
    - Duplicate/missing references and counter collision.
    - Failed hydrate/commit leaves active session unchanged.
    - Idempotent duplicate Resume command.
    - Migration from every supported version.
    - First-frame acknowledgement.

12. **Add deployment gate**
    - `npm run check`.
    - `npm run fixture:checkpoint`.
    - `npm run build`.
    - Browser Continue/resume smoke.
    - Publish only after all pass on `main`.

## First target files

```txt
src/persistence/checkpoint-envelope.js
src/persistence/checkpoint-capture.js
src/persistence/checkpoint-validation.js
src/persistence/checkpoint-migrations.js
src/persistence/hydration-stage.js
src/persistence/resume-transaction.js
src/persistence/storage-adapter.js
src/runtime/runtime-session.js
src/menu/graveyard-menu.js
src/campaign/campaign-scene.js
tests/checkpoint-roundtrip.fixture.mjs
scripts/check-checkpoint.mjs
package.json
```

## Out of scope for this ledge

```txt
new waves, units or towers
new save-slot UI
cloud or remote saves
networked co-op persistence
renderer replacement
visual polish
construct-profile revival
```
