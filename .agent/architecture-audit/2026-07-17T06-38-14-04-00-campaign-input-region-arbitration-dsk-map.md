# Campaign Input Region Arbitration DSK Map

**Timestamp:** `2026-07-17T06-38-14-04-00`  
**Runtime source:** `e92f61c79ed20998fdb4edfb962cac3754d3a651`

## Intent

Add one semantic authority above the existing CRT mapper, Canvas2D renderer and campaign command handlers without restructuring simulation, rendering or campaign rules.

## Current ownership map

```txt
crt-renderer-kit
  owns browser-to-source contain mapping and returns x, y, inside

pixel-campaign-render-kit
  owns world, HUD, tower controls, minimap and modal overlays
  does not publish a source-region manifest

pixel-campaign-runtime-kit
  owns pointer handlers, selection, marquee and orders
  consumes source x/y but not inside or visible-region ownership

fixed-step-campaign-simulation-kit
  consumes accepted commands and advances deterministic gameplay
```

## Required parent domain

`phantom-command-campaign-input-region-arbitration-authority-domain`

## Command/result contract

```txt
InputRegionManifestCommand
  input:
    routeRevision
    sourceViewportRevision
    renderFrameRevision
    hudRevision
    minimapRevision
    modalRevision
  result:
    SourceRegionManifestResult

PointerRegionAdmissionCommand
  input:
    browserPointerEvidence
    sourceMappingResult
    expectedRegionManifestRevision
    gestureId
  result:
    InputRegionDecisionResult

WorldCommandAdmissionCommand
  input:
    inputRegionDecision
    commandKind
    commandPayload
    idempotencyKey
  result:
    WorldCommandAdmissionResult
    FirstRegionBoundCommandFrameAck
```

## DSK breakdown

```txt
source-presentation-region-manifest-kit
  immutable world/HUD/control/minimap/modal/excluded rectangles and revisions

crt-source-inside-admission-kit
  consumes screenToSource().inside and rejects letterbox/pillarbox evidence

visible-region-z-order-kit
  resolves the topmost visible region for one source point

hud-hit-region-kit
  status and message panel ownership

tower-control-hit-region-kit
  bottom command-strip ownership and optional control command mapping

minimap-hit-region-kit
  explicit passive, focus or navigation policy

modal-overlay-hit-region-kit
  pause, victory and loss input suspension

pointer-region-gesture-lease-kit
  binds one pointer gesture to one admitted region generation

world-region-command-admission-kit
  admits selection, marquee and order only from unobscured world evidence

stale-region-generation-rejection-kit
  rejects route, frame, viewport, overlay and gesture drift

input-region-decision-result-kit
  typed accepted/rejected classification with source evidence digest

world-command-admission-result-kit
  exact command settlement and rejection reason

first-region-bound-command-frame-ack-kit
  proves the rendered frame matches the accepted region-bound command
```

## Compatibility boundary

Preserve fixed source resolution, CRT contain mapping, camera transforms, selection semantics, marquee semantics, order behavior, simulation timing, rendering appearance, HUD layout, minimap appearance, saves, audio and deployment.