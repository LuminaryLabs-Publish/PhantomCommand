# Render Audit — Middle-Pan Grabbed-Anchor Visible-Frame Gap

**Timestamp:** `2026-07-16T23-59-01-04-00`  
**Status:** `isometric-middle-pan-anchor-convergence-authority-audited`

## Finding

The visible world is projected with `worldToScreen`, whose isometric x component uses the half-width coefficient `0.72`. Its inverse horizontal source term is therefore `1 / 1.44`. Middle-drag camera mutation uses `1 / 0.72` for the same horizontal source delta.

```txt
horizontal pointer motion
  -> active camera displacement is 2x canonical inverse displacement
  -> grabbed world point does not remain under the pointer
  -> frame renders a different anchor than the gesture implies
```

Vertical displacement uses the correct `1 / 0.72` term. The defect is anisotropic: horizontal and diagonal drags diverge differently from vertical drags.

## Missing frame contract

```txt
camera revision bound to pan result
expected grabbed-world anchor
projected source position of that anchor
camera-boundary classification
FirstMiddlePanFrameAck
PanAnchorConvergenceAck
```

## Required proof

- Pure horizontal drag in both directions.
- Pure vertical drag in both directions.
- Diagonal drag through all quadrants.
- Minimum, default and maximum zoom.
- Camera-boundary clamping.
- Letterboxed and pillarboxed browser aspect ratios.
- Source, built artifact and Pages parity.

No rendered fixture was executed. The audit documents source mathematics only.