# PhantomCommand Project Breakdown

**Run timestamp:** `2026-07-07T20-31-21-04-00`

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Selected from:** `LuminaryLabs-Publish`

**Central ledger:** `LuminaryLabs-Dev/LuminaryLabs`

## Selection note

`PhantomCommand` was selected because the central repo ledger rotation shows it as the oldest eligible tracked `LuminaryLabs-Publish` repo after the latest documented pass. `LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

Latest eligible timestamps checked from the central ledger rotation:

```txt
PhantomCommand   2026-07-07T19:08:52-04:00
PrehistoricRush  2026-07-07T19:18:58-04:00
MyCozyIsland     2026-07-07T19:29:28-04:00
IntoTheMeadow    2026-07-07T19:42:05-04:00
ZombieOrchard    2026-07-07T19:51:43-04:00
HorrorCorridor   2026-07-07T20:00:46-04:00
TheOpenAbove     2026-07-07T20:10:49-04:00
AetherVale       2026-07-07T20:21:40-04:00
```

## Current repo read

`PhantomCommand` is a static Vite / Three.js publish repo for a single-player PvE undead RTS prototype. The active playable proof opens on `index.html`, routes into `game.html`, and renders the `sequential-ring-v5` opening construct scene.

The current route is:

```txt
index.html
  -> game.html
    -> inline Three.js runtime
    -> inline sequential-ring-v5 constants
    -> inline ring descriptor math
    -> inline piece descriptor / wedge geometry / delay math
    -> inline animation, HUD, controls, camera, and GameHost state
```

The live runtime remains visually successful: ten no-gap stone rings assemble around the Grim Reaper Totem, the HUD reports progress and phase, and `window.GameHost` exposes `skipConstruct`, `restartConstruct`, and `getState`.

The main blocker is still source authority and fixture parity. `game.html` owns the live profile, descriptor generation, delays, completion transition, and construct-only GameHost inline. The generic `construct-spiral-intro-kit` exists and should remain generic, but the live proof needs Phantom-specific source descriptor parity, ConstructSnapshot, event-result idempotency, ScenarioBootstrapSnapshot, and DOM-free smokes before RTS gameplay is expanded.

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
current GameHost: skipConstruct, restartConstruct, getState
```

## Interaction loop

### Current interaction loop

```txt
load index.html
  -> menu renders Phantom Command launch surface
  -> Start routes to game.html
  -> game.html imports Three.js from CDN
  -> create WebGL renderer, scene, fog, camera, lights, materials, HUD, and input inline
  -> define sequential-ring-v5 constants inline
  -> derive 10 contiguous ring specs inline
  -> derive part counts from circumference inline
  -> create 92 wedge pieces inline
  -> animate pieces with ringStagger + partStagger delay policy
  -> update progress, phase, HUD bar, count, and status text
  -> accept keyboard pan, wheel zoom, Space skip, R restart, and button controls
  -> update camera orbit and render each frame
  -> expose construct-only window.GameHost state
  -> phase becomes command online after all pieces settle
```

### Target source descriptor parity loop

```txt
load source-owned sequential-ring-v5 profile
  -> emit profile constants
  -> emit ring descriptors from source profile
  -> emit piece descriptors from ring descriptors
  -> emit delay and settle descriptors from timing policy
  -> assert ring count parity
  -> assert zero-gap parity
  -> assert ring part count parity
  -> assert 92-piece parity
  -> assert positive inner-first transition margins
  -> feed descriptors back into the current visible construct runtime without changing visual behavior
```

### Target construct / scenario authority loop

```txt
construct animation reaches completion
  -> create ConstructEventEnvelope
  -> reduce ConstructEventResult
  -> accept construct_complete exactly once
  -> reject duplicate construct_complete with reason duplicate_construct_complete
  -> append ConstructEventJournal
  -> project ConstructSnapshot
  -> reject scenario bootstrap before completion with reason construct_incomplete
  -> accept scenario_001_raise_the_host after construct completion
  -> reject duplicate scenario bootstrap with reason duplicate_scenario_bootstrap
  -> project ScenarioBootstrapSnapshot with RTS placeholders only
  -> expose additive GameHost diagnostics
  -> prove behavior through DOM-free replay fixtures
```

