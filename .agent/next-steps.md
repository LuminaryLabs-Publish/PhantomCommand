# PhantomCommand Next Steps

**Timestamp:** `2026-07-09T16-25-16-04-00`

## Next safe ledge

```txt
PhantomCommand SourceProfile Central Sync + GameHost Fixture Readback Gate
```

## Goal

Preserve the current live visual while moving the live `smooth-ring-handoff-v6` source profile, ring descriptors, piece descriptors, timeline descriptors, source fingerprint, source snapshot, profile parity report, additive GameHost diagnostics, central ledger readback, and fixture-build proof into explicit contracts.

The next cut should prove profile parity without depending on DOM, canvas, Three.js, HUD mutation, or browser timing. Only after fixture proof should `game.html` consume those helpers additively through `window.GameHost.getState().sourceProfile`.

Construct result authority and scenario bootstrap remain blocked until sourceProfile parity and legacy GameHost consumer readback are proven.

## Checklist

- [ ] Add `src/source-profile/smooth-ring-handoff-v6-profile.js`.
- [ ] Add `src/source-profile/normalize-construct-profile.js`.
- [ ] Add `src/source-profile/ring-descriptors.js`.
- [ ] Add `src/source-profile/piece-descriptors.js`.
- [ ] Add `src/source-profile/timeline-descriptors.js`.
- [ ] Add `src/source-profile/source-fingerprint.js`.
- [ ] Add `src/source-profile/source-snapshot.js`.
- [ ] Add `src/source-profile/profile-parity-report.js`.
- [ ] Add `src/source-profile/gamehost-sourceprofile-projection.js`.
- [ ] Add `scripts/validate-source-profile.mjs`.
- [ ] Fixture must assert ring count `10`.
- [ ] Fixture must assert zero gaps.
- [ ] Fixture must assert ring part counts `[5,5,5,5,6,8,10,12,16,20]`.
- [ ] Fixture must assert total pieces `92`.
- [ ] Fixture must assert `MOVE_SECONDS=2.6`, `RING_HANDOFF=0.72`, `PART_STAGGER=0.025`, and `PREWARM_SECONDS=0.45`.
- [ ] Fixture must assert `totalBuildSeconds` remains compatible with legacy `GameHost.getState().animation.totalBuildTime`.
- [ ] Splice additive `sourceProfile` into `window.GameHost.getState()` without removing legacy fields.
- [ ] Update `scripts/build-static.mjs` so `npm run build` runs source-profile fixture before copying static files.
- [ ] Run `npm run build`.
- [ ] Browser-smoke `index.html -> game.html`.
- [ ] Keep no branches and push only to `main`.

## Do not do next

```txt
- do not start scenario bootstrap
- do not start economy or RTS units
- do not replace the renderer
- do not rewrite the visible construct scene
- do not start command-result authority before source-profile parity
```
