# PhantomCommand Source Profile Audit: Live v6 Profile Fixture Contract

**Timestamp:** `2026-07-10T00-30-20-04-00`

## Contract target

The next source-profile implementation must preserve the live `game.html` profile exactly while moving the source facts into fixture-readable modules.

## Required source-owned modules

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

## Required fixture rows

```txt
build id row
ring count row
zero-gap policy row
ring width progression row
ring part counts row
piece count row
ring start times row
move seconds row
handoff row
part stagger row
prewarm row
total build seconds row
source fingerprint row
source snapshot serialization row
legacy GameHost compatibility row
additive sourceProfile row
construct result still deferred row
scenario bootstrap still deferred row
```

## Required invariant targets

```txt
buildId === smooth-ring-handoff-v6
ringCount === 10
ringGapBase === 0
ringGapGrowth === 0
ringPartCounts === [5,5,5,5,6,8,10,12,16,20]
totalPieces === 92
totalBuildSeconds === 19.923
profileParity.errors.length === 0
GameHost legacy fields remain present
GameHost sourceProfile is additive
```

## Compatibility rule

Do not remove or rename current `window.GameHost` fields.

Only add nested source-profile diagnostics after the DOM-free fixture passes.
