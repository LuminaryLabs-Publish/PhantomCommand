# PhantomCommand Project Breakdown

**Run timestamp:** `2026-07-07T09-00-25-04-00`

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Default branch:** `main`

**Selected after:** `LuminaryLabs-Publish/TheOpenAbove`

**Excluded by rule:** `LuminaryLabs-Publish/TheCavalryOfRome`

## Plan Ledger

**Goal:** Refresh the internal repo breakdown for `PhantomCommand`, keep the work to this single repo, identify the current interaction loop, all active domains, services, current kits, target kits, and define the next build slice that moves the project from inline construct proof toward source-authoritative construct state and config-backed RTS bootstrap.

**Checklist**

- [x] Reviewed accessible `LuminaryLabs-Publish` repos.
- [x] Used the central `LuminaryLabs-Dev/LuminaryLabs` ledger to continue the tracked Publish rotation.
- [x] Kept Cavalry out of scope.
- [x] Selected only `LuminaryLabs-Publish/PhantomCommand` for this run.
- [x] Re-read repo-local `.agent` notes and kit registry.
- [x] Re-read `README.md`, `package.json`, `game.html`, scenario config, map config, and the current source construct kit.
- [x] Identified the current interaction loop.
- [x] Identified the intended first playable loop.
- [x] Identified the next source-authority service loop.
- [x] Identified domains in use.
- [x] Identified current services and target service surfaces.
- [x] Identified current, candidate, and next-build kits.
- [x] Defined the next implementation slice.
- [x] Updated `.agent/kit-registry.json`.
- [x] Updated `.agent/README.md`.
- [x] Logged findings in `LuminaryLabs-Dev/LuminaryLabs`.

## Current Read

`PhantomCommand` is a static Vite / Three.js single-player PvE undead RTS prototype. The app enters through `index.html`, then loads `game.html` for the live construct proof.

The live proof is `sequential-ring-v5`. It builds ten concentric no-gap stone rings around the Grim Reaper Totem. The runtime explicitly sets `RING_GAP_BASE = 0`, `RING_GAP_GROWTH = 0`, `RING_STAGGER = 3.25`, `PART_STAGGER = 0.035`, and exposes construct diagnostics through inline `window.GameHost.getState()`.

The source kit at `src/kits/construct-spiral-intro-kit/index.js` is useful but still mismatched with the live proof. Its default profile is still spiral/window based: `activePieceSeconds = 4.5`, `spiralStepSeconds = 0.35`, `ringStartStepSeconds = 0.9`, `maxActivePieces = 24`, and `activeRingWindow = 5`. The next source cutover must bridge this mismatch before scenario authority is added.

The design/config layer is ahead of runtime. It already defines `scenario_001_raise_the_host`, starting resources, Crypt Core, starter Skeletons/Zombies, Grave Harvester, Bone Pit, first enemy camp, win/loss conditions, radial rings, resource nodes, center totem, and wave lanes.

## Current Interaction Loop

```txt
index.html menu
  -> Start opens game.html
  -> inline module imports Three.js from CDN
  -> create renderer, scene, fog, lights, camera, materials, HUD, and controls
  -> define sequential-ring-v5 constants inline
  -> generate ten no-gap rings
  -> compute part counts by ring circumference
  -> create wedge geometry, seams, stone materials, center disc, totem, and commander visual
  -> animate all pieces by ringIndex * RING_STAGGER + partIndex * PART_STAGGER
  -> inner rings finish before outer rings begin
  -> update progress bar, constructed count, phase, and status
  -> allow camera pan, wheel zoom, Space skip, and R restart
  -> expose construct-only GameHost state
  -> finish at command platform online
```

## Intended First Playable Loop

```txt
menu
  -> source-authoritative construct intro matching sequential-ring-v5
  -> construct_complete event
  -> GameHost mode becomes scenario_bootstrap
  -> load scenario, map, wave, experience, and unlock config JSON
  -> compose fixed RTS map snapshot
  -> GameHost mode becomes scenario_active
  -> select starter undead units
  -> move / attack / build / produce commands mutate state
  -> build Grave Harvester
  -> build Bone Pit
  -> tick grave/bone/soul income
  -> spawn first pressure lane
  -> clear outer_militia_camp_01
  -> complete first objective chain or lose Crypt Core
```

## Recommended Source-Authority Service Loop

```txt
thin game.html
  -> src/main.js runtime boot
  -> load construct profile config
  -> generate ring descriptors from source service
  -> create live Three.js meshes from descriptors
  -> run construct timeline from source-authoritative schedule
  -> publish ConstructSnapshot every frame
  -> GameHost exposes mode, construct, diagnostics, and command journal placeholders
  -> construct_complete switches to scenario_bootstrap
  -> scenario bootstrap composes config-backed ScenarioSnapshot without full RTS UI yet
  -> parity smoke validates live construct constants, no gaps, ordering, skip/restart, and snapshot fields
```

