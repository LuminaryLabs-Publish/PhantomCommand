# PhantomCommand Render Audit

**Timestamp:** `2026-07-09T16-29-23-04-00`

## Current render surface

```txt
game.html
  -> canvas#game
  -> Three.WebGLRenderer
  -> scene background and fog
  -> perspective camera
  -> ambient, sun, and fill lights
  -> material palette
  -> ring wedge meshes
  -> seam meshes
  -> center disc
  -> tower
  -> command figure
  -> construct animation
  -> renderer.render(scene, camera)
```

## Render-linked GameHost surface

```txt
window.GameHost.getState()
  buildId
  phase
  progress
  pieces
  rings
  ringParts
  ringGaps
  ringStartTimes
  animation
```

## Gap

The render output is readable only through the browser runtime. There is no pure sourceProfile readback that proves the values consumed by the render route match the live construct profile.

## Next render-safe readback

```txt
sourceProfile
  -> ringDescriptorRows
  -> pieceDescriptorRows
  -> timelineRows
  -> profileFingerprint
  -> profileParity
  -> additive GameHost diagnostics
  -> legacy GameHost compatibility retained
```

## Render finding

Do not rewrite visuals. Preserve the current ring handoff, camera, materials, HUD, and object composition while adding source-profile diagnostics that the renderer can consume additively.
