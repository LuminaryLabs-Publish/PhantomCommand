# PhantomCommand Source Profile Module Fixture Implementation Map

**Timestamp:** `2026-07-08T14-08-24-04-00`

## Goal

Implement source-profile modules that reproduce the live `game.html` `smooth-ring-handoff-v6` construct values exactly, then prove them with a DOM-free fixture before touching scenario bootstrap or RTS gameplay.

## Source modules to add

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

## Canonical exports

### `phantom-command-smooth-handoff-profile-kit`

```txt
PHANTOM_COMMAND_SMOOTH_HANDOFF_PROFILE_KIT_ID
PHANTOM_COMMAND_SMOOTH_HANDOFF_PROFILE_DOMAIN_PATH
PHANTOM_COMMAND_SMOOTH_HANDOFF_V6_PROFILE
normalizeSmoothHandoffProfile(profile)
```

### `phantom-command-ring-descriptor-kit`

```txt
PHANTOM_COMMAND_RING_DESCRIPTOR_KIT_ID
derivePhantomCommandRingDescriptors(profile)
getPhantomCommandRingPartCount(inner, outer)
```

### `phantom-command-piece-descriptor-kit`

```txt
PHANTOM_COMMAND_PIECE_DESCRIPTOR_KIT_ID
derivePhantomCommandPieceDescriptors(profile, rings)
createPhantomCommandPieceId(piece)
```

### `phantom-command-handoff-timeline-contract-kit`

```txt
PHANTOM_COMMAND_HANDOFF_TIMELINE_CONTRACT_KIT_ID
derivePhantomCommandRingStartTimes(profile)
derivePhantomCommandPieceDelay(profile, ringStartTimes, piece)
derivePhantomCommandTotalBuildSeconds(profile, ringStartTimes, rings)
```

### `phantom-command-source-profile-fingerprint-kit`

```txt
PHANTOM_COMMAND_SOURCE_PROFILE_FINGERPRINT_KIT_ID
createPhantomCommandSourceFingerprint(snapshot)
```

### `phantom-command-source-profile-snapshot-kit`

```txt
PHANTOM_COMMAND_SOURCE_PROFILE_SNAPSHOT_KIT_ID
createPhantomCommandSourceSnapshot(profile, rings, pieces, timeline)
```

### `phantom-command-profile-parity-report-kit`

```txt
PHANTOM_COMMAND_PROFILE_PARITY_REPORT_KIT_ID
createPhantomCommandProfileParityReport(snapshot)
```

### `phantom-command-gamehost-source-diagnostics-kit`

```txt
PHANTOM_COMMAND_GAMEHOST_SOURCE_DIAGNOSTICS_KIT_ID
createPhantomCommandGameHostSourceDiagnostics(snapshot, parity)
```

## Fixture shape

```txt
FixtureRow {
  id: string,
  expected: unknown,
  actual: unknown,
  passed: boolean,
  reason: string
}

FixtureResult {
  ok: boolean,
  rows: FixtureRow[],
  summary: {
    passed: number,
    failed: number,
    total: number
  }
}
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
profile_snapshot_is_serializable
profile_fingerprint_is_stable
profile_parity_report_has_no_errors
gamehost_additive_diagnostics_keep_legacy_surface
fixture_runs_without_dom_canvas_or_three
```

## Live parity values

```txt
BUILD_ID=smooth-ring-handoff-v6
RING_COUNT=10
FIRST_INNER_RADIUS=10
FIRST_RING_WIDTH=7
RING_WIDTH_GROWTH=1.25
MAX_RING_WIDTH=120
RING_GAP_BASE=0
RING_GAP_GROWTH=0
MOVE_SECONDS=2.6
DROP_START_SECONDS=0.08
RING_HANDOFF=0.72
PART_STAGGER=0.025
PREWARM_SECONDS=0.45
START_RADIUS_MULTIPLIER=1.38
START_HEIGHT_BASE=24
ringParts=[5,5,5,5,6,8,10,12,16,20]
totalPieces=92
totalBuildSeconds=19.923
```

## Cutover rule

The source-profile fixture should be introduced before `game.html` imports it. After the fixture passes, `game.html` can import source modules and project additive diagnostics while keeping the visible construct behavior and legacy GameHost surface unchanged.

## Do not do in the same cut

```txt
- Do not replace the renderer.
- Do not change ring geometry.
- Do not alter visible timing.
- Do not remove inline code until additive source diagnostics prove parity.
- Do not start scenario bootstrap reducers before source-profile fixture rows pass.
- Do not promote these kits into NexusEngine or ProtoKits until local publish proof is stable.
```
