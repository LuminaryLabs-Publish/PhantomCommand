# Project Breakdown: PhantomCommand SourceProfile Ledger Parity

**Timestamp:** `2026-07-09T10-29-02-04-00`

## Goal

Compare the accessible `LuminaryLabs-Publish` repo list against `LuminaryLabs-Dev/LuminaryLabs` central tracking, select one eligible repo, update repo-local `.agent` documentation, and sync the central ledger/change-log.

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
- [ ] Runtime source files were not changed.
- [ ] Local npm/browser validation was not run.

## Selection reason

No checked non-Cavalry Publish repo was fully new, absent from central tracking, missing sampled root `.agent` state, recently added but undocumented, or otherwise undocumented.

`PhantomCommand` was selected as the oldest eligible central-ledger fallback and because the source-profile fixture/readback gate remains unresolved.

## Publish repositories observed

```txt
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-09T09-50-00-04-00
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-09T09-59-27-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest 2026-07-09T08-50-00-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T07-41-29-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T08-02-33-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T08-29-38-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T09-36-24-04-00
LuminaryLabs-Publish/PhantomCommand       selected / oldest eligible central fallback / central latest 2026-07-09T10-20-44-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T09-10-50-04-00
```

## Product read

`PhantomCommand` is a static Vite/Three.js construct proof with a menu route and a live `game.html` construct route.

The live route imports Three.js from CDN, defines `smooth-ring-handoff-v6` constants inline, creates 10 no-gap rings and 92 stone pieces, animates them into a command platform, and exposes `window.GameHost` diagnostics.

## Interaction loop

```txt
index.html menu
  -> game.html
  -> inline Three.js renderer
  -> inline smooth-ring-handoff-v6 profile
  -> 10 zero-gap rings
  -> 92 stone pieces
  -> pan / zoom / skip / restart
  -> HUD progress and phase
  -> GameHost construct diagnostics
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
  -> update progress
  -> emit snapshots
  -> expose schedule and piece status queries

construct-spiral-intro-kit-smoke
  -> verify generic kit id/domain path
  -> verify schedule ordering
  -> verify active cap/window
  -> verify completion
```

### Current inline runtime services

```txt
Three renderer creation
scene/fog/light/material/camera setup
ring descriptor math
piece descriptor math
wedge geometry generation
construct animation
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

`PhantomCommand` should not be expanded into RTS gameplay yet.

The visible construct route is stable, but live source authority is still inline in `game.html`; the implemented source kit is generic and does not reproduce the live `smooth-ring-handoff-v6` profile.

The next implementation should source-own the profile, prove exact descriptor/timeline parity through DOM-free fixtures, then add additive `GameHost.getState().sourceProfile` readback without breaking legacy `GameHost` fields.

## Next safe ledge

```txt
PhantomCommand SourceProfile Ledger Parity + Build Gate Readback
```

## Files updated in this repo

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-09T10-29-02-04-00-sourceprofile-ledger-parity-dsk-map.md
.agent/render-audit/2026-07-09T10-29-02-04-00-gamehost-sourceprofile-consumer-readback.md
.agent/gameplay-audit/2026-07-09T10-29-02-04-00-construct-profile-result-blocker-loop.md
.agent/source-profile-audit/2026-07-09T10-29-02-04-00-live-v6-ledger-parity-contract.md
.agent/scenario-bootstrap-audit/2026-07-09T10-29-02-04-00-construct-result-precondition-freeze.md
.agent/deploy-audit/2026-07-09T10-29-02-04-00-sourceprofile-fixture-build-gate.md
.agent/trackers/2026-07-09T10-29-02-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-09T10-29-02-04-00.md
```

## Validation status

Documentation-only pass.

Runtime source was not changed.

Local npm validation was not run.

Browser smoke was not run.

No branch or PR was created.
