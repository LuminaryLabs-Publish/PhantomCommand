# Architecture Audit: SourceProfile Consumer Cutover DSK Map

**Timestamp:** `2026-07-09T04-24-06-04-00`

## Summary

`PhantomCommand` currently has a working visual construct proof, but the active architecture still treats `game.html` as both source authority and browser consumer.

The next architectural cut should create source-owned profile/descriptors/timeline/fingerprint/snapshot/parity kits, prove them in a DOM-free fixture, and only then splice additive `sourceProfile` diagnostics into `GameHost`.

## Current architecture

```txt
index.html
  -> game.html
     -> Three.js CDN
     -> inline renderer / scene / fog / lights / camera
     -> inline smooth-ring-handoff-v6 source constants
     -> inline ring descriptor math
     -> inline piece descriptor math
     -> inline wedge geometry
     -> inline construct animation
     -> inline HUD mutation
     -> inline GameHost projection
```

## Current DSK / kit state

```txt
implemented:
  construct-spiral-intro-kit
    domain: n:sequence:construct:spiral-intro
    role: generic construct schedule, activation window, piece progress, and snapshot service

implemented smoke:
  construct-spiral-intro-kit-smoke
    role: regression guard for generic intro-kit behavior

not yet source-owned:
  live smooth-ring-handoff-v6 profile
  live ring descriptors
  live piece descriptors
  live timeline contract
  live source fingerprint
  live GameHost source diagnostics
```

## Problem boundary

The live scene proves the construct visually, but it does not prove where the construct came from.

The exact values currently live in `game.html`:

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

## Target DSK split

```txt
phantom-command-smooth-handoff-profile-kit
  owns raw live profile values
  exports DEFAULT_PHANTOM_COMMAND_SMOOTH_HANDOFF_PROFILE
  exports normalizeSmoothHandoffProfile(profile)

phantom-command-ring-descriptor-kit
  consumes normalized profile
  emits contiguous no-gap ring descriptors
  proves ring count and ring part counts

phantom-command-piece-descriptor-kit
  consumes normalized profile + rings
  emits serializable piece descriptors
  proves 92 total pieces

phantom-command-handoff-timeline-contract-kit
  consumes normalized profile + pieces
  emits ringStartTimes, piece delays, totalBuildSeconds, prewarm, settle, and handoff contract

phantom-command-source-profile-fingerprint-kit
  consumes normalized source snapshot
  emits stable fingerprint

phantom-command-source-profile-snapshot-kit
  emits serializable profile/ring/piece/timeline snapshot

phantom-command-profile-parity-report-kit
  compares source-owned values to expected live values
  emits ok/warning/error rows

phantom-command-gamehost-source-diagnostics-kit
  converts profile, snapshot, fingerprint, and parity rows into additive GameHost diagnostics

phantom-command-source-profile-fixture-kit
  imports source modules only
  runs without DOM, canvas, Three.js, or browser timing

phantom-command-gamehost-source-consumer-kit
  defines the additive shape consumed by game.html
  preserves legacy GameHost fields

phantom-command-central-ledger-readback-kit
  verifies repo-local latest tracker and central ledger pointers agree
```

## Source files to add next

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

## Consumer splice contract

`game.html` should not be rewritten wholesale.

The safe consumer splice is additive only:

```txt
existing GameHost fields remain:
  buildId
  phase
  progress
  pieces
  rings
  ringParts
  ringGaps
  ringStartTimes
  animation

new nested field only:
  sourceProfile
    buildId
    fingerprint
    snapshot
    parity
    descriptors
    fixtureStatus
    legacyCompatible
```

## Architecture blockers

```txt
construct event/result authority: blocked until source profile parity passes
scenario bootstrap: blocked until construct event/result exists
RTS unit control: blocked until scenario bootstrap exists
renderer extraction: blocked until descriptor parity is stable
NexusEngine/ProtoKit offload: blocked until publish-local fixture proof is stable
```

## Next safe ledge

```txt
PhantomCommand SourceProfile Consumer Cutover Map + Legacy GameHost Fixture Gate
```
