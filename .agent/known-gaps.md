# PhantomCommand Known Gaps

**Timestamp:** `2026-07-09T12-38-16-04-00`

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

## Fixture acceptance gaps

```txt
- Fixture rows are named but not implemented in source.
- Fixture rows do not yet load source modules independently of game.html.
- Fixture rows do not yet prove the browser route consumes the same source profile.
- Fixture rows do not yet assert legacy GameHost shape compatibility.
- Fixture rows do not yet assert sourceprofile_consumer_readback_matches_fixture.
- Fixture rows do not yet block scenario bootstrap until construct source parity passes.
- Fixture rows do not yet assert central ledger/readback alignment with the latest repo-local tracker.
- npm run build does not yet include the source-profile fixture.
- There is no deploy/build gate proving fixture execution before Pages artifact upload.
```

## Construct / scenario gaps

```txt
- Construct completion is represented as visual/HUD phase, not a typed idempotent ConstructEventResult.
- Duplicate construct completion is not rejected through a stable result reason.
- Scenario bootstrap does not exist as a command/result gate.
- Early bootstrap is not rejected with construct_incomplete.
- Duplicate bootstrap is not rejected with duplicate_scenario_bootstrap.
- ConstructSnapshot and ScenarioBootstrapSnapshot are not stable standalone contracts.
- RTS gameplay domains are documented but not yet safely connected to the construct proof.
```

## Visual/render gaps

```txt
- Three.js render setup is embedded directly in game.html.
- Wedge geometry creation is embedded directly in game.html.
- Stone material palette is embedded directly in game.html.
- Construct animation and camera orbit are embedded directly in game.html.
- HUD state mutation happens inside the render/runtime monolith.
- Render code consumes inline constants instead of reusable descriptors.
- Renderer handoff cannot yet consume source-owned construct descriptors only.
- There is no render-source parity snapshot tying the visible build to the source profile.
```

## Gap narrowed in this pass

```txt
- The immediate next ledge is now Live SourceProfile Consumer Sync + Fixture Build Gate.
- Source-profile ownership must happen before construct result authority.
- Descriptor parity must happen before render extraction.
- GameHost source diagnostics must be additive and preserve the legacy surface.
- game.html must consume source-profile diagnostics only after DOM-free fixture proof.
- npm run build should run the source-profile fixture before static artifact copy after the fixture exists.
- The central ledger must be updated in the same pass as repo-local .agent docs and should point at the same latest tracker.
- The fixture should include a central_ledger_points_to_latest_source_profile_gate row.
- Construct result authority must happen before scenario bootstrap.
- Scenario bootstrap must stay blocked until construct_complete is emitted by a typed result.
- The generic construct-spiral-intro-kit should remain as a regression guard, not be treated as the live v6 proof until live profile parity fixtures exist.
```

## Documentation refreshed

```txt
- Root .agent/START_HERE.md refreshed.
- Root .agent/current-audit.md refreshed.
- Root .agent/known-gaps.md refreshed.
- Root .agent/next-steps.md refreshed.
- Root .agent/validation.md refreshed.
- Root .agent/kit-registry.json refreshed.
- Timestamped tracker added.
- Timestamped turn-ledger entry added.
- Architecture, render, gameplay, source-profile, scenario-bootstrap, and deploy audits added.
- Central LuminaryLabs ledger updated.
- Central internal change log added.
```
