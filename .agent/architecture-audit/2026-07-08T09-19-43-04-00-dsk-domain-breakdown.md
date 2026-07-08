# PhantomCommand DSK / Domain Breakdown

**Timestamp:** `2026-07-08T09:19:43-04:00`

## Goal

Document the current live domains, existing kit surfaces, and the next source/result kit seams for `PhantomCommand` without changing runtime code.

## Current route

```txt
index.html
  -> game.html
  -> inline smooth-ring-handoff-v6 Three.js construct proof
```

## Current interaction loop

```txt
menu route
  -> scene route
  -> CDN Three.js import
  -> inline construct constants
  -> inline ring descriptor generation
  -> inline piece/wedge generation
  -> requestAnimationFrame construct(seq)
  -> input handles pan / zoom / skip / restart
  -> HUD mutates count / phase / progress
  -> GameHost returns construct-only state
```

## Domains in use

### App and deploy domains

```txt
static-app-shell
main-menu-routing
static-game-route
vite-static-build
github-pages-deploy
```

### Render domains

```txt
browser-render-host
webgl-canvas-host
three-render-scene
scene-fog-lighting
stone-material-palette
wedge-geometry-generation
construct-animation-timeline
camera-navigation
hud-diagnostics
```

### Input domains

```txt
keyboard-pan-input
wheel-zoom-input
button-input
skip-construct-input
restart-construct-input
```

### Construct source domains

```txt
smooth-ring-handoff-v6-profile
construct-profile-normalization
construct-source-fingerprint
construct-source-snapshot
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
inner-first-timeline-contract
ring-transition-margin-policy
construct-profile-parity
```

### Construct result domains

```txt
construct-event-envelope
construct-event-result
construct-event-reducer
construct-completion-idempotency
construct-event-journal
construct-snapshot-contract
construct-diagnostics-projection
legacy-gamehost-compatibility
```

### Scenario bootstrap domains

```txt
scenario-bootstrap-command
scenario-bootstrap-preflight
scenario-bootstrap-result
scenario-bootstrap-gate
scenario-bootstrap-journal
scenario-bootstrap-snapshot
scenario-mode-state-machine
rts-boundary-placeholder
```

### Deferred RTS domains

```txt
undead-roster
necropolis-building-state
world-economy-ledger
unit-selection
rts-command-validation
combat-resolution
objective-tracking
command-journal-replay
```

## Existing implemented kits

### construct-spiral-intro-kit

```txt
Path: src/kits/construct-spiral-intro-kit/index.js
Domain path: n:sequence:construct:spiral-intro
Status: implemented generic source kit
```

Services:

```txt
createConstructSpiralIntroPieceId
createConstructSpiralIntroSchedule
createConstructSpiralIntroKit
installPieces
reset
update
snapshot
schedule
activePieces
settledPieces
pendingPieces
newlyActivePieces
newlySettledPieces
getPieceProgress
getPieceStatus
```

Important limitation:

```txt
The kit's default schedule is generic spiral/window sequencing.
It is not yet the live smooth-ring-handoff-v6 no-gap profile authority.
```

### construct-spiral-intro-kit-smoke

```txt
Path: tests/construct-spiral-intro-kit-smoke.mjs
Status: implemented generic smoke guard
```

Services:

```txt
assert kit id
assert domain path
install generated ring pieces
assert schedule ordering
tick until complete
assert active count cap
assert active ring window
assert all pieces settled
```

Limitation:

```txt
The smoke uses a different ring-count set and does not validate the live v6 values:
[5,5,5,5,6,8,10,12,16,20]
92 pieces
19.923 total build seconds
0 gaps
```

## Kits to extract from game.html

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

## Next local DSK slice

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
phantom-command-gamehost-diagnostics-adapter-kit
phantom-command-fixture-script-runner-kit
```

## Composition rule

Keep the publish repo focused on proving the PhantomCommand game slice.

Do not extract to NexusEngine or ProtoKits until this local proof is stable:

```txt
source profile parity
  -> construct result idempotency
  -> scenario bootstrap gating
  -> serializable snapshots
  -> additive GameHost diagnostics
  -> DOM-free fixture rows
```
