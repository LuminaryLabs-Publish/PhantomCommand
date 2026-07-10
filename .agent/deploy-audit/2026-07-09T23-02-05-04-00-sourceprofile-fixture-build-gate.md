# PhantomCommand Deploy Audit: SourceProfile Fixture Build Gate

**Timestamp:** `2026-07-09T23-02-05-04-00`

## Current package surface

```txt
npm start   -> vite --host 0.0.0.0 --port 4173
npm dev     -> vite --host 0.0.0.0 --port 4173
npm build   -> node scripts/build-static.mjs
npm preview -> vite preview --host 0.0.0.0 --port 4173
```

## Current build script

`scripts/build-static.mjs` copies static paths into `dist`:

```txt
index.html
game.html
docs
config
```

It does not run a source-profile fixture first.

## Deploy risk

A static build can succeed while the source profile, live `game.html` inline math, and GameHost diagnostics are out of sync.

## Required next deploy gate

```txt
node tests/phantom-command-source-profile-fixture.mjs
node tests/construct-spiral-intro-kit-smoke.mjs
npm run build
```

`npm run build` should call the source-profile fixture before copying static artifacts once the fixture exists.

## Build fixture expectations

```txt
source profile defaults match game.html
rings match game.html
pieces match game.html
ringStartTimes match game.html
totalBuildSeconds matches game.html
legacy GameHost fields remain compatible
sourceProfile diagnostics are additive
scenario bootstrap remains deferred
```

## Validation in this pass

```txt
runtime source changed: no
package scripts changed: no
npm install: not run
npm run build: not run
fixture: not run because source-profile fixture does not exist yet
browser smoke: not run
branch created: no
pull request created: no
```
