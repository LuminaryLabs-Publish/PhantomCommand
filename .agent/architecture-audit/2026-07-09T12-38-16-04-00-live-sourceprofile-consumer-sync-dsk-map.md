# PhantomCommand Architecture Audit: Live SourceProfile Consumer Sync DSK Map

**Timestamp:** `2026-07-09T12-38-16-04-00`

## Selection result

`PhantomCommand` was selected after comparing the accessible `LuminaryLabs-Publish` repo list against central `LuminaryLabs-Dev/LuminaryLabs` ledger state and sampled repo-local `.agent` readback.

No checked non-Cavalry repo was new, ledger-absent, undocumented, missing root `.agent`, or recently added but undocumented.

`TheCavalryOfRome` remains excluded.

## Current interaction loop

```txt
open index.html
  -> menu renders Phantom Command route controls
  -> Start or Open Scene routes to game.html
  -> game.html imports Three.js from CDN
  -> inline runtime creates renderer, scene, fog, lights, camera, HUD, materials, and input state
  -> inline constants define smooth-ring-handoff-v6
  -> inline ring math creates 10 no-gap rings
  -> inline ringParts() computes [5,5,5,5,6,8,10,12,16,20]
  -> inline wedge geometry creates 92 stone pieces
  -> construct(seq) animates each piece by ring delay and part delay
  -> WASD/arrows pan the camera
  -> mouse wheel zooms
  -> Space/Skip completes the construct
  -> R/Restart resets the construct
  -> HUD reports constructed count, phase, build id, and progress
  -> window.GameHost exposes skipConstruct(), restartConstruct(), and getState()
```

## Domains in use

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
stone-material-palette
camera-navigation
keyboard-pan-input
wheel-zoom-input
button-input
hud-diagnostics
gamehost-authority
inline-construct-runtime
smooth-ring-handoff-v6-profile
construct-source-authority
construct-profile-normalization
construct-profile-parity
construct-source-fingerprint
construct-source-snapshot
construct-source-fixture-row-contract
construct-source-fixture-runner
construct-descriptor-authority
ring-descriptor-generation
piece-descriptor-generation
piece-delay-policy
piece-settle-policy
handoff-timeline-contract
gamehost-source-diagnostics
gamehost-source-profile-readback
gamehost-legacy-compatibility
central-ledger-readback
repo-local-agent-pointer-parity
fixture-build-integration
fixture-before-static-artifact
construct-event-envelope-deferred
construct-event-result-deferred
construct-completion-idempotency-deferred
scenario-bootstrap-gate-deferred
scenario-bootstrap-blocker
```

## Kit services

### Implemented services

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
  -> assert kit identity
  -> assert domain path
  -> install generated ring pieces
  -> assert sorted schedule
  -> tick until complete
  -> assert active cap and ring window
  -> assert all pieces settle
```

### Live inline services that are not yet kits

```txt
live smooth-ring-handoff-v6 profile constants
ring descriptor calculation
ring part count calculation
piece descriptor calculation
wedge geometry creation
piece delay calculation
piece animation progress calculation
construct HUD projection
camera pan/zoom/orbit projection
GameHost construct snapshot projection
```

### Needed next services

```txt
normalizeSmoothHandoffProfile(profile)
derivePhantomCommandRingDescriptors(profile)
derivePhantomCommandPieceDescriptors(profile, rings)
derivePhantomCommandTimeline(profile, rings, pieces)
createPhantomCommandSourceFingerprint(snapshot)
createPhantomCommandSourceSnapshot(profile, rings, pieces, timeline)
createPhantomCommandProfileParityReport(snapshot, expected)
createPhantomCommandGameHostSourceDiagnostics(snapshot, parity)
runPhantomCommandSourceProfileFixture()
readCentralLedgerLatestTracker(repo)
blockConstructResultUntilSourceProfileParity(parity)
blockScenarioBootstrapUntilConstructResult(result)
```

## Kits

### Implemented kits

```txt
construct-spiral-intro-kit
construct-spiral-intro-kit-smoke
```

### Inline runtime kits to extract

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

### Next-cut proof kits

```txt
phantom-command-smooth-handoff-profile-kit
phantom-command-source-profile-fingerprint-kit
phantom-command-source-profile-snapshot-kit
phantom-command-ring-descriptor-kit
phantom-command-piece-descriptor-kit
phantom-command-handoff-timeline-contract-kit
phantom-command-profile-parity-report-kit
phantom-command-gamehost-source-diagnostics-kit
phantom-command-source-profile-fixture-kit
phantom-command-gamehost-source-consumer-kit
phantom-command-central-ledger-readback-kit
phantom-command-fixture-build-integration-kit
phantom-command-construct-event-envelope-kit
phantom-command-construct-event-result-kit
phantom-command-construct-completion-idempotency-kit
phantom-command-scenario-bootstrap-gate-kit
phantom-command-scenario-bootstrap-blocker-kit
```

## Architecture finding

The live browser route should not be visually rewritten next.

The durable cut is a source-owned profile and fixture row stack that proves the current `game.html` math before the browser route consumes those records additively.

The generic `construct-spiral-intro-kit` should remain a regression guard. It is not yet the live smooth-ring-handoff-v6 authority.
