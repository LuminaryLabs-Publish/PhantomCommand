# PhantomCommand Project Breakdown

**Run timestamp:** `2026-07-07T15-19-05-04-00`

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Selected next slice:** `Construct Descriptor Authority + Completion Event Fixture Cutover`

## Selection note

`LuminaryLabs-Publish/PhantomCommand` was selected because the central `LuminaryLabs-Dev/LuminaryLabs` ledger showed it as the oldest eligible non-Cavalry Publish repo by latest review timestamp.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

Latest central ledger timestamps checked:

```txt
PhantomCommand   2026-07-07T14:00:18-04:00
PrehistoricRush  2026-07-07T14:11:48-04:00
MyCozyIsland     2026-07-07T14:21:20-04:00
IntoTheMeadow    2026-07-07T14:28:17-04:00
ZombieOrchard    2026-07-07T14:40:17-04:00
HorrorCorridor   2026-07-07T14:51:44-04:00
TheOpenAbove     2026-07-07T15:11:23-04:00
AetherVale       2026-07-07T16-29-18-04-00
```

## Reviewed files

```txt
README.md
package.json
index.html
game.html
src/kits/construct-spiral-intro-kit/index.js
tests/construct-spiral-intro-kit-smoke.mjs
.agent/README.md
.agent/kit-registry.json
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/PhantomCommand.md
```

## Current read

`PhantomCommand` is a static Vite / Three.js publish repo for a single-player PvE undead RTS prototype.

The current user-facing app is two pages:

```txt
index.html -> menu route
game.html  -> opening construct proof scene
```

`index.html` is a clean menu shell. It displays the single-player PvE RTS positioning and sends Start / Open Scene to `game.html`.

`game.html` is still the live runtime authority. It imports Three.js from CDN, defines the `sequential-ring-v5` constants inline, computes ten zero-gap rings inline, generates wedge geometry inline, creates the Grim Reaper Totem and Phantom Commander objects inline, handles pan / zoom / skip / restart, updates HUD fields, and exposes a construct-only `window.GameHost`.

The implemented `construct-spiral-intro-kit` remains useful as a generic sequence kit. It provides schedule/install/reset/update/snapshot services, pending/active/settled piece queries, and piece progress/status helpers. Its default scheduling model is still spiral/window based, not the live `sequential-ring-v5` no-gap inner-first proof. Keep it as a generic regression guard instead of forcing it to become the live construct authority.

## Current interaction loop

```txt
load index.html
  -> display Phantom Command menu
  -> click Start or Open Scene
  -> route to game.html
  -> import Three.js from CDN
  -> create renderer, scene, fog, camera, lights, materials, HUD, and input state inline
  -> define sequential-ring-v5 constants inline
  -> compute ten contiguous zero-gap rings inline
  -> compute live ring part counts inline
  -> create wedge meshes, seams, center disc, Grim Reaper Totem, and Phantom Commander inline
  -> schedule each piece by ringIndex * RING_STAGGER + partIndex * PART_STAGGER
  -> animate pieces from raised outer starts into final ring positions
  -> user can pan, zoom, skip, or restart
  -> HUD exposes constructed count, phase, build id, and progress bar
  -> window.GameHost exposes skipConstruct, restartConstruct, and getState
  -> phase becomes command online when all pieces settle
```

## Intended player loop

```txt
enter Phantom Command
  -> start the ritual construct scene
  -> watch inner rings finish before outer rings begin
  -> reach command platform online
  -> construct_complete event emits exactly once
  -> scenario bootstrap becomes legal only after completion
  -> scenario_001_raise_the_host becomes active
  -> command starter undead around the Grim Reaper Totem
  -> build first economy structures
  -> hold radial pressure lanes
  -> clear the first militia camp
  -> unlock the next Necropolis layer
```

## Recommended service loop

```txt
menu route
  -> construct source profile service
  -> ring descriptor service
  -> piece descriptor service
  -> timeline guard service
  -> construct reducer / event service
  -> construct snapshot projector
  -> GameHost construct diagnostics
  -> DOM-free descriptor and completion fixture smoke
  -> scenario bootstrap gate
  -> scenario bootstrap snapshot
  -> deferred RTS runtime services
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
wedge-geometry-generation
stone-material-detail
construct-animation-timeline
inner-first-timeline-contract
ring-settle-boundary-policy
construct-reducer
construct-event-envelope
construct-completion-event
construct-completion-idempotency
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

## Services that kits offer

### Implemented source-backed services

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

construct-spiral-intro-kit-smoke
  -> assert kit id and domain path
  -> install generated ring pieces
  -> assert schedule ordering
  -> tick until complete
  -> assert active count cap
  -> assert active ring window
  -> assert all pieces settle
```

### Live inline services

```txt
game.html runtime
  -> load Three.js from CDN
  -> create renderer / scene / camera / fog / lights
  -> create material palette
  -> compute sequential-ring-v5 constants
  -> compute ring widths and no-gap radii
  -> compute ringParts(inner, outer)
  -> generate wedge geometry
  -> create each ring piece group
  -> create seam meshes
  -> create center disc
  -> create Grim Reaper Totem
  -> create Phantom Commander object
  -> animate construct pieces
  -> compute progress and phase
  -> update HUD
  -> process keyboard pan
  -> process mouse wheel zoom
  -> skip construct
  -> restart construct
  -> expose construct-only GameHost state
```

### Target next services

