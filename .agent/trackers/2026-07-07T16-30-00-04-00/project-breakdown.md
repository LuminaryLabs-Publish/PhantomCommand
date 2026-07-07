# PhantomCommand Project Breakdown

**Run timestamp:** `2026-07-07T16-30-00-04-00`

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Branch:** `main`

**Selected because:** The central `LuminaryLabs-Dev/LuminaryLabs` ledger showed `LuminaryLabs-Publish/PhantomCommand` as the oldest eligible tracked Publish repo by latest review timestamp after excluding `LuminaryLabs-Publish/TheCavalryOfRome`.

## Selection ledger

```txt
PhantomCommand   2026-07-07T15:19:05-04:00
PrehistoricRush  2026-07-07T15:29:27-04:00
MyCozyIsland     2026-07-07T15:40:06-04:00
IntoTheMeadow    2026-07-07T15:49:14-04:00
ZombieOrchard    2026-07-07T15:59:24-04:00
HorrorCorridor   2026-07-07T16:09:54-04:00
TheOpenAbove     2026-07-07T16:21:09-04:00
AetherVale       2026-07-07T16:29:18-04:00
TheCavalryOfRome excluded by rule
```

## Current read

`PhantomCommand` is a static Vite / Three.js publish repo for a single-player PvE undead RTS prototype.

The live product currently has two browser surfaces:

```txt
index.html -> menu / Start button / Open Scene link
game.html  -> sequential-ring-v5 construct proof scene
```

`game.html` is still the canonical runtime source. It owns the `sequential-ring-v5` constants, ring generation, piece generation, wedge geometry, stone material variation, construct animation, skip/restart controls, camera pan/zoom, HUD, and `window.GameHost`.

The scene now proves the desired visual behavior: ten contiguous zero-gap rings assemble inner-first around the Grim Reaper Totem and end with the command platform online.

The runtime has not yet moved that behavior into source-owned descriptor, event, snapshot, or scenario bootstrap kits.

## Interaction loop

### Current interaction loop

```txt
load index.html
  -> show Phantom Command menu
  -> Start button routes to game.html
  -> game.html imports Three.js from CDN
  -> inline runtime creates WebGL renderer, scene, fog, lights, camera, HUD, materials, and input state
  -> inline constants define sequential-ring-v5
  -> inline ring math creates 10 no-gap ring descriptors
  -> inline ringParts() computes part counts from circumference
  -> inline makePiece() creates wedge meshes and seam markers
  -> inline construct(seq) interpolates pieces by delay and progress
  -> keyboard/mouse/buttons pan, zoom, skip, and restart the construct intro
  -> HUD publishes constructed count, phase, progress, and build id
  -> window.GameHost exposes skipConstruct(), restartConstruct(), and getState()
  -> phase becomes command online when all 92 pieces are settled
```

### Target first playable product loop

```txt
load index.html
  -> route to game.html or future game shell
  -> load source-owned sequential-ring-v5 profile
  -> derive ring descriptors from the profile
  -> derive piece descriptors from the ring descriptors
  -> validate timeline guards before runtime animation starts
  -> run construct animation from descriptors
  -> project ConstructSnapshot each frame
  -> emit construct_complete exactly once when all pieces settle
  -> reject duplicate construct_complete events with stable reason metadata
  -> open scenario bootstrap gate only after construct completion
  -> build ScenarioBootstrapSnapshot from scenario_001_raise_the_host config
  -> transition mode from construct_intro to scenario_active
  -> enable RTS selection, production, economy, combat, waves, objectives, XP, unlocks, and win/loss evaluation
```

### Recommended service loop

```txt
source construct profile service
  -> ring descriptor service
  -> piece descriptor service
  -> inner-first timeline guard service
  -> construct event envelope service
  -> construct event reducer service
  -> construct snapshot projector
  -> scenario bootstrap preflight service
  -> scenario bootstrap snapshot service
  -> GameHost diagnostics service
  -> DOM-free fixture harness
```

## Domains in use

```txt
static-app-shell
main-menu-routing
vite-static-build
github-pages-deploy
browser-render-host
three-render-scene
inline-construct-runtime
sequential-ring-v5-profile
source-construct-profile
construct-profile-config
construct-descriptor-authority
ring-count-policy
ring-width-policy
ring-growth-policy
no-gap-radius-policy
ring-part-count-policy
ring-descriptor-generation
piece-descriptor-generation
piece-id-policy
piece-seed-policy
piece-angle-policy
wedge-geometry-generation
stone-material-detail
construct-animation-timeline
inner-first-timeline-contract
ring-settle-boundary-policy
construct-reducer
construct-event-envelope
construct-completion-event
construct-completion-idempotency
construct-snapshot-contract
construct-event-journal
construct-fixture-parity
construct-smoke-testing
camera-navigation
keyboard-pan-input
button-input
wheel-zoom-input
hud-diagnostics
gamehost-authority
mode-state-machine
scenario-bootstrap-gate
scenario-bootstrap-preflight
scenario-config-loading
scenario-state-composition
scenario-snapshot-contract
radial-map-generation
center-pressure-ring-model
player-start-placement
resource-node-placement
enemy-camp-placement
wave-lane-placement
grave-field-economy
bone-yard-economy
soul-well-economy
undead-unit-state
enemy-unit-state
necropolis-building-state
building-construction
building-production
rts-selection
rts-command-validation
rts-movement-request
rts-attack-request
world-economy-ledger
combat-resolution
objective-tracking
experience-progression
unlock-registry
idempotency-ledger
command-journal-replay
behavior-smoke-testing
```

