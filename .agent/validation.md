# PhantomCommand Validation

**Timestamp:** `2026-07-10T18-40-13-04-00`

## Validation performed in this pass

```txt
- Enumerated the complete 10-repository accessible LuminaryLabs-Publish inventory.
- Excluded LuminaryLabs-Publish/TheCavalryOfRome.
- Confirmed all nine eligible repositories are centrally tracked and have root .agent state.
- Selected PhantomCommand as the oldest eligible documented fallback.
- Read package.json.
- Read src/menu/graveyard-menu.js.
- Read src/campaign/campaign-scene.js.
- Read the current root .agent docs and kit registry.
- Verified three candidate keys and two storage layers produce six possible slots.
- Verified hasCampaignSave() returns only Boolean presence.
- Verified hasCampaignSave() is invoked twice while constructing the Continue menu item.
- Verified no candidate key, layer, classification, priority, or reason is preserved.
- Verified Continue state is not refreshed after menu construction.
- Verified Begin routes to ./game.html?campaign=new.
- Verified Continue routes to ./game.html?campaign=continue.
- Verified campaign-scene.js parses neither session intent nor candidate storage.
- Verified the campaign always initializes fresh.
- Verified the only save write is victory-only { scene, souls, wave }.
- Verified source canvas 640 x 360, 7 rings, 4 lanes, 58 pads, 6 starter allies, 3 tower types, 7 unit archetypes, 6 waves, and fixed 1/60 simulation.
- Verified GameHost exposes mutable state/camera and aggregate getState output.
- Updated the required root .agent docs.
- Added a timestamped tracker and turn-ledger entry.
- Added architecture, render, gameplay, interaction, persistence, and deploy audits.
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
- no candidate resolver fixture was run because it does not exist yet.
- no resume-fidelity fixture was run because it does not exist yet.
- no runtime source file was changed.
```

## Source evidence captured

```txt
candidate keys:
  phantomCommand.save
  nexus.sceneSnapshot
  phantom.command.campaign

storage layers:
  localStorage
  sessionStorage

candidate slots:
  3 keys x 2 layers = 6

current resolver:
  hasCampaignSave() -> Boolean

menu construction calls:
  Continue.enabled -> hasCampaignSave()
  Continue.note -> hasCampaignSave()

menu refresh after storage mutation:
  none

campaign query parsing:
  none

campaign candidate reads:
  none

campaign save write:
  phantomCommand.save
  { scene: "grave-ring", souls, wave }
```

## Required validation after the next implementation

```bash
node tests/phantom-command-candidate-resolver-fixture.mjs
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
candidate resolver fixture: not run because it does not exist yet
resume fidelity fixture: not run because it does not exist yet
repo-local documentation pushed to main: yes
central ledger updated: yes
central internal change log added: yes
```