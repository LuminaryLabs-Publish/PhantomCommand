# PhantomCommand Project Breakdown

**Run timestamp:** `2026-07-07T10:08:37-04:00`

**Repo:** `LuminaryLabs-Publish/PhantomCommand`

**Branch:** `main`

**Selected after:** `LuminaryLabs-Publish/TheOpenAbove`

**Excluded:** `LuminaryLabs-Publish/TheCavalryOfRome`

## Summary

`PhantomCommand` is still a static Vite / Three.js undead RTS publish repo with a strong construct-intro visual proof and a design/config layer that is ahead of runtime. This run narrows the next useful build from broad GameHost extraction into a smaller source-authority slice: `Sequential Profile Adapter + Scenario Bootstrap Fixture`.

The key finding is that `game.html` owns the exact live `sequential-ring-v5` constants, while `construct-spiral-intro-kit` owns a reusable scheduling service whose default spiral/window schedule does not match the live no-gap inner-first construct. The safest next slice is to create a source-owned profile, emit deterministic ring and piece descriptors, adapt the schedule layer for the exact sequential profile, and add a DOM-free scenario bootstrap fixture before expanding RTS commands.

## Plan Ledger

**Goal:** Document the current loop, domains, services, and kits for `PhantomCommand`, then define the smallest next cutover that makes the live construct source-authoritative and prepares deterministic scenario bootstrap.

**Checklist**

- [x] Verified the central rotation source before selecting this repo.
- [x] Kept work scoped to `LuminaryLabs-Publish/PhantomCommand`.
- [x] Kept `LuminaryLabs-Publish/TheCavalryOfRome` excluded.
- [x] Read the repo package and static entry points.
- [x] Read the live inline construct runtime in `game.html`.
- [x] Read the current `construct-spiral-intro-kit` source.
- [x] Read the current construct smoke fixture.
- [x] Read scenario and map config surfaces.
- [x] Identified current interaction loop.
- [x] Identified target product loop.
- [x] Identified recommended service loop.
- [x] Identified domains in use.
- [x] Identified kit services.
- [x] Identified current, extraction, gameplay, and object kits.
- [x] Wrote this timestamped tracker entry.
- [x] Updated `.agent/kit-registry.json`.
- [x] Updated `.agent/README.md`.
- [x] Mirrored findings into `LuminaryLabs-Dev/LuminaryLabs`.
- [x] Added a central internal change-log entry.

## Source Read

```txt
package.json
  -> Vite static app
  -> npm run build calls scripts/build-static.mjs
  -> deploy-compatible static output

index.html
  -> menu shell
  -> Start button routes to game.html
  -> Open Scene link routes directly to game.html

game.html
  -> inline Three.js import from CDN
  -> inline renderer, scene, fog, lighting, camera, HUD, input, and GameHost
  -> inline sequential-ring-v5 profile constants
  -> ring descriptors and wedge meshes generated inline
  -> no physical ring gaps
  -> Space skips, R restarts, wheel zooms, WASD/arrows pan
  -> window.GameHost exposes skipConstruct, restartConstruct, getState

src/kits/construct-spiral-intro-kit/index.js
  -> reusable construct intro kit
  -> schedule, update, snapshot, piece status, active, settled, pending
  -> current default profile is spiral/window based
  -> not yet sequential-ring-v5 compatible by default

tests/construct-spiral-intro-kit-smoke.mjs
  -> validates generic kit id, domain path, schedule ordering, active cap, active ring window, and completion
  -> does not validate live build id, ten rings, zero gaps, ring widths, live part counts, skip/restart, or GameHost snapshot

config/scenario-001.config.json
  -> scenario_001_raise_the_host
  -> starting resources, Crypt Core, starter Skeletons/Zombies, first objectives, win/loss conditions

config/map-generation.config.json
  -> seed reaper-valley-001
  -> radial center pressure map
  -> center Grim Reaper Totem
  -> resource nodes, enemy camps, wave lanes
```

## Current Interaction Loop

```txt
load index.html
  -> player clicks Start or Open Scene
  -> load game.html
  -> import Three.js from CDN
  -> create renderer, scene, fog, lights, camera, HUD, materials, input state
  -> define sequential-ring-v5 constants inline
  -> compute ten ring widths and no-gap radii
  -> compute ring part counts from circumference
  -> create wedge meshes, seams, center disc, Grim Reaper Totem, and Phantom Commander
  -> start construct animation at prewarmed time
  -> each frame computes piece progress from ringIndex * RING_STAGGER + partIndex * PART_STAGGER
  -> pieces move from raised outward positions into final no-gap ring positions
  -> HUD updates constructed count, phase, progress bar, status, and build id
  -> keyboard and buttons allow skip/restart
  -> camera pans, zooms, and slowly orbits
  -> GameHost publishes construct-only state
  -> all pieces settle
  -> phase becomes command online
```

## Target Product Loop

