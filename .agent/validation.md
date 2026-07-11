# PhantomCommand Validation

**Timestamp:** `2026-07-11T01-20-51-04-00`

## Validation performed in this pass

```txt
- Enumerated the complete ten-repository accessible LuminaryLabs-Publish inventory.
- Excluded LuminaryLabs-Publish/TheCavalryOfRome.
- Confirmed all nine eligible repositories are centrally tracked and have root .agent state.
- Selected PhantomCommand as the oldest eligible documented repository.
- Read README.md, package.json, menu source, campaign source, menu check, deployment workflow, and prior audits.
- Reconfirmed the complete interaction loop, active domains, implemented kits, and services.
- Verified the menu scans three keys across localStorage and sessionStorage.
- Verified hasCampaignSave() returns only Boolean presence and is called twice during construction.
- Verified candidate parse, classification, precedence, selection, provenance, and decision fingerprint are absent.
- Verified invalid, foreign, unsupported, and completion-summary values can enable Continue.
- Verified campaign-scene.js does not parse campaign=new or campaign=continue.
- Verified both route modes construct the same fresh campaign state.
- Verified phantomCommand.save is written only on victory as { scene, souls, wave }.
- Verified the victory payload is not sufficient for active-session hydration.
- Verified check-menu.mjs is a source-pattern check rather than a candidate-resolution fixture.
- Verified the Pages workflow runs syntax and source checks but no save-admission behavior fixture.
- Added timestamped architecture, render, gameplay, interaction, save-authority, deploy, tracker, and turn-ledger records.
- Refreshed START_HERE.md, current-audit.md, next-steps.md, known-gaps.md, and validation.md.
- Updated the central repo ledger and added the internal change-log entry.
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
- candidate-resolver fixture was not run because it does not exist.
- session-admission fixture was not run because it does not exist.
- action-result, replay, frame, lifecycle, resource, and resume fixtures were not run because they do not exist.
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

physical slots: 6
stable slot registry: absent
candidate parser: absent
candidate classifier: absent
precedence policy: absent
selected candidate: absent
Continue decision reason: absent
Continue decision fingerprint: absent

route output:
  game.html?campaign=new
  game.html?campaign=continue

campaign route parser: absent
fresh/continue behavior difference: none

current save writer:
  trigger: victory only
  key: phantomCommand.save
  payload: { scene, souls, wave }
  classification: legacy-completion-summary
  resumable: no
```

## Required validation after implementation

```bash
node tests/phantom-command-candidate-resolver-fixture.mjs
node tests/phantom-command-session-admission-fixture.mjs
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

## Required candidate-resolution proof

```txt
- every physical slot has a stable identity
- every slot produces one inspection row
- invalid and unsupported candidates never enable Continue
- the victory completion summary never enables active-session resume
- multiple valid candidates produce one deterministic winner
- storage failures are explicit and do not crash startup
- decision results are clone-safe and mutation-proof
- the same slot set produces the same decision fingerprint
- new starts consume no candidate
- accepted Continue consumes exactly the selected candidate
- rejected Continue commits no silent fresh session
- menu, route admission, and campaign startup share decision IDs and fingerprints
```

## Current status

```txt
runtime source changed: no
package scripts changed: no
dependencies changed: no
routes changed: no
gameplay changed: no
rendering changed: no
persistence changed: no
deployment configuration changed: no
branch created: no
pull request created: no
npm run check: not run
npm run build: not run
browser smoke: not run
candidate resolver fixture: absent / not run
session admission fixture: absent / not run
repo-local documentation pushed to main: yes
central ledger updated: yes
central internal change log added: yes
```
