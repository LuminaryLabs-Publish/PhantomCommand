# PhantomCommand Known Gaps

**Timestamp:** `2026-07-08T14-08-24-04-00`

## Critical source-profile gaps

```txt
- game.html still owns the live smooth-ring-handoff-v6 constants inline.
- game.html still owns ring descriptor math inline.
- game.html still owns piece descriptor math inline.
- game.html still owns timing policy inline.
- game.html still owns wedge geometry, material, construct animation, HUD mutation, input, camera, and GameHost state inline.
- construct-spiral-intro-kit exists, but it is generic spiral/window scheduling and not the live no-gap smooth-ring-handoff-v6 authority.
- There is no source-owned smooth-ring-handoff-v6 profile file.
- There is no ring descriptor module that reproduces the live no-gap ring descriptors.
- There is no piece descriptor module that reproduces the live 92-piece construct.
- There is no timeline contract module proving ringStartTimes, per-piece delays, and totalBuildSeconds.
- There is no stable source fingerprint for the live construct profile.
- There is no serializable source snapshot proving what profile produced the construct.
- There is no descriptor parity fixture proving [5,5,5,5,6,8,10,12,16,20].
- There is no DOM-free fixture proving 92 live pieces.
- There is no DOM-free fixture proving total build seconds 19.923.
- There is no transition-margin fixture proving RING_HANDOFF 0.72 and PART_STAGGER 0.025.
- GameHost does not yet expose sourceProfile, profileFingerprint, sourceSnapshot, descriptor parity, timing parity, or fixture status.
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

## Gap narrowed in this pass

```txt
- The immediate next ledge is now the Source Profile Module Fixture Map.
- Source-profile ownership must happen before construct result authority.
- Descriptor parity must happen before render extraction.
- GameHost source diagnostics must be additive and preserve the legacy surface.
- Construct result authority must happen before scenario bootstrap.
- Scenario bootstrap must happen before unit control, economy, combat, wave, or objective domains.
- The generic construct-spiral-intro-kit should remain as a regression guard, not be treated as the live v6 proof until live profile parity fixtures exist.
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

## Gameplay/system gaps

```txt
- The current player loop is a construct-viewer loop, not yet an RTS command loop.
- The Phantom Commander exists as a visual figure only.
- The Grim Reaper Totem exists as a visual totem only.
- Necropolis, undead units, resources, enemies, waves, objectives, combat, and progression are still deferred domains.
- No scenario bootstrap gate safely transitions from construct_complete to a playable RTS slice.
- No command journal replay contract exists for the construct -> RTS transition.
```

## Documentation gaps closed or refreshed

```txt
- Root .agent/START_HERE.md refreshed.
- Root .agent/current-audit.md refreshed.
- Root .agent/known-gaps.md refreshed.
- Root .agent/next-steps.md refreshed.
- Root .agent/validation.md refreshed.
- Root .agent/kit-registry.json refreshed.
- Added 2026-07-08T14-08-24-04-00 architecture DSK/domain breakdown.
- Added 2026-07-08T14-08-24-04-00 GameHost source diagnostics readback audit.
- Added 2026-07-08T14-08-24-04-00 construct completion/source-profile gameplay audit.
- Added 2026-07-08T14-08-24-04-00 source-profile module fixture implementation map.
- Added 2026-07-08T14-08-24-04-00 tracker and turn-ledger entries.
```

## Gap priority order

```txt
1. Smooth-ring-handoff-v6 source profile ownership.
2. Profile normalization.
3. Ring descriptor module.
4. Piece descriptor module.
5. Handoff/timeline descriptor module.
6. Source fingerprint.
7. Source snapshot projection.
8. Descriptor parity report.
9. Additive GameHost source diagnostics.
10. DOM-free source-profile fixture.
11. ConstructEventResult idempotency.
12. ConstructSnapshot projection.
13. ScenarioBootstrapResult gating.
14. ScenarioBootstrapSnapshot projection.
15. Renderer descriptor handoff.
16. RTS gameplay expansion.
```
