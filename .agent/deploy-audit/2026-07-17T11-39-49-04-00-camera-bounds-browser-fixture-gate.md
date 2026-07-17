# Deploy Audit — Camera Bounds Browser Fixture Gate

**Timestamp:** `2026-07-17T11-39-49-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`

## Summary

The current static checks confirm source markers but do not execute camera movement, isometric footprint calculations, boundary settlement or rendered-frame convergence. The static build copies source files into `dist`, and Pages deploys that artifact without camera-specific behavioral proof.

## Current validation surface

```txt
npm run check
  -> menu source-marker assertions
  -> campaign source-marker assertions

npm run build
  -> copy index.html, game.html, src, docs and config into dist

Pages
  -> install
  -> build
  -> upload dist
  -> deploy
```

## Missing camera-boundary proof

```txt
arena radius fixture: absent
square-corner rejection/settlement fixture: absent
zoom-aware footprint fixture: absent
keyboard edge fixture: absent
middle-pan edge fixture: absent
wheel-anchor boundary fixture: absent
focus boundary fixture: absent
public-host mutation fixture: absent
CameraCoverageResult assertion: absent
FirstCameraBoundsFrameAck assertion: absent
built artifact parity: absent
Pages-origin parity: absent
```

## Required source fixture matrix

- Load `game.html` in a real browser.
- Capture the accepted arena, viewport, projection and zoom revisions.
- Drive keyboard pan to every cardinal and diagonal boundary.
- Drive middle-pan beyond every boundary.
- Wheel-zoom at source center and all four corners.
- Focus the sanctum and units near each ring edge.
- Attempt an out-of-envelope public host camera mutation.
- Assert deterministic `CameraCoverageResult` values.
- Assert the first matching frame digest and acknowledgement.

## Artifact and Pages parity

The same fixture should run against:

```txt
source dev origin
built dist origin
GitHub Pages origin
```

The camera result and rendered-frame digest should match within explicitly declared pixel or floating-point tolerances.

## Gate recommendation

Do not claim camera-boundary correctness until all three origins prove:

```txt
one accepted camera generation
one deterministic boundary result
one matching rendered frame
no stale camera settlement
no producer-specific bypass
```

## Boundary

No tests, build scripts, workflows or deployment configuration changed. No fixture was executed.