# Architecture Audit — Isometric Middle-Pan Anchor DSK Map

**Timestamp:** `2026-07-16T23-59-01-04-00`  
**Status:** `isometric-middle-pan-anchor-convergence-authority-audited`

## Current ownership

```txt
crt-renderer-kit
  -> browser-screen to 640x360 source mapping

pixel-campaign-runtime-kit
  -> pointer state
  -> middle-button lifecycle
  -> camera state
  -> screenToWorld transform
  -> direct camera mutation during pointermove

pixel-campaign-render-kit
  -> worldToScreen projection
  -> visible world, HUD and minimap

RAF host
  -> camera clamping
  -> simulation ticks
  -> render
```

The campaign owns both the canonical `screenToWorld` transform and a separate hand-written middle-pan delta conversion. Those formulas disagree horizontally.

## Required parent domain

`phantom-command-isometric-middle-pan-anchor-convergence-authority-domain`

## Child DSK map

| DSK | Authority and services |
|---|---|
| `middle-pointer-evidence-observer-kit` | Normalize middle-button pointerdown, move, up, cancel and blur evidence. |
| `source-viewport-admission-kit` | Admit only evidence mapped inside the active source viewport. |
| `middle-pan-gesture-generation-kit` | Allocate and retire one gesture generation per accepted pointer lifecycle. |
| `pan-camera-snapshot-kit` | Bind route, camera, zoom, canvas and viewport revisions. |
| `grabbed-world-anchor-snapshot-kit` | Resolve the exact world point under the admitted pointer-down position. |
| `source-delta-normalizer-kit` | Produce finite source-space deltas with pointer identity and ordering. |
| `isometric-screen-delta-inverse-transform-kit` | Convert source deltas through the same coefficients as `screenToWorld`. |
| `pan-anchor-world-solver-kit` | Solve camera displacement required to preserve the grabbed world point. |
| `pan-anchor-convergence-controller-kit` | Compare expected and projected anchor positions and settle tolerance. |
| `camera-bounds-settlement-kit` | Apply campaign camera bounds and report any intentional anchor loss caused by clamping. |
| `stale-pan-generation-rejection-kit` | Reject stale route, camera, viewport, pointer or gesture generations. |
| `middle-pan-result-kit` | Publish accepted, unchanged, clamped, cancelled, stale or rejected outcomes. |
| `first-middle-pan-frame-ack-kit` | Acknowledge the first frame containing the accepted camera revision. |
| `pan-anchor-convergence-ack-kit` | Acknowledge source/world anchor convergence or declared boundary divergence. |
| `middle-pan-browser-fixture-kit` | Exercise horizontal, vertical, diagonal, high-DPR and letterboxed gestures. |
| `built-artifact-pan-parity-kit` | Verify source and built-output pan behavior share the same revision and results. |
| `pages-pan-parity-kit` | Verify deployed-origin behavior and matching-frame acknowledgements. |
| `central-reconciliation-kit` | Bind the repo-local audit generation into the central ledger. |

## Command/result flow

```txt
MiddlePanAdmissionCommand
  -> MiddlePanAdmissionResult
  -> MiddlePanProjectionCommand
  -> canonical inverse transform
  -> camera bounds settlement
  -> MiddlePanResult
  -> FirstMiddlePanFrameAck
  -> PanAnchorConvergenceAck
```

## Boundary

Keyboard pan, wheel zoom, click/marquee selection, fixed-step simulation, orders, construction, combat, audio, persistence, WebGL lifecycle and deployment remain separate retained authorities. This audit proposes no runtime restructuring outside the middle-pan command/result boundary.