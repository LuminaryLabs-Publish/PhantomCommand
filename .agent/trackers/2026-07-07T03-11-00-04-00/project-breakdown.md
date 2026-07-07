# PhantomCommand Project Breakdown

**Run timestamp:** `2026-07-07T03-11-00-04-00`

**Repo:** `LuminaryLabs-Publish/PhantomCommand`

**Branch updated:** `main`

## Selection note

`PhantomCommand` was selected as the next eligible repo in the observed `LuminaryLabs-Publish` order after already documented repos and after excluding `TheCavalryOfRome` by rule.

Observed publish order from the installation listing:

```txt
HorrorCorridor
AetherVale
TheOpenAbove
TheCavalryOfRome   # skipped by rule
PhantomCommand     # selected
PrehistoricRush
ZombieOrchard
IntoTheMeadow
```

Central repo search showed existing publish ledger coverage for `HorrorCorridor`, `AetherVale`, and `TheOpenAbove`. `ZombieOrchard` also had earlier change-log mentions, but it appears later in the observed list than `PhantomCommand`.

## Current repo status

`PhantomCommand` is currently a static browser app with a Vite-backed local dev flow and GitHub Pages deployment. The README defines it as a single-player PvE RTS prototype about commanding undead forces inside a ritual construct world. The playable proof opens on a main menu and loads a Three.js scene where concentric stone-ring layers assemble around the Grim Reaper Totem.

The implementation is still mostly a scene prototype, while the docs and config already describe the future RTS product. This split is useful: the project has a visually clear identity and a much more complete gameplay design target, but the runtime still needs the first real interaction loop.

## Current entry points

```txt
index.html
  -> main menu
  -> Start / Open Scene
  -> game.html

 game.html
  -> Three.js immediate construct scene
  -> visible ring-slab assembly around center Totem
  -> camera pan / zoom
  -> skip / restart
```

## Current interaction loop

### Runtime loop now

```txt
load index.html
  -> click Start or Open Scene
  -> load game.html
  -> initialize Three.js renderer, scene, camera, lights, fog
  -> generate ring slab pieces
  -> animate pieces inward/downward into concentric construct rings
  -> update HUD progress, constructed count, phase text
  -> allow camera pan with WASD/arrows
  -> allow zoom with mouse wheel
  -> allow Space/Skip to complete construction
  -> allow R/Restart to replay construction
```

### Intended RTS loop from docs/config

```txt
start at outer ring
  -> inspect safe grave field and bone yard
  -> build Grave Harvester
  -> build Bone Pit
  -> produce Skeletons and Zombies
  -> defend against first wave
  -> clear nearby enemy camp
  -> earn souls and XP
  -> trigger first unlock message
  -> destroy first Totem seal or camp
  -> win
```

### Product loop target

```txt
menu
  -> opening construct scene
  -> fixed RTS scenario
  -> gather souls/bone/command
  -> build economy and production
  -> raise undead units
  -> issue RTS commands
  -> fight PvE patrols/waves/camps
  -> route kill rewards into economy/XP
  -> unlock next pressure/tooling
  -> push inward toward Totem objective
```

## Domains in use

### Runtime domains currently present

```txt
static-app-shell-domain
  index/game page routing, main menu, GitHub Pages static build

construct-scene-domain
  current one-scene runtime and sequence state

three-render-domain
  renderer, scene, camera, lights, fog, shadow setup

ritual-construct-geometry-domain
  ring counts, wedge generation, slab mesh construction, radial placement

construct-animation-domain
  timing, delay, movement easing, progress, phase changes

grim-reaper-totem-visual-domain
  center disc, Totem, glow core, phantom commander figure

camera-navigation-domain
  WASD/arrow pan, mouse-wheel zoom, orbit target

hud-diagnostics-domain
  progress meter, construct count, phase/status copy

static-build-deploy-domain
  build-static script copies index, game, docs, config into dist for Pages
```

### Intended gameplay domains from docs/config

```txt
phantom-command-mode-domain
  scenario boot, active kit list, config binding, win/loss composition

phantom-map-generation-domain
  deterministic battlefield, radial rings, Totem center, resource/camp/lane placement

world-economy-domain
  resources, balances, costs, income, grants, spends, caps, ledgers

soul-economy-domain
  soul upkeep, decay, residue, harvesting, undead army stability

experience-progression-domain
  XP, thresholds, rank, reward claims, rank events

unlock-registry-domain
  access to units, buildings, upgrades, rituals, objective-gated unlocks

undead-unit-domain
  unit archetypes, unit state, command state, soul stability, production descriptors

necropolis-building-domain
  building placement, construction, completed structures, production queues, descriptors

upgrade-research-domain
  research state, upgrade effects, requirements

pve-director-domain
  waves, camps, Totem pressure, map events, escalation

rts-command-domain
  selection, move, attack, build, produce, rally command requests

rts-combat-resolution-domain
  targeting, damage, armor, death events, defeat facts

rts-movement-system-domain
  steering, path following, avoidance, unit position updates

rts-render-descriptor-domain
  renderer-safe descriptors for scene/HUD presentation

scenario-objective-domain
  build objectives, destroy-camp objectives, win/loss checking

config-schema-domain
  resources, units, buildings, waves, objectives, maps, unlocks, migrations
```

