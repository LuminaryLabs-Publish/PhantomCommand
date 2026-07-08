# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-08T04:40:21-04:00`

## Plan ledger

**Goal:** Compare the full `LuminaryLabs-Publish` repo list against central tracking, select one eligible non-Cavalry repo, update repo-local `.agent` docs with a fresh breakdown, and log the central ledger change.

**Checklist**

- [x] List the current `LuminaryLabs-Publish` repos.
- [x] Compare the Publish list against `LuminaryLabs-Dev/LuminaryLabs` tracking.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Select one repo only.
- [x] Read repo-local `.agent` docs.
- [x] Read current source files.
- [x] Identify the interaction loop.
- [x] Identify domains.
- [x] Identify services.
- [x] Identify kits.
- [x] Update root `.agent` docs.
- [x] Add system-specific construct-source audit.
- [x] Add timestamped tracker entry.
- [x] Add timestamped turn-ledger entry.
- [x] Update central ledger.
- [x] Add central internal change-log entry.
- [x] Push only to `main`.

## Full Publish repo comparison

```txt
IntoTheMeadow       tracked, root .agent present, follow-up planned
HorrorCorridor      tracked, root .agent present, follow-up planned
AetherVale          tracked, root .agent present, follow-up planned
ZombieOrchard       tracked, root .agent present, follow-up planned
TheUnmappedHouse    tracked, root .agent present, rollup gap noted
MyCozyIsland        tracked, root .agent present, follow-up planned
TheOpenAbove        tracked, root .agent present, follow-up planned
PhantomCommand      selected, oldest eligible source-authority follow-up
TheCavalryOfRome    excluded by standing rule
PrehistoricRush     tracked, root .agent present, follow-up planned
```

## Selection reason

`PhantomCommand` was selected by fallback oldest eligible follow-up rotation among checked non-excluded Publish repos.

The central ledger already tracks it, and root `.agent` state exists. The remaining high-value gap is that the live `game.html` runtime still owns source profile constants, descriptor derivation, construct animation state, completion phase, camera/input, HUD mutation, and `window.GameHost` diagnostics inline.

## Interaction loop

```txt
open index.html
  -> click Start or Open Scene
  -> navigate to game.html
  -> import Three.js from CDN
  -> create renderer, scene, fog, lights, camera, HUD, materials, and input state
  -> create sequential-ring-v5 constants inline
  -> create ring descriptors inline
  -> create wedge pieces inline
  -> animate 92 pieces through radial/drop interpolation
  -> pan/zoom/skip/restart through keyboard, mouse, and buttons
  -> update HUD and phase
  -> expose GameHost state
  -> phase becomes command online when all pieces settle
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
sequential-ring-v5-profile
construct-source-authority
construct-profile-normalization
construct-profile-parity
construct-source-fingerprint
construct-source-snapshot
construct-descriptor-authority
ring-descriptor-generation
piece-descriptor-generation
piece-delay-policy
piece-settle-policy
wedge-geometry-generation
stone-material-detail
construct-animation-timeline
inner-first-timeline-contract
ring-transition-margin-policy
construct-event-result
construct-completion-idempotency
construct-snapshot-contract
scenario-bootstrap-gate
scenario-bootstrap-result
scenario-bootstrap-snapshot
fixture-script-runner
legacy-gamehost-compatibility
```

## Services that kits offer

Implemented kit services:

```txt
construct-spiral-intro-kit
  -> create construct piece ids
  -> create generic spiral schedules
  -> install pieces
  -> reset state
  -> update progress over time
  -> emit snapshots
  -> report pending/active/settled pieces
  -> report newly active and newly settled pieces
  -> report piece progress and status
```

Needed services:

```txt
source-owned sequential-ring-v5 profile
profile normalization
source fingerprinting
source snapshot projection
ring descriptor generation
piece descriptor generation
timing descriptor generation
transition margin calculation
profile parity reporting
construct event result reduction
construct completion idempotency
construct snapshot projection
scenario bootstrap preflight
scenario bootstrap result reduction
scenario bootstrap snapshot projection
legacy GameHost diagnostics adapter
DOM-free fixture runner
```

## Kits

Implemented:

```txt
construct-spiral-intro-kit
construct-spiral-intro-kit-smoke
```

Next-cut local kits:

```txt
phantom-command-source-construct-profile-kit
phantom-command-ring-descriptor-kit
phantom-command-piece-descriptor-kit
phantom-command-inner-first-timeline-contract-kit
phantom-command-profile-parity-report-kit
phantom-command-construct-event-result-kit
phantom-command-construct-snapshot-contract-kit
phantom-command-scenario-bootstrap-result-kit
phantom-command-scenario-bootstrap-snapshot-kit
phantom-command-gamehost-diagnostics-adapter-kit
phantom-command-fixture-script-runner-kit
```

## Files changed in this repo

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/construct-source-audit/source-authority-fixture-gate.md
.agent/trackers/2026-07-08T04-40-21-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T04-40-21-04-00.md
```

## Validation performed

```txt
repo-list comparison: yes
central ledger comparison: yes
source readback: yes
root .agent update: yes
timestamped tracker: yes
timestamped turn ledger: yes
runtime source changed: no
branch created: no
pull request created: no
```

## Validation not performed

```txt
npm install: no
npm run build: no
npm start: no
browser smoke: no
Playwright smoke: no
GitHub Pages post-deploy check: no
```

## Next safe ledge

```txt
PhantomCommand Construct Source Authority + Scenario Bootstrap Fixture Gate
```

Implement this before RTS units, resources, combat, route expansion, renderer extraction, or NexusEngine/ProtoKits promotion.
