# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-08T14-08-24-04-00`

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Selected target:** `PhantomCommand`

## Selection result

The accessible `LuminaryLabs-Publish` repository list was compared against the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger and sampled root `.agent/START_HERE.md` state.

No checked non-Cavalry Publish repo was fully new, missing from the central ledger, undocumented, recently added but undocumented, or missing sampled root `.agent` state.

`PhantomCommand` was selected as the oldest eligible fallback because its previous root alignment was `2026-07-08T12-41-31-04-00`, older than the sampled non-Cavalry Publish repos, and its live construct source profile is still inline in `game.html`.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

## Publish repos checked

```txt
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / latest sampled alignment 2026-07-08T13-39-15-04-00
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent present / latest sampled alignment 2026-07-08T13-59-50-04-00
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / latest sampled alignment 2026-07-08T13-50-37-04-00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / latest sampled alignment 2026-07-08T13-11-07-04-00
LuminaryLabs-Publish/PhantomCommand      selected fallback / previous root alignment 2026-07-08T12-41-31-04-00
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / latest sampled alignment 2026-07-08T13-18-13-04-00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / latest sampled alignment 2026-07-08T13-31-29-04-00
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent present / latest sampled alignment 2026-07-08T12-59-11-04-00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present / latest sampled alignment 2026-07-08T12-51-50-04-00
```

## Product read

`PhantomCommand` is a static Vite / Three.js publish repo for a single-player PvE undead RTS prototype.

The current user-facing surface is still a two-route flow:

```txt
index.html
  -> main menu
  -> game.html
  -> smooth-ring-handoff-v6 opening construct scene
```

The current proof is visually useful and should be preserved. The issue is not the visible construct. The issue is that `game.html` still owns the live profile constants, ring math, piece math, timing math, animation loop, HUD mutation, camera controls, and `window.GameHost` projection inline.

## Current interaction loop

```txt
open index.html
  -> main menu renders Phantom Command title and Start / Open Scene affordances
  -> user enters game.html
  -> game.html imports Three.js from CDN
  -> inline constants define smooth-ring-handoff-v6
  -> inline ring math creates ten contiguous zero-gap construct rings
  -> inline ringParts() derives [5,5,5,5,6,8,10,12,16,20]
  -> inline makePiece() creates 92 wedge meshes and seams
  -> requestAnimationFrame calls construct(time - startedAt)
  -> user can pan with WASD/arrows, zoom with wheel, skip with Space/Skip, and restart with R/Restart
  -> HUD mutates progress, constructed count, phase, and build label
  -> window.GameHost exposes skipConstruct(), restartConstruct(), and getState()
  -> complete state becomes command online
```

## Target source-profile module loop

```txt
src/kits/phantom-command-smooth-handoff-profile-kit/index.js
  -> exports canonical smooth-ring-handoff-v6 profile
  -> normalizeSmoothHandoffProfile(profile)
  -> src/kits/phantom-command-ring-descriptor-kit/index.js derives rings
  -> src/kits/phantom-command-piece-descriptor-kit/index.js derives pieces
  -> src/kits/phantom-command-handoff-timeline-contract-kit/index.js derives timing totals
  -> src/kits/phantom-command-source-profile-fingerprint-kit/index.js emits stable fingerprint
  -> src/kits/phantom-command-source-profile-snapshot-kit/index.js emits serializable snapshot
  -> src/kits/phantom-command-profile-parity-report-kit/index.js emits pass/fail rows
  -> src/kits/phantom-command-gamehost-source-diagnostics-kit/index.js shapes additive diagnostics
  -> tests/phantom-command-source-profile-fixture.mjs proves parity without DOM, canvas, WebGL, or Three.js
  -> game.html can later consume modules without changing visible construct behavior
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
piece-start-pose-policy
piece-final-pose-policy
piece-delay-policy
piece-settle-policy
handoff-timeline-contract
construct-animation-timeline
construct-completion-phase
legacy-gamehost-compatibility
source-profile-fixture-runner
scenario-bootstrap-boundary
rts-boundary-placeholder
```

## Kit services

### Current runtime services

```txt
serve static menu route
serve static game route
copy static files into dist
load Three.js from CDN
create renderer, scene, fog, lights, camera, materials, HUD, and input state inline
own smooth-ring-handoff-v6 constants inline
derive ten no-gap ring descriptors inline
derive piece counts from circumference inline
create 92 wedge meshes inline
animate radial/drop interpolation inline
track progress, phase, total pieces, ring parts, ring gaps, and timing inline
handle pan, zoom, skip, restart, resize, and blur
expose construct diagnostics through window.GameHost.getState
```

### Implemented kit services

```txt
construct-spiral-intro-kit
  -> create construct piece ids
  -> create generic spiral schedules
  -> install pieces
  -> reset state
  -> update progress
  -> emit snapshots
  -> report pending, active, settled, newly active, and newly settled pieces
  -> report per-piece progress and status

construct-spiral-intro-kit-smoke
  -> assert kit id and domain path
  -> install generated ring pieces
  -> assert schedule ordering
  -> tick until complete
  -> assert active count cap
  -> assert active ring window
  -> assert all pieces settled
```

### Next source-profile services

```txt
source-own smooth-ring-handoff-v6 profile constants
normalize profile values
derive serializable ring descriptors
derive serializable piece descriptors
derive serializable delay, settle, handoff, and total-build descriptors
emit source fingerprint
emit source snapshot
emit profile parity report
emit additive GameHost source diagnostics
run DOM-free source-profile fixture rows
```

## Kits

### Implemented kits

```txt
construct-spiral-intro-kit
construct-spiral-intro-kit-smoke
```

### Inline kits to extract

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
phantom-command-piece-delay-policy-kit
phantom-command-piece-settle-policy-kit
phantom-command-handoff-timeline-contract-kit
phantom-command-profile-parity-report-kit
phantom-command-gamehost-source-diagnostics-kit
phantom-command-source-profile-fixture-kit
```

## Main finding

The next implementation should not start RTS gameplay, rewrite rendering, or promote anything to a shared Nexus kit yet.

The next useful work is a local source-profile module and fixture pass that proves the inline `smooth-ring-handoff-v6` values exactly: build id, ring count, zero gaps, part-count array, 92 pieces, handoff values, and 19.923 total build seconds.

## Next safe ledge

```txt
PhantomCommand Source Profile Module Fixture Map
```

## Validation note

This was a documentation and central-tracking pass only. Runtime source files were not changed, and no local build or browser smoke was run.
