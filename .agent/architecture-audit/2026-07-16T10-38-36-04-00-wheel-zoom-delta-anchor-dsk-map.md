# Architecture Audit — Wheel Zoom Delta and Anchor DSK Map

**Timestamp:** `2026-07-16T10-38-36-04-00`  
**Status:** `wheel-zoom-delta-anchor-convergence-authority-audited`

## Plan ledger

**Goal:** place wheel evidence, camera zoom policy, world-anchor solving, result publication and visible-frame proof under one explicit domain boundary.

- [x] Map current input, coordinate-transform, camera and render owners.
- [x] Preserve existing campaign and CRT responsibilities.
- [x] Identify the missing normalization and convergence boundary.
- [x] Define one parent domain and 18 coordinating surfaces.
- [ ] Implement the domain without moving simulation truth into browser handlers.

## Current ownership

| Surface | Current owner | Current service |
|---|---|---|
| Wheel event | `pixel-campaign-runtime-kit` | Direct `wheel` listener and `preventDefault`. |
| Browser-to-source mapping | `crt-renderer-kit` | `screenToSource(clientX, clientY)`. |
| Source-to-world mapping | `pixel-campaign-runtime-kit` | `screenToWorld` using current camera zoom/position. |
| Zoom intent | `pixel-campaign-runtime-kit` | Direct mutation of `camera.targetZoom`. |
| Zoom clamp | camera object/runtime | Clamp to `camera.min`/`camera.max`. |
| Zoom easing | campaign RAF | Exponential convergence of current zoom. |
| Camera translation | campaign runtime | Direct x/z mutation for keyboard, middle pan and attempted wheel anchor. |
| Visible projection | `pixel-campaign-render-kit` | World/HUD/minimap render using current camera state. |
| CRT output | `crt-renderer-kit` | Canvas upload and WebGL presentation. |

## Missing domain boundary

`phantom-command-wheel-zoom-delta-anchor-convergence-authority-domain`

```txt
browser WheelEvent
  -> wheel-evidence-observer-kit
  -> wheel-delta-mode-normalizer-kit
  -> wheel-trackpad-burst-coalescer-kit
  -> wheel-zoom-command-admission-kit
  -> camera-zoom-policy-kit
  -> camera-zoom-revision-kit
  -> zoom-anchor-world-solver-kit
  -> zoom-anchor-convergence-controller-kit
  -> wheel-zoom-result-kit
  -> pixel-campaign-render-kit
  -> first-wheel-zoom-frame-ack-kit
  -> zoom-anchor-convergence-ack-kit
```

## Service contract

### Admission

```txt
WheelZoomAdmissionCommand {
  documentGeneration
  routeGeneration
  canvasRevision
  pointerSourcePosition
  cameraRevision
  rawDeltaX
  rawDeltaY
  deltaMode
  timestamp
  policyVersion
}
```

### Accepted result

```txt
WheelZoomResult {
  status
  normalizedDeltaPixels
  targetZoom
  previousZoom
  worldAnchor
  cameraRevision
  zoomRevision
  routeGeneration
}
```

### Convergence

```txt
ZoomAnchorConvergenceCommand
  -> interpolate zoom
  -> solve camera position against stored world anchor
  -> clamp camera bounds under one declared policy
  -> publish first-frame and settled acknowledgements
```

## Planned surfaces

```txt
1  phantom-command-wheel-zoom-delta-anchor-convergence-authority-domain
2  wheel-evidence-observer-kit
3  wheel-delta-mode-normalizer-kit
4  wheel-trackpad-burst-coalescer-kit
5  wheel-zoom-command-admission-kit
6  camera-zoom-policy-kit
7  camera-zoom-revision-kit
8  zoom-anchor-world-solver-kit
9  zoom-anchor-convergence-controller-kit
10 camera-route-generation-guard-kit
11 stale-wheel-evidence-rejection-kit
12 zoom-clamp-settlement-kit
13 wheel-zoom-result-kit
14 first-wheel-zoom-frame-ack-kit
15 zoom-anchor-convergence-ack-kit
16 wheel-browser-device-fixture-kit
17 built-artifact-zoom-parity-kit
18 pages-zoom-parity-kit
19 central-reconciliation-kit
```

## Separation rules

- Browser handlers emit evidence; they do not own accepted camera truth.
- Fixed-step gameplay simulation remains independent of camera zoom.
- Pointer selection and order semantics continue using the accepted camera snapshot.
- Motion-preference policy may change easing duration but not normalized command meaning.
- WebGL context recovery remains responsible only for presentation resources.
- Route retirement rejects stale wheel and convergence work through generation identity.

## Validation boundary

Architecture documentation only. No DSK, adapter, runtime path or fixture was implemented.