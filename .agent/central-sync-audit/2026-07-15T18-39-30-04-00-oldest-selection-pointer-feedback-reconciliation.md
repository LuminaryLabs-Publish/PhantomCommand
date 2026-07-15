# Oldest Selection and Pointer Feedback Reconciliation

**Timestamp:** `2026-07-15T18-39-30-04-00`  
**Status:** `central-reconciled`

## Summary

The complete Publish comparison found 11 accessible repositories and ten eligible non-Cavalry repositories. Every eligible repository had a central ledger, root `.agent` state and a current head matching its recorded repo-local head. PhantomCommand had the oldest synchronized central timestamp, was selected alone, and its campaign pointer-feedback audit was recorded in `LuminaryLabs-Dev/LuminaryLabs` on `main`.

## Plan ledger

**Goal:** preserve deterministic selection and complete central reconciliation for the campaign pointer-feedback finding.

- [x] Enumerate the complete Publish repository list.
- [x] Exclude Cavalry of Rome.
- [x] Compare eligible repositories with central ledgers and root `.agent` states.
- [x] Compare all eligible current heads with recorded heads.
- [x] Select only PhantomCommand through the oldest synchronized rule.
- [x] Add the repo-local pointer-feedback audit family.
- [x] Record the new status, finding and output paths.
- [x] Add the central internal change log.
- [x] Update the central PhantomCommand ledger.
- [x] Push both repositories only to `main`.
- [x] Create no branch or pull request.

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

## Central reconciliation result

```txt
central repository:
  LuminaryLabs-Dev/LuminaryLabs

central status:
  campaign-pointer-feedback-projection-authority-central-reconciled

technical status:
  campaign-pointer-feedback-projection-authority-audited

retained status:
  menu-audio-unlock-lifecycle-authority-central-reconciled

central change log:
  internal-change-log/2026-07-15T18-39-30-04-00-phantom-command-campaign-pointer-feedback.md

central reconciliation commit at time of acknowledgement:
  143174112f7c66eb1c9d88186caf73eabf025a3c
```

## Finding retained centrally

The campaign canvas hides the native cursor. The runtime tracks projected pointer coordinates and accepts selection, build, order, pan and zoom commands, but normal frames render no replacement cursor, hover reticle, candidate target, order anchor or build-pad hover state. Only an active drag rectangle and post-commit state/effects provide pointer-related feedback.