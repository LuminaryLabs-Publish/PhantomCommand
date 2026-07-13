# CRT Visible World and Selection Geometry Gap

**Timestamp:** `2026-07-12T19-58-07-04-00`

## Summary

The visible campaign frame and logical pointer geometry are not guaranteed to agree. Rendering applies aspect containment and CRT curvature, while input reverses only aspect containment and rectangle selection uses an incomplete inverse transform.

## Plan ledger

**Goal:** prove that the visible pixel, logical source point, world point, selection membership and first visible result frame all cite one transform revision.

- [x] Inspect CRT shader containment and curvature.
- [x] Inspect screen-to-source projection.
- [x] Inspect source-to-world projection.
- [x] Inspect point and rectangle selection.
- [x] Record the concrete two-corner geometry failure.
- [ ] Implement inverse-CRT and visible-geometry fixtures.

## Render path

```txt
640 x 360 source canvas
  -> WebGL texture upload
  -> containUv for output aspect
  -> curveUv when CRT is enabled
  -> aberration, grain, scanline, vignette and fade
  -> visible output canvas
```

## Input path

```txt
client pointer
  -> canvas bounding rectangle normalization
  -> reverse aspect containment only
  -> source x/y plus inside flag
  -> inside flag ignored by campaign handlers
  -> no inverse curveUv
  -> source-to-world inverse isometric transform
```

## Geometry mismatch

```txt
visible transform revision: absent
input transform revision: absent
inverse CRT curve: absent
source containment enforcement: absent
world projection result: absent
selection polygon result: absent
first visible result frame acknowledgement: absent
```

## Rectangle defect

The visible source rectangle has four corners, but the runtime transforms only top-left and bottom-right. Under the isometric inverse, this does not preserve rectangle membership.

```txt
source top-left     (300,160) -> world (-83.33,-55.56)
source bottom-right (340,180) -> world (-27.78,-55.56)
runtime z interval            -> approximately zero
source top-right    (340,160) -> world (-55.56,-83.33)
source bottom-left  (300,180) -> world (-55.56,-27.78)
actual z span                  -> approximately 55.55 units
```

The rendered selection marquee can cover units that the world-axis test cannot select.

## Required render proof

```txt
ViewportTransformRevision
CrtTransformRevision
SourceContainmentResult
VisibleToSourceProjectionResult
SourceToWorldProjectionResult
SelectionPolygonResult
SelectionMembershipResult
SpatialInputResult
CampaignActionResult
VisibleSpatialResultFrameAck
```

## Fixture requirements

```txt
CRT enabled and disabled
wide, tall and matching-aspect outputs
letterbox and pillarbox misses
center and edge pointer probes
cardinal grid of visible-to-source probes
selection rectangles with dx = 2 * dy and other cancellation ratios
camera translation and min/max zoom
source route, built output and Pages parity
pixel probe plus logical membership comparison
```

## Claim boundary

This audit proves a source-backed mismatch between visible and logical geometry. It does not claim the CRT inverse, selection polygon or deployed frame proof exists.
