# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-09T04-24-06-04-00`

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Run type:** repo documentation / operating-memory refresh

## Summary

`PhantomCommand` was selected for this pass after checking the accessible `LuminaryLabs-Publish` repo list against the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger and sampled root `.agent` state.

No checked non-Cavalry Publish repo was fully new, absent from the central ledger, missing sampled root `.agent` state, or otherwise undocumented.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`HorrorCorridor` was sampled first and already showed a newer root `.agent` alignment at `2026-07-09T04-19-00-04-00`, so this pass selected `PhantomCommand` as the next eligible stale source-profile fallback.

This is a documentation-only pass. Runtime source stays unchanged.

## Publish repo comparison

```txt
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent present / sampled root latest 2026-07-09T04-19-00-04-00
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / central latest observed 2026-07-09T02-50-39-04-00
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / central latest observed 2026-07-09T03-29-29-04-00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PhantomCommand      selected / tracked / root .agent present / previous repo-local latest 2026-07-09T01-28-10-04-00
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / central latest observed 2026-07-09T03-10-05-04-00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present / central latest observed 2026-07-09T02-05-52-04-00
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / central latest observed 2026-07-09T03-50-12-04-00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / central latest observed 2026-07-09T02-31-41-04-00
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent present / central latest observed 2026-07-09T02-11-07-04-00
```

## Current product read

`PhantomCommand` is a static Vite / Three.js single-player PvE undead RTS prototype shell.

The live app is still a two-route construct proof:

```txt
index.html
  -> game.html
  -> Three.js CDN
  -> inline smooth-ring-handoff-v6 construct runtime
```

The current player-facing loop is a construct-viewer loop: open menu, enter the construct scene, watch the stone rings form, pan, zoom, skip, restart, and end at `command online`.

## Current interaction loop

```txt
open index.html
  -> menu renders Phantom Command title, subtitle, Start button, and Open Scene link
  -> Start button or Open Scene link routes to game.html
  -> game.html imports Three.js from CDN
  -> inline runtime creates renderer, scene, fog, lights, camera, HUD, materials, and input state
  -> inline constants define smooth-ring-handoff-v6
  -> ringStartTimes are computed from MOVE_SECONDS * RING_HANDOFF
  -> ringParts() computes [5,5,5,5,6,8,10,12,16,20]
  -> wedge() and makePiece() create 92 stone pieces
  -> construct(seq) animates radial motion, vertical drop, rotation settle, progress, phase, and HUD text
  -> WASD/arrows pan camera target
  -> mouse wheel zooms
  -> Space / Skip completes the construct
  -> R / Restart resets the construct
  -> window.GameHost exposes skipConstruct(), restartConstruct(), and getState()
```

## Target source-profile consumer loop

```txt
source-owned smooth-ring-handoff-v6 profile
  -> normalizeSmoothHandoffProfile
  -> derivePhantomCommandRingDescriptors
  -> derivePhantomCommandPieceDescriptors
  -> derivePhantomCommandTimelineContract
  -> derivePhantomCommandSourceFingerprint
  -> createPhantomCommandSourceSnapshot
  -> createPhantomCommandProfileParityReport
  -> createGameHostSourceProfileDiagnostics
  -> DOM-free fixture rows
  -> package build gate
  -> game.html additive sourceProfile consumer readback
  -> legacy GameHost compatibility proof
  -> central ledger pointer parity
  -> construct event/result remains blocked
  -> scenario bootstrap remains deferred
```

## Domains identified

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
source-profile-consumer-splice
fixture-build-integration
construct-event-envelope
construct-event-result
construct-completion-idempotency
scenario-bootstrap-gate
scenario-bootstrap-blocker
```

## Services identified

### Current runtime services

```txt
serve static menu route
serve static game route
route Start and Open Scene to game.html
build Three.js renderer, scene, fog, lights, camera, materials, HUD, and input state inline
own live smooth-ring-handoff-v6 constants inline
compute ring descriptors inline
compute ring part counts from circumference inline
create wedge geometry and seam meshes inline
create center disc, tower, and phantom commander visual inline
animate construct pieces through radial and drop interpolation
track progress and command-online phase
support pan, zoom, skip, and restart controls
publish construct diagnostics through window.GameHost.getState
```

### Implemented kit services

```txt
construct-spiral-intro-kit
  -> createConstructSpiralIntroPieceId
  -> createConstructSpiralIntroSchedule
  -> createConstructSpiralIntroKit
  -> installPieces
  -> reset
  -> update
  -> snapshot
  -> schedule
  -> activePieces
  -> settledPieces
  -> pendingPieces
  -> newlyActivePieces
  -> newlySettledPieces
  -> getPieceProgress
  -> getPieceStatus
```

### Needed next services

```txt
source-owned smooth-ring-handoff-v6 profile
profile normalization
ring descriptor derivation
piece descriptor derivation
timeline / handoff contract derivation
source fingerprint
source snapshot
profile parity report
GameHost source diagnostics projection
legacy GameHost compatibility assertion
DOM-free source-profile fixture rows
fixture build integration
central ledger latest-tracker readback
construct-result blocker proof
scenario-bootstrap blocker proof
```

## Kits identified

### Implemented

```txt
construct-spiral-intro-kit
construct-spiral-intro-kit-smoke
```

### Inline / candidate extraction

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

### Next-cut kits

```txt
phantom-command-smooth-handoff-profile-kit
phantom-command-ring-descriptor-kit
phantom-command-piece-descriptor-kit
phantom-command-handoff-timeline-contract-kit
phantom-command-source-profile-fingerprint-kit
phantom-command-source-profile-snapshot-kit
phantom-command-profile-parity-report-kit
phantom-command-gamehost-source-diagnostics-kit
phantom-command-source-profile-fixture-kit
phantom-command-gamehost-source-consumer-kit
phantom-command-central-ledger-readback-kit
phantom-command-fixture-build-integration-kit
phantom-command-construct-event-envelope-kit
phantom-command-construct-event-result-kit
phantom-command-scenario-bootstrap-gate-kit
phantom-command-scenario-bootstrap-blocker-kit
```

## Main finding

The visible construct is already good enough to preserve.

The next problem is proofability: `game.html` still owns the live profile, descriptor math, timeline math, GameHost projection, HUD mutation, and render consumption inline.

The next implementation should not start unit control, renderer extraction, economy, wave logic, or scenario bootstrap. It should first move the live `smooth-ring-handoff-v6` values into source-owned modules, prove DOM-free parity, then splice additive `sourceProfile` diagnostics into `window.GameHost.getState()` without changing legacy fields.

## Next safe ledge

```txt
PhantomCommand SourceProfile Consumer Cutover Map + Legacy GameHost Fixture Gate
```

## Validation status

```txt
repo-list comparison: performed through GitHub connector
central ledger comparison: performed through GitHub connector search/read
source readback: README, package.json, index.html, game.html, construct-spiral-intro-kit
runtime source changed: no
npm install: not run
npm run build: not run
fixture run: not run
browser smoke: not run
branch created: no
push target: main only
```
