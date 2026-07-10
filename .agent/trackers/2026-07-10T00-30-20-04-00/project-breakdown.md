# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-10T00-30-20-04-00`

**Selected repo:** `LuminaryLabs-Publish/PhantomCommand`

**Next safe ledge:** `PhantomCommand SourceProfile Fixture Readback Catch-up + GameHost Gate`

## Selection result

The current public `LuminaryLabs-Publish` organization list showed 9 repositories.

`LuminaryLabs-Publish/TheCavalryOfRome` was excluded by standing rule.

No checked public non-Cavalry repo was new, central-ledger absent, missing sampled root `.agent` state, recently added but undocumented, or otherwise undocumented.

`PhantomCommand` was selected as the oldest eligible documented fallback by central ledger recency.

```txt
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T23-58-41-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T23-51-04-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T23-41-15-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T23-28-35-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T23-20-43-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-10T00-09-51-04-00
LuminaryLabs-Publish/PhantomCommand       selected / oldest eligible fallback / central latest 2026-07-09T23-02-05-04-00
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-10T00-18-38-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
```

## Source read

`PhantomCommand` is a static Vite / Three.js construct proof with a menu route and live `game.html` scene route.

`package.json` exposes `start`, `dev`, `build`, and `preview`; `npm run build` currently calls `node scripts/build-static.mjs`.

`index.html` is a static menu that routes Start/Open Scene to `game.html`.

`game.html` imports Three.js from CDN and owns the live `smooth-ring-handoff-v6` construct inline.

`scripts/build-static.mjs` copies `index.html`, `game.html`, `docs`, and `config` into `dist` without a source-profile fixture gate.

`src/kits/construct-spiral-intro-kit/index.js` is a generic schedule/state kit, not the live no-gap v6 construct source.

`tests/construct-spiral-intro-kit-smoke.mjs` validates a generic profile with ring counts `[5,5,5,6,8,10,12,15,18,22,26,32]`, not the live v6 `[5,5,5,5,6,8,10,12,16,20]` profile.

## Current interaction loop

```txt
open index.html
  -> menu renders Phantom Command copy and route controls
  -> Start button or Open Scene link navigates to game.html
  -> game.html imports Three.js 0.160.0 from CDN
  -> inline runtime creates renderer, scene, fog, lights, camera, materials, HUD nodes, and input state
  -> inline constants define BUILD_ID smooth-ring-handoff-v6
  -> inline constants define 10 rings, zero gaps, movement, handoff, stagger, prewarm, start radius, and start height
  -> inline ringStartTimes use MOVE_SECONDS * RING_HANDOFF
  -> inline ringParts(inner, outer) derives [5,5,5,5,6,8,10,12,16,20]
  -> inline wedge geometry creates live stone pieces
  -> makePiece creates 92 mesh groups with start/final transforms and delays
  -> construct(seq) mutates piece transforms, active ring, progress, phase, status, count, and bar width
  -> WASD/arrows mutate pan velocity and target
  -> mouse wheel mutates zoom target
  -> Space/Skip jumps construct to completion
  -> R/Restart resets construct timing
  -> frame loop advances construct, camera, tower, commander, HUD, and renderer
  -> window.GameHost exposes skipConstruct(), restartConstruct(), and getState()
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
inline-ring-descriptor-math
inline-ring-part-count-policy
inline-piece-descriptor-math
inline-wedge-geometry-authoring
construct-piece-start-final-transform
construct-timeline-policy
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

## Services that kits offer

```txt
construct-spiral-intro-kit:
  id normalization, generic spiral scheduling, active windows, active/settled/pending state transitions, update snapshots, piece status lookups

game.html inline runtime:
  live v6 profile constants, no-gap ring descriptors, live ring part counts, 92-piece descriptor creation, wedge mesh construction, construct animation, HUD projection, pan/zoom/skip/restart input, legacy GameHost projection

scripts/build-static.mjs:
  static artifact copy to dist for index.html, game.html, docs, and config

planned source-profile fixture services:
  source-owned v6 profile, normalized profile, ring descriptor derivation, piece descriptor derivation, timing contract, fingerprint, source snapshot, parity report, additive GameHost source diagnostics, DOM-free fixture rows, build gate, central ledger readback
```

## Kits identified

Current explicit kits:

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

Do not start next with scenario bootstrap, RTS gameplay, economy, camera changes, renderer extraction, or new visual work.

The blocker is still source-profile authority and fixture readback. `game.html` owns the live `smooth-ring-handoff-v6` constants, ring math, piece math, timing math, HUD projection, and `GameHost` state inline. The generic construct kit does not prove live v6 parity.

## Next implementation boundary

```txt
PhantomCommand SourceProfile Fixture Readback Catch-up + GameHost Gate
```

The next implementation should source-own the live profile and prove these facts before changing visuals:

```txt
buildId === smooth-ring-handoff-v6
ringCount === 10
ringGapBase === 0
ringGapGrowth === 0
ringPartCounts === [5,5,5,5,6,8,10,12,16,20]
totalPieces === 92
totalBuildSeconds === 19.923
ringStartTimes match legacy GameHost values
legacy GameHost fields remain present
GameHost.getState().sourceProfile is additive only
```

## Validation

```txt
runtime source changed: no
branch created: no
pull request created: no
npm install: not run
npm run build: not run
construct smoke: not run
source-profile fixture: not run because this pass did not implement it
browser smoke: not run
pushed to main: yes, documentation only
```