## Services that the kits offer

### Current scene services

```txt
static-app-shell-domain
  service: route.menu.open
  service: route.scene.open
  service: pages.build.static

construct-scene-domain
  service: construct.start
  service: construct.restart
  service: construct.skip
  service: construct.getProgress
  service: construct.getPhase

ritual-construct-geometry-domain
  service: construct.generateRings
  service: construct.generateWedgePiece
  service: construct.placeFinalRingPiece
  service: construct.seededVariation

construct-animation-domain
  service: construct.animatePiece
  service: construct.computeLocalProgress
  service: construct.computeDoneCount
  service: construct.emitPhase

three-render-domain
  service: render.initThreeScene
  service: render.resizeViewport
  service: render.drawFrame
  service: render.createLightsAndFog

camera-navigation-domain
  service: camera.panFromInput
  service: camera.zoomFromWheel
  service: camera.followTarget

hud-diagnostics-domain
  service: hud.setProgress
  service: hud.setCount
  service: hud.setPhase
  service: hud.setStatus
```

### Intended gameplay kit services

```txt
phantom-command-mode-kit
  service: mode.bootScenario
  service: mode.bindConfig
  service: mode.composeWinLoss
  service: mode.registerActiveKits

phantom-map-generation-domain-kit
  service: map.generateFromSeed
  service: map.placeResourceNodes
  service: map.placeEnemyCamps
  service: map.placeWaveLanes
  service: map.placeTotemSeal

world-economy-domain-kit
  service: economy.grant(resourceId, amount, context)
  service: economy.pay(costObject, context)
  service: economy.canAfford(costObject)
  service: economy.getBalance(resourceId)
  service: economy.emitTransactionLedger

soul-economy-domain-kit
  service: soul.applyUpkeep
  service: soul.computeArmyStability
  service: soul.harvestResidue
  service: soul.emitCollapseRisk

experience-progression-domain-kit
  service: xp.grant
  service: xp.checkRankThresholds
  service: xp.claimReward
  service: xp.emitRankChanged

unlock-registry-domain-kit
  service: unlock.isUnlocked(id)
  service: unlock.checkRequirements(id, state)
  service: unlock.grant(id)
  service: unlock.listAvailable(type)

undead-unit-domain-kit
  service: unit.createBatch
  service: unit.getArchetype
  service: unit.setCommandState
  service: unit.applyStabilityState
  service: unit.emitProductionDescriptor

necropolis-building-domain-kit
  service: building.canPlace
  service: building.startConstruction
  service: building.tickConstruction
  service: building.enqueueProduction
  service: building.emitDescriptor

upgrade-research-domain-kit
  service: research.canStart
  service: research.start
  service: research.applyEffect

pve-director-domain-kit
  service: director.scheduleWave
  service: director.activateCamp
  service: director.advanceTotemPhase
  service: director.emitMapEvent

rts-command-domain-kit
  service: command.selectUnits
  service: command.requestMove
  service: command.requestAttack
  service: command.requestBuild
  service: command.requestProduce
  service: command.requestRally

rts-combat-resolution-domain-kit
  service: combat.validateTarget
  service: combat.resolveAttack
  service: combat.applyDamage
  service: combat.emitDefeated

rts-movement-system-kit
  service: movement.assignPath
  service: movement.tickSteering
  service: movement.resolveAvoidance
  service: movement.updateUnitPositions

rts-render-descriptor-kit
  service: descriptors.units
  service: descriptors.buildings
  service: descriptors.resources
  service: descriptors.objectives
  service: descriptors.debugState
```

## Kits identified

### Explicit planned kits from `docs/KIT_ARCHITECTURE.md`

```txt
phantom-command-mode-kit
phantom-map-generation-domain-kit
world-economy-domain-kit
soul-economy-domain-kit
experience-progression-domain-kit
unlock-registry-domain-kit
undead-unit-domain-kit
necropolis-building-domain-kit
upgrade-research-domain-kit
pve-director-domain-kit
rts-command-domain-kit
rts-combat-resolution-domain-kit
rts-movement-system-kit
rts-render-descriptor-kit
```

### Explicit subdomain candidates from docs

```txt
undead-archetype-domain-kit
undead-stability-domain-kit
corpse-reanimation-domain-kit
unit-selection-descriptor-kit
crypt-core-domain-kit
grave-harvester-domain-kit
bone-pit-domain-kit
black-chapel-domain-kit
production-queue-domain-kit
```

### Current runtime extraction candidates

