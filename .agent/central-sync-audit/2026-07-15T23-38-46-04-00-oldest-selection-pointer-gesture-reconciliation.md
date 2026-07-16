# Oldest Selection and Pointer Gesture Reconciliation

**Timestamp:** `2026-07-15T23-38-46-04-00`  
**Status:** `central-reconciled`

The full Publish comparison found 11 accessible repositories and ten eligible non-Cavalry repositories. PhantomCommand had the oldest synchronized central timestamp and was selected alone. The pointer-gesture capture/cancel audit is now recorded in `LuminaryLabs-Dev/LuminaryLabs` on `main`.

## Plan ledger

**Goal:** preserve deterministic selection and complete central reconciliation for the pointer-gesture lifecycle finding.

- [x] Compare the full Publish inventory.
- [x] Exclude TheCavalryOfRome.
- [x] Select only PhantomCommand.
- [x] Add the repo-local audit family.
- [x] Update the central PhantomCommand ledger.
- [x] Add the central internal change log.
- [x] Push both repositories only to `main`.
- [x] Create no branch or pull request.

## Central result

```txt
central repository: LuminaryLabs-Dev/LuminaryLabs
central status: pointer-gesture-capture-cancel-authority-central-reconciled
technical status: pointer-gesture-capture-cancel-authority-audited
central commit: a5e2be663aa7727cd71b5386bbe7493c41159138
change log: internal-change-log/2026-07-15T23-38-46-04-00-phantom-command-pointer-gesture-capture-cancel.md
```

## Finding retained centrally

Selection drag and middle-button camera pan begin without pointer capture and ordinarily settle only through canvas `pointerup`. Outside release, `pointercancel`, `lostpointercapture`, pointer-id generation, typed retirement and first matching visible-frame acknowledgement are absent.
