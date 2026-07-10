# PhantomCommand Render Audit: GameHost SourceProfile Readback Catch-up

**Timestamp:** `2026-07-10T00-30-20-04-00`

## Render surface

The repo has a visual/render surface in `game.html`.

Current render chain:

```txt
game.html
  -> Three.js CDN import
  -> WebGLRenderer(canvas)
  -> Scene / Fog / Camera / Lights
  -> material palette
  -> wedge geometry per piece
  -> 92 piece groups
  -> center disc, tower, and commander
  -> construct(seq) transform updates
  -> camera orbit/pan/zoom updates
  -> renderer.render(scene, camera)
  -> HUD DOM projection
```

## Current readback

`window.GameHost.getState()` currently returns legacy aggregate diagnostics:

```txt
buildId
phase
progress
pieces
rings
ringParts
ringGaps
ringStartTimes
animation.prewarmSeconds
animation.moveSeconds
animation.ringHandoff
animation.partStagger
animation.ringGapBase
animation.ringGapGrowth
animation.totalBuildTime
```

## Missing readback

```txt
sourceProfile object
sourceProfile fingerprint
source snapshot
ring descriptor rows
piece descriptor rows
piece id policy
ringStartTime parity rows
totalBuildSeconds parity row
legacy compatibility row
fixture status row
consumer readback status
```

## Render guidance

Do not extract or replace Three.js rendering next.

The visual route is good enough to keep stable while the source-profile proof layer is added.

## Required next render-safe proof

```txt
1. Build source-owned descriptor rows outside the browser route.
2. Prove ring/piece/timing parity in a DOM-free fixture.
3. Add GameHost.getState().sourceProfile without removing legacy fields.
4. Confirm legacy fields still match the live route.
5. Gate npm run build on the fixture before static copy.
```
