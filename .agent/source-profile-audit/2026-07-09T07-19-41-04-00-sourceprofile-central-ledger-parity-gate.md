# PhantomCommand Source Profile Audit: Central Ledger Parity Gate

**Timestamp:** `2026-07-09T07-19-41-04-00`

## Source profile status

The live source profile still exists only as constants and helper functions embedded in `game.html`.

```txt
BUILD_ID='smooth-ring-handoff-v6'
RING_COUNT=10
FIRST_INNER_RADIUS=10
FIRST_RING_WIDTH=7
RING_WIDTH_GROWTH=1.25
MAX_RING_WIDTH=120
RING_GAP_BASE=0
RING_GAP_GROWTH=0
MOVE_SECONDS=2.6
DROP_START_SECONDS=.08
RING_HANDOFF=.72
PART_STAGGER=.025
PREWARM_SECONDS=.45
START_RADIUS_MULTIPLIER=1.38
START_HEIGHT_BASE=24
```

## Derived live profile facts

```txt
ringPartCounts: [5,5,5,5,6,8,10,12,16,20]
totalPieces: 92
ringStartStep: 1.872
totalBuildSeconds: 19.923
zeroGapPolicy: true
```

## Needed source profile kits

```txt
phantom-command-smooth-handoff-profile-kit
phantom-command-ring-descriptor-kit
phantom-command-piece-descriptor-kit
phantom-command-handoff-timeline-contract-kit
phantom-command-source-profile-fingerprint-kit
phantom-command-source-profile-snapshot-kit
phantom-command-profile-parity-report-kit
phantom-command-source-profile-fixture-kit
```

## Central ledger parity issue

Central tracking had drifted behind repo-local `.agent` state. The next fixture should include a row that verifies central ledger pointers name the latest repo-local tracker, turn ledger, audits, and kit registry.

```txt
central_ledger_points_to_latest_source_profile_gate
```

## Acceptance rows

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
sourceprofile_consumer_readback_matches_fixture
central_ledger_points_to_latest_source_profile_gate
```

## Conclusion

Do source-profile fixture work before any construct result, renderer extraction, or scenario bootstrap work.
