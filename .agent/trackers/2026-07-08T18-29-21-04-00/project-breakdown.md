# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-08T18-29-21-04-00`

## Goal

Compare the full accessible `LuminaryLabs-Publish` repo list against central `LuminaryLabs-Dev/LuminaryLabs` tracking, select one eligible repo, and update repo-local plus central internal docs without changing runtime source.

## Checklist

- [x] Listed accessible `LuminaryLabs-Publish` repos.
- [x] Compared Publish repos against central ledger state.
- [x] Sampled root `.agent/START_HERE.md` state for non-Cavalry candidates.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Selected one repo: `LuminaryLabs-Publish/PhantomCommand`.
- [x] Read existing repo-local `.agent` state.
- [x] Read source files for runtime and kit evidence.
- [x] Identified the interaction loop.
- [x] Identified domains in use.
- [x] Identified services that kits offer.
- [x] Identified implemented kits and next-cut kits.
- [x] Updated root `.agent` docs.
- [x] Added timestamped architecture, render, gameplay, source-profile, scenario-bootstrap, deploy, tracker, and turn-ledger docs.
- [x] Updated repo-local `kit-registry.json`.
- [x] Updated central repo ledger.
- [x] Added central internal change-log entry.
- [ ] Runtime source was not changed.
- [ ] Local build/browser/fixture validation was not run.

## Publish repo comparison

```txt
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / latest sampled alignment 2026-07-08T17-49-51-04-00
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent present / latest sampled alignment 2026-07-08T18-19-43-04-00
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / latest sampled alignment 2026-07-08T18-09-21-04-00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / latest sampled alignment 2026-07-08T17-09-48-04-00
LuminaryLabs-Publish/PhantomCommand      selected fallback / previous sampled alignment 2026-07-08T15-58-59-04-00
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / latest sampled alignment 2026-07-08T16-51-11-04-00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / latest sampled alignment 2026-07-08T17-31-22-04-00
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent present / latest sampled alignment 2026-07-08T16-19-57-04-00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present / latest sampled alignment 2026-07-08T16-20-00-04-00
```

## Selection result

`PhantomCommand` was selected because no checked non-Cavalry repo was fully new, missing from the central ledger, missing root `.agent` state, or recently added but undocumented.

It was the oldest sampled eligible fallback, and its high-value unresolved seam is source-profile fixture acceptance plus GameHost sourceProfile readback.

## Current interaction loop

```txt
open index.html
  -> main menu renders title, subtitle, Start button, and Open Scene link
  -> Start or Open Scene routes to game.html
  -> game.html imports Three.js from CDN
  -> inline runtime creates renderer, scene, fog, lights, camera, HUD, materials, and input state
  -> inline constants define smooth-ring-handoff-v6
  -> inline ring math creates 10 no-gap construct rings
  -> inline ringParts() computes [5,5,5,5,6,8,10,12,16,20]
  -> inline wedge geometry creates 92 stone pieces
  -> construct(seq) animates each piece by ring delay and part delay
  -> WASD/arrows pan the camera
  -> mouse wheel zooms
  -> Space/Skip jumps to complete
  -> R/Restart resets
  -> HUD reports constructed count, phase, build id, and progress
  -> window.GameHost exposes skipConstruct(), restartConstruct(), and getState()
```

## Target proof loop

```txt
source-owned smooth-ring-handoff-v6 profile
  -> normalizeSmoothHandoffProfile
  -> derivePhantomCommandRingDescriptors
  -> derivePhantomCommandPieceDescriptors
  -> derivePhantomCommandTimelineContract
  -> derivePhantomCommandSourceFingerprint
  -> createPhantomCommandSourceSnapshot
  -> createPhantomCommandProfileParityReport
  -> createGameHostSourceProfileDiagnostics
  -> DOM-free fixture rows
  -> game.html additive sourceProfile consumer readback
  -> ConstructEventResult and ScenarioBootstrapResult remain blocked until profile parity passes
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
source-profile-consumer-splice
construct-event-envelope
construct-event-result
construct-completion-idempotency
scenario-bootstrap-gate
scenario-bootstrap-blocker
legacy-gamehost-compatibility
```

## Services in use

```txt
current app services:
  serve index.html menu
  route Start/Open Scene to game.html
  import Three.js from CDN
  create renderer, scene, camera, fog, lights, materials, HUD, and input state inline
  create smooth-ring-handoff-v6 constants inline
  compute ring descriptors inline
  compute piece descriptors inline
  animate construct pieces inline
  handle pan / zoom / skip / restart
  expose window.GameHost state

implemented kit services:
  construct-spiral-intro-kit generic id/schedule/install/reset/update/snapshot/query surface
  construct-spiral-intro-kit-smoke generic schedule regression guard

next services:
  source-owned profile constants
  ring and piece descriptor derivation
  handoff/timeline descriptor derivation
  source fingerprint
  source snapshot
  parity report
  DOM-free source-profile fixture
  additive GameHost sourceProfile diagnostics
  game.html consumer splice
  scenario bootstrap blocker
```

## Kits

```txt
implemented:
  construct-spiral-intro-kit
  construct-spiral-intro-kit-smoke

inline runtime kits to extract:
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

next-cut kits:
  phantom-command-smooth-handoff-profile-kit
  phantom-command-ring-descriptor-kit
  phantom-command-piece-descriptor-kit
  phantom-command-handoff-timeline-contract-kit
  phantom-command-source-profile-fingerprint-kit
  phantom-command-source-profile-snapshot-kit
  phantom-command-profile-parity-report-kit
  phantom-command-gamehost-source-diagnostics-kit
  phantom-command-source-profile-fixture-kit
  phantom-command-gamehost-source-consumer-kit
  phantom-command-construct-event-envelope-kit
  phantom-command-construct-event-result-kit
  phantom-command-scenario-bootstrap-gate-kit
  phantom-command-scenario-bootstrap-blocker-kit
```

## Files changed in this repo

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-08T18-29-21-04-00-source-profile-fixture-dsk-breakdown.md
.agent/render-audit/2026-07-08T18-29-21-04-00-gamehost-source-profile-readback-gate.md
.agent/gameplay-audit/2026-07-08T18-29-21-04-00-construct-result-bootstrap-blocker.md
.agent/source-profile-audit/2026-07-08T18-29-21-04-00-fixture-row-acceptance-contract.md
.agent/scenario-bootstrap-audit/2026-07-08T18-29-21-04-00-construct-complete-command-boundary.md
.agent/deploy-audit/2026-07-08T18-29-21-04-00-fixture-check-integration.md
.agent/trackers/2026-07-08T18-29-21-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T18-29-21-04-00.md
```

## Main finding

`PhantomCommand` should not add RTS gameplay next. The current source blocker is that the live construct profile is embedded in `game.html`. The next implementation should source-own the v6 profile, prove descriptor parity through DOM-free fixtures, add additive GameHost `sourceProfile` readback, and keep scenario bootstrap blocked until typed construct results exist.

## Next safe ledge

```txt
PhantomCommand Source Profile Fixture Row Acceptance + GameHost Readback Gate
```

## Validation

Docs-only update.

No runtime source files were changed.

No local checkout, `npm install`, `npm run build`, `npm start`, fixture run, browser smoke, GitHub Pages smoke, or Playwright validation was performed.