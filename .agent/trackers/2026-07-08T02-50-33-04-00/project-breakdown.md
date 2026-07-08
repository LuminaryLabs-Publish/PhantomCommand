# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-08T02:50:33-04:00`

## Goal

Normalize `PhantomCommand` repo-local `.agent` state after finding that the repo had a central ledger and kit registry, but was missing required root `.agent` entrypoint docs.

## Selection checklist

- [x] Listed full `LuminaryLabs-Publish` repository set.
- [x] Compared Publish set against `LuminaryLabs-Dev/LuminaryLabs` ledger search results.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome` by standing rule.
- [x] Checked `LuminaryLabs-Publish/PhantomCommand` root `.agent/START_HERE.md`.
- [x] Confirmed root `.agent/START_HERE.md` was missing before this pass.
- [x] Selected `LuminaryLabs-Publish/PhantomCommand` because it was tracked but missing root agent audit entrypoints.

## Source files read

```txt
README.md
package.json
index.html
game.html
scripts/build-static.mjs
.agent/kit-registry.json
src/kits/construct-spiral-intro-kit/index.js
tests/construct-spiral-intro-kit-smoke.mjs
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/PhantomCommand.md
```

## Interaction loop

```txt
index.html menu
  -> Start/Open Scene
  -> game.html
  -> Three.js render host
  -> sequential-ring-v5 construct forms around Grim Reaper Totem
  -> player pans / zooms / skips / restarts
  -> HUD reports construct progress
  -> GameHost reports construct state
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
camera-navigation
keyboard-pan-input
wheel-zoom-input
button-input
hud-diagnostics
gamehost-authority
inline-construct-runtime
sequential-ring-v5-profile
construct-source-authority
construct-profile-normalization
construct-profile-parity
construct-source-fingerprint
construct-source-snapshot
construct-descriptor-authority
ring-count-policy
ring-width-policy
ring-growth-policy
no-gap-radius-policy
ring-part-count-policy
ring-descriptor-generation
piece-descriptor-generation
piece-id-policy
piece-seed-policy
piece-angle-policy
piece-delay-policy
piece-settle-policy
wedge-geometry-generation
stone-material-detail
construct-animation-timeline
inner-first-timeline-contract
ring-transition-margin-policy
construct-event-envelope
construct-event-result
construct-event-reducer
construct-completion-idempotency
construct-event-journal
construct-snapshot-contract
scenario-bootstrap-command
scenario-bootstrap-preflight
scenario-bootstrap-result
scenario-bootstrap-gate
scenario-bootstrap-journal
scenario-bootstrap-snapshot
scenario-mode-state-machine
scenario-boundary-placeholder
fixture-script-runner
legacy-gamehost-compatibility
```

## Services identified

```txt
serve static menu route
serve static game route
route Start/Open Scene to game.html
copy static deploy files into dist
create renderer/scene/fog/lights/camera/materials/HUD/input inline
create live construct constants inline
create live ring descriptors inline
create live wedge geometry inline
animate construct pieces
track progress and phase
pan/zoom/skip/restart
publish GameHost state
create generic construct intro schedules through construct-spiral-intro-kit
install/reset/update/snapshot generic construct kit state
validate generic construct kit with smoke test
```

## Kits identified

Implemented:

```txt
construct-spiral-intro-kit
construct-spiral-intro-kit-smoke
```

Needed next:

```txt
phantom-command-source-construct-profile-kit
phantom-command-source-profile-fingerprint-kit
phantom-command-source-profile-snapshot-kit
phantom-command-ring-descriptor-kit
phantom-command-piece-descriptor-kit
phantom-command-piece-delay-policy-kit
phantom-command-piece-settle-policy-kit
phantom-command-inner-first-timeline-contract-kit
phantom-command-ring-transition-margin-kit
phantom-command-profile-parity-report-kit
phantom-command-construct-event-envelope-kit
phantom-command-construct-event-result-kit
phantom-command-construct-event-reducer-kit
phantom-command-construct-completion-idempotency-kit
phantom-command-construct-event-journal-kit
phantom-command-construct-snapshot-contract-kit
phantom-command-scenario-bootstrap-command-kit
phantom-command-scenario-bootstrap-preflight-kit
phantom-command-scenario-bootstrap-result-kit
phantom-command-scenario-bootstrap-gate-kit
phantom-command-scenario-bootstrap-journal-kit
phantom-command-scenario-bootstrap-snapshot-kit
phantom-command-gamehost-construct-diagnostics-kit
phantom-command-fixture-script-runner-kit
```

## Files added in this repo

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/domain-service-breakdown.md
.agent/render-audit/construct-render-audit.md
.agent/gameplay-audit/construct-to-rts-gap.md
.agent/trackers/2026-07-08T02-50-33-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T02-50-33-04-00.md
```

## Validation

Documentation-only pass.

No runtime code changed.

No build or smoke command was run.

## Next safe ledge

```txt
PhantomCommand Construct Source Authority + Scenario Bootstrap Fixture Gate
```
