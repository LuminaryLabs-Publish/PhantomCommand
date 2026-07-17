# Camera-Pan Audit — Source-Delta / World-Anchor Contract

**Timestamp:** `2026-07-16T23-59-01-04-00`  
**Status:** `isometric-middle-pan-anchor-convergence-authority-audited`

## Contract

A grab-pan gesture should preserve the world point under the accepted pointer-down source coordinate until the gesture ends or a declared camera boundary prevents convergence.

Given source displacement `(dx, dy)` and zoom `z`:

```txt
cameraDx = -dy / (z * 0.72) - dx / (z * 1.44)
cameraDz = -dy / (z * 0.72) + dx / (z * 1.44)
```

The active implementation substitutes `0.72` for `1.44` in both horizontal terms. Its horizontal camera displacement is exactly twice the canonical inverse-transform value.

## Invariants

1. Zero source displacement produces no camera mutation.
2. A horizontal gesture uses half the world displacement magnitude of an equal vertical source gesture under this isometric projection.
3. The world anchor captured at pointer-down projects to the current pointer after settlement, unless camera bounds are active.
4. Bounds-induced divergence is explicit in the result.
5. Pointer, route, camera, viewport and gesture generations must match.
6. Cancellation retires the generation exactly once.
7. Rendering consumes the settled camera revision and publishes a first-frame acknowledgement.

## Fixtures

```txt
horizontal ±64 source pixels at zoom 0.78
vertical ±64 source pixels at zoom 0.78
four diagonal combinations
minimum and maximum zoom
camera bounds on each axis
mid-gesture zoom or keyboard-pan arbitration
blur and pointer cancellation
letterbox/pillarbox mapping
built artifact and Pages origin
```

## Not implemented

This record defines the contract only. Runtime formulas and input behavior remain unchanged.