# Oldest Selection and Pointer Feedback Reconciliation

**Timestamp:** `2026-07-15T18-39-30-04-00`  
**Status:** `repo-local-audit-complete-central-sync-pending`

## Summary

The complete Publish comparison found 11 accessible repositories and ten eligible non-Cavalry repositories. Every eligible repository had a central ledger, root `.agent` state and a current head matching its recorded repo-local head. PhantomCommand had the oldest synchronized central timestamp and was selected alone.

## Plan ledger

**Goal:** preserve deterministic selection and reconcile the campaign pointer-feedback finding into `LuminaryLabs-Dev/LuminaryLabs`.

- [x] Enumerate the complete Publish repository list.
- [x] Exclude Cavalry of Rome.
- [x] Compare eligible repositories with central ledgers and root `.agent` states.
- [x] Compare all eligible current heads with recorded heads.
- [x] Select only PhantomCommand through the oldest synchronized rule.
- [x] Add the repo-local pointer-feedback audit family.
- [x] Record the new status, finding and output paths.
- [ ] Add the central internal change log.
- [ ] Update the central PhantomCommand ledger.
- [ ] Bind the final repo-local documentation head.
- [ ] Mark this reconciliation complete.

## Comparison

```txt
PhantomCommand      2026-07-15T13-41-25-04-00 selected oldest
AetherVale          2026-07-15T14-01-52-04-00
TheLongHaul         2026-07-15T14-40-11-04-00
MyCozyIsland        2026-07-15T15-01-22-04-00
IntoTheMeadow       2026-07-15T15-41-21-04-00
PrehistoricRush     2026-07-15T16-00-32-04-00
HorrorCorridor      2026-07-15T16-39-06-04-00
TheOpenAbove        2026-07-15T16-58-19-04-00
ZombieOrchard       2026-07-15T17-38-05-04-00
TheUnmappedHouse    2026-07-15T18-02-58-04-00
```

## Central reconciliation payload

```txt
new status:
  campaign-pointer-feedback-projection-authority-central-reconciled

new technical status:
  campaign-pointer-feedback-projection-authority-audited

retained current status:
  menu-audio-unlock-lifecycle-authority-central-reconciled

new central change log:
  internal-change-log/2026-07-15T18-39-30-04-00-phantom-command-campaign-pointer-feedback.md
```

## Finding to retain centrally

The campaign canvas hides the native cursor. The runtime tracks projected pointer coordinates and accepts selection, build, order, pan and zoom commands, but normal frames render no replacement cursor, hover reticle, candidate target, order anchor or build-pad hover state. Only an active drag rectangle and post-commit state/effects provide pointer-related feedback.