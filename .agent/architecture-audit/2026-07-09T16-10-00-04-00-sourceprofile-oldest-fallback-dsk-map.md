# PhantomCommand Architecture Audit

**Timestamp:** `2026-07-09T16-10-00-04-00`

## Scope

This audit maps the current `PhantomCommand` DSK/domain surface and keeps the next implementation focused on source-profile proof rather than feature expansion.

## Runtime topology

```txt
index.html
  -> static menu route
  -> game.html
  -> Three.js CDN runtime
  -> inline construct profile constants
  -> inline ring and piece descriptors
  -> inline construct timeline
  -> inline renderer/camera/HUD/input/GameHost
```

## Current domains

```txt
route/static-menu
route/construct-scene
build/static-copy
render/three-cdn-bootstrap
render/scene-camera-lights-fog
render/material-palette
render/wedge-geometry
render/construct-piece-meshes
construct/live-profile-inline
construct/ring-descriptor-inline
construct/piece-descriptor-inline
construct/timeline-inline
construct/progress-phase-inline
interaction/pan-keys
interaction/wheel-zoom
interaction/skip-restart
host/legacy-gamehost-state
kit/generic-construct-spiral-intro
central/repo-ledger-sync
```

## Implemented kits

```txt
construct-spiral-intro-kit
construct-spiral-schedule-kit
construct-piece-id-kit
construct-piece-state-kit
construct-sequence-update-kit
```

These provide generic piece schedule/state services, not the live no-gap `smooth-ring-handoff-v6` source profile.

## Inline runtime kits that need source ownership

```txt
legacy-inline-smooth-ring-handoff-profile
legacy-inline-ring-descriptor-runtime
legacy-inline-piece-descriptor-runtime
legacy-inline-timeline-runtime
legacy-inline-wedge-geometry-runtime
legacy-inline-construct-animation-runtime
legacy-inline-hud-projection-runtime
legacy-inline-input-camera-runtime
legacy-inline-gamehost-diagnostics
```

## Next-cut DSK/domain split

```txt
phantom-command-smooth-handoff-profile-kit
  owns exact live defaults:
    buildId: smooth-ring-handoff-v6
    ringCount: 10
    firstInnerRadius: 10
    firstRingWidth: 7
    ringWidthGrowth: 1.25
    maxRingWidth: 120
    ringGapBase: 0
    ringGapGrowth: 0
    moveSeconds: 2.6
    dropStartSeconds: 0.08
    ringHandoff: 0.72
    partStagger: 0.025
    prewarmSeconds: 0.45
    startRadiusMultiplier: 1.38
    startHeightBase: 24

phantom-command-ring-descriptor-kit
  emits normalized ring descriptors with no gaps and part counts [5,5,5,5,6,8,10,12,16,20]

phantom-command-piece-descriptor-kit
  emits deterministic 92-piece descriptors without Three.js

phantom-command-handoff-timeline-contract-kit
  emits ringStartTimes, per-piece delays, transition margins, and totalBuildSeconds

phantom-command-source-profile-fingerprint-kit
  emits stable source hash/fingerprint rows

phantom-command-source-profile-snapshot-kit
  emits serializable source snapshots for GameHost and fixtures

phantom-command-profile-parity-report-kit
  reports ok/warn/error/missing/unsupported rows

phantom-command-gamehost-source-diagnostics-kit
  preserves legacy GameHost fields and appends sourceProfile diagnostics only

phantom-command-sourceprofile-consumer-readback-kit
  compares browser GameHost projection against DOM-free fixture output

phantom-command-sourceprofile-fixture-kit
  proves parity without DOM/canvas/Three/browser timing

phantom-command-build-fixture-gate-kit
  gates build-static before artifact copy

central-ledger-readback-kit
  verifies repo-local tracker and central ledger pointers match
```

## Services that kits offer

```txt
current:
  menu routing
  static game routing
  Three renderer setup
  ring/piece/timeline generation inline
  construct animation
  HUD projection
  pan/zoom/skip/restart controls
  legacy GameHost state
  generic spiral sequence scheduling helper

needed next:
  source-owned profile normalization
  ring descriptor derivation
  piece descriptor derivation
  timeline descriptor derivation
  source fingerprinting
  serializable source snapshotting
  parity reporting
  additive GameHost source diagnostics
  DOM-free fixture rows
  build fixture gate
  central ledger readback
```

## Architecture finding

The current app is structurally serviceable as a static proof, but the live construct profile is still browser-inline. The next code pass should not move the renderer first. It should move the profile and descriptor math first, prove parity in Node, then let the browser consume that proof additively.
