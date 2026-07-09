# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-09T01-20-59-04-00`

## Selection

Selected repo:

```txt
LuminaryLabs-Publish/PhantomCommand
```

Reason:

```txt
No checked non-Cavalry Publish repo was new, absent from the central ledger, undocumented, recently added but undocumented, or missing sampled root .agent state.

PhantomCommand was selected as the oldest eligible fallback because its latest central alignment before this run was 2026-07-08T22-58-02-04-00 and its sourceProfile fixture/build/readback gate remains unresolved.
```

## Publish organization comparison

```txt
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent present / latest central 2026-07-09T01-00-22-04-00
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / latest central 2026-07-09T00-00-41-04-00
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / latest central 2026-07-09T00-40-20-04-00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PhantomCommand      selected / oldest eligible central alignment 2026-07-08T22-58-02-04-00
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / latest central 2026-07-09T00-09-22-04-00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present / latest central 2026-07-08T23-40-55-04-00
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / latest central 2026-07-09T00-50-00-04-00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / latest central 2026-07-09T00-20-08-04-00
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent present / latest central 2026-07-08T23-19-33-04-00
```

## Source files read

```txt
README.md
package.json
index.html
game.html
src/kits/construct-spiral-intro-kit/index.js
tests/construct-spiral-intro-kit-smoke.mjs
scripts/build-static.mjs
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
LuminaryLabs-Dev/LuminaryLabs repo-ledger entries
```

## Interaction loop

```txt
open index.html
  -> main menu renders Phantom Command copy and route controls
  -> Start or Open Scene routes to game.html
  -> game.html imports Three.js from CDN
  -> inline runtime creates renderer, scene, fog, lights, camera, HUD, materials, and input state
  -> inline smooth-ring-handoff-v6 constants create 10 no-gap construct rings
  -> inline ringParts() computes [5,5,5,5,6,8,10,12,16,20]
  -> inline wedge geometry creates 92 stone pieces
  -> construct(seq) animates pieces by ringStartTimes and partIndex * PART_STAGGER
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

## Services the kits offer

```txt
construct-spiral-intro-kit:
  - createConstructSpiralIntroPieceId
  - createConstructSpiralIntroSchedule
  - createConstructSpiralIntroKit
  - installPieces
  - reset
  - update
  - snapshot
  - schedule
  - activePieces
  - settledPieces
  - pendingPieces
  - newlyActivePieces
  - newlySettledPieces
  - getPieceProgress
  - getPieceStatus

construct-spiral-intro-kit-smoke:
  - assert kit id and domain path
  - install generated pieces
  - assert schedule ordering
  - tick until complete
  - assert active count cap and active ring window
```

## Kits identified

```txt
implemented:
  construct-spiral-intro-kit
  construct-spiral-intro-kit-smoke

inline runtime kits:
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

next-cut:
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
  phantom-command-scenario-bootstrap-gate-kit
  phantom-command-scenario-bootstrap-blocker-kit
```

## Main finding

`PhantomCommand` should preserve the visible construct route and close sourceProfile proof first.

The route already proves the visual build, but it does not yet prove that a source-owned profile/descriptors/timeline can reproduce the live values and be consumed additively by `GameHost.getState().sourceProfile`.

## Required .agent outputs changed

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-09T01-20-59-04-00-sourceprofile-fixture-build-readback-dsk-map.md
.agent/render-audit/2026-07-09T01-20-59-04-00-gamehost-sourceprofile-readback-contract.md
.agent/gameplay-audit/2026-07-09T01-20-59-04-00-construct-result-blocker-loop.md
.agent/source-profile-audit/2026-07-09T01-20-59-04-00-sourceprofile-fixture-row-acceptance-map.md
.agent/scenario-bootstrap-audit/2026-07-09T01-20-59-04-00-bootstrap-remains-blocked-by-sourceprofile.md
.agent/deploy-audit/2026-07-09T01-20-59-04-00-fixture-build-script-wire-map.md
.agent/trackers/2026-07-09T01-20-59-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-09T01-20-59-04-00.md
```

## Next safe ledge

```txt
PhantomCommand SourceProfile Fixture Build Readback + GameHost Consumer Splice Gate
```

## Validation status

```txt
repo-list comparison: performed
central ledger comparison: performed
source readback: performed
root .agent update: performed
runtime implementation changed: no
local npm validation: not run
browser validation: not run
branch created: no
```
