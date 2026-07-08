# PhantomCommand Project Breakdown

**Run timestamp:** `2026-07-08T00:41:39-04:00`

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Default branch:** `main`

**Scope:** internal docs only

**Excluded repo:** `LuminaryLabs-Publish/TheCavalryOfRome`

## Selection

`PhantomCommand` was selected because the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger showed it as the oldest eligible tracked `LuminaryLabs-Publish` repo by latest documentation timestamp.

Latest eligible ledger timestamps checked:

```txt
PhantomCommand    2026-07-07T23:09:45-04:00  selected
PrehistoricRush   2026-07-07T23:21:18-04:00
MyCozyIsland      2026-07-07T23:31:44-04:00
IntoTheMeadow     2026-07-07T23:40:40-04:00
ZombieOrchard     2026-07-07T23:48:44-04:00
HorrorCorridor    2026-07-08T00:00:20-04:00
TheUnmappedHouse  2026-07-08T00:08:03-04:00
TheOpenAbove      2026-07-08T00:21:15-04:00
AetherVale        2026-07-08T00:28:42-04:00
TheCavalryOfRome  excluded
```

## Source files read

```txt
index.html
game.html
package.json
scripts/build-static.mjs
src/kits/construct-spiral-intro-kit/index.js
tests/construct-spiral-intro-kit-smoke.mjs
.agent/README.md
.agent/kit-registry.json
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/*.md
```

## Current repo read

`PhantomCommand` is still a static Vite / Three.js publish repo whose public route is split between a menu and a live construct proof.

Active route:

```txt
index.html
  -> game.html
  -> inline sequential-ring-v5 construct proof
```

`index.html` owns only the menu shell, copy, Start button, and direct `Open Scene` link.

`game.html` still owns the actual runtime inline:

```txt
Three.js CDN import
renderer / scene / fog / lights / camera
HUD and help panels
construct constants
ring descriptor math
ring part count math
wedge geometry
piece creation
piece delay policy
construct animation
pan / zoom / skip / restart input
completion phase
window.GameHost
```

Live construct constants found in `game.html`:

```txt
BUILD_ID: sequential-ring-v5
RING_COUNT: 10
FIRST_INNER_RADIUS: 10
FIRST_RING_WIDTH: 7
RING_WIDTH_GROWTH: 1.25
MAX_RING_WIDTH: 120
RING_GAP_BASE: 0
RING_GAP_GROWTH: 0
MOVE_SECONDS: 2.0
DROP_START_SECONDS: 0.08
RING_STAGGER: 3.25
PART_STAGGER: 0.035
PREWARM_SECONDS: 0.55
expected live ring parts: [5, 5, 5, 5, 6, 8, 10, 12, 16, 20]
expected live total pieces: 92
expected total build seconds: 31.915
```

The generic `construct-spiral-intro-kit` remains useful, but it is not the live sequential-ring-v5 authority. It provides a reusable spiral/window scheduler with active piece windows, settled/pending state, progress, and snapshots. Keep it generic. The next work should add Phantom-specific source/profile/result/bootstrap kits beside it instead of mutating the generic semantics.

## Interaction loop

### Current player loop

```txt
open index.html
  -> read Phantom Command menu
  -> click Start or Open Scene
  -> load game.html
  -> watch sequential-ring-v5 rings assemble around the Grim Reaper Totem
  -> pan with WASD / arrows
  -> zoom with mouse wheel
  -> skip with Space or Skip button
  -> restart with R or Restart button
  -> reach command online phase when all 92 pieces settle
```

### Current runtime loop

```txt
game.html loads
  -> imports Three.js from CDN
  -> creates renderer, scene, fog, lights, camera, HUD, materials, and input state inline
  -> defines sequential-ring-v5 constants inline
  -> derives ten contiguous no-gap ring descriptors inline
  -> computes ring part counts from circumference inline
  -> creates wedge meshes, seam markers, center disc, totem, and commander inline
  -> each animation frame computes construct(time - startedAt)
  -> each piece lerps from start position to final ring position by delay and progress
  -> HUD is mutated directly from construct(seq)
  -> input mutates pan/zoom/skip/restart directly
  -> window.GameHost exposes skipConstruct, restartConstruct, and getState
```

### Target authority loop

```txt
load source-owned sequential-ring-v5 profile
  -> normalize profile values
  -> derive ring descriptors
  -> derive piece descriptors
  -> derive delay descriptors
  -> derive settle descriptors
  -> derive inner-first transition margins
  -> prove parity against live game.html constants
  -> feed descriptors into existing visuals without visual regression
  -> emit ConstructSnapshot independent of DOM / Three.js
  -> reduce ConstructEventResult records
  -> accept construct_complete exactly once
  -> reject duplicate construct_complete with duplicate_construct_complete
  -> gate scenario bootstrap by construct completion state
  -> accept scenario_001_raise_the_host after completion
  -> reject duplicate bootstrap with duplicate_scenario_bootstrap
  -> expose ScenarioBootstrapSnapshot with RTS placeholders only
```

## Domains in use

### Active runtime domains

```txt
static-app-shell
main-menu-routing
static-game-route
vite-static-build
github-pages-deploy
browser-render-host
webgl-canvas-host
three-render-scene
scene-fog-lighting
camera-navigation
keyboard-pan-input
wheel-zoom-input
button-input
hud-diagnostics
gamehost-authority
inline-construct-runtime
```

### Construct source domains

```txt
sequential-ring-v5-profile
construct-source-authority
construct-profile-config
construct-profile-normalization
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
```

