# Deploy Audit: SourceProfile Fixture Build Validation Gate

**Timestamp:** `2026-07-09T04-24-06-04-00`

## Summary

Deployment should remain static and Pages-compatible.

The next build change should add a sourceProfile fixture gate only after the fixture exists and passes standalone.

## Current scripts

```txt
npm run start   -> vite --host 0.0.0.0 --port 4173
npm run dev     -> vite --host 0.0.0.0 --port 4173
npm run build   -> node scripts/build-static.mjs
npm run preview -> vite preview --host 0.0.0.0 --port 4173
```

## Current deploy behavior

```txt
GitHub Pages workflow runs npm ci and npm run build.
The static build copies deployable files to dist.
No sourceProfile fixture is currently part of the build gate.
```

## Build gate to add next

```txt
node tests/phantom-command-source-profile-fixture.mjs
node tests/construct-spiral-intro-kit-smoke.mjs
node scripts/build-static.mjs
```

## Fixture build requirements

```txt
runs without DOM
runs without canvas
runs without Three.js
runs without browser timing
fails on sourceProfile parity errors
fails on legacy GameHost shape mismatch
fails if central ledger pointer is stale
keeps static artifact behavior unchanged
```

## Files to edit later

```txt
package.json
scripts/build-static.mjs or a small prebuild script wrapper
tests/phantom-command-source-profile-fixture.mjs
.github/workflows/deploy-pages.yml only if the build command needs explicit fixture reporting
```

## Do not do in sourceProfile cutover

```txt
Do not change deploy branch.
Do not create a new branch.
Do not change GitHub Pages route.
Do not introduce a server requirement.
Do not add Playwright as a required deploy dependency.
Do not block deploy on browser automation yet.
```

## Validation needed after implementation

```txt
npm install
node tests/phantom-command-source-profile-fixture.mjs
node tests/construct-spiral-intro-kit-smoke.mjs
npm run build
manual browser smoke for index.html -> game.html
post-deploy Pages check
```
