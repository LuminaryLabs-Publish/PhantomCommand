# Gameplay Audit — Device-Dependent Camera Zoom Loop

**Timestamp:** `2026-07-16T10-38-36-04-00`  
**Status:** `wheel-zoom-delta-anchor-convergence-authority-audited`

## Plan ledger

**Goal:** ensure camera zoom changes device presentation only, not the player's ability to read, select and command the same world location.

- [x] Trace wheel input into camera target zoom.
- [x] Trace camera zoom into world projection, selection and orders.
- [x] Identify device-unit and anchor drift risks.
- [ ] Prove interaction semantics remain stable through accepted zoom convergence.

## Current gameplay loop

```txt
player positions pointer over a unit, pad or world location
  -> wheel event changes target zoom using raw deltaY
  -> current zoom changes later
  -> world beneath pointer can move
  -> subsequent primary click, drag or secondary order uses the new screenToWorld result
  -> selected or commanded location can differ from the location the player intended to preserve while zooming
```

## Gameplay-sensitive consumers

```txt
selectAt(screenToWorld(pointer))
order(screenToWorld(pointer))
drag rectangle source-to-world conversion
middle-button camera pan
world entity and pad projection
minimap relation to camera view
```

The fixed-step simulation itself does not depend on camera zoom. The concern is command targeting and route reading around a device-dependent camera transition.

## Required gameplay contract

- Normalized wheel intent must produce equivalent zoom magnitude across supported device units.
- The chosen world anchor must remain stable unless camera bounds make exact preservation impossible.
- Bound-limited anchor loss must be explicit in the result.
- Selection and order commands must consume an accepted camera revision.
- A stale wheel command must not alter a newer route or camera generation.
- The first changed frame must be acknowledged before interaction evidence is interpreted against the new projection, or the input pipeline must bind each event to its camera revision.

## Not claimed

No incorrect unit selection, invalid build, missed order or failed campaign was reproduced. This audit identifies a source-backed command-reading risk and missing proof boundary.