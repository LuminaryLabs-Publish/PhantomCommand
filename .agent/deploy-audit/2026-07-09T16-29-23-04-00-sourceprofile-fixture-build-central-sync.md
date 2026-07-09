# PhantomCommand Deploy Audit

**Timestamp:** `2026-07-09T16-29-23-04-00`

## Current deploy/build path

```txt
npm run build
  -> node scripts/build-static.mjs
  -> remove dist
  -> create dist
  -> copy index.html
  -> copy game.html
  -> copy docs if present
  -> copy config if present
```

## Gap

`npm run build` does not run a source-profile fixture before copying static files. That means `dist/game.html` can ship with inline profile drift that no source-owned fixture catches.

## Required next deploy gate

```txt
node tests/phantom-command-source-profile-fixture.mjs
  -> prove live profile values
  -> prove ring descriptors
  -> prove piece count
  -> prove timeline totals
  -> prove additive GameHost diagnostics shape
  -> prove central ledger/latest tracker readback
  -> then run static copy
```

## Validation state

Docs-only pass. No build, fixture, preview, Pages smoke, or browser automation was run.
