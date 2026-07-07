# PhantomCommand Agent Notes

**Latest documented run:** `2026-07-07T06-41-55-04-00`

**Latest tracker:** `.agent/trackers/2026-07-07T06-41-55-04-00/project-breakdown.md`

**Kit registry:** `.agent/kit-registry.json`

## Current repo read

`PhantomCommand` is a static Vite/Three.js publish repo for a single-player PvE undead RTS prototype. The app still opens through `index.html` and runs the live proof through `game.html`, where concentric stone-ring pieces assemble into a readable `ring-gap-v4` ritual construct around the Grim Reaper Totem.

The live runtime exposes `window.GameHost` with `skipConstruct`, `restartConstruct`, and `getState()`. That gives a useful diagnostics foothold, but it is still construct-only and inline in `game.html`.

The design/config layer remains ahead of the runtime. It already defines the intended RTS foundation: Crypt Core, Grave Harvester, Bone Pit, Skeletons, Zombies, enemy camps/waves, XP, unlocks, map rings, resource nodes, wave lanes, win/loss conditions, and the first objective loop.

A real source kit exists at `src/kits/construct-spiral-intro-kit/index.js`, with a smoke harness at `tests/construct-spiral-intro-kit-smoke.mjs`. The next cutover should wire that kit into the live construct sequence, promote GameHost into a source authority service, and bootstrap config-backed RTS state after the intro completes.

## Current documentation status

This `.agent` folder tracks repo breakdowns and next-step recommendations. Each run gets a timestamped tracker folder so the repo can accumulate durable project history without relying on chat context.

Tracked entries:

```txt
.agent/trackers/2026-07-07T03-11-00-04-00/project-breakdown.md
.agent/trackers/2026-07-07T04-21-15-04-00/project-breakdown.md
.agent/trackers/2026-07-07T05-31-31-04-00/project-breakdown.md
.agent/trackers/2026-07-07T06-41-55-04-00/project-breakdown.md
.agent/kit-registry.json
```

## Highest-value next action

Build the `PhantomCommand GameHost Authority + Scenario Command Cutover` slice.

```txt
menu
  -> construct intro using construct-spiral-intro-kit
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
- Convert `game.html` to thin markup plus `src/main.js` import.
- Preserve `ring-gap-v4` spacing and visual readability.
- Wire `construct-spiral-intro-kit` into the live construct sequence.
- Promote inline `window.GameHost` into `phantom-command-gamehost-kit`.
- Add modes: `construct_intro`, `scenario_bootstrap`, `scenario_active`, `scenario_complete`, and `scenario_failed`.
- Add `getDiagnostics()`, `dispatch(command)`, `subscribe()`, `getScenarioState()`, and `getCommandJournal()` surfaces.
- Load `config/scenario-001.config.json`, `map-generation.config.json`, `enemy-waves.config.json`, `experience.config.json`, and `unlocks.config.json`.
- Compose a fixed RTS scenario snapshot after construct completion.
- Render Crypt Core, starter squads, resource nodes, first camp, and wave lanes.
- Add first command types: `SELECT_UNITS`, `REQUEST_MOVE`, `REQUEST_BUILD`, `REQUEST_PRODUCE`, and `REQUEST_ATTACK`.
- Add smoke tests for construct completion, scenario bootstrap, first build objective, first camp clear, and command journal replay.