```txt
phantom-command-static-app-shell-kit
phantom-command-construct-scene-kit
phantom-command-ritual-ring-geometry-kit
phantom-command-construct-animation-kit
phantom-command-totem-visual-kit
phantom-command-phantom-commander-visual-kit
phantom-command-camera-navigation-kit
phantom-command-hud-diagnostics-kit
phantom-command-static-build-kit
```

## Current config assets

```txt
config/resources.config.json
  resources: souls, bone, command
  migrations: soul -> souls, bones -> bone

config/units.config.json
  units: skeleton, zombie, ghoul, wight
  first-slice default units: skeleton, zombie
  second-tier units: ghoul, wight

config/buildings.config.json
  buildings: crypt_core, grave_harvester, bone_pit, black_chapel
  first-slice core buildings: crypt_core, grave_harvester, bone_pit

config/scenario-001.config.json
  scenario: Raise the Host
  starting units: 6 skeletons, 2 zombies
  objectives: build Grave Harvester, build Bone Pit, clear first camp
  win: all objectives complete
  lose: player Crypt Core destroyed
```

## Main gap

The repo has strong design/config scaffolding and a visually distinct Totem construction proof, but there is no implemented RTS command/economy/combat loop yet. The immediate scene should become the intro layer or objective reveal layer, not the whole game.

The current `game.html` is also a single large inline module. That is acceptable for an early visual proof, but it blocks the DSK model. The next implementation step should split scene-only code into runtime kits before adding RTS mechanics, so gameplay state does not become trapped inside renderer code.

## Recommended next work

### Phase A: stabilize the runtime shell

```txt
src/
  game/
    phantom-command-mode-kit/
      index.js
      bootScenario.js
  kits/
    construct-scene-domain-kit/
    construct-animation-domain-kit/
    ritual-ring-geometry-kit/
    three-render-descriptor-kit/
    camera-navigation-kit/
    hud-diagnostics-kit/
```

Checklist:

- Move inline `game.html` module into `src/main.js`.
- Keep `game.html` as canvas/HUD shell only.
- Preserve current construct animation exactly while extracting services.
- Add a `window.GameHost.getState()` debug host.
- Make construct progress, phase, ring count, part count, camera target, and current objective inspectable.

### Phase B: connect config to runtime

Checklist:

- Load `resources.config.json`.
- Load `units.config.json`.
- Load `buildings.config.json`.
- Load `scenario-001.config.json`.
- Build a scenario state object from config, not hardcoded runtime values.
- Add runtime validation for missing config IDs.

### Phase C: first playable RTS slice

Checklist:

- Add fixed top-down map plane after construct intro.
- Spawn Crypt Core, 6 Skeletons, and 2 Zombies from scenario config.
- Implement click/drag or click selection for undead units.
- Implement right-click move command.
- Add build panel buttons for Grave Harvester and Bone Pit.
- Pay costs through `world-economy-domain-kit`.
- Produce Skeletons/Zombies from Bone Pit.
- Add one enemy camp with simple guard units.
- Add attack command and simple combat ticks.
- Route kills through rewards/XP.
- Mark scenario win when first camp is destroyed and required build objectives are complete.
- Mark scenario loss if Crypt Core is destroyed.

### Phase D: make the Totem matter

Checklist:

- Keep the current concentric-ring construct as the opening reveal.
- Reuse ring radii as map threat bands.
- Add first Totem seal objective at the nearest inner ring.
- Add wave lane indicators from the Totem.
- Add phase copy: forming -> awakening -> command online -> hostile pulse.

## Suggested immediate implementation prompt

```txt
Implement the first PhantomCommand DSK cutover in LuminaryLabs-Publish/PhantomCommand on main.

Goal: preserve the current visual construct scene, but move the inline game runtime out of game.html and into composable source kits.

Do this:
- Create src/main.js as the game entry.
- Create src/kits/construct-scene-domain-kit/index.js.
- Create src/kits/ritual-ring-geometry-kit/index.js.
- Create src/kits/construct-animation-domain-kit/index.js.
- Create src/kits/camera-navigation-kit/index.js.
- Create src/kits/hud-diagnostics-kit/index.js.
- Keep game.html as canvas/HUD markup and import src/main.js.
- Preserve all current controls and visuals.
- Add window.GameHost.getState() with construct progress, phase, part counts, camera target, and build id.
- Add a simple smoke script that verifies game.html imports src/main.js and that package build still copies static output.
- Push to main.
```

## Risk notes

- Do not add PvP assumptions. The docs explicitly define the first version as single-player PvE.
- Do not let renderer code own economy/combat truth.
- Do not implement advanced pathfinding before the fixed first playable map proves the loop.
- Do not make every unit or building its own top-level mode kit. Unit/building concepts should be subdomains or config-driven archetypes under broader domain kits.
- Do not work on `TheCavalryOfRome` for this schedule.
