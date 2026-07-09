# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-09T12-38-16-04-00`

## Goal

Compare the accessible `LuminaryLabs-Publish` repository list against the central `LuminaryLabs-Dev/LuminaryLabs` ledger, choose one eligible repo, update repo-local `.agent` documentation, identify interaction loop/domains/services/kits, and log the central change.

## Checklist

- [x] Listed accessible `LuminaryLabs-Publish` repositories.
- [x] Compared the list against central `LuminaryLabs-Dev/LuminaryLabs` repo-ledger entries.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirmed no checked non-Cavalry repo was new, ledger-absent, undocumented, recently added but undocumented, or missing sampled root `.agent` state.
- [x] Selected one repo only: `LuminaryLabs-Publish/PhantomCommand`.
- [x] Read repo-local `.agent` docs.
- [x] Read `package.json`, `index.html`, `game.html`, `scripts/build-static.mjs`, `src/kits/construct-spiral-intro-kit/index.js`, and `tests/construct-spiral-intro-kit-smoke.mjs`.
- [x] Identified interaction loop.
- [x] Identified domains.
- [x] Identified kit services.
- [x] Identified current and next-cut kits.
- [x] Updated root `.agent` docs.
- [x] Added architecture, render, gameplay, source-profile, scenario-bootstrap, and deploy audits.
- [x] Added this tracker.
- [x] Added a turn ledger entry.
- [x] Updated central repo ledger.
- [x] Added central internal change-log entry.
- [x] Pushed directly to `main`.

## Repo selected

```txt
LuminaryLabs-Publish/PhantomCommand
```

## Selection note

```txt
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-09T12-08-46-04-00
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-09T12-20-08-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest 2026-07-09T11-30-50-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T10-40-00-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T11-00-39-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T11-39-50-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T11-50-08-04-00
LuminaryLabs-Publish/PhantomCommand       selected / oldest eligible central fallback / central latest 2026-07-09T10-29-02-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T12-00-36-04-00
```

## Current interaction loop

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
  -> kit id/domain assertions
  -> schedule ordering proof
  -> active cap proof
  -> active ring window proof
  -> completion proof
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

The live construct should not be visually rewritten next.

`game.html` is still the live source authority for the smooth-ring-handoff-v6 profile and the browser render path. The next implementation should source-own the live profile, prove descriptor/timeline parity in a DOM-free fixture, then splice additive `GameHost.getState().sourceProfile` diagnostics without changing the legacy route.

## Required output added

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-09T12-38-16-04-00-live-sourceprofile-consumer-sync-dsk-map.md
.agent/render-audit/2026-07-09T12-38-16-04-00-gamehost-sourceprofile-render-readback.md
.agent/gameplay-audit/2026-07-09T12-38-16-04-00-construct-result-deferral-loop.md
.agent/source-profile-audit/2026-07-09T12-38-16-04-00-live-profile-fixture-contract.md
.agent/scenario-bootstrap-audit/2026-07-09T12-38-16-04-00-scenario-bootstrap-remains-blocked.md
.agent/deploy-audit/2026-07-09T12-38-16-04-00-sourceprofile-fixture-build-script-map.md
.agent/trackers/2026-07-09T12-38-16-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-09T12-38-16-04-00.md
```

## Validation

```txt
runtime source changed: no
branch created: no
pull request created: no
npm install: not run
npm run build: not run
node tests/construct-spiral-intro-kit-smoke.mjs: not run
node tests/phantom-command-source-profile-fixture.mjs: not run because it does not exist yet
browser smoke: not run
pushed to main: yes
```
