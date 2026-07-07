# PhantomCommand Project Breakdown

**Run timestamp:** `2026-07-07T14:00:18-04:00`

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Default branch:** `main`

**Selected because:** the central `LuminaryLabs-Dev/LuminaryLabs` Publish ledger showed `PhantomCommand` as the oldest eligible tracked non-Cavalry repo by latest review timestamp. `LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

## Summary

`PhantomCommand` is a static Vite / Three.js publish repo for a single-player PvE undead RTS prototype. The repo currently exposes a menu at `index.html` and a live proof scene at `game.html`.

The live proof is `sequential-ring-v5`: ten contiguous no-gap stone rings assemble around a Grim Reaper Totem, with panning, zoom, skip, restart, HUD progress, and a construct-only `window.GameHost`. The design docs and config folders are copied into the static build, but the runtime still concentrates the live construct profile, descriptor math, geometry creation, animation timing, input, camera, HUD, and snapshot surface inside one inline module in `game.html`.

This run keeps the previous construct parity direction and refines the next implementation slice into **Construct Source Profile + Scenario Bootstrap Gate Fixture**. The immediate goal is not broad RTS gameplay. The goal is to make the opening construct source-authoritative, prove it through DOM-free parity fixtures, then add a hard gate that allows scenario bootstrap only after a valid construct completion event.

## Source read

Reviewed files:

```txt
README.md
package.json
index.html
game.html
scripts/build-static.mjs
src/kits/construct-spiral-intro-kit/index.js
.agent/README.md
.agent/kit-registry.json
```

Current source facts:

```txt
package.json
  -> type: module
  -> scripts: start, dev, build, preview
  -> build command: node scripts/build-static.mjs

scripts/build-static.mjs
  -> clears dist
  -> copies index.html, game.html, docs, and config when present

index.html
  -> static main menu
  -> Start button routes to game.html
  -> Open Scene link routes to game.html

game.html
  -> imports Three.js from CDN
  -> BUILD_ID sequential-ring-v5
  -> RING_COUNT 10
  -> RING_GAP_BASE 0
  -> RING_GAP_GROWTH 0
  -> MOVE_SECONDS 2.0
  -> RING_STAGGER 3.25
  -> PART_STAGGER .035
  -> PREWARM_SECONDS .55
  -> creates ring descriptors inline
  -> creates wedge pieces inline
  -> animates parts inline
  -> exposes window.GameHost.skipConstruct, restartConstruct, and getState

construct-spiral-intro-kit
  -> implemented generic sequence kit
  -> domain path n:sequence:construct:spiral-intro
  -> creates spiral schedule from piece descriptors
  -> updates pending / active / settled states
  -> emits generic sequence snapshots
```

## Interaction loop

### Current player loop

```txt
open index.html
  -> view Phantom Command menu
  -> click Start or Open Scene
  -> load game.html
  -> Three.js CDN module imports
  -> renderer / scene / camera / lights / fog initialize
  -> inline sequential-ring-v5 constants initialize
  -> contiguous ring descriptors are computed inline
  -> wedge meshes and seams are created inline
  -> Grim Reaper Totem and Phantom Commander props spawn
  -> requestAnimationFrame starts
  -> ring pieces animate inward and downward
  -> user can pan with WASD / arrows
  -> user can zoom with wheel
  -> user can Space / Skip to complete construct
  -> user can R / Restart to restart construct
  -> HUD shows progress, count, phase, and build id
  -> window.GameHost.getState returns construct-only state
  -> phase becomes command online
```

### Target product loop

```txt
open menu
  -> choose start
  -> load construct source profile
  -> emit canonical ring descriptors
  -> emit canonical piece descriptors
  -> compute inner-first timeline guards
  -> run construct intro from source descriptors
  -> emit ConstructSnapshot frames
  -> emit construct_complete event exactly once
  -> scenario bootstrap gate validates construct_complete
  -> load scenario_001_raise_the_host config
  -> compose ScenarioBootstrapSnapshot
  -> enter scenario_active mode
  -> select starter undead
  -> construct Grave Harvester / Bone Pit
  -> tick economy, waves, commands, combat, XP, unlocks, win/loss
