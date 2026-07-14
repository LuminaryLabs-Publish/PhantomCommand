# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Last aligned:** `2026-07-14T13-40-59-04-00`  
**Status:** `campaign-terminal-outcome-conflict-settlement-authority-audited`

## Summary

PhantomCommand is a static pixel-isometric campaign with a procedural Canvas2D menu, fixed-step grave-ring combat, CRT WebGL presentation, browser audio and minimal persistence. The current audit isolates terminal settlement: a sanctum breach can set defeat during unit updates, while the same fixed step can still clear the final wave, set victory, grant rewards, write a victory save and render victory because terminal flags are independent and victory is projected first.

## Plan ledger

**Goal:** make one fixed step produce exactly one immutable campaign outcome before rewards, persistence, presentation or retry adopt it.

- [x] Compare 11 Publish repositories and ten eligible central ledgers.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only PhantomCommand as the oldest eligible synchronized entry.
- [x] Trace final-wave breach, clear, reward, save, terminal frame and retry.
- [x] Preserve all 20 implemented kits and services.
- [x] Define the 22-surface terminal settlement family.
- [x] Add the timestamped audit family and refresh root agent state.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime implementation and executable conflict proof remain future work.

## Read this first

```txt
.agent/trackers/2026-07-14T13-40-59-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-14T13-40-59-04-00.md
.agent/architecture-audit/2026-07-14T13-40-59-04-00-campaign-terminal-outcome-settlement-dsk-map.md
.agent/render-audit/2026-07-14T13-40-59-04-00-terminal-outcome-visible-frame-gap.md
.agent/gameplay-audit/2026-07-14T13-40-59-04-00-final-wave-loss-conflict-loop.md
.agent/interaction-audit/2026-07-14T13-40-59-04-00-terminal-command-settlement-result-map.md
.agent/outcome-audit/2026-07-14T13-40-59-04-00-outcome-reward-save-retry-contract.md
.agent/deploy-audit/2026-07-14T13-40-59-04-00-terminal-conflict-fixture-gate.md
.agent/central-sync-audit/2026-07-14T13-40-59-04-00-repo-ledger-terminal-outcome-reconciliation.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

The browser-startup audit at `2026-07-14T07-58-22-04-00`, settings audit at `2026-07-14T02-58-28-04-00`, durable-save audit at `2026-07-13T21-02-54-04-00`, route-lifecycle audit at `2026-07-13T17-00-59-04-00`, scheduler audit at `2026-07-13T11-41-10-04-00` and earlier retained audits remain active.

## Current mismatch

```txt
final enemy breaches
  -> core reaches zero
  -> lost becomes true
  -> enemy is removed
  -> current fixed step continues
  -> final wave appears empty
  -> won becomes true
  -> reward and victory save can commit
  -> visible overlay prioritizes victory
```

## Required authority

```txt
phantom-command-campaign-terminal-outcome-conflict-settlement-authority-domain
```

Completion requires run and step identity, typed terminal proposals, a versioned precedence policy, exactly-once outcome and reward settlement, save eligibility, immutable GameHost readback, first matching terminal-frame acknowledgement, retry lineage and source/build/Pages conflict fixtures.