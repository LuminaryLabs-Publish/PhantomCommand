# PhantomCommand Project Breakdown

**Run timestamp:** `2026-07-07T23-09-45-04:00`

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Selected from:** `LuminaryLabs-Publish`

**Central tracker:** `LuminaryLabs-Dev/LuminaryLabs`

**Branch target:** `main`

## Summary

`PhantomCommand` is still a static Vite / Three.js publish game where `index.html` routes into `game.html`, and `game.html` owns the active `sequential-ring-v5` construct proof inline.

The project is ready for a focused source-authority pass: extract the live construct profile into deterministic descriptors, prove parity with the current no-gap ring build, add typed construct and scenario bootstrap result contracts, then expose DOM-free replay fixtures before adding the full RTS layer.

## Selection reason

`PhantomCommand` was selected because the central Publish ledger showed it as the oldest eligible tracked non-Cavalry repo by latest review timestamp.

`LuminaryLabs-Publish/TheCavalryOfRome` remained excluded by standing rule.

Latest eligible timestamps checked:

```txt
PhantomCommand   2026-07-07T21:50:56-04:00  selected
PrehistoricRush  2026-07-07T21:59:06-04:00
MyCozyIsland     2026-07-07T22:11:41-04:00
IntoTheMeadow    2026-07-07T22:20:00-04:00
ZombieOrchard    2026-07-07T22:31:24-04:00
HorrorCorridor   2026-07-07T22:41:23-04:00
TheOpenAbove     2026-07-07T22:50:39-04:00
AetherVale       2026-07-07T22:59:19-04:00
TheCavalryOfRome excluded
```

Accessible Publish repos checked from the tracked rotation:

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

### Static shell

```txt
index.html
  -> menu / landing route
  -> Start / Open Scene routes to game.html
```

### Active game route

```txt
game.html
  -> imports Three.js from CDN
  -> declares BUILD_ID = sequential-ring-v5
  -> declares 10-ring construct constants inline
  -> computes ring descriptors inline
  -> computes ring part counts inline
  -> creates wedge meshes inline
  -> animates construct pieces inline
  -> mutates HUD inline
  -> handles keyboard, wheel, button, resize, and blur input inline
  -> exposes construct-only window.GameHost inline
```

### Current live construct constants

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
START_RADIUS_MULTIPLIER: 1.45
START_HEIGHT_BASE: 28
```

### Current live parity targets

```txt
ring count: 10
ring gaps: all zero
ring part counts: [5, 5, 5, 5, 6, 8, 10, 12, 16, 20]
total pieces: 92
total build seconds: 31.915
completion phase: command online
GameHost surface: skipConstruct, restartConstruct, getState
```

### Existing generic kit

`src/kits/construct-spiral-intro-kit/index.js` is a generic construct sequencing kit. Keep it generic and backwards-compatible.

It currently provides:

```txt
CONSTRUCT_SPIRAL_INTRO_KIT_ID
CONSTRUCT_SPIRAL_INTRO_DOMAIN_PATH
DEFAULT_CONSTRUCT_SPIRAL_INTRO_CONFIG
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

The implemented smoke file `tests/construct-spiral-intro-kit-smoke.mjs` validates the generic kit identity, schedule ordering, active count cap, active ring window, completion, and settled/pending/active counts.

It does not yet validate the live `sequential-ring-v5` profile, no-gap ring parity, live part counts, total build seconds, construct event idempotency, scenario bootstrap gating, or legacy `GameHost` diagnostic shape.

## Interaction loop

### Current player loop

```txt
open index.html
  -> see Phantom Command menu
  -> click Start / Open Scene
  -> route to game.html
  -> watch stone rings assemble around the Grim Reaper Totem
  -> pan with WASD / arrows
  -> zoom with wheel
  -> optionally skip with Space / Skip
  -> optionally restart with R / Restart
  -> finish when phase becomes command online
```

### Current runtime loop

```txt
load game.html
  -> import Three.js
  -> create renderer, scene, fog, lights, camera, HUD, materials, and input state
  -> define sequential-ring-v5 constants inline
  -> compute ring descriptors inline
  -> compute ring part counts with circumference heuristic
  -> create wedge meshes and seam markers
  -> create center disc, totem, and commander placeholder
  -> construct(seq) interpolates each piece by delay and local progress
  -> updatePan(dt) mutates camera target from keyboard input
  -> frame(ms) updates construct, camera, animated props, and renderer
  -> window.GameHost.getState() reports construct-only state
```

### Target source-authority loop

