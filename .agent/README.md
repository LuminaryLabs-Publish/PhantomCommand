# PhantomCommand Agent Notes

**Latest documented run:** `2026-07-07T23-09-45-04-00`

**Latest tracker:** `.agent/trackers/2026-07-07T23-09-45-04-00/project-breakdown.md`

**Kit registry:** `.agent/kit-registry.json`

## Current repo read

`PhantomCommand` is a static Vite / Three.js publish repo for a single-player PvE undead RTS prototype.

The active user flow is still:

```txt
index.html -> game.html -> inline sequential-ring-v5 construct proof
```

`index.html` is the static menu route. It routes Start / Open Scene into `game.html`.

`game.html` is still the live runtime authority. It imports Three.js from CDN and owns renderer setup, scene setup, fog, lights, camera, HUD, materials, input, construct constants, ring descriptor math, wedge geometry, piece delays, animation, skip/restart controls, camera navigation, completion phase, and `window.GameHost` inline.

The current live build remains `sequential-ring-v5`:

```txt
rings: 10
ring gaps: all 0
ring parts: [5,5,5,5,6,8,10,12,16,20]
total pieces: 92
total build seconds: 31.915
```

The source kit at `src/kits/construct-spiral-intro-kit/index.js` remains useful as a generic construct sequencing kit. Keep it generic. Add Phantom-specific profile, descriptor, event, snapshot, and bootstrap gate kits beside it instead of overloading the generic kit.

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
.agent/trackers/2026-07-07T17-49-34-04-00/project-breakdown.md
.agent/trackers/2026-07-07T19-08-52-04-00/project-breakdown.md
.agent/trackers/2026-07-07T20-31-21-04-00/project-breakdown.md
.agent/trackers/2026-07-07T21-50-56-04-00/project-breakdown.md
.agent/trackers/2026-07-07T23-09-45-04-00/project-breakdown.md
.agent/kit-registry.json
```

## Highest-value next action

Build the `PhantomCommand Descriptor Fixture Matrix + Bootstrap Result Gate` slice.

```txt
menu and game visuals stay unchanged
  -> source-own sequential-ring-v5 constants
  -> normalize construct profile values
  -> derive live-compatible ring descriptors
  -> derive live-compatible piece descriptors
  -> derive delay and settle descriptors
  -> prove ten rings, zero gaps, live part counts, 92 pieces, and 31.915 total build seconds
  -> prove positive inner-first timing margins
  -> add ConstructEventEnvelope records
  -> add ConstructEventResult records
  -> accept construct_complete exactly once
  -> reject duplicate construct_complete with duplicate_construct_complete
  -> append construct event journal entries
  -> project serializable ConstructSnapshot
  -> add scenario bootstrap preflight and result contracts
  -> reject bootstrap before construct completion with construct_incomplete
  -> accept scenario_001_raise_the_host after completion
  -> reject duplicate bootstrap with duplicate_scenario_bootstrap
  -> project ScenarioBootstrapSnapshot with RTS boundary placeholders only
  -> expose additive GameHost diagnostics
  -> add DOM-free fixture matrix
  -> keep full RTS gameplay deferred until descriptor, event, snapshot, and bootstrap replay parity pass
```

Minimum next build checklist:

- Keep `index.html` as the menu shell.
- Preserve current `game.html` visual behavior.
- Add `phantom-command-source-construct-profile-kit`.
- Move the live `sequential-ring-v5` constants into a source-owned profile object.
- Export a profile fingerprint and source snapshot.
- Add `phantom-command-ring-descriptor-kit`.
- Reproduce ten rings, zero gaps, live ring widths, and live part counts.
- Add `phantom-command-piece-descriptor-kit`.
- Emit stable piece ids, ring indices, part indices, part counts, angle/span data, mid radius, and deterministic seed data.
- Add `phantom-command-piece-delay-policy-kit`.
- Add `phantom-command-piece-settle-policy-kit`.
- Add `phantom-command-inner-first-timeline-contract-kit`.
- Compute `firstStart`, `lastStart`, `firstSettle`, `lastSettle`, and `marginSeconds` for every ring transition.
- Add `phantom-command-profile-parity-report-kit`.
- Add `phantom-command-construct-event-envelope-kit`.
- Add `phantom-command-construct-event-result-kit`.
- Add `phantom-command-construct-event-reducer-kit`.
- Emit `construct_complete` exactly once.
- Reject duplicate `construct_complete` with reason `duplicate_construct_complete`.
- Add `phantom-command-construct-event-journal-kit`.
- Add `phantom-command-construct-snapshot-contract-kit`.
- Add `phantom-command-scenario-bootstrap-preflight-kit`.
- Add `phantom-command-scenario-bootstrap-result-kit`.
- Add `phantom-command-scenario-bootstrap-gate-kit`.
- Add `phantom-command-scenario-bootstrap-snapshot-kit`.
- Add `phantom-command-gamehost-construct-diagnostics-kit`.
- Add `phantom-command-fixture-script-runner-kit`.
- Add `phantom-command-construct-profile-parity-fixture-kit`.
- Add `phantom-command-ring-descriptor-parity-smoke-kit`.
- Add `phantom-command-piece-descriptor-parity-smoke-kit`.
- Add `phantom-command-inner-first-timeline-smoke-kit`.
- Add `phantom-command-construct-event-reducer-smoke-kit`.
- Add `phantom-command-construct-snapshot-smoke-kit`.
- Add `phantom-command-scenario-bootstrap-gate-smoke-kit`.
- Add `phantom-command-gamehost-diagnostics-smoke-kit`.
- Keep `construct-spiral-intro-kit` defaults unchanged.
- Defer full RTS gameplay until descriptor, timeline, event, snapshot, and bootstrap gate parity pass.
