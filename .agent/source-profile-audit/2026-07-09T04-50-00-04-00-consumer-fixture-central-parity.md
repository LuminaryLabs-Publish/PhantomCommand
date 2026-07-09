# PhantomCommand Source Profile Audit: Consumer Fixture Central Parity

**Timestamp:** `2026-07-09T04-50-00-04-00`

## Source-profile problem

The live `smooth-ring-handoff-v6` construct is source-coupled to `game.html`.

The repo needs a source-owned profile that can produce the same ring descriptors, piece descriptors, and timeline descriptors as the visible browser route before any render extraction, RTS gameplay, or scenario bootstrap work begins.

## Required source profile contract

```txt
SmoothHandoffProfile
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
```

## Derived descriptor contract

```txt
RingDescriptor[]
  -> 10 rows
  -> no gaps
  -> inner/outer radius rows
  -> parts per ring [5,5,5,5,6,8,10,12,16,20]

PieceDescriptor[]
  -> 92 rows
  -> ring index
  -> part index
  -> parts per ring
  -> angle/span
  -> delay
  -> stable piece id

TimelineDescriptor
  -> moveSeconds 2.6
  -> ringHandoff 0.72
  -> partStagger 0.025
  -> prewarmSeconds 0.45
  -> ringStartTimes
  -> totalBuildSeconds 19.923
```

## Consumer contract

```txt
DOM-free fixture
  -> imports source profile modules only
  -> does not import game.html
  -> does not require DOM, canvas, Three.js, performance.now, or requestAnimationFrame
  -> proves exact live values

GameHost consumer
  -> preserves legacy getState fields
  -> adds sourceProfile only
  -> reports source snapshot
  -> reports fingerprint
  -> reports parity rows
  -> reports fixture status
  -> reports central ledger latest-tracker pointer
```

## Central parity contract

```txt
central_ledger_points_to_latest_source_profile_gate:
  expected repo-ledger path: repo-ledger/LuminaryLabs-Publish/PhantomCommand.md
  expected latest tracker: .agent/trackers/2026-07-09T04-50-00-04-00/project-breakdown.md
  expected architecture audit: .agent/architecture-audit/2026-07-09T04-50-00-04-00-sourceprofile-consumer-freeze-dsk-map.md
  expected source-profile audit: .agent/source-profile-audit/2026-07-09T04-50-00-04-00-consumer-fixture-central-parity.md
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

## First implementation files

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

## Non-goals for next pass

```txt
render rewrite
geometry rewrite
RTS gameplay
scenario bootstrap
Cavalry of Rome work
new branch
pull request
```

## Next safe ledge

```txt
PhantomCommand SourceProfile Consumer Freeze + Fixture Build Central Ledger Gate
```
