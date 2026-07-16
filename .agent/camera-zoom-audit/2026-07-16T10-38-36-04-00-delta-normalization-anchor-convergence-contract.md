# Camera Zoom Audit — Delta Normalization and Anchor Convergence Contract

**Timestamp:** `2026-07-16T10-38-36-04-00`  
**Status:** `wheel-zoom-delta-anchor-convergence-authority-audited`

## Plan ledger

**Goal:** define exact normalization and camera mathematics before runtime implementation.

- [x] Identify raw input-unit ambiguity.
- [x] Identify why the current anchor correction is zero.
- [x] Define normalized command and convergence invariants.
- [ ] Select and implement calibrated policy values through fixtures.

## Delta normalization

`WheelEvent.deltaMode` meanings:

```txt
0 -> pixels
1 -> lines
2 -> pages
```

The authority should convert all evidence to one logical pixel-equivalent unit before applying zoom sensitivity:

```txt
normalizedY = rawDeltaY * unitScale(deltaMode)
zoomFactor = exp(-normalizedY * sensitivity)
targetZoom = clamp(previousTargetZoom * zoomFactor, minZoom, maxZoom)
```

Line and page scales must be versioned policy values, not browser-handler constants. Trackpad bursts should be coalesced without changing total normalized intent.

## Anchor invariant

Given:

```txt
P = pointer position in source coordinates
A = world point beneath P before zoom
Z = current interpolated zoom
C = camera world position
```

For every accepted convergence frame, solve `C` so:

```txt
screenToWorld(P, C, Z) approximately equals A
```

The current code instead calculates `A` twice with the same `C` and `Z` before changing `Z`, so the correction is zero.

## Convergence policy

- Store `A` and the source-space pointer position on accepted admission.
- Interpolate zoom according to the accepted motion policy.
- Re-solve camera x/z after each zoom step.
- Apply camera/world bounds after the anchor solve.
- Report `constrained` when bounds introduce anchor error.
- Settle when zoom error and anchor error remain within declared tolerances.
- Supersede prior convergence with a newer coalesced zoom revision.
- Reject convergence work after route or camera retirement.

## Required invariants

```txt
same normalized evidence -> same target zoom
same pointer/camera/world state -> same anchor result
accepted zoom revision -> monotonic camera revision
no-op clamp -> explicit unchanged result
new wheel revision -> prior convergence superseded once
retired route -> no camera mutation
first changed frame -> matching frame acknowledgement
settled zoom -> bounded anchor error acknowledgement
```

## Fixture matrix

| Device/evidence | Required proof |
|---|---|
| Pixel mouse wheel | Calibrated target and anchor stability. |
| Line-mode wheel | Equivalent normalized intent. |
| Page-mode wheel | Bounded conversion and clamp behavior. |
| Smooth trackpad | Coalesced stable target. |
| Momentum tail | Deterministic supersession/settlement. |
| Center pointer | No unexpected translation. |
| Off-center pointer | World anchor remains stable. |
| Camera bound | Explicit constrained result and error. |
| Min/max zoom | Explicit unchanged result. |
| Route exit | Stale evidence rejected. |

## Validation boundary

Policy constants, tolerances and browser behavior remain uncalibrated because no runtime or fixture was executed.