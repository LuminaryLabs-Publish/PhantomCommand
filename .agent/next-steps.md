# PhantomCommand Next Steps

**Timestamp:** `2026-07-09T01-20-59-04-00`

## Next safe ledge

```txt
PhantomCommand SourceProfile Fixture Build Readback + GameHost Consumer Splice Gate
```

## Goal

Preserve the current live visual while moving the live `smooth-ring-handoff-v6` source profile, ring descriptors, piece descriptors, timeline descriptors, source fingerprint, source snapshot, profile parity report, additive GameHost diagnostics, central ledger readback, and fixture-build proof into explicit contracts.

The next cut should prove profile parity without depending on DOM, canvas, Three.js, HUD mutation, or browser timing. Only after fixture proof should `game.html` consume those helpers additively through `window.GameHost.getState().sourceProfile`.

Construct result authority should remain a documented precondition map until sourceProfile parity is proven.

## Checklist

- [ ] Keep `index.html -> game.html` routing unchanged.
- [ ] Keep visible `smooth-ring-handoff-v6` construct behavior unchanged.
- [ ] Keep `window.GameHost.skipConstruct` unchanged.
- [ ] Keep `window.GameHost.restartConstruct` unchanged.
- [ ] Keep existing `window.GameHost.getState()` fields unchanged.
- [ ] Add `src/kits/phantom-command-smooth-handoff-profile-kit/index.js`.
- [ ] Mirror current `game.html` constants exactly.
- [ ] Add `normalizeSmoothHandoffProfile(profile)`.
- [ ] Add `src/kits/phantom-command-ring-descriptor-kit/index.js`.
- [ ] Add `derivePhantomCommandRingDescriptors(profile)`.
- [ ] Add `src/kits/phantom-command-piece-descriptor-kit/index.js`.
- [ ] Add `derivePhantomCommandPieceDescriptors(profile, rings)`.
- [ ] Add `src/kits/phantom-command-handoff-timeline-contract-kit/index.js`.
- [ ] Add delay, settle, handoff, prewarm, ringStartTimes, and total-build descriptor helpers.
- [ ] Add `src/kits/phantom-command-source-profile-fingerprint-kit/index.js`.
- [ ] Add `src/kits/phantom-command-source-profile-snapshot-kit/index.js`.
- [ ] Add `src/kits/phantom-command-profile-parity-report-kit/index.js`.
- [ ] Add `src/kits/phantom-command-gamehost-source-diagnostics-kit/index.js`.
- [ ] Add `tests/phantom-command-source-profile-fixture.mjs`.
- [ ] Fixture proves profile build id parity.
- [ ] Fixture proves ring count parity.
- [ ] Fixture proves zero-gap policy.
- [ ] Fixture proves ring part counts `[5,5,5,5,6,8,10,12,16,20]`.
- [ ] Fixture proves piece descriptor count `92`.
- [ ] Fixture proves total build seconds `19.923`.
- [ ] Fixture proves handoff values `RING_HANDOFF = 0.72` and `PART_STAGGER = 0.025`.
- [ ] Fixture proves source fingerprint stability.
- [ ] Fixture proves source snapshot serialization.
- [ ] Fixture proves profile parity report has no errors.
- [ ] Fixture proves additive GameHost source diagnostics shape.
- [ ] Fixture proves legacy GameHost fields remain unchanged.
- [ ] Fixture proves construct result remains blocked until sourceProfile parity passes.
- [ ] Fixture proves central ledger points at the latest tracker/audit after repo-local docs advance.
- [ ] Fixture proves build integration can run without DOM/canvas/Three.js.
- [ ] Import only the diagnostics helper into `game.html` after fixture proof.
- [ ] Add additive `sourceProfile` diagnostics under `window.GameHost.getState()`.
- [ ] Add fixture script to validation path only after it exists and passes locally.
- [ ] Run `node tests/phantom-command-source-profile-fixture.mjs`.
- [ ] Run `node tests/construct-spiral-intro-kit-smoke.mjs`.
- [ ] Run `npm run build`.

## Recommended build order

