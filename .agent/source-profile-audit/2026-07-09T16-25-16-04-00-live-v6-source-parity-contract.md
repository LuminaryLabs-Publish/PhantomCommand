# Source Profile Audit: Live v6 Source Parity Contract

**Timestamp:** `2026-07-09T16-25-16-04-00`

## Live profile facts to preserve

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
ringParts: [5,5,5,5,6,8,10,12,16,20]
totalPieces: 92
```

## Required fixture rows

```txt
profile defaults row
ring descriptor row
piece descriptor count row
zero gap row
ringStartTimes row
totalBuild row
legacy GameHost compatibility row
source fingerprint stability row
```

## Contract

The source profile modules must reproduce the current `game.html` behavior exactly before `game.html` consumes the new modules. Diagnostics can be added additively, but legacy `GameHost.getState()` keys must stay present.