## Domains in use

```txt
static-app-shell
main-menu-routing
vite-static-build
github-pages-deploy
browser-render-host
three-render-scene
webgl-canvas-host
inline-construct-runtime
sequential-ring-v5-profile
construct-source-authority
construct-profile-config
construct-profile-parity
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
piece-delay-policy
piece-settle-policy
wedge-geometry-generation
stone-material-detail
construct-animation-timeline
inner-first-timeline-contract
ring-transition-margin-policy
construct-event-envelope
construct-event-result
construct-event-reducer
construct-completion-idempotency
construct-event-journal
construct-snapshot-contract
scenario-bootstrap-preflight
scenario-bootstrap-gate
scenario-bootstrap-result
scenario-bootstrap-snapshot
scenario-mode-state-machine
camera-navigation
keyboard-pan-input
button-input
wheel-zoom-input
hud-diagnostics
gamehost-authority
gamehost-diagnostics
fixture-script-runner
construct-profile-parity-smoke
ring-descriptor-parity-smoke
piece-descriptor-parity-smoke
inner-first-timeline-smoke
construct-event-reducer-smoke
scenario-bootstrap-gate-smoke
legacy-gamehost-compatibility-smoke
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
command-journal-replay
behavior-smoke-testing
```

## Services the kits offer

### Current runtime services

```txt
serve static menu route
serve static game route
build static deploy bundle
create Three.js renderer, scene, camera, lights, fog, materials, and HUD inline
create live ring descriptors inline
create live wedge geometry and seam markers inline
animate construct pieces by radial interpolation and vertical drop interpolation
track progress, completed piece count, phase, total pieces, and ring gaps
accept pan / zoom / skip / restart inputs
expose construct-only GameHost methods
```

### Current source-kit services

```txt
construct-spiral-intro-kit:
  create generic construct piece ids
  create generic construct schedules
  install piece descriptors
  reset construct state
  update by dt
  emit snapshots
  list active, pending, settled, newly active, and newly settled pieces
  expose per-piece progress and status

construct-spiral-intro-kit-smoke:
  validate generic kit id and domain path
  install generated ring pieces
  assert schedule ordering
  tick until complete
  assert active count cap
  assert active ring window
  assert all pieces settle
```

### Needed next services

```txt
own sequential-ring-v5 source profile outside game.html
emit serializable ring descriptors
emit serializable piece descriptors
emit serializable piece delay / settle records
validate zero gaps
validate ring part counts
validate 92 total pieces
validate positive inner-first timeline margins
emit construct event envelopes
emit accepted / rejected construct event results
emit construct_complete exactly once
reject duplicate construct completion
append construct event journal records
project ConstructSnapshot without DOM or Three.js dependency
preflight scenario bootstrap
emit accepted / rejected scenario bootstrap results
reject early bootstrap
accept post-completion bootstrap
reject duplicate bootstrap
project ScenarioBootstrapSnapshot with placeholder RTS boundaries
preserve legacy GameHost getState shape
expose additive source / descriptor / event / scenario diagnostics
run DOM-free fixture scripts
```

## Kit inventory

### Implemented kits

```txt
construct-spiral-intro-kit
construct-spiral-intro-kit-smoke
```

### Inline runtime kits to extract

