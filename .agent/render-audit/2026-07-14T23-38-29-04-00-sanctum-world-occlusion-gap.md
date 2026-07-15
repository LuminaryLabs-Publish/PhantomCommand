# Sanctum World Occlusion Gap

**Timestamp:** `2026-07-14T23-38-29-04-00`

## Summary

The renderer uses a correct principal isometric depth key for towers and units, then bypasses it for projectiles, effects and the sanctum. The sanctum is always drawn last even though its world depth is zero.

## Plan ledger

**Goal:** require every world-space item to participate in one stable painter order before the source canvas is admitted to CRT presentation.

- [x] Trace `iso()`, `worldToScreen()` and the painter key.
- [x] Trace all world draw classes.
- [x] Identify fixed-order classes outside the sorted list.
- [x] Define expected near/far sanctum behavior.
- [ ] Execute browser pixel-order fixtures.

## Source path

```txt
worldToScreen y = H/2 + 30 + (x + z) * 0.36 * zoom

sorted:
  towers
  units

fixed after sorted entities:
  projectiles
  effects
  sanctum
```

## Occlusion expectation

```txt
far-side entity: x + z < 0
  draw before sanctum
  sanctum may occlude entity

sanctum: x + z = 0
  draw between far-side and near-side world items

near-side entity: x + z > 0
  draw after sanctum
  entity may occlude sanctum
```

The current implementation draws all entities before the sanctum. Near-side bodies and attached health bars can therefore be covered by the sanctum. Projectiles and effects can also cross objects without a deterministic world-depth relationship.

## Required proof

```txt
stable item identities
principal depth key
stable equal-depth tie-break
world versus overlay classification
sanctum admitted as a normal world item
projectile/effect depth admission
health-bar occlusion policy
Canvas2D draw receipts
CRT-visible matching frame acknowledgement
```

## Validation boundary

No screenshot, browser render, pixel probe or visual regression fixture was run. The finding is derived from the source draw order.
