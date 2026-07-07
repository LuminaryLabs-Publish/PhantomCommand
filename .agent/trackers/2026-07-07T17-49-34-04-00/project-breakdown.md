# PhantomCommand Project Breakdown

**Run timestamp:** `2026-07-07T17-49-34-04-00`

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Default branch:** `main`

**Selected by:** oldest eligible tracked non-Cavalry repo in the central `LuminaryLabs-Dev/LuminaryLabs` ledger.

## Selection ledger

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

Latest eligible timestamps checked before this pass:

```txt
PhantomCommand   2026-07-07T16:30:00-04:00
PrehistoricRush  2026-07-07T16:40:29-04:00
MyCozyIsland     2026-07-07T16:49:08-04:00
IntoTheMeadow    2026-07-07T16:58:09-04:00
ZombieOrchard    2026-07-07T17:10:21-04:00
HorrorCorridor   2026-07-07T17:20:57-04:00
TheOpenAbove     2026-07-07T17:29:51-04:00
AetherVale       2026-07-07T17:38:46-04:00
```

`PhantomCommand` was therefore selected for this run.

## Current repo read

`PhantomCommand` is a static Vite / Three.js publish repo for a single-player PvE undead RTS prototype. The current user-facing flow is still menu-first and proof-scene-first:

```txt
index.html -> game.html -> inline Three.js sequential-ring-v5 construct proof
```

The game route imports Three.js from CDN, builds the renderer, scene, lights, fog, camera, HUD, materials, keyboard state, ring descriptors, wedge geometry, center platform, Grim Reaper Totem, Phantom Commander visual, animation loop, controls, and `window.GameHost` inline in `game.html`.

The live proof is specifically `sequential-ring-v5`:

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

The existing source kit `src/kits/construct-spiral-intro-kit/index.js` is useful but generic. It should stay reusable. It schedules generic construct pieces by spiral ordering, active windows, active piece duration, and ring start steps. It does not yet encode the live Phantom-specific no-gap sequential-ring-v5 ring profile, piece descriptor parity, inner-first margins, construct completion event, scenario bootstrap gate, or RTS boundary snapshot.

## Interaction loop

### Current browser loop

```txt
load index.html
  -> render dark Phantom Command menu
  -> Start button or Open Scene link navigates to game.html
  -> game.html imports Three.js from unpkg
  -> inline runtime creates WebGLRenderer, Scene, Fog, lights, PerspectiveCamera, HUD, materials, and input state
  -> inline constants define sequential-ring-v5 build profile
  -> inline ringParts(inner, outer) computes per-ring part counts
  -> inline loop creates ten contiguous zero-gap rings
  -> makePiece() creates wedge meshes, seam markers, deterministic seed values, final/start transforms, and delays
  -> requestAnimationFrame(frame)
  -> construct(seq) interpolates each piece from start to final transform
  -> HUD updates progress, built count, phase, and status text
  -> WASD/arrows pan, wheel zooms, Space/Skip completes, R/Restart resets
  -> window.GameHost exposes skipConstruct(), restartConstruct(), and getState()
  -> completed state becomes phase='command online'
```

### Target construct authority loop

```txt
load index.html
  -> navigate to game.html
  -> load source-owned sequential-ring-v5 profile
  -> derive serializable ring descriptors
  -> derive serializable piece descriptors
  -> validate no-gap radius continuity
  -> validate live part-count and total-piece parity
  -> validate inner-first timeline margins
  -> drive current visual construct from descriptors without changing the visible scene
  -> emit ConstructEventEnvelope records
  -> reduce construct_complete exactly once
  -> reject duplicate construct_complete with a stable reason
  -> publish ConstructSnapshot through GameHost diagnostics
  -> keep generic construct-spiral-intro-kit behavior unchanged
```

### Target scenario bootstrap loop

```txt
construct_complete accepted
  -> ScenarioBootstrapPreflightResult checks mode, construct completion, scenario id, and duplicate bootstrap status
  -> early bootstrap is rejected with reason construct_incomplete
  -> duplicate bootstrap is rejected with reason duplicate_scenario_bootstrap
  -> post-completion bootstrap is accepted for scenario_001_raise_the_host
  -> ScenarioBootstrapSnapshot serializes the initial RTS boundary only
  -> GameHost exposes construct, scenario bootstrap, and diagnostics snapshots
  -> full RTS units, selection, resources, combat, waves, objectives, XP, and unlocks stay deferred until bootstrap fixtures pass
```

## Domains in use

```txt
static-app-shell
main-menu-routing
vite-static-build
github-pages-deploy
browser-render-host
three-render-scene
inline-construct-runtime
sequential-ring-v5-profile
source-construct-profile
construct-profile-config
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
wedge-geometry-generation
stone-material-detail
construct-animation-timeline
inner-first-timeline-contract
ring-settle-boundary-policy
construct-event-envelope
construct-event-reducer
construct-completion-event
construct-completion-idempotency
construct-event-journal
construct-snapshot-contract
construct-fixture-parity
scenario-bootstrap-preflight
scenario-bootstrap-gate
scenario-bootstrap-snapshot
scenario-config-loading
scenario-state-composition
scenario-mode-state-machine
camera-navigation
keyboard-pan-input
button-input
wheel-zoom-input
hud-diagnostics
gamehost-authority
gamehost-diagnostics
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
idempotency-ledger
command-journal-replay
behavior-smoke-testing
```

## Services captured

### Current runtime services

