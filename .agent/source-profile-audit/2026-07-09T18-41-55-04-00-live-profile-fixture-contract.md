# PhantomCommand Live Profile Fixture Contract

**Timestamp:** `2026-07-09T18-41-55-04-00`

## Live profile source facts

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

## Derived fixture facts

```txt
ringStartStep: MOVE_SECONDS * RING_HANDOFF = 1.872
ringPartCounts: [5,5,5,5,6,8,10,12,16,20]
totalPieces: 92
totalBuildSeconds: 19.923
zeroGapPolicy: true
```

## Fixture rows required next

```txt
profile-defaults-match-live-game-html
ring-descriptors-match-live-width-and-gap-policy
piece-descriptor-count-equals-92
piece-ring-distribution-matches-live
ring-start-times-match-live
animation-constants-match-live
source-fingerprint-stable
source-snapshot-serializable
profile-parity-report-has-zero-errors
gamehost-sourceprofile-readback-matches-fixture
legacy-gamehost-fields-still-present
build-runs-fixture-before-static-copy
central-ledger-points-at-latest-tracker
```

## Compatibility rule

The first implementation should not remove existing `GameHost` fields.

Only add source-profile readback after the DOM-free fixture proves parity.
