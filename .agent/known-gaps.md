# Known Gaps

**Generated:** `2026-07-16T10-38-36-04-00`  
**Status:** `wheel-zoom-delta-anchor-convergence-authority-audited`

## Current priority

- The campaign reads raw `WheelEvent.deltaY` without `deltaMode` normalization.
- Pixel, line and page wheel units therefore share one fixed multiplier despite different meanings.
- Smooth trackpad bursts and momentum have no coalescing or command identity.
- `before` and `after` world coordinates are both calculated with the unchanged current `camera.zoom`.
- The attempted pointer-anchor correction is consequently zero at wheel-event time.
- RAF changes `camera.zoom` later, so projection changes around the camera center rather than the intended pointer anchor.
- No camera-zoom revision binds the wheel event, target zoom, camera translation and rendered frame.
- No stale route or camera-generation rejection exists for wheel evidence.
- No explicit unchanged result exists when zoom is already clamped at its minimum or maximum.
- No `WheelZoomResult` exists.
- No `FirstWheelZoomFrameAck` exists.
- No `ZoomAnchorConvergenceAck` exists.
- No browser, built-artifact or Pages fixture proves cross-device zoom equivalence or pointer-anchor stability.

## Source-backed evidence

```txt
wheel listener: present
deltaY scalar: present
deltaMode read: absent
targetZoom clamp: present
pointer-to-source mapping: present
before world anchor: present
after world anchor under changed current zoom: absent
zero immediate anchor correction: implied by identical inputs
later zoom easing: present
typed zoom result and frame acknowledgements: absent
```

## Not claimed

```txt
mouse-wheel failure on every device
trackpad failure on every browser
camera instability outside wheel zoom
cross-device zoom equivalence
pointer-anchor preservation
browser artifact or Pages parity
production readiness
```

## Retained gaps

Motion preference, campaign audio, pointer capture/cancellation, pointer feedback, menu audio lifecycle, diagnostics, device coverage, render order, pause input, terminal settlement, startup readiness, settings adoption, victory persistence, route retirement, fixed-step scheduling, WebGL recovery, accessibility, combat modifiers, campaign bootstrap, keyboard commands and broad spatial input remain separately documented.