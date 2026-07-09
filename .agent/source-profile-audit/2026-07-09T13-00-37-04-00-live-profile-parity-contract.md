# PhantomCommand Live Profile Parity Contract

**Timestamp:** `2026-07-09T13-00-37-04-00`

## Contract purpose

The live `smooth-ring-handoff-v6` profile must become source-owned before any higher-level construct result or scenario bootstrap consumes it.

## Required source records

```txt
SmoothHandoffProfile
NormalizedSmoothHandoffProfile
RingDescriptor[]
PieceDescriptor[]
TimelineDescriptor
SourceProfileFingerprint
SourceProfileSnapshot
ProfileParityReport
GameHostSourceDiagnostics
SourceProfileFixtureReport
```

## Exact live values to preserve

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
ringPartCounts = [5,5,5,5,6,8,10,12,16,20]
totalPieces = 92
totalBuildSeconds = 19.923
```

## Fixture rows required

```txt
profile-build-id-parity
ring-count-parity
zero-gap-policy
ring-part-count-parity
piece-count-parity
timeline-total-seconds-parity
ring-start-times-parity
source-snapshot-serializable
fingerprint-stable
parity-report-no-errors
legacy-gamehost-fields-preserved
sourceprofile-consumer-readback
construct-result-blocked
scenario-bootstrap-blocked
```

## Consumer rule

`game.html` can import source-profile diagnostics only after the DOM-free fixture proves parity. The import must be additive and cannot change the visible construct.
