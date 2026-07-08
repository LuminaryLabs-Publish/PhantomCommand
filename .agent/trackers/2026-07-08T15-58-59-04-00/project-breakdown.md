# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-08T15-58-59-04-00`

## Goal

Refresh the repo-local `.agent` state for `LuminaryLabs-Publish/PhantomCommand`, compare the current Publish repo set against the central ledger, and narrow the next source pass from a module fixture map into an exact source-profile consumer splice plan.

## Checklist

- [x] Compare accessible `LuminaryLabs-Publish` repositories against `LuminaryLabs-Dev/LuminaryLabs` central tracking.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Select one eligible repo only.
- [x] Read repo-local `.agent` state.
- [x] Read central PhantomCommand ledger.
- [x] Read `README.md`, `package.json`, `game.html`, and `src/kits/construct-spiral-intro-kit/index.js`.
- [x] Identify the interaction loop.
- [x] Identify domains in use.
- [x] Identify services that the kits offer.
- [x] Identify implemented, inline, and next-cut kits.
- [x] Add timestamped architecture, render, gameplay, source-profile, tracker, and turn-ledger docs.
- [x] Refresh root `.agent` docs and kit registry.
- [x] Update central repo ledger and internal change log.
- [ ] Runtime source edit.
- [ ] Local build validation.
- [ ] DOM-free source-profile fixture validation.
- [ ] Browser smoke.

## Selection result

Selected repo:

```txt
LuminaryLabs-Publish/PhantomCommand
```

Selection reason:

```txt
No checked non-Cavalry Publish repo was fully new, central-ledger absent, undocumented, recently added but undocumented, or missing sampled root .agent/START_HERE.md state.

PhantomCommand was selected as the oldest eligible fallback in the current central ledger readback. Its previous ledger timestamp was 2026-07-08T14-08-24-04-00, older than the observed current follow-up timestamps for ZombieOrchard, TheUnmappedHouse, PrehistoricRush, MyCozyIsland, TheOpenAbove, AetherVale, IntoTheMeadow, and HorrorCorridor.

The current unresolved seam is source-profile consumption: the docs already define source-profile modules, but game.html still needs an exact additive consumer splice map before source changes.
```

## Publish repositories observed

```txt
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / newer central follow-up observed
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent present / newer central follow-up observed
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / newer central follow-up observed
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present / newer central follow-up observed
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent present / newer central follow-up observed
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / newer central follow-up observed
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / newer central follow-up observed
LuminaryLabs-Publish/PhantomCommand      selected fallback / previous central update 2026-07-08T14-08-24-04-00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / newer central follow-up observed
```

## Current product read

`PhantomCommand` is a static Vite / Three.js single-player PvE undead RTS prototype. The active playable proof is still a construct-viewer slice: the menu routes into `game.html`, where a no-gap concentric stone command platform assembles around the Grim Reaper Totem and becomes `command online`.

## Current interaction loop

```txt
open index.html
  -> render menu, Start button, and Open Scene link
  -> route to game.html
  -> import Three.js from CDN
  -> create renderer, scene, fog, lights, camera, materials, HUD, and input state inline
  -> define smooth-ring-handoff-v6 constants inline
  -> derive 10 no-gap ring descriptors inline
  -> compute ring part counts [5,5,5,5,6,8,10,12,16,20]
  -> create 92 wedge pieces inline
  -> requestAnimationFrame calls construct(seq)
  -> WASD/arrows pan camera
  -> mouse wheel changes zoomTarget
  -> Space/Skip sets startedAt to complete the construct
  -> R/Restart resets construct timing
  -> HUD mutates constructed count, phase, status, and progress
  -> window.GameHost.getState returns construct-only diagnostics
```

## Target source-profile consumer loop

```txt
load game.html
  -> import source-owned smooth-ring-handoff-v6 profile modules
  -> derive source profile, ring descriptors, piece descriptors, and timeline descriptors without DOM
  -> run profile parity rows against the live expected constants
  -> keep existing visual construction intact
  -> replace duplicated inline constants only after fixture proof
  -> expose additive GameHost sourceProfile diagnostics
  -> keep skipConstruct, restartConstruct, and current getState fields compatible
  -> later allow ConstructEventResult and ScenarioBootstrapResult reducers
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
construct-descriptor-authority
ring-descriptor-generation
piece-descriptor-generation
piece-delay-policy
piece-settle-policy
handoff-timeline-contract
source-profile-fixture-runner
gamehost-source-diagnostics
construct-event-envelope
construct-event-result
construct-completion-idempotency
scenario-bootstrap-gate
legacy-gamehost-compatibility
```

## Services offered by current kits

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

construct-spiral-intro-kit-smoke
  -> assert kit id and domain path
  -> install generated pieces
  -> assert schedule ordering
  -> tick until complete
  -> assert active count cap
  -> assert active ring window
  -> assert all generated pieces settle
```

## Services currently inline in `game.html`

```txt
create live smooth-ring-handoff-v6 constants
compute ringStartTimes
compute no-gap ring widths and radii
compute ring part counts from circumference
create wedge geometry
create seam meshes
create material palette
create center disc, Grim Reaper Totem, and Phantom Commander meshes
animate construct pieces by radial/drop interpolation
mutate HUD state
handle pan, zoom, skip, restart, resize, and blur
publish construct-only GameHost state
```

## Needed source-profile services

```txt
source-owned profile constants
profile normalizer
ring descriptor derivation
piece descriptor derivation
timeline descriptor derivation
source fingerprint
source snapshot
profile parity report
additive GameHost source diagnostics
DOM-free source-profile fixture
consumer splice in game.html after fixture proof
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
phantom-command-construct-completion-idempotency-kit
phantom-command-scenario-bootstrap-gate-kit
```

## Main finding

The repo is ready for a narrow source-profile cutover, not an RTS gameplay expansion. The next implementation should first add pure source modules and fixtures, then splice their output into `game.html` additively through `window.GameHost.getState().sourceProfile`. The current visible construct should stay unchanged.

## Next safe ledge

```txt
PhantomCommand Source Profile Consumer Splice Map + Fixture Gate
```

Stop when a DOM-free fixture proves profile constants, ring descriptors, piece descriptors, total build seconds, source fingerprint stability, snapshot serialization, parity report success, and additive GameHost diagnostic shape. Do not begin scenario bootstrap reducers until that proof exists.

## Validation status

```txt
repo-list comparison: performed
central ledger comparison: performed
source readback: performed
repo-local .agent docs updated: performed
central ledger/change-log updated: performed
runtime source edit: not performed
node fixture run: not performed
npm run build: not performed
browser smoke: not performed
branch created: no
pushed to main: yes
```
