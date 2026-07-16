# Deploy Audit — Wheel Zoom Browser Fixture Gate

**Timestamp:** `2026-07-16T10-38-36-04-00`  
**Status:** `wheel-zoom-delta-anchor-convergence-authority-audited`

## Plan ledger

**Goal:** prevent source, built artifact and deployed Pages from diverging on wheel normalization, camera anchoring and visible-frame settlement.

- [x] Identify the current static check/build/Pages surfaces.
- [x] Define required browser evidence.
- [x] Define source/artifact/deployment parity gates.
- [ ] Implement and run the fixtures.

## Current delivery path

```txt
npm run check
  -> menu static checks
  -> campaign static checks

npm run build
  -> copy deployable static files to dist

GitHub Actions
  -> npm ci
  -> npm run build
  -> upload Pages artifact
  -> deploy Pages
```

Current checks prove source markers and buildability only. They do not synthesize wheel events, inspect camera revisions or compare the world point beneath the pointer.

## Required browser fixtures

```txt
pixel-mode mouse wheel
line-mode wheel
page-mode wheel
smooth trackpad burst
momentum tail
center pointer zoom
off-center pointer zoom
min/max clamp
camera-bound constrained anchor
route exit during convergence
WebGL context restoration during/after zoom
```

Each fixture should capture:

```txt
raw delta and deltaMode
normalized delta
target zoom
camera and zoom revisions
pointer source coordinate
stored world anchor
first changed frame revision
anchor error per frame
settlement status
```

## Parity gate

The same fixture matrix must run against:

```txt
source dev server
built dist artifact
published GitHub Pages origin
```

Promotion requires matching normalized command results and bounded coordinate tolerances. Screenshot comparison may supplement but must not replace coordinate/result evidence.

## Failure policy

- Fail on missing result or acknowledgement.
- Fail on non-finite camera/zoom values.
- Fail on unclassified `deltaMode`.
- Fail when a retired route mutates camera state.
- Fail when anchor error exceeds policy without a `constrained` result.
- Fail when source, artifact and Pages differ beyond tolerance.

## Validation boundary

No workflow, check script, browser harness, artifact or deployed-origin test was changed or executed.