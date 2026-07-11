# PhantomCommand Validation

**Timestamp:** `2026-07-11T15-08-41-04-00`

## Summary

This pass changed documentation only. Source inspection confirms that Continue is enabled by raw nonempty storage data, no save candidate is parsed or selected, `campaign=continue` is not consumed, and the campaign always constructs its default state. No executable fixture currently proves candidate precedence, startup-mode admission, hydration rollback or first resumed-frame parity.

## Plan ledger

**Goal:** separate verified source facts from the planned Continue authority and its future executable proof.

- [x] Confirm the default branch is `main`.
- [x] Compare all ten accessible Publish repositories.
- [x] Confirm all nine eligible repositories have central and root `.agent` coverage.
- [x] Skip the active same-window `HorrorCorridor` interaction-target documentation sequence.
- [x] Read all three save keys, both storage layers, Continue projection, route transition, campaign startup and victory write source.
- [x] Verify that any nonempty raw string can enable Continue.
- [x] Verify that no candidate parsing, schema validation or deterministic precedence exists.
- [x] Verify that the query mode is ignored by campaign startup.
- [x] Verify that Continue and Begin construct the same default campaign state.
- [x] Define the missing candidate-resolution, startup-admission and fixture boundary.
- [x] Push repo-local documentation and central tracking to `main`.
- [ ] Run behavioral validation after the authority boundary exists.

## Current scripts

```txt
npm run check
  -> node scripts/check-menu.mjs
  -> node scripts/check-campaign.mjs

npm run build
  -> node scripts/build-static.mjs
```

## This pass

```txt
runtime source changed: no
package scripts changed: no
dependencies changed: no
routes changed: no
gameplay changed: no
rendering changed: no
persistence changed: no
deployment workflow changed: no
branch created: no
pull request created: no
npm run check: not run
npm run build: not run
browser smoke: not run
```

## Verified by source inspection

```txt
save key count: 3
storage layer count: 2
possible candidate slots: 6
slot reads independently typed: no
raw payload parsed: no
schema validated: no
content revision validated: no
candidate precedence policy: absent
candidate identity retained: no
malformed nonempty value enables Continue: yes
storage exception classification: absent
Continue routes to campaign=continue: yes
Begin routes to campaign=new: yes
campaign reads location.search: no
campaign reads any save key: no
campaign hydration path: absent
Continue constructs default state: yes
Begin constructs default state: yes
victory writer uses localStorage phantomCommand.save: yes
written payload fields: scene, souls, wave
checkpoint fingerprint: absent
startup result identity: absent
first resumed-frame receipt: absent
```

## Source-backed candidate fixture

The minimal pure resolver matrix should provide:

```txt
slot 1: phantomCommand.save / local / malformed JSON
slot 2: phantomCommand.save / session / valid supported checkpoint
slot 3: nexus.sceneSnapshot / local / unsupported legacy schema
slot 4: nexus.sceneSnapshot / session / empty
slot 5: phantom.command.campaign / local / valid older checkpoint
slot 6: phantom.command.campaign / session / read failure
```

The future resolver must:

```txt
classify every slot independently
reject malformed and unsupported candidates
preserve the read failure as evidence
select the valid supported candidate deterministically
publish the selected slot and candidate fingerprint
```

## Source-backed browser parity fixture

```txt
seed a valid candidate
load index.html
assert Continue enabled and selected candidate ID visible through diagnostics
activate Continue
assert URL mode is continue
assert campaign startup revalidates the same candidate
assert resumed state differs from default Begin state
assert first frame carries the same startup result ID
```

## Existing check limitations

`check-menu.mjs` verifies that menu source contains `BEGIN CAMPAIGN`, the new-campaign URL and `window.PhantomMenu`. It does not seed storage, execute `hasCampaignSave()`, classify payloads or test Continue.

`check-campaign.mjs` verifies source declarations and `window.GameHost`. It does not execute query-mode startup, read storage, hydrate state, compare Begin and Continue or observe a first resumed frame.

## Missing future gates

```txt
npm run fixture:continue-slots
npm run fixture:continue-candidates
npm run fixture:continue-precedence
npm run fixture:continue-storage-failure
npm run fixture:campaign-startup
npm run fixture:campaign-hydration-rollback
npm run smoke:continue-browser
npm run smoke:resume-first-frame
npm run fixture:crt-projection-parity
npm run fixture:phase-admission
npm run fixture:fixed-step-cadence
npm run fixture:command-replay
npm run fixture:terminal-outcome
npm run fixture:lifecycle
npm run fixture:checkpoint
```

## Continue fixture assertions

```txt
raw presence never directly enables Continue
malformed payloads are rejected without throwing
one failed slot does not hide other valid slots
valid lower-priority candidate can beat malformed higher slot
multiple valid candidates resolve deterministically
menu capability includes selected candidate identity and policy version
new mode never hydrates a candidate
continue mode requires the selected candidate
changed candidate fingerprint is rejected at startup
hydration failure leaves default/live state unmodified
resumed state, startup result and first frame share one identity
```

## Current claim boundary

```txt
repo inventory compared: yes
root .agent state confirmed: yes
repo-local documentation pushed to main: yes
central ledger updated on main: yes
central internal change log added on main: yes
runtime Continue implementation: raw Boolean presence only
deterministic candidate resolver: no
campaign continue-mode admission: no
atomic hydration: no
first resumed-frame proof: no
```