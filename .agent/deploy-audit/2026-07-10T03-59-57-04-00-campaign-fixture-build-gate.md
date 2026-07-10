# PhantomCommand Deploy Audit: Campaign Fixture Build Gate

**Timestamp:** `2026-07-10T03-59-57-04-00`

## Current deploy/build surface

```txt
npm run check
  -> node scripts/check-menu.mjs
  -> node scripts/check-campaign.mjs

npm run build
  -> node scripts/build-static.mjs
  -> copies index.html, game.html, src, docs, and config into dist
```

## Missing gate

```txt
node tests/phantom-command-campaign-fixture.mjs
```

The campaign fixture does not exist yet.

## Build gate target

```txt
npm run check
  -> menu check
  -> campaign route check
  -> campaign source fixture

npm run build
  -> run campaign fixture first
  -> copy static artifacts only after fixture passes
```

## Validation not run in this pass

```txt
npm install: not run
npm run check: not run
npm run build: not run
construct smoke: not run
campaign fixture: not run because it does not exist yet
browser smoke: not run
runtime source changed: no
```

## Do not deploy first

Do not change Pages workflow, renderer, camera, or content volume until fixture rows exist.
