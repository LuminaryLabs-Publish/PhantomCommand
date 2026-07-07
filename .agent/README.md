# PhantomCommand Agent Notes

**Latest documented run:** `2026-07-07T14-00-18-04-00`

**Latest tracker:** `.agent/trackers/2026-07-07T14-00-18-04-00/project-breakdown.md`

**Kit registry:** `.agent/kit-registry.json`

## Current repo read

`PhantomCommand` is a static Vite / Three.js publish repo for a single-player PvE undead RTS prototype. The app enters through `index.html` and runs the current proof scene through `game.html`.

The live proof remains `sequential-ring-v5`: ten contiguous no-gap stone rings assemble around the Grim Reaper Totem. The current runtime defines construct constants, ring layout, wedge geometry, material detail, animation timing, input, HUD, camera, and `window.GameHost` inline in `game.html`.

The source kit at `src/kits/construct-spiral-intro-kit/index.js` is still valuable as a generic sequencing kit, but it is not yet the live construct authority. Its default schedule is spiral/window based, while the live proof needs strict source-owned sequential-ring-v5 descriptors and inner-first timeline guards.

The design/config layer remains ahead of runtime. It already points toward `scenario_001_raise_the_host`, starting resources, Crypt Core, starter Skeletons/Zombies, Grave Harvester, Bone Pit, the first enemy camp, win/loss conditions, radial map rings, resource nodes, the center totem, and wave lanes. The next source slice should only gate scenario bootstrap after construct completion, not build the whole RTS yet.

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
.agent/trackers/2026-07-07T12-50-04-04-00/project-breakdown.md
.agent/trackers/2026-07-07T14-00-18-04-00/project-breakdown.md
.agent/kit-registry.json
```

## Highest-value next action

Build the `PhantomCommand Construct Source Profile + Scenario Bootstrap Gate Fixture Cutover` slice.

```txt
menu
  -> game.html behavior stays unchanged
  -> source-owned sequential-ring-v5 profile is added
  -> source ring descriptors reproduce ten contiguous zero-gap rings
  -> source piece descriptors reproduce ids, angles, spans, seeds, part counts, and total pieces
  -> inner-first timeline guards prove every outer ring starts only after the previous inner ring can settle
  -> ConstructSnapshot exposes build id, rings, pieces, progress, phase, completion, timeline guards, and event-journal counts
  -> construct_complete is emitted exactly once
  -> scenario bootstrap gate rejects early bootstrap before construct_complete
  -> scenario bootstrap gate accepts after construct_complete and emits ScenarioBootstrapResult
  -> DOM-free parity fixtures validate profile, descriptors, timeline, snapshot, event, and gate behavior
  -> existing construct-spiral-intro-kit smoke remains a generic regression guard
  -> RTS selection, units, buildings, economy, waves, combat, and scenario-active play stay deferred until bootstrap snapshot parity passes
```

Minimum next build checklist:

- Keep `index.html` as the menu shell.
- Preserve current `game.html` visual behavior while adding source modules.
- Add `phantom-command-source-construct-profile-kit`.
- Move the live `sequential-ring-v5` constants into one source-owned profile object.
- Add `phantom-command-ring-descriptor-kit`.
- Reproduce ten rings, zero gaps, live ring widths, and live part counts.
- Add `phantom-command-piece-descriptor-kit`.
- Emit stable piece ids, ring indices, part indices, part counts, angle/span data, and deterministic seed data.
- Add `phantom-command-inner-first-timeline-contract-kit`.
- Compute `firstStart`, `lastStart`, `firstSettle`, `lastSettle`, and `marginSeconds` for every ring transition.
- Add `phantom-command-construct-snapshot-contract-kit`.
- Add `phantom-command-construct-event-journal-kit`.
- Emit `construct_complete` exactly once.
- Add `phantom-command-scenario-bootstrap-gate-kit`.
- Reject scenario bootstrap before a valid construct completion event.
- Accept scenario bootstrap after construct completion and emit a stable `ScenarioBootstrapResult`.
- Add `phantom-command-construct-profile-parity-fixture-kit`.
- Add `phantom-command-live-ring-descriptor-smoke-kit`.
- Add `phantom-command-inner-first-timeline-smoke-kit`.
- Add `phantom-command-construct-snapshot-smoke-kit`.
- Add `phantom-command-scenario-bootstrap-gate-smoke-kit`.
- Keep `construct-spiral-intro-kit` defaults unchanged until descriptor, timeline, snapshot, and bootstrap gate parity pass.
