# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-09T04-50-00-04-00`

## Goal

Refresh the repo-local `.agent` breakdown for `LuminaryLabs-Publish/PhantomCommand`, compare it against the full accessible Publish repo set and central ledger, identify the interaction loop, domains, services, and kits, then sync the central `LuminaryLabs-Dev/LuminaryLabs` ledger.

## Checklist

- [x] Listed the accessible `LuminaryLabs-Publish` repos.
- [x] Compared the repo list against `LuminaryLabs-Dev/LuminaryLabs` repo-ledger entries.
- [x] Sampled root `.agent/START_HERE.md` state for non-Cavalry Publish repos.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Selected one repo only: `LuminaryLabs-Publish/PhantomCommand`.
- [x] Read repo-local `.agent` state.
- [x] Read source anchors: `package.json`, `game.html`, `scripts/build-static.mjs`, and `src/kits/construct-spiral-intro-kit/index.js`.
- [x] Identified the interaction loop.
- [x] Identified all domains in use.
- [x] Identified services offered by current and next-cut kits.
- [x] Identified implemented, inline, and target kits.
- [x] Updated required root `.agent` docs.
- [x] Added architecture, render, gameplay, source-profile, scenario-bootstrap, deploy, tracker, and turn-ledger entries.
- [x] Updated `LuminaryLabs-Dev/LuminaryLabs` central ledger and internal change log.
- [x] Pushed only to `main`.

## Full Publish repo comparison

```txt
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent present / central latest 2026-07-09T04-30-54-04-00
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / central latest 2026-07-09T02-50-39-04-00
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / central latest 2026-07-09T03-29-29-04-00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PhantomCommand      selected / repo-local agent ahead of central ledger / source-profile proof unresolved
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / central latest 2026-07-09T03-10-05-04-00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present / central latest 2026-07-09T02-05-52-04-00
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / central latest 2026-07-09T03-50-12-04-00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / central latest 2026-07-09T02-31-41-04-00
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent present / central latest 2026-07-09T02-11-07-04-00
```

## Selection reason

No checked non-Cavalry Publish repo was fully new, missing from the central ledger, missing sampled root `.agent` state, or otherwise undocumented.

`PhantomCommand` was selected because its repo-local `.agent` state had advanced beyond the central ledger and the current implementation still lacks a source-profile fixture/build consumer readback gate.

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
  -> WASD/arrows pan, wheel zooms, Space/Skip jumps to completion, R/Restart resets
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
source-profile-consumer-splice
fixture-build-integration
fixture-before-static-artifact
construct-event-envelope
construct-event-result
construct-completion-idempotency
scenario-bootstrap-gate
scenario-bootstrap-blocker
```

## Kit services

```txt
construct-spiral-intro-kit:
  - create generic construct piece ids
  - create generic construct schedule rows
  - install pieces
  - reset state
  - update/tick progress
  - snapshot progress
  - expose pending, active, settled, newly active, and newly settled pieces
  - expose getPieceProgress and getPieceStatus

construct-spiral-intro-kit-smoke:
  - assert kit id and domain path
  - assert schedule ordering
  - tick until complete
  - assert active window and final settled state

next source-profile kits:
  - own smooth-ring-handoff-v6 profile
  - normalize live constants
  - derive no-gap ring descriptors
  - derive 92 piece descriptors
  - derive handoff/timeline descriptors
  - fingerprint source profile
  - emit source snapshot
  - report parity rows
  - project additive GameHost source diagnostics
  - prove DOM-free fixture rows
  - prove central-ledger latest-tracker parity
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

The live route is visually stable but source-coupled. `game.html` still owns the v6 profile, descriptor math, timeline math, render mutation, HUD mutation, and legacy `GameHost` projection inline.

The next implementation should create deterministic source-profile modules and DOM-free fixture rows first, then splice additive `sourceProfile` diagnostics into `GameHost.getState()` while preserving the current visible construct and legacy fields.

## Next safe ledge

```txt
PhantomCommand SourceProfile Consumer Freeze + Fixture Build Central Ledger Gate
```

## Files changed by this pass

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-09T04-50-00-04-00-sourceprofile-consumer-freeze-dsk-map.md
.agent/render-audit/2026-07-09T04-50-00-04-00-gamehost-sourceprofile-readback-freeze.md
.agent/gameplay-audit/2026-07-09T04-50-00-04-00-construct-result-deferred-loop.md
.agent/source-profile-audit/2026-07-09T04-50-00-04-00-consumer-fixture-central-parity.md
.agent/scenario-bootstrap-audit/2026-07-09T04-50-00-04-00-bootstrap-blocker-after-sourceprofile.md
.agent/deploy-audit/2026-07-09T04-50-00-04-00-fixture-build-central-ledger-gate.md
.agent/trackers/2026-07-09T04-50-00-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-09T04-50-00-04-00.md
```

## Validation

```txt
runtime source changed: no
branch created: no
pull request created: no
local npm install: no
local npm run build: no
node fixture run: no
browser smoke: no
pushed to main: yes
```
