# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-09T07-19-41-04-00`

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Branch policy:** only `main`; no new branches.

## Summary

This is a docs-only breakdown and central-ledger catch-up pass. Runtime/source implementation files were not changed.

`PhantomCommand` was selected because no checked non-Cavalry Publish repo was new, absent from central tracking, missing sampled root `.agent` state, or otherwise undocumented, while `PhantomCommand` had the oldest eligible central-ledger mismatch: central tracking still pointed at `2026-07-09T04-50-00-04-00`, but repo-local `.agent` had advanced to `2026-07-09T07-10-00-04-00`.

## Publish repository comparison

```txt
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-09T07-05-52-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest 2026-07-09T06-01-30-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T06-20-00-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PhantomCommand       selected / central ledger stale at 2026-07-09T04-50-00-04-00 / repo-local latest 2026-07-09T07-10-00-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T06-10-35-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T05-11-22-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-09T06-28-53-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T05-38-20-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T05-20-42-04-00
```

## Source files inspected

```txt
README.md
package.json
index.html
game.html
scripts/build-static.mjs
src/kits/construct-spiral-intro-kit/index.js
tests/construct-spiral-intro-kit-smoke.mjs
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
LuminaryLabs-Dev/LuminaryLabs/repo-ledger/LuminaryLabs-Publish/*.md
```

## Interaction loop

```txt
open index.html
  -> menu renders Phantom Command copy and route controls
  -> Start button or Open Scene link navigates to game.html
  -> game.html imports Three.js 0.160.0 from CDN
  -> inline runtime creates renderer, scene, fog, lights, camera, HUD, materials, and input state
  -> inline constants define smooth-ring-handoff-v6
  -> inline ring math creates 10 contiguous zero-gap construct rings
  -> inline ringParts() computes [5,5,5,5,6,8,10,12,16,20]
  -> inline wedge geometry creates 92 stone pieces
  -> construct(seq) animates each piece by ringStartTimes and part index delay
  -> WASD/arrows pan the camera target
  -> mouse wheel mutates zoomTarget
  -> Space/Skip jumps the build to completion
  -> R/Restart resets startedAt, progress, and phase
  -> HUD mutates constructed count, progress bar, phase, and status text
  -> requestAnimationFrame renders the scene and schedules the next frame
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
fixture-build-integration
fixture-before-static-artifact
construct-event-envelope-deferred
construct-event-result-deferred
construct-completion-idempotency-deferred
scenario-bootstrap-gate-deferred
scenario-bootstrap-blocker
```

## Services that the kits offer

### Current route and build services

```txt
index.html route menu
Start button route to game.html
Open Scene route to game.html
Vite dev/start/preview server on port 4173
static build copying index.html, game.html, docs, and config into dist
GitHub Pages artifact deployment from main
```

### Inline live construct services

```txt
create renderer / scene / fog / lighting / camera
create material palette and wedge geometry
compute ring descriptors from inline constants
compute live ring part counts from circumference
compute live piece descriptors and delays
animate radial motion, drop motion, and settle phase
mutate HUD progress and phase
process pan / zoom / skip / restart input
emit legacy GameHost construct diagnostics
```

### Implemented DSK/source-kit services

```txt
construct-spiral-intro-kit
  -> CONSTRUCT_SPIRAL_INTRO_KIT_ID
  -> CONSTRUCT_SPIRAL_INTRO_DOMAIN_PATH
  -> DEFAULT_CONSTRUCT_SPIRAL_INTRO_CONFIG
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

### Needed services

```txt
source-owned smooth-ring-handoff-v6 profile
source-profile normalizer
ring descriptor generator
piece descriptor generator
timeline descriptor generator
source fingerprint
source snapshot
profile parity report
additive GameHost source diagnostics
DOM-free source-profile fixture runner
legacy GameHost compatibility fixture
central ledger latest-tracker parity row
fixture build integration before static copy
construct result blocker map
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

`PhantomCommand` should not be expanded into RTS gameplay yet. The visible construct route is stable, but live source authority remains inline in `game.html`, while the implemented source kit is generic and does not reproduce the live `smooth-ring-handoff-v6` profile.

The next implementation must source-own the profile and prove these exact values before renderer extraction or gameplay expansion:

```txt
buildId: smooth-ring-handoff-v6
ringCount: 10
ringPartCounts: [5,5,5,5,6,8,10,12,16,20]
totalPieces: 92
ringHandoff: 0.72
partStagger: 0.025
totalBuildSeconds: 19.923
zeroGapPolicy: true
```

## Required next fixture rows

```txt
profile_build_id_matches_live_game_html
profile_ring_count_matches_10
profile_gap_policy_matches_zero_gap
ring_part_counts_match_live_array
piece_descriptor_count_matches_92
timeline_total_build_seconds_matches_19_923
handoff_values_match_ring_handoff_0_72_and_part_stagger_0_025
ring_start_times_match_live_formula
source_snapshot_is_serializable
source_fingerprint_is_stable
profile_parity_report_has_no_errors
gamehost_source_diagnostics_shape_is_additive
legacy_gamehost_fields_are_unchanged
sourceprofile_consumer_readback_matches_fixture
construct_result_is_blocked_until_source_profile_parity_passes
central_ledger_points_to_latest_source_profile_gate
scenario_bootstrap_is_blocked_until_construct_result_exists
fixture_runs_without_dom_canvas_or_three
fixture_build_gate_runs_before_static_artifact_upload
```

## Files updated this pass

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-09T07-19-41-04-00-sourceprofile-readback-ledger-dsk-map.md
.agent/render-audit/2026-07-09T07-19-41-04-00-gamehost-sourceprofile-consumer-readback.md
.agent/gameplay-audit/2026-07-09T07-19-41-04-00-construct-proof-sourceprofile-gate-loop.md
.agent/source-profile-audit/2026-07-09T07-19-41-04-00-sourceprofile-central-ledger-parity-gate.md
.agent/scenario-bootstrap-audit/2026-07-09T07-19-41-04-00-scenario-bootstrap-remains-blocked.md
.agent/deploy-audit/2026-07-09T07-19-41-04-00-sourceprofile-fixture-build-splice-map.md
.agent/trackers/2026-07-09T07-19-41-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-09T07-19-41-04-00.md
```

## Central files updated

```txt
LuminaryLabs-Dev/LuminaryLabs/repo-ledger/LuminaryLabs-Publish/PhantomCommand.md
LuminaryLabs-Dev/LuminaryLabs/internal-change-log/2026-07-09T07-19-41-04-00-phantom-command-sourceprofile-readback-ledger.md
```

## Validation status

```txt
runtime source changed: no
local npm install: not run
node tests/construct-spiral-intro-kit-smoke.mjs: not run
node tests/phantom-command-source-profile-fixture.mjs: not run / fixture not implemented yet
npm run build: not run
browser smoke: not run
branch created: no
pull request created: no
push target: main
```

## Next safe ledge

```txt
PhantomCommand SourceProfile Readback Ledger + Fixture Build Consumer Gate
```