```txt
inline-sequential-ring-v5-profile
inline-ring-descriptor-runtime
inline-piece-descriptor-runtime
inline-piece-delay-runtime
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
phantom-command-piece-delay-policy-kit
phantom-command-piece-settle-policy-kit
phantom-command-inner-first-timeline-contract-kit
phantom-command-ring-transition-margin-kit
phantom-command-profile-parity-report-kit
phantom-command-construct-event-envelope-kit
phantom-command-construct-event-result-kit
phantom-command-construct-event-reducer-kit
phantom-command-construct-completion-idempotency-kit
phantom-command-construct-event-journal-kit
phantom-command-construct-snapshot-contract-kit
phantom-command-scenario-bootstrap-preflight-kit
phantom-command-scenario-bootstrap-result-kit
phantom-command-scenario-bootstrap-gate-kit
phantom-command-scenario-bootstrap-snapshot-kit
phantom-command-gamehost-construct-diagnostics-kit
phantom-command-fixture-script-runner-kit
phantom-command-construct-profile-parity-fixture-kit
phantom-command-ring-descriptor-parity-smoke-kit
phantom-command-piece-descriptor-parity-smoke-kit
phantom-command-inner-first-timeline-smoke-kit
phantom-command-construct-event-reducer-smoke-kit
phantom-command-construct-snapshot-smoke-kit
phantom-command-scenario-bootstrap-gate-smoke-kit
phantom-command-gamehost-diagnostics-smoke-kit
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
phantom-command-grave-field-economy-kit
phantom-command-bone-yard-economy-kit
phantom-command-soul-well-economy-kit
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

## Findings

1. The live construct proof is the best current runtime authority for visual behavior, but it is not yet a reusable source authority.
2. The generic `construct-spiral-intro-kit` should stay generic; do not force live Phantom no-gap behavior into that default schedule.
3. The immediate value is descriptor parity: profile constants, ring descriptors, piece descriptors, delays, settle windows, total piece count, and positive inner-first margins.
4. Construct completion needs typed event/result semantics before scenario bootstrapping.
5. Scenario bootstrap should exist as a gate and snapshot only; RTS gameplay should stay deferred until construct/bootstrap fixtures pass.
6. `window.GameHost.getState()` should remain compatible while additive diagnostics are added.
7. No rendering or gameplay code should be rewritten until the DOM-free source/descriptor/event/bootstrap fixture matrix exists.

## Recommended next work

1. Preserve current `index.html` and `game.html` visuals.
2. Add a source-owned `sequential-ring-v5` profile module.
3. Add ring descriptor and piece descriptor modules.
4. Add delay / settle / timeline guard modules.
5. Add parity fixtures for ten rings, zero gaps, part counts, 92 pieces, and timeline margins.
6. Add ConstructEventEnvelope, ConstructEventResult, ConstructEventReducer, and ConstructEventJournal.
7. Emit `construct_complete` once and reject duplicates.
8. Add ConstructSnapshot.
9. Add ScenarioBootstrapPreflightResult, ScenarioBootstrapResult, ScenarioBootstrapGate, and ScenarioBootstrapSnapshot.
10. Expose additive GameHost diagnostics.
11. Add DOM-free smoke scripts.
12. Defer map, units, buildings, economy, combat, and objectives until source descriptor parity and scenario bootstrap gate pass.

## Suggested next vertical slice

**Build target:** `PhantomCommand Source Descriptor Parity + Scenario Bootstrap Gate Fixture Lock`

```txt
preserve current menu and construct visuals
  -> source-own sequential-ring-v5 profile
  -> derive live-compatible ring descriptors
  -> derive live-compatible piece descriptors
  -> derive delay and settle descriptors
  -> assert ten rings
  -> assert zero gaps
  -> assert [5,5,5,5,6,8,10,12,16,20]
  -> assert 92 total pieces
  -> assert positive inner-first transition margins
  -> create ConstructEventEnvelope / ConstructEventResult / ConstructEventReducer
  -> accept construct_complete once
  -> reject duplicate construct_complete
  -> project ConstructSnapshot
  -> reject scenario bootstrap before completion
  -> accept scenario_001_raise_the_host after completion
  -> reject duplicate scenario bootstrap
  -> project ScenarioBootstrapSnapshot with RTS boundary placeholders only
  -> expose additive GameHost diagnostics
  -> add DOM-free smoke fixtures
```

## Validation status

No runtime source code changed in this pass.

No local build or smoke test was run in this pass.
