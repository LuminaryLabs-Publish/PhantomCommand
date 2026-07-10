# PhantomCommand Validation

**Timestamp:** `2026-07-10T17-08-36-04-00`

## Validation performed in this pass

```txt
- Enumerated the full 10-repository accessible LuminaryLabs-Publish inventory.
- Compared all nine eligible non-Cavalry repositories against central ledger files and root .agent state.
- Excluded LuminaryLabs-Publish/TheCavalryOfRome.
- Accounted for the newer HorrorCorridor repo-local audit that had not yet reached its central ledger.
- Selected PhantomCommand as the oldest eligible documented fallback.
- Read package.json.
- Read src/menu/graveyard-menu.js.
- Read src/campaign/campaign-scene.js.
- Read the current root .agent docs and kit registry.
- Verified the menu searches phantomCommand.save, nexus.sceneSnapshot, and phantom.command.campaign.
- Verified the menu searches both localStorage and sessionStorage.
- Verified any non-empty candidate enables Continue without parsing or schema validation.
- Verified Begin routes to game.html?campaign=new.
- Verified Continue routes to game.html?campaign=continue.
- Verified campaign-scene.js does not parse the session query parameter.
- Verified campaign-scene.js does not read or hydrate any candidate key.
- Verified the only campaign save write is a victory summary under phantomCommand.save.
- Verified the payload contains only scene, souls, and wave.
- Verified the 640 x 360 source canvas.
- Verified 7 rings and 4 lanes.
- Retained the prior source-backed generated build-pad count of 58.
- Verified 6 starter allies.
- Verified 3 tower types, 7 unit archetypes, and 6 waves.
- Verified fixed-step 1/60 simulation through an accumulator.
- Verified direct mutable GameHost state and camera exposure plus aggregate getState output.
- Updated required root .agent docs.
- Added a timestamped tracker and turn-ledger entry.
- Added architecture, render, gameplay, interaction, session-authority, persistence, and deploy audits.
- Updated the central repo ledger.
- Added the central internal change-log entry.
- Pushed only to main.
- Created no branch or pull request.
```

## Runtime validation not performed

```txt
- npm install was not run.
- npm run check was not run.
- npm run build was not run.
- npm start was not run.
- browser smoke was not run.
- GitHub Pages deployment was not checked.
- no Playwright or DOM automation was run.
- no save-admission fixture was run because it does not exist yet.
- no resume-fidelity fixture was run because it does not exist yet.
- no runtime source file was changed.
```

## Source evidence captured

```txt
candidate keys:
  phantomCommand.save
  nexus.sceneSnapshot
  phantom.command.campaign

candidate storage layers:
  localStorage
  sessionStorage

current Continue admission:
  Boolean(raw value) for any key in either storage layer

menu routes:
  Begin -> ./game.html?campaign=new
  Continue -> ./game.html?campaign=continue

campaign candidate reads:
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
node tests/phantom-command-save-admission-fixture.mjs
node tests/phantom-command-resume-fidelity-fixture.mjs
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
save admission fixture: not run because it does not exist yet
resume fidelity fixture: not run because it does not exist yet
repo-local documentation pushed to main: yes
central ledger updated: yes
central internal change log added: yes
```
