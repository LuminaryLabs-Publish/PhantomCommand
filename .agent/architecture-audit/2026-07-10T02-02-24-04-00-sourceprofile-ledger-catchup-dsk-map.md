# PhantomCommand Architecture Audit: SourceProfile Ledger Catch-up DSK Map

**Timestamp:** `2026-07-10T02-02-24-04-00`

## DSK read

`PhantomCommand` currently has one explicit generic construct kit and one live inline construct runtime.

The live route is not yet source-profile-owned. `game.html` owns the active profile constants, ring descriptor math, piece descriptor math, wedge geometry, timeline, HUD projection, input, camera, and legacy GameHost state.

## Current interaction loop

```txt
index.html menu
  -> game.html route
  -> import Three.js CDN
  -> create renderer, scene, fog, lights, camera, materials, HUD, input state
  -> define smooth-ring-handoff-v6 constants inline
  -> compute ringStartTimes inline
  -> compute no-gap ring descriptors inline
  -> compute ringParts inline
  -> create 92 wedge mesh groups inline
  -> construct(seq) updates piece transforms and HUD inline
  -> keyboard/wheel/button input mutates runtime state inline
  -> frame loop renders scene
  -> window.GameHost exposes legacy diagnostics
```

## Domain map

```txt
static-route-shell:
  index.html, menu copy, Start button, Open Scene link

scene-route:
  game.html, canvas, HUD, help panel

static-build-domain:
  package.json build script, scripts/build-static.mjs, dist copy

render-domain:
  Three.js CDN, WebGLRenderer, scene, fog, camera, lights, materials, meshes, frame loop

source-profile-domain-inline:
  BUILD_ID, RING_COUNT, FIRST_INNER_RADIUS, FIRST_RING_WIDTH, RING_WIDTH_GROWTH, MAX_RING_WIDTH, RING_GAP_BASE, RING_GAP_GROWTH, MOVE_SECONDS, DROP_START_SECONDS, RING_HANDOFF, PART_STAGGER, PREWARM_SECONDS, START_RADIUS_MULTIPLIER, START_HEIGHT_BASE

ring-descriptor-domain-inline:
  ringStartTimes, inner/outer/gap/width loop, ringParts(inner, outer)

piece-descriptor-domain-inline:
  makePiece(), wedge(), start/final transforms, finalY/startY, per-piece delay

construct-timeline-domain-inline:
  totalBuild, skip, restart, construct(seq), accelTime, smooth, ease

input-domain-inline:
  keydown, keyup, blur, wheel, skip button, restart button

hud-projection-domain-inline:
  count, phase, bar width, status text

gamehost-domain-inline:
  skipConstruct, restartConstruct, getState legacy fields

generic-kit-domain:
  construct-spiral-intro-kit schedule/state/progress helper

central-ledger-domain:
  repo-local .agent latest tracker/audit state and central repo-ledger pointers
```

## Service map

```txt
source constants service: inline only
ring descriptor service: inline only
piece descriptor service: inline only
timeline service: inline only
renderer service: inline browser route
input service: inline browser route
GameHost service: legacy construct readback only
build service: static artifact copy only
generic construct service: construct-spiral-intro-kit, not live profile authority
central sync service: .agent + LuminaryLabs-Dev/LuminaryLabs ledger
```

## Current kits

```txt
construct-spiral-intro-kit
construct-spiral-schedule-kit
construct-piece-id-kit
construct-piece-state-kit
construct-sequence-update-kit
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

## Next DSK boundary

```txt
phantom-command-smooth-handoff-profile-kit
  -> source profile defaults and exact live constants

phantom-command-profile-normalizer-kit
  -> finite, clamped, serializable normalized values

phantom-command-ring-descriptor-kit
  -> exact no-gap ring descriptors and ringStartTimes

phantom-command-piece-descriptor-kit
  -> exact 92 piece descriptor rows, independent of Three.js

phantom-command-handoff-timeline-contract-kit
  -> delay, stagger, handoff, prewarm, totalBuildSeconds

phantom-command-source-profile-fingerprint-kit
  -> stable source fingerprint

phantom-command-source-profile-snapshot-kit
  -> serializable source snapshot

phantom-command-profile-parity-report-kit
  -> ok/warning/error rows for live-vs-source parity

phantom-command-gamehost-source-diagnostics-kit
  -> additive sourceProfile projection for GameHost

phantom-command-sourceprofile-fixture-kit
  -> DOM-free accepted fixture rows

phantom-command-build-fixture-gate-kit
  -> npm build refuses stale profile proof
```

## Main finding

The architecture can keep the current static route and renderer. The missing DSK layer is source-profile proof: source-owned profile data and descriptor derivation must exist before construct result authority, scenario bootstrap, renderer extraction, or new gameplay work.
