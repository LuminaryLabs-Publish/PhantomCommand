# PhantomCommand Project Breakdown

**Run timestamp:** `2026-07-07T21-50-56-04-00`

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Branch updated:** `main`

**Mode:** Nexus Engine / Realtime ChatGPT project repo breakdown

## Summary

`PhantomCommand` remains a static Vite / Three.js publish game route centered on the `sequential-ring-v5` construct proof. The live visual slice is strong: `index.html` presents the RTS prototype menu, `game.html` imports Three.js from CDN, builds ten no-gap rings around the Grim Reaper Totem, animates 92 stone pieces, supports pan / zoom / skip / restart, and exposes `window.GameHost` for construct diagnostics.

The next meaningful project slice should not jump to full RTS. It should first make the construct source replayable and testable by moving `sequential-ring-v5` constants and descriptor math out of `game.html`, adding construct event results, adding ConstructSnapshot / ScenarioBootstrapSnapshot, and proving the scenario gate with DOM-free fixtures.

## Selection audit

`LuminaryLabs-Publish/TheCavalryOfRome` was excluded by standing rule.

The central `LuminaryLabs-Dev/LuminaryLabs` ledger showed `PhantomCommand` as the oldest eligible tracked Publish repo by latest review timestamp at the start of this pass.

```txt
PhantomCommand   2026-07-07T20:31:21-04:00  selected
PrehistoricRush  2026-07-07T20:38:27-04:00
MyCozyIsland     2026-07-07T20:50:10-04:00
IntoTheMeadow    2026-07-07T20:59:30-04:00
ZombieOrchard    2026-07-07T21:09:57-04:00
HorrorCorridor   2026-07-07T21:18:45-04:00
TheOpenAbove     2026-07-07T21:29:47-04:00
AetherVale       2026-07-07T21:39:36-04:00
TheCavalryOfRome excluded
```

Accessible Publish repos checked:

```txt
AetherVale
HorrorCorridor
IntoTheMeadow
MyCozyIsland
PhantomCommand
PrehistoricRush
TheCavalryOfRome   excluded
TheOpenAbove
ZombieOrchard
```

## Current source read

### Entrypoints

```txt
index.html
  -> menu shell
  -> Start button routes to game.html
  -> Open Scene links directly to game.html

game.html
  -> imports Three.js from unpkg CDN
  -> creates renderer, scene, fog, lights, camera, HUD, materials, input, rings, pieces, center disc, totem, and commander inline
  -> animates sequential-ring-v5
  -> exposes window.GameHost
```

### Live construct facts

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

### Current source seams

```txt
game.html owns source constants inline
game.html derives ring descriptors inline
game.html derives piece descriptors inline
game.html derives delay and animation settle behavior inline
game.html mutates DOM HUD directly inside construct(seq)
game.html owns input, camera pan, zoom, and requestAnimationFrame loop inline
game.html exposes only skipConstruct(), restartConstruct(), and getState()
construct-spiral-intro-kit is generic and useful, but its default spiral / active-window schedule does not equal sequential-ring-v5
construct-spiral-intro-kit-smoke protects generic schedule behavior, not live Phantom descriptor parity
```

## Interaction loop

### Current player loop

```txt
load index.html
  -> see Phantom Command menu
  -> choose Start or Open Scene
  -> route to game.html
  -> see stone construct forming around Grim Reaper Totem
  -> use WASD / arrows to pan
  -> use mouse wheel to zoom
  -> use Space or Skip button to complete build
  -> use R or Restart button to restart build
  -> completion sets phase to command online
```

### Current runtime loop

```txt
game.html module starts
  -> import Three.js
  -> bind canvas and HUD elements
  -> create WebGLRenderer
  -> create Scene, Fog, Camera, Lights
  -> create materials
  -> create inline input state
  -> define sequential-ring-v5 constants
  -> derive rings with zero gap
  -> derive piece counts from circumference
  -> create wedge meshes and seams
  -> create center disc, totem, and commander
  -> compute totalBuild
  -> bind keyboard, wheel, skip, restart, blur, resize
  -> requestAnimationFrame(frame)
  -> frame computes dt
  -> construct(time - startedAt) mutates piece transforms and HUD
  -> updatePan(dt) mutates camera pan target
  -> camera follows pan and zoom state
  -> renderer.render(scene, camera)
  -> window.GameHost.getState() reports build diagnostics
```

