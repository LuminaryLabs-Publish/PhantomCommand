# PhantomCommand Source Profile Audit: Live v6 Profile Consumer Contract

**Timestamp:** `2026-07-09T23-02-05-04-00`

## Live profile facts from `game.html`

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
ringParts = [5,5,5,5,6,8,10,12,16,20]
totalPieces = 92
totalBuildSeconds = 19.923
```

## Contract needed

The next implementation should source-own these facts without changing the browser route first.

```txt
src/kits/phantom-command-smooth-handoff-profile-kit/index.js
  -> default profile
  -> normalizeSmoothHandoffProfile(profile)

src/kits/phantom-command-ring-descriptor-kit/index.js
  -> derivePhantomCommandRingDescriptors(profile)

src/kits/phantom-command-piece-descriptor-kit/index.js
  -> derivePhantomCommandPieceDescriptors(profile, rings)

src/kits/phantom-command-handoff-timeline-contract-kit/index.js
  -> derive ringStartTimes
  -> derive per-piece delays
  -> derive totalBuildSeconds

source-profile diagnostics kits
  -> source fingerprint
  -> source snapshot
  -> parity report
  -> GameHost source diagnostics
```

## Consumer readback needed

`game.html` should remain visually unchanged while adding diagnostics:

```txt
window.GameHost.getState().sourceProfile
window.GameHost.getState().sourceFingerprint
window.GameHost.getState().sourceSnapshot
window.GameHost.getState().profileParity
window.GameHost.getState().fixtureStatus
```

These fields must be additive only. Existing legacy fields must continue to exist.

## Fixture rows needed

```txt
profile normalizes defaults
profile rejects invalid numeric values with reason codes
rings derive exactly 10 rows
rings have zero gaps
ring part counts match live game.html
pieces derive exactly 92 rows
ringStartTimes match legacy values
totalBuildSeconds matches 19.923
snapshot is JSON-serializable
fingerprint is stable
parity report has zero errors for default profile
GameHost source diagnostics preserve legacy fields
```

## Main gap

The existing source-profile proof does not exist yet. The generic construct kit is not wrong; it is just not the live v6 profile authority.
