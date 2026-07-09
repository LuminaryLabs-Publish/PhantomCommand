# PhantomCommand Source Profile Audit

**Timestamp:** `2026-07-09T16-10-00-04-00`

## Source profile under audit

```txt
smooth-ring-handoff-v6
```

## Live constants to preserve

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

## Live derived facts to prove

```txt
ring count: 10
ring gap policy: zero-gap
ring part counts: [5,5,5,5,6,8,10,12,16,20]
total pieces: 92
total build seconds: 19.923
ring start times: ring[n] = ring[n - 1] + MOVE_SECONDS * RING_HANDOFF
piece delay: ringStartTimes[ring] + idx * PART_STAGGER
```

## Source-profile fixture contract

The next implementation should add `tests/phantom-command-source-profile-fixture.mjs` with fixture rows similar to:

```txt
profile_build_id_matches_live
profile_ring_count_matches_live
profile_gap_policy_is_zero_gap
ring_part_counts_match_live
piece_count_matches_live_92
total_build_seconds_matches_live_19_923
ring_start_times_match_legacy_gamehost
source_fingerprint_is_stable
source_snapshot_serializes
profile_parity_report_has_no_errors
gamehost_source_diagnostics_shape_is_additive
legacy_gamehost_fields_still_exist
construct_result_remains_deferred
scenario_bootstrap_remains_deferred
```

## Source-profile module targets

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

## Fixture gate target

```txt
npm run build
  -> node tests/phantom-command-source-profile-fixture.mjs
  -> node scripts/build-static.mjs
  -> copy static artifact only after sourceProfile fixture passes
```

## Finding

The live profile can be proved without any DOM or Three.js dependency. That is the right next implementation boundary.
