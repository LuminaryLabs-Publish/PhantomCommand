# PhantomCommand Validation

**Timestamp:** `2026-07-10T21-49-26-04-00`

## Validation performed in this pass

```txt
- Enumerated the complete ten-repository accessible LuminaryLabs-Publish inventory.
- Excluded LuminaryLabs-Publish/TheCavalryOfRome.
- Confirmed all nine eligible repositories are centrally tracked and have root .agent state.
- Selected PhantomCommand as the oldest eligible documented fallback.
- Read package.json.
- Read index.html.
- Read src/menu/graveyard-menu.js.
- Read src/menu/crt-renderer.js.
- Read src/campaign/campaign-scene.js.
- Read the current central PhantomCommand ledger.
- Read the current root .agent docs and kit registry.
- Reconfirmed the menu and campaign interaction loops, domains, kits, and services.
- Verified both route modules start recursive requestAnimationFrame loops.
- Verified neither route retains a frame request ID or exposes frame cancellation.
- Verified menu and campaign listeners have no coordinated registration/removal ledger.
- Verified most route handlers are anonymous and no route disposal service exists.
- Verified the menu AudioContext is closed only when ambience is explicitly disabled.
- Verified createCrtRenderer allocates shaders, program, buffer, and texture but returns no dispose method.
- Verified campaign restart uses location.reload() and exit uses location navigation.
- Verified PhantomMenu and GameHost expose no lifecycle state, journal, stop, dispose, or restart surface.
- Retained Continue resolution as implementation queue head.
- Retained action-result authority as the second implementation slice.
- Added runtime-session lifecycle authority as the third implementation slice.
- Added timestamped architecture, render, gameplay, interaction, lifecycle, and deploy audits.
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
- no candidate resolver fixture was run because it does not exist yet.
- no action-result fixture was run because it does not exist yet.
- no fixed-step frame fixture was run because it does not exist yet.
- no menu lifecycle fixture was run because it does not exist yet.
- no campaign lifecycle fixture was run because it does not exist yet.
- no listener-ledger fixture was run because it does not exist yet.
- no CRT resource-disposal fixture was run because it does not exist yet.
- no restart-idempotency fixture was run because it does not exist yet.
- no runtime source file was changed.
```

## Source evidence captured

```txt
menu route:
  module-evaluation construction
  recursive RAF without retained ID
  canvas/document/hidden-button listeners
  optional AudioContext graph
  fade then browser navigation

campaign route:
  module-evaluation construction
  recursive RAF without retained ID
  canvas/window listeners
  fixed 1/60 simulation accumulator
  reload restart and navigation exit

CRT renderer allocations:
  vertex shader
  fragment shader
  linked program
  position buffer
  source texture

CRT renderer public surface:
  render
  resize
  screenToSource
  gl
  no dispose

lifecycle surface:
  session ID: none
  lifecycle state: none
  retained RAF ID: none
  listener ledger: none
  startup rollback: none
  stop: none
  dispose: none
  restart transaction: none
  lifecycle journal: none
  resource journal: none
```

## Required validation after implementation

```bash
node tests/phantom-command-candidate-resolver-fixture.mjs
node tests/phantom-command-action-result-fixture.mjs
node tests/phantom-command-fixed-step-command-fixture.mjs
node tests/phantom-command-frame-consumption-fixture.mjs
node tests/phantom-command-menu-lifecycle-fixture.mjs
node tests/phantom-command-campaign-lifecycle-fixture.mjs
node tests/phantom-command-crt-resource-fixture.mjs
node tests/phantom-command-listener-ledger-fixture.mjs
node tests/phantom-command-restart-idempotency-fixture.mjs
node tests/phantom-command-resume-fidelity-fixture.mjs
npm run check
npm run build
```

## Required behavioral proof

```txt
- one active session per route host
- one retained RAF owner per running session
- no frame rescheduling after stop or dispose
- one removal result for every listener registration
- one release result for every owned audio and WebGL resource
- zero remaining owned resources after disposal
- idempotent stop and dispose
- partial-start rollback releases completed allocations
- restart creates exactly one new session and rejects stale callbacks
- menu transition records duplicate rejection and teardown status
- existing routes, visuals, controls, simulation constants, and legacy host fields remain compatible
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
lifecycle fixtures: absent / not run
resource disposal fixture: absent / not run
restart idempotency fixture: absent / not run
repo-local documentation pushed to main: yes
central ledger updated: yes
central internal change log added: yes
```