```txt
1. Source profile first
   - create src/kits/phantom-command-smooth-handoff-profile-kit/index.js
   - mirror current game.html constants exactly
   - export normalizeSmoothHandoffProfile()

2. Ring and piece descriptors second
   - create ring descriptor kit
   - create piece descriptor kit
   - preserve zero gaps, exact part counts, and 92 pieces

3. Timeline contract third
   - create handoff/timeline contract kit
   - prove ringStartTimes, part delays, moveSeconds, ringHandoff, partStagger, and totalBuildSeconds

4. Fingerprint and snapshot fourth
   - create source-profile fingerprint kit
   - create source-profile snapshot kit
   - ensure stable JSON output

5. Descriptor parity fifth
   - create profile parity report kit
   - prove 10 rings, zero gaps, 92 pieces, and 19.923 seconds

6. GameHost source diagnostics sixth
   - keep skipConstruct
   - keep restartConstruct
   - keep legacy getState fields
   - prepare nested sourceProfile diagnostics only

7. DOM-free fixture seventh
   - fixture imports source modules only
   - fixture does not import game.html, DOM, canvas, or Three.js
   - fixture validates source profile parity rows

8. Browser consumer splice eighth
   - import sourceProfile diagnostics helper into game.html
   - expose sourceProfile through GameHost getState
   - do not change the visible construct in the same pass

9. Fixture build integration ninth
   - wire the fixture into npm run build only after it passes standalone
   - keep current static-copy build behavior intact
   - fail build on profile, descriptor, snapshot, or GameHost source diagnostic parity errors

10. Central ledger sync tenth
   - ensure repo-local tracker, kit registry, and central repo-ledger all name the same latest source-profile fixture gate
   - keep this check documentation/fixture-only; do not create branches or PRs

11. Construct result blocker eleventh
   - document construct_complete result shape only after source parity passes
   - reject scenario bootstrap while sourceProfile parity is missing
   - keep RTS gameplay deferred
```

## Required profile values

```txt
buildId: smooth-ring-handoff-v6
ringCount: 10
firstInnerRadius: 10
firstRingWidth: 7
ringWidthGrowth: 1.25
maxRingWidth: 120
ringGapBase: 0
ringGapGrowth: 0
moveSeconds: 2.6
dropStartSeconds: 0.08
ringHandoff: 0.72
partStagger: 0.025
prewarmSeconds: 0.45
startRadiusMultiplier: 1.38
startHeightBase: 24
ringPartCounts: [5,5,5,5,6,8,10,12,16,20]
totalPieces: 92
totalBuildSeconds: 19.923
```

## Fixture rows to implement first

```txt
profile_build_id_matches_live_game_html
profile_ring_count_matches_10
profile_gap_policy_matches_zero_gap
ring_part_counts_match_live_array
piece_descriptor_count_matches_92
timeline_total_build_seconds_matches_19_923
handoff_values_match_ring_handoff_0_72_and_part_stagger_0_025
ring_start_times_match_live_formula
source_snapshot_is_serializable
source_fingerprint_is_stable
profile_parity_report_has_no_errors
gamehost_source_diagnostics_shape_is_additive
legacy_gamehost_fields_are_unchanged
construct_result_is_blocked_until_source_profile_parity_passes
central_ledger_points_to_latest_source_profile_gate
scenario_bootstrap_is_blocked_until_construct_result_exists
fixture_runs_without_dom_canvas_or_three
fixture_build_gate_runs_before_static_artifact_upload
```

## Do not do yet

```txt
- Do not add full RTS unit control before the source-profile fixture exists.
- Do not add scenario bootstrap reducers before profile parity passes.
- Do not replace the current construct visual in the same pass as source extraction.
- Do not remove window.GameHost compatibility.
- Do not move reusable logic into NexusEngine or ProtoKits until the publish-local fixture proof is stable.
- Do not work on Cavalry of Rome.
```

## After this ledge

```txt
source-profile fixture passes
  -> GameHost sourceProfile diagnostics passes
  -> fixture build gate passes
  -> central ledger points to latest source-profile tracker
  -> ConstructEventEnvelope
  -> ConstructEventResult
  -> ConstructEventJournal
  -> ConstructSnapshot
  -> ScenarioBootstrapCommand
  -> ScenarioBootstrapResult
  -> ScenarioBootstrapSnapshot
  -> RTS boundary placeholders
```
