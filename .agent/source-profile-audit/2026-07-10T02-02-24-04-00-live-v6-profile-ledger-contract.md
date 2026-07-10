# PhantomCommand Source Profile Audit: Live v6 Profile Ledger Contract

**Timestamp:** `2026-07-10T02-02-24-04-00`

## Contract target

Source-own and fixture-prove the live `smooth-ring-handoff-v6` profile before any scenario, RTS, renderer, or visual expansion work.

## Live profile values to preserve

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
```

## Live derived facts to fixture

```txt
ring count: 10
ring gap policy: zero-gap
ring part counts: [5,5,5,5,6,8,10,12,16,20]
total pieces: 92
ring start policy: previous + MOVE_SECONDS * RING_HANDOFF
totalBuildSeconds: 19.923
GameHost legacy fields remain present
construct result remains deferred
scenario bootstrap remains deferred
```

## Current mismatch

`tests/construct-spiral-intro-kit-smoke.mjs` uses:

```txt
[5,5,5,6,8,10,12,15,18,22,26,32]
```

That profile is useful for the generic kit smoke, but it does not prove the live route's 10-ring, zero-gap, 92-piece profile.

## Required source-profile modules

```txt
src/kits/phantom-command-smooth-handoff-profile-kit/index.js
src/kits/phantom-command-profile-normalizer-kit/index.js
src/kits/phantom-command-ring-descriptor-kit/index.js
src/kits/phantom-command-piece-descriptor-kit/index.js
src/kits/phantom-command-handoff-timeline-contract-kit/index.js
src/kits/phantom-command-source-profile-fingerprint-kit/index.js
src/kits/phantom-command-source-profile-snapshot-kit/index.js
src/kits/phantom-command-profile-parity-report-kit/index.js
src/kits/phantom-command-gamehost-source-diagnostics-kit/index.js
```

## Required fixture rows

```txt
profile defaults row
normalized profile row
ring descriptor rows
ring part count row
piece descriptor count row
timing descriptor row
source fingerprint row
source snapshot row
profile parity report row
GameHost source diagnostics row
legacy GameHost compatibility row
build gate row
central ledger pointer row
```

## Fixture command target

```bash
node tests/phantom-command-source-profile-fixture.mjs
```

Then wire:

```bash
npm run build
```

so the source-profile fixture runs before `scripts/build-static.mjs` copies static artifacts.
