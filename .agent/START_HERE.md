# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Last aligned:** `2026-07-12T22-05-12-04-00`  
**Status:** `campaign-bootstrap-resume-authority-audited`

## Summary

PhantomCommand is a static pixel-isometric campaign game with procedural menu art, CRT presentation, fixed-step combat, browser persistence and public diagnostics. The current audit isolates Campaign Bootstrap and Continue Resume Authority: Continue is enabled from raw storage presence and routes to `game.html?campaign=continue`, but campaign boot ignores both the route intent and all save keys, always constructing the same fresh state.

## Plan ledger

**Goal:** make New and Continue explicit, revisioned bootstrap transactions that install one validated campaign generation atomically or return a typed zero-mutation failure before gameplay starts.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only `PhantomCommand`, the oldest eligible central entry.
- [x] Inspect menu save presence, route intent, campaign construction, victory save, reload, rendering and checks.
- [x] Identify the complete interaction loop, all domains, 20 implemented kits and offered services.
- [x] Add the timestamped bootstrap/resume audit family.
- [x] Preserve the concurrent keyboard-admission audit as an immediate predecessor.
- [x] Refresh required root `.agent` state and machine registry.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime bootstrap, checkpoint and executable resume fixtures remain future work.

## Read this first

```txt
.agent/trackers/2026-07-12T22-05-12-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T22-05-12-04-00.md
.agent/architecture-audit/2026-07-12T22-05-12-04-00-campaign-bootstrap-resume-authority-dsk-map.md
.agent/render-audit/2026-07-12T22-05-12-04-00-continue-visible-frame-provenance-gap.md
.agent/gameplay-audit/2026-07-12T22-05-12-04-00-continue-starts-fresh-campaign-loop.md
.agent/interaction-audit/2026-07-12T22-05-12-04-00-new-continue-bootstrap-admission-map.md
.agent/campaign-resume-audit/2026-07-12T22-05-12-04-00-checkpoint-schema-hydration-commit-contract.md
.agent/deploy-audit/2026-07-12T22-05-12-04-00-campaign-resume-fixture-gate.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

The Campaign Keyboard Command Admission audit at `2026-07-12T22-00-46-04-00` remains the immediate input/lifecycle predecessor. Campaign Action Result, Spatial Input Admission and Runtime Session Resource Lifecycle remain downstream or upstream dependencies.

## Current bootstrap loop

```txt
menu boot
  -> scan three storage keys
  -> any truthy string enables Continue

New
  -> game.html?campaign=new

Continue
  -> game.html?campaign=continue

campaign boot
  -> parse no route intent
  -> read no save key
  -> create wave 0, souls 145, core 24 and six starting allies
  -> attach listeners, expose GameHost and start RAF

final victory
  -> write only { scene, souls, wave }
  -> record is not a resumable checkpoint
```

## Main findings

```txt
Continue availability validates storage contents: no
campaign parses campaign=new/continue: no
campaign reads persisted checkpoint: no
New and Continue have different runtime behavior: no
checkpoint schema/version/checksum: no
complete participant capture/hydration: no
migration registry: no
atomic bootstrap commit/rollback: no
run/checkpoint generation: no
first visible bootstrap-frame acknowledgement: no
```

## Required parent domain

```txt
phantom-command-campaign-bootstrap-resume-authority-domain
```

## Required flow

```txt
CampaignEntryIntent(new | continue)
  -> route/session/command admission
  -> fresh preset construction or typed checkpoint read
  -> schema, version, checksum and source compatibility validation
  -> migration when explicitly supported
  -> detached participant hydration
  -> cross-participant invariant validation
  -> atomic successor-generation commit or verified rollback
  -> terminal CampaignBootstrapResult
  -> first visible world/HUD/minimap/CRT frame acknowledgement
```

## Kit census

```txt
implemented source-backed kits: 20
planned bootstrap/resume authority kits: 37
retained keyboard-admission authority kits: 28
```

The complete kit-by-kit service inventory is in the current tracker and `.agent/kit-registry.json`.

## Validation boundary

```txt
runtime/menu/campaign/storage/render behavior changed: no
package scripts/dependencies/deployment changed: no
npm run check: not run
npm run build: not run
browser/Pages resume smoke: not run
resume fixtures: unavailable
branch created: no
pull request created: no
```

Do not treat an enabled Continue label, successful navigation or a rendered campaign as resume proof. Completion requires a validated compatible checkpoint, one committed run generation, typed failure behavior and a first visible frame citing the bootstrap result.