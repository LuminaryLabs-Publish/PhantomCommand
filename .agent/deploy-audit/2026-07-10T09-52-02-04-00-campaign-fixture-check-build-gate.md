# Deploy Audit: Campaign Fixture Check Build Gate

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Timestamp:** `2026-07-10T09-52-02-04-00`

## Current deploy posture

This pass changed documentation only. Runtime source, package scripts, and deployment configuration were not changed.

## Existing validation surface

```txt
npm run check
npm run build
node tests/construct-spiral-intro-kit-smoke.mjs
```

## Missing gate

```txt
node tests/phantom-command-campaign-fixture.mjs
```

The campaign fixture does not exist yet.

## Required gate rows

```txt
[ ] source route row: game.html
[ ] source module row: src/campaign/campaign-scene.js
[ ] source size row: 640 x 360
[ ] ring count row: 7
[ ] lane count row: 4
[ ] generated pad count row
[ ] starter ally count row: 6
[ ] tower catalog row: spire, lantern, ward
[ ] archetype catalog row: guard, archer, runner, shield, zealot, brute, wraith
[ ] wave script count row: 6
[ ] select action result rows
[ ] build accepted/rejected rows
[ ] order accepted/ignored rows
[ ] start-wave accepted/rejected rows
[ ] simulation frame summary rows
[ ] render readback rows
[ ] GameHost legacy compatibility rows
[ ] additive GameHost campaign diagnostics rows
```

## Recommended build order

```txt
1. Add fixture source helpers.
2. Run the fixture directly with node.
3. Keep construct-spiral smoke passing.
4. Add campaign fixture to npm run check or npm run build after stable.
5. Run npm run check.
6. Run npm run build.
7. Push only to main.
```

## This pass validation

```txt
runtime source changed: no
branch created: no
pull request created: no
npm run check: not run
npm run build: not run
construct smoke: not run
campaign fixture: not run because proof files do not exist yet
browser smoke: not run
```
