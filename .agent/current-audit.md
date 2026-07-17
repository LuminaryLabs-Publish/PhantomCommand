# Current Audit

**Timestamp:** `2026-07-17T06-38-14-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Status:** `campaign-input-region-arbitration-authority-audited`

## Summary

The campaign renders the world, HUD, tower controls, minimap and pause/victory/loss overlays into one fixed 640×360 Canvas2D source. Pointer mapping returns `{x, y, inside}`, but campaign click, marquee and right-click order handlers do not enforce `inside` or classify the topmost visible source region before calling `screenToWorld()` and mutating gameplay state.

## Intent

Bind pointer evidence to the same visible region generation used by rendering, and admit world commands only from an unobscured world region.

## Checklist

- [x] Compare all 11 Publish repositories.
- [x] Exclude Cavalry of Rome.
- [x] Select PhantomCommand as the oldest synchronized eligible repository.
- [x] Preserve the complete 20-kit service inventory.
- [x] Trace CRT mapping, source layout, pointer evidence and world commands.
- [x] Add the `2026-07-17T06-38-14-04-00` audit family.
- [ ] Implement region manifests and typed command admission.
- [ ] Execute source, artifact and Pages fixtures.

## Interaction loop

```txt
pointer event
  -> CRT browser/source mapping
  -> source x/y/inside
  -> no HUD/minimap/modal/world region decision
  -> screenToWorld
  -> select, marquee or order mutation
  -> fixed-step simulation
  -> next rendered frame
```

## Domains in use

```txt
browser route, modules, DOM, RAF, focus, pointer, keyboard, wheel and storage
procedural menu, settings, save presence, audio and route transition
Canvas2D world, HUD, controls, minimap, overlays and typography
WebGL CRT, texture upload, viewport and source mapping
campaign units, towers, waves, combat, resources, selection and orders
camera, fixed-step scheduling, persistence, diagnostics, static build and Pages
source-region classification, command admission and visible-frame proof
```

## Current gap

```txt
source inside value: present but unenforced
source-region manifest: absent
visible z-order interaction authority: absent
HUD/control/minimap/modal classification: absent
world-command region lease: absent
InputRegionDecisionResult: absent
WorldCommandAdmissionResult: absent
FirstRegionBoundCommandFrameAck: absent
```

## Required authority

`phantom-command-campaign-input-region-arbitration-authority-domain`

## Boundary

Documentation only. No runtime pointer, gameplay, rendering, test, build or deployment behavior changed.