# Oldest Selection Render Order Reconciliation

**Timestamp:** `2026-07-14T23-38-29-04-00`

## Summary

PhantomCommand was selected only after the full Publish organization and central ledger were compared and no higher-priority repository was found. This file stages the repo-local facts that must be mirrored in `LuminaryLabs-Dev/LuminaryLabs`.

## Plan ledger

**Goal:** keep the central repository ledger aligned with the selected repo, audit timestamp, complete inventory, main finding and validation boundary.

- [x] Record the organization census.
- [x] Record the exclusion and selection reason.
- [x] Record the previous and new repo-local audit states.
- [x] Record the complete implemented kit census.
- [x] Record the source-backed render-order finding.
- [x] Record required authority and proof boundary.
- [ ] Mirror this state into the central ledger and change log.

## Selection record

```txt
Publish repositories:             11
eligible non-Cavalry repos:       10
central ledgers:                  10
root .agent states:               10
new/missing/undocumented:          0
runtime-ahead:                     0
selected: PhantomCommand
prior central timestamp: 2026-07-14T18-41-11-04-00
new audit timestamp:     2026-07-14T23-38-29-04-00
```

## Central facts

```txt
implemented kits: 20
planned authority surfaces: 17
parent authority:
  phantom-command-isometric-render-order-frame-authority-domain

main finding:
  towers and units are sorted by x + z, but projectiles,
  effects and the depth-zero sanctum bypass the shared order;
  the sanctum is always drawn last.
```

## Files to mirror

```txt
repo-ledger/LuminaryLabs-Publish/PhantomCommand.md
internal-change-log/2026-07-14T23-38-29-04-00-phantom-command-isometric-render-order.md
```

## Validation boundary

Documentation only. No product runtime, renderer, test, build, workflow or deployment behavior changed.
