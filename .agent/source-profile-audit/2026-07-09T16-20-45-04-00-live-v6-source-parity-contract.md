# PhantomCommand Source Profile Audit: Live V6 Source Parity Contract

**Timestamp:** `2026-07-09T16-20-45-04-00`

## Live profile values observed

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

## Live derived values to prove

```txt
ring count: 10
ring gap policy: all zero
ring part counts: [5,5,5,5,6,8,10,12,16,20]
total pieces: 92
ring start step: MOVE_SECONDS * RING_HANDOFF = 1.872 seconds
expected total build seconds: 19.923 seconds
```

## Current mismatch

`construct-spiral-intro-kit` is source-backed, but it does not represent the live `smooth-ring-handoff-v6` profile.

The live visual uses inline constants and inline descriptor math inside `game.html`.

The existing smoke test validates generic spiral scheduling behavior, not live construct parity.

## Source parity contract

The next implementation must produce a DOM-free fixture capable of proving:

```txt
- normalized source profile values match game.html constants.
- ring descriptors match live ring widths, gaps, and counts.
- piece descriptors match live count and deterministic id/position/timing source data.
- timeline descriptors match ringStartTimes and part delays.
- totalBuildSeconds matches legacy GameHost expectation.
- source fingerprint is stable across runs.
- source snapshot serializes without DOM/Three objects.
- parity report returns zero errors for the default live profile.
- legacy GameHost fields still exist after sourceProfile diagnostics are added.
```

## Fixture rows required

```txt
profile_build_id_matches_live
profile_ring_count_matches_live
profile_gap_policy_is_zero
profile_ring_part_counts_match_live
profile_piece_count_is_92
profile_ring_start_times_match_live
profile_total_build_seconds_matches_live
profile_fingerprint_is_stable
profile_snapshot_is_serializable
profile_parity_report_has_no_errors
gamehost_sourceprofile_shape_is_additive
legacy_gamehost_fields_remain_compatible
construct_result_remains_deferred
scenario_bootstrap_remains_deferred
```

## Implementation boundary

Do not use this pass as permission to change `game.html` visuals. First cut pure source modules and fixtures. Then splice diagnostics additively.
