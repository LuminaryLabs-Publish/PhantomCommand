# PhantomCommand Validation

**Timestamp:** `2026-07-14T23-38-29-04-00`  
**Status:** `documentation-only`

## Summary

This run audited isometric projection, world-item painter ordering, sanctum occlusion, projectiles, effects, health overlays, CRT presentation and deployment proof boundaries. It did not modify or execute the product runtime.

## Plan ledger

**Goal:** state exactly what was inspected, changed and not proven.

- [x] Inspect `src/campaign/campaign-scene.js` render and simulation paths.
- [x] Inspect `scripts/check-campaign.mjs` and `package.json` validation surfaces.
- [x] Confirm the source marker check does not execute painter ordering.
- [x] Change documentation only.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Execute headless ordering fixtures.
- [ ] Execute Canvas2D and CRT browser fixtures.
- [ ] Execute build and Pages parity fixtures.

## Change boundary

```txt
documentation changed: yes
runtime JavaScript changed: no
Canvas2D rendering changed: no
WebGL/CRT rendering changed: no
gameplay changed: no
persistence changed: no
package scripts changed: no
dependencies changed: no
tests changed: no
workflow changed: no
deployment changed: no
branch created: no
pull request created: no
```

## Execution boundary

```txt
npm run check: not run
npm run build: not run
headless render-plan fixture: unavailable
Canvas2D pixel fixture: unavailable
CRT-visible frame fixture: unavailable
built-output fixture: not run
GitHub Pages fixture: not run
```

## Evidence level

The source proves that towers and units are sorted by `x + z` and that projectiles, effects and the sanctum are drawn afterward, with the sanctum last. It does not prove the frequency or severity of visible artifacts in a browser.

No render-order correctness, visual equivalence, visible-frame convergence, build parity, deployment parity or production-readiness claim is made.