```

### Recommended service loop

```txt
source construct profile service
  -> ring descriptor service
  -> piece descriptor service
  -> inner-first timeline guard service
  -> construct snapshot projector
  -> construct event journal
  -> construct completion gate
  -> scenario bootstrap gate
  -> scenario snapshot projector
  -> GameHost diagnostics service
  -> DOM-free construct/scenario fixture harness
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
wedge-geometry-generation
stone-material-detail
construct-animation-timeline
inner-first-timeline-contract
ring-settle-boundary-policy
construct-completion-event
construct-snapshot-contract
construct-event-journal
construct-fixture-parity
construct-smoke-testing
camera-navigation
keyboard-pan-input
button-input
wheel-zoom-input
hud-diagnostics
gamehost-authority
mode-state-machine
scenario-bootstrap-gate
scenario-config-loading
scenario-state-composition
scenario-snapshot-contract
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

## Services the kits offer

### Current services

```txt
construct-spiral-intro-kit
  -> createConstructSpiralIntroPieceId(piece)
  -> createConstructSpiralIntroSchedule(pieces, config)
  -> createConstructSpiralIntroKit(options)
  -> installPieces(pieces)
  -> reset()
  -> update(dt)
  -> snapshot()
  -> schedule()
  -> activePieces()
  -> settledPieces()
  -> pendingPieces()
  -> newlyActivePieces()
  -> newlySettledPieces()
  -> getPieceProgress(pieceId)
  -> getPieceStatus(pieceId)

game.html inline construct runtime
  -> build sequential-ring-v5 constants
  -> build ring descriptors
  -> build wedge geometry
  -> build construct pieces
  -> animate piece construction
  -> update pan and zoom
  -> skipConstruct()
  -> restartConstruct()
  -> getState()
```

### Required next services

```txt
phantom-command-source-construct-profile-kit
  -> getSequentialRingV5Profile()
  -> validateBuildId()
  -> validateRingCount()
  -> validateNoGapPolicy()
  -> validateTimingPolicy()
  -> exportProfileConstants()

phantom-command-ring-descriptor-kit
  -> computeRingWidths(profile)
  -> computeRingRadii(profile)
  -> computeRingPartCounts(profile)
  -> emitRingDescriptors(profile)
  -> assertRingDescriptorParity(liveExpected)

phantom-command-piece-descriptor-kit
  -> emitPieceDescriptors(profile, rings)
  -> emitPieceIds(ring, part)
  -> emitPieceAngles(ring)
  -> emitPieceSeeds(ring, part)
  -> assertPieceCountParity()

phantom-command-inner-first-timeline-contract-kit
  -> computePieceDelay(piece)
  -> computeRingFirstStart(ring)
  -> computeRingLastStart(ring)
  -> computeRingFirstSettle(ring)
  -> computeRingLastSettle(ring)
  -> computeOuterStartMarginSeconds(innerRing, outerRing)
  -> assertInnerSettlesBeforeOuterStarts()
  -> emitTimelineGuards()

phantom-command-construct-snapshot-contract-kit
  -> serializeConstructSnapshot(state)
  -> serializeRingProjection(rings)
  -> serializePieceProjection(pieces)
  -> serializeTimelineGuards(guards)
  -> assertSnapshotShape(snapshot)

phantom-command-construct-event-journal-kit
  -> appendConstructEvent(event)
  -> rejectDuplicateConstructComplete()
  -> summarizeConstructEvents()
  -> exposeJournalSnapshot()

phantom-command-scenario-bootstrap-gate-kit
  -> acceptConstructComplete(event)
  -> rejectEarlyScenarioBootstrap(reason)
  -> loadScenarioConfigAfterGate()
  -> emitScenarioBootstrapResult()

phantom-command-gamehost-diagnostics-kit
  -> getConstructSnapshot()
  -> getScenarioSnapshot()
  -> getDiagnostics()
  -> getFixtureSummary()
```

## Kits

### Implemented kits

```txt
construct-spiral-intro-kit
construct-spiral-intro-kit-smoke
```

### Live inline kits implied by `game.html`

```txt
sequential-ring-v5-profile-kit
inline-ring-descriptor-kit
inline-piece-descriptor-kit
inline-wedge-geometry-kit
inline-construct-animation-kit
inline-construct-hud-kit
inline-camera-navigation-kit
inline-construct-gamehost-kit
grim-reaper-totem-object-kit
phantom-commander-object-kit
```

### Next-cut kits

