# PhantomCommand Project Breakdown

**Run timestamp:** `2026-07-07T11:18:32-04:00`

**Repo:** `LuminaryLabs-Publish/PhantomCommand`

**Branch:** `main`

**Selected after:** `LuminaryLabs-Publish/TheOpenAbove`

**Excluded:** `LuminaryLabs-Publish/TheCavalryOfRome`

## Summary

`PhantomCommand` remains a static Vite / Three.js undead RTS publish repo with one live proof: `sequential-ring-v5`, a no-gap concentric construct that assembles around the Grim Reaper Totem.

This run narrows the next useful build from the broader sequential adapter / scenario bootstrap plan into the smallest source-authority step: **Source Construct Profile + Ring Descriptor Parity Fixture**. The immediate blocker is that `game.html` still owns the live constants, ring math, piece counts, and `GameHost` snapshot shape inline, while `construct-spiral-intro-kit` is reusable but still uses a spiral/window scheduling model.

## Plan Ledger

**Goal:** Document the current interaction loop, domains, services, and kits for `PhantomCommand`, then define the next narrow build slice that extracts live construct constants and no-gap ring descriptor math before changing runtime behavior.

**Checklist**

- [x] Verified the central Publish rotation before selecting this repo.
- [x] Kept work scoped to `LuminaryLabs-Publish/PhantomCommand`.
- [x] Kept `LuminaryLabs-Publish/TheCavalryOfRome` excluded.
- [x] Read the current `.agent` README and kit registry.
- [x] Read `package.json`.
- [x] Read `README.md`.
- [x] Read `game.html`.
- [x] Read `src/kits/construct-spiral-intro-kit/index.js`.
- [x] Read `tests/construct-spiral-intro-kit-smoke.mjs`.
- [x] Read `config/scenario-001.config.json`.
- [x] Read `config/map-generation.config.json`.
- [x] Identified current interaction loop.
- [x] Identified target product loop.
- [x] Identified recommended service loop.
- [x] Identified domains in use.
- [x] Identified kit services.
- [x] Identified current, extraction, gameplay, object, and smoke kits.
- [x] Wrote this timestamped tracker entry.
- [x] Updated `.agent/kit-registry.json`.
- [x] Updated `.agent/README.md`.
- [x] Mirrored findings into `LuminaryLabs-Dev/LuminaryLabs`.
- [x] Added a central internal change-log entry.

## Source Read

```txt
package.json
  -> private ESM app
  -> Vite dev / preview scripts
  -> npm run build calls node scripts/build-static.mjs

README.md
  -> describes Phantom Command as a single-player PvE RTS prototype
  -> documents index.html as menu and game.html as opening construct scene

game.html
  -> live runtime is still inline
  -> imports Three.js from unpkg
  -> owns renderer / scene / fog / lighting / camera / HUD / inputs
  -> owns BUILD_ID sequential-ring-v5
  -> owns RING_COUNT, widths, gaps, timing, prewarm, start radius, start height
  -> computes ten no-gap rings
  -> computes part counts with ringParts(inner, outer)
  -> creates wedge meshes, seam boxes, center disc, tower, and commander
  -> animates each piece by ringIndex * RING_STAGGER + partIndex * PART_STAGGER
  -> exposes window.GameHost.skipConstruct / restartConstruct / getState

src/kits/construct-spiral-intro-kit/index.js
  -> reusable construct intro domain kit
  -> provides schedule / install / reset / update / snapshot
  -> tracks pending / active / settled / newly active / newly settled pieces
  -> default schedule uses spiralStepSeconds, ringStartStepSeconds, active cap, and active ring window
  -> not yet source-parity compatible with sequential-ring-v5 by default

tests/construct-spiral-intro-kit-smoke.mjs
  -> validates generic kit identity, schedule sort order, active cap, active ring window, and completion
  -> does not validate live build id, ten rings, no gaps, ring widths, live part counts, or inline GameHost shape

config/scenario-001.config.json
  -> scenario_001_raise_the_host
  -> starting resources: souls, bone, command
  -> Crypt Core building
  -> starter Skeletons and Zombies
  -> Grave Harvester / Bone Pit / first camp objectives
  -> win/loss conditions

config/map-generation.config.json
  -> seed reaper-valley-001
  -> radial_center_pressure map
  -> Grim Reaper Totem center objective
  -> resource nodes, enemy camps, and wave lanes
```

## Current Interaction Loop