## Services the kits offer

### Current runtime services

- Serve a static menu route.
- Serve a static game route.
- Build a Three.js renderer, scene, camera, lights, fog, and HUD inline.
- Create ring descriptors inline from constants.
- Create wedge geometry and seam meshes inline.
- Animate construct pieces through radial and drop interpolation.
- Track progress, phase, total pieces, and completion.
- Allow pan, zoom, skip, and restart controls.
- Expose construct diagnostics through `window.GameHost.getState()`.

### Current source-kit services

- `construct-spiral-intro-kit` creates generic construct piece ids.
- `construct-spiral-intro-kit` creates generic schedules.
- `construct-spiral-intro-kit` installs pieces.
- `construct-spiral-intro-kit` resets state.
- `construct-spiral-intro-kit` updates progress over time.
- `construct-spiral-intro-kit` emits snapshots.
- `construct-spiral-intro-kit` reports pending, active, settled, newly active, and newly settled pieces.
- `construct-spiral-intro-kit-smoke` validates generic kit id/domain path, scheduling, active count caps, active ring window, and completion.

### Needed next services

- Own the live `sequential-ring-v5` profile outside `game.html`.
- Emit serializable ring descriptors.
- Emit serializable piece descriptors.
- Prove zero gaps and live part-count parity.
- Prove inner-first ring timing with positive transition margins.
- Emit accepted/rejected construct event envelopes.
- Emit `construct_complete` exactly once.
- Reject duplicate construct completion with a stable reason.
- Project `ConstructSnapshot` without DOM or Three.js dependency.
- Preflight scenario bootstrap with explicit accepted/rejected results.
- Reject scenario bootstrap before construct completion.
- Accept scenario bootstrap after construct completion.
- Project `ScenarioBootstrapSnapshot` with scenario id, starting resources, center totem, first camps, wave lanes, and starter units/buildings.
- Expand `window.GameHost` diagnostics without breaking the current surface.
- Add fixture smoke for descriptor parity, completion idempotency, bootstrap gating, and snapshot shape.

## Kit inventory

### Implemented source kits

```txt
construct-spiral-intro-kit
construct-spiral-intro-kit-smoke
```

### Current inline runtime kits that should be extracted

```txt
inline-sequential-ring-v5-profile
inline-ring-descriptor-runtime
inline-piece-descriptor-runtime
inline-wedge-geometry-runtime
inline-construct-animation-runtime
inline-construct-hud-runtime
inline-camera-navigation-runtime
inline-gamehost-construct-runtime
```

### Next-cut kits

```txt
phantom-command-source-construct-profile-kit
phantom-command-ring-descriptor-kit
phantom-command-piece-descriptor-kit
phantom-command-inner-first-timeline-contract-kit
phantom-command-ring-settle-boundary-kit
phantom-command-construct-event-envelope-kit
phantom-command-construct-event-reducer-kit
phantom-command-construct-completion-event-kit
phantom-command-construct-completion-idempotency-kit
phantom-command-construct-snapshot-contract-kit
phantom-command-scenario-bootstrap-preflight-kit
phantom-command-scenario-bootstrap-gate-kit
phantom-command-scenario-bootstrap-snapshot-kit
phantom-command-gamehost-construct-diagnostics-kit
phantom-command-construct-profile-parity-fixture-kit
phantom-command-live-ring-descriptor-smoke-kit
phantom-command-inner-first-timeline-smoke-kit
phantom-command-construct-event-reducer-smoke-kit
phantom-command-construct-snapshot-smoke-kit
phantom-command-scenario-bootstrap-gate-smoke-kit
```

### Deferred RTS/gameplay kits

```txt
phantom-command-scenario-config-loader-kit
phantom-command-radial-map-kit
phantom-command-center-pressure-ring-kit
phantom-command-player-start-kit
phantom-command-resource-node-kit
phantom-command-enemy-camp-kit
phantom-command-wave-lane-kit
phantom-command-undead-roster-kit
phantom-command-necropolis-building-kit
phantom-command-building-production-kit
phantom-command-selection-kit
phantom-command-rts-command-contract-kit
phantom-command-command-acceptance-kit
phantom-command-world-economy-ledger-kit
phantom-command-combat-resolution-kit
phantom-command-objective-tracker-kit
phantom-command-xp-progression-kit
phantom-command-unlock-registry-kit
phantom-command-command-journal-replay-kit
```

## Source facts captured

