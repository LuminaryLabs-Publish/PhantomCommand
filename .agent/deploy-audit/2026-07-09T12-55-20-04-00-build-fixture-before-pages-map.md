# Deploy Audit: Build Fixture Before Pages Map

**Timestamp:** `2026-07-09T12-55-20-04-00`

## Current deploy/build shape

```txt
package.json
  -> npm run build
  -> node scripts/build-static.mjs

scripts/build-static.mjs
  -> remove dist
  -> mkdir dist
  -> copy index.html
  -> copy game.html
  -> copy docs if present
  -> copy config if present
```

## Current gap

`npm run build` copies static files but does not yet run a DOM-free source-profile fixture first.

## Required build-gate shape

```txt
npm run check
  -> node tests/phantom-command-source-profile-fixture.mjs
  -> node tests/construct-spiral-intro-kit-smoke.mjs

npm run build
  -> npm run check
  -> node scripts/build-static.mjs
```

## Fixture requirements before artifact copy

```txt
profile parity passes
ring descriptors match live route
piece descriptors match live route
ring start times match live route
total build seconds matches live route
GameHost source diagnostics shape is additive
legacy GameHost fields are preserved
central ledger points to latest tracker/audit set
fixture does not import DOM/canvas/Three.js
```

## Deployment rule

Do not treat GitHub Pages output as validated until source-profile fixture rows run before static copy and the central ledger points at the same audit timestamp.
