# Isometric Render Order DSK Map

**Timestamp:** `2026-07-14T23-38-29-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`

## Summary

The current campaign mixes simulation-owned world objects with renderer-owned draw ordering inside one module. Only towers and units participate in depth sorting. The required domain should remain renderer-neutral at the descriptor and result boundary while Canvas2D performs the actual draw work.

## Plan ledger

**Goal:** define the smallest domain boundary that turns one simulation snapshot into one stable, inspectable isometric render plan.

- [x] Identify current simulation, projection and rendering ownership.
- [x] Preserve all existing runtime kits.
- [x] Separate world-item descriptors from Canvas2D execution.
- [x] Define stable depth and tie-break policy.
- [x] Define typed frame result and visible-frame acknowledgement.
- [ ] Implement the authority and fixtures.

## Current domain map

```txt
campaign content
  rings lanes pads archetypes tower types waves

campaign simulation
  spawn movement targeting combat damage rewards outcomes

camera/projection
  iso worldToScreen screenToWorld pan zoom focus

Canvas2D world rendering
  rings lanes pads
  sorted towers + units
  projectiles
  effects
  sanctum
  HUD minimap overlays

CRT presentation
  source texture upload
  WebGL shader
  visible canvas
```

## Required parent domain

```txt
phantom-command-isometric-render-order-frame-authority-domain
```

## Proposed subkits and services

| Proposed kit | Service |
|---|---|
| `campaign-frame-identity-kit` | Allocates `FrameId` and binds one accepted render attempt. |
| `simulation-snapshot-revision-kit` | Identifies the exact campaign snapshot being presented. |
| `camera-projection-revision-kit` | Binds camera position, zoom and projection policy. |
| `world-renderable-descriptor-kit` | Normalizes world objects into renderer-neutral descriptors. |
| `isometric-depth-key-kit` | Derives principal painter depth from world coordinates. |
| `render-layer-policy-kit` | Separates terrain, world objects, world overlays and screen overlays. |
| `stable-depth-tie-break-kit` | Produces deterministic ordering when depth keys match. |
| `sanctum-render-item-kit` | Represents the sanctum as a world item at depth zero. |
| `tower-render-item-kit` | Projects towers into the admitted world list. |
| `unit-render-item-kit` | Projects units and their attached state into the admitted list. |
| `projectile-render-item-kit` | Projects projectiles with world depth and stable identity. |
| `effect-render-item-kit` | Projects world effects with depth and lifetime identity. |
| `world-health-overlay-policy-kit` | Defines whether health bars follow entity occlusion or render in a later world-overlay layer. |
| `isometric-render-plan-kit` | Produces one immutable ordered plan. |
| `render-item-receipt-kit` | Records executed draw order and skipped/rejected items. |
| `first-depth-ordered-frame-ack-kit` | Acknowledges the first CRT-visible frame matching the plan. |
| `source-build-pages-render-order-fixture-kit` | Proves source, build and deployment parity. |

## Command and result boundary

```txt
IsometricRenderFrameCommand
  FrameId
  SimulationRevision
  CameraRevision
  ViewportRevision
  world descriptors

IsometricRenderPlan
  terrain layer
  ordered world items
  world overlays
  screen overlays
  stable fingerprint

RenderFrameResult
  accepted plan fingerprint
  draw receipts
  rejected items
  source-canvas revision
  CRT texture revision

FirstVisibleDepthOrderedFrameAck
  FrameId
  plan fingerprint
  visible canvas revision
```

## Ownership rule

Game logic owns world truth. The render-order domain owns classification and ordering. Canvas2D owns raster execution. CRT owns source-to-visible presentation. No layer may silently replace the accepted order.
