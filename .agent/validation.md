# PhantomCommand Validation

**Timestamp:** `2026-07-15T13-41-25-04-00`  
**Status:** `documentation-only`

## Summary

This run audited repository selection, menu audio creation, context reuse, persistent and transient sources, ambience shutdown, route navigation, package scripts and deployment proof boundaries. It did not modify or execute the product runtime.

## Plan ledger

**Goal:** state exactly what was inspected, changed and not proven.

- [x] Inspect `src/menu/graveyard-menu.js` audio, settings, input and route paths.
- [x] Inspect `src/campaign/campaign-scene.js` and confirm the campaign creates no audio graph.
- [x] Inspect `package.json` validation surfaces.
- [x] Confirm no explicit visibility, pagehide or route audio settlement exists.
- [x] Change documentation only.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Execute audio unlock, lifecycle and retirement browser fixtures.
- [ ] Execute source, build and Pages parity fixtures.

## Change boundary

```txt
documentation changed: yes
runtime JavaScript changed: no
HTML or CSS changed: no
audio behavior changed: no
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
browser capability fixture: unavailable
accepted unlock fixture: unavailable
suspended-context resume fixture: unavailable
ambience preference fixture: unavailable
visibility settlement fixture: unavailable
route settlement fixture: unavailable
pagehide retirement fixture: unavailable
stale callback fixture: unavailable
audio resource trace: unavailable
built-output fixture: not run
GitHub Pages fixture: not run
```

## Evidence level

The source proves that accepted menu input calls `ensureAudio()`, that the helper creates and starts a persistent drone and looping wind source, that an existing `state.audio` causes an immediate return, that settings-triggered shutdown fades the master and schedules `context.close()`, and that route navigation does not explicitly call that shutdown path. It does not prove an audible failure, leak, overlap or browser-policy defect.

No audio unlock correctness, suspended-context recovery, lifecycle settlement, exact retirement, audible/silent convergence, artifact parity, Pages parity or production readiness is claimed.