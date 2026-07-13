# PhantomCommand Next Steps

**Timestamp:** `2026-07-12T22-05-12-04-00`

## Summary

Implement Campaign Bootstrap and Continue Resume Authority before claiming browser persistence. Continue must be enabled from a validated compatible checkpoint, hydrate every declared participant into detached state, commit one run generation atomically and prove the first matching frame.

## Plan ledger

**Goal:** replace route-label continuation with a complete, versioned and rollback-safe New/Continue transaction.

### Entry intent and availability

- [ ] Add typed `CampaignEntryIntent` parsing for `new` and `continue`.
- [ ] Reject missing, unknown, stale and duplicate bootstrap intent.
- [ ] Replace raw three-key truthiness with `ContinueAvailabilityResult`.
- [ ] Select one canonical campaign save slot and explicit legacy-import policy.
- [ ] Keep unavailable or invalid Continue outside gameplay with typed feedback.

### Checkpoint envelope

- [ ] Add schema name and version.
- [ ] Add checkpoint ID/revision and run ID/generation.
- [ ] Add checksum, state fingerprint and source/content fingerprints.
- [ ] Add a migration registry with explicit supported paths.
- [ ] Add typed Missing, ReadFailed, Malformed, Unsupported and Incompatible results.

### Participant coverage

- [ ] Register campaign, economy, wave, entity, pad, identity, selection, camera and simulation participants.
- [ ] Capture complete unit, tower, spawn and pad-reference state.
- [ ] Define explicit persist-or-reset policy for projectiles and effects.
- [ ] Preserve or safely regenerate uid, pid and tid without collisions.
- [ ] Capture deterministic fixed-step boundary and scheduler linkage.

### Candidate hydration and validation

- [ ] Parse and migrate outside live state.
- [ ] Build fresh and restored candidates in detached structures.
- [ ] Validate finite values, unique IDs and authored references.
- [ ] Validate reciprocal pad/tower occupancy.
- [ ] Validate selection, targets, projectiles and spawn references.
- [ ] Validate wave/outcome coherence and state fingerprint.

### Atomic commit lifecycle

- [ ] Add bootstrap command ID and expected predecessor generation.
- [ ] Install all participants under one successor generation.
- [ ] Preserve predecessor state until candidate validation succeeds.
- [ ] Add verified rollback and actual rollback result.
- [ ] Retire predecessor exactly once after successful commit.
- [ ] Reject stale and duplicate command/results with zero mutation.

### Rendering and diagnostics

- [ ] Stop simulation and rendering until bootstrap is terminal.
- [ ] Publish immutable `CampaignBootstrapResult` readback.
- [ ] Bind world, HUD, minimap and CRT snapshots to run generation.
- [ ] Acknowledge the first visible frame citing the bootstrap result.
- [ ] Expose no raw mutable candidate or checkpoint handles through GameHost.

### Proof

- [ ] Add fresh-run preset fingerprint fixture.
- [ ] Add full non-default checkpoint roundtrip fixture.
- [ ] Add missing, malformed, unsupported and incompatible fixtures.
- [ ] Add missing-participant and broken-reference fixtures.
- [ ] Add commit-failure and verified-rollback fixture.
- [ ] Add stale and duplicate bootstrap fixtures.
- [ ] Add first-visible-restored-frame fixture.
- [ ] Run the matrix against source, built output and GitHub Pages.
- [ ] Run `npm run check` and `npm run build` after fixture wiring.

## Existing owners to update

```txt
src/menu/graveyard-menu.js
src/campaign/campaign-scene.js
menu-route-kit
menu-save-presence-kit
campaign-route-shell-kit
pixel-campaign-runtime-kit
fixed-step-campaign-simulation-kit
pixel-campaign-render-kit
legacy-gamehost-diagnostics-kit
menu-static-check-kit
campaign-static-check-kit
scripts/check-menu.mjs
scripts/check-campaign.mjs
package.json
index.html
game.html
```

## Required command

```txt
CampaignBootstrapCommand {
  commandId
  runtimeSessionId
  routeRevision
  entryIntent
  expectedRunGeneration?
  expectedCheckpointId?
  expectedCheckpointRevision?
  expectedSourceFingerprint
}
```

## Required result

```txt
CampaignBootstrapResult {
  commandId
  kind
  predecessorRunGeneration?
  successorRunGeneration?
  checkpointId?
  checkpointRevision?
  stateFingerprint?
  rejectionReason?
  rolledBack
  firstVisibleFrameAckId?
}
```

## Minimal correction sequence

```txt
1. Parse one typed entry intent.
2. Replace storage truthiness with compatibility admission.
3. Define a complete checkpoint envelope and participant registry.
4. Construct fresh/restored candidates outside live state.
5. Validate every participant and cross-reference.
6. Commit one successor generation atomically or preserve predecessor.
7. Publish one terminal bootstrap result.
8. Start simulation only after committed success.
9. Bind rendering and GameHost readback to the committed generation.
10. Prove source/build/Pages parity and first visible frame.
```

## Dependency order

```txt
Runtime Session Resource Lifecycle Authority
  -> Campaign Bootstrap and Continue Resume Authority
  -> Versioned Full Campaign Checkpoint Capture Authority
  -> Campaign Keyboard Command Admission Authority
  -> Campaign Action Result and Spatial Input Admission
  -> committed frame proof
```

Do not patch only the query string or load three saved fields into live state. The correction requires complete participant coverage, compatibility admission, detached validation, atomic installation and visible-generation proof.