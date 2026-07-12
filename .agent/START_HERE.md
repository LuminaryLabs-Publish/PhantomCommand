# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Last aligned:** `2026-07-12T18-11-53-04-00`  
**Status:** `campaign-action-result-authority-audited`

## Summary

PhantomCommand is a static pixel-isometric campaign game with a procedural graveyard menu, CRT presentation, fixed-step combat, browser persistence and public diagnostics. The current audit isolates Campaign Action Result Authority: campaign helpers either mutate shared state or return silently, so callers cannot identify committed work, rejection reasons, successor revisions or the first visible result frame.

## Plan ledger

**Goal:** require every campaign action to produce one revision-bound terminal result and either commit one atomic state transition or perform zero mutation.

- [x] Compare all ten Publish repositories and nine eligible central ledgers.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm no new, ledger-missing, root-agent-missing or unsynchronized eligible repository takes priority.
- [x] Select only `PhantomCommand` as the oldest eligible synchronized repository.
- [x] Identify the complete interaction loop, all domains, 20 implemented kits and offered services.
- [x] Trace wave, build, selection, order, tower-type, pause, restart, zoom and public-host action paths.
- [x] Define command, revision, admission, commit, rollback, result and visible-frame contracts.
- [x] Add timestamped tracker and architecture/system audits.
- [x] Refresh required root `.agent` state.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime fixes and executable fixtures remain future work.

## Read this first

```txt
.agent/trackers/2026-07-12T18-11-53-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T18-11-53-04-00.md
.agent/architecture-audit/2026-07-12T18-11-53-04-00-campaign-action-result-authority-dsk-map.md
.agent/render-audit/2026-07-12T18-11-53-04-00-action-result-visible-feedback-gap.md
.agent/gameplay-audit/2026-07-12T18-11-53-04-00-silent-action-noop-mutation-loop.md
.agent/interaction-audit/2026-07-12T18-11-53-04-00-action-command-admission-result-map.md
.agent/campaign-action-audit/2026-07-12T18-11-53-04-00-command-revision-commit-result-contract.md
.agent/deploy-audit/2026-07-12T18-11-53-04-00-campaign-action-fixture-gate.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

## Current action loop

```txt
browser or public intent
  -> direct void helper or field mutation
  -> live mutable state inspection
  -> mutation or silent undefined return
  -> fixed-step simulation continues
  -> renderer consumes current state
  -> no terminal result or frame provenance
```

## Main findings

```txt
startWave silently rejects active, terminal or exhausted campaign states
build silently rejects missing pad, occupied pad or insufficient souls
order silently rejects empty selection and skips missing selected IDs
selectAt combines selection and second-click build without a result
number keys and pause mutate fields directly
restart reloads the document
GameHost exposes startWave, build and setZoom as raw mutators
no action ID, source, expected revision, result, journal or visible-frame acknowledgement exists
```

## Required parent domain

```txt
phantom-command-campaign-action-result-authority-domain
```

Required flow:

```txt
intent
  -> action/source/session identity
  -> schema, capability and expected-revision admission
  -> duplicate/stale rejection
  -> detached action plan
  -> atomic commit or zero mutation
  -> terminal CampaignActionResult
  -> feedback/readback projection
  -> first visible campaign-frame acknowledgement
```

## Kit census

```txt
implemented source-backed kits: 20
planned action-result authority kits: 33
```

The complete per-kit service map is in the current tracker and machine registry.

## Validation boundary

```txt
runtime/gameplay/action/render behavior changed: no
package scripts/dependencies/deployment changed: no
npm run check: not run
npm run build: not run
browser/Pages action smoke: not run
action-result fixtures: unavailable
branch created: no
pull request created: no
```

Do not treat a visible HUD change, silent helper return or direct state mutation as action success. Completion requires one terminal result, zero mutation for every rejection and a first-visible-frame acknowledgement.