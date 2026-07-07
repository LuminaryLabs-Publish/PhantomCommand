# PhantomCommand Project Breakdown

**Run timestamp:** `2026-07-07T05:31:31-04:00`

**Repo:** `LuminaryLabs-Publish/PhantomCommand`

**Selected because:** the current tracked Publish rotation most recently updated `TheOpenAbove`, `TheCavalryOfRome` remains excluded by rule, and `PhantomCommand` is the next eligible follow-up repo in the documented sequence.

## Summary

`PhantomCommand` is a static Vite/Three.js publish repo for a single-player PvE undead RTS prototype. The public README still accurately frames the live proof: `index.html` opens the menu and `game.html` runs a ritual construct scene where concentric stone-ring layers assemble around the Grim Reaper Totem.

The latest runtime is stronger than the prior tracker indicated. `game.html` now exposes `window.GameHost` with `skipConstruct`, `restartConstruct`, and `getState()`, and the scene has the `ring-gap-v4` tuning for readable concentric spacing. However, the runtime is still inline in `game.html`, the source `construct-spiral-intro-kit` is still not wired into the live scene, and the config-backed RTS scenario is not yet bootstrapped.

## Current interaction loop

```txt
index.html
  -> Start button opens game.html
  -> game.html imports Three.js from CDN
  -> create renderer / scene / camera / lighting / fog
  -> generate concentric stone ring descriptors
  -> create wedge meshes, seams, cracks/material variation
  -> animate ring pieces from offset start positions into final radial positions
  -> update HUD progress / constructed count / phase
  -> allow WASD/arrow pan and mouse-wheel zoom
  -> allow Space/Skip to complete construct
  -> allow R/Restart to replay construct
  -> expose GameHost.getState() for construct diagnostics
  -> hold at command platform online
```

## Intended first playable RTS loop

```txt
menu
  -> construct intro
  -> load scenario-001 config
  -> compose fixed deterministic RTS state
  -> spawn Crypt Core, starter Skeletons, starter Zombies
  -> place grave fields, bone yards, enemy camp, and wave lanes
  -> select units
  -> build Grave Harvester
  -> build Bone Pit
  -> produce / command units
  -> defend against first wave
  -> clear outer militia camp
  -> grant resources / XP / unlock progress
  -> complete all scenario objectives or lose Crypt Core
```

## Domains in use

### Runtime domains

```txt
static app shell
main menu routing
construct scene boot
Three.js renderer
scene lighting and fog
camera pan and zoom
keyboard input
mouse wheel input
HUD telemetry
GameHost construct diagnostics
static build and Pages deployment
```

### Construct scene domains

```txt
ritual construct geometry
radial ring layout
ring-gap spacing model
wedge mesh generation
stone material palette
seam/crack visual detail
construct sequence timing
construct easing and transform animation
skip/restart control
Grim Reaper Totem visual
phantom commander visual
```

### Config/gameplay domains

```txt
scenario composition
starting faction state
Crypt Core building state
undead unit roster state
objective tracking
win/loss evaluation
radial map generation
center-pressure ring model
resource node placement
grave field economy
bone yard economy
soul well economy
enemy camp placement
wave lane placement
PvE wave director
experience progression
unlock requirements
command validation
unit selection
move/attack/build/produce orders
combat resolution
smoke fixture validation
```

## Services the kits offer or should offer

### Implemented source kit services

```txt
constructSpiralIntro.createSchedule(pieces, config)
constructSpiralIntro.createKit(options)
constructSpiralIntro.installPieces(pieces)
constructSpiralIntro.reset()
constructSpiralIntro.update(dt)
constructSpiralIntro.snapshot()
constructSpiralIntro.schedule()
constructSpiralIntro.activePieces()
constructSpiralIntro.settledPieces()
constructSpiralIntro.pendingPieces()
constructSpiralIntro.newlyActivePieces()
constructSpiralIntro.newlySettledPieces()
constructSpiralIntro.getPieceProgress(pieceId)
constructSpiralIntro.getPieceStatus(pieceId)
```

### Current inline runtime services

```txt
appShell.routeToGame()
render.createRenderer(canvas)
render.resizeViewport()
world.createScene()
world.createLights()
world.createFog()
construct.generateRingSpecs()
construct.computeRingPartCount()
construct.createWedgeGeometry()
construct.createRingPiece()
construct.updatePieceTransforms(seq)
construct.skip()
construct.restart()
input.trackPanKeys()
input.applyWheelZoom()
camera.updatePan(dt)
camera.applyOrbitZoomPose(dt)
hud.setProgress(progress)
hud.setConstructed(done, total)
hud.setPhase(phase)
hud.setStatus(text)
gameHost.skipConstruct()
gameHost.restartConstruct()
gameHost.getState()
```

