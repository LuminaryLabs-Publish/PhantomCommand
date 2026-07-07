# PhantomCommand Agent Notes

**Latest documented run:** `2026-07-07T09-00-25-04-00`

**Latest tracker:** `.agent/trackers/2026-07-07T09-00-25-04-00/project-breakdown.md`

**Kit registry:** `.agent/kit-registry.json`

## Current repo read

`PhantomCommand` is a static Vite / Three.js publish repo for a single-player PvE undead RTS prototype. The app enters through `index.html` and runs the current proof scene through `game.html`.

The live proof is `sequential-ring-v5`. It creates ten concentric no-gap stone rings around the Grim Reaper Totem, with inner rings finishing before outer rings begin. The current runtime still defines the construct constants, ring layout, wedge geometry, material detail, animation timing, input, HUD, camera, and `window.GameHost` inline in `game.html`.

The source kit at `src/kits/construct-spiral-intro-kit/index.js` is useful, but it does not yet match the live `sequential-ring-v5` profile. Its default profile still uses spiral/window scheduling. The next cutover must make the live construct profile source-authoritative before the RTS scenario command reducer is expanded.

The design/config layer remains ahead of runtime. It already defines `scenario_001_raise_the_host`, starting resources, Crypt Core, starter Skeletons/Zombies, Grave Harvester, Bone Pit, the first enemy camp, win/loss conditions, radial map rings, resource nodes, the center totem, and wave lanes.

## Current documentation status

This `.agent` folder tracks repo breakdowns and next-step recommendations. Each run gets a timestamped tracker folder so the repo can accumulate durable project history without relying on chat context.

Tracked entries:

```txt
.agent/trackers/2026-07-07T03-11-00-04-00/project-breakdown.md
.agent/trackers/2026-07-07T04-21-15-04-00/project-breakdown.md
.agent/trackers/2026-07-07T05-31-31-04-00/project-breakdown.md
.agent/trackers/2026-07-07T06-41-55-04-00/project-breakdown.md
.agent/trackers/2026-07-07T07-49-39-04-00/project-breakdown.md
.agent/trackers/2026-07-07T09-00-25-04-00/project-breakdown.md
.agent/kit-registry.json
```

## Highest-value next action

Build the `PhantomCommand Construct Profile Source Cutover + GameHost Snapshot Contract` slice.

```txt
menu
  -> thin game.html imports src/main.js
  -> source-owned sequential-ring-v5 profile loads
  -> source ring descriptors reproduce ten rings and zero physical gaps
  -> source timing guarantees inner-ring-before-outer-ring ordering
  -> Three.js scene consumes descriptors rather than inline constants
  -> ConstructSnapshot publishes buildId / phase / progress / ringParts / ringGaps / animation / complete / mode
  -> GameHost exposes getState / getDiagnostics / getConstructState / getScenarioState / getCommandJournal
  -> construct_complete switches mode to scenario_bootstrap
  -> config JSON composes deterministic ScenarioSnapshot
  -> smoke validates construct parity and scenario bootstrap shape
```

Minimum next build checklist:

- Keep `index.html` as the menu shell.
- Split `game.html` into thin markup plus `src/main.js`.
- Add `phantom-command-source-construct-profile-kit`.
- Encode `sequential-ring-v5` constants in one source-owned profile object.
- Add `phantom-command-ring-descriptor-kit`.
- Make descriptors reproduce ten rings, zero gaps, live ring widths, live part counts, and inner-before-outer scheduling.
- Adapt or extend `construct-spiral-intro-kit` so source scheduling can match the live profile.
- Add `phantom-command-construct-snapshot-contract-kit`.
- Promote inline `window.GameHost` into `phantom-command-gamehost-authority-kit`.
- Add modes: `construct_intro`, `scenario_bootstrap`, `scenario_active`, `scenario_complete`, and `scenario_failed`.
- Add `getState()`, `getDiagnostics()`, `dispatch(command)`, `subscribe()`, `getConstructState()`, `getScenarioState()`, and `getCommandJournal()` surfaces.
- Load scenario/map/wave/experience/unlock config JSON after construct completion.
- Compose a deterministic scenario bootstrap snapshot before adding full RTS commands.
- Add parity smoke for build id, ring count, no gaps, inner-before-outer ordering, skip, restart, GameHost construct state, and scenario bootstrap shape.

Do not expand units, buildings, combat, or wave behavior until construct profile parity and GameHost snapshot authority are stable.