## Domains Identified

```txt
static-app-shell
main-menu-routing
vite-static-build
github-pages-deploy
three-render-host
runtime-boot-sequence
inline-construct-runtime
source-construct-profile
construct-profile-config
sequential-ring-layout
ring-descriptor-generation
ritual-wedge-geometry
stone-wedge-material-detail
construct-animation-timeline
construct-snapshot-contract
construct-source-kit-parity
grim-reaper-totem-visual-object
phantom-commander-visual-object
camera-navigation
keyboard-input
wheel-zoom-input
hud-diagnostics
gamehost-authority
mode-state-machine
construct-smoke-testing
scenario-config-loading
scenario-state-composition
scenario-snapshot-contract
radial-map-generation
center-pressure-ring-model
player-start-placement
resource-node-placement
grave-field-economy
bone-yard-economy
soul-well-economy
enemy-camp-placement
wave-lane-placement
pve-wave-scheduling
undead-unit-state
enemy-unit-state
necropolis-building-state
building-construction
building-production
rts-selection
rts-command-validation
rts-movement-requests
rts-attack-requests
world-economy-ledger
combat-resolution
objective-tracking
experience-progression
unlock-registry
idempotency-ledgers
command-journal-replay
behavior-smoke-testing
```

## Current Explicit Kits

```txt
construct-spiral-intro-kit
construct-spiral-intro-kit-smoke
```

## Runtime Extraction Kits

```txt
phantom-command-static-app-shell-kit
phantom-command-menu-route-kit
phantom-command-main-runtime-kit
phantom-command-construct-scene-kit
phantom-command-three-render-kit
phantom-command-source-construct-profile-kit
phantom-command-sequential-ring-layout-kit
phantom-command-ring-descriptor-kit
phantom-command-ritual-ring-geometry-kit
phantom-command-wedge-detail-kit
phantom-command-construct-animation-timeline-kit
phantom-command-construct-snapshot-contract-kit
phantom-command-live-construct-parity-smoke-kit
phantom-command-totem-visual-kit
phantom-command-phantom-commander-visual-kit
phantom-command-camera-navigation-kit
phantom-command-hud-diagnostics-kit
phantom-command-gamehost-authority-kit
phantom-command-mode-state-kit
```

## Gameplay / Domain Kits

```txt
phantom-scenario-config-kit
phantom-scenario-snapshot-contract-kit
phantom-map-generation-domain-kit
radial-center-pressure-map-kit
world-economy-domain-kit
soul-economy-domain-kit
experience-progression-domain-kit
unlock-registry-domain-kit
undead-unit-domain-kit
enemy-unit-domain-kit
necropolis-building-domain-kit
building-production-queue-kit
upgrade-research-domain-kit
pve-director-domain-kit
wave-lane-spawner-kit
rts-command-domain-kit
rts-combat-resolution-domain-kit
rts-movement-system-kit
rts-render-descriptor-kit
scenario-objective-kit
scenario-authority-smoke-kit
```

## Object / Subdomain Kits

```txt
crypt-core-domain-kit
grave-harvester-domain-kit
bone-pit-domain-kit
black-chapel-domain-kit
skeleton-unit-kit
zombie-unit-kit
ghoul-unit-kit
wight-unit-kit
militia-enemy-kit
hunter-enemy-kit
cleric-enemy-kit
knight-enemy-kit
pyre-engine-enemy-kit
grim-reaper-totem-objective-kit
outer-militia-camp-objective-kit
```

## Services Identified

