# Project Breakdown: PhantomCommand SourceProfile Fixture Pointer Freeze

**Timestamp:** `2026-07-09T12-55-20-04-00`

## Goal

Compare the accessible `LuminaryLabs-Publish` repository list against the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger, select one eligible repo, update repo-local `.agent` documentation, and sync the central ledger/change log on `main`.

## Checklist

- [x] Listed the accessible `LuminaryLabs-Publish` repository set.
- [x] Compared Publish repos against central ledger state.
- [x] Checked sampled root `.agent/START_HERE.md` state.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Selected one repo only: `LuminaryLabs-Publish/PhantomCommand`.
- [x] Read repo-local `.agent` state.
- [x] Read runtime/source files.
- [x] Identified the current interaction loop.
- [x] Identified domains in use.
- [x] Identified services offered by implemented, inline, and planned kits.
- [x] Identified implemented kits, inline runtime kits, and next-cut kits.
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
- [ ] Runtime source files were not changed.
- [ ] Local npm/browser validation was not run.

## Selection reason

No checked non-Cavalry Publish repo was fully new, absent from central tracking, missing sampled root `.agent` state, recently added but undocumented, or otherwise undocumented.

`PhantomCommand` was selected because its repo-local `.agent` state had advanced to `2026-07-09T12-50-00-04-00`, while central tracking still lagged behind at `2026-07-09T10-29-02-04-00`. This pass freezes repo-local and central pointers around the same source-profile fixture target.

## Publish repositories observed

```txt
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-09T12-08-46-04-00
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-09T12-25-39-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest 2026-07-09T11-30-50-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T10-40-00-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T11-00-39-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T11-39-50-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T11-50-08-04-00
LuminaryLabs-Publish/PhantomCommand       selected / repo-local 2026-07-09T12-50-00-04-00 / central latest 2026-07-09T10-29-02-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T12-00-36-04-00
```

## Product read

`PhantomCommand` is a static Vite/Three.js construct proof with a menu route and a live `game.html` construct route.

The live route imports Three.js from CDN, defines `smooth-ring-handoff-v6` constants inline, creates 10 no-gap construct rings and 92 stone pieces, animates them into a command platform, mutates HUD state, and exposes `window.GameHost` diagnostics.

The visible construct scene should not be rewritten first.

## Current interaction loop

```txt
open index.html
  -> menu renders Phantom Command copy and route controls
  -> Start button or Open Scene link routes to game.html
  -> game.html imports Three.js from CDN
  -> inline runtime creates renderer, scene, fog, lights, camera, HUD, materials, and input state
  -> inline constants define smooth-ring-handoff-v6
  -> inline ring math creates 10 no-gap construct rings
  -> inline ringParts() computes [5,5,5,5,6,8,10,12,16,20]
  -> inline wedge geometry creates 92 stone pieces
  -> construct(seq) animates each piece by ring delay and part delay
  -> pan, zoom, skip, restart, resize, and blur handlers mutate inline runtime state
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

## Services and kits

### Implemented kits

```txt
construct-spiral-intro-kit
  -> create generic construct piece ids
  -> create generic spiral/window schedules
  -> install pieces
  -> reset state
  -> tick progress
  -> emit snapshots
  -> expose schedule, pending, active, settled, newlyActive, and newlySettled pieces
  -> report per-piece progress and status

construct-spiral-intro-kit-smoke
  -> verify generic kit id/domain path
  -> verify schedule ordering
  -> verify active cap/window
  -> verify completion
```

### Current inline runtime services

```txt
Three.js renderer creation
scene/fog/light/material/camera setup
smooth-ring-handoff-v6 constant declaration
ring descriptor math
piece count math
wedge geometry generation
seam geometry generation
center disc / totem proxy / commander proxy construction
radial/drop construct animation
HUD mutation
pan/zoom/skip/restart controls
GameHost diagnostics
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

`PhantomCommand` should not expand into RTS gameplay yet.

The blocker remains source-profile proof: the live `smooth-ring-handoff-v6` constants, descriptor math, timeline, and GameHost projection are still inline in `game.html`. The existing `construct-spiral-intro-kit` is a useful generic sequence kit, but it does not source-own or prove the exact live v6 ring descriptor and timing profile.

## Next safe ledge

```txt
PhantomCommand SourceProfile Fixture Pointer Freeze + Build Gate Readback
```

The next implementation should source-own the v6 profile, reproduce the exact live ring/piece/timeline descriptors, generate source fingerprint and snapshot rows, expose additive `GameHost.getState().sourceProfile`, prove legacy GameHost compatibility, run DOM-free fixture rows before static artifact copy, and keep scenario bootstrap blocked until source-profile parity and construct result authority exist.

## Files updated in this repo

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-09T12-55-20-04-00-sourceprofile-fixture-pointer-freeze-dsk-map.md
.agent/render-audit/2026-07-09T12-55-20-04-00-gamehost-sourceprofile-consumer-readback.md
.agent/gameplay-audit/2026-07-09T12-55-20-04-00-construct-result-bootstrap-blocker-loop.md
.agent/source-profile-audit/2026-07-09T12-55-20-04-00-live-profile-fixture-pointer-contract.md
.agent/scenario-bootstrap-audit/2026-07-09T12-55-20-04-00-bootstrap-blocked-by-sourceprofile-fixture.md
.agent/deploy-audit/2026-07-09T12-55-20-04-00-build-fixture-before-pages-map.md
.agent/trackers/2026-07-09T12-55-20-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-09T12-55-20-04-00.md
```

## Validation status

Documentation-only pass.

Runtime source files were not changed.

Local npm validation was not run.

Browser smoke was not run.

No branch or PR was created.
