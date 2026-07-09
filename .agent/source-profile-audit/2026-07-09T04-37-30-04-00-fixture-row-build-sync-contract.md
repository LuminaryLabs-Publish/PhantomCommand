# PhantomCommand Source Profile Audit: Fixture Row Build Sync Contract

**Timestamp:** `2026-07-09T04-37-30-04-00`

## Source profile target

The live `smooth-ring-handoff-v6` profile must be represented outside `game.html` before any deeper gameplay or scenario bootstrap work.

## Required source profile values

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
construct_result_is_blocked_until_source_profile_parity_passes
central_ledger_points_to_latest_source_profile_gate
scenario_bootstrap_is_blocked_until_construct_result_exists
fixture_runs_without_dom_canvas_or_three
fixture_build_gate_runs_before_static_artifact_upload
```

## Expected fixture result shape

```txt
{
  id: string,
  status: 'pass' | 'fail' | 'blocked',
  expected: unknown,
  actual: unknown,
  reason: string,
  source: 'profile' | 'rings' | 'pieces' | 'timeline' | 'snapshot' | 'fingerprint' | 'gamehost' | 'central-ledger' | 'build-gate'
}
```

## Source module contract

```txt
createSmoothHandoffProfile()
  -> returns live source constants

normalizeSmoothHandoffProfile(profile)
  -> fills defaults
  -> rounds expected numeric fields
  -> rejects missing/unsupported fields

derivePhantomCommandRingDescriptors(profile)
  -> returns 10 rings
  -> preserves zero gap
  -> exposes inner/outer/gap/part count

derivePhantomCommandPieceDescriptors(profile, rings)
  -> returns 92 pieces
  -> exposes ring/index/delay/final radius/final angle/start hints

derivePhantomCommandTimelineContract(profile, rings, pieces)
  -> exposes ringStartTimes
  -> exposes totalBuildSeconds
  -> exposes handoff, part stagger, move seconds, prewarm

derivePhantomCommandSourceFingerprint(snapshot)
  -> stable string/hash for fixture comparison

createPhantomCommandSourceSnapshot(profile, rings, pieces, timeline)
  -> serializable proof artifact

createPhantomCommandProfileParityReport(snapshot)
  -> row-based ok/warning/error report

createGameHostSourceProfileDiagnostics(report)
  -> nested additive GameHost sourceProfile object
```

## Build sync contract

```txt
node tests/phantom-command-source-profile-fixture.mjs
  -> must run without DOM, canvas, Three.js, browser timers, or game.html import
  -> must pass before package build gate includes it

npm run build
  -> should eventually run source profile fixture before scripts/build-static.mjs copies static files
  -> must not break current static artifact behavior
```

## Central sync contract

```txt
central_ledger_points_to_latest_source_profile_gate
  expected: repo-ledger/LuminaryLabs-Publish/PhantomCommand.md names 2026-07-09T04-37-30-04-00 tracker and audits
  fail reason: central ledger stale or pointing at older tracker
```

## Source profile verdict

The source profile contract is narrow enough to implement next. It should be pure JavaScript modules plus fixture rows, with browser GameHost consumption as a second additive splice in the same source-profile gate only after the DOM-free rows pass.
