# PhantomCommand Breakdown — 2026-07-07T12-50-04-04-00

## Run Summary

Selected repo: `LuminaryLabs-Publish/PhantomCommand`.

Excluded repo: `LuminaryLabs-Publish/TheCavalryOfRome`.

Reason for selection: the central ledger most recently documented `LuminaryLabs-Publish/TheOpenAbove`, so the next eligible repo in the tracked Publish rotation is `LuminaryLabs-Publish/PhantomCommand`.

This run did not change runtime source. It updates the internal repo docs and narrows the next implementation slice.

## Source Review

Reviewed files:

```txt
README.md
package.json
index.html
game.html
src/kits/construct-spiral-intro-kit/index.js
tests/construct-spiral-intro-kit-smoke.mjs
.agent/README.md
.agent/kit-registry.json
```

## Current Interaction Loop

```txt
index.html
  -> static main menu
  -> Start routes to game.html

game.html
  -> imports Three.js from CDN
  -> creates renderer, scene, fog, lighting, camera, HUD, materials, input state inline
  -> defines live sequential-ring-v5 construct constants inline
  -> computes ten contiguous ring descriptors inline
  -> computes ring part counts with ringParts(inner, outer)
  -> creates wedge geometry, seam strips, center disc, totem, and commander mesh inline
  -> animates pieces from start position to final ring position
  -> schedules each piece by ringIndex * RING_STAGGER + partIndex * PART_STAGGER
  -> updates HUD progress, count, phase, and status every frame
  -> pans camera with WASD/arrows
  -> zooms with wheel
  -> Space / Skip jumps construct time forward
  -> R / Restart resets construct timing
  -> window.GameHost exposes skipConstruct, restartConstruct, and getState
```

Current live profile constants are still inside `game.html`:

```txt
BUILD_ID = sequential-ring-v5
RING_COUNT = 10
FIRST_INNER_RADIUS = 10
FIRST_RING_WIDTH = 7
RING_WIDTH_GROWTH = 1.25
MAX_RING_WIDTH = 120
RING_GAP_BASE = 0
RING_GAP_GROWTH = 0
MOVE_SECONDS = 2.0
DROP_START_SECONDS = 0.08
RING_STAGGER = 3.25
PART_STAGGER = 0.035
PREWARM_SECONDS = 0.55
START_RADIUS_MULTIPLIER = 1.45
START_HEIGHT_BASE = 28
```

The live no-gap ring sequence should resolve to:

```txt
ring 0: inner 10.000000, outer 17.000000, gap 0, parts 5
ring 1: inner 17.000000, outer 25.750000, gap 0, parts 5
ring 2: inner 25.750000, outer 36.687500, gap 0, parts 5
ring 3: inner 36.687500, outer 50.359375, gap 0, parts 5
ring 4: inner 50.359375, outer 67.449219, gap 0, parts 6
ring 5: inner 67.449219, outer 88.811523, gap 0, parts 8
ring 6: inner 88.811523, outer 115.514404, gap 0, parts 10
ring 7: inner 115.514404, outer 148.893005, gap 0, parts 12
ring 8: inner 148.893005, outer 190.616257, gap 0, parts 16
ring 9: inner 190.616257, outer 242.770321, gap 0, parts 20
```

Expected total live construct pieces: `92`.

## Target Product Loop

```txt
menu
  -> source-owned sequential-ring-v5 profile loads
  -> ring descriptor service emits contiguous no-gap rings
  -> piece descriptor service emits stable construct pieces
  -> inner-first timeline service schedules ring N only after ring N-1 can fully settle
  -> construct runtime consumes descriptors instead of inline constants
  -> ConstructSnapshot publishes build id, rings, pieces, timing, phase, progress, settled counts, and timeline guard status
  -> construct_complete event transitions GameHost mode to scenario_bootstrap
  -> scenario config loads
  -> deterministic RTS scenario snapshot composes
  -> scenario_active begins
  -> player selects starter undead
  -> player builds economy structures
  -> wave lanes advance
  -> player clears outer_militia_camp_01
  -> objective / XP / unlock / win-loss reducers resolve
```

## Recommended Service Loop

```txt
sourceConstructProfile.loadSequentialRingV5Profile
  -> ringDescriptor.emitNoGapRingDescriptors
  -> pieceDescriptor.emitStablePieceDescriptors
  -> timelineContract.emitInnerFirstTimeline
  -> timelineContract.assertNoOuterRingStartsBeforeInnerRingSettles
  -> parityFixture.assertLiveRingDescriptorParity
  -> parityFixture.assertLivePieceDescriptorParity
  -> constructSnapshot.serialize
  -> gameHost.publishConstructDiagnostics
  -> smoke.runInnerFirstTimelineFixture
  -> smoke.runConstructSnapshotFixture
```

## Domains In Use

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
piece-id-policy
piece-seed-policy
inner-first-timeline-contract
ring-settle-boundary-policy
ring-start-acceptance-policy
construct-profile-parity-fixture
construct-timeline-parity-fixture
construct-snapshot-contract
construct-completion-event
ritual-wedge-geometry
stone-wedge-material-detail
construct-animation-timeline
construct-sequential-profile-adapter
construct-source-kit-parity
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

## All Kits Identified

### Current implemented source kits

```txt
construct-spiral-intro-kit
construct-spiral-intro-kit-smoke
```

### Immediate next-cut kits

