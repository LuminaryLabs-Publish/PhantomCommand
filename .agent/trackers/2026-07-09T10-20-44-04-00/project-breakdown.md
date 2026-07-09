# Project Breakdown: PhantomCommand SourceProfile Consumer Build Gate

**Timestamp:** `2026-07-09T10-20-44-04-00`

## Goal

Compare the accessible `LuminaryLabs-Publish` repo list against the central `LuminaryLabs-Dev/LuminaryLabs` ledger, select one eligible repo, update repo-local `.agent` documentation, identify the interaction loop/domains/services/kits, and sync the central ledger/change-log.

## Checklist

- [x] Listed accessible `LuminaryLabs-Publish` repositories.
- [x] Compared repositories against central ledger state.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Selected one repo only: `LuminaryLabs-Publish/PhantomCommand`.
- [x] Read repo-local `.agent` state.
- [x] Read runtime/source files.
- [x] Identified the interaction loop.
- [x] Identified domains in use.
- [x] Identified services offered by current and planned kits.
- [x] Identified implemented, inline, and next-cut kits.
- [x] Updated required root `.agent` docs.
- [x] Added timestamped tracker entry.
- [x] Added architecture audit.
- [x] Added render audit.
- [x] Added gameplay audit.
- [x] Added source-profile audit.
- [x] Added scenario-bootstrap audit.
- [x] Added deploy audit.
- [x] Updated kit registry.
- [x] Updated central repo ledger.
- [x] Added central internal change-log entry.
- [ ] Did not edit runtime source files.
- [ ] Did not run local npm/browser validation.

## Selection reason

The accessible Publish repo list was compared against central ledger state and repo-local `.agent` evidence.

No checked non-Cavalry repo was fully new, missing from central tracking, missing sampled root `.agent` state, recently added but undocumented, or otherwise undocumented.

`PhantomCommand` was selected as the oldest eligible central-ledger fallback among the checked non-Cavalry repos.

## Publish repositories observed

```txt
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-09T09-59-27-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest 2026-07-09T08-50-00-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T09-36-24-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PhantomCommand       selected / oldest eligible central fallback / central latest 2026-07-09T07-19-41-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T09-10-50-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T07-41-29-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-09T09-50-00-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T08-29-38-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T08-02-33-04-00
```

## Current read

`PhantomCommand` is a static browser construct proof.

It boots through `index.html -> game.html`, imports Three.js from CDN, creates a full-screen WebGL construct scene, and exposes `window.GameHost` with `skipConstruct`, `restartConstruct`, and `getState`.

The menu advertises a single-player PvE RTS prototype, but the implemented route is still an opening construct proof, not an RTS command loop.

## Interaction loop

```txt
index.html
  -> menu renders Phantom Command copy and route controls
  -> Start button or Open Scene link routes to game.html
  -> game.html imports Three.js CDN
  -> inline runtime creates renderer, scene, fog, lights, camera, HUD, materials, and input state
  -> inline constants define smooth-ring-handoff-v6
  -> ringStartTimes uses MOVE_SECONDS * RING_HANDOFF
  -> ringParts() derives [5,5,5,5,6,8,10,12,16,20]
  -> wedge() creates stone ring geometry
  -> makePiece() creates 92 stone pieces
  -> construct(seq) animates pieces by delay, radial progress, and drop progress
  -> updatePan() handles WASD / arrow key pan
  -> wheel mutates zoomTarget
  -> Space/Skip jumps to completion
  -> R/Restart resets construct timing
  -> HUD reports constructed count, phase, build id, and progress
  -> window.GameHost.getState() exposes construct diagnostics
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
fixture-build-integration
fixture-before-static-artifact
construct-event-envelope-deferred
construct-event-result-deferred
construct-completion-idempotency-deferred
scenario-bootstrap-gate-deferred
scenario-bootstrap-blocker
```

## Services that kits offer

### App shell services

```txt
serve index.html menu
route Start button to game.html
route Open Scene link to game.html
copy static files into dist during build
serve GitHub Pages from main workflow artifact
```

### Live inline runtime services

```txt
create Three.js renderer
create scene, fog, lights, camera, materials, HUD, and input state
create smooth-ring-handoff-v6 source constants inline
create ring descriptors inline
create piece counts inline from circumference
create wedge geometry inline
create seam meshes inline
create center disc, Grim Reaper Totem proxy, and Phantom Commander proxy inline
animate radial/drop construct pieces
track progress and phase
pan, zoom, skip, restart
publish construct diagnostics through window.GameHost
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

construct-spiral-intro-kit-smoke
  -> assert kit id and domain path
  -> install generated ring pieces
  -> assert schedule ordering
  -> tick until complete
  -> assert active count cap
  -> assert active ring window
  -> assert all pieces settled
```

### Needed source-profile consumer services

```txt
source-owned smooth-ring-handoff-v6 profile
source profile normalizer
ring descriptor generator
piece descriptor generator
handoff/timeline descriptor generator
source fingerprint service
source snapshot service
profile parity report
additive GameHost source diagnostics adapter
DOM-free source profile fixture runner
game.html sourceProfile consumer readback
legacy GameHost compatibility fixture
central ledger latest-tracker readback
fixture build integration before static artifact copy
construct complete event blocker map
scenario bootstrap blocker map
```

## Kits

### Implemented

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

### Next-cut kits

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

## Main finding

`PhantomCommand` should not be expanded into RTS gameplay yet.

The visible construct route is stable, but live source authority is still inline in `game.html`; the implemented source kit is generic and does not reproduce the live `smooth-ring-handoff-v6` profile.

The next implementation should source-own the live profile, prove exact parity through DOM-free fixtures, then add additive `GameHost.getState().sourceProfile` readback without breaking legacy `GameHost` fields.

## Next safe ledge

```txt
PhantomCommand SourceProfile Consumer Build Gate + GameHost Readback Fixture
```

## Files changed in this repo

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-09T10-20-44-04-00-sourceprofile-consumer-build-gate-dsk-map.md
.agent/render-audit/2026-07-09T10-20-44-04-00-gamehost-sourceprofile-readback-fixture.md
.agent/gameplay-audit/2026-07-09T10-20-44-04-00-construct-profile-gate-loop.md
.agent/source-profile-audit/2026-07-09T10-20-44-04-00-live-v6-profile-parity-contract.md
.agent/scenario-bootstrap-audit/2026-07-09T10-20-44-04-00-scenario-bootstrap-remains-blocked.md
.agent/deploy-audit/2026-07-09T10-20-44-04-00-sourceprofile-fixture-build-gate.md
.agent/trackers/2026-07-09T10-20-44-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-09T10-20-44-04-00.md
```

## Validation

```txt
runtime source changed: no
branch created: no
pull request created: no
local npm build: not run
browser smoke: not run
```