```txt
serve static menu route
serve static game route
import Three.js from CDN
create renderer, scene, fog, lights, camera, HUD, and materials inline
own pan, zoom, skip, restart, and key state inline
own sequential-ring-v5 constants inline
compute ring widths and radii inline
compute no-gap ring progression inline
compute ring part counts inline
create wedge geometries and seams inline
create center disc, Grim Reaper Totem, and Phantom Commander inline
animate construct pieces by ring and part delay
track progress, phase, completion, total pieces, ring gaps, and animation settings
update HUD progress and status each frame
expose skipConstruct(), restartConstruct(), and getState() through window.GameHost
```

### Current source-kit services

```txt
create generic construct piece ids
create generic spiral intro schedules
install pieces into a construct sequence
reset construct state
advance construct state by dt
emit generic construct snapshots
query pending, active, settled, newly active, and newly settled pieces
query piece progress and status
smoke-test generic construct scheduling behavior
```

### Needed source authority services

```txt
own live sequential-ring-v5 profile outside game.html
export source constants with build id and timing fields
emit ring descriptors from source profile
emit piece descriptors from ring descriptors
prove ten-ring parity
prove zero-gap radius continuity
prove live part-count parity
prove total-piece parity
compute per-ring timeline guards
prove positive inner-first margins
emit ConstructEventEnvelope records
reduce construct_complete exactly once
reject duplicate construct_complete with stable reason duplicate_construct_complete
project ConstructSnapshot without DOM or Three.js dependency
preflight scenario bootstrap requests
reject early bootstrap with stable reason construct_incomplete
accept post-completion bootstrap for scenario_001_raise_the_host
reject duplicate bootstrap with stable reason duplicate_scenario_bootstrap
project ScenarioBootstrapSnapshot
expand GameHost diagnostics without removing existing getState surface
run DOM-free smokes for profile, descriptors, timeline, event idempotency, snapshot shape, and bootstrap gates
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

### Next-cut source/fixture kits

```txt
phantom-command-source-construct-profile-kit
phantom-command-ring-descriptor-kit
phantom-command-piece-descriptor-kit
phantom-command-piece-delay-policy-kit
phantom-command-inner-first-timeline-contract-kit
phantom-command-ring-settle-boundary-kit
phantom-command-construct-event-envelope-kit
phantom-command-construct-event-reducer-kit
phantom-command-construct-completion-event-kit
phantom-command-construct-completion-idempotency-kit
phantom-command-construct-event-journal-kit
phantom-command-construct-snapshot-contract-kit
phantom-command-scenario-bootstrap-preflight-kit
phantom-command-scenario-bootstrap-gate-kit
phantom-command-scenario-bootstrap-snapshot-kit
phantom-command-gamehost-construct-diagnostics-kit
phantom-command-construct-profile-parity-fixture-kit
phantom-command-live-ring-descriptor-smoke-kit
phantom-command-inner-first-timeline-smoke-kit
phantom-command-construct-event-reducer-smoke-kit
phantom-command-construct-snapshot-smoke-kit
phantom-command-scenario-bootstrap-gate-smoke-kit
phantom-command-gamehost-diagnostics-smoke-kit
```

### Deferred RTS/gameplay kits

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

## Key findings

- `game.html` is still the true runtime authority for the construct scene.
- `sequential-ring-v5` constants are not yet source-owned outside the browser scene.
- The visual proof has strong source facts: ten rings, zero gaps, 92 pieces, and a stable total build time.
- `construct-spiral-intro-kit` is generic and should remain generic; a Phantom-specific profile/descriptors layer should sit beside it.
- The live no-gap inner-first profile cannot be proven by the generic kit smoke.
- `window.GameHost.getState()` exposes useful high-level facts, but not a serializable ConstructSnapshot or scenario bootstrap state.
- Completion is currently a boolean in the frame loop, not an event envelope with idempotency semantics.
- Scenario bootstrap should not start until construct completion can be proven through source-owned snapshots.
- Full RTS work should wait until the construct and bootstrap gates are fixture-readable.

## Recommended next work

1. Preserve current `index.html` and `game.html` behavior.
2. Add a source-owned `sequential-ring-v5` profile module.
3. Extract ring descriptor generation from the inline runtime into a DOM-free service.
4. Extract piece descriptor generation from the inline runtime into a DOM-free service.
5. Add descriptor parity smoke for ring counts, part counts, total pieces, widths, and zero gaps.
6. Add inner-first timeline contract smoke.
7. Add construct event envelope and reducer contracts.
8. Emit `construct_complete` once and reject duplicate completion.
9. Add ConstructSnapshot projection.
10. Add ScenarioBootstrapPreflightResult and ScenarioBootstrapSnapshot.
11. Expand `window.GameHost` with construct/scenario diagnostics while preserving existing calls.
12. Add DOM-free fixture coverage before moving to RTS unit selection or economy.

## Suggested next vertical slice

**Build target:** `PhantomCommand Scenario Bootstrap Snapshot + RTS Boundary Fixture Lock`

```txt
preserve current menu and game visuals
  -> source-own sequential-ring-v5 profile
  -> derive ring descriptors and piece descriptors from source modules
  -> assert ten rings, zero gaps, [5,5,5,5,6,8,10,12,16,20], and 92 total pieces
  -> assert positive inner-first timing margins
  -> add ConstructEventEnvelope and ConstructEventReducer
  -> emit construct_complete exactly once
  -> reject duplicate construct_complete
  -> add ConstructSnapshot
  -> add ScenarioBootstrapPreflightResult
  -> reject scenario bootstrap before completion
  -> accept scenario_001_raise_the_host after completion
  -> reject duplicate bootstrap
  -> add ScenarioBootstrapSnapshot with RTS boundary placeholders only
  -> expose GameHost diagnostics for construct and scenario bootstrap
  -> add DOM-free smoke fixtures
  -> keep full RTS gameplay deferred until these fixtures pass
```

## Validation status

No runtime source code changed in this pass.

No local build or smoke test was run in this pass.
