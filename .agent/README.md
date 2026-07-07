# PhantomCommand Agent Notes

**Latest documented run:** `2026-07-07T11-18-32-04-00`

**Latest tracker:** `.agent/trackers/2026-07-07T11-18-32-04-00/project-breakdown.md`

**Kit registry:** `.agent/kit-registry.json`

## Current repo read

`PhantomCommand` is a static Vite / Three.js publish repo for a single-player PvE undead RTS prototype. The app enters through `index.html` and runs the current proof scene through `game.html`.

The live proof is still `sequential-ring-v5`: ten concentric no-gap stone rings assemble around the Grim Reaper Totem. The current runtime defines construct constants, ring layout, wedge geometry, material detail, animation timing, input, HUD, camera, and `window.GameHost` inline in `game.html`.

The source kit at `src/kits/construct-spiral-intro-kit/index.js` is useful, but its default schedule is still spiral/window based. The next cutover should first create a source-owned construct profile and ring descriptor parity fixture before adapting the generic construct kit or splitting the runtime.

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
.agent/trackers/2026-07-07T11-18-32-04-00/project-breakdown.md
.agent/kit-registry.json
```

## Highest-value next action

Build the `PhantomCommand Source Construct Profile + Ring Descriptor Parity Fixture Cutover` slice.

```txt
menu
  -> game.html behavior stays unchanged for this slice
  -> source-owned sequential-ring-v5 profile is added
  -> source ring descriptors reproduce ten rings and zero physical gaps
  -> source ring widths reproduce FIRST_RING_WIDTH * RING_WIDTH_GROWTH capped by MAX_RING_WIDTH
  -> source ring part counts reproduce ringParts(inner, outer)
  -> source piece descriptors emit stable ids and metadata
  -> DOM-free parity fixture validates build id, ring count, widths, gaps, part counts, and total pieces
  -> existing construct-spiral-intro-kit smoke remains a generic regression guard
  -> sequential adapter, GameHost extraction, scenario bootstrap, and RTS commands stay deferred until descriptor parity passes
```

Minimum next build checklist:

- Keep `index.html` as the menu shell.
- Preserve current `game.html` behavior while adding source modules.
- Add `phantom-command-source-construct-profile-kit`.
- Move the live `sequential-ring-v5` constants into one source-owned profile object.
- Add `phantom-command-ring-descriptor-kit`.
- Reproduce ten rings, zero gaps, live ring widths, and live part counts.
- Add `phantom-command-piece-descriptor-kit`.
- Emit stable piece ids, ring indices, part indices, part counts, angle/span data, and deterministic seed data.
- Add `phantom-command-construct-profile-parity-fixture-kit`.
- Add `phantom-command-live-ring-descriptor-smoke-kit`.
- Keep `construct-spiral-intro-kit` defaults unchanged until descriptor parity passes.
- Do not expand scenario bootstrap, selection, units, buildings, economy, combat, or wave behavior until source descriptor parity is stable.
