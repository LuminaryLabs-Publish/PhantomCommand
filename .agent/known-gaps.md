# PhantomCommand Known Gaps

**Timestamp:** `2026-07-09T13-00-37-04-00`

## Critical source-profile gaps

```txt
- game.html still owns the live smooth-ring-handoff-v6 constants inline.
- game.html still owns ring descriptor math inline.
- game.html still owns piece descriptor math inline.
- game.html still owns timing policy inline.
- game.html still owns wedge geometry, material, construct animation, HUD mutation, input, camera, and GameHost state inline.
- construct-spiral-intro-kit exists, but it is generic spiral/window scheduling and not the live no-gap smooth-ring-handoff-v6 authority.
- There is no source-owned smooth-ring-handoff-v6 profile file.
- There is no normalizer proving exact live default values.
- There is no ring descriptor module that reproduces the live no-gap ring descriptors.
- There is no piece descriptor module that reproduces the live 92-piece construct.
- There is no timeline contract module proving ringStartTimes, per-piece delays, and totalBuildSeconds.
- There is no stable source fingerprint for the live construct profile.
- There is no serializable source snapshot proving what profile produced the construct.
- There is no profile parity report separating ok, warning, error, unsupported, and missing rows.
- There is no DOM-free fixture proving [5,5,5,5,6,8,10,12,16,20].
- There is no DOM-free fixture proving 92 live pieces.
- There is no DOM-free fixture proving total build seconds 19.923.
- GameHost does not yet expose sourceProfile, profileFingerprint, sourceSnapshot, descriptor parity, timing parity, or fixture status.
- game.html has no additive consumer splice for source-profile diagnostics.
- npm run build does not yet run a source-profile fixture before static artifact copy.
```

## Central tracking gap narrowed here

```txt
- Repo-local .agent state had advanced beyond the central PhantomCommand ledger.
- This run updates repo-local docs again and logs the new tracker centrally.
- The next central entry should not treat source-profile parity as implemented until the fixture exists and runs.
```

## Non-blocking gaps

```txt
- Scenario bootstrap remains conceptual.
- Construct result authority remains blocked until sourceProfile parity exists.
- RTS unit/economy loops are not implemented.
- Renderer extraction is not required before source-profile fixture proof.
- The page is still a static inline prototype, but that is acceptable for the current proof boundary.
```

## Do not do next

```txt
- Do not create a new branch.
- Do not work on Cavalry of Rome.
- Do not replace the visible construct with another animation model.
- Do not extract the full renderer before profile parity exists.
- Do not build scenario bootstrap before construct sourceProfile proof exists.
- Do not add RTS gameplay before the current construct is source-owned and fixture-readable.
```