```txt
phantom-command-source-construct-profile-kit
phantom-command-ring-descriptor-kit
phantom-command-piece-descriptor-kit
phantom-command-inner-first-timeline-contract-kit
phantom-command-ring-settle-boundary-kit
phantom-command-construct-snapshot-contract-kit
phantom-command-construct-event-journal-kit
phantom-command-construct-completion-event-kit
phantom-command-scenario-bootstrap-gate-kit
phantom-command-scenario-bootstrap-snapshot-kit
phantom-command-gamehost-diagnostics-kit
phantom-command-construct-profile-parity-fixture-kit
phantom-command-live-ring-descriptor-smoke-kit
phantom-command-inner-first-timeline-smoke-kit
phantom-command-construct-snapshot-smoke-kit
phantom-command-scenario-bootstrap-gate-smoke-kit
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

- The repo is deployable as a static app: `package.json` runs `node scripts/build-static.mjs`, and the build script copies `index.html`, `game.html`, `docs`, and `config` into `dist`.
- The main menu is clean and stable, but it only routes to the proof scene.
- The live scene already implements the visual rule the user cares about: zero physical ring gaps and inner rings completing before outer rings begin.
- The live proof is not source-authoritative yet because the canonical `sequential-ring-v5` constants live inline in `game.html`.
- The generic `construct-spiral-intro-kit` is useful but intentionally not equivalent to the live ring proof. Its schedule is spiral/window based, while the proof needs strict inner-first ring sequencing.
- `window.GameHost` is construct-only and should not be expanded into RTS state until construct snapshots and scenario bootstrap gating are fixture-proven.
- The next useful docs/source split is not render extraction. It is source profile parity, timeline guard parity, construct snapshot shape, and scenario gate result metadata.

## Recommended next work

Next slice:

```txt
PhantomCommand Construct Source Profile + Scenario Bootstrap Gate Fixture Cutover
```

Build order:

```txt
1. Preserve current index.html and game.html behavior.
2. Add phantom-command-source-construct-profile-kit with the exact live sequential-ring-v5 constants.
3. Keep BUILD_ID as sequential-ring-v5.
4. Add phantom-command-ring-descriptor-kit and reproduce ten contiguous no-gap rings.
5. Add phantom-command-piece-descriptor-kit and reproduce live ids, angles, spans, seeds, part counts, and total pieces.
6. Add phantom-command-inner-first-timeline-contract-kit.
7. Assert ring[N].firstStart >= ring[N-1].lastSettle for every outer ring.
8. Emit transition margin diagnostics for every adjacent ring pair.
9. Add phantom-command-construct-snapshot-contract-kit.
10. Project buildId, phase, progress, complete, ringDescriptors, pieceCounts, totalPieces, timelineGuards, and eventJournal counts.
11. Add phantom-command-construct-event-journal-kit.
12. Emit construct_complete exactly once when all pieces settle or skip completes the construct.
13. Add phantom-command-scenario-bootstrap-gate-kit.
14. Reject scenario bootstrap before a valid construct_complete event.
15. Accept scenario bootstrap after construct_complete and emit ScenarioBootstrapResult.
16. Add DOM-free smoke fixtures for profile parity, ring descriptor parity, timeline guards, construct snapshot shape, duplicate completion rejection, early bootstrap rejection, and post-completion bootstrap acceptance.
17. Extend GameHost only after the source fixtures pass.
18. Defer RTS selection, unit commands, buildings, economy, waves, and combat until scenario bootstrap has deterministic snapshot parity.
```

## Acceptance targets

```txt
- Current menu still loads game.html.
- Current visual construct behavior is unchanged.
- Source profile matches live constants.
- Ring counts remain [5, 5, 5, 5, 6, 8, 10, 12, 16, 20].
- Total live construct piece count remains 92.
- Every ring gap is zero.
- Every outer ring starts after the previous inner ring can settle.
- Timeline guard diagnostics expose marginSeconds for every adjacent ring transition.
- ConstructSnapshot shape is stable and serializable.
- construct_complete fires exactly once.
- Scenario bootstrap is rejected before construct_complete.
- Scenario bootstrap is accepted after construct_complete.
- GameHost diagnostics remain construct-safe until scenario fixture parity exists.
```

## Validation note

No runtime source code changed in this run. No local build or smoke test was executed because this was a documentation-only breakdown pass through the GitHub connector.
