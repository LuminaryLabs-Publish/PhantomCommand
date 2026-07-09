# PhantomCommand Source Profile Audit

**Timestamp:** `2026-07-09T16-29-23-04-00`

## Live profile facts to preserve

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
```

## Derived profile facts to prove

```txt
ring count: 10
ring gap policy: no-gap
ring part counts: [5,5,5,5,6,8,10,12,16,20]
total pieces: 92
total build seconds: 19.923
```

## Required parity rows

```txt
profile_defaults_match_legacy
ring_descriptors_match_legacy
piece_descriptor_count_matches_legacy
timeline_ring_start_times_match_legacy
total_build_seconds_matches_legacy
gamehost_sourceprofile_shape_is_additive
legacy_gamehost_fields_preserved
central_ledger_points_to_latest_tracker
```

## Source-profile blocker

Do not treat construct result authority or scenario bootstrap as ready until this source profile is owned by source modules and proven by a DOM-free fixture.