### Needed config/RTS services

```txt
scenarioConfig.loadAll()
scenarioState.composeInitialState()
mapGeneration.generateRadialMap(seed)
resourceLedger.getBalance()
resourceLedger.canAfford(cost)
resourceLedger.pay(cost)
resourceLedger.grant(delta)
buildingState.canPlace(type, position)
buildingState.startConstruction(type, position)
buildingState.tickConstruction(dt)
productionQueue.enqueue(unitType)
productionQueue.tick(dt)
unitState.spawnBatch(type, count, placement)
commandState.selectUnits(ids)
commandState.requestMove(target)
commandState.requestAttack(targetId)
commandState.requestBuild(type, position)
commandState.requestProduce(unitType)
movement.tickSteering(dt)
combat.resolveAttacks(dt)
waveDirector.scheduleFromConfig()
waveDirector.spawnDueWaves(time)
objectiveState.evaluateObjectives()
objectiveState.evaluateWinLoss()
experience.grant(sourceEventId, amount)
unlocks.evaluateRequirements()
```

## Kits identified

### Current implemented kits

```txt
construct-spiral-intro-kit
construct-spiral-intro-kit-smoke
```

### Current inline candidate kits

```txt
phantom-command-static-app-shell-kit
phantom-command-menu-route-kit
phantom-command-construct-scene-kit
phantom-command-ritual-ring-geometry-kit
phantom-command-wedge-detail-kit
phantom-command-construct-animation-kit
phantom-command-totem-visual-kit
phantom-command-phantom-commander-visual-kit
phantom-command-camera-navigation-kit
phantom-command-hud-diagnostics-kit
phantom-command-three-render-kit
phantom-command-gamehost-kit
```

### Config and gameplay kit candidates

```txt
phantom-scenario-config-kit
phantom-map-generation-domain-kit
radial-center-pressure-map-kit
world-economy-domain-kit
soul-economy-domain-kit
experience-progression-domain-kit
unlock-registry-domain-kit
undead-unit-domain-kit
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
```

### Object/subdomain kit candidates

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
outer-militia-camp-objective-kit
grim-reaper-totem-objective-kit
```

## Key finding

`PhantomCommand` has crossed the first diagnostics threshold because `game.html` now exposes `GameHost.getState()`. The next blocker is no longer “add any GameHost surface”; it is “make GameHost authoritative and config-backed.” The construct runtime should become a prelude state in a larger game mode machine instead of remaining the whole game.

## Next project ideation

### Recommended next slice

```txt
PhantomCommand Source-Kit + Scenario Bootstrap Cutover
```

### Build order

```txt
1. Split game.html into thin markup plus src/main.js.
2. Move current inline constants into src/config/construct-tuning.js or config/construct-intro.config.json.
3. Wire src/kits/construct-spiral-intro-kit into the live piece activation sequence.
4. Keep ring-gap-v4 visual tuning while replacing ad hoc sequence timing.
5. Promote current window.GameHost to phantom-command-gamehost-kit.
6. Add GameHost.getDiagnostics() and GameHost.dispatch(command).
7. Load scenario-001, map-generation, enemy-waves, experience, and unlock configs.
8. Compose a fixed deterministic scenario snapshot after construct completion.
9. Render basic RTS descriptors: Crypt Core, starter squads, resource nodes, enemy camp, wave lanes.
10. Add command request plumbing for select, move, build, produce, and attack.
11. Add smoke fixtures for construct completion, scenario bootstrap, first build objective, and first camp clear.
```

## Acceptance checklist

```txt
npm run build passes
construct-spiral-intro-kit smoke still passes or is wired into npm test/check
window.GameHost.getState().buildId === "ring-gap-v4"
window.GameHost.getState().mode moves from construct_intro to scenario_active
window.GameHost.getState().scenario.id === "scenario_001_raise_the_host"
scenario state includes player_crypt_core
scenario state includes starter skeleton and zombie counts
scenario state includes objective completion flags
scenario bootstrap uses config JSON, not duplicated literals
```

## Risk notes

- Do not expand combat before config-backed scenario state exists.
- Do not let `game.html` keep growing as the runtime monolith.
- Keep the construct sequence as an experience kit, not the gameplay source of truth.
- Keep the first RTS map deterministic and inspectable before adding procedural variance.
