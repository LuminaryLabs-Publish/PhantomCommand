# PhantomCommand Validation

**Timestamp:** `2026-07-10T20-19-35-04-00`

## Validation performed in this pass

```txt
- Enumerated the complete ten-repository accessible LuminaryLabs-Publish inventory.
- Excluded LuminaryLabs-Publish/TheCavalryOfRome.
- Confirmed all nine eligible repositories are centrally tracked and have root .agent state.
- Selected PhantomCommand as the oldest eligible documented fallback.
- Read package.json.
- Read src/menu/graveyard-menu.js.
- Read src/menu/crt-renderer.js.
- Read src/campaign/campaign-scene.js.
- Read scripts/check-menu.mjs.
- Read scripts/check-campaign.mjs.
- Read .github/workflows/deploy-pages.yml.
- Read the current root .agent docs, latest architecture audit, and kit registry.
- Verified source canvas 640 x 360, 7 rings, 4 lanes, 58 pads, 6 starter allies, 3 tower types, 7 unit archetypes, 6 waves, and fixed 1/60 simulation.
- Verified selectAt(), build(), order(), and startWave() are direct mutation functions.
- Verified selectAt() combines pad selection and repeated-click build admission.
- Verified build(), order(), and startWave() silently return when preconditions fail.
- Verified campaign actions return no typed success or rejection result.
- Verified pointer, keyboard, and GameHost sources have no shared command envelope.
- Verified gameplay actions are not sequenced or scheduled to deterministic simulation ticks.
- Verified no command, result, event, tick, frame, or fingerprint journal exists.
- Verified render() reads live state, camera, and drag state.
- Verified CRT submission has no source-frame readback.
- Verified GameHost exposes mutable state/camera and aggregate counters only.
- Verified current checks are source-pattern assertions rather than behavioral fixtures.
- Retained the Continue resolver as the implementation queue head.
- Added action-result authority as the next campaign-internal proof slice.
- Updated required root .agent docs.
- Added timestamped architecture, render, gameplay, interaction, command-authority, and deploy audits.
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
- no action-result fixture was run because it does not exist yet.
- no fixed-step command fixture was run because it does not exist yet.
- no frame-consumption fixture was run because it does not exist yet.
- no resume-fidelity fixture was run because it does not exist yet.
- no runtime source file was changed.
```

## Source evidence captured

```txt
campaign action functions:
  selectAt(world, add)
  build()
  order(world)
  startWave()

build rejection conditions:
  no selected pad
  occupied pad
  insufficient souls

order rejection condition:
  no selected units

wave rejection conditions:
  wave already active
  campaign won
  campaign lost
  no wave remaining

action result shape:
  undefined for success and rejection

command sequence:
  none

target simulation tick:
  none

action/result/event journals:
  none

tick ID and frame ID:
  none

state fingerprint:
  none

render source:
  live mutable state and camera

GameHost:
  raw state and camera references
  startWave
  build
  aggregate getState
  setZoom

current checks:
  static source-pattern assertions
```

## Required validation after implementation

```bash
node tests/phantom-command-candidate-resolver-fixture.mjs
node tests/phantom-command-action-result-fixture.mjs
node tests/phantom-command-fixed-step-command-fixture.mjs
node tests/phantom-command-frame-consumption-fixture.mjs
node tests/phantom-command-resume-fidelity-fixture.mjs
npm run check
npm run build
```

## Required behavioral proof

```txt
- one terminal result for every valid command
- stable accepted, rejected, and no-op statuses
- stable rejection reasons
- rejected command leaves canonical state fingerprint unchanged
- same commands and target ticks produce identical results and fingerprints
- world, HUD, minimap, modal, CRT, and GameHost report one committed frame
- menu and campaign consume one Continue resolver result
```

## Current status

```txt
runtime source changed: no
branch created: no
pull request created: no
npm run check: not run
npm run build: not run
browser smoke: not run
candidate resolver fixture: absent / not run
action result fixture: absent / not run
fixed-step frame fixture: absent / not run
resume fidelity fixture: absent / not run
repo-local documentation pushed to main: yes
central ledger updated: yes
central internal change log added: yes
```
