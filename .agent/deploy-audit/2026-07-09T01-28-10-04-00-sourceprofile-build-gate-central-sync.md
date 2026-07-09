# PhantomCommand Deploy Audit: SourceProfile Build Gate Central Sync

**Timestamp:** `2026-07-09T01-28-10-04-00`

## Current deploy read

`package.json` declares:

```txt
npm run build -> node scripts/build-static.mjs
npm run start -> vite --host 0.0.0.0 --port 4173
npm run dev -> vite --host 0.0.0.0 --port 4173
npm run preview -> vite preview --host 0.0.0.0 --port 4173
```

The current build path copies static files. It does not yet run a sourceProfile fixture.

## Required build-gate path

```txt
node tests/phantom-command-source-profile-fixture.mjs
  -> node tests/construct-spiral-intro-kit-smoke.mjs
  -> node scripts/build-static.mjs
  -> Pages artifact upload
```

## Gate acceptance

```txt
source profile values match game.html
ring descriptors match game.html
piece descriptors count 92
total build seconds equals 19.923
GameHost source diagnostics shape is additive
legacy GameHost fields remain unchanged
central ledger latest tracker matches repo-local kit registry
scenario bootstrap remains blocked
```

## Validation not run

This was a docs-only pass. No `npm install`, fixture run, build, browser smoke, or Pages smoke was performed.
