# PhantomCommand Fixture Row Consumer Readback Contract

**Timestamp:** `2026-07-08T20-52-00-04-00`

## Purpose

Define the exact source-profile fixture rows needed before `game.html` consumes source-owned construct descriptors.

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
```

## Required fixture script

```txt
tests/phantom-command-source-profile-fixture.mjs
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
central_ledger_points_to_latest_source_profile_gate
scenario_bootstrap_is_blocked_until_construct_result_exists
fixture_runs_without_dom_canvas_or_three
fixture_build_gate_runs_before_static_artifact_upload
```

## Source constants to mirror

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
ringPartCounts = [5,5,5,5,6,8,10,12,16,20]
totalPieces = 92
totalBuildSeconds = 19.923
```

## Consumer readback target

After fixture proof, `game.html` may import only the source diagnostic helper and attach this shape additively:

```txt
GameHost.getState().sourceProfile
  status
  buildId
  profileFingerprint
  sourceSnapshot
  parityReport
  fixtureRows
  legacyCompatibility
```

## Blocking rules

```txt
- A missing profile row blocks GameHost consumer splice.
- A parity error blocks GameHost consumer splice.
- A missing legacy compatibility row blocks GameHost consumer splice.
- Missing sourceProfile diagnostics blocks scenario bootstrap.
- Passing sourceProfile diagnostics still does not allow scenario bootstrap until ConstructEventResult exists.
```

## Next safe implementation note

Start with DOM-free fixture proof. Do not start with `game.html` edits. Once source modules pass standalone, splice diagnostics into `game.html` without changing the visible construct.
