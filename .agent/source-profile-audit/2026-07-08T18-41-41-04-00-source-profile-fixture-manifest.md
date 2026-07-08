# Source Profile Audit: Fixture Manifest

**Timestamp:** `2026-07-08T18-41-41-04-00`

## Source profile objective

Move the live `smooth-ring-handoff-v6` values out of inline `game.html` source authority without changing the visible construct.

## Values to mirror exactly

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

## Source files to add

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
```

## Source fixture constraints

```txt
- Do not import game.html.
- Do not import Three.js.
- Do not require DOM.
- Do not require canvas.
- Do not mutate HUD.
- Do not depend on requestAnimationFrame.
- Do not depend on performance.now.
- Do not change visible construct output.
```

## Acceptance result shape

```txt
{
  ok: boolean,
  rows: [
    {
      id: string,
      status: "pass" | "fail" | "blocked",
      expected?: unknown,
      actual?: unknown,
      reason?: string
    }
  ],
  sourceFingerprint: string,
  sourceSnapshot: object,
  parityReport: object
}
```

## Main blocker

Scenario bootstrap remains blocked until this fixture passes and a typed ConstructEventResult exists.
