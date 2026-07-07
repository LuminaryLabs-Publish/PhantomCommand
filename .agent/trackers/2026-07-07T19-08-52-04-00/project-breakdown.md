# PhantomCommand Project Breakdown

**Run timestamp:** `2026-07-07T19-08-52-04-00`

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Branch updated:** `main`

**Selected because:** The central `LuminaryLabs-Dev/LuminaryLabs` repo ledger showed `PhantomCommand` as the oldest eligible tracked `LuminaryLabs-Publish` repo by latest review timestamp. `LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

## Selection audit

Accessible `LuminaryLabs-Publish` repos checked:

```txt
HorrorCorridor
AetherVale
TheOpenAbove
TheCavalryOfRome  excluded
PhantomCommand      selected
PrehistoricRush
ZombieOrchard
IntoTheMeadow
MyCozyIsland
```

Latest eligible central-ledger timestamps checked:

```txt
PhantomCommand   2026-07-07T17:49:34-04:00
PrehistoricRush  2026-07-07T18:00:19-04:00
MyCozyIsland     2026-07-07T18:10:03-04:00
IntoTheMeadow    2026-07-07T18:19:15-04:00
ZombieOrchard    2026-07-07T18:28:54-04:00
HorrorCorridor   2026-07-07T18:41:07-04:00
TheOpenAbove     2026-07-07T18:49:32-04:00
AetherVale       2026-07-07T19:01:37-04:00
```

## Current repo read

`PhantomCommand` is a static Vite / Three.js publish repo for a single-player PvE undead RTS prototype.

The current live route is still:

```txt
index.html -> game.html -> inline sequential-ring-v5 construct proof
```

`index.html` is a polished static main menu. The Start button routes to `game.html`, and the Open Scene button links directly to the live scene.

`game.html` is still the real runtime authority. It imports Three.js from CDN and owns renderer setup, scene setup, fog, lights, camera, HUD, materials, input state, construct constants, ring descriptor math, wedge geometry, piece creation, piece delay policy, animation timing, keyboard / button / wheel controls, camera navigation, completion phase, and `window.GameHost` inline.

The build pipeline is intentionally static. `npm run build` runs `node scripts/build-static.mjs`, which copies `index.html`, `game.html`, `docs`, and `config` into `dist/`.

The generic `construct-spiral-intro-kit` exists and should stay generic. It supplies a reusable schedule/install/reset/update/snapshot service for spiral/window-style construct sequences. It should not be overloaded with Phantom-specific no-gap sequential-ring facts.

## Main finding

The project has a clean construct proof, but the source of truth is still inverted.

The live `sequential-ring-v5` profile exists only as inline constants and math inside `game.html`. The next implementation slice should source-own those constants and descriptors, prove they still reproduce the visible scene, then add construct event and scenario bootstrap contracts before adding RTS gameplay.

The immediate blocker is not units, economy, waves, or combat yet. The blocker is construct authority:

```txt
profile source -> ring descriptors -> piece descriptors -> timeline guards -> construct event reducer -> ConstructSnapshot -> ScenarioBootstrapSnapshot -> GameHost diagnostics -> DOM-free replay smoke
```

## Interaction loop

### Current loop

```txt
load index.html
  -> show Phantom Command menu
  -> Start or Open Scene routes to game.html
  -> game.html imports Three.js from CDN
  -> create WebGL renderer, scene, fog, lights, camera, HUD, materials, and input state inline
  -> define sequential-ring-v5 constants inline
  -> compute 10 no-gap ring descriptors inline
  -> compute part counts from circumference inline
  -> create wedge meshes, seams, center disc, Grim Reaper Totem, and Phantom Commander inline
  -> animate each piece from start position to final ring position
  -> keyboard/mouse/buttons pan, zoom, skip, and restart the construct intro
  -> update HUD with constructed count, phase, progress, and build id
  -> expose skipConstruct(), restartConstruct(), and getState() through window.GameHost
  -> phase becomes command online after all 92 pieces settle
```

### Target construct authority loop

```txt
load source-owned sequential-ring-v5 profile
  -> emit normalized ConstructProfile
  -> derive RingDescriptor[]
  -> derive PieceDescriptor[]
  -> compute TimelineGuard[]
  -> assert 10 rings
  -> assert zero physical gaps
  -> assert [5,5,5,5,6,8,10,12,16,20] part counts
  -> assert 92 total pieces
  -> assert positive inner-first margins
  -> run existing visual animation from descriptors
  -> emit ConstructEventResult records
  -> accept construct_complete exactly once
  -> reject duplicate construct_complete
  -> project ConstructSnapshot
```

### Target scenario bootstrap loop

```txt
request scenario bootstrap
  -> read ConstructSnapshot
  -> reject before construct completion with construct_incomplete
  -> accept scenario_001_raise_the_host after construct completion
  -> reject duplicate scenario bootstrap with duplicate_scenario_bootstrap
  -> project ScenarioBootstrapSnapshot
  -> expose scenario bootstrap diagnostics through GameHost
  -> keep RTS state placeholder-only until bootstrap fixtures pass
