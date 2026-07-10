# Deploy Audit — Campaign Fixture Check Build Gate

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Timestamp:** `2026-07-10T06-59-18-04-00`

## Current validation commands

From `package.json`:

```txt
npm run check
npm run build
npm run dev
npm run start
npm run preview
```

`npm run check` currently runs:

```txt
node scripts/check-menu.mjs && node scripts/check-campaign.mjs
```

`npm run build` currently runs:

```txt
node scripts/build-static.mjs
```

## Missing deploy gate

There is no campaign fixture gate yet.

Required next file:

```txt
tests/phantom-command-campaign-fixture.mjs
```

Recommended package script after the fixture exists:

```txt
"fixture:campaign": "node tests/phantom-command-campaign-fixture.mjs"
```

## Required validation after implementation

```txt
node tests/phantom-command-campaign-fixture.mjs
node tests/construct-spiral-intro-kit-smoke.mjs
npm run check
npm run build
```

## This pass validation status

```txt
runtime source changed: no
branch created: no
pull request created: no
npm install: not run
npm run check: not run
npm run build: not run
construct smoke: not run
campaign fixture: not run because it does not exist yet
browser smoke: not run
pushed to main: yes, documentation only
```
