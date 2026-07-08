# PhantomCommand DSK / Domain Breakdown

**Timestamp:** `2026-07-08T07:50:47-04:00`

## Selection

`LuminaryLabs-Publish/PhantomCommand` was selected as the single repo for this pass after comparing the accessible `LuminaryLabs-Publish` repo list against the central ledger in `LuminaryLabs-Dev/LuminaryLabs`.

No checked non-Cavalry Publish repo was fully new, central-ledger absent, or missing root `.agent/START_HERE.md` state.

`PhantomCommand` was selected as a fallback follow-up because its last local audit already identified `smooth-ring-handoff-v6`, but the next unresolved proof is narrower: separate construct source parity from scenario bootstrap command authority so the visual construct can hand off to a future RTS slice through explicit results.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded.

## Current route

```txt
index.html
  -> game.html
  -> inline Three.js smooth-ring-handoff-v6 construct proof
```

## Current interaction loop

```txt
open index.html
  -> user sees Phantom Command menu
  -> Start button or Open Scene link routes to game.html
  -> game.html imports Three.js from CDN
  -> inline constants define smooth-ring-handoff-v6
  -> inline ring math derives 10 contiguous rings
  -> inline wedge mesh factory creates 92 stone pieces
  -> requestAnimationFrame calls construct(time - startedAt)
  -> pieces move from raised/radial start poses into ring slots
  -> keyboard and mouse pan/zoom/skip/restart
  -> HUD mutates progress, count, phase, and build id
  -> window.GameHost exposes skipConstruct/restartConstruct/getState
  -> construct reaches command online phase
```

## Current live facts

```txt
BUILD_ID: smooth-ring-handoff-v6
RING_COUNT: 10
RING_GAP_BASE: 0
RING_GAP_GROWTH: 0
MOVE_SECONDS: 2.6
DROP_START_SECONDS: 0.08
RING_HANDOFF: 0.72
PART_STAGGER: 0.025
PREWARM_SECONDS: 0.45
START_RADIUS_MULTIPLIER: 1.38
START_HEIGHT_BASE: 24
ringParts: [5,5,5,5,6,8,10,12,16,20]
totalPieces: 92
totalBuildSeconds: 19.923
```

## Domains in use

### App / route domains

```txt
static-app-shell
main-menu-routing
static-game-route
vite-static-build
github-pages-deploy
legacy-gamehost-compatibility
```

### Render domains

```txt
browser-render-host
webgl-canvas-host
three-render-scene
scene-fog-lighting
stone-material-palette
wedge-geometry-generation
construct-piece-mesh-factory
construct-hud-projection
camera-pan-domain
camera-zoom-domain
camera-orbit-domain
resize-projection-domain
```

### Construct source domains

```txt
smooth-ring-handoff-v6-profile
construct-source-authority
construct-profile-normalization
construct-source-fingerprint
construct-source-snapshot
ring-count-policy
ring-width-policy
ring-growth-policy
no-gap-radius-policy
ring-part-count-policy
ring-descriptor-generation
piece-descriptor-generation
piece-seed-policy
piece-angle-policy
piece-start-pose-policy
piece-final-pose-policy
piece-delay-policy
piece-settle-policy
inner-first-timeline-contract
ring-transition-margin-policy
profile-parity-reporting
```

### Construct command/result domains

```txt
construct-event-envelope
construct-event-result
construct-event-reducer
construct-completion-idempotency
construct-event-journal
construct-snapshot-contract
construct-diagnostics-projection
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
rts-boundary-placeholder
```

### Deferred RTS domains

```txt
undead-roster
necropolis-building
resource-economy
wave-lane
unit-selection
unit-command
movement-request
attack-request
combat-resolution
objective-tracking
progression-unlock
command-journal-replay
```

## Services the kits offer now

### `construct-spiral-intro-kit`

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

The kit is useful as a generic sequencing domain, but it is not yet the live `smooth-ring-handoff-v6` source authority because its default schedule is spiral/window based while the live route uses inline ring handoff timing.

## Implemented kits

```txt
construct-spiral-intro-kit
construct-spiral-intro-kit-smoke
```

## Inline kits to extract

```txt
inline-smooth-ring-handoff-v6-profile
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

## Next local DSK cuts

```txt
phantom-command-smooth-handoff-profile-kit
phantom-command-source-profile-fingerprint-kit
phantom-command-source-profile-snapshot-kit
phantom-command-ring-descriptor-kit
phantom-command-piece-descriptor-kit
phantom-command-piece-delay-policy-kit
phantom-command-piece-settle-policy-kit
phantom-command-handoff-timeline-contract-kit
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
phantom-command-gamehost-diagnostics-adapter-kit
phantom-command-fixture-script-runner-kit
```

## Main architecture finding

The live proof is visually coherent but still has a monolithic authority seam.

`game.html` owns profile facts, descriptor derivation, mesh creation, animation, HUD mutation, input, completion, and `GameHost` state in one inline module.

The next safe implementation is not full RTS gameplay. It is a DOM-free proof chain that turns construct completion and scenario bootstrap into explicit command/result records while preserving the current `index.html -> game.html` surface.
