# Session Provenance Render Readback Gap

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Timestamp:** `2026-07-10T17-08-36-04-00`

## Current render surface

```txt
live mutable campaign state
  -> drawWorld
  -> drawEntity and drawSanctum
  -> drawUI
  -> drawMinimap
  -> modal overlay
  -> CRT renderer
  -> browser canvas
```

The renderer is a functional consumer of the live campaign, but it exposes no machine-readable record of what session baseline produced a frame.

## Current proof gap

A screenshot from `game.html?campaign=continue` cannot distinguish:

```txt
a successfully hydrated resumable session
a rejected save followed by deterministic fallback-new
a foreign candidate ignored by policy
a legacy completion summary misread as resumable
a fresh campaign that silently ignored the Continue intent
```

`window.GameHost.getState()` exposes aggregate counts and camera zoom, but not:

```txt
requested session mode
selected save candidate
candidate classification
hydration result
save schema version
source revision
saved fingerprint
hydrated fingerprint
simulation tick
render frame number
applied session fingerprint
```

## Required additive readback

```txt
render.frameId
render.simulationTick
render.sessionId
render.sessionMode
render.sessionResultStatus
render.sourceRevision
render.stateFingerprint
render.consumerRows.world
render.consumerRows.hud
render.consumerRows.minimap
render.consumerRows.overlay
render.consumerRows.crt
```

Each consumer row should report the same session fingerprint and simulation tick. This proves that world, HUD, minimap, modal, and CRT surfaces consumed one authoritative hydrated baseline.

## Non-goals

Do not replace the 2D canvas renderer, CRT pass, minimap, camera, pixel art, or UI layout during this persistence pass. Render readback is additive proof, not a visual rewrite.
