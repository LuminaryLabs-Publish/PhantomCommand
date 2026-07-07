# PhantomCommand Project Breakdown

**Run timestamp:** `2026-07-07T06:41:55-04:00`

**Repo:** `LuminaryLabs-Publish/PhantomCommand`

**Selected because:** the central LuminaryLabs repo ledger most recently advanced through `TheOpenAbove`, and `PhantomCommand` is the next eligible tracked `LuminaryLabs-Publish` repo in the rotation. `LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

## Executive read

`PhantomCommand` is a static Vite/Three.js PvE undead RTS prototype. The public README defines the app as a menu plus opening construct scene, with GitHub Pages deployment from `main`. The live runtime is still concentrated in `game.html`, where `ring-gap-v4` builds a readable ritual construct around the Grim Reaper Totem.

The repo now has one implemented source kit, `construct-spiral-intro-kit`, plus a smoke fixture. That source kit is still not wired into the live `game.html` construct. The config layer is ahead of runtime and already defines the first RTS slice: starting resources, Crypt Core, Skeletons, Zombies, Grave Harvester, Bone Pit, outer enemy camp, map rings, resource nodes, wave lanes, win/loss rules, XP, and unlocks.

The next useful cutover is not more visual tuning. It is a `GameHost Authority + Scenario Command Cutover`: promote the inline construct-only `window.GameHost` into a source service, wire construct sequence state through `construct-spiral-intro-kit`, then transition into a config-backed scenario state with a small command reducer.

## Current interaction loop

```txt
index.html menu
  -> Start opens game.html
  -> Three.js renderer boots
  -> concentric ring specs are generated inline
  -> wedge meshes are generated inline
  -> stone details/seams are added inline
  -> ring pieces animate inward/downward
  -> HUD updates progress/count/phase
  -> player can pan/zoom camera
  -> Space or button skips construct
  -> R or button restarts construct
  -> tower and phantom commander idle animations run
  -> window.GameHost exposes construct-only state
  -> construct reaches command platform online
```

Current user-facing controls:

```txt
WASD / arrows -> pan
mouse wheel -> zoom
Space -> skip construct
R -> restart construct
HUD -> progress, phase, build id
```

## Intended first playable interaction loop

```txt
menu
  -> construct intro completes
  -> GameHost mode becomes scenario_bootstrap
  -> scenario-001 config loads
  -> map-generation config loads
  -> enemy-waves / experience / unlock config loads
  -> fixed deterministic RTS snapshot is composed
  -> GameHost mode becomes scenario_active
  -> player selects starter undead
  -> player builds Grave Harvester
  -> player builds Bone Pit
  -> resource nodes tick souls/bone
  -> first wave lane warns/spawns enemies
  -> player attacks first enemy camp
  -> first camp clear completes objective
  -> XP/unlocks are evaluated once
  -> win/loss state is evaluated
  -> GameHost exposes scenario, diagnostics, and command journal
```

## Domains in use

```txt
static app shell
main menu routing
GitHub Pages deploy
Vite static build
Three.js render host
runtime boot sequence
construct scene runtime
ritual construct geometry
radial ring layout
ring-gap spacing model
construct spiral sequencing
construct animation easing
stone wedge material/detailing
Grim Reaper Totem visual object
phantom commander visual object
camera navigation
keyboard input
wheel zoom input
HUD diagnostics
inline GameHost diagnostics
construct smoke testing
scenario config loading
scenario state composition
radial map generation
center-pressure ring model
player start placement
resource node placement
grave field economy
bone yard economy
soul well economy
enemy camp placement
wave lane placement
PvE wave scheduling
undead unit state
necropolis building state
building construction
building production
RTS selection
RTS command validation
RTS movement requests
RTS attack requests
world economy ledger
combat resolution
objective tracking
experience progression
unlock registry
idempotency ledgers
command journal replay
behavior smoke testing
```

## Current implemented kits

### `construct-spiral-intro-kit`

**Status:** implemented source kit, not live-wired.

**Domain path:** `n:sequence:construct:spiral-intro`

**Source:**

```txt
src/kits/construct-spiral-intro-kit/index.js
tests/construct-spiral-intro-kit-smoke.mjs
```

**Services offered:**

```txt
createConstructSpiralIntroPieceId
createConstructSpiralIntroSchedule
createConstructSpiralIntroKit
installPieces
reset
update
snapshot
schedule
activePieces
settledPieces
pendingPieces
newlyActivePieces
newlySettledPieces
getPieceProgress
getPieceStatus
```

**What it already guarantees:**

```txt
sorted piece schedule
bounded active piece count
active ring window
pending / active / settled state
piece progress lookup
completion snapshot
estimated total seconds
```

### `construct-spiral-intro-kit-smoke`

**Status:** implemented smoke fixture.

**Services offered:**

```txt
assert kit id
assert domain path
install generated ring pieces
assert schedule sort order
tick until complete
assert active count cap
assert active ring window
assert all pieces settled
```

## Current inline runtime service surfaces

These are live behaviors but should be extracted into source kits.

```txt
phantom-command-static-app-shell-kit
  renderMenu
  routeToGame
  preserve static route contract

phantom-command-construct-scene-kit
  bootConstructScene
  createThreeScene
  createRenderer
  createLighting
  createFog
  tickConstructScene

phantom-command-ritual-ring-geometry-kit
  generateRingSpecs
  computeRingPartCount
  generateWedgeGeometry
  createRingPieceDescriptor
  seedStoneVariation

