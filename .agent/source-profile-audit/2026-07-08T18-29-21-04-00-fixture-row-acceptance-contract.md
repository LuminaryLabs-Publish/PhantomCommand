# PhantomCommand Source Profile Fixture Row Acceptance Contract

**Timestamp:** `2026-07-08T18-29-21-04-00`

## Purpose

This is the acceptance contract for the next implementation pass.

It turns the previously broad source-profile consumer splice into exact fixture rows and required output shapes.

## Required source modules

```txt
src/kits/phantom-command-smooth-handoff-profile-kit/index.js
src/kits/phantom-command-ring-descriptor-kit/index.js
src/kits/phantom-command-piece-descriptor-kit/index.js
src/kits/phantom-command-handoff-timeline-contract-kit/index.js
src/kits/phantom-command-source-profile-fingerprint-kit/index.js
src/kits/phantom-command-source-profile-snapshot-kit/index.js
src/kits/phantom-command-profile-parity-report-kit/index.js
src/kits/phantom-command-gamehost-source-diagnostics-kit/index.js
tests/phantom-command-source-profile-fixture.mjs
```

## Fixture output shape

```js
{
  suite: "phantom-command-source-profile-fixture",
  status: "passed" | "failed",
  buildId: "smooth-ring-handoff-v6",
  rows: [
    {
      id: "profile_build_id_matches_live_game_html",
      status: "passed" | "failed",
      expected: unknown,
      actual: unknown,
      reason: string | null
    }
  ],
  summary: {
    passed: number,
    failed: number,
    warnings: number
  },
  sourceFingerprint: string,
  sourceSnapshot: object
}
```

## Required fixture rows

```txt
profile_build_id_matches_live_game_html
profile_ring_count_matches_10
profile_gap_policy_matches_zero_gap
profile_first_ring_values_match_live_game_html
profile_animation_values_match_live_game_html
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
scenario_bootstrap_is_blocked_until_construct_result_exists
fixture_runs_without_dom_canvas_or_three
```

## Expected constants

```txt
BUILD_ID = smooth-ring-handoff-v6
RING_COUNT = 10
FIRST_INNER_RADIUS = 10
FIRST_RING_WIDTH = 7
RING_WIDTH_GROWTH = 1.25
MAX_RING_WIDTH = 120
RING_GAP_BASE = 0
RING_GAP_GROWTH = 0
MOVE_SECONDS = 2.6
DROP_START_SECONDS = 0.08
RING_HANDOFF = 0.72
PART_STAGGER = 0.025
PREWARM_SECONDS = 0.45
START_RADIUS_MULTIPLIER = 1.38
START_HEIGHT_BASE = 24
```

## Expected derived values

```txt
ringPartCounts = [5,5,5,5,6,8,10,12,16,20]
totalPieces = 92
totalBuildSeconds = 19.923
ringStartTimes = [0,1.872,3.744,5.616,7.488,9.36,11.232,13.104,14.976,16.848]
```

## Failure reason families

```txt
profile_value_mismatch
ring_descriptor_mismatch
piece_descriptor_mismatch
timeline_descriptor_mismatch
source_snapshot_unserializable
source_fingerprint_unstable
parity_report_error
gamehost_shape_breaking_change
legacy_field_missing
fixture_imported_browser_surface
scenario_bootstrap_unblocked_too_early
```

## Stop line

Do not splice into `game.html` until this fixture can run without DOM, canvas, Three.js, browser timing, HUD mutation, or local storage.