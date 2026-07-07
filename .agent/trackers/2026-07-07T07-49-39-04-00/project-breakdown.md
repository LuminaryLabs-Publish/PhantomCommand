# PhantomCommand Project Breakdown

**Run timestamp:** `2026-07-07T07:49:39-04:00`

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Selected repo:** `LuminaryLabs-Publish/PhantomCommand`

**Excluded repo:** `LuminaryLabs-Publish/TheCavalryOfRome`

## Selection note

The tracked Publish rotation most recently documented `LuminaryLabs-Publish/TheOpenAbove`, so this pass selected the next eligible tracked repo, `LuminaryLabs-Publish/PhantomCommand`. `TheCavalryOfRome` remains excluded by standing rule.

This run only updates internal documentation, tracker, registry, and central ledger files. No runtime source code, build output, or product behavior was changed.

## Current read

`PhantomCommand` is a static Vite / Three.js publish repo for a single-player PvE undead RTS prototype. The app still enters through `index.html` and runs the live proof through `game.html`.

The live construct proof has moved past the older `ring-gap-v4` docs language. The current `game.html` build id is `sequential-ring-v5`, and the HUD describes the intended behavior as no physical gaps, with inner rings finishing before outer rings begin.

The current runtime is still inline in `game.html`. It creates the Three.js renderer, scene, lighting, fog, camera, ring geometry, wedge details, totem, phantom commander visual, input handling, construct animation, HUD updates, and `window.GameHost` in one module script.

A source kit already exists at `src/kits/construct-spiral-intro-kit/index.js`, with smoke coverage at `tests/construct-spiral-intro-kit-smoke.mjs`, but the live page does not use it yet. The next cutover must first reconcile source-kit timing with the live `sequential-ring-v5` construct before bootstrapping RTS scenario authority.

The config layer remains ahead of runtime. It already defines `scenario_001_raise_the_host`, starting resources, Crypt Core, Skeletons, Zombies, Grave Harvester, Bone Pit, the first enemy camp, win/loss conditions, radial map rings, resource nodes, enemy camps, wave lanes, enemy waves, XP, and unlocks.

## Interaction loop

### Current implemented loop

```txt
load index.html menu
  -> click Start
  -> open game.html
  -> initialize Three.js renderer, camera, scene, fog, lights, HUD, and inputs
  -> compute ten concentric no-gap ring specs
  -> create wedge meshes, seams, stone materials, center disc, totem, and phantom commander
  -> animate ring pieces inward and downward using sequential-ring-v5 timing
  -> keep inner ring landing before next outer ring begins
  -> pan with WASD/arrows
  -> zoom with mouse wheel
  -> skip with Space or Skip button
  -> restart with R or Restart button
  -> update progress, constructed count, phase, status, and build id HUD
  -> expose construct-only snapshot through window.GameHost.getState()
  -> reach command platform online
```

### Intended first playable loop

```txt
load menu
  -> route to game scene
  -> run source-authoritative construct intro matching sequential-ring-v5
  -> GameHost mode changes from construct_intro to scenario_bootstrap
  -> load scenario/map/wave/experience/unlock config JSON
  -> compose fixed deterministic RTS scenario state
  -> GameHost mode changes to scenario_active
  -> select starter Skeletons/Zombies
  -> move/attack/build/produce through commands
  -> build Grave Harvester
  -> build Bone Pit
  -> tick resource nodes and first wave lane
  -> clear outer_militia_camp_01
  -> evaluate objectives, economy, XP, unlocks, win state, and Crypt Core loss
```

### Recommended cutover loop

```txt
preserve current static route and visual proof
  -> move live construct constants into a source profile
  -> make source kit output match sequential-ring-v5 timing
  -> add live construct parity smoke
  -> promote inline GameHost into authority service
  -> add construct/scenario modes
  -> bootstrap config-backed RTS state after construct completion
  -> route first RTS actions through deterministic command reducer
  -> expose scenario state, diagnostics, and command journal
  -> add behavior smoke for objective completion and replay parity
```

## Domains identified

