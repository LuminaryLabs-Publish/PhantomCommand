# PhantomCommand Deploy Audit: SourceProfile Fixture Build Gate

**Timestamp:** `2026-07-10T00-30-20-04-00`

## Current deploy/build surface

`package.json` exposes:

```txt
npm start -> vite --host 0.0.0.0 --port 4173
npm run dev -> vite --host 0.0.0.0 --port 4173
npm run build -> node scripts/build-static.mjs
npm run preview -> vite preview --host 0.0.0.0 --port 4173
```

`scripts/build-static.mjs` currently copies static paths into `dist`:

```txt
index.html
game.html
docs
config
```

## Build gap

The build step does not run a source-profile fixture before copying static artifacts.

## Required next gate

```txt
node tests/phantom-command-source-profile-fixture.mjs
node tests/construct-spiral-intro-kit-smoke.mjs
npm run build
```

## Gate conditions

```txt
source fixture passes
legacy construct smoke still passes
static copy still succeeds
no visual route rewrite required
central ledger points to latest tracker/audits
```

## Validation this pass

```txt
runtime source changed: no
npm install: not run
npm run build: not run
fixture run: not run because fixture does not exist yet
browser smoke: not run
pushed to main: yes, documentation only
```
