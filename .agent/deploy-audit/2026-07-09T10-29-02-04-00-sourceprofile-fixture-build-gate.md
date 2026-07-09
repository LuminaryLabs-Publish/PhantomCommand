# Deploy Audit: SourceProfile Fixture Build Gate

**Timestamp:** `2026-07-09T10-29-02-04-00`

## Current deploy/build path

```txt
package.json
  -> npm run build
  -> node scripts/build-static.mjs
  -> remove dist
  -> create dist
  -> copy index.html
  -> copy game.html
  -> copy docs if present
  -> copy config if present
```

## Current gap

`npm run build` does not run a fixture before static artifact copy.

This means a source-profile regression could still ship as long as `index.html` and `game.html` copy successfully.

## Required build gate

```txt
npm run build
  -> node tests/phantom-command-source-profile-fixture.mjs
  -> node scripts/build-static.mjs
  -> copy static artifact only after fixture success
```

## Fixture must prove

```txt
profile parity
ring descriptor parity
piece descriptor parity
timeline parity
source fingerprint stability
source snapshot serialization
GameHost source diagnostics shape
legacy GameHost shape compatibility
central ledger latest-tracker parity
```

## Deploy recommendation

Do not update the Pages workflow first.

Add and pass the DOM-free source-profile fixture locally, then wire that fixture into the build script before static artifact copy.
