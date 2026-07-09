# PhantomCommand Source Profile Audit: Fixture Build Gate Contract

**Timestamp:** `2026-07-09T04-38-39-04-00`

## Source profile target

The live `smooth-ring-handoff-v6` profile must be source-owned outside `game.html` before render extraction, construct result authority, or scenario bootstrap.

## Required values

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

## Fixture rows

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

## Expected module contract

```txt
createSmoothHandoffProfile()
normalizeSmoothHandoffProfile(profile)
derivePhantomCommandRingDescriptors(profile)
derivePhantomCommandPieceDescriptors(profile, rings)
derivePhantomCommandTimelineContract(profile, rings, pieces)
derivePhantomCommandSourceFingerprint(snapshot)
createPhantomCommandSourceSnapshot(profile, rings, pieces, timeline)
createPhantomCommandProfileParityReport(snapshot)
createGameHostSourceProfileDiagnostics(report)
```

## Verdict

The next implementation should add pure source-profile modules and a DOM-free fixture first. The browser `GameHost` splice should be additive and preserve all legacy fields.
