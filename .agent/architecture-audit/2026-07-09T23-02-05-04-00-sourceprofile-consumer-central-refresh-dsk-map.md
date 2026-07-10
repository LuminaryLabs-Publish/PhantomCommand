# PhantomCommand Architecture Audit: SourceProfile Consumer Central Refresh

**Timestamp:** `2026-07-09T23-02-05-04-00`

## Architecture summary

`PhantomCommand` is currently a static browser route with one generic construct kit and one live inline construct consumer.

```txt
index.html
  -> game.html
  -> Three.js CDN
  -> inline smooth-ring-handoff-v6 constants
  -> inline ring/piece/timeline math
  -> inline renderer, HUD, input, camera, and GameHost diagnostics
```

The app has a useful visible proof, but the live profile is not source-owned yet.

## Current DSK map

```txt
static-route-shell
  service: render menu and route to game.html
  source: index.html

scene-route
  service: initialize live construct route
  source: game.html

three-cdn-runtime
  service: renderer, scene, fog, lights, camera, meshes
  source: game.html

inline-smooth-ring-handoff-profile
  service: BUILD_ID, ring counts, handoff timing, gap policy, movement timing
  source: game.html constants

ring-descriptor-inline-math
  service: inner/outer/gap/n derivation for 10 rings
  source: game.html loop

piece-descriptor-inline-math
  service: wedge piece ids, ring/part relationship, start/final transforms
  source: game.html makePiece/rings.forEach

construct-timeline-inline-math
  service: ringStartTimes, per-piece delays, totalBuild
  source: game.html ringStartTimes and totalBuild calculation

construct-spiral-intro-kit
  service: generic scheduling/state machine for construct pieces
  source: src/kits/construct-spiral-intro-kit/index.js
  gap: generic and not tied to live smooth-ring-handoff-v6 profile

legacy-gamehost-diagnostics
  service: skipConstruct, restartConstruct, getState legacy readback
  source: game.html window.GameHost
```

## Domains in use

```txt
static-route-shell
menu-route
scene-route
vite-static-build
three-cdn-runtime
browser-render-loop
inline-smooth-ring-handoff-profile
ring-descriptor-inline-math
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
construct-spiral-schedule
construct-piece-state-machine
source-profile-parity-next
source-fingerprint-next
source-snapshot-next
gamehost-sourceprofile-readback-next
profile-fixture-next
build-fixture-gate-next
central-ledger-sync
```

## Services the kits offer

```txt
construct-spiral-intro-kit:
  create ids
  normalize ring/part metadata
  derive generic schedules
  track pending/active/settled pieces
  enforce active piece caps and ring windows
  emit generic snapshots

inline game.html runtime:
  define live profile values
  derive live rings and pieces
  derive timing and total build
  construct Three.js meshes
  animate piece placement
  mutate HUD and camera
  handle pan, zoom, skip, restart
  expose legacy GameHost readback

build-static:
  copy static site artifacts into dist
```

## Kits

Current explicit kits:

```txt
construct-spiral-intro-kit
construct-spiral-schedule-kit
construct-piece-id-kit
construct-piece-state-kit
construct-sequence-update-kit
```

Runtime-implied kits:

```txt
legacy-inline-smooth-ring-handoff-profile
legacy-inline-ring-descriptor-runtime
legacy-inline-piece-descriptor-runtime
legacy-inline-timeline-runtime
legacy-inline-hud-projection
legacy-inline-camera-input-runtime
legacy-inline-gamehost-diagnostics
```

Target proof kits:

```txt
phantom-command-smooth-handoff-profile-kit
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

## Main architecture risk

The generic construct kit and the live browser profile can drift. The current smoke test proves generic scheduling behavior, not the exact live profile values that `game.html` renders.

## Required next proof

```txt
profile source -> normalized profile -> rings -> pieces -> timeline -> fingerprint -> snapshot -> parity report -> GameHost sourceProfile -> DOM-free fixture -> build fixture gate
```
