# Render Audit — Square Center Clamp vs Visible Coverage

**Timestamp:** `2026-07-17T11-39-49-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`

## Summary

The render path projects a fixed 640×360 isometric source through the CRT renderer. Camera bounds are settled as independent `x` and `z` center clamps before the source frame is drawn, but the clamp does not model the visible source footprint, projection offset, zoom or circular arena geometry.

## Source geometry

```txt
outer ring radius: 147
source size: 640x360
source-space camera origin: x 320, y 210
zoom range: 0.34..2.45
camera x clamp: -147..147
camera z clamp: -147..147
```

Independent axis clamps form a square camera-center region. Its corner radius is:

```txt
sqrt(147^2 + 147^2) = 207.89
```

That is `60.89` world units beyond the outer ring radius.

## Visible-footprint evidence

The source/world inverse transform is asymmetric because the camera origin is vertically biased to `y = 210`. Inverse-projecting all source corners yields a zoom-dependent quadrilateral, not a circle around the camera.

Maximum source-corner distance from camera center:

```txt
zoom 0.34: 1525.18
zoom 0.78: 664.82
zoom 2.45: 211.66
```

This does not imply that the entire source footprint must remain inside the arena. It means a camera policy must explicitly decide what remains protected: center point, sanctum, selected units, minimum arena coverage, or an overscan envelope.

## Current render gap

```txt
arena extent revision: implicit constant
viewport revision: implicit canvas dimensions
zoom revision: mutable scalar
projection revision: implicit functions
camera target revision: absent
coverage policy: absent
pre-render boundary result: absent
CameraCoverageResult: absent
FirstCameraBoundsFrameAck: absent
```

## Required render contract

```txt
accepted arena + source viewport + projection + zoom
  -> compile visible world footprint
  -> solve accepted camera envelope
  -> commit camera generation
  -> render Canvas2D source
  -> upload source texture
  -> present CRT frame
  -> FirstCameraBoundsFrameAck
```

## Fixtures required

- Keyboard pan cannot retire all intended arena coverage under the accepted policy.
- Middle pan settles against the same envelope as keyboard pan.
- Wheel-anchor zoom preserves its anchor until boundary settlement requires an explicit correction.
- Focus-to-selection and focus-to-sanctum settle through the same authority.
- Minimum and maximum zoom produce deterministic coverage results.
- Source, built artifact and Pages origins produce matching camera/frame digests.

## Boundary

No rendering code, camera math, viewport behavior or CRT output changed. No visual regression or production camera failure is claimed.