```txt
load PHANTOM_COMMAND_CONSTRUCT_PROFILES.sequential-ring-v5
  -> normalize construct profile constants
  -> derive ring descriptors
  -> derive piece descriptors
  -> derive delay descriptors
  -> derive settle descriptors
  -> derive transition margin descriptors
  -> prove descriptor parity with current game.html output
  -> hand descriptors back into current visual runtime without changing visuals
```

### Target construct event loop

```txt
construct state reaches all pieces settled
  -> emit ConstructEventEnvelope(type=construct_complete)
  -> reduce ConstructEventResult
  -> accept first completion
  -> append ConstructEventJournal entry
  -> project ConstructSnapshot
  -> reject duplicate construct_complete with duplicate_construct_complete
```

### Target scenario bootstrap loop

```txt
request scenario_001_raise_the_host bootstrap
  -> preflight against ConstructSnapshot
  -> reject if construct is incomplete with construct_incomplete
  -> accept once after construct completion
  -> append ScenarioBootstrapJournal entry
  -> project ScenarioBootstrapSnapshot with RTS boundary placeholders
  -> reject duplicate bootstrap with duplicate_scenario_bootstrap
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

### Fixture and replay domains

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

## Services in use

### Static and runtime services

```txt
serve index.html menu route
serve game.html game route
route Start / Open Scene to game.html
build static output with node scripts/build-static.mjs
load Three.js module from CDN
create WebGLRenderer
create scene, fog, ambient light, directional lights, and camera
create HUD DOM references
create material palette
create input state
handle keydown, keyup, blur, wheel, skip, restart, and resize
animate frame loop through requestAnimationFrame
render scene each frame
```

### Inline construct services

```txt
define live construct constants
compute ring widths and outer radii
compute zero-gap ring sequence
compute ring part counts from circumference
create wedge geometry
create seam geometry
create piece start/final transforms
create piece delay values
interpolate radial travel
interpolate vertical drop
interpolate rotation
count completed pieces
derive progress ratio
set construct phase text
mutate progress bar width
mutate HUD count and status
compute total build seconds
```

### Current GameHost services

```txt
skipConstruct()
restartConstruct()
getState()
```

`getState()` currently reports:

```txt
buildId
phase
progress
pieces
rings
ringParts
ringGaps
animation.prewarmSeconds
animation.moveSeconds
animation.ringStagger
animation.partStagger
animation.ringGapBase
animation.ringGapGrowth
animation.totalBuildTime
```

### Current generic kit services

```txt
create generic construct piece ids
create generic construct schedules
install pieces into construct kit state
reset construct kit state
update construct kit time
activate ready pieces
settle active pieces
report current snapshot
return ordered schedule
return active / settled / pending pieces
return newly active / newly settled pieces
return per-piece progress
return per-piece status
```

### Current smoke services

```txt
assert construct-spiral-intro-kit id
assert construct-spiral-intro domain path
install generated ring pieces
assert schedule ordering
advance kit until complete
assert active count cap
assert active ring window
assert all pieces settle
```

### Needed next services

```txt
own sequential-ring-v5 profile outside game.html
normalize profile values
emit serializable ring descriptors
emit serializable piece descriptors
emit serializable delay descriptors
emit serializable settle descriptors
emit serializable ring transition margins
prove no-gap parity
prove ring part count parity
prove 92-piece parity
prove 31.915-second total-build parity
prove positive inner-first margins
wrap construct completion in event envelopes
return accepted/rejected ConstructEventResult records
reject duplicate construct completion deterministically
append construct event journal entries
project ConstructSnapshot without DOM, canvas, or Three.js
preflight scenario bootstrap from ConstructSnapshot
return accepted/rejected ScenarioBootstrapResult records
reject bootstrap before completion deterministically
reject duplicate bootstrap deterministically
project ScenarioBootstrapSnapshot without RTS implementation coupling
expand GameHost diagnostics additively
run DOM-free fixture scripts
```

## Kits

### Implemented kits

| Kit | Status | Services |
| --- | --- | --- |
| `construct-spiral-intro-kit` | implemented, keep generic | piece ids, schedule, install, reset, update, snapshot, schedule readback, active/settled/pending queries, newly active/settled queries, per-piece progress/status |
| `construct-spiral-intro-kit-smoke` | implemented generic regression guard | identity assertion, domain assertion, generated piece install, schedule ordering, completion, active cap, active ring window |

### Inline runtime kits to extract

| Inline kit | Current owner | Extraction target |
| --- | --- | --- |
| `inline-sequential-ring-v5-profile` | `game.html` constants | `phantom-command-source-construct-profile-kit` |
| `inline-ring-descriptor-runtime` | `game.html` ring loop | `phantom-command-ring-descriptor-kit` |
| `inline-piece-descriptor-runtime` | `game.html makePiece()` | `phantom-command-piece-descriptor-kit` |
| `inline-piece-delay-runtime` | `game.html delay math` | `phantom-command-piece-delay-policy-kit` |
| `inline-piece-settle-runtime` | `game.html construct()` local progress | `phantom-command-piece-settle-policy-kit` |
| `inline-wedge-geometry-runtime` | `game.html wedge()` | deferred visual geometry kit |
| `inline-construct-animation-runtime` | `game.html construct()` | deferred animation projection kit after descriptor parity |
| `inline-construct-hud-runtime` | `game.html HUD mutation` | host diagnostics projection kit |
| `inline-camera-navigation-runtime` | `game.html updatePan()` and `frame()` | deferred camera input kit |
| `inline-gamehost-construct-runtime` | `window.GameHost` | `phantom-command-gamehost-construct-diagnostics-kit` |

### Next-cut kits

| Kit | Purpose | Services |
| --- | --- | --- |
| `phantom-command-source-construct-profile-kit` | source-own `sequential-ring-v5` | profile constants, profile normalization, profile fingerprint, source snapshot |
| `phantom-command-ring-descriptor-kit` | derive live-compatible rings | inner radius, outer radius, width, gap, part count, ring index |
| `phantom-command-piece-descriptor-kit` | derive live-compatible pieces | piece id, ring index, part index, parts per ring, angle, span, mid radius, deterministic seed |
| `phantom-command-piece-delay-policy-kit` | source-own delay math | delay seconds, ring stagger, part stagger, first/last start |
| `phantom-command-piece-settle-policy-kit` | source-own settle math | move seconds, settle seconds, first/last settle |
| `phantom-command-inner-first-timeline-contract-kit` | prove ring sequencing | transition margins, no-overlap assertions, failure reasons |
| `phantom-command-profile-parity-report-kit` | compare descriptors to live contract | build id, ring count, part counts, gaps, total pieces, total build seconds |
| `phantom-command-construct-event-envelope-kit` | command/event wrapper | event id, type, source, sequence, timestamp, payload |
| `phantom-command-construct-event-result-kit` | result contract | accepted/rejected status, reason, state diff, journal entry |
| `phantom-command-construct-event-reducer-kit` | reduce construct events | complete-once reducer, duplicate rejection |
| `phantom-command-construct-event-journal-kit` | durable replay record | append-only accepted/rejected construct event records |
| `phantom-command-construct-snapshot-contract-kit` | DOM-free construct projection | build id, progress, counts, rings, descriptors, completion, journal counters |
| `phantom-command-scenario-bootstrap-preflight-kit` | scenario legality check | incomplete rejection, completed acceptance, duplicate rejection |
| `phantom-command-scenario-bootstrap-result-kit` | scenario result envelope | accepted/rejected status, reason, scenario id, state diff |
| `phantom-command-scenario-bootstrap-gate-kit` | scenario state transition | idle to bootstrapped, duplicate guard |
| `phantom-command-scenario-bootstrap-snapshot-kit` | RTS boundary placeholder | selected scenario id, mode, placeholder domains, journal counters |
| `phantom-command-gamehost-construct-diagnostics-kit` | additive host diagnostics | profile snapshot, parity report, construct snapshot, scenario bootstrap snapshot |
| `phantom-command-fixture-script-runner-kit` | test harness | fixture execution, pass/fail summary, JSON diagnostics |
| `phantom-command-construct-profile-parity-fixture-kit` | profile fixture | live constant parity assertions |
| `phantom-command-ring-descriptor-parity-smoke-kit` | ring fixture | ten rings, no gaps, part counts |
| `phantom-command-piece-descriptor-parity-smoke-kit` | piece fixture | 92 pieces, stable ids, angle/span data |
| `phantom-command-inner-first-timeline-smoke-kit` | timing fixture | 31.915 seconds, positive margins |
| `phantom-command-construct-event-reducer-smoke-kit` | event fixture | accept first complete, reject duplicate |
| `phantom-command-construct-snapshot-smoke-kit` | snapshot fixture | serializable snapshot, counts, completion flags |
| `phantom-command-scenario-bootstrap-gate-smoke-kit` | bootstrap fixture | reject before complete, accept after complete, reject duplicate |
| `phantom-command-gamehost-diagnostics-smoke-kit` | host fixture | additive diagnostics without breaking legacy surface |

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

## Source seams

### Highest-risk seams

```txt
game.html is the only live owner of sequential-ring-v5 constants
game.html ring math is not serialized as descriptors
game.html piece math is not serialized as descriptors
completion is phase mutation, not an idempotent result
scenario bootstrap does not exist yet as a typed state transition
GameHost has no parity report or scenario snapshot
generic construct kit smoke does not cover live PhantomCommand construct profile
```

### Safe extraction boundaries

```txt
Extract profile constants first.
Derive descriptors beside the current runtime first.
Compare descriptors to current inline output before replacing visuals.
Add event/result reducers without changing the frame loop.
Expose new GameHost diagnostics additively.
Add DOM-free fixtures before creating RTS commands.
```

## Next implementation slice

```txt
PhantomCommand Descriptor Fixture Matrix + Bootstrap Result Gate
```

### Goal

Preserve the current menu and `game.html` visuals while creating source-owned `sequential-ring-v5` descriptors, parity reports, construct completion results, scenario bootstrap results, additive GameHost diagnostics, and DOM-free fixture coverage.

### Build checklist

- [ ] Keep `index.html` unchanged as the menu shell.
- [ ] Keep the current `game.html` visual output and controls unchanged.
- [ ] Add `src/kits/phantom-command-source-construct-profile-kit/index.js`.
- [ ] Move the live `sequential-ring-v5` constants into a frozen profile object.
- [ ] Export a profile fingerprint and source snapshot.
- [ ] Add `src/kits/phantom-command-ring-descriptor-kit/index.js`.
- [ ] Reproduce ten rings, zero gaps, live widths, and live part counts.
- [ ] Add `src/kits/phantom-command-piece-descriptor-kit/index.js`.
- [ ] Emit stable piece ids, ring indices, part indices, part counts, angle/span data, mid radius, and deterministic seed data.
- [ ] Add delay and settle policy helpers.
- [ ] Compute first start, last start, first settle, last settle, and margin seconds for every ring transition.
- [ ] Add a profile parity report.
- [ ] Assert `buildId === sequential-ring-v5`.
- [ ] Assert ring count `10`.
- [ ] Assert gaps are all `0`.
- [ ] Assert part counts `[5,5,5,5,6,8,10,12,16,20]`.
- [ ] Assert total piece count `92`.
- [ ] Assert total build seconds `31.915`.
- [ ] Assert every ring transition has a positive margin.
- [ ] Add `ConstructEventEnvelope`.
- [ ] Add `ConstructEventResult`.
- [ ] Add construct completion reducer.
- [ ] Accept the first `construct_complete` event.
- [ ] Reject duplicate completion with `duplicate_construct_complete`.
- [ ] Append construct event journal records.
- [ ] Add serializable `ConstructSnapshot`.
- [ ] Add scenario bootstrap preflight.
- [ ] Reject scenario bootstrap before completion with `construct_incomplete`.
- [ ] Accept `scenario_001_raise_the_host` after completion.
- [ ] Reject duplicate bootstrap with `duplicate_scenario_bootstrap`.
- [ ] Add serializable `ScenarioBootstrapSnapshot` with RTS placeholders only.
- [ ] Extend `window.GameHost.getState()` additively with profile/parity/snapshot diagnostics.
- [ ] Keep `skipConstruct`, `restartConstruct`, and current `getState` fields compatible.
- [ ] Add DOM-free fixture scripts for profile, ring, piece, timeline, construct event, construct snapshot, scenario bootstrap, and GameHost diagnostics.
- [ ] Keep full RTS gameplay deferred until the fixture matrix passes.

## Acceptance checks

```txt
index.html still routes to game.html
game.html still shows sequential-ring-v5 construct
Space still skips construct
R still restarts construct
Skip button still skips construct
Restart button still restarts construct
window.GameHost.skipConstruct still exists
window.GameHost.restartConstruct still exists
window.GameHost.getState still exists
profile parity fixture passes
ring descriptor parity fixture passes
piece descriptor parity fixture passes
inner-first timeline fixture passes
construct event reducer fixture passes
construct snapshot fixture passes
scenario bootstrap gate fixture passes
GameHost diagnostics smoke passes
no DOM, browser, canvas, or Three.js required for fixture matrix
```

## What not to do next

```txt
Do not build full RTS gameplay yet.
Do not replace the visible construct renderer until descriptor parity is proven.
Do not overload construct-spiral-intro-kit with Phantom-specific constants.
Do not remove the legacy GameHost fields.
Do not add scenario commands until bootstrap result parity exists.
```

## Validation status

No runtime source files were changed during this documentation pass.

No local build or smoke test was run during this documentation pass.
