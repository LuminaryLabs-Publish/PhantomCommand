# PhantomCommand Validation

**Timestamp:** `2026-07-10T15-38-40-04-00`

## Validation performed in this pass

```txt
- Enumerated all 10 accessible LuminaryLabs-Publish repositories.
- Compared all nine eligible non-Cavalry repositories against central repo-ledger files.
- Verified root .agent/START_HERE.md exists in all nine eligible repositories.
- Excluded LuminaryLabs-Publish/TheCavalryOfRome.
- Selected PhantomCommand as the oldest eligible documented fallback.
- Read README.md.
- Read package.json.
- Read game.html.
- Read src/menu/graveyard-menu.js.
- Read src/campaign/campaign-scene.js.
- Read scripts/check-campaign.mjs.
- Read the current root .agent docs and kit registry.
- Verified menu Begin target is game.html?campaign=new.
- Verified menu Continue target is game.html?campaign=continue.
- Verified campaign-scene.js does not parse the session query parameter.
- Verified campaign-scene.js does not hydrate a save.
- Verified the campaign writes only a minimal victory payload.
- Verified the 640 x 360 source canvas.
- Verified 7 rings and 4 lanes.
- Recomputed deterministic generated build-pad count as 58.
- Verified 6 starter allies.
- Verified 3 tower types, 7 unit archetypes, and 6 waves.
- Verified fixed-step 1/60 simulation through an accumulator.
- Verified direct mutable GameHost state exposure and aggregate getState output.
- Updated required root .agent docs.
- Added timestamped tracker and turn-ledger entries.
- Added architecture, render, gameplay, interaction, session-authority, and deploy audits.
- Pushed only to main.
- Created no branch or pull request.
```

## Runtime validation not performed

```txt
- npm install was not run.
- npm run check was not run.
- npm run build was not run.
- npm start was not run.
- Browser smoke was not run.
- GitHub Pages deployment was not checked.
- No Playwright or DOM automation was run.
- No session fixture was run because it does not exist yet.
- No campaign behavioral fixture was run because it does not exist yet.
- No runtime source file was changed.
```

## Environment limitation

A local validation clone was attempted through the execution container, but DNS resolution for `github.com` was unavailable. Repository inspection and all writes therefore used the authenticated GitHub connector.

## Source evidence captured

```txt
menu save keys:
  phantomCommand.save
  nexus.sceneSnapshot
  phantom.command.campaign

menu routes:
  Begin -> ./game.html?campaign=new
  Continue -> ./game.html?campaign=continue

campaign save read:
  none

campaign save write:
  phantomCommand.save
  { scene: "grave-ring", souls, wave }

campaign constants:
  source canvas 640 x 360
  7 rings
  4 lanes
  58 generated pads
  6 starter allies
  3 tower types
  7 unit archetypes
  6 waves
  fixed 1/60 simulation
```

## Required validation after the next implementation

```bash
node tests/phantom-command-session-fixture.mjs
node tests/phantom-command-campaign-fixture.mjs
node tests/construct-spiral-intro-kit-smoke.mjs
npm run check
npm run build
```

## Current status

```txt
runtime source changed: no
branch created: no
pull request created: no
npm run check: not run
npm run build: not run
browser smoke: not run
session fixture: not run because it does not exist yet
local clone validation: blocked by container DNS
pushed to main: yes
central ledger update: pending until repo-local write set completes
```
