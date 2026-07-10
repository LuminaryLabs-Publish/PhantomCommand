# PhantomCommand Architecture Audit: SourceProfile Fixture Readback DSK Map

**Timestamp:** `2026-07-10T00-30-20-04-00`

## Summary

`PhantomCommand` has a stable visible construct route, but the live DSK boundary is incomplete.

The current source-authority chain is still browser-inline:

```txt
game.html constants
  -> ringStartTimes
  -> ringParts(inner, outer)
  -> rings[]
  -> makePiece(...)
  -> parts[]
  -> totalBuild
  -> construct(seq)
  -> HUD fields
  -> window.GameHost.getState()
```

The existing `construct-spiral-intro-kit` provides generic scheduling state, but it is not the canonical `smooth-ring-handoff-v6` profile authority.

## DSK/domain breakdown

```txt
static-route-shell
  index.html menu route
  Start/Open Scene navigation

scene-route
  game.html live route
  Three.js CDN runtime
  canvas/HUD/help DOM

live-construct-source-domain
  BUILD_ID smooth-ring-handoff-v6
  RING_COUNT 10
  FIRST_INNER_RADIUS 10
  FIRST_RING_WIDTH 7
  RING_WIDTH_GROWTH 1.25
  MAX_RING_WIDTH 120
  RING_GAP_BASE 0
  RING_GAP_GROWTH 0
  MOVE_SECONDS 2.6
  DROP_START_SECONDS 0.08
  RING_HANDOFF 0.72
  PART_STAGGER 0.025
  PREWARM_SECONDS 0.45
  START_RADIUS_MULTIPLIER 1.38
  START_HEIGHT_BASE 24

ring-descriptor-domain
  inline ringStartTimes
  inline inner/outer/gap/n descriptors
  inline ringParts circumference policy

piece-descriptor-domain
  inline part index policy
  inline span/offset policy
  inline start/final transform policy
  inline delay policy
  92 live stone piece groups

construct-runtime-domain
  construct(seq)
  activeRing calculation
  done/progress/phase mutation
  piece transform mutation

presentation-domain
  wedge geometry
  seam geometry
  materials
  tower and commander motion
  camera pan/zoom/orbit
  HUD count/phase/progress/status

legacy-diagnostics-domain
  GameHost.skipConstruct
  GameHost.restartConstruct
  GameHost.getState
  legacy buildId/phase/progress/pieces/rings/ringParts/ringGaps/ringStartTimes/animation

existing-generic-kit-domain
  construct-spiral-intro-kit
  generic piece schedule
  generic active/settled/pending state
  generic snapshots

next-sourceprofile-proof-domain
  source-owned profile
  normalized profile
  ring descriptors
  piece descriptors
  timeline descriptors
  fingerprint
  source snapshot
  parity report
  additive GameHost sourceProfile
  DOM-free source-profile fixture
  build fixture gate
  central ledger readback
```

## Service map

```txt
index.html:
  static menu shell and route controls

game.html:
  live profile constants, descriptor math, geometry creation, animation, HUD, input, and diagnostics

construct-spiral-intro-kit:
  reusable generic construct scheduling and state transitions, not live v6 source proof

build-static:
  static copy only; no fixture gate yet

planned sourceprofile fixture stack:
  canonical source profile, source descriptors, profile fingerprint, parity rows, GameHost source readback, and build gating
```

## Architecture finding

The runtime should not be visually rewritten. The next architectural cut should extract source-profile facts into source-owned modules, prove them without DOM/Three, and only then splice readback into `game.html` additively.
