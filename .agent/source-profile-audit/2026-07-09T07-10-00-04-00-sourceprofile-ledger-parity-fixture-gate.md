# Source Profile Audit: Ledger Parity Fixture Gate

**Timestamp:** `2026-07-09T07-10-00-04-00`

## SourceProfile target

The live `smooth-ring-handoff-v6` source profile must become a source-owned contract that can be read by fixtures, build gates, and `GameHost` diagnostics without importing DOM, canvas, Three.js, or `game.html`.

## Required canonical values

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
sourceprofile_consumer_readback_matches_fixture
construct_result_is_blocked_until_source_profile_parity_passes
central_ledger_points_to_latest_source_profile_gate
scenario_bootstrap_is_blocked_until_construct_result_exists
fixture_runs_without_dom_canvas_or_three
fixture_build_gate_runs_before_static_artifact_upload
```

## Central-ledger parity requirement

The sourceProfile fixture should eventually include a documentation parity row that reads the central ledger pointer and confirms it names the same latest tracker/audit set as repo-local `.agent/kit-registry.json`.

```txt
repo-local tracker: .agent/trackers/2026-07-09T07-10-00-04-00/project-breakdown.md
central ledger path: repo-ledger/LuminaryLabs-Publish/PhantomCommand.md
central changelog path: internal-change-log/2026-07-09T07-10-00-04-00-phantom-command-sourceprofile-ledger-catchup.md
```

## Acceptance boundary

The next code pass is accepted only when source modules can prove the live v6 construct facts without touching `game.html`, and then `game.html` can consume the resulting diagnostics additively.