```txt
buildId: sequential-ring-v5
ringCount: 10
firstInnerRadius: 10
firstRingWidth: 7
ringWidthGrowth: 1.25
maxRingWidth: 120
ringGapBase: 0
ringGapGrowth: 0
moveSeconds: 2.0
dropStartSeconds: 0.08
ringStagger: 3.25
partStagger: 0.035
prewarmSeconds: 0.55
startRadiusMultiplier: 1.45
startHeightBase: 28
ringPartCounts: [5,5,5,5,6,8,10,12,16,20]
totalPieces: 92
totalBuildSeconds: 31.915
```

Known positive ring transition margins:

```txt
ring 1 starts 1.110s after ring 0 can settle
ring 2 starts 1.110s after ring 1 can settle
ring 3 starts 1.110s after ring 2 can settle
ring 4 starts 1.110s after ring 3 can settle
ring 5 starts 1.075s after ring 4 can settle
ring 6 starts 1.005s after ring 5 can settle
ring 7 starts 0.935s after ring 6 can settle
ring 8 starts 0.865s after ring 7 can settle
ring 9 starts 0.725s after ring 8 can settle
```

## Key findings

- The visual proof is strong enough to preserve exactly.
- The live source of truth is still inline in `game.html`.
- The generic construct kit should not be mutated to become Phantom-specific.
- The next code cut should add Phantom-specific source profile and descriptor kits beside the generic kit.
- Scenario bootstrap should be gated by construct completion, not by elapsed time or HUD text.
- `window.GameHost.getState()` has enough current diagnostics for manual inspection, but not enough structured data for fixture parity.
- RTS gameplay should remain deferred until construct snapshot and scenario bootstrap preflight are DOM-free and replayable.

## Recommended next work

1. Preserve `index.html` menu behavior and `game.html` visuals.
2. Add `phantom-command-source-construct-profile-kit` with the exact live constants.
3. Add `phantom-command-ring-descriptor-kit` and lock part counts to `[5,5,5,5,6,8,10,12,16,20]`.
4. Add `phantom-command-piece-descriptor-kit` with stable ids, ring index, part index, span, angle, seed, delay, start policy, and settle time.
5. Add `phantom-command-inner-first-timeline-contract-kit` with transition margins.
6. Add event envelopes and reducer for construct lifecycle.
7. Emit `construct_complete` once.
8. Reject duplicate completion.
9. Add `ConstructSnapshot` and GameHost construct diagnostics.
10. Add scenario bootstrap preflight and gate checks.
11. Reject bootstrap before construct completion.
12. Accept bootstrap after completion and emit a serializable bootstrap snapshot.
13. Add DOM-free smoke for all source profile, descriptor, timeline, completion, snapshot, and bootstrap gate behaviors.
14. Defer unit selection, economy, production, movement, attack, combat, waves, objectives, XP, and unlocks until bootstrap parity is stable.

## Suggested next vertical slice

**Build target:** `PhantomCommand Construct Snapshot Authority + Scenario Bootstrap Preflight Fixture Cutover`

```txt
preserve current index.html and game.html behavior
  -> add source-owned sequential-ring-v5 construct profile
  -> add ring descriptors matching the live ring counts, widths, zero gaps, and part counts
  -> add piece descriptors matching live ids, angles, spans, seeds, delays, and total piece count
  -> add inner-first timeline guards with transition margins
  -> add ConstructEventEnvelope and ConstructEventReducer
  -> emit construct_complete exactly once
  -> reject duplicate construct_complete with reason duplicate_construct_complete
  -> add ConstructSnapshot with descriptors, progress, phase, completion, timeline guards, and event journal counts
  -> add ScenarioBootstrapPreflightResult
  -> reject scenario bootstrap before construct completion
  -> accept scenario bootstrap after construct completion
  -> add ScenarioBootstrapSnapshot for scenario_001_raise_the_host
  -> expand GameHost with getConstructSnapshot(), getScenarioBootstrapSnapshot(), and getDiagnostics()
  -> add DOM-free smokes for profile parity, descriptor parity, timeline margins, completion idempotency, snapshot shape, early bootstrap rejection, and post-completion bootstrap acceptance
  -> keep construct-spiral-intro-kit generic and unchanged
  -> keep RTS gameplay deferred until construct and scenario bootstrap fixtures pass
```

## Acceptance targets

```txt
npm run build still succeeds
index.html still routes to game.html
game.html still renders the same construct proof
GameHost.skipConstruct, GameHost.restartConstruct, and GameHost.getState remain compatible
source profile buildId is sequential-ring-v5
ring part counts stay [5,5,5,5,6,8,10,12,16,20]
total pieces stay 92
all ring gaps stay 0
all ring transition margins remain positive
construct_complete is accepted once
second construct_complete is rejected
scenario bootstrap before completion is rejected
scenario bootstrap after completion is accepted
ConstructSnapshot and ScenarioBootstrapSnapshot are serializable without DOM or Three.js
```

## Validation status

No runtime source code changed in this documentation pass.

No local build or smoke test was run in this documentation pass.
