# PhantomCommand Source Profile Audit: Central Ledger Fixture Row Freeze

**Timestamp:** `2026-07-09T01-28-10-04-00`

## Purpose

Freeze the next sourceProfile fixture rows so source ownership, browser consumer readback, and central ledger pointer parity can be implemented without guessing.

## Live source values to mirror

```txt
BUILD_ID: smooth-ring-handoff-v6
RING_COUNT: 10
FIRST_INNER_RADIUS: 10
FIRST_RING_WIDTH: 7
RING_WIDTH_GROWTH: 1.25
MAX_RING_WIDTH: 120
RING_GAP_BASE: 0
RING_GAP_GROWTH: 0
MOVE_SECONDS: 2.6
DROP_START_SECONDS: 0.08
RING_HANDOFF: 0.72
PART_STAGGER: 0.025
PREWARM_SECONDS: 0.45
START_RADIUS_MULTIPLIER: 1.38
START_HEIGHT_BASE: 24
ringParts: [5,5,5,5,6,8,10,12,16,20]
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

## Required module order

```txt
phantom-command-smooth-handoff-profile-kit
  -> phantom-command-ring-descriptor-kit
  -> phantom-command-piece-descriptor-kit
  -> phantom-command-handoff-timeline-contract-kit
  -> phantom-command-source-profile-fingerprint-kit
  -> phantom-command-source-profile-snapshot-kit
  -> phantom-command-profile-parity-report-kit
  -> phantom-command-gamehost-source-diagnostics-kit
  -> phantom-command-source-profile-fixture-kit
  -> phantom-command-central-ledger-readback-kit
  -> phantom-command-fixture-build-integration-kit
```

## Acceptance rule

The fixture must run without DOM, canvas, Three.js, browser timers, or HUD mutation. It should read stable source modules and assert that their descriptors reproduce the live route values.

## Central ledger rule

The central repo ledger must point at the same latest tracker and audit set as repo-local `.agent/kit-registry.json`. This prevents scheduled runs from selecting the repo only because central state is stale.
