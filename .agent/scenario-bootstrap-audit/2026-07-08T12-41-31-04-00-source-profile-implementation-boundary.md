# PhantomCommand Source Profile Implementation Boundary — 2026-07-08T12-41-31-04-00

## Purpose

Define the safe implementation boundary before scenario bootstrap. The repo should first prove that the live `smooth-ring-handoff-v6` construct can be described from source-owned profile modules and validated by DOM-free fixtures.

## Current blocker

`game.html` owns both the public visual and the source truth:

```txt
BUILD_ID
RING_COUNT
FIRST_INNER_RADIUS
FIRST_RING_WIDTH
RING_WIDTH_GROWTH
MAX_RING_WIDTH
RING_GAP_BASE
RING_GAP_GROWTH
MOVE_SECONDS
DROP_START_SECONDS
RING_HANDOFF
PART_STAGGER
PREWARM_SECONDS
START_RADIUS_MULTIPLIER
START_HEIGHT_BASE
ringParts()
wedge()
makePiece()
construct(seq)
window.GameHost.getState()
```

Scenario bootstrap should not be built on top of those inline facts. It should consume source-owned facts.

## First implementation files

```txt
src/kits/phantom-command-smooth-handoff-profile-kit/index.js
src/kits/phantom-command-source-profile-fingerprint-kit/index.js
src/kits/phantom-command-source-profile-snapshot-kit/index.js
src/kits/phantom-command-ring-descriptor-kit/index.js
src/kits/phantom-command-piece-descriptor-kit/index.js
src/kits/phantom-command-handoff-timeline-contract-kit/index.js
src/kits/phantom-command-profile-parity-report-kit/index.js
src/kits/phantom-command-gamehost-source-diagnostics-kit/index.js
tests/phantom-command-source-profile-fixture.mjs
```

## First source profile exports

```txt
PHANTOM_COMMAND_SMOOTH_HANDOFF_PROFILE_KIT_ID
SMOOTH_RING_HANDOFF_V6_PROFILE
normalizeSmoothHandoffProfile(profile)
createSmoothHandoffProfileFingerprint(profile)
createSmoothHandoffProfileSnapshot(profile)
createRingDescriptors(profile)
createPieceDescriptors(ringDescriptors, profile)
createTimingDescriptors(profile, pieceDescriptors)
createProfileParityReport({ profile, ringDescriptors, pieceDescriptors, timingDescriptors })
createGameHostSourceProfileDiagnostics(sourceProfileState)
```

## Required profile values

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

## Fixture acceptance rows

```txt
profile_build_id_matches_live
profile_ring_count_matches_live
profile_gap_policy_is_zero_gap
profile_ring_widths_are_deterministic
ring_descriptors_count_to_10
ring_descriptors_have_zero_gaps
ring_descriptors_report_live_part_counts
piece_descriptors_count_to_92
piece_descriptors_have_stable_ids
timing_descriptors_report_ring_handoff_0_72
timing_descriptors_report_part_stagger_0_025
timing_descriptors_report_total_build_seconds_19_923
profile_fingerprint_stable_across_two_runs
profile_snapshot_json_round_trips
profile_parity_report_accepts_live_values
fixture_has_no_dom_canvas_three_dependency
```

## Explicit non-goals for this boundary

```txt
Do not add RTS unit control.
Do not add enemy waves.
Do not add economy.
Do not add combat.
Do not alter the visible construct animation.
Do not replace game.html rendering.
Do not remove window.GameHost compatibility.
Do not promote to NexusEngine or ProtoKits yet.
```

## After this boundary passes

Only after the source-profile fixture passes should the repo add:

```txt
ConstructEventEnvelope
ConstructEventResult
ConstructEventJournal
ConstructSnapshot
ScenarioBootstrapCommand
ScenarioBootstrapResult
ScenarioBootstrapSnapshot
```

## Next safe ledge

```txt
PhantomCommand Source Profile Implementation Boundary
```