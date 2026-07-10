# PhantomCommand Next Steps

**Timestamp:** `2026-07-09T23-02-05-04-00`

## Next safe ledge

```txt
PhantomCommand SourceProfile Consumer Refresh + GameHost Fixture Gate
```

## Goal

Preserve the current live visual while moving the live `smooth-ring-handoff-v6` source profile, ring descriptors, piece descriptors, timeline descriptors, source fingerprint, source snapshot, profile parity report, additive GameHost diagnostics, central ledger readback, and fixture-build proof into explicit contracts.

The next cut should prove profile parity without depending on DOM, canvas, Three.js, HUD mutation, or browser timing. Only after fixture proof should `game.html` consume those helpers additively through `window.GameHost.getState().sourceProfile`.

Construct result authority and scenario bootstrap remain blocked until source-profile parity and legacy GameHost consumer readback are proven.

## Checklist

- [ ] Keep `index.html -> game.html` routing unchanged.
- [ ] Keep visible `smooth-ring-handoff-v6` construct behavior unchanged.
- [ ] Keep existing `window.GameHost` methods and fields unchanged.
- [ ] Add `src/kits/phantom-command-smooth-handoff-profile-kit/index.js`.
- [ ] Mirror current `game.html` constants exactly.
- [ ] Add `normalizeSmoothHandoffProfile(profile)`.
- [ ] Add `src/kits/phantom-command-ring-descriptor-kit/index.js`.
- [ ] Add `derivePhantomCommandRingDescriptors(profile)`.
- [ ] Add `src/kits/phantom-command-piece-descriptor-kit/index.js`.
- [ ] Add `derivePhantomCommandPieceDescriptors(profile, rings)`.
- [ ] Add `src/kits/phantom-command-handoff-timeline-contract-kit/index.js`.
- [ ] Add delay, settle, handoff, prewarm, ringStartTimes, and total-build descriptor helpers.
- [ ] Add source fingerprint, source snapshot, profile parity report, and GameHost source diagnostics kits.
- [ ] Add `tests/phantom-command-source-profile-fixture.mjs`.
- [ ] Prove build id, ring count, zero-gap policy, ring part counts, 92 pieces, total build seconds, handoff values, fingerprint, snapshot serialization, parity report, GameHost source diagnostics, and legacy compatibility.
- [ ] Import only the diagnostics helper into `game.html` after fixture proof.
- [ ] Add additive `sourceProfile` diagnostics under `window.GameHost.getState()`.
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
central ledger latest tracker equals repo-local latest tracker
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