```txt
menu
  -> source-owned construct intro runs exact sequential-ring-v5 profile
  -> construct_complete event fires
  -> GameHost mode changes from construct_intro to scenario_bootstrap
  -> scenario/map/wave/experience/unlock config loads
  -> deterministic ScenarioSnapshot is composed
  -> GameHost mode changes to scenario_active
  -> player selects starter Skeletons and Zombies
  -> player builds Grave Harvester and Bone Pit
  -> economy ticks souls, bone, and command capacity
  -> wave lanes pressure the Crypt Core
  -> player clears outer_militia_camp_01
  -> objectives, XP, unlocks, win/loss, and journal are evaluated
```

## Recommended Service Loop

```txt
thin game.html shell
  -> src/main.js boot
  -> source construct profile service returns sequential-ring-v5 constants
  -> ring descriptor service emits no-gap rings and piece descriptors
  -> sequential profile adapter feeds construct-spiral-intro-kit or a parallel timeline service
  -> construct timeline service computes radial/drop progress
  -> construct snapshot contract serializes construct state
  -> GameHost service publishes construct snapshot, diagnostics, mode, and subscriptions
  -> scenario bootstrap fixture loads config JSON
  -> scenario snapshot contract serializes deterministic starting world
  -> smoke validates profile constants, no-gap rings, ring ordering, GameHost shape, and scenario bootstrap shape
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
ring-width-policy
no-gap-radius-policy
ring-part-count-policy
ring-descriptor-generation
piece-descriptor-generation
ritual-wedge-geometry
stone-wedge-material-detail
construct-animation-timeline
construct-sequential-profile-adapter
construct-snapshot-contract
construct-source-kit-parity
construct-completion-event
grim-reaper-totem-visual-object
phantom-commander-visual-object
camera-navigation
keyboard-input
button-input
wheel-zoom-input
hud-diagnostics
gamehost-authority
mode-state-machine
construct-smoke-testing
scenario-config-loading
scenario-state-composition
scenario-snapshot-contract
scenario-bootstrap-fixture
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
phantom-command-sequential-profile-adapter-kit
phantom-command-sequential-ring-layout-kit
phantom-command-ring-descriptor-kit
phantom-command-piece-descriptor-kit
phantom-command-ritual-ring-geometry-kit
phantom-command-wedge-detail-kit
phantom-command-construct-animation-timeline-kit
phantom-command-construct-snapshot-contract-kit
phantom-command-live-construct-parity-smoke-kit
phantom-command-scenario-bootstrap-fixture-kit
phantom-command-scenario-snapshot-smoke-kit
phantom-command-totem-visual-kit
phantom-command-phantom-commander-visual-kit
phantom-command-camera-navigation-kit
phantom-command-hud-diagnostics-kit
phantom-command-gamehost-authority-kit
phantom-command-mode-state-kit
```

## Gameplay / Domain Kit Candidates

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
command-journal-replay-kit
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

## Kit Services Identified

```txt
appShell.routeToGame
appShell.openSceneDirectly
mainRuntime.boot
mainRuntime.bindDom
mainRuntime.bindInputs
mainRuntime.startFrameLoop
mainRuntime.publishSnapshots
threeRender.createRenderer
threeRender.createScene
threeRender.createLighting
threeRender.createFog
sourceConstructProfile.getSequentialRingV5Profile
sourceConstructProfile.assertProfileBuildId
sourceConstructProfile.exportConstructConstants
sourceConstructProfile.validateNoGapProfile
sourceConstructProfile.validateInnerFirstScheduling
sequentialRing.computeRingWidths
sequentialRing.computeNoGapRadii
sequentialRing.computeRingPartCounts
ringDescriptor.emitRingDescriptors
pieceDescriptor.emitPieceDescriptors
profileAdapter.toConstructIntroPieces
profileAdapter.toSequentialScheduleConfig
profileAdapter.assertNoOuterRingStartsBeforeInnerRingSettles
constructSchedule.createConstructSpiralIntroSchedule
constructSchedule.installPieces
constructSchedule.update
constructSchedule.snapshot
constructTimeline.computePieceDelay
constructTimeline.computeTotalBuildTime
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
constructSnapshot.serialize
constructSnapshot.getDiagnostics
constructSnapshot.assertShape
gameHost.getState
gameHost.getDiagnostics
gameHost.dispatch
gameHost.subscribe
gameHost.getConstructState
gameHost.getScenarioState
gameHost.getCommandJournal
modeState.transition
modeState.getHistory
scenarioConfig.loadConfig
scenarioConfig.validateReferences
scenarioBootstrap.composeInitialScenarioSnapshot
scenarioSnapshot.serialize
scenarioSnapshot.assertShape
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
smoke.runSequentialProfileAdapter
smoke.runScenarioBootstrap
smoke.replayCommandJournal
```

## Key Findings

