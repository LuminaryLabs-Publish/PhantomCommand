# Current Audit

**Timestamp:** `2026-07-17T11-39-49-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Status:** `campaign-camera-coverage-bounds-authority-audited`

## Summary

The campaign arena is circular with an outer radius of `147`. The runtime constrains camera `x` and `z` independently to `[-147,147]`, forming a square camera-center domain whose corners are approximately `207.89` units from the arena origin. The constraint does not use zoom, source viewport, isometric footprint or an explicit minimum-coverage policy.

## Intent

Bind every camera producer to one accepted arena, viewport, projection, zoom and policy revision, then settle one camera generation before rendering.

## Checklist

- [x] Compare all 11 Publish repositories.
- [x] Exclude Cavalry of Rome.
- [x] Select PhantomCommand as the oldest synchronized eligible repository.
- [x] Preserve the complete 20-kit service inventory.
- [x] Trace arena geometry, viewport projection, zoom, camera mutations and frame clamping.
- [x] Add the `2026-07-17T11-39-49-04-00` audit family.
- [ ] Implement a zoom-aware camera envelope and typed boundary result.
- [ ] Execute source, artifact and Pages fixtures.

## Interaction loop

```txt
camera input or host mutation
  -> requested camera center/zoom/anchor
  -> independent x/z clamp in frame
  -> no circular or visible-footprint policy settlement
  -> Canvas2D source render
  -> CRT presentation
  -> no matching camera-boundary frame acknowledgement
```

## Domains in use

```txt
browser route, modules, DOM, RAF, focus, pointer, keyboard, wheel and storage
procedural menu, settings, save presence, audio and route transition
Canvas2D world, HUD, controls, minimap, overlays and typography
WebGL CRT, texture upload, viewport and source mapping
campaign units, towers, waves, combat, resources, selection and orders
camera position, velocity, zoom, focus, source/world transforms and clamping
circular arena extent, visible isometric footprint, coverage policy and frame proof
fixed-step scheduling, persistence, diagnostics, static build and Pages
```

## Current gap

```txt
outer ring radius: 147
maximum square-clamp center radius: 207.89
explicit overscan policy: absent
zoom-aware camera envelope: absent
visible source-footprint solver: absent
shared camera producer admission: absent
CameraCoverageResult: absent
FirstCameraBoundsFrameAck: absent
```

## Required authority

`phantom-command-campaign-camera-coverage-bounds-authority-domain`

## Boundary

Documentation only. No runtime camera, gameplay, rendering, test, build or deployment behavior changed.