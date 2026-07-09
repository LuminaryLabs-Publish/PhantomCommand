# Deploy Audit: SourceProfile Fixture Build Gate

**Timestamp:** `2026-07-09T16-25-16-04-00`

## Current build path

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

## Current gap

The build script does not run a source-profile fixture before copying the deploy artifact.

## Required next deploy gate

```txt
node scripts/validate-source-profile.mjs
  -> assert source profile parity
  -> assert ring descriptor parity
  -> assert piece descriptor parity
  -> assert timeline parity
  -> assert legacy GameHost compatibility expectations
  -> then build-static copies files
```

## Validation state

```txt
runtime source changed this pass: no
npm install: not run
npm run build: not run
fixture run: not run because fixture does not exist yet
browser smoke: not run
branch created: no
pull request created: no
pushed to main: yes
```