```txt
static-app-shell
main-menu-routing
github-pages-deploy
vite-static-build
three-render-host
runtime-boot-sequence
construct-scene-runtime
sequential-ring-layout
ritual-wedge-geometry
stone-wedge-material-detail
construct-animation-profile
construct-source-kit-parity
grim-reaper-totem-visual-object
phantom-commander-visual-object
camera-navigation
keyboard-input
wheel-zoom-input
hud-diagnostics
gamehost-authority
construct-smoke-testing
scenario-config-loading
scenario-state-composition
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
soul-economy-ledger
combat-resolution
objective-tracking
experience-progression
unlock-registry
idempotency-ledgers
command-journal-replay
behavior-smoke-testing
```

## Current explicit kits

```txt
construct-spiral-intro-kit
construct-spiral-intro-kit-smoke
```

## Runtime extraction kits

```txt
phantom-command-static-app-shell-kit
phantom-command-menu-route-kit
phantom-command-construct-scene-kit
phantom-command-sequential-ring-layout-kit
phantom-command-ritual-ring-geometry-kit
phantom-command-wedge-detail-kit
phantom-command-construct-animation-profile-kit
phantom-command-totem-visual-kit
phantom-command-phantom-commander-visual-kit
phantom-command-camera-navigation-kit
phantom-command-hud-diagnostics-kit
phantom-command-three-render-kit
phantom-command-static-build-kit
phantom-command-gamehost-authority-kit
phantom-command-live-construct-parity-smoke-kit
```

## Gameplay/domain kits

