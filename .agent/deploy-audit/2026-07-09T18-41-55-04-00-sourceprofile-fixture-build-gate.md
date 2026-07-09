# PhantomCommand SourceProfile Fixture Build Gate

**Timestamp:** `2026-07-09T18-41-55-04-00`

## Current scripts

```txt
npm run start   -> vite --host 0.0.0.0 --port 4173
npm run dev     -> vite --host 0.0.0.0 --port 4173
npm run build   -> node scripts/build-static.mjs
npm run preview -> vite preview --host 0.0.0.0 --port 4173
```

## Current build behavior

`scripts/build-static.mjs` removes `dist`, recreates it, and copies:

```txt
index.html
game.html
docs
config
```

It does not yet run a source-profile fixture.

## Required next gate

Add a DOM-free fixture before static copy:

```txt
node tests/phantom-command-source-profile-fixture.mjs
node tests/construct-spiral-intro-kit-smoke.mjs
npm run build
```

## Deployment safety rule

Do not wire source-profile diagnostics into `game.html` until the fixture proves:

```txt
source profile matches live constants
ring descriptors match live runtime
piece count is 92
ring part counts match [5,5,5,5,6,8,10,12,16,20]
total build seconds is 19.923
legacy GameHost fields remain present
```

## This pass validation

Docs-only. Runtime source did not change. Build and browser validation were not run.