### Target source-authority loop

```txt
load phantom-command-source-construct-profile-kit
  -> emit sequential-ring-v5 profile
  -> emit ring descriptors
  -> emit piece descriptors
  -> emit delay descriptors
  -> emit settle descriptors
  -> run profile parity report
  -> assert ring count, zero gaps, part counts, total pieces, and total build seconds
  -> assert every ring transition has positive inner-first margin
  -> feed descriptors into current visual runtime without changing appearance
```

### Target construct-result loop

```txt
construct reaches final settled piece
  -> create ConstructEventEnvelope { type: construct_complete }
  -> reduce ConstructEventResult
  -> accept first completion
  -> append ConstructEventJournal entry
  -> project ConstructSnapshot
  -> reject duplicate construct_complete with reason duplicate_construct_complete
```

### Target scenario-bootstrap loop

```txt
scenario bootstrap requested before construct completion
  -> reject with reason construct_incomplete

construct completed
  -> request scenario_001_raise_the_host
  -> accept bootstrap exactly once
  -> project ScenarioBootstrapSnapshot
  -> reject duplicate bootstrap with reason duplicate_scenario_bootstrap
  -> keep RTS selection, economy, units, waves, buildings, combat, and objectives deferred
```

## Domains in use

### Runtime and shell domains

```txt
static-app-shell
main-menu-routing
vite-static-build
github-pages-deploy
browser-render-host
three-render-scene
webgl-canvas-host
hud-diagnostics
legacy-gamehost-compatibility
```

### Live construct domains

```txt
inline-construct-runtime
sequential-ring-v5-profile
construct-source-authority
construct-profile-config
construct-profile-parity
construct-descriptor-authority
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
piece-settle-policy
wedge-geometry-generation
stone-material-detail
construct-animation-timeline
inner-first-timeline-contract
ring-transition-margin-policy
construct-completion-phase
```

### Input and camera domains

```txt
keyboard-pan-input
button-input
wheel-zoom-input
camera-navigation
camera-pan-target
camera-zoom-state
camera-orbit-state
```

### Authority domains needed next

```txt
construct-event-envelope
construct-event-result
construct-event-reducer
construct-completion-idempotency
construct-event-journal
construct-snapshot-contract
scenario-bootstrap-preflight
scenario-bootstrap-gate
scenario-bootstrap-result
scenario-bootstrap-snapshot
scenario-mode-state-machine
gamehost-authority
gamehost-diagnostics
fixture-script-runner
construct-profile-parity-smoke
ring-descriptor-parity-smoke
piece-descriptor-parity-smoke
inner-first-timeline-smoke
construct-event-reducer-smoke
construct-snapshot-smoke
scenario-bootstrap-gate-smoke
legacy-gamehost-compatibility-smoke
```

### Deferred RTS domains

```txt
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
command-journal-replay
behavior-smoke-testing
```

## Services the kits offer

### Current runtime services

```txt
serve static menu route
serve static game route
route Start and Open Scene to game.html
create renderer, scene, camera, fog, lights, HUD, materials, and input state inline
create source constants inline
create zero-gap ring descriptors inline
create piece counts from circumference inline
create wedge geometry inline
create piece meshes, seam markers, center disc, totem, and commander inline
animate radial travel, vertical drop, rotation settle, commander hover, tower sway, camera orbit, pan, and zoom
track constructed count, progress, phase, part counts, gaps, animation config, and completion state
support skipConstruct and restartConstruct
expose window.GameHost.getState()
```

### Current `construct-spiral-intro-kit` services

```txt
createConstructSpiralIntroPieceId(piece)
createConstructSpiralIntroSchedule(pieces, config)
createConstructSpiralIntroKit(options)
installPieces(pieces)
reset()
update(dt)
snapshot()
schedule()
activePieces()
settledPieces()
pendingPieces()
newlyActivePieces()
newlySettledPieces()
getPieceProgress(pieceId)
getPieceStatus(pieceId)
```

### Current smoke services

```txt
assert kit id
assert domain path
install generated ring pieces
assert sorted schedule ordering
tick until completion
assert active piece cap
assert active ring window
assert all pieces settled
```

### Needed next services