```txt
phantom-scenario-config-kit
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

## Subdomain/object kits

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

## Services identified

### Current live runtime services

```txt
appShell.routeToGame
constructScene.initRenderer
constructScene.initScene
constructScene.initFog
constructScene.initLighting
constructScene.initCamera
constructScene.bindKeyboardInput
constructScene.bindWheelZoom
constructScene.bindSkipRestartButtons
sequentialRing.computeRingWidths
sequentialRing.computeNoGapRadii
sequentialRing.computePartCounts
wedgeGeometry.createWedgeGeometry
wedgeDetail.addSeams
stoneMaterial.assignMaterialVariant
constructAnimation.computePieceDelay
constructAnimation.computeRadialProgress
constructAnimation.computeDropProgress
constructAnimation.applyPieceTransform
constructAnimation.skip
constructAnimation.restart
totemVisual.createCenterDiscAndTower
phantomCommanderVisual.createBodyAndHood
phantomCommanderVisual.tickHoverAndTurn
cameraNavigation.panFromKeys
cameraNavigation.zoomFromWheel
cameraNavigation.smoothTarget
hudDiagnostics.setProgress
hudDiagnostics.setConstructedCount
hudDiagnostics.setPhase
hudDiagnostics.setStatus
hudDiagnostics.setBuildId
gameHost.skipConstruct
gameHost.restartConstruct
gameHost.getState
```

### Current source-kit services

```txt
constructSpiralIntro.createPieceId
constructSpiralIntro.createSchedule
constructSpiralIntro.createKit
constructSpiralIntro.installPieces
constructSpiralIntro.reset
constructSpiralIntro.update
constructSpiralIntro.snapshot
constructSpiralIntro.schedule
constructSpiralIntro.activePieces
constructSpiralIntro.settledPieces
constructSpiralIntro.pendingPieces
constructSpiralIntro.newlyActivePieces
constructSpiralIntro.newlySettledPieces
constructSpiralIntro.getPieceProgress
constructSpiralIntro.getPieceStatus
constructSmoke.assertKitId
constructSmoke.assertDomainPath
constructSmoke.tickUntilComplete
constructSmoke.assertWindowCaps
```

### Target scenario services

```txt
gameHost.getState
gameHost.getDiagnostics
gameHost.dispatch
gameHost.subscribe
gameHost.getConstructState
gameHost.getScenarioState
gameHost.getCommandJournal
scenarioConfig.loadConfig
scenarioConfig.validateReferences
scenarioConfig.composeInitialState
mapGeneration.generateRadialRings
mapGeneration.placePlayerStart
mapGeneration.placeResourceNodes
mapGeneration.placeEnemyCamps
mapGeneration.placeWaveLanes
economy.getBalance
economy.canAfford
economy.payCost
economy.grantResources
economy.tickResourceNodes
building.canPlace
building.startConstruction
building.tickConstruction
building.enqueueProduction
unit.spawnBatch
unit.setCommandState
command.dispatchCommand
command.selectUnits
command.requestMove
command.requestAttack
command.requestBuild
command.requestProduce
command.validateCommand
command.appendJournal
movement.assignPath
movement.tickSteering
combat.validateTarget
combat.resolveAttack
combat.applyDamage
combat.emitDefeated
objective.evaluate
objective.markComplete
objective.evaluateWinCondition
objective.evaluateLoseCondition
wave.scheduleFromConfig
wave.chooseWaveLane
wave.spawnDueWaves
xp.grant
xp.checkRankThresholds
xp.grantMasteryPoints
unlock.evaluateRequirements
unlock.claim
unlock.trackProcessedClaims
smoke.runConstructParityFixture
smoke.runScenarioBootstrapFixture
smoke.runObjectiveFixture
smoke.replayCommandJournal
```

## Key findings

- The live runtime build id is now `sequential-ring-v5`; older internal docs still referenced `ring-gap-v4`.
- The live scene is visually coherent and has strong construct readability, but it is still inline in `game.html`.
- `construct-spiral-intro-kit` exists and has smoke coverage, but it does not yet drive the live page.
- The first technical blocker is construct parity: the source kit/profile needs to reproduce the live no-gap, inner-ring-first behavior before the page is split.
- The second blocker is authority: `window.GameHost` is construct-only and cannot yet own scenario modes, dispatch, diagnostics, scenario state, or command replay.
- The config layer is ready to become runtime state. `scenario_001_raise_the_host` already defines the first objective loop and starting faction state.
- The map config already gives enough deterministic structure for a fixed first RTS slice: radial rings, center totem, starting nodes, resource nodes, enemy camps, and wave lanes.
- Enemy waves already define first wave timings and targets, but there is no PvE director runtime yet.

## Recommended next work

**Build target:** `PhantomCommand Sequential Construct Parity + Scenario Authority Cutover`

```txt
keep index.html as the menu shell
  -> split game.html into thin markup plus src/main.js
  -> move sequential-ring-v5 constants into a construct profile config
  -> add source service that produces the same no-gap inner-ring-first sequence
  -> wire construct-spiral-intro-kit or a compatible profile adapter into the live scene
  -> add live parity smoke for build id, ring count, ring gaps, inner-before-outer order, skip, restart, and GameHost construct state
  -> promote inline GameHost into phantom-command-gamehost-authority-kit
  -> add modes: construct_intro, scenario_bootstrap, scenario_active, scenario_complete, scenario_failed
  -> add getDiagnostics, dispatch, subscribe, getConstructState, getScenarioState, and getCommandJournal
  -> load scenario/map/wave/experience/unlock config JSON
  -> compose fixed deterministic RTS state after construct completion
  -> render Crypt Core, resource nodes, starter squads, first camp, and wave lanes
  -> implement SELECT_UNITS, REQUEST_MOVE, REQUEST_BUILD, REQUEST_PRODUCE, REQUEST_ATTACK
  -> evaluate Grave Harvester, Bone Pit, first camp clear, win, and lose conditions
  -> add behavior smoke tests for scenario bootstrap, first build objective, first camp clear, and command journal replay
```

## Acceptance targets

```txt
npm run build succeeds
construct source profile reports build id sequential-ring-v5
live parity smoke confirms ten rings and no physical gaps
live parity smoke confirms inner ring completion before next outer ring completion
skip/restart remain available through GameHost
GameHost exposes mode, construct, scenario, diagnostics, and command journal state
scenario config JSON loads without broken references
initial scenario state contains Crypt Core, 6 Skeletons, 2 Zombies, starting souls/bone/command, resource nodes, first camp, and wave lanes
SELECT_UNITS, REQUEST_BUILD, REQUEST_PRODUCE, REQUEST_ATTACK commands append idempotent journal entries
Grave Harvester, Bone Pit, and first camp objectives can complete under scripted smoke
journal replay produces the same scenario snapshot as live command application
```