phantom-command-wedge-detail-kit
  addSeams
  addCracks
  assignStoneMaterial

phantom-command-construct-animation-kit
  computePieceLocalProgress
  applyRadialProgress
  applyDropProgress
  computePhase
  skip
  restart

phantom-command-totem-visual-kit
  createCenterDisc
  createTotemBase
  createGlowCore
  tickTotemIdle

phantom-command-phantom-commander-visual-kit
  createCommanderBody
  createCommanderHood
  tickHover
  tickTurn

phantom-command-camera-navigation-kit
  panFromKeys
  zoomFromWheel
  clampTarget
  smoothCameraTarget
  applyCameraPose

phantom-command-hud-diagnostics-kit
  setProgress
  setConstructedCount
  setPhase
  setStatus
  setBuildId

phantom-command-gamehost-kit
  skipConstruct
  restartConstruct
  getState
  recommended: getDiagnostics
  recommended: dispatch
  recommended: subscribe
  recommended: getScenarioState
```

## Config/domain kit targets

```txt
phantom-scenario-config-kit
  loadScenarioConfig
  loadMapConfig
  loadEnemyWaveConfig
  loadExperienceConfig
  loadUnlockConfig
  composeInitialScenarioState
  validateScenarioReferences

phantom-map-generation-domain-kit
  generateRadialRings
  placePlayerStart
  placeResourceNodes
  placeEnemyCamps
  placeWaveLanes
  placeCenterTotem

radial-center-pressure-map-kit
  classifyRingForPosition
  computeDangerLevel
  computeResourceMultiplier
  computeCorruptionFlag

world-economy-domain-kit
  getBalance
  canAfford
  payCost
  grantResources
  tickResourceNodes
  emitEconomyEvents

soul-economy-domain-kit
  harvestSouls
  spendSouls
  validateSoulCosts

experience-progression-domain-kit
  grantExperience
  checkRankThresholds
  grantMasteryPoints
  trackProcessedExperienceEvents

unlock-registry-domain-kit
  isUnlocked
  evaluateRequirements
  claimUnlock
  trackProcessedUnlockClaims

pve-director-domain-kit
  scheduleWaves
  chooseWaveLane
  spawnDueWaves
  selectAttackTarget
  trackTotemPhaseWaves

rts-command-domain-kit
  dispatchCommand
  selectUnits
  requestMove
  requestAttack
  requestBuild
  requestProduce
  validateCommand
  appendCommandJournal

rts-combat-resolution-domain-kit
  validateTarget
  resolveAttack
  applyDamage
  emitDefeated

scenario-objective-kit
  evaluateObjectives
  markObjectiveComplete
  evaluateWinCondition
  evaluateLoseCondition
```

## Object/domain kit targets

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

## Main blockers

```txt
1. game.html is still the runtime monolith.
2. construct-spiral-intro-kit exists but is not the live sequence authority.
3. window.GameHost is inline and construct-only.
4. Config JSON is not loaded by the runtime.
5. The runtime has no scenario state model after construct completion.
6. There is no command reducer for select/move/build/produce/attack.
7. There is no resource ledger, objective ledger, XP ledger, or unlock ledger at runtime.
8. Smoke coverage proves the source construct kit, but not the live page or first RTS scenario.
```

## Recommended next slice

```txt
PhantomCommand GameHost Authority + Scenario Command Cutover
```

Build order:

```txt
1. Keep index.html as the menu shell.
2. Split game.html into thin markup plus src/main.js.
3. Move construct constants into source/config.
4. Generate live piece descriptors and install them into construct-spiral-intro-kit.
5. Make construct-spiral-intro-kit the live sequence authority.
6. Promote inline window.GameHost into phantom-command-gamehost-kit.
7. Add GameHost modes: construct_intro, scenario_bootstrap, scenario_active, scenario_complete, scenario_failed.
8. Add getDiagnostics(), dispatch(command), subscribe(), and getScenarioState().
9. Add phantom-scenario-config-kit for static JSON loading and validation.
10. Compose scenario-001 into deterministic initial state after construct completion.
11. Render Crypt Core, starter Skeletons/Zombies, resource nodes, first camp, and wave lanes as simple RTS markers.
12. Add rts-command-domain-kit with SELECT_UNITS, REQUEST_MOVE, REQUEST_BUILD, REQUEST_PRODUCE, REQUEST_ATTACK.
13. Add objective evaluation for Grave Harvester, Bone Pit, and first camp clear.
14. Add behavior smoke tests for construct completion, scenario bootstrap, first build objective, and first camp clear.
```

## Acceptance target

```txt
npm run build passes
construct-spiral-intro-kit smoke passes
GameHost.getState().mode exists
GameHost.getDiagnostics() exists
GameHost.dispatch(command) exists
GameHost.getScenarioState() returns scenario_001_raise_the_host after construct completion
scenario state includes resources, buildings, units, camps, objectives, wave lanes
building Grave Harvester completes build_grave_harvester
building Bone Pit completes build_bone_pit
clearing outer_militia_camp_01 completes clear_first_camp
all objectives complete sets win state
Crypt Core destroyed sets lose state
command journal can replay to same scenario snapshot
```

## Notes for next agent

Do not start with more art polish. The construct visual is readable enough at `ring-gap-v4`. The highest leverage work is now source authority, config parity, and deterministic scenario command state.
