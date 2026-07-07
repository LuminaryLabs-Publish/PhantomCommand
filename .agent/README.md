# PhantomCommand Agent Notes

**Latest documented run:** `2026-07-07T05-31-31-04-00`

**Latest tracker:** `.agent/trackers/2026-07-07T05-31-31-04-00/project-breakdown.md`

**Kit registry:** `.agent/kit-registry.json`

## Current repo read

`PhantomCommand` is a static Vite/Three.js publish repo for a single-player PvE undead RTS prototype. The app still opens through `index.html` and runs the live proof through `game.html`, where concentric stone-ring pieces assemble into a readable `ring-gap-v4` ritual construct around the Grim Reaper Totem.

The latest runtime now exposes `window.GameHost` with `skipConstruct`, `restartConstruct`, and `getState()`. That is useful for diagnostics, but it is still construct-only and inline in `game.html`.

The design/config layer remains ahead of the runtime. It already defines the intended RTS foundation: Crypt Core, Grave Harvester, Bone Pit, Skeletons, Zombies, enemy camps/waves, XP, unlocks, map rings, resource nodes, wave lanes, win/loss conditions, and the first objective loop.

A real source kit exists at `src/kits/construct-spiral-intro-kit/index.js`, with a smoke harness at `tests/construct-spiral-intro-kit-smoke.mjs`. The next cutover should wire that kit into the live construct sequence and then bootstrap config-backed RTS state after the intro completes.

## Current documentation status

This `.agent` folder tracks repo breakdowns and next-step recommendations. Each run gets a timestamped tracker folder so the repo can accumulate durable project history without relying on chat context.

Tracked entries:

```txt
.agent/trackers/2026-07-07T03-11-00-04-00/project-breakdown.md
.agent/trackers/2026-07-07T04-21-15-04-00/project-breakdown.md
.agent/trackers/2026-07-07T05-31-31-04-00/project-breakdown.md
.agent/kit-registry.json
```

## Highest-value next action

Build the `PhantomCommand Source-Kit + Scenario Bootstrap Cutover` slice.

```txt
menu
  -> construct intro using construct-spiral-intro-kit
  -> GameHost mode changes from construct_intro to scenario_active
  -> scenario bootstrap from config JSON
  -> fixed RTS map state
  -> select undead units
  -> build Grave Harvester
  -> build Bone Pit
  -> produce Skeletons/Zombies
  -> defend against first wave
  -> clear first enemy camp
  -> win/loss state
  -> inspectable GameHost state
```

Minimum next build checklist:

- Keep `index.html` as the menu shell.
- Convert `game.html` to thin markup plus `src/main.js` import.
- Preserve `ring-gap-v4` spacing and visual readability.
- Wire `construct-spiral-intro-kit` into the live construct sequence.
- Promote inline `window.GameHost` into `phantom-command-gamehost-kit`.
- Add `getDiagnostics()` and `dispatch(command)` surfaces.
- Load `config/scenario-001.config.json`, `map-generation.config.json`, `enemy-waves.config.json`, `experience.config.json`, and `unlocks.config.json`.
- Compose a fixed RTS scenario snapshot after construct completion.
- Render Crypt Core, starter squads, resource nodes, first camp, and wave lanes.
- Add smoke tests for construct completion, scenario bootstrap, first build objective, and first camp clear.
