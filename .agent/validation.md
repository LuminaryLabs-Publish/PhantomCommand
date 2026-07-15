# PhantomCommand Validation

**Timestamp:** `2026-07-15T18-39-30-04-00`  
**Status:** `documentation-only`

## Summary

This run audited repository selection, campaign cursor policy, pointer projection, selection/build/order targeting, Canvas2D feedback, CRT presentation, static checks and deployment proof boundaries. It did not modify or execute the product runtime.

## Plan ledger

**Goal:** state exactly what was inspected, changed and not proven.

- [x] Inspect `game.html` canvas and cursor policy.
- [x] Inspect `src/campaign/campaign-scene.js` pointer, camera, selection, build, order and render paths.
- [x] Inspect `src/menu/crt-renderer.js` screen/source presentation boundaries.
- [x] Inspect `scripts/check-campaign.mjs` and `package.json` validation surfaces.
- [x] Confirm no normal replacement cursor, hover target or candidate preview is rendered.
- [x] Change documentation only.
- [ ] Execute pointer-presence, hover, candidate continuity, contrast and lifecycle browser fixtures.
- [ ] Execute source, build and Pages parity fixtures.

## Change boundary

```txt
documentation changed: yes
runtime JavaScript changed: no
HTML or CSS changed: no
pointer behavior changed: no
camera behavior changed: no
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
pointer-presence fixture: unavailable
native-versus-rendered cursor fixture: unavailable
ally-hover fixture: unavailable
build-pad hover fixture: unavailable
enemy-order preview fixture: unavailable
ground-anchor preview fixture: unavailable
drag candidate fixture: unavailable
camera anchor fixture: unavailable
overlay and lifecycle fixture: unavailable
contrast screenshot fixture: unavailable
candidate-to-command revision trace: unavailable
built-output fixture: not run
GitHub Pages fixture: not run
```

## Evidence level

The source proves that the campaign canvas uses `cursor:none`, that pointer samples are converted to source coordinates, that ordinary rendering does not draw a pointer reticle or hover candidate, that only an active drag draws a rectangle, and that selection/build/order candidates are resolved during command events. It does not prove a measured misclick rate, inaccessible campaign, contrast failure or browser-specific defect.

No pointer-feedback correctness, target-preview correctness, candidate-to-command continuity, lifecycle settlement, visual contrast, artifact parity, Pages parity or production readiness is claimed.