```txt
load index.html
  -> player clicks Start or Open Scene
  -> load game.html
  -> import Three.js from CDN
  -> initialize renderer, scene, fog, lights, camera, HUD, materials, and input state
  -> define sequential-ring-v5 constants inline
  -> compute ring widths from FIRST_RING_WIDTH, RING_WIDTH_GROWTH, and MAX_RING_WIDTH
  -> compute ring radii using zero gap policy
  -> compute ring part counts from circumference
  -> create wedge geometry, seams, center disc, Grim Reaper Totem, and Phantom Commander
  -> prewarm construct animation
  -> each frame computes piece delay from ring and part indices
  -> each piece lerps from high/outward start pose into final ring pose
  -> HUD updates progress, count, phase, status, and build id
  -> WASD/arrows pan camera
  -> wheel zooms camera
  -> Space / Skip forces completion
  -> R / Restart resets construct
  -> GameHost exposes construct-only snapshot
  -> all pieces settle
  -> phase becomes command online
```

## Target Product Loop

```txt
menu
  -> source-owned sequential-ring-v5 profile loads
  -> source ring descriptors reproduce live ten-ring no-gap layout
  -> source piece descriptors reproduce live part count and ids
  -> construct intro consumes descriptors
  -> construct_complete event fires
  -> GameHost mode transitions to scenario_bootstrap
  -> scenario/map/wave/experience/unlock configs load
  -> deterministic ScenarioSnapshot is composed
  -> GameHost mode transitions to scenario_active
  -> player selects starter undead
  -> player builds Grave Harvester and Bone Pit
  -> grave / bone / soul economy ticks
  -> waves pressure the Crypt Core
  -> player clears outer_militia_camp_01
  -> objectives, XP, unlocks, win/loss, and command journal are evaluated
```

## Recommended Service Loop

```txt
source profile service
  -> exports sequential-ring-v5 constants
  -> validates build id, ring count, width policy, gap policy, and timing values
  -> ring descriptor service computes inner/outer/gap/width/ringParts
  -> piece descriptor service emits stable piece ids and part indices
  -> parity fixture compares source descriptors to live game.html math
  -> sequential profile adapter consumes descriptors after parity is proven
  -> construct snapshot contract serializes runtime progress
  -> GameHost authority exposes construct and scenario surfaces
  -> scenario bootstrap fixture composes config-backed ScenarioSnapshot
  -> smoke fixtures validate source parity before full RTS commands
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
sequential-ring-v5-profile
sequential-ring-layout
ring-width-policy
no-gap-radius-policy
ring-part-count-policy
ring-descriptor-generation
piece-descriptor-generation
construct-profile-parity-fixture
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

## Immediate Next-Cut Kits

```txt
phantom-command-source-construct-profile-kit
phantom-command-ring-descriptor-kit
phantom-command-piece-descriptor-kit
phantom-command-construct-profile-parity-fixture-kit
phantom-command-live-ring-descriptor-smoke-kit
```

## Runtime Extraction Kits

```txt
phantom-command-static-app-shell-kit
phantom-command-menu-route-kit
phantom-command-main-runtime-kit
phantom-command-construct-scene-kit
phantom-command-three-render-kit
phantom-command-sequential-profile-adapter-kit
phantom-command-sequential-ring-layout-kit
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
sourceConstructProfile.validateRingCount
sourceConstructProfile.validateWidthPolicy
sourceConstructProfile.validateNoGapProfile
sourceConstructProfile.validateTimingProfile
sourceConstructProfile.validateInnerFirstSchedulingInputs
sequentialRing.computeRingWidths
sequentialRing.computeNoGapRadii
sequentialRing.computeRingPartCounts
ringDescriptor.emitRingDescriptors
ringDescriptor.assertTenRings
ringDescriptor.assertZeroGaps
ringDescriptor.assertWidthGrowth
ringDescriptor.assertPartCountParity
pieceDescriptor.emitPieceDescriptors
pieceDescriptor.emitPieceIds
pieceDescriptor.emitPieceAngles
pieceDescriptor.emitPieceSeeds
profileParityFixture.loadSourceProfile
profileParityFixture.computeExpectedLiveRings
profileParityFixture.assertBuildId
profileParityFixture.assertRingDescriptorParity
profileParityFixture.assertPieceDescriptorParity
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
smoke.runLiveRingDescriptorParity
smoke.runLiveConstructParity
smoke.runSequentialProfileAdapter
smoke.runScenarioBootstrap
smoke.replayCommandJournal
```

## Key Findings

1. `game.html` is still the single source of truth for the live construct constants and descriptor math.
2. The live `sequential-ring-v5` profile has a very specific static contract: ten rings, zero gaps, width growth, capped width, circumference-based piece counts, and deterministic timing constants.
3. `construct-spiral-intro-kit` should not be changed blindly because its current default spiral/window schedule is a reusable behavior with its own smoke coverage.
4. The immediate safest extraction is a source profile plus ring/piece descriptor parity fixture, not a full runtime split.
5. Scenario and map configs are ready for bootstrap fixtures, but scenario work should wait until source descriptor parity is proven.
6. `window.GameHost.getState()` already provides a useful shape for the first construct snapshot contract, but it should remain a compatibility surface while source modules are introduced.

## Recommended Next Work

**Build target:** `PhantomCommand Source Construct Profile + Ring Descriptor Parity Fixture Cutover`

```txt
preserve current game.html behavior
  -> create phantom-command-source-construct-profile-kit
  -> move BUILD_ID, RING_COUNT, FIRST_INNER_RADIUS, FIRST_RING_WIDTH, RING_WIDTH_GROWTH, MAX_RING_WIDTH, RING_GAP_BASE, RING_GAP_GROWTH, MOVE_SECONDS, DROP_START_SECONDS, RING_STAGGER, PART_STAGGER, PREWARM_SECONDS, START_RADIUS_MULTIPLIER, and START_HEIGHT_BASE into one source profile
  -> create phantom-command-ring-descriptor-kit
  -> reproduce the live width growth and zero-gap radius sequence exactly
  -> reproduce ringParts(inner, outer) exactly
  -> create phantom-command-piece-descriptor-kit
  -> emit stable piece ids, ring index, part index, partsPerRing, angle/span data, and seed values
  -> create phantom-command-construct-profile-parity-fixture-kit
  -> add live ring descriptor smoke for build id, ring count, widths, gaps, part counts, and total pieces
  -> keep construct-spiral-intro-kit default behavior unchanged
  -> only then add sequential profile adapter / timeline mode
  -> defer scenario bootstrap and RTS commands until descriptor parity passes