```txt
own sequential-ring-v5 profile outside game.html
emit serializable ring descriptors
emit serializable piece descriptors
emit serializable delay descriptors
emit serializable settle descriptors
emit timeline margin descriptors
emit source parity report
validate ten rings
validate zero gaps
validate ring part counts [5,5,5,5,6,8,10,12,16,20]
validate 92 total pieces
validate total build seconds 31.915
validate positive inner-first transition margins
emit ConstructEventEnvelope
emit accepted ConstructEventResult
emit rejected ConstructEventResult
emit construct_complete exactly once
reject duplicate construct_complete with reason duplicate_construct_complete
append ConstructEventJournal
project ConstructSnapshot without DOM or Three.js dependency
preflight scenario bootstrap
reject bootstrap before completion with reason construct_incomplete
accept scenario_001_raise_the_host after construct completion
reject duplicate scenario bootstrap with reason duplicate_scenario_bootstrap
project ScenarioBootstrapSnapshot
expand GameHost diagnostics without breaking skipConstruct, restartConstruct, or getState
run DOM-free descriptor, event, snapshot, bootstrap, and GameHost fixture smokes
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
phantom-command-piece-settle-policy-kit
phantom-command-inner-first-timeline-contract-kit
phantom-command-ring-transition-margin-kit
phantom-command-profile-parity-report-kit
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
phantom-command-fixture-script-runner-kit
phantom-command-construct-profile-parity-fixture-kit
phantom-command-ring-descriptor-parity-smoke-kit
phantom-command-piece-descriptor-parity-smoke-kit
phantom-command-inner-first-timeline-smoke-kit
phantom-command-construct-event-reducer-smoke-kit
phantom-command-construct-snapshot-smoke-kit
phantom-command-scenario-bootstrap-gate-smoke-kit
phantom-command-gamehost-diagnostics-smoke-kit
```

### Deferred RTS / gameplay kits

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

## Ideation: what is next

### Immediate vertical slice

**Build target:** `PhantomCommand Construct Descriptor Journal + Scenario Gate Replay Lock`

```txt
preserve current index.html and game.html visuals
  -> source-own sequential-ring-v5 profile
  -> derive ring descriptors from profile
  -> derive piece descriptors from ring descriptors
  -> derive delay and settle descriptors
  -> compute marginSeconds for every inner-first ring transition
  -> publish parity report through GameHost diagnostics
  -> add ConstructEventEnvelope and ConstructEventResult
  -> journal accepted and rejected construct events
  -> project ConstructSnapshot
  -> add ScenarioBootstrapPreflight and ScenarioBootstrapResult
  -> project ScenarioBootstrapSnapshot
  -> add DOM-free replay fixtures
```

### Acceptance checklist

```txt
index.html menu still routes to game.html
game.html visual output remains sequential-ring-v5
window.GameHost.skipConstruct remains available
window.GameHost.restartConstruct remains available
window.GameHost.getState remains available
profile reports buildId sequential-ring-v5
profile reports ringCount 10
ring descriptors report zero gaps
ring descriptors report [5,5,5,5,6,8,10,12,16,20]
piece descriptors report 92 pieces
timing descriptors report totalBuildSeconds 31.915
every ring transition reports positive marginSeconds
first construct_complete is accepted
duplicate construct_complete is rejected with duplicate_construct_complete
bootstrap before completion is rejected with construct_incomplete
bootstrap after completion is accepted
second bootstrap is rejected with duplicate_scenario_bootstrap
ConstructSnapshot is serializable
ScenarioBootstrapSnapshot is serializable
DOM-free fixture passes without browser, DOM, canvas, or Three.js
```

### Defer until after this slice

```txt
RTS unit selection
resource harvesting
grave-field economy
bone-yard economy
soul-well economy
building placement
building production
wave spawner
combat resolver
objective tracker
unlock registry
save/load
networking
```

## Files reviewed

```txt
index.html
game.html
package.json
src/kits/construct-spiral-intro-kit/index.js
tests/construct-spiral-intro-kit-smoke.mjs
.agent/README.md
.agent/kit-registry.json
LuminaryLabs-Dev/LuminaryLabs repo ledgers
```

## Change summary

This pass updated internal documentation only. No runtime source files changed. No local build or smoke test was run.