```txt
phantom-command-source-construct-profile-kit
  -> getSequentialRingV5Profile()
  -> exportConstructConstants()
  -> validateProfileBuildId()
  -> validateRingCount()
  -> validateNoGapProfile()
  -> validateTimingProfile()

phantom-command-ring-descriptor-kit
  -> computeRingWidths(profile)
  -> computeNoGapRadii(profile)
  -> computeRingPartCounts(profile)
  -> emitRingDescriptors(profile)
  -> assertRingDescriptorParity(liveExpected)

phantom-command-piece-descriptor-kit
  -> emitPieceDescriptors(ringDescriptors, profile)
  -> emitPieceIds()
  -> emitPieceAngles()
  -> emitPieceSeeds()
  -> assertPieceTotal(92)

phantom-command-inner-first-timeline-contract-kit
  -> computePieceDelay(piece, profile)
  -> computeRingFirstStart(ring)
  -> computeRingLastStart(ring)
  -> computeRingFirstSettle(ring)
  -> computeRingLastSettle(ring)
  -> computeOuterStartMarginSeconds(previousRing, nextRing)
  -> assertInnerRingSettlesBeforeOuterRingStarts()
  -> emitTimelineGuards()

phantom-command-construct-event-reducer-kit
  -> acceptPieceSettled(event)
  -> acceptConstructComplete(event)
  -> rejectDuplicateConstructComplete(event)
  -> emitConstructEventEnvelope(event)
  -> summarizeConstructEvents()

phantom-command-construct-snapshot-contract-kit
  -> serializeConstructSnapshot(state)
  -> serializeRingDescriptors()
  -> serializeTimelineGuards()
  -> serializeEventJournalSummary()
  -> assertSnapshotShape()

phantom-command-gamehost-construct-diagnostics-kit
  -> getConstructSnapshot()
  -> getConstructDiagnostics()
  -> getFixtureSummary()
```

## Kits inventory

### Implemented / source-backed

```txt
construct-spiral-intro-kit
construct-spiral-intro-kit-smoke
```

### Live inline / implied

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
phantom-command-construct-event-envelope-kit
phantom-command-construct-event-reducer-kit
phantom-command-construct-completion-event-kit
phantom-command-construct-completion-idempotency-kit
phantom-command-construct-snapshot-contract-kit
phantom-command-gamehost-construct-diagnostics-kit
phantom-command-construct-profile-parity-fixture-kit
phantom-command-live-ring-descriptor-smoke-kit
phantom-command-inner-first-timeline-smoke-kit
phantom-command-construct-event-reducer-smoke-kit
phantom-command-construct-snapshot-smoke-kit
```

### Deferred kits

```txt
phantom-command-scenario-bootstrap-gate-kit
phantom-command-scenario-bootstrap-snapshot-kit
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

- The app is small and Pages-friendly: `package.json` uses Vite for local dev/preview and `node scripts/build-static.mjs` for static build.
- `index.html` should remain the menu shell because it already does the correct route handoff.
- `game.html` is now the main source-authority risk: constants, descriptors, geometry, animation, input, HUD, and host state are all inline.
- The visual proof already meets the user-facing no-gap / inner-first requirement, so the next source change should preserve visuals and extract authority, not redesign the scene.
- The live expected ring part counts remain `[5, 5, 5, 5, 6, 8, 10, 12, 16, 20]` and total pieces remain `92`.
- `construct-spiral-intro-kit` should remain generic. The live proof should get Phantom-specific source profile, descriptor, timeline, event, and snapshot kits layered beside it.
- Scenario bootstrap is still important, but it should wait until construct descriptor and completion-event fixtures pass.

## Recommended next work

Next slice:

```txt
PhantomCommand Construct Descriptor Authority + Completion Event Fixture Cutover
```

Build order:

```txt
1. Preserve current index.html and game.html behavior.
2. Add phantom-command-source-construct-profile-kit.
3. Move sequential-ring-v5 constants into one profile object.
4. Add phantom-command-ring-descriptor-kit.
5. Reproduce ten rings, live ring widths, zero gaps, and live part counts.
6. Add phantom-command-piece-descriptor-kit.
7. Emit stable piece ids, ring indices, part indices, partsPerRing, angle/span data, and deterministic seeds.
8. Add phantom-command-inner-first-timeline-contract-kit.
9. Compute firstStart, lastStart, firstSettle, lastSettle, and marginSeconds for every ring transition.
10. Add phantom-command-construct-event-envelope-kit.
11. Add phantom-command-construct-event-reducer-kit.
12. Emit construct_complete exactly once after every piece is settled.
13. Reject duplicate construct_complete with a stable reason.
14. Add phantom-command-construct-snapshot-contract-kit.
15. Project buildId, descriptors, timelineGuards, progress, phase, complete, totalPieces, and eventJournal counts.
16. Add phantom-command-gamehost-construct-diagnostics-kit.
17. Add DOM-free smokes for source profile parity, ring descriptor parity, piece descriptor parity, timeline guards, completion idempotency, and ConstructSnapshot shape.
18. Keep construct-spiral-intro-kit defaults unchanged.
19. Defer scenario bootstrap, RTS selection, units, buildings, economy, waves, and combat until construct event and snapshot parity pass.
```

Acceptance targets:

```txt
- Menu still routes to game.html.
- Current visual construct behavior remains unchanged.
- Source profile matches live constants.
- Ring counts remain [5, 5, 5, 5, 6, 8, 10, 12, 16, 20].
- Total pieces remain 92.
- All ring gaps remain zero.
- Every outer ring starts after the previous inner ring can settle.
- Construct event envelope has accepted / rejected / reason / eventId / buildId fields.
- construct_complete fires exactly once.
- duplicate construct_complete is rejected with a stable reason.
- ConstructSnapshot is serializable and DOM-free.
- GameHost can expose construct diagnostics without needing renderer internals.
```

## Validation note

No runtime source code changed in this pass. No local build or smoke test was executed because this was a documentation-only breakdown through the GitHub connector.