```txt
appShell.routeToGame
mainRuntime.boot
mainRuntime.bindDom
mainRuntime.bindErrorPanel
threeRender.createRenderer
threeRender.createScene
threeRender.createLighting
threeRender.createFog
threeRender.resize
sourceConstructProfile.loadProfile
sourceConstructProfile.assertBuildId
sequentialRing.computeRingWidths
sequentialRing.computeNoGapRadii
sequentialRing.computeRingPartCounts
ringDescriptor.emitRingDescriptors
ringDescriptor.emitPieceDescriptors
constructSchedule.computePieceDelay
constructSchedule.computeTotalBuildTime
constructTimeline.computePieceProgress
constructTimeline.computeRadialProgress
constructTimeline.computeDropProgress
constructTimeline.skip
constructTimeline.restart
wedgeGeometry.createWedgeGeometry
wedgeDetail.addSeams
wedgeDetail.assignStoneMaterial
totemVisual.createCenterDisc
totemVisual.createTotemBase
totemVisual.tickIdle
phantomCommanderVisual.createCommander
phantomCommanderVisual.tickHover
cameraNavigation.panFromKeys
cameraNavigation.zoomFromWheel
cameraNavigation.applyPose
hudDiagnostics.setProgress
hudDiagnostics.setConstructedCount
hudDiagnostics.setPhase
hudDiagnostics.setStatus
hudDiagnostics.setBuildId
constructSnapshot.getState
constructSnapshot.getDiagnostics
gameHost.getState
gameHost.getDiagnostics
gameHost.dispatch
gameHost.subscribe
gameHost.getConstructState
gameHost.getScenarioState
gameHost.getCommandJournal
modeState.transition
scenarioConfig.loadConfig
scenarioConfig.validateReferences
scenarioState.composeInitialState
scenarioSnapshot.serialize
mapGeneration.generateRadialRings
mapGeneration.placePlayerStart
mapGeneration.placeResourceNodes
mapGeneration.placeEnemyCamps
mapGeneration.placeWaveLanes
economy.getBalance
economy.canAfford
economy.pay
economy.grant
economy.tickResourceNodes
building.canPlace
building.startConstruction
building.tickConstruction
unit.spawnBatch
unit.setCommandState
command.dispatchCommand
command.selectUnits
command.requestMove
command.requestAttack
command.requestBuild
command.requestProduce
command.appendJournal
combat.validateTarget
combat.resolveAttack
objective.evaluate
objective.markComplete
objective.evaluateWinCondition
objective.evaluateLoseCondition
wave.scheduleFromConfig
xp.grant
unlock.evaluateRequirements
smoke.runConstructProfileParity
smoke.runLiveConstructParity
smoke.runScenarioBootstrap
smoke.replayCommandJournal
```

## Key Findings

- The current visual proof is clear and should be preserved. The risk is not visual quality; the risk is leaving the proof inline and disconnected from source services.
- `game.html` is the highest-priority extraction point because it owns constants, layout, geometry, animation, input, HUD, camera, and `GameHost`.
- The source construct kit is useful but not yet authoritative for the live behavior. It needs either a `sequential-ring-v5` profile adapter or a focused source profile kit before wiring it into the page.
- Scenario config is ready enough for a deterministic bootstrap snapshot before full RTS interaction exists.
- The correct next step is smaller than full RTS: source-authoritative construct profile + stable GameHost snapshot first, then scenario command reducer.

## Recommended Next Work

**Build target:** `PhantomCommand Construct Profile Source Cutover + GameHost Snapshot Contract`

```txt
keep index.html as menu shell
  -> split game.html into thin markup plus src/main.js
  -> create phantom-command-source-construct-profile-kit
  -> encode sequential-ring-v5 constants in one profile object
  -> create phantom-command-ring-descriptor-kit
  -> make descriptors reproduce ten rings, zero gaps, live ring widths, live part counts, and inner-before-outer scheduling
  -> adapt or extend construct-spiral-intro-kit so source scheduling can match the live profile
  -> create construct snapshot contract with buildId, phase, progress, pieces, rings, ringParts, ringGaps, animation, complete, and mode
  -> promote inline GameHost into phantom-command-gamehost-authority-kit
  -> add mode state: construct_intro, scenario_bootstrap, scenario_active, scenario_complete, scenario_failed
  -> add getState, getDiagnostics, getConstructState, getScenarioState, getCommandJournal, dispatch, and subscribe placeholders
  -> add scenario bootstrap that loads config JSON and emits a deterministic ScenarioSnapshot after construct completion
  -> add parity smoke for source profile constants, no gaps, ring ordering, skip, restart, GameHost snapshot, and scenario bootstrap
  -> only then add SELECT_UNITS / REQUEST_MOVE / REQUEST_BUILD / REQUEST_PRODUCE / REQUEST_ATTACK
```

## Minimum Acceptance Checklist

- [ ] `game.html` becomes thin markup plus a module import.
- [ ] `sequential-ring-v5` constants exist in one source-owned profile object.
- [ ] Source descriptors reproduce ten rings and zero physical ring gaps.
- [ ] Source schedule guarantees each inner ring settles before the next outer ring starts.
- [ ] `window.GameHost.getState()` exposes construct mode and construct snapshot fields.
- [ ] `window.GameHost.getDiagnostics()` exists.
- [ ] `window.GameHost.getConstructState()` exists.
- [ ] `window.GameHost.getScenarioState()` returns a deterministic bootstrap snapshot or `null` before bootstrap.
- [ ] `window.GameHost.getCommandJournal()` exists, even if initially empty.
- [ ] Scenario config loads after construct completion without requiring full RTS commands.
- [ ] Smoke coverage validates source/live construct parity.
- [ ] Smoke coverage validates scenario bootstrap snapshot shape.

## Validation Notes

This run updated documentation only. No runtime code, build, or smoke command was executed in this pass.
