# World Item Painter Contract

**Timestamp:** `2026-07-14T23-38-29-04-00`

## Summary

The painter contract must classify every drawable by coordinate space and layer, then deterministically order all world-space items. Fixed class order is acceptable only where the policy explicitly defines a separate layer.

## Plan ledger

**Goal:** define a minimal deterministic painter contract for the existing Canvas2D renderer.

- [x] Define coordinate spaces.
- [x] Define layer ordering.
- [x] Define world depth and stable tie breaks.
- [x] Define sanctum, projectile, effect and health-bar behavior.
- [ ] Implement the contract and fixtures.

## Coordinate spaces

```txt
terrain-space
  rings lanes pads

world-space
  sanctum towers units projectiles world effects

world-overlay-space
  selected rings health bars target markers

screen-space
  HUD tower bar message minimap pause terminal overlays
```

## Required layer order

```txt
1 terrain
2 ordered world items
3 admitted world overlays
4 screen HUD and minimap
5 modal pause or terminal overlay
```

## World ordering

```txt
depthKey = x + z
primary sort = depthKey ascending
secondary sort = explicit class bias only when geometrically necessary
tertiary sort = stable item identity
```

The sanctum participates at `depthKey = 0`. It is not a final overlay. Towers, units, projectiles and effects carry their own world positions and identities.

## Attached overlay policy

Health bars require one explicit choice:

```txt
occluded-world-overlay
  follows entity depth and may be covered by nearer structures

readability-world-overlay
  renders after all world geometry but before screen HUD
```

The policy must be versioned and consistent. It must not emerge accidentally from `drawEntity()` call position.

## Failure behavior

```txt
missing identity -> reject item
invalid coordinates -> reject item and receipt reason
mixed snapshot revision -> reject frame plan
sort failure -> preserve predecessor frame
CRT upload failure -> publish failed presentation result
```

## Evidence

Each accepted frame records ordered item IDs, layer boundaries, source-canvas revision and visible CRT acknowledgement.
