# PhantomCommand Architecture Audit: SourceProfile Fixture Build Central Sync

**Timestamp:** `2026-07-09T04-37-30-04-00`

## Architectural read

`PhantomCommand` currently works because `game.html` owns almost every live concern inline. That is acceptable for the visual proof, but it is weak as a Nexus-style DSK boundary because the profile, descriptor derivation, timeline, animation, HUD, and GameHost projection cannot be independently replayed.

The next architecture cut should keep the browser route stable and add pure source-profile authority modules beside the existing route.

## Current domain tree

```txt
phantom-command-static-app
├─ static-app-shell
│  ├─ index-route-kit
│  ├─ menu-copy-kit
│  └─ game-route-link-kit
├─ static-game-route
│  ├─ three-cdn-loader-kit
│  ├─ webgl-render-host-kit
│  ├─ scene-fog-lighting-kit
│  ├─ stone-material-palette-kit
│  ├─ camera-navigation-kit
│  ├─ keyboard-pan-input-kit
│  ├─ wheel-zoom-input-kit
│  ├─ button-input-kit
│  └─ hud-diagnostics-kit
├─ construct-source-authority
│  ├─ smooth-ring-handoff-v6-profile-kit
│  ├─ construct-profile-normalization-kit
│  ├─ ring-descriptor-generation-kit
│  ├─ piece-descriptor-generation-kit
│  ├─ handoff-timeline-contract-kit
│  ├─ construct-source-fingerprint-kit
│  ├─ construct-source-snapshot-kit
│  └─ profile-parity-report-kit
├─ construct-runtime
│  ├─ inline-ring-descriptor-runtime
│  ├─ inline-piece-descriptor-runtime
│  ├─ inline-wedge-geometry-runtime
│  ├─ inline-construct-animation-runtime
│  └─ inline-construct-hud-runtime
├─ gamehost-authority
│  ├─ legacy-gamehost-compatibility-kit
│  ├─ source-profile-diagnostics-kit
│  └─ browser-consumer-readback-kit
├─ fixture-domain
│  ├─ source-profile-fixture-kit
│  ├─ legacy-gamehost-shape-fixture-kit
│  ├─ central-ledger-readback-kit
│  └─ fixture-build-integration-kit
└─ deferred-rts-domain
   ├─ construct-event-envelope-kit
   ├─ construct-event-result-kit
   ├─ scenario-bootstrap-gate-kit
   └─ scenario-bootstrap-blocker-kit
```

## Implemented source kits

```txt
construct-spiral-intro-kit
  domain: n:sequence:construct:spiral-intro
  status: generic construct timing helper
  role: regression guard, not live smooth-ring-handoff-v6 source authority yet

construct-spiral-intro-kit-smoke
  status: implemented test
  role: proves generic kit installation, scheduling, active-ring window, and complete-settled path
```

## Inline runtime ownership to preserve for now

```txt
game.html owns:
  - BUILD_ID smooth-ring-handoff-v6
  - RING_COUNT 10
  - FIRST_INNER_RADIUS 10
  - FIRST_RING_WIDTH 7
  - RING_WIDTH_GROWTH 1.25
  - MAX_RING_WIDTH 120
  - RING_GAP_BASE 0
  - RING_GAP_GROWTH 0
  - MOVE_SECONDS 2.6
  - DROP_START_SECONDS 0.08
  - RING_HANDOFF 0.72
  - PART_STAGGER 0.025
  - PREWARM_SECONDS 0.45
  - START_RADIUS_MULTIPLIER 1.38
  - START_HEIGHT_BASE 24
  - ringParts(inner, outer)
  - wedge(inner, outer, span, height)
  - makePiece(ring, idx, inner, outer, span, angle)
  - construct(seq)
  - GameHost skip/restart/getState
```

## Next architecture cut

```txt
src/kits/phantom-command-smooth-handoff-profile-kit/index.js
  -> exports default live profile and normalizeSmoothHandoffProfile()

src/kits/phantom-command-ring-descriptor-kit/index.js
  -> derives ten contiguous no-gap ring descriptors

src/kits/phantom-command-piece-descriptor-kit/index.js
  -> derives ring part counts and 92 piece descriptors

src/kits/phantom-command-handoff-timeline-contract-kit/index.js
  -> derives ringStartTimes, piece delays, totalBuildSeconds, and handoff margins

src/kits/phantom-command-source-profile-fingerprint-kit/index.js
  -> emits stable source fingerprint

src/kits/phantom-command-source-profile-snapshot-kit/index.js
  -> emits serializable source snapshot

src/kits/phantom-command-profile-parity-report-kit/index.js
  -> emits ok/warning/error rows for profile and descriptor parity

src/kits/phantom-command-gamehost-source-diagnostics-kit/index.js
  -> prepares additive sourceProfile diagnostics for GameHost

tests/phantom-command-source-profile-fixture.mjs
  -> proves profile, descriptor, timeline, snapshot, fingerprint, and compatibility rows without DOM/canvas/Three.js
```

## Non-goals

```txt
- Do not replace the current visual construct.
- Do not remove inline runtime ownership until sourceProfile fixture parity passes.
- Do not remove or rename legacy GameHost fields.
- Do not start construct result authority before sourceProfile parity passes.
- Do not start scenario bootstrap before construct result authority exists.
- Do not move these kits out of the repo until the local fixture gate is stable.
```

## Architecture verdict

The next meaningful architecture improvement is not a new gameplay feature. It is an additive sourceProfile fixture/build/central-ledger sync cut that makes the current visual construct reproducible as data before any RTS state machine is added.
