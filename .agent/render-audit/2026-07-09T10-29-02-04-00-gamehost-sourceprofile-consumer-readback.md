# Render Audit: GameHost SourceProfile Consumer Readback

**Timestamp:** `2026-07-09T10-29-02-04-00`

## Scope

`PhantomCommand` has a visual/render surface in `game.html`, so this pass records the render state and the proof gap that must be closed before any visual rewrite.

## Current render loop

```txt
game.html imports Three.js CDN
  -> creates WebGLRenderer
  -> creates scene, background, fog, ambient light, sun light, fill light
  -> creates PerspectiveCamera
  -> creates stone material palette
  -> creates dark material and seam line material
  -> creates wedge geometry per piece
  -> creates ring pieces from inline ring descriptors
  -> creates center disc, totem proxy, and commander proxy
  -> frame(ms)
  -> construct(time - startedAt)
  -> pan/zoom/camera orbit update
  -> renderer.render(scene, camera)
  -> requestAnimationFrame(frame)
```

## Render authority

```txt
renderer authority: inline game.html
scene graph authority: inline game.html
ring descriptor authority: inline game.html
piece descriptor authority: inline game.html
wedge geometry authority: inline game.html
material palette authority: inline game.html
animation authority: inline construct(seq)
HUD authority: inline construct(seq)
GameHost readback authority: inline getState()
```

## Current visual constants that need source readback

```txt
BUILD_ID=smooth-ring-handoff-v6
RING_COUNT=10
FIRST_INNER_RADIUS=10
FIRST_RING_WIDTH=7
RING_WIDTH_GROWTH=1.25
MAX_RING_WIDTH=120
RING_GAP_BASE=0
RING_GAP_GROWTH=0
MOVE_SECONDS=2.6
DROP_START_SECONDS=0.08
RING_HANDOFF=0.72
PART_STAGGER=0.025
PREWARM_SECONDS=0.45
START_RADIUS_MULTIPLIER=1.38
START_HEIGHT_BASE=24
ringParts=[5,5,5,5,6,8,10,12,16,20]
totalPieces=92
totalBuildSeconds=19.923
```

## Render readback gap

The render works, but the renderer cannot prove that the visible build came from reusable source descriptors.

`window.GameHost.getState()` exposes build id, phase, progress, pieces, ring counts, ring gaps, ring start times, and animation timings. It does not yet expose:

```txt
sourceProfile
sourceFingerprint
sourceSnapshot
ringDescriptorParity
pieceDescriptorParity
timelineParity
fixtureRows
consumerReadbackStatus
```

## Required readback path

```txt
source profile kit
  -> profile normalizer
  -> descriptor kits
  -> source snapshot
  -> fixture parity report
  -> GameHost source diagnostics projection
  -> window.GameHost.getState().sourceProfile
  -> browser smoke reads legacy fields plus additive sourceProfile
```

## Render recommendation

Do not alter the camera, geometry, material palette, animation cadence, HUD, or visual style in the next implementation.

Only add additive sourceProfile diagnostics after DOM-free fixture proof passes.