### Construct result domains

```txt
construct-event-envelope
construct-event-result
construct-event-reducer
construct-completion-idempotency
construct-event-journal
construct-snapshot-contract
construct-diagnostics-projection
legacy-gamehost-compatibility
```

### Scenario bootstrap domains

```txt
scenario-bootstrap-command
scenario-bootstrap-preflight
scenario-bootstrap-result
scenario-bootstrap-gate
scenario-bootstrap-journal
scenario-bootstrap-snapshot
scenario-mode-state-machine
scenario-boundary-placeholder
```

### Fixture and smoke domains

```txt
fixture-script-runner
construct-profile-parity-smoke
ring-descriptor-parity-smoke
piece-descriptor-parity-smoke
inner-first-timeline-smoke
construct-event-reducer-smoke
construct-snapshot-smoke
scenario-bootstrap-gate-smoke
gamehost-diagnostics-smoke
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

## Services that the kits offer

### Current runtime services

```txt
serve static menu route
serve static game route
route Start button to game.html
route Open Scene link to game.html
build Three.js renderer, scene, camera, fog, lights, HUD, materials, and input state inline
create live construct constants inline
create live ring descriptors inline
create live piece descriptors inline
create live wedge geometry inline
animate construct pieces through radial and drop interpolation
track constructed count, phase, progress, build id, total pieces, ring count, ring gaps, ring parts, and animation config
accept pan, zoom, skip, and restart input
expose window.GameHost.skipConstruct
expose window.GameHost.restartConstruct
expose window.GameHost.getState
```

### Current `construct-spiral-intro-kit` services

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

### Current smoke services

```txt
assert construct-spiral-intro-kit id
assert construct-spiral-intro domain path
install generated ring pieces
assert schedule ordering
tick until completion
assert active count cap
assert active ring window
assert all pieces settled
```

### Needed next services

```txt
own sequential-ring-v5 profile outside game.html
normalize source profile values
emit source profile fingerprint
emit source profile snapshot
emit serializable ring descriptors
emit serializable piece descriptors
emit serializable delay descriptors
emit serializable settle descriptors
emit serializable timeline margin descriptors
prove zero-gap parity
prove ring part count parity
prove 92-piece parity
prove 31.915-second total build parity
prove positive inner-first transition margins
emit ConstructEventEnvelope records
emit accepted / rejected ConstructEventResult records
append ConstructEventJournal records
project ConstructSnapshot without DOM / Three.js
preflight scenario bootstrap commands
reject bootstrap before completion with construct_incomplete
accept scenario_001_raise_the_host after completion
reject duplicate bootstrap with duplicate_scenario_bootstrap
project ScenarioBootstrapSnapshot with RTS boundary placeholders
expand GameHost diagnostics without breaking current API
run DOM-free fixture matrix
```

## Kits

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
inline-piece-settle-runtime
inline-wedge-geometry-runtime
inline-construct-animation-runtime
inline-construct-hud-runtime
inline-camera-navigation-runtime
inline-gamehost-construct-runtime
```

### Next-cut kits

```txt
phantom-command-source-construct-profile-kit
phantom-command-source-profile-fingerprint-kit
phantom-command-source-profile-snapshot-kit
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
phantom-command-scenario-bootstrap-command-kit
phantom-command-scenario-bootstrap-preflight-kit
phantom-command-scenario-bootstrap-result-kit
phantom-command-scenario-bootstrap-gate-kit
phantom-command-scenario-bootstrap-journal-kit
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

### Deferred RTS kits

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

## Main blocker

The active scene is visually useful but still implementation-owned by `game.html`. Source authority, descriptor parity, construct result idempotency, scenario bootstrap gating, diagnostics snapshots, and replay fixtures are not yet separate from DOM / Three.js runtime mutation.

The generic `construct-spiral-intro-kit` cannot be treated as the live source of truth because its scheduling model is spiral/window based, while `game.html` is a deterministic no-gap inner-first sequential-ring proof.

## Recommended next slice

```txt
PhantomCommand Construct Source Authority + Scenario Bootstrap Fixture Gate
```

Build order:

```txt
preserve current index.html and game.html visuals
  -> create source-owned sequential-ring-v5 profile
  -> add source fingerprint and source snapshot
  -> derive ring descriptors from the profile
  -> derive piece descriptors from the ring descriptors
  -> derive delay and settle descriptors
  -> derive inner-first transition margin descriptors
  -> add parity report for rings, zero gaps, part counts, pieces, and total build time
  -> add ConstructEventEnvelope and ConstructEventResult
  -> accept construct_complete once
  -> reject duplicate construct_complete
  -> append ConstructEventJournal
  -> add ConstructSnapshot
  -> add ScenarioBootstrapCommand and preflight
  -> reject early bootstrap
  -> accept scenario_001_raise_the_host after completion
  -> reject duplicate bootstrap
  -> add ScenarioBootstrapSnapshot
  -> expose additive GameHost diagnostics
  -> add DOM-free fixture matrix
```

## Acceptance target

```txt
index.html still routes to game.html
game.html still renders sequential-ring-v5
window.GameHost.skipConstruct remains available
window.GameHost.restartConstruct remains available
window.GameHost.getState remains available
source profile reports buildId sequential-ring-v5
source profile reports ringCount 10
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

## Automation continuity note

Continue the recurring repo-breakdown rotation. Do not pause or stop the scheduled breakdown task from this repo state.

## Validation

Documentation-only pass. No runtime source files changed. No local build or smoke test was run.
