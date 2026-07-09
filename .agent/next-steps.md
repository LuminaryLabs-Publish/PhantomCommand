# PhantomCommand Next Steps

**Timestamp:** `2026-07-09T13-00-37-04-00`

## Next safe ledge

```txt
PhantomCommand SourceProfile Ledger Repair + Consumer Fixture Gate
```

## Goal

Preserve the current live visual while moving the live `smooth-ring-handoff-v6` source profile, ring descriptors, piece descriptors, timeline descriptors, source fingerprint, source snapshot, profile parity report, additive GameHost diagnostics, central ledger readback, and fixture-build proof into explicit contracts.

The next cut should prove profile parity without depending on DOM, canvas, Three.js, HUD mutation, or browser timing. Only after fixture proof should `game.html` consume those helpers additively through `window.GameHost.getState().sourceProfile`.

Construct result authority and scenario bootstrap remain blocked until sourceProfile parity and legacy GameHost consumer readback are proven.

## Checklist

- [ ] Keep `index.html -> game.html` routing unchanged.
- [ ] Keep visible `smooth-ring-handoff-v6` construct behavior unchanged.
- [ ] Keep `window.GameHost.skipConstruct` unchanged.
- [ ] Keep `window.GameHost.restartConstruct` unchanged.
- [ ] Keep existing `window.GameHost.getState()` fields unchanged.
- [ ] Add `src/kits/phantom-command-smooth-handoff-profile-kit/index.js`.
- [ ] Mirror current `game.html` constants exactly.
- [ ] Add `normalizeSmoothHandoffProfile(profile)`.
- [ ] Add `src/kits/phantom-command-ring-descriptor-kit/index.js`.
- [ ] Add `derivePhantomCommandRingDescriptors(profile)`.
- [ ] Add `src/kits/phantom-command-piece-descriptor-kit/index.js`.
- [ ] Add `derivePhantomCommandPieceDescriptors(profile, rings)`.
- [ ] Add `src/kits/phantom-command-handoff-timeline-contract-kit/index.js`.
- [ ] Add delay, settle, handoff, prewarm, ringStartTimes, and total-build descriptor helpers.
- [ ] Add `src/kits/phantom-command-source-profile-fingerprint-kit/index.js`.
- [ ] Add `src/kits/phantom-command-source-profile-snapshot-kit/index.js`.
- [ ] Add `src/kits/phantom-command-profile-parity-report-kit/index.js`.
- [ ] Add `src/kits/phantom-command-gamehost-source-diagnostics-kit/index.js`.
- [ ] Add `tests/phantom-command-source-profile-fixture.mjs`.
- [ ] Fixture proves profile build id parity.
- [ ] Fixture proves ring count parity.
- [ ] Fixture proves zero-gap policy.
- [ ] Fixture proves ring part counts `[5,5,5,5,6,8,10,12,16,20]`.
- [ ] Fixture proves piece descriptor count `92`.
- [ ] Fixture proves total build seconds `19.923`.
- [ ] Fixture proves handoff values `RING_HANDOFF = 0.72` and `PART_STAGGER = 0.025`.
- [ ] Fixture proves source fingerprint stability.
- [ ] Fixture proves source snapshot serialization.
- [ ] Fixture proves profile parity report has no errors.
- [ ] Fixture proves additive GameHost source diagnostics shape.
- [ ] Fixture proves legacy GameHost fields remain unchanged.
- [ ] Fixture proves sourceprofile_consumer_readback_matches_fixture.
- [ ] Fixture proves construct result remains blocked until sourceProfile parity passes.
- [ ] Fixture proves central ledger points at the latest tracker/audit after repo-local docs advance.
- [ ] Fixture proves build integration can run without DOM/canvas/Three.js.
- [ ] Import only the diagnostics helper into `game.html` after fixture proof.
- [ ] Add additive `sourceProfile` diagnostics under `window.GameHost.getState()`.
- [ ] Add fixture script to validation path only after it exists and passes locally.
- [ ] Ensure `npm run build` runs source-profile fixture before copying static artifacts.
- [ ] Run `node tests/phantom-command-source-profile-fixture.mjs`.
- [ ] Run `node tests/construct-spiral-intro-kit-smoke.mjs`.
- [ ] Run `npm run build`.
- [ ] Push only to `main`.

## Stop condition

Stop the implementation slice only after these are fixture-readable:

```txt
sourceProfile.buildId === smooth-ring-handoff-v6
sourceProfile.ringCount === 10
sourceProfile.ringGapBase === 0
sourceProfile.ringGapGrowth === 0
sourceProfile.ringPartCounts === [5,5,5,5,6,8,10,12,16,20]
sourceProfile.totalPieces === 92
sourceProfile.totalBuildSeconds === 19.923
sourceProfile.ringStartTimes match legacy GameHost values
profileParity.errors.length === 0
legacy GameHost fields still exist
constructResult remains deferred
scenarioBootstrap remains deferred
```

## Defer until after proof

```txt
scenario bootstrap
RTS controls
resource economy
renderer extraction
camera rewrite
unit control
new visual pass
```
