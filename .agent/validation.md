# PhantomCommand Validation

**Timestamp:** `2026-07-15T08-41-37-04-00`  
**Status:** `documentation-only`

## Summary

This run audited repository selection, campaign boot, mutable state and camera ownership, `window.GameHost` publication, fixed-step and render consumption, static checks, package scripts and deployment proof boundaries. It did not modify or execute the product runtime.

## Plan ledger

**Goal:** state exactly what was inspected, changed and not proven.

- [x] Inspect `game.html` campaign presentation.
- [x] Inspect `src/campaign/campaign-scene.js` state, camera, public host, update and render paths.
- [x] Inspect `scripts/check-campaign.mjs` and `package.json` validation surfaces.
- [x] Confirm the static check requires the GameHost marker but not least-authority behavior.
- [x] Change documentation only.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Execute public capability and visible-frame browser fixtures.
- [ ] Execute source, build and Pages parity fixtures.

## Change boundary

```txt
documentation changed: yes
runtime JavaScript changed: no
HTML or CSS changed: no
public API behavior changed: no
input behavior changed: no
gameplay changed: no
Canvas2D rendering changed: no
WebGL CRT rendering changed: no
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
immutable readback fixture: unavailable
allowlisted mutation fixture: unavailable
unsupported command fixture: unavailable
stale revision fixture: unavailable
duplicate command fixture: unavailable
capability retirement fixture: unavailable
Canvas2D and CRT frame convergence fixture: unavailable
built-output fixture: not run
GitHub Pages fixture: not run
```

## Evidence level

The source proves that `window.GameHost` contains direct references to the campaign `state` and `camera` objects and direct `startWave`, `build` and `setZoom` functions. It also proves that fixed-step simulation and rendering consume those same objects and that the static check requires the GameHost marker. It does not prove that an external caller has exploited the surface or that a visible defect occurs in a browser.

No least-authority capability publication, expected-revision admission, exactly-once settlement, lifecycle retirement, visible-frame convergence, artifact parity, Pages parity or production readiness is claimed.