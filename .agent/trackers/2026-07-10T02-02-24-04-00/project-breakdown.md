# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-10T02-02-24-04-00`

## Selection

Selected repo: `LuminaryLabs-Publish/PhantomCommand`.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

The public `LuminaryLabs-Publish` organization page currently shows 9 repositories. The current public list was compared against central `LuminaryLabs-Dev/LuminaryLabs` repo-ledger state and sampled repo-local root `.agent` state. No checked non-Cavalry repo was new, absent from central tracking, missing root `.agent`, recently added but undocumented, or otherwise undocumented. `PhantomCommand` was selected as the oldest eligible documented fallback after the latest central refreshes.

## Current public repo comparison

```txt
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-10T01-31-29-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-10T01-20-47-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-10T01-11-51-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-10T00-51-03-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-10T00-38-44-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-10T01-38-16-04-00
LuminaryLabs-Publish/PhantomCommand       selected / oldest eligible fallback / central latest 2026-07-10T00-30-20-04-00
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-10T01-49-13-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
```

## Product surface

`PhantomCommand` is a static Vite / Three.js construct proof.

```txt
index.html
  -> menu route
  -> Start button or Open Scene link
  -> game.html
  -> inline Three.js construct runtime
```

`package.json` exposes Vite start/dev/preview scripts and a static build script. `scripts/build-static.mjs` currently copies `index.html`, `game.html`, `docs`, and `config` into `dist` without fixture gating.

## Current interaction loop

```txt
open index.html
  -> menu renders Phantom Command copy and route controls
  -> Start or Open Scene routes to game.html
  -> game.html imports Three.js from CDN
  -> inline runtime creates renderer, scene, fog, lights, camera, materials, HUD nodes, and input state
  -> inline constants define smooth-ring-handoff-v6
  -> inline ring math creates 10 no-gap construct rings
  -> inline ringParts() computes [5,5,5,5,6,8,10,12,16,20]
  -> inline wedge geometry creates 92 stone pieces
  -> construct(seq) uses ringStartTimes and PART_STAGGER to animate pieces
  -> keyboard/buttons mutate skip/restart/pan state
  -> mouse wheel mutates zoom target
  -> frame loop advances construct, camera, tower, command figure, HUD, and renderer
  -> window.GameHost.getState() reports legacy construct diagnostics
```

## Domains in use

```txt
static-route-shell
menu-route
scene-route
vite-static-build
static-artifact-copy
three-cdn-runtime
browser-render-loop
inline-smooth-ring-handoff-profile
inline-ring-start-time-policy
ring-descriptor-inline-math
inline-ring-part-count-policy
piece-descriptor-inline-math
construct-timeline-inline-math
wedge-geometry-authoring
material-palette
lighting-and-fog
hud-projection
keyboard-pan-control
wheel-zoom-control
skip-restart-control
legacy-gamehost-diagnostics
construct-spiral-intro-kit
generic-construct-schedule-state
source-profile-parity-next
source-fingerprint-next
source-snapshot-next
profile-fixture-next
gamehost-sourceprofile-readback-next
build-fixture-gate-next
central-ledger-sync
```

## Kit services

Current services:

```txt
menu route
static scene route
inline Three renderer
inline profile constants
ring descriptor math
piece descriptor math
construct animation
HUD projection
keyboard pan
wheel zoom
skip/restart
legacy GameHost state
construct spiral scheduling helper kit
static artifact copy
```

Needed next services:

```txt
source-owned smooth-ring-handoff-v6 profile
normalized profile
ring descriptors
piece descriptors
timeline descriptors
source fingerprint
source snapshot
profile parity report
GameHost source diagnostics
sourceprofile consumer readback
DOM-free source-profile fixture
build fixture gate
central ledger readback
```

## Kits

Current explicit/generic kits:

```txt
construct-spiral-intro-kit
construct-spiral-schedule-kit
construct-piece-id-kit
construct-piece-state-kit
construct-sequence-update-kit
```

Current inline/runtime kits:

```txt
legacy-inline-smooth-ring-handoff-profile
legacy-inline-ring-start-time-policy
legacy-inline-ring-descriptor-runtime
legacy-inline-piece-descriptor-runtime
legacy-inline-wedge-geometry-runtime
legacy-inline-timeline-runtime
legacy-inline-hud-projection
legacy-inline-camera-input-runtime
legacy-inline-gamehost-diagnostics
legacy-static-build-copy-kit
```

Next-cut kits:

```txt
phantom-command-smooth-handoff-profile-kit
phantom-command-profile-normalizer-kit
phantom-command-ring-descriptor-kit
phantom-command-piece-descriptor-kit
phantom-command-handoff-timeline-contract-kit
phantom-command-source-profile-fingerprint-kit
phantom-command-source-profile-snapshot-kit
phantom-command-profile-parity-report-kit
phantom-command-gamehost-source-diagnostics-kit
phantom-command-sourceprofile-consumer-readback-kit
phantom-command-sourceprofile-fixture-kit
phantom-command-build-fixture-gate-kit
central-ledger-readback-kit
```

## Main finding

`PhantomCommand` should not start next with scenario bootstrap, RTS gameplay, economy, camera changes, renderer extraction, command-result authority, or new visual work.

The blocker is source-profile authority and ledger/readback parity. `game.html` owns the live `smooth-ring-handoff-v6` constants, zero-gap ring math, ring part math, 92-piece wedge generation, construct timing, HUD projection, camera/input, and legacy `GameHost` state inline. `construct-spiral-intro-kit` remains generic and its smoke uses a different ring-part profile, so it does not prove live v6 parity.

## Next safe ledge

```txt
PhantomCommand SourceProfile Ledger Catch-up + GameHost Fixture Gate
```

## Suggested first implementation files

```txt
src/kits/phantom-command-smooth-handoff-profile-kit/index.js
src/kits/phantom-command-profile-normalizer-kit/index.js
src/kits/phantom-command-ring-descriptor-kit/index.js
src/kits/phantom-command-piece-descriptor-kit/index.js
src/kits/phantom-command-handoff-timeline-contract-kit/index.js
src/kits/phantom-command-source-profile-fingerprint-kit/index.js
src/kits/phantom-command-source-profile-snapshot-kit/index.js
src/kits/phantom-command-profile-parity-report-kit/index.js
src/kits/phantom-command-gamehost-source-diagnostics-kit/index.js
tests/phantom-command-source-profile-fixture.mjs
game.html
scripts/build-static.mjs
package.json
```

## Validation

```txt
runtime source changed: no
branch created: no
pull request created: no
npm install: not run
npm run build: not run
node tests/construct-spiral-intro-kit-smoke.mjs: not run
node tests/phantom-command-source-profile-fixture.mjs: not run because it does not exist yet
browser smoke: not run
source-profile fixture: not run because proof files do not exist yet
pushed to main: yes
central ledger updated: planned in same pass
```
