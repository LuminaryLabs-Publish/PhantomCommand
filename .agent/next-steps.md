# PhantomCommand Next Steps

**Timestamp:** `2026-07-09T12-55-20-04-00`

## Next safe ledge

```txt
PhantomCommand SourceProfile Fixture Pointer Freeze + Build Gate Readback
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

## Recommended build order

```txt
1. Source profile first
   - create src/kits/phantom-command-smooth-handoff-profile-kit/index.js
   - mirror current game.html constants exactly
   - export normalizeSmoothHandoffProfile()

2. Ring and piece descriptors second
   - create ring descriptor kit
   - create piece descriptor kit
   - preserve zero gaps, exact part counts, and 92 pieces

3. Timeline contract third
   - create handoff/timeline contract kit
   - prove ringStartTimes, part delays, moveSeconds, ringHandoff, partStagger, and totalBuildSeconds

4. Fingerprint and snapshot fourth
   - create source-profile fingerprint kit
   - create source-profile snapshot kit
   - ensure stable JSON output

5. Descriptor parity fifth
   - create profile parity report kit
   - prove 10 rings, zero gaps, 92 pieces, and 19.923 seconds

6. GameHost source diagnostics sixth
   - keep skipConstruct
   - keep restartConstruct
   - keep legacy getState fields
   - prepare nested sourceProfile diagnostics only

7. DOM-free fixture seventh
   - fixture imports source modules only
   - fixture does not import game.html, DOM, canvas, or Three.js
   - fixture validates source profile parity rows

8. Consumer splice eighth
   - import GameHost diagnostics adapter into game.html
   - add sourceProfile readback under GameHost only
   - keep visible scene unchanged

9. Build gate ninth
   - add check script
   - make build run fixture before static copy
   - only then treat Pages artifact as source-profile validated
```

## Do not do next

```txt
Do not start RTS gameplay.
Do not add units.
Do not add enemy AI.
Do not add scenario bootstrap yet.
Do not rewrite the visual construct.
Do not replace the current GameHost fields.
Do not create a branch.
```
