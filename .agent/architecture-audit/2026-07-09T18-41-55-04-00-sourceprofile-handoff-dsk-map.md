# PhantomCommand SourceProfile Handoff DSK Map

**Timestamp:** `2026-07-09T18-41-55-04-00`

## Current architecture

```txt
index.html
  -> menu route
  -> Start/Open Scene
  -> game.html
  -> Three.js CDN
  -> inline smooth-ring-handoff-v6 profile
  -> inline ring descriptors
  -> inline piece descriptors
  -> inline construct timeline
  -> inline HUD/input/camera/render loop
  -> legacy window.GameHost state
```

## Current domains

```txt
static-route-shell
menu-route
scene-route
vite-static-build
three-cdn-runtime
browser-render-loop
inline-construct-profile
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
profile-fixture-next
gamehost-sourceprofile-readback-next
build-fixture-gate-next
central-ledger-sync
```

## Current kit services

```txt
construct-spiral-intro-kit:
  - create default generic spiral timing config
  - normalize piece ids
  - normalize/sort schedules
  - install pending piece states
  - update active/pending/settled states
  - emit snapshots

game.html inline runtime:
  - define live smooth-ring-handoff-v6 constants
  - compute ring descriptors and part counts
  - compute piece mesh descriptors implicitly
  - compute ringStartTimes and totalBuild
  - run construct(seq)
  - mutate HUD and phase
  - handle pan, zoom, skip, restart, resize, blur
  - expose legacy GameHost fields

build-static:
  - copies static files to dist
  - does not yet run source-profile fixture proof
```

## DSK gap

The current explicit DSK is a generic construct scheduler. It is useful, but it is not the source of truth for the live construct route.

The live DSK boundary should move to source-owned profile modules that reproduce the exact `game.html` profile before the browser consumes them.

## Target DSK sequence

```txt
phantom-command-smooth-handoff-profile-kit
  -> phantom-command-ring-descriptor-kit
  -> phantom-command-piece-descriptor-kit
  -> phantom-command-handoff-timeline-contract-kit
  -> phantom-command-source-profile-fingerprint-kit
  -> phantom-command-source-profile-snapshot-kit
  -> phantom-command-profile-parity-report-kit
  -> phantom-command-gamehost-source-diagnostics-kit
  -> phantom-command-sourceprofile-consumer-readback-kit
  -> phantom-command-sourceprofile-fixture-kit
  -> phantom-command-build-fixture-gate-kit
```

## Required fixture facts

```txt
buildId: smooth-ring-handoff-v6
ringCount: 10
ringGapBase: 0
ringGapGrowth: 0
ringPartCounts: [5,5,5,5,6,8,10,12,16,20]
totalPieces: 92
totalBuildSeconds: 19.923
ringHandoff: 0.72
partStagger: 0.025
legacy GameHost fields unchanged: true
sourceProfile additive readback present: planned
```