1. `game.html` is currently the runtime authority for construct constants and GameHost state.
2. `sequential-ring-v5` is stricter than the reusable kit default because the live sequence requires no physical gaps and no outer ring starting before the prior inner ring has settled.
3. `construct-spiral-intro-kit` already provides useful schedule/update/snapshot surfaces, but it needs either a sequential profile adapter or a dedicated timeline mode.
4. The current smoke fixture validates generic construct-kit behavior, not live profile parity.
5. Scenario and map configs are detailed enough to create a deterministic bootstrap snapshot without implementing full RTS commands.
6. The next runtime work should expose construct and scenario snapshots through GameHost before unit/build/combat systems expand.

## Recommended Next Work

**Build target:** `PhantomCommand Sequential Profile Adapter + Scenario Bootstrap Fixture Cutover`

```txt
keep index.html as menu shell
  -> split game.html into thin markup plus src/main.js
  -> create phantom-command-source-construct-profile-kit
  -> move BUILD_ID, RING_COUNT, widths, gap policy, timing, prewarm, start radius, and start height into one profile object
  -> create phantom-command-ring-descriptor-kit
  -> create phantom-command-piece-descriptor-kit
  -> reproduce the live ringParts formula and no-gap radii exactly
  -> create phantom-command-sequential-profile-adapter-kit
  -> adapt descriptors into construct-spiral-intro-kit pieces or add a sequential schedule mode
  -> assert no outer ring starts before the previous inner ring settles
  -> create construct snapshot contract with buildId, phase, progress, pieces, rings, ringParts, ringGaps, animation, complete, and mode
  -> promote inline GameHost into phantom-command-gamehost-authority-kit
  -> add GameHost surfaces for diagnostics, construct state, scenario state, command journal, dispatch, and subscribe
  -> add scenario bootstrap fixture that loads scenario/map configs and returns deterministic starting resources, units, buildings, objectives, map seed, rings, nodes, camps, and lanes
  -> add smoke fixtures for profile constants, no-gap descriptors, inner-first scheduling, snapshot shape, and scenario bootstrap shape
  -> defer SELECT_UNITS, REQUEST_MOVE, REQUEST_BUILD, REQUEST_PRODUCE, REQUEST_ATTACK until snapshot contracts are stable
```

## Acceptance Targets

```txt
npm run build still succeeds
construct profile source reports buildId sequential-ring-v5
ring descriptor emits exactly ten rings
all ring gaps are zero
ring part counts match live game.html formula
inner ring settle time is earlier than next outer ring start time for every adjacent pair
construct snapshot includes buildId, phase, progress, pieces, rings, ringParts, ringGaps, animation, complete, and mode
GameHost exposes getState, getDiagnostics, getConstructState, getScenarioState, getCommandJournal, dispatch, and subscribe
scenario bootstrap snapshot can be created without renderer or DOM
scenario bootstrap snapshot includes scenario_001_raise_the_host, starting resources, Crypt Core, starter Skeletons/Zombies, objectives, map seed, radial rings, resource nodes, enemy camps, and wave lanes
smoke fixtures validate construct profile parity and scenario bootstrap shape
```

## Validation Performed

```txt
read LuminaryLabs-Dev/LuminaryLabs latest Publish ledger and recent commits
read LuminaryLabs-Publish/PhantomCommand repo metadata
read package.json
read README.md
read index.html
read game.html
read src/kits/construct-spiral-intro-kit/index.js
read tests/construct-spiral-intro-kit-smoke.mjs
read config/scenario-001.config.json
read config/map-generation.config.json
read .agent/README.md
read .agent/kit-registry.json header
```

## Validation Not Performed

```txt
local checkout
npm install
npm run build
browser smoke
live Pages check
GitHub Actions rerun
runtime source code edit
runtime smoke fixture execution
```

## Files Updated This Run

```txt
LuminaryLabs-Publish/PhantomCommand:.agent/trackers/2026-07-07T10-08-37-04-00/project-breakdown.md
LuminaryLabs-Publish/PhantomCommand:.agent/kit-registry.json
LuminaryLabs-Publish/PhantomCommand:.agent/README.md
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/PhantomCommand.md
LuminaryLabs-Dev/LuminaryLabs:internal-change-log/2026-07-07T10-08-37-04-00-phantom-command-sequential-profile-adapter-breakdown.md
```

## Next Implementation Prompt

```txt
Implement PhantomCommand Sequential Profile Adapter + Scenario Bootstrap Fixture Cutover.

Keep index.html as the menu shell.
Turn game.html into thin markup plus a module import.
Move the live sequential-ring-v5 constants into a source-owned construct profile kit.
Create ring and piece descriptor kits that reproduce the live no-gap rings and ringParts formula exactly.
Adapt construct-spiral-intro-kit to accept the sequential profile, or add a separate sequential schedule mode if that is cleaner.
Add strict smoke that proves each inner ring settles before the next outer ring starts.
Promote GameHost into a source module with construct snapshot, diagnostics, scenario snapshot, command journal, dispatch, and subscribe surfaces.
Load scenario and map configs into a deterministic bootstrap snapshot after construct completion.
Do not add full RTS unit/build/combat commands until profile parity and snapshot contracts pass smoke.
```
