# PhantomCommand Render Source Authority Map

**Timestamp:** `2026-07-08T09:19:43-04:00`

## Goal

Map the current visual/render surface to the source-profile and descriptor services that should eventually drive it.

No render code was changed in this pass.

## Current visual surface

```txt
game.html
  -> <canvas id="game">
  -> Three.WebGLRenderer
  -> Scene background and fog
  -> PerspectiveCamera
  -> AmbientLight / DirectionalLight
  -> stone material palette
  -> wedge ExtrudeGeometry per piece
  -> seam meshes
  -> center disc
  -> Grim Reaper Totem
  -> Phantom Commander figure
  -> requestAnimationFrame(frame)
```

## Current render-owned state

```txt
renderer pixel ratio and size
scene background/fog
camera aspect/zoom/orbit/pan
light placement
materials
parts[]
rings[]
ringStartTimes[]
input target/current/velocity
startedAt
complete
progress
phase
HUD nodes
```

## Current renderer authority problem

`game.html` does more than render. It also owns the live source of truth for:

```txt
BUILD_ID
RING_COUNT
FIRST_INNER_RADIUS
FIRST_RING_WIDTH
RING_WIDTH_GROWTH
MAX_RING_WIDTH
RING_GAP_BASE
RING_GAP_GROWTH
MOVE_SECONDS
DROP_START_SECONDS
RING_HANDOFF
PART_STAGGER
PREWARM_SECONDS
START_RADIUS_MULTIPLIER
START_HEIGHT_BASE
ringParts(inner, outer)
makePiece(ring, idx, inner, outer, span, angle)
construct(seq)
GameHost.getState()
```

This makes the renderer the de facto construct source authority.

## Desired render contract

```txt
source profile
  -> ring descriptors
  -> piece descriptors
  -> render descriptors
  -> Three.js consumes descriptors
  -> renderer snapshot reports what was consumed
  -> GameHost diagnostics expose source/render parity
```

## Render descriptor split

### Source-owned fields

```txt
buildId
ringCount
firstInnerRadius
firstRingWidth
ringWidthGrowth
maxRingWidth
ringGapBase
ringGapGrowth
moveSeconds
dropStartSeconds
ringHandoff
partStagger
prewarmSeconds
startRadiusMultiplier
startHeightBase
```

### Descriptor-owned fields

```txt
ring.inner
ring.outer
ring.gap
ring.partCount
piece.id
piece.ringIndex
piece.partIndex
piece.partsPerRing
piece.angle
piece.startPose
piece.finalPose
piece.delay
piece.settleWindow
piece.timelineMargin
```

### Renderer-owned fields

```txt
mesh instance
group transform
material assignment
geometry cache key
camera pan/zoom/orbit
HUD DOM mutation
resize handling
```

## Render parity targets

```txt
buildId: smooth-ring-handoff-v6
ringCount: 10
gapPolicy: all zero
ringPartCounts: [5,5,5,5,6,8,10,12,16,20]
totalPieces: 92
moveSeconds: 2.6
ringHandoff: 0.72
partStagger: 0.025
totalBuildSeconds: 19.923
```

## Render risks

```txt
- Moving source constants without parity fixtures can silently change the visual.
- Moving piece descriptors without stable IDs can break construct progress diagnostics.
- Moving ring math without exact circumference rounding can change piece counts.
- Moving timeline math without margin fixtures can reintroduce dead gaps or excessive overlap.
- Expanding GameHost without preserving skipConstruct/restartConstruct/getState can break existing smoke callers.
```

## Safe extraction order

```txt
1. Add source profile and fingerprint.
2. Add descriptor generation and parity fixtures.
3. Add ConstructSnapshot and ScenarioBootstrapSnapshot.
4. Add additive GameHost diagnostics.
5. Only then let renderer consume descriptors from source-owned kits.
6. Only then consider extracting wedge geometry and render materials.
```

## Do not do yet

```txt
- Do not rewrite the Three.js scene.
- Do not replace the live v6 construct visual.
- Do not remove inline fallback state until parity fixtures pass.
- Do not add full RTS renderer surfaces before source/result authority exists.
```
