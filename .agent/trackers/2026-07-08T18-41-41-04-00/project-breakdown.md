# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-08T18-41-41-04-00`

## Goal

Compare the accessible `LuminaryLabs-Publish` repo set against central `LuminaryLabs-Dev/LuminaryLabs` tracking, select one eligible repo, update repo-local `.agent/` docs, and log the central ledger update.

## Plan checklist

- [x] Check accessible Publish repos.
- [x] Compare against central repo-ledger files.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Select one repo only.
- [x] Read repo-local `.agent` state.
- [x] Read README, package, and runtime source.
- [x] Identify interaction loop.
- [x] Identify domains in use.
- [x] Identify kit services.
- [x] Identify implemented, inline, and next-cut kits.
- [x] Update required root `.agent` docs.
- [x] Add timestamped architecture audit.
- [x] Add timestamped render audit.
- [x] Add timestamped gameplay audit.
- [x] Add source-profile audit.
- [x] Add scenario-bootstrap audit.
- [x] Add deploy audit.
- [x] Add timestamped turn-ledger entry.
- [x] Update central repo ledger.
- [x] Add central internal change-log entry.
- [x] Push only to `main`.

## Selection result

Selected repo:

```txt
LuminaryLabs-Publish/PhantomCommand
```

Reason:

```txt
No checked non-Cavalry Publish repo was fully new, missing from central tracking, missing sampled root .agent state, or undocumented.

PhantomCommand was selected because central repo-ledger state was behind repo-local state and the source-profile fixture gate remains unresolved.
```

## Publish repo comparison

```txt
LuminaryLabs-Publish/AetherVale          tracked / latest central update 2026-07-08T17-49-51-04-00
LuminaryLabs-Publish/HorrorCorridor      tracked / latest central update 2026-07-08T18-19-43-04-00
LuminaryLabs-Publish/IntoTheMeadow       tracked / latest central update 2026-07-08T18-09-21-04-00
LuminaryLabs-Publish/MyCozyIsland        tracked / latest central update 2026-07-08T17-09-48-04-00
LuminaryLabs-Publish/PhantomCommand      selected / central ledger catch-up + source-profile fixture manifest
LuminaryLabs-Publish/PrehistoricRush     tracked / latest central update 2026-07-08T16-51-11-04-00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/TheOpenAbove        tracked / latest central update 2026-07-08T17-31-22-04-00
LuminaryLabs-Publish/TheUnmappedHouse    tracked / latest central update 2026-07-08T16-19-57-04-00
LuminaryLabs-Publish/ZombieOrchard       tracked / latest central update 2026-07-08T16-20-00-04-00
```

## Current interaction loop

```txt
open index.html
  -> main menu renders title, subtitle, Start button, and Open Scene link
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
construct-event-envelope
construct-event-result
construct-completion-idempotency
scenario-bootstrap-gate
scenario-bootstrap-blocker
```

## Kit services

### Current runtime services

```txt
serve static menu route
serve static game route
route Start and Open Scene to game.html
create Three.js renderer, scene, camera, lights, fog, HUD, materials, and input state inline
create live source constants inline
create ring descriptors inline from constants
create piece counts from circumference inline
create wedge geometry and seam meshes inline
animate construct pieces through radial and drop interpolation
track progress, phase, total pieces, gaps, part counts, animation config, and completion
allow pan, zoom, skip, and restart controls
expose construct diagnostics through window.GameHost.getState
```

### Implemented kit services

```txt
construct-spiral-intro-kit
  -> create generic construct piece ids
  -> create generic construct schedules
  -> install pieces
  -> reset state
  -> update progress over time
  -> emit snapshots
  -> report pending, active, settled, newly active, and newly settled pieces
  -> report per-piece progress and status

construct-spiral-intro-kit-smoke
  -> validate the generic kit as a regression guard
```

### Next-needed services

```txt
own live smooth-ring-handoff-v6 profile outside game.html
normalize profile values
emit serializable ring descriptors
emit serializable piece descriptors
emit serializable timeline descriptors
emit source fingerprint
emit source snapshot
prove zero gaps and live part-count parity
prove 92 total pieces
prove total build seconds 19.923
project additive GameHost source diagnostics
splice sourceProfile diagnostics into game.html after fixture proof
confirm central ledger and repo-local pointers align
block scenario bootstrap until typed construct completion exists
```

## Kits

### Implemented/source-backed

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
phantom-command-construct-event-envelope-kit
phantom-command-construct-event-result-kit
phantom-command-scenario-bootstrap-gate-kit
phantom-command-scenario-bootstrap-blocker-kit
```

## Files changed in PhantomCommand

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-08T18-41-41-04-00-source-profile-fixture-manifest-dsk-breakdown.md
.agent/render-audit/2026-07-08T18-41-41-04-00-gamehost-source-profile-consumer-readback.md
.agent/gameplay-audit/2026-07-08T18-41-41-04-00-construct-result-bootstrap-blocker.md
.agent/source-profile-audit/2026-07-08T18-41-41-04-00-source-profile-fixture-manifest.md
.agent/scenario-bootstrap-audit/2026-07-08T18-41-41-04-00-scenario-bootstrap-blocker-contract.md
.agent/deploy-audit/2026-07-08T18-41-41-04-00-fixture-script-build-integration.md
.agent/trackers/2026-07-08T18-41-41-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T18-41-41-04-00.md
```

## Validation status

```txt
runtime source changed: no
branch created: no
pull request created: no
local npm commands run: no
browser smoke run: no
pushed to main: yes
```

## Next safe ledge

```txt
PhantomCommand Source Profile Fixture Manifest + Central Ledger Sync Gate
```
