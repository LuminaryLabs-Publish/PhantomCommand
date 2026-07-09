# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-09T01-28-10-04-00`

## Plan ledger

**Goal:** Compare the full accessible `LuminaryLabs-Publish` repo list against the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger, select one eligible repo, refresh its `.agent` internal docs, and log the result centrally.

**Checklist:**

- [x] Listed accessible `LuminaryLabs-Publish` repos.
- [x] Compared checked repos against central ledger/root-agent state.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Selected one repo: `LuminaryLabs-Publish/PhantomCommand`.
- [x] Identified interaction loop.
- [x] Identified all domains in use.
- [x] Identified all services that kits offer.
- [x] Identified all kits.
- [x] Updated root `.agent` docs.
- [x] Added timestamped architecture, render, gameplay, source-profile, scenario-bootstrap, deploy, tracker, and turn-ledger docs.
- [x] Updated repo-local `kit-registry.json`.
- [x] Updated central repo ledger.
- [x] Added central internal change-log entry.
- [ ] Runtime source files were not changed.
- [ ] Local build/browser/fixture validation was not run.

## Selected repo

```txt
LuminaryLabs-Publish/PhantomCommand
```

## Selection reason

No checked non-Cavalry Publish repo was fully new, missing from central tracking, recently added but undocumented, or missing sampled root `.agent` state.

`PhantomCommand` was selected because repo-local `.agent` state had advanced to `2026-07-09T01-20-59-04-00`, while the central ledger still pointed at `2026-07-08T22-58-02-04-00`. This pass updates both repo-local and central docs around the same next gate.

## Publish repo comparison

```txt
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent present / latest central 2026-07-09T01-09-24-04-00
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / latest central 2026-07-09T00-00-41-04-00
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / latest central 2026-07-09T00-40-20-04-00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PhantomCommand      selected / central ledger catch-up from 2026-07-08T22-58-02-04-00 and repo-local 2026-07-09T01-20-59-04-00
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / latest central 2026-07-09T00-09-22-04-00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present / latest central 2026-07-08T23-40-55-04-00
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / latest central 2026-07-09T00-50-00-04-00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / latest central 2026-07-09T00-20-08-04-00
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent present / latest central 2026-07-08T23-19-33-04-00
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
source-profile-consumer-splice
fixture-build-integration
construct-event-envelope
construct-event-result
construct-completion-idempotency
scenario-bootstrap-gate
scenario-bootstrap-blocker
```

## Services that kits offer

```txt
construct-spiral-intro-kit:
  - create generic construct piece ids
  - create generic spiral/window schedules
  - install/reset/update a construct sequence
  - snapshot pending/active/settled counts
  - query pending, active, settled, newly active, newly settled pieces
  - report per-piece progress and status

construct-spiral-intro-kit-smoke:
  - validate generic kit id/domain path
  - validate generated schedule ordering
  - validate update-to-complete behavior

next source-profile kits must offer:
  - source-owned smooth-ring-handoff-v6 profile
  - profile normalization
  - ring descriptors
  - piece descriptors
  - timeline descriptors
  - source fingerprint
  - source snapshot
  - profile parity report
  - additive GameHost source diagnostics
  - DOM-free fixture rows
  - central ledger pointer readback
  - fixture build gate
```

## Kits identified

```txt
implemented:
  construct-spiral-intro-kit
  construct-spiral-intro-kit-smoke

inline / candidate extraction:
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

`PhantomCommand` should not add RTS gameplay next. The current blocker is still sourceProfile authority: the live `smooth-ring-handoff-v6` profile is embedded in `game.html`, and central tracking had drifted behind repo-local `.agent` state.

## Next safe ledge

```txt
PhantomCommand Central SourceProfile Ledger Freeze + GameHost Consumer Fixture Gate
```

## Validation

Documentation-only update. No runtime source files changed, and no local checkout, `npm install`, `npm run build`, fixture run, browser smoke, or Pages smoke was performed.
