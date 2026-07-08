# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-08T06:19:51-04:00`

## Chosen repo

```txt
LuminaryLabs-Publish/PhantomCommand
```

## Why this repo was chosen

The full accessible `LuminaryLabs-Publish` repo list was compared against `LuminaryLabs-Dev/LuminaryLabs` central tracking.

No checked non-Cavalry repo was new, absent from the ledger, or missing root `.agent/START_HERE.md` state.

`PhantomCommand` was selected as a fallback follow-up because its root `.agent` and central ledger still centered the previous `sequential-ring-v5` target while the live `game.html` source now declares `smooth-ring-handoff-v6`.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

## Publish repo inventory checked

```txt
HorrorCorridor      tracked
AetherVale          tracked
TheOpenAbove        tracked
TheCavalryOfRome    excluded
PhantomCommand      selected follow-up
PrehistoricRush     tracked
ZombieOrchard       tracked
IntoTheMeadow       tracked
MyCozyIsland        tracked
TheUnmappedHouse    tracked
```

## Source evidence read

```txt
README.md
package.json
index.html
game.html
src/kits/construct-spiral-intro-kit/index.js
tests/construct-spiral-intro-kit-smoke.mjs
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/PhantomCommand.md
```

## Interaction loop

```txt
index.html
  -> menu route
  -> Start button or Open Scene link
  -> game.html
  -> Three.js CDN runtime
  -> inline smooth-ring-handoff-v6 constants
  -> inline ring descriptors
  -> inline piece descriptors
  -> wedge mesh construction
  -> construct(seq) animation
  -> HUD progress/phase/build display
  -> camera pan/zoom/skip/restart input
  -> window.GameHost diagnostics
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

## Services the kits offer

### Implemented source kit

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
```

### Implemented smoke proof

```txt
construct-spiral-intro-kit-smoke
  -> assert kit id
  -> assert domain path
  -> install generated ring pieces
  -> assert schedule ordering
  -> tick until complete
  -> assert active-count cap
  -> assert active-ring window
  -> assert all pieces settled
```

### Needed services

```txt
createSmoothHandoffProfile
normalizeSmoothHandoffProfile
fingerprintSmoothHandoffProfile
createSmoothHandoffSourceSnapshot
createRingDescriptors
createPieceDescriptors
createTimingDescriptors
createHandoffMarginDescriptors
createConstructParityReport
createConstructEventEnvelope
reduceConstructEvent
projectConstructSnapshot
preflightScenarioBootstrap
reduceScenarioBootstrap
projectScenarioBootstrapSnapshot
adaptLegacyGameHostDiagnostics
```

## Kits identified

Implemented:

```txt
construct-spiral-intro-kit
construct-spiral-intro-kit-smoke
```

Inline runtime kits to extract:

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

Next-cut kits:

```txt
phantom-command-smooth-handoff-profile-kit
phantom-command-source-profile-fingerprint-kit
phantom-command-source-profile-snapshot-kit
phantom-command-ring-descriptor-kit
phantom-command-piece-descriptor-kit
phantom-command-piece-delay-policy-kit
phantom-command-piece-settle-policy-kit
phantom-command-handoff-timeline-contract-kit
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

## Main finding

The live route is no longer accurately represented by older `.agent` language that targeted `sequential-ring-v5` and a `31.915` second total-build fixture.

Current `game.html` evidence targets:

```txt
build id: smooth-ring-handoff-v6
rings: 10
ring gaps: all 0
ring parts: [5,5,5,5,6,8,10,12,16,20]
total pieces: 92
total build seconds: 19.923
```

## Files changed

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/construct-source-audit/smooth-handoff-v6-source-drift.md
.agent/kit-registry.json
.agent/trackers/2026-07-08T06-19-51-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T06-19-51-04-00.md
```

## Validation results

Performed:

```txt
GitHub installation repo list read
central ledger search/read
repo-local .agent read
repo-local source read
repo-local docs updated
```

Not performed:

```txt
local checkout
npm install
npm run build
npm start
node tests/construct-spiral-intro-kit-smoke.mjs
browser smoke
GitHub Pages smoke
implementation source edit
```

## Next safe ledge

```txt
PhantomCommand Smooth Ring Handoff V6 Source Authority + Scenario Bootstrap Fixture Gate
```

Build the source-owned profile and DOM-free parity fixture before renderer extraction or RTS gameplay expansion.