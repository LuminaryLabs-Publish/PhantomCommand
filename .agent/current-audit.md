# PhantomCommand Current Audit

**Timestamp:** `2026-07-14T23-38-29-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Status:** `isometric-render-order-frame-authority-audited`

## Summary

The campaign’s isometric painter order is only partially authoritative. Towers and units are sorted by `x + z`, while projectiles, effects and the sanctum are drawn afterward in fixed class order. The depth-zero sanctum is always last and can cover near-side entities and attached health bars.

## Plan ledger

**Goal:** make one immutable ordered world-item plan the only source for Canvas2D world drawing and CRT-visible frame admission.

- [x] Trace projection and active draw order.
- [x] Confirm `x + z` is the principal screen-depth key.
- [x] Identify render classes outside the shared ordering.
- [x] Define stable layers, tie breaks, results and visible-frame acknowledgement.
- [ ] Implement the authority.
- [ ] Add headless ordering and browser pixel fixtures.
- [ ] Prove source, build and Pages parity.

## Current source path

```txt
rings lanes pads
  -> sorted towers + units
  -> all projectiles
  -> all effects
  -> sanctum always last
  -> HUD minimap and modal overlays
  -> CRT upload and presentation
```

## Required authority

```txt
phantom-command-isometric-render-order-frame-authority-domain
```

## Validation boundary

Documentation only. No product source, renderer behavior, gameplay, tests, build or deployment changed.
