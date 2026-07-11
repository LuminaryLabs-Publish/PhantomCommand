# PhantomCommand Validation

**Timestamp:** `2026-07-10T23-40-35-04-00`

## Validation performed in this pass

```txt
- Enumerated the complete ten-repository accessible LuminaryLabs-Publish inventory.
- Excluded LuminaryLabs-Publish/TheCavalryOfRome.
- Confirmed all nine eligible repositories are centrally tracked and have root .agent state.
- Selected PhantomCommand as the oldest eligible documented repository.
- Read package.json, index.html, game.html, menu, campaign, CRT renderer, and current source checks.
- Read the current central PhantomCommand ledger and root .agent state.
- Reconfirmed the menu and campaign interaction loops, active domains, kits, and services.
- Verified selectAt, build, order, and startWave mutate live state and return no typed result.
- Verified selectAt combines selection and build triggering.
- Verified build, order, and wave-start rejection paths return silently.
- Verified pointer, keyboard, and GameHost sources have no common command adapter.
- Verified no command ID, sequence, target tick, result vocabulary, journals, or fingerprint exists.
- Verified fixed 1/60 simulation exists but commands are not drained at tick boundaries.
- Verified render consumers read live mutable state without a committed frame identity.
- Verified GameHost getState is an aggregate clone rather than exact rendered-frame readback.
- Verified check-menu.mjs and check-campaign.mjs are source-pattern checks rather than behavioral fixtures.
- Added timestamped architecture, render, gameplay, interaction, action-authority, deploy, tracker, and turn-ledger records.
- Refreshed all required root .agent files.
- Updated the central repo ledger and added an internal change-log entry.
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
- no candidate-resolver fixture was run because it does not exist.
- no action-result fixture was run because it does not exist.
- no fixed-step replay fixture was run because it does not exist.
- no committed-frame consumption fixture was run because it does not exist.
- no lifecycle or resource fixture was run because it does not exist.
- no runtime source file was changed.
```

## Source evidence captured

```txt
campaign request entry points:
  selectAt
  build
  order
  startWave
  keyboard direct writes
  pointer direct writes
  GameHost direct calls

current result surface:
  accepted result: none
  rejected result: none
  no-op result: none
  stable reason: none
  command receipt: none

fixed-step surface:
  accumulator: present
  step: 1/60
  command queue: absent
  command sequence: absent
  target tick: absent
  applied tick: absent

proof surface:
  command journal: absent
  result journal: absent
  event journal: absent
  state fingerprint: absent
  committed frame: absent
  render consumption: absent
  replay entry point: absent

render consumers:
  world
  entities
  HUD
  minimap
  modal
  CRT texture upload
  CRT draw
  GameHost aggregate readback
```

## Required validation after implementation

```bash
node tests/phantom-command-candidate-resolver-fixture.mjs
node tests/phantom-command-action-result-fixture.mjs
node tests/phantom-command-fixed-step-replay-fixture.mjs
node tests/phantom-command-frame-consumption-fixture.mjs
node tests/phantom-command-menu-lifecycle-fixture.mjs
node tests/phantom-command-campaign-lifecycle-fixture.mjs
node tests/phantom-command-crt-resource-fixture.mjs
node tests/phantom-command-restart-idempotency-fixture.mjs
node tests/phantom-command-resume-fidelity-fixture.mjs
npm run check
npm run build
```

## Required behavioral proof

```txt
- one result exists for every submitted request
- rejected and no-op commands preserve the canonical fingerprint
- commands drain by target tick then sequence
- the same initial state and command stream produce identical IDs, results, events, and final fingerprint
- browser timing around accumulator boundaries cannot change replay target ticks
- world, HUD, minimap, modal, CRT, and GameHost consume one committed frame identity
- returned journals and frames are clone-safe
- existing routes, visuals, controls, simulation constants, content, and compatibility methods remain usable
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
action-result fixture: absent / not run
fixed-step replay fixture: absent / not run
frame-consumption fixture: absent / not run
lifecycle fixtures: absent / not run
repo-local documentation pushed to main: yes
central ledger updated: yes
central internal change log added: yes
```
