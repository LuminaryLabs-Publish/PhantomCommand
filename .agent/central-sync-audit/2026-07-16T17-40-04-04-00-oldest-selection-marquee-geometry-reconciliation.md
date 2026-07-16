# Central Sync Audit — Oldest Selection Marquee Geometry Reconciliation

**Timestamp:** `2026-07-16T17-40-04-04-00`  
**Status:** `isometric-marquee-selection-geometry-authority-audited`

## Summary

The full Publish comparison found no new, ledger-missing, root-agent-missing, undocumented or runtime-ahead eligible repository. PhantomCommand was selected as the only project because it held the oldest synchronized central timestamp.

## Plan ledger

**Goal:** bind this repo-local marquee-selection audit to the central repository ledger without changing runtime code.

- [x] Compare 11 accessible Publish repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible central ledgers and root `.agent` states.
- [x] Confirm current heads match documented heads.
- [x] Select only PhantomCommand.
- [x] Add the timestamped repo-local audit family.
- [x] Prepare central ledger and internal change-log reconciliation.
- [ ] Implement or execute runtime fixtures.

## Selection order

```txt
PhantomCommand    2026-07-16T10-38-36-04-00
AetherVale        2026-07-16T11-41-17-04-00
MyCozyIsland      2026-07-16T13-01-43-04-00
TheLongHaul       2026-07-16T14-01-02-04-00
PrehistoricRush   2026-07-16T14-39-29-04-00
TheOpenAbove      2026-07-16T14-59-39-04-00
IntoTheMeadow     2026-07-16T15-38-27-04-00
HorrorCorridor    2026-07-16T16-00-12-04-00
ZombieOrchard     2026-07-16T16-40-45-04-00
TheUnmappedHouse  2026-07-16T16-58-39-04-00
```

## Central update contract

```txt
repo-ledger/LuminaryLabs-Publish/PhantomCommand.md
internal-change-log/2026-07-16T17-40-04-04-00-phantom-command-isometric-marquee-selection-geometry.md
```

## Validation boundary

Documentation and central tracking only. No runtime or deployment claim is made.
