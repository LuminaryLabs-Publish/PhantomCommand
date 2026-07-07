# PhantomCommand Project Breakdown

**Run timestamp:** `2026-07-07T04-21-15-04-00`

**Repo:** `LuminaryLabs-Publish/PhantomCommand`

**Central tracker target:** `LuminaryLabs-Dev/LuminaryLabs`

## Selection reason

`PhantomCommand` was selected as the next eligible Publish repo after the latest tracked follow-up pass for `TheOpenAbove`. `TheCavalryOfRome` remains excluded by rule.

The selected repo is still a useful follow-up target because the earlier breakdown identified runtime extraction candidates, and the repo now has an explicit source kit for the construct intro but does not yet have a repo-local `.agent/kit-registry.json`.

## Current repo read

`PhantomCommand` is a static Vite/Three.js publish repo for a single-player PvE undead RTS prototype. The public README describes the live app as a GitHub Pages-deployed static app with `index.html` as the main menu and `game.html` as the opening construct scene.

The runtime is currently split between:

```txt
index.html
  -> menu shell
  -> Start/Open Scene
  -> game.html

game.html
  -> inline Three.js immediate construct scene
  -> concentric ritual stone rings
  -> Grim Reaper Totem / phantom commander visual
  -> pan, zoom, skip, restart
```

The product/design layer is ahead of the live runtime. Config files already define the intended first playable RTS loop: starting resources, Crypt Core, Skeletons, Zombies, Grave Harvester objective, Bone Pit objective, outer enemy camp objective, win/loss rules, map rings, resource nodes, enemy camps, wave lanes, enemy wave timing, XP thresholds, unlock requirements, and idempotency ledgers.

## Interaction loop

### Current live loop

```txt
open menu
  -> click Start/Open Scene
  -> load immediate construct scene
  -> generate ring specs and wedge pieces
  -> animate slabs from elevated outer radial starts
  -> descend/lock pieces into concentric rings
  -> update HUD constructed count, progress bar, phase, status
  -> pan with WASD/arrows
  -> zoom with mouse wheel
  -> optionally skip or restart
  -> end at command platform online
```

### Intended first playable RTS loop

```txt
open menu
  -> construct intro establishes Grim Reaper Totem / command platform
  -> load scenario_001_raise_the_host
  -> start with Crypt Core, 120 souls, 80 bone, 20 command
  -> command starter Skeletons/Zombies
  -> build Grave Harvester
  -> build Bone Pit
  -> defend against timed Dawnward waves
  -> clear outer militia camp
  -> earn souls / bone / XP / unlock progress
  -> complete all objectives or lose Crypt Core
  -> expose deterministic GameHost state
```

### Recommended cutover loop

```txt
menu
  -> construct intro
  -> scenario bootstrap
  -> fixed RTS map
  -> select units
  -> issue move/attack/build/produce commands
  -> tick economy, production, waves, combat, objectives
  -> render state descriptors
  -> smoke-test GameHost snapshot
```

## Domains in use

### Current runtime domains

```txt
static app shell
main menu routing
Three.js render scene
ritual construct geometry
construct spiral sequencing
construct animation easing
stone material/detail rendering
center totem visual
phantom commander visual
camera pan/zoom navigation
HUD diagnostics
static build/deploy
```

### Config/design domains

```txt
scenario composition
map generation
radial center-pressure map rings
player start placement
Grim Reaper Totem objective
resource node generation
grave field economy
bone yard economy
soul well economy
enemy camp placement
wave lane placement
PvE wave director
experience progression
mastery point rewards
unlock requirements
idempotency ledgers
win/loss conditions
```

### Intended gameplay domains

```txt
phantom command mode
RTS command input
unit selection
unit movement/pathing
undead unit state
necropolis building state
building placement/production
world economy
soul economy
combat resolution
objective tracking
campaign progression
render descriptors
GameHost diagnostics
behavior smoke testing
```

## Services that kits offer or should offer

### Current explicit service surface