```txt
phantom-command-source-construct-profile-kit
phantom-command-ring-descriptor-kit
phantom-command-piece-descriptor-kit
phantom-command-inner-first-timeline-contract-kit
phantom-command-ring-settle-boundary-kit
phantom-command-construct-profile-parity-fixture-kit
phantom-command-live-ring-descriptor-smoke-kit
phantom-command-inner-first-timeline-smoke-kit
phantom-command-construct-snapshot-contract-kit
phantom-command-construct-snapshot-smoke-kit
```

### Runtime extraction kits

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

### Gameplay / domain kit candidates

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

### Object / subdomain kits

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

## Services That Kits Offer

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
sourceConstructProfile.exportConstructConstants
sourceConstructProfile.validateBuildId
sourceConstructProfile.validateRingCount
sourceConstructProfile.validateWidthPolicy
sourceConstructProfile.validateNoGapProfile
sourceConstructProfile.validateTimingProfile
ringDescriptor.computeRingWidths
ringDescriptor.computeNoGapRadii
ringDescriptor.computeRingPartCounts
ringDescriptor.emitRingDescriptors
ringDescriptor.assertTenRings
ringDescriptor.assertZeroGaps
ringDescriptor.assertWidthGrowth
ringDescriptor.assertPartCountParity
pieceDescriptor.emitPieceDescriptors
pieceDescriptor.emitPieceIds
pieceDescriptor.emitPieceAngles
pieceDescriptor.emitPieceSeeds
pieceDescriptor.assertPieceTotal
innerFirstTimeline.computePieceDelay
innerFirstTimeline.computeRingFirstStart
innerFirstTimeline.computeRingLastSettle
innerFirstTimeline.assertRingSettleBeforeOuterStart
innerFirstTimeline.emitTimelineGuards
profileParityFixture.loadSourceProfile
profileParityFixture.computeExpectedLiveRings
profileParityFixture.assertBuildId
profileParityFixture.assertRingDescriptorParity
profileParityFixture.assertPieceDescriptorParity
profileParityFixture.assertTimelineParity
profileAdapter.toConstructIntroPieces
profileAdapter.toSequentialScheduleConfig
profileAdapter.assertNoOuterRingStartsBeforeInnerRingSettles
constructSchedule.createConstructSpiralIntroSchedule
constructSchedule.installPieces
constructSchedule.update
constructSchedule.snapshot
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
smoke.runInnerFirstTimelineParity
smoke.runConstructSnapshotShape
smoke.runSequentialProfileAdapter
smoke.runScenarioBootstrap
smoke.replayCommandJournal
```

## Key Findings

The repo has a strong visual proof and strong design docs, but the live proof still treats `game.html` as the only authority for the actual construct profile.

The highest-risk behavior is not ring radius anymore; the rings already have zero physical gaps. The highest-risk behavior is timeline parity: source modules must prove that each inner ring can settle before the next outer ring is permitted to begin.

The existing `construct-spiral-intro-kit` remains useful as a generic sequencing kit, but it should not be treated as the live sequential-ring-v5 authority until an adapter and timeline fixture prove exact parity.

## Recommended Next Slice

```txt
PhantomCommand Inner-First Timeline Contract + Construct Snapshot Fixture Cutover
```

## Build Order

```txt
preserve current game.html behavior
  -> create phantom-command-source-construct-profile-kit
  -> move live sequential-ring-v5 constants into one source profile
  -> create phantom-command-ring-descriptor-kit
  -> reproduce the live width growth and zero-gap radius sequence exactly
  -> reproduce ringParts(inner, outer) exactly
  -> create phantom-command-piece-descriptor-kit
  -> emit stable piece ids, ring index, part index, partsPerRing, angle/span data, and seed values
  -> create phantom-command-inner-first-timeline-contract-kit
  -> compute firstStart, lastStart, firstSettle, and lastSettle per ring
  -> assert ring[N].firstStart >= ring[N-1].lastSettle for every outer ring
  -> expose marginSeconds per ring transition
  -> create phantom-command-ring-settle-boundary-kit
  -> add parity fixture for ring descriptors, piece descriptors, timeline guards, and total piece count
  -> create phantom-command-construct-snapshot-contract-kit
  -> snapshot buildId, ringDescriptors, pieceCounts, totalPieces, progress, phase, complete, and timelineGuards
  -> add DOM-free construct snapshot smoke
  -> keep construct-spiral-intro-kit default behavior unchanged
  -> defer scenario bootstrap, RTS selection, buildings, economy, combat, and waves
```

## Acceptance Targets

- [ ] `game.html` visual behavior remains unchanged.
- [ ] `sequential-ring-v5` constants exist in one source-owned profile.
- [ ] Source descriptors reproduce ten rings.
- [ ] Source descriptors reproduce zero physical gaps.
- [ ] Source part counts match live `ringParts(inner, outer)`.
- [ ] Total source piece count is `92`.
- [ ] Piece ids are stable and deterministic.
- [ ] Timeline guards prove every inner ring can finish before the next outer ring starts.
- [ ] Snapshot contract exposes build id, rings, pieces, phase, progress, complete, and timeline guards.
- [ ] DOM-free smoke covers descriptor parity, timeline parity, and snapshot shape.
- [ ] Generic `construct-spiral-intro-kit` defaults remain unchanged.
- [ ] Scenario bootstrap and RTS commands remain deferred until construct source parity passes.

## Out of Scope For Next Slice

```txt
runtime split from game.html
three render extraction
scenario bootstrap
RTS unit selection
building placement
economy tick
combat resolution
wave director
XP and unlock progression
save/load
networking
```
