# PhantomCommand Deploy Audit — Campaign Fixture Check Build Gate

**Timestamp:** `2026-07-10T08-20-42-04-00`

## Current package scripts

```txt
npm run check -> node scripts/check-menu.mjs && node scripts/check-campaign.mjs
npm run build -> node scripts/build-static.mjs
npm start / npm run dev -> vite --host 0.0.0.0 --port 4173
npm run preview -> vite preview --host 0.0.0.0 --port 4173
```

## Current build script

`scripts/build-static.mjs` copies static paths into `dist/`:

```txt
index.html
game.html
src
docs
config
```

It does not currently run a campaign source/action/render fixture before copying artifacts.

## Deploy gap

The current deploy path can prove static file copy, and `check` can inspect menu/campaign source, but there is no campaign fixture gate for:

```txt
source manifest
ring/lane/pad descriptors
unit/tower/wave descriptors
action accepted/rejected rows
simulation frame rows
render readback rows
GameHost additive diagnostics
legacy compatibility
```

## Next deploy gate

After implementing campaign proof modules, wire validation in this order:

```bash
node tests/phantom-command-campaign-fixture.mjs
node tests/construct-spiral-intro-kit-smoke.mjs
npm run check
npm run build
```

Then make `npm run build` fail before copy if the campaign fixture fails.

## This pass validation

```txt
runtime source changed: no
package scripts changed: no
branch created: no
pull request created: no
npm run check: not run
npm run build: not run
browser smoke: not run
campaign fixture: not run because it does not exist yet
```