```txt
constructSpiralIntro.createSchedule(pieces, config)
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

### Current inline runtime services to extract

```txt
appShell.routeToGame()
render.initThreeRenderer(canvas)
render.resizeViewport(width, height)
render.drawFrame(scene, camera)
world.createScene()
world.createLights()
world.createFogPlane()
construct.generateRingSpecs()
construct.generateWedgeGeometry(inner, outer, span, height, seed)
construct.createPiece(ring, part, inner, outer, span, angle)
construct.updatePieceTransforms(time)
construct.skip()
construct.restart()
totem.createCenterDiscAndCore()
phantom.createCommanderVisual()
phantom.updateSmokeAndHover(time)
camera.panFromKeys(keys, dt)
camera.zoomFromWheel(delta)
hud.setProgress(progress)
hud.setConstructedCount(done, total)
hud.setPhase(phase)
hud.setStatus(text)
```

### Intended RTS services

```txt
scenario.loadConfig(scenarioId)
scenario.composeInitialState(configs)
command.selectUnits(selection)
command.requestMove(selection, target)
command.requestAttack(selection, target)
command.requestBuild(buildingType, placement)
command.requestProduce(buildingId, unitType, count)
economy.getBalance(resource)
economy.canAfford(cost)
economy.pay(cost, reason)
economy.grant(resources, reason)
building.canPlace(type, position)
building.startConstruction(type, position)
building.tickConstruction(dt)
building.enqueueProduction(buildingId, unitType)
unit.spawnBatch(type, count, placement)
unit.setCommandState(unitId, command)
movement.assignPath(unitId, target)
movement.tickSteering(dt)
combat.validateTarget(attacker, target)
combat.resolveAttack(attacker, target)
combat.applyDamage(target, damage)
objective.evaluate(state)
objective.markComplete(objectiveId)
wave.scheduleFromConfig(enemyWavesConfig)
wave.spawnDueWaves(time)
xp.grant(amount, sourceEventId)
xp.checkRankThresholds()
unlock.evaluateRequirements(state)
unlock.claim(unlockId, unlockClaimId)
gameHost.getState()
gameHost.getDiagnostics()
smoke.runScenarioObjectiveFixture()
```

## Kits identified

### Existing explicit source kit

```txt
construct-spiral-intro-kit
```

Purpose: deterministic scheduling and ticking for ritual construct pieces. The kit owns piece schedule creation, active/settled/pending state, time progression, progress snapshotting, active ring-window enforcement, and active piece cap enforcement.

### Existing smoke harness

```txt
construct-spiral-intro-kit-smoke
```

Purpose: validates schedule ordering, active count cap, active ring-window span, complete state, and final settled/pending/active counts for the construct spiral intro kit.

### Runtime extraction kits

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
phantom-command-static-build-kit
phantom-command-gamehost-kit
```

### Gameplay/domain kits

```txt
phantom-command-mode-kit
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

### Subdomain/object kits

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

## Gaps found

```txt
No .agent/kit-registry.json existed before this run.
Live game.html remains an inline monolith.
The existing construct-spiral-intro-kit is not wired into game.html yet.
GameHost state is not exposed by the live runtime.
Scenario config is not loaded by the runtime.
The RTS loop exists as config/design intent but not as playable interaction.
No build was run during this docs pass.
```

## Next project direction

### Next slice: PhantomCommand Config-Backed RTS Bootstrap

```txt
1. Keep index.html as the menu shell.
2. Convert game.html into markup plus src/main.js import.
3. Wire src/kits/construct-spiral-intro-kit into the construct scene.
4. Add phantom-command-gamehost-kit with getState/getDiagnostics.
5. Load config/scenario-001.config.json, map-generation.config.json, enemy-waves.config.json, experience.config.json, and unlocks.config.json.
6. After construct completion, create a fixed RTS scenario state from the configs.
7. Render Crypt Core, Grave Harvester/Bone Pit placement ghosts, starter Skeleton/Zombie squads, first camp marker, resource nodes, and wave lane warnings.
8. Add command input service for select, move, build, produce, and attack.
9. Add smoke test for scenario bootstrap and first objective completion.
```

## Implementation notes

- Treat `game.html` as a temporary visual proof, not the gameplay source of truth.
- Promote config files to canonical state inputs before adding more visual features.
- Keep construct intro as an experience kit that emits completion, not as a blocker inside render code.
- Put gameplay state behind services before adding unit visuals.
- Add `.agent/kit-registry.json` as the authoritative current kit inventory for this repo.
