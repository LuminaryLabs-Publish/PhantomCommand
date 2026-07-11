# Roundtrip, Corruption and First-Frame Fixture Gate

**Timestamp:** `2026-07-11T05-50-43-04-00`

## Summary

Source-pattern checks cannot prove resumable campaign integrity. Deployment should eventually require deterministic checkpoint roundtrip, corruption rejection, rollback and first-frame consumption fixtures.

## Plan ledger

**Goal:** define an executable gate that prevents malformed, partial or visually stale resume behavior from reaching Pages.

- [x] Record current scripts.
- [x] Define DOM-free checkpoint fixtures.
- [x] Define corruption and rollback fixtures.
- [x] Define browser first-frame smoke.
- [x] Define deployment ordering.
- [ ] Add scripts and wire the gate after implementation.

## Current scripts

```txt
npm run check
  -> node scripts/check-menu.mjs
  -> node scripts/check-campaign.mjs

npm run build
  -> node scripts/build-static.mjs
```

## Required future scripts

```txt
npm run fixture:checkpoint
npm run smoke:resume
```

## DOM-free fixture matrix

```txt
fresh state -> checkpoint -> hydrate -> identical canonical fingerprint
mid-wave checkpoint with pending spawn rows
active towers, units, projectiles and selections
paused checkpoint
won checkpoint
unsupported schema rejection
content identity mismatch rejection
fingerprint corruption rejection
duplicate entity ID rejection
missing tower/pad reference rejection
invalid projectile target rejection
counter collision rejection
failed hydration leaves active state unchanged
same resume command is idempotent
stale session/generation cannot commit
migration from each supported older schema
```

## Browser smoke

```txt
load menu
install a valid checkpoint candidate
verify Continue displays candidate metadata
activate Continue
verify candidate identity reaches campaign boot
commit resume epoch
verify restored souls/core/wave/entities/pads/camera
verify first world/HUD/minimap/CRT frame acknowledges the checkpoint fingerprint
reload and repeat
install malformed candidate
verify typed rejection and no partial campaign mutation
```

## Deployment order

```txt
npm run check
  -> npm run fixture:checkpoint
  -> npm run build
  -> browser resume smoke
  -> Pages publish
```

## Do not claim

Do not claim Continue works, full campaign persistence, atomic resume, migration safety, corruption safety or first-frame fidelity until these fixtures pass on `main`.