```

## Domains in use

### Runtime / shell domains

```txt
static-app-shell
main-menu-routing
vite-static-build
github-pages-deploy
browser-render-host
three-render-scene
webgl-canvas-host
hud-diagnostics
```

### Current construct domains

```txt
inline-construct-runtime
sequential-ring-v5-profile
construct-profile-config
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
wedge-geometry-generation
stone-material-detail
construct-animation-timeline
inner-first-timeline-contract
ring-settle-boundary-policy
construct-completion-phase
camera-navigation
keyboard-pan-input
button-input
wheel-zoom-input
gamehost-authority
gamehost-diagnostics
```

### Needed source-authority domains

```txt
source-construct-profile
construct-descriptor-authority
construct-profile-parity
construct-event-envelope
construct-event-reducer
construct-event-result
construct-completion-event
construct-completion-idempotency
construct-event-journal
construct-snapshot-contract
construct-fixture-parity
construct-smoke-testing
scenario-bootstrap-preflight
scenario-bootstrap-gate
scenario-bootstrap-result
scenario-bootstrap-snapshot
scenario-mode-state-machine
scenario-state-composition
scenario-fixture-replay
```

### Deferred RTS/gameplay domains

```txt
scenario-config-loading
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

## Services captured

### Current runtime services

- Serve the static menu route.
- Route Start and Open Scene into the live scene.
- Import Three.js from CDN.
- Build renderer, scene, camera, lights, fog, HUD, materials, and input state inline.
- Define `sequential-ring-v5` constants inline.
- Generate no-gap ring descriptors inline.
- Generate piece descriptors and wedge meshes inline.
- Animate piece radial movement and vertical drop inline.
- Track progress, phase, completion, total pieces, ring gaps, part counts, and total build time.
- Support pan, zoom, skip, and restart.
- Expose `window.GameHost.skipConstruct`, `window.GameHost.restartConstruct`, and `window.GameHost.getState`.

### Current source-kit services

The existing `construct-spiral-intro-kit` provides:

- `createConstructSpiralIntroPieceId`.
- `createConstructSpiralIntroSchedule`.
- `createConstructSpiralIntroKit`.
- `installPieces`.
- `reset`.
- `update`.
- `snapshot`.
- `schedule`.
- `activePieces`.
- `settledPieces`.
- `pendingPieces`.
- `newlyActivePieces`.
- `newlySettledPieces`.
- `getPieceProgress`.
- `getPieceStatus`.

### Needed next services

- Own `sequential-ring-v5` source profile outside `game.html`.
- Export construct constants as a frozen profile object.
- Emit serializable ring descriptors.
- Emit serializable piece descriptors.
- Emit deterministic piece ids and seeds.
- Emit angle/span/final-position/start-position descriptor facts.
- Emit piece delay and settle-time facts.
- Prove zero-gap radius continuity.
- Prove live part-count parity.
- Prove total piece parity.
- Prove positive inner-first transition margins.
- Emit `ConstructEventEnvelope` records.
- Reduce construct events into accepted/rejected `ConstructEventResult` records.
- Accept `construct_complete` exactly once.
- Reject duplicate `construct_complete` with stable reason `duplicate_construct_complete`.
- Project serializable `ConstructSnapshot`.
- Preflight scenario bootstrap from `ConstructSnapshot`.
- Reject scenario bootstrap before construct completion with reason `construct_incomplete`.
- Accept `scenario_001_raise_the_host` after completion.
- Reject duplicate scenario bootstrap with reason `duplicate_scenario_bootstrap`.
- Project serializable `ScenarioBootstrapSnapshot` with placeholder-only RTS boundary state.
- Expand `window.GameHost` diagnostics without breaking `getState()`.
- Add DOM-free fixture smoke coverage for descriptor parity, event idempotency, bootstrap legality, snapshot shape, and legacy GameHost compatibility.

## Source facts recorded

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

Retain the positive transition margins from the previous timing audit:

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
phantom-command-inner-first-timeline-contract-kit
phantom-command-ring-settle-boundary-kit
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
phantom-command-construct-profile-parity-fixture-kit
phantom-command-live-ring-descriptor-smoke-kit
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

## Recommended next work

1. Preserve current menu and game visuals.
2. Add source-owned `sequential-ring-v5` profile module.
3. Add ring descriptor module.
4. Add piece descriptor module.
5. Add piece delay / settle-time policy module.
6. Add timeline guard module.
7. Add parity fixtures for profile, rings, pieces, part counts, and total pieces.
8. Add construct event envelope and result contracts.
9. Add construct event reducer.
10. Emit `construct_complete` exactly once.
11. Reject duplicate `construct_complete`.
12. Add construct event journal.
13. Add `ConstructSnapshot`.
14. Add scenario bootstrap preflight / result / gate contracts.
15. Reject early bootstrap.
16. Accept `scenario_001_raise_the_host` after construct completion.
17. Reject duplicate bootstrap.
18. Add `ScenarioBootstrapSnapshot` with placeholder RTS boundary data only.
19. Add additive GameHost diagnostics.
20. Add DOM-free replay smokes.
21. Keep full RTS gameplay deferred.

## Suggested next vertical slice

**Build target:** `PhantomCommand Construct Event Source Gate + Scenario Bootstrap Replay Lock`

```txt
preserve index.html and game.html visuals
  -> source-own sequential-ring-v5 constants
  -> derive live-compatible ring descriptors
  -> derive live-compatible piece descriptors
  -> prove ten rings, zero gaps, live part counts, and 92 pieces
  -> prove positive inner-first timing margins
  -> add construct event envelopes
  -> add construct event results
  -> accept construct_complete exactly once
  -> reject duplicate construct_complete
  -> project ConstructSnapshot
  -> add scenario bootstrap preflight and result contracts
  -> reject bootstrap before construct completion
  -> accept scenario_001_raise_the_host after completion
  -> reject duplicate bootstrap
  -> project ScenarioBootstrapSnapshot
  -> expose additive GameHost diagnostics
  -> prove the whole path with DOM-free fixture smoke
  -> do not start RTS gameplay until this source gate passes
```

## Validation status

No runtime source code changed in this pass.

No local build or smoke test was run in this pass.
