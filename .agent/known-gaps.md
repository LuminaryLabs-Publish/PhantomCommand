# PhantomCommand Known Gaps

**Timestamp:** `2026-07-08T06:19:51-04:00`

## Critical gaps

```txt
- game.html still owns the live smooth-ring-handoff-v6 source constants inline.
- game.html still owns ring descriptor math inline.
- game.html still owns piece descriptor math inline.
- game.html still owns wedge geometry, material, construct animation, HUD mutation, input, camera, and GameHost state inline.
- construct-spiral-intro-kit exists, but it is generic spiral/window scheduling and not the live no-gap smooth-ring-handoff-v6 authority.
- There is no source-owned smooth-ring-handoff-v6 profile file.
- There is no stable source fingerprint for the live construct profile.
- There is no serializable source snapshot proving what profile produced the construct.
- There is no descriptor parity fixture proving [5,5,5,5,6,8,10,12,16,20].
- There is no DOM-free fixture proving 92 live pieces.
- There is no DOM-free fixture proving total build seconds 19.923.
- There is no transition-margin fixture proving the handoff overlap and inner-first ordering implied by RING_HANDOFF 0.72.
- Construct completion is represented as visual/HUD phase, not a typed idempotent ConstructEventResult.
- duplicate construct completion is not rejected through a stable result reason.
- Scenario bootstrap does not exist as a command/result gate.
- early bootstrap is not rejected with construct_incomplete.
- duplicate bootstrap is not rejected with duplicate_scenario_bootstrap.
- ConstructSnapshot and ScenarioBootstrapSnapshot are not stable standalone contracts.
- window.GameHost is useful but too small for fixture-grade diagnostics.
- RTS gameplay domains are documented but not yet safely connected to the construct proof.
```

## Documentation/source drift closed in this pass

```txt
- Internal docs no longer point the current live profile at sequential-ring-v5.
- Current evidence now identifies smooth-ring-handoff-v6 as the live build id.
- Runtime constants, ring part counts, total pieces, and total build seconds now match inspected game.html evidence.
- The next ledge now targets smooth-ring-handoff-v6 source authority rather than the older sequential-ring-v5 wording.
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

## Documentation gaps closed

```txt
- Added root .agent/START_HERE.md.
- Added root .agent/current-audit.md.
- Added root .agent/known-gaps.md.
- Added root .agent/next-steps.md.
- Added root .agent/validation.md.
- Added architecture, render, gameplay, tracker, and turn-ledger audit files.
- Added construct-source-audit/source-authority-fixture-gate.md.
- Added construct-source-audit/smooth-handoff-v6-source-drift.md.
- Added 2026-07-08T06-19-51-04-00 tracker and turn-ledger entries.
```

## Gap priority order

```txt
1. Smooth-ring-handoff-v6 source profile ownership.
2. Descriptor parity proof.
3. Total build seconds parity proof.
4. Handoff/margin proof.
5. ConstructEventResult idempotency.
6. ScenarioBootstrapResult gating.
7. Snapshot contracts.
8. Additive GameHost diagnostics.
9. Renderer descriptor handoff.
10. RTS gameplay expansion.
```