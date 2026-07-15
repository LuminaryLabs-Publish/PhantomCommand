# Simulation to Depth-Ordered Frame Loop

**Timestamp:** `2026-07-14T23-38-29-04-00`

## Summary

Gameplay state is coherent enough to derive a stable painter order, but the renderer does not carry one simulation revision and one ordering policy through every world object to the visible CRT frame.

## Plan ledger

**Goal:** connect one fixed-step campaign snapshot to one complete world render plan without allowing class-specific draw order to replace depth truth.

- [x] Trace fixed-step mutation into render.
- [x] Identify simulation-owned renderables.
- [x] Identify renderer-owned fixed ordering.
- [x] Define the required snapshot-to-frame result path.
- [ ] Implement and execute gameplay/render convergence fixtures.

## Current loop

```txt
RAF dt
  -> accumulate time
  -> execute zero or more 1/60 simulation updates
  -> mutate units towers projectiles effects wave and outcome state
  -> render directly from mutable state
  -> sort only towers and units
  -> append projectiles effects and sanctum in class order
  -> draw HUD and minimap
  -> submit source canvas to CRT
```

## Gameplay consequence

The issue does not change combat truth. It changes how that truth can be visually interpreted near the sanctum:

```txt
near-side defender or enemy
  -> simulation says the entity is in front of the sanctum
  -> renderer draws the entity first
  -> renderer draws sanctum over it
  -> visible frame can imply the opposite depth relation
```

Health bars are attached during entity drawing and inherit the same incorrect ordering. Projectile and impact feedback similarly lack an explicit depth policy.

## Required gameplay-to-frame contract

```txt
CampaignSnapshot
  units
  towers
  projectiles
  effects
  sanctum
  camera
  outcome

IsometricRenderPlan
  immutable snapshot revision
  classified renderables
  stable ordered world items
  world overlays
  screen overlays

RenderFrameResult
  accepted plan fingerprint
  executed item order
  matching source and CRT frame revisions
```

No gameplay mechanics should depend on Canvas2D order. Presentation should accurately project the accepted gameplay snapshot.
