# PhantomCommand Construct Render Handoff Audit

**Timestamp:** `2026-07-08T07:50:47-04:00`

## Scope

This audit documents the current visual/render surface for `PhantomCommand` and the next descriptor handoff required before renderer extraction.

This pass does not change runtime source files.

## Current render route

```txt
index.html
  -> game.html
  -> Three.js CDN import
  -> WebGLRenderer(canvas)
  -> Scene + Fog + PerspectiveCamera
  -> ambient/directional/fill lights
  -> material palette
  -> wedge geometry pieces
  -> requestAnimationFrame frame loop
```

## Current render services in `game.html`

```txt
create WebGL renderer
set pixel ratio and canvas size
create scene background and fog
create camera and zoom/orbit state
create ambient, sun, and fill lights
create stone material palette
create seam line material
create wedge geometry through ExtrudeGeometry
create ring piece Groups
create center disc
create Grim Reaper Totem blockout
create Phantom Commander blockout
animate construct pieces each frame
mutate HUD progress/count/phase/status
update camera pan/zoom/orbit
render scene/camera
handle resize
```

## Visual source authority problem

The renderer currently consumes inline facts directly.

```txt
inline constants
  -> ring descriptors
  -> piece start/final poses
  -> wedge geometry
  -> animation interpolation
  -> HUD projection
  -> GameHost state
```

That makes the current visual difficult to validate without a browser and difficult to hand off to a scenario/RTS state machine.

## Descriptor handoff target

```txt
SmoothHandoffProfile
  -> SourceFingerprint
  -> SourceSnapshot
  -> RingDescriptor[]
  -> PieceDescriptor[]
  -> PieceTimingDescriptor[]
  -> TransitionMarginDescriptor[]
  -> ConstructRenderDescriptor[]
  -> ConstructHudDescriptor
  -> ConstructSnapshot
```

## Renderer fixture cases needed

```txt
render-profile-build-id
render-ring-count-parity
render-ring-gap-zero-parity
render-ring-part-count-parity
render-piece-count-parity
render-total-build-seconds-parity
render-transition-margin-parity
render-piece-start-final-pose-shape
render-hud-descriptor-shape
render-gamehost-compatibility-shape
```

## Acceptance target

```txt
index.html still routes to game.html
game.html still shows smooth-ring-handoff-v6
visible construct timing does not regress
legacy GameHost still exposes skipConstruct/restartConstruct/getState
source-owned descriptors can reproduce the live render facts
unsupported/unconsumed descriptor fields are reported explicitly
no full RTS renderer work starts until construct descriptor parity passes
```

## Do not do yet

```txt
Do not replace Three.js rendering.
Do not rewrite the scene aesthetic.
Do not remove the inline runtime until parity fixtures exist.
Do not add unit selection or combat renderer before scenario bootstrap result gates exist.
```