```

## Acceptance Targets

```txt
npm run build still succeeds
source profile reports buildId sequential-ring-v5
source profile contains every live construct constant now duplicated in game.html
ring descriptor emits exactly ten rings
all ring gaps are zero
ring widths match FIRST_RING_WIDTH * RING_WIDTH_GROWTH capped by MAX_RING_WIDTH
inner/outer radii are contiguous with zero physical gap
ring part counts match the live ringParts(inner, outer) formula
piece descriptor total count equals sum of ring part counts
piece ids are stable and deterministic
new parity fixture runs without DOM or Three.js renderer
existing construct-spiral-intro-kit smoke still passes
game.html behavior remains unchanged during this parity-only slice
scenario bootstrap remains deferred until source descriptor parity passes
```

## Validation Performed

```txt
read LuminaryLabs-Dev/LuminaryLabs latest TheOpenAbove ledger
read LuminaryLabs-Publish/PhantomCommand .agent README
read LuminaryLabs-Publish/PhantomCommand .agent kit registry
read package.json
read README.md
read game.html
read src/kits/construct-spiral-intro-kit/index.js
read tests/construct-spiral-intro-kit-smoke.mjs
read config/scenario-001.config.json
read config/map-generation.config.json
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
LuminaryLabs-Publish/PhantomCommand:.agent/trackers/2026-07-07T11-18-32-04-00/project-breakdown.md
LuminaryLabs-Publish/PhantomCommand:.agent/kit-registry.json
LuminaryLabs-Publish/PhantomCommand:.agent/README.md
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/PhantomCommand.md
LuminaryLabs-Dev/LuminaryLabs:internal-change-log/2026-07-07T11-18-32-04-00-phantom-command-source-profile-ring-descriptor-parity-breakdown.md
```

## Next Implementation Prompt

```txt
Implement PhantomCommand Source Construct Profile + Ring Descriptor Parity Fixture Cutover.

Preserve the current game.html behavior.
Add src/kits/phantom-command-source-construct-profile-kit/index.js with the live sequential-ring-v5 constants.
Add src/kits/phantom-command-ring-descriptor-kit/index.js that reproduces the live ten-ring width, radius, gap, and ringParts math exactly.
Add src/kits/phantom-command-piece-descriptor-kit/index.js that emits deterministic piece ids and descriptor metadata.
Add a DOM-free smoke fixture that validates build id, ring count, zero gaps, widths, inner/outer radius continuity, part counts, and total piece count.
Do not change construct-spiral-intro-kit defaults yet.
Do not add scenario bootstrap, unit commands, building commands, economy, combat, or wave behavior until descriptor parity passes.
```
