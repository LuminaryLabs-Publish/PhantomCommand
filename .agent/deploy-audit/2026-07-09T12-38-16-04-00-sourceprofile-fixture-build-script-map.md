# PhantomCommand Deploy Audit: SourceProfile Fixture Build Script Map

**Timestamp:** `2026-07-09T12-38-16-04-00`

## Current deploy/build path

```txt
package.json
  -> npm run build
  -> node scripts/build-static.mjs
  -> rm dist
  -> mkdir dist
  -> copy index.html
  -> copy game.html
  -> copy docs if present
  -> copy config if present
```

## Build gap

`npm run build` does not run any source-profile fixture before static artifact copy.

That means a Pages artifact can be created even if:

```txt
source profile parity is missing
ring descriptor parity is missing
piece descriptor parity is missing
timeline parity is missing
GameHost sourceProfile diagnostics are missing
legacy GameHost shape is broken
central ledger latest tracker is stale
scenario bootstrap is unblocked too early
```

## Required fixture-first build path

```txt
npm run build
  -> node tests/phantom-command-source-profile-fixture.mjs
  -> node tests/construct-spiral-intro-kit-smoke.mjs
  -> node scripts/build-static.mjs
  -> copy static artifact
```

## Build integration rule

Do not wire the source-profile fixture into `npm run build` until the fixture file exists and passes standalone.

When wired, it should fail before static copy.

## Pages/deploy guard

The deployment artifact should only be considered current if these docs and central ledger point to the same latest tracker:

```txt
.agent/trackers/2026-07-09T12-38-16-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-09T12-38-16-04-00.md
repo-ledger/LuminaryLabs-Publish/PhantomCommand.md
internal-change-log/2026-07-09T12-38-16-04-00-phantom-command-live-sourceprofile-consumer-sync.md
```

## Deploy finding

The build script is simple and safe. The next deploy-facing work should add a fixture-first gate, not replace Vite, static copy, or the Pages artifact path.
