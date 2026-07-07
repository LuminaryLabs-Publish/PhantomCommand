# PhantomCommand Agent Notes

**Latest documented run:** `2026-07-07T10-08-37-04-00`

**Latest tracker:** `.agent/trackers/2026-07-07T10-08-37-04-00/project-breakdown.md`

**Kit registry:** `.agent/kit-registry.json`

## Current repo read

`PhantomCommand` is a static Vite / Three.js publish repo for a single-player PvE undead RTS prototype. The app enters through `index.html` and runs the current proof scene through `game.html`.

The live proof is still `sequential-ring-v5`: ten concentric no-gap stone rings assemble around the Grim Reaper Totem, and the inner ring timing is intended to settle before the next outer ring begins. The current runtime still defines construct constants, ring layout, wedge geometry, material detail, animation timing, input, HUD, camera, and `window.GameHost` inline in `game.html`.

The source kit at `src/kits/construct-spiral-intro-kit/index.js` is useful, but its default schedule is still spiral/window based. The next cutover should add a source-owned sequential profile and adapter instead of mutating the generic kit default blindly.

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
.agent/trackers/2026-07-07T10-08-37-04-00/project-breakdown.md
.agent/kit-registry.json
```

## Highest-value next action

Build the `PhantomCommand Sequential Profile Adapter + Scenario Bootstrap Fixture Cutover` slice.

```txt
menu
  -> thin game.html imports src/main.js
  -> source-owned sequential-ring-v5 profile loads
  -> source ring descriptors reproduce ten rings and zero physical gaps
  -> source piece descriptors reproduce the live part count formula
  -> sequential profile adapter proves inner ring settlement before next outer ring start
  -> Three.js scene consumes descriptors rather than inline constants
  -> ConstructSnapshot publishes buildId / phase / progress / pieces / rings / ringParts / ringGaps / animation / complete / mode
  -> GameHost exposes getState / getDiagnostics / getConstructState / getScenarioState / getCommandJournal / dispatch / subscribe
  -> construct_complete switches mode to scenario_bootstrap
  -> scenario and map config compose deterministic ScenarioSnapshot
  -> smoke validates construct profile parity and scenario bootstrap shape
```

Minimum next build checklist:

- Keep `index.html` as the menu shell.
- Split `game.html` into thin markup plus `src/main.js`.
- Add `phantom-command-source-construct-profile-kit`.
- Move the live `sequential-ring-v5` constants into one source-owned profile object.
- Add `phantom-command-ring-descriptor-kit`.
- Add `phantom-command-piece-descriptor-kit`.
- Reproduce ten rings, zero gaps, live ring widths, live part counts, and inner-before-outer scheduling.
- Add `phantom-command-sequential-profile-adapter-kit`.
- Adapt `construct-spiral-intro-kit` through a sequential profile mode or bridge instead of changing its default spiral behavior without compatibility.
- Add `phantom-command-construct-snapshot-contract-kit`.
- Promote inline `window.GameHost` into `phantom-command-gamehost-authority-kit`.
- Add modes: `construct_intro`, `scenario_bootstrap`, `scenario_active`, `scenario_complete`, and `scenario_failed`.
- Add `getState()`, `getDiagnostics()`, `dispatch(command)`, `subscribe()`, `getConstructState()`, `getScenarioState()`, and `getCommandJournal()` surfaces.
- Add `phantom-command-scenario-bootstrap-fixture-kit` using `scenario-001.config.json` and `map-generation.config.json`.
- Add parity smoke for build id, ring count, no gaps, ring part counts, inner-before-outer ordering, skip, restart, GameHost construct state, and scenario bootstrap shape.

Do not expand units, buildings, combat, or wave behavior until construct profile parity and GameHost snapshot authority are stable.
