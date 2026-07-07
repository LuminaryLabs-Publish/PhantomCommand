# PhantomCommand Agent Notes

**Latest documented run:** `2026-07-07T07-49-39-04-00`

**Latest tracker:** `.agent/trackers/2026-07-07T07-49-39-04-00/project-breakdown.md`

**Kit registry:** `.agent/kit-registry.json`

## Current repo read

`PhantomCommand` is a static Vite / Three.js publish repo for a single-player PvE undead RTS prototype. The app enters through `index.html` and runs the live construct proof through `game.html`.

The current live proof is now `sequential-ring-v5`, not the older `ring-gap-v4` documented in prior agent notes. The live HUD describes a no-physical-gap construct where inner rings finish before outer rings begin.

The live runtime is still inline in `game.html`. It owns renderer setup, scene/fog/lights, ring geometry, wedge seams, materials, totem, phantom commander visual, input, camera, construct animation, HUD state, and a construct-only `window.GameHost`.

A source kit exists at `src/kits/construct-spiral-intro-kit/index.js`, with smoke coverage at `tests/construct-spiral-intro-kit-smoke.mjs`. The next cutover should wire source construct scheduling into the live page, but first the source profile must match the current `sequential-ring-v5` behavior.

The design/config layer remains ahead of runtime. It already defines the intended RTS foundation: Crypt Core, Grave Harvester, Bone Pit, Skeletons, Zombies, enemy camps/waves, XP, unlocks, map rings, resource nodes, wave lanes, win/loss conditions, and the first objective loop.

## Current documentation status

This `.agent` folder tracks repo breakdowns and next-step recommendations. Each run gets a timestamped tracker folder so the repo can accumulate durable project history without relying on chat context.

Tracked entries:

```txt
.agent/trackers/2026-07-07T03-11-00-04-00/project-breakdown.md
.agent/trackers/2026-07-07T04-21-15-04-00/project-breakdown.md
.agent/trackers/2026-07-07T05-31-31-04-00/project-breakdown.md
.agent/trackers/2026-07-07T06-41-55-04-00/project-breakdown.md
.agent/trackers/2026-07-07T07-49-39-04-00/project-breakdown.md
.agent/kit-registry.json
```

## Highest-value next action

Build the `PhantomCommand Sequential Construct Parity + Scenario Authority Cutover` slice.

```txt
menu
  -> construct intro driven by a source profile matching sequential-ring-v5
  -> live parity smoke validates no-gap inner-ring-first behavior
  -> GameHost mode changes from construct_intro to scenario_bootstrap
  -> scenario bootstrap from config JSON
  -> fixed deterministic RTS state
  -> GameHost mode changes to scenario_active
  -> select undead units
  -> build Grave Harvester
  -> build Bone Pit
  -> produce Skeletons/Zombies
  -> defend against first wave
  -> clear first enemy camp
  -> evaluate XP/unlocks/objectives
  -> win/loss state
  -> inspectable GameHost state, diagnostics, and command journal
```

Minimum next build checklist:

- Keep `index.html` as the menu shell.
- Split `game.html` into thin markup plus `src/main.js`.
- Move `sequential-ring-v5` constants into a construct profile config.
- Add a source service or adapter that reproduces the live no-gap, inner-ring-first construct.
- Wire `construct-spiral-intro-kit` or the compatible profile adapter into the live sequence.
- Add live parity smoke for build id, ring count, no gaps, inner-before-outer ordering, skip, restart, and GameHost construct state.
- Promote inline `window.GameHost` into `phantom-command-gamehost-authority-kit`.
- Add modes: `construct_intro`, `scenario_bootstrap`, `scenario_active`, `scenario_complete`, and `scenario_failed`.
- Add `getDiagnostics()`, `dispatch(command)`, `subscribe()`, `getConstructState()`, `getScenarioState()`, and `getCommandJournal()` surfaces.
- Load `config/scenario-001.config.json`, `map-generation.config.json`, `enemy-waves.config.json`, `experience.config.json`, and `unlocks.config.json`.
- Compose a fixed RTS scenario snapshot after construct completion.
- Render Crypt Core, starter squads, resource nodes, first camp, and wave lanes.
- Add first command types: `SELECT_UNITS`, `REQUEST_MOVE`, `REQUEST_BUILD`, `REQUEST_PRODUCE`, and `REQUEST_ATTACK`.
- Add smoke tests for scenario bootstrap, first build objective, first camp clear, and command journal replay.
