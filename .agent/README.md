# PhantomCommand Agent Notes

**Latest documented run:** `2026-07-07T04-21-15-04-00`

**Latest tracker:** `.agent/trackers/2026-07-07T04-21-15-04-00/project-breakdown.md`

**Kit registry:** `.agent/kit-registry.json`

## Current repo read

`PhantomCommand` is a static Vite/Three.js publish repo for a single-player PvE undead RTS prototype. The current playable app is not yet a full RTS loop. It opens through `index.html`, loads `game.html`, and presents an immediate construct scene where concentric stone-ring slabs assemble around the Grim Reaper Totem with pan, zoom, skip, and restart controls.

The design/config layer is ahead of the runtime. It defines the intended RTS foundation: Crypt Core, Grave Harvester, Bone Pit, Skeletons, Zombies, enemy camps/waves, XP, unlocks, kill rewards, win/loss conditions, and a first objective loop.

A real source kit now exists at `src/kits/construct-spiral-intro-kit/index.js`, with a smoke harness at `tests/construct-spiral-intro-kit-smoke.mjs`. The live `game.html` scene is still not wired through that kit, so the next cutover should extract the inline runtime and route the scene through source services.

## Current documentation status

This `.agent` folder tracks repo breakdowns and next-step recommendations. Each run gets a timestamped tracker folder so the repo can accumulate a durable project history without relying on chat context.

Tracked entries:

```txt
.agent/trackers/2026-07-07T03-11-00-04-00/project-breakdown.md
.agent/trackers/2026-07-07T04-21-15-04-00/project-breakdown.md
.agent/kit-registry.json
```

## Highest-value next action

Build the `PhantomCommand Config-Backed RTS Bootstrap` slice.

```txt
menu
  -> construct intro using construct-spiral-intro-kit
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
- Convert `game.html` to markup plus `src/main.js` import.
- Wire `construct-spiral-intro-kit` into the live construct sequence.
- Add `phantom-command-gamehost-kit` with `getState()` and diagnostics.
- Load `config/scenario-001.config.json`, `map-generation.config.json`, `enemy-waves.config.json`, `experience.config.json`, and `unlocks.config.json`.
- Render initial fixed RTS descriptors before adding complex combat.
- Add smoke tests for scenario bootstrap and first objective completion.
