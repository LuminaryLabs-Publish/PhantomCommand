# Gameplay Audit — Camera Grab-Pan Control Loop

**Timestamp:** `2026-07-16T23-59-01-04-00`  
**Status:** `isometric-middle-pan-anchor-convergence-authority-audited`

## Interaction loop

```txt
middle pointerdown
  -> save source x/y

middle pointermove
  -> calculate source dx/dy
  -> mutate camera x/z immediately
  -> save latest source x/y

next RAF
  -> keyboard velocity also mutates camera
  -> clamp camera to world bounds
  -> ease zoom
  -> advance fixed-step simulation
  -> render Canvas2D and CRT frame
```

## Gameplay consequence

Middle drag is a navigation control used to read lanes, pads, allied positions and incoming waves. The duplicated transform makes horizontal camera travel twice the canonical grabbed-anchor displacement. This can make tactical navigation feel faster horizontally than vertically and can displace the intended focal point during diagonal drags.

## Ownership gaps

- Middle pan and keyboard pan may mutate the same camera in one frame without an explicit arbitration result.
- The pointer-down world anchor is not retained.
- Camera boundary clamping is not reported as intentional anchor divergence.
- Route, pointer and camera generations are not bound to one pan result.
- No result distinguishes accepted, clamped, cancelled, stale or unchanged pan work.
- No matching-frame acknowledgement exists.

## Boundary

The audit does not claim unit movement, targeting, combat, wave progression, building, selection or terminal settlement is incorrect. It isolates campaign camera navigation.