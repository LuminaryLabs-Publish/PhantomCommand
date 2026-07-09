# Project Breakdown: PhantomCommand

**Timestamp:** `2026-07-09T12-50-00-04-00`

## Goal

Refresh repo-local `.agent` docs and central LuminaryLabs tracking for `LuminaryLabs-Publish/PhantomCommand`, then lock the next implementation around sourceProfile consumer parity rather than render rewrite or scenario bootstrap.

## Selection result

```txt
selected repo: LuminaryLabs-Publish/PhantomCommand
excluded repo: LuminaryLabs-Publish/TheCavalryOfRome
selection reason: central-ledger stale fallback; repo-local .agent state was newer than central tracking, and the sourceProfile fixture/readback seam remains unresolved
runtime source changed: no
branch created: no
pull request created: no
push target: main only
```

## Publish org comparison

```txt
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-09T12-08-46-04-00
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-09T12-20-08-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest 2026-07-09T11-30-50-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T10-40-00-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T11-00-39-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T11-39-50-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T11-50-08-04-00
LuminaryLabs-Publish/PhantomCommand       selected / repo-local 2026-07-09T12-38-16-04-00 / central latest 2026-07-09T10-29-02-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T12-00-36-04-00
```

No checked non-Cavalry Publish repo was fully new, central-ledger absent, missing root `.agent`, recently added but undocumented, or otherwise undocumented.

## Interaction loop

```txt
open index.html
  -> menu renders Phantom Command copy and route controls
  -> Start or Open Scene routes to game.html
  -> game.html imports Three.js from CDN
  -> inline runtime creates renderer, scene, fog, lights, camera, HUD, materials, and input state
  -> inline constants define smooth-ring-handoff-v6
  -> inline ring math creates 10 no-gap construct rings
  -> inline ringParts() computes [5,5,5,5,6,8,10,12,16,20]
  -> inline wedge geometry creates 92 stone pieces
  -> construct(seq) animates each piece by ring delay and part delay
  -> pan, zoom, skip, and restart controls mutate inline runtime state
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

## Services that kits offer

### Implemented generic construct kit

```txt
construct-spiral-intro-kit:
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

### Implemented smoke service

```txt
construct-spiral-intro-kit-smoke:
  asserts kit id and domain path
  installs generated ring pieces
  asserts schedule ordering
  ticks until complete
  asserts active count cap
  asserts active ring window
  asserts all pieces settled
```

### Needed sourceProfile services

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
src/kits/construct-spiral-intro-kit/index.js
tests/construct-spiral-intro-kit-smoke.mjs
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

`PhantomCommand` already has a stable visible construct and a generic construct sequence kit, but the live route still does not consume a source-owned PhantomCommand profile.

The next implementation should source-own the `smooth-ring-handoff-v6` profile, prove exact parity through DOM-free fixture rows, add additive `GameHost.getState().sourceProfile` diagnostics, and wire the fixture into `npm run build` before static artifact copy.

Render extraction, construct result authority, and scenario bootstrap should remain deferred until the profile parity gate passes.

## Next safe ledge

```txt
PhantomCommand SourceProfile Consumer Ledger Catch-up + Build Fixture Gate
```

## Files updated in this pass

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-09T12-50-00-04-00-sourceprofile-consumer-ledger-catchup-dsk-map.md
.agent/render-audit/2026-07-09T12-50-00-04-00-gamehost-sourceprofile-readback-freeze.md
.agent/gameplay-audit/2026-07-09T12-50-00-04-00-construct-result-scenario-deferral-loop.md
.agent/source-profile-audit/2026-07-09T12-50-00-04-00-live-profile-ledger-fixture-contract.md
.agent/scenario-bootstrap-audit/2026-07-09T12-50-00-04-00-bootstrap-remains-blocked-until-construct-result.md
.agent/deploy-audit/2026-07-09T12-50-00-04-00-sourceprofile-fixture-before-build-map.md
.agent/trackers/2026-07-09T12-50-00-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-09T12-50-00-04-00.md
```

## Validation

Documentation-only pass.

```txt
runtime source changed: no
npm install: not run
npm run build: not run
browser smoke: not run
branch created: no
pull request created: no
pushed to main: yes
```
