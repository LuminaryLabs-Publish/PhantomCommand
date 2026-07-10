# PhantomCommand Deploy Audit: SourceProfile Fixture Build Ledger Gate

**Timestamp:** `2026-07-10T02-02-24-04-00`

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

## Current deploy gap

The build path does not run a source-profile fixture before copying static artifacts.

A stale or divergent `game.html` profile could still be copied to `dist` because there is no pre-copy proof for:

```txt
smooth-ring-handoff-v6 build id
10-ring count
zero-gap policy
[5,5,5,5,6,8,10,12,16,20] ring parts
92 total pieces
19.923 total build seconds
legacy GameHost compatibility
additive GameHost sourceProfile diagnostics
central ledger pointer freshness
```

## Required next deploy gate

```txt
npm run build
  -> node tests/phantom-command-source-profile-fixture.mjs
  -> node scripts/build-static.mjs
```

Do not replace the current static copy script with a new deploy system. Add the fixture as a small pre-copy gate.

## Validation not run in this pass

```txt
npm install: not run
npm run build: not run
node tests/construct-spiral-intro-kit-smoke.mjs: not run
node tests/phantom-command-source-profile-fixture.mjs: not run because it does not exist yet
browser smoke: not run
Pages smoke: not run
```

## Deployment recommendation

The next implementation should fail fast if source-profile proof is missing or stale. Static artifact copying should happen only after the source-profile fixture passes.
