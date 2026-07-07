# PhantomCommand Agent Notes

**Latest documented run:** `2026-07-07T16-30-00-04-00`

**Latest tracker:** `.agent/trackers/2026-07-07T16-30-00-04-00/project-breakdown.md`

**Kit registry:** `.agent/kit-registry.json`

## Current repo read

`PhantomCommand` is a static Vite / Three.js publish repo for a single-player PvE undead RTS prototype. The app enters through `index.html` and runs the current proof scene through `game.html`.

The live proof remains `sequential-ring-v5`: ten contiguous no-gap stone rings assemble around the Grim Reaper Totem. The current runtime defines construct constants, ring layout, wedge geometry, material detail, animation timing, input, HUD, camera, and `window.GameHost` inline in `game.html`.

The source kit at `src/kits/construct-spiral-intro-kit/index.js` remains valuable as a generic sequencing kit, but it should not become Phantom-specific. Its default schedule is spiral/window based, while the live proof needs strict Phantom-specific sequential-ring-v5 descriptors, inner-first timeline guards, completion event semantics, scenario bootstrap preflight, and DOM-free snapshot fixtures beside it.

The next cut should still preserve the current visual scene exactly. The new authority layer should first make construct profile, descriptors, timeline margins, completion events, construct snapshots, and scenario bootstrap gate outcomes source-owned and fixture-readable.

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
.agent/trackers/2026-07-07T15-19-05-04-00/project-breakdown.md
.agent/trackers/2026-07-07T16-30-00-04-00/project-breakdown.md
.agent/kit-registry.json
```

## Highest-value next action

Build the `PhantomCommand Construct Snapshot Authority + Scenario Bootstrap Preflight Fixture Cutover` slice.

```txt
menu
  -> game.html behavior stays unchanged
  -> source-owned sequential-ring-v5 profile is added
  -> source ring descriptors reproduce ten contiguous zero-gap rings
  -> source piece descriptors reproduce ids, angles, spans, seeds, delays, part counts, and total pieces
  -> inner-first timeline guards prove every outer ring starts only after the previous inner ring can settle
  -> ConstructEventEnvelope records accepted/rejected completion outcomes
  -> construct_complete is emitted exactly once after all pieces settle
  -> duplicate construct_complete is rejected with a stable reason
  -> ConstructSnapshot exposes build id, rings, pieces, progress, phase, completion, timeline guards, and event-journal counts
  -> ScenarioBootstrapPreflightResult rejects early bootstrap and accepts post-completion bootstrap
  -> ScenarioBootstrapSnapshot serializes scenario_001_raise_the_host without enabling full RTS yet
  -> DOM-free parity fixtures validate profile, descriptors, timeline, completion idempotency, construct snapshots, and bootstrap gating
  -> existing construct-spiral-intro-kit smoke remains a generic regression guard
  -> RTS selection, units, buildings, economy, waves, combat, objectives, XP, and unlocks stay deferred until construct and bootstrap fixture parity pass
```

Minimum next build checklist:

- Keep `index.html` as the menu shell.
- Preserve current `game.html` visual behavior while adding source modules.
- Add `phantom-command-source-construct-profile-kit`.
- Move the live `sequential-ring-v5` constants into one source-owned profile object.
- Add `phantom-command-ring-descriptor-kit`.
- Reproduce ten rings, zero gaps, live ring widths, and live part counts.
- Add `phantom-command-piece-descriptor-kit`.
- Emit stable piece ids, ring indices, part indices, part counts, angle/span data, deterministic seed data, delay, and settle time.
- Add `phantom-command-inner-first-timeline-contract-kit`.
- Compute `firstStart`, `lastStart`, `firstSettle`, `lastSettle`, and `marginSeconds` for every ring transition.
- Add `phantom-command-construct-event-envelope-kit`.
- Add `phantom-command-construct-event-reducer-kit`.
- Emit `construct_complete` exactly once when all pieces are settled.
- Reject duplicate `construct_complete` with reason `duplicate_construct_complete`.
- Add `phantom-command-construct-snapshot-contract-kit`.
- Add `phantom-command-scenario-bootstrap-preflight-kit`.
- Add `phantom-command-scenario-bootstrap-gate-kit`.
- Add `phantom-command-scenario-bootstrap-snapshot-kit`.
- Add `phantom-command-gamehost-construct-diagnostics-kit`.
- Add `phantom-command-construct-profile-parity-fixture-kit`.
- Add `phantom-command-live-ring-descriptor-smoke-kit`.
- Add `phantom-command-inner-first-timeline-smoke-kit`.
- Add `phantom-command-construct-event-reducer-smoke-kit`.
- Add `phantom-command-construct-snapshot-smoke-kit`.
- Add `phantom-command-scenario-bootstrap-gate-smoke-kit`.
- Keep `construct-spiral-intro-kit` defaults unchanged.
- Defer full RTS gameplay until descriptor, timeline, event, snapshot, and bootstrap gate parity pass.
