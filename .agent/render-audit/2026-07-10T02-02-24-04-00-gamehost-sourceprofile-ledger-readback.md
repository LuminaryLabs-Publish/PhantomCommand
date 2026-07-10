# PhantomCommand Render Audit: GameHost SourceProfile Ledger Readback

**Timestamp:** `2026-07-10T02-02-24-04-00`

## Render surface

`game.html` is the visual surface. It imports Three.js from CDN, creates a `WebGLRenderer`, scene, fog, camera, lights, materials, wedge meshes, center disc, tower, command figure, HUD, and animation loop.

## Current render loop

```txt
requestAnimationFrame(frame)
  -> dt calculation
  -> construct(time - startedAt)
  -> update tower and commander animation
  -> interpolate zoom
  -> update keyboard pan
  -> update camera position/lookAt
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

This is useful legacy readback, but it is not enough to prove the renderer consumed a source-owned profile. It reports the live inline state after browser initialization; it does not expose a source fingerprint, normalized profile, descriptor rows, parity status, fixture status, or central ledger parity.

## Render proof gap

```txt
- No source-owned render input profile exists.
- No normalized render/profile snapshot exists.
- No source fingerprint is exposed.
- No piece descriptor rows exist outside Three mesh construction.
- No ring descriptor rows exist outside game.html loop state.
- No parity report proves live GameHost fields match source-owned rows.
- No DOM-free fixture proves the renderer-facing profile before loading the browser.
- No build gate prevents static copy when source-profile proof is stale.
```

## Do not do next

```txt
- Do not replace Three.js rendering.
- Do not retune camera, fog, materials, or animation values.
- Do not extract the full renderer.
- Do not change the visible construct behavior before sourceProfile parity exists.
```

## Required next render readback

```txt
GameHost.getState().sourceProfile = {
  buildId,
  sourceFingerprint,
  normalizedProfile,
  ringDescriptors,
  pieceSummary,
  ringPartCounts,
  totalPieces,
  totalBuildSeconds,
  parityReport,
  fixtureStatus,
  ledgerPointer
}
```

This should be additive. Legacy `buildId`, `phase`, `progress`, `pieces`, `rings`, `ringParts`, `ringGaps`, `ringStartTimes`, and `animation` fields must remain stable.

## Next safe render ledge

```txt
GameHost sourceProfile readback without visual mutation
```
