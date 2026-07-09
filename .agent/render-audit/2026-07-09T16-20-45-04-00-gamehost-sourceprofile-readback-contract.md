# PhantomCommand Render Audit: GameHost SourceProfile Readback Contract

**Timestamp:** `2026-07-09T16-20-45-04-00`

## Visual surface

`game.html` renders the active construct directly through inline Three.js code.

```txt
canvas#game
  -> WebGLRenderer
  -> Scene background and fog
  -> PerspectiveCamera
  -> AmbientLight + DirectionalLight fill
  -> material palette
  -> wedge ExtrudeGeometry pieces
  -> seam boxes
  -> center disc
  -> tower block
  -> commander figure
  -> requestAnimationFrame frame loop
```

## Current render loop

```txt
frame(ms)
  -> compute time/dt
  -> construct(time - startedAt)
  -> animate tower and command figure
  -> smooth zoom
  -> update keyboard pan target/current vectors
  -> compute camera orbit position
  -> camera.lookAt(...)
  -> renderer.render(scene, camera)
  -> requestAnimationFrame(frame)
```

## Current GameHost readback

```txt
window.GameHost.getState()
  -> buildId
  -> phase
  -> progress
  -> pieces
  -> rings
  -> ringParts
  -> ringGaps
  -> ringStartTimes
  -> animation constants
```

## Render gap

The renderer is not the next blocker.

The readback gap is that `GameHost` does not expose a source-owned `sourceProfile` object proving that the live visual came from a fixture-readable source profile.

## Required additive readback

```txt
GameHost.getState().sourceProfile
  buildId
  normalizedProfile
  ringDescriptors
  pieceDescriptorCount
  ringPartCounts
  ringGaps
  ringStartTimes
  totalBuildSeconds
  sourceFingerprint
  sourceSnapshot
  parityReport
  fixtureStatus
  legacyCompatibility
```

## Consumer constraints

```txt
- Do not remove existing GameHost fields.
- Do not rename skipConstruct or restartConstruct.
- Do not replace the current construct animation.
- Do not require DOM/canvas/Three.js to run source-profile fixture rows.
- Do not gate visual rendering on central ledger fetch.
- Keep source diagnostics additive and local.
```

## Next render-safe action

Add source-profile helper modules and prove fixture parity first. After that, splice only diagnostic metadata into `GameHost.getState()`.
