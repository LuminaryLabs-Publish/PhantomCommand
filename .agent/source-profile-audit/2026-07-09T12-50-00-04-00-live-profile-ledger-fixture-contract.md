# Source Profile Audit: Live Profile Ledger Fixture Contract

**Timestamp:** `2026-07-09T12-50-00-04-00`

## Source profile authority problem

`game.html` is still the only live authority for `smooth-ring-handoff-v6`.

The profile is not reusable, fixture-readable, or centrally verifiable because the constants, ring descriptors, piece descriptors, timeline values, and GameHost state projection are embedded in a browser-only route.

## Required source profile contract

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
```

## Required descriptor outputs

```txt
ring descriptors:
  ringIndex
  inner
  outer
  width
  gap
  partsPerRing
  angularSpan
  angularOffset

piece descriptors:
  id
  ringIndex
  partIndex
  partsPerRing
  angle
  finalRadius
  finalPosition
  startRadius
  startPosition
  delay
  startRotation
  finalRotation

timeline descriptors:
  ringStartTimes
  moveSeconds
  ringHandoff
  partStagger
  totalBuildSeconds
```

## Required parity proofs

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
```

## Central ledger proof row

```txt
central_ledger_points_to_latest_source_profile_gate
```

This row should read the central `LuminaryLabs-Dev/LuminaryLabs` repo-ledger path for `LuminaryLabs-Publish/PhantomCommand` and prove it points at the same latest tracker, turn ledger, architecture audit, source-profile audit, and deploy audit as repo-local `.agent/kit-registry.json`.

## Consumer proof rows

```txt
gamehost_source_diagnostics_shape_is_additive
legacy_gamehost_fields_are_unchanged
sourceprofile_consumer_readback_matches_fixture
fixture_runs_without_dom_canvas_or_three
fixture_build_gate_runs_before_static_artifact_upload
```

## Implementation order

```txt
1. source profile kit
2. ring descriptor kit
3. piece descriptor kit
4. handoff timeline kit
5. source fingerprint kit
6. source snapshot kit
7. parity report kit
8. GameHost source diagnostics kit
9. DOM-free source-profile fixture
10. game.html additive consumer splice
11. npm build fixture gate
12. central ledger readback fixture row
```
