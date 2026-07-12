# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Last aligned:** `2026-07-11T21-31-19-04-00`

## Summary

PhantomCommand currently exposes a false Continue capability. The menu marks Continue as available when any truthy value exists under three possible keys in either browser storage scope, then routes to `game.html?campaign=continue`. The campaign ignores that route intent, reads no save candidate, and constructs the same fresh default state as a new campaign. The only save currently written is a partial victory summary that cannot reconstruct a run.

## Plan ledger

**Goal:** make Continue mean one validated, versioned and semantically resumable checkpoint, then prove that the first visible campaign frame consumed that exact checkpoint.

- [x] Compare the complete Publish organization list with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have ledger and root `.agent` coverage.
- [x] Select only `PhantomCommand` as the oldest eligible repository.
- [x] Trace menu save discovery, route selection, campaign startup and victory persistence.
- [x] Identify the interaction loop, domains, implemented kits and offered services.
- [x] Add the Continue/checkpoint authority audit set.
- [x] Preserve lifecycle, command, combat and terminal audit dependencies.
- [ ] Implement and fixture-gate checkpoint admission and resume.

## Current implementation queue

```txt
1. Continue Capability and Checkpoint Admission Authority
   + Save Candidate Precedence, Legacy Summary and First Resumed Frame Fixtures

2. Campaign Action Result Authority
   2a. CRT Display/Input Projection Authority
   2b. Campaign Phase Admission Authority
   2c. Fixed-Step Command Scheduling, Replay and Committed Frame Authority
   2d. Combat Resolution and Entity Liveness Authority
   2e. Exclusive Terminal Outcome Transaction

3. Runtime Session Lifecycle Authority
   + Menu/Campaign Teardown, bfcache and Restart Leak Fixtures

4. Versioned Campaign Checkpoint Capture Authority
   + Stable Boundary Capture, Atomic Resume and Migration Fixtures
```

## Current interaction loop

```txt
menu startup
  -> define three accepted save keys
  -> read localStorage and sessionStorage
  -> treat any truthy value as a campaign save
  -> enable CONTINUE and display BOUND

Begin Campaign
  -> navigate to game.html?campaign=new

Continue
  -> navigate to game.html?campaign=continue

campaign startup
  -> does not parse the campaign query
  -> does not read any save candidate
  -> creates the same default camera, IDs, units and mutable state
  -> starts the same fixed-step and render loop

campaign completion
  -> writes one partial localStorage summary
  -> { scene, souls, wave }

reload or return to menu
  -> no checkpoint admission, hydration result or resumed-frame receipt
```

## Latest finding

```txt
truthy storage value
  -> CONTINUE becomes BOUND
  -> campaign=continue is emitted
  -> campaign ignores route and storage
  -> default state starts
```

The three accepted menu keys have no selected-candidate result, precedence policy, schema validation, game/content identity, migration, semantic validation or quarantine. `phantomCommand.save` is written only at victory and contains only `scene`, `souls` and `wave`, so it is a terminal summary rather than a resumable checkpoint.

## Latest composed domain

```txt
phantom-command-continue-checkpoint-admission-authority-domain
  -> route intent
  -> candidate discovery and classification
  -> version and content identity
  -> precedence and migration
  -> structural and semantic validation
  -> Continue capability result
  -> new or resume admission
  -> atomic hydration
  -> resume result
  -> first resumed-frame proof
  -> observation, journal and fixtures
```

## Read first

```txt
.agent/trackers/2026-07-11T21-31-19-04-00/project-breakdown.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/turn-ledger/2026-07-11T21-31-19-04-00.md
.agent/architecture-audit/2026-07-11T21-31-19-04-00-continue-checkpoint-admission-dsk-map.md
.agent/render-audit/2026-07-11T21-31-19-04-00-continue-first-frame-provenance-gap.md
.agent/gameplay-audit/2026-07-11T21-31-19-04-00-false-continue-fresh-campaign-loop.md
.agent/interaction-audit/2026-07-11T21-31-19-04-00-save-presence-route-resume-admission-map.md
.agent/checkpoint-audit/2026-07-11T21-31-19-04-00-versioned-candidate-precedence-hydration-contract.md
.agent/deploy-audit/2026-07-11T21-31-19-04-00-continue-checkpoint-fixture-gate.md
```

## Guardrails

```txt
Push only to main.
Create no branches or pull requests.
Do not work on TheCavalryOfRome.
Do not treat storage presence as a Continue capability.
Do not overwrite rejected save bytes.
Do not claim resume correctness until candidate, hydration and first-frame fixtures pass.
```
