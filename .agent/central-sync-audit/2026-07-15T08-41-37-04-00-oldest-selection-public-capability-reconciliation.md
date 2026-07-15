# Oldest Selection and Public Capability Reconciliation

**Timestamp:** `2026-07-15T08-41-37-04-00`  
**Status:** `central-reconciled`

## Summary

The accessible Publish organization contains 11 repositories. After excluding `TheCavalryOfRome`, all ten eligible repositories had central-ledger and root `.agent` coverage, and no eligible repository was new, missing, undocumented or runtime-ahead. PhantomCommand had the oldest synchronized central timestamp, was selected alone, and its public diagnostic capability audit was logged in `LuminaryLabs-Dev/LuminaryLabs` on `main`.

## Plan ledger

**Goal:** preserve deterministic repository selection and complete exact central-ledger reconciliation for the public diagnostic capability audit.

- [x] Enumerate the complete Publish repository list.
- [x] Exclude Cavalry of Rome.
- [x] Compare eligible repositories with the central ledger and root `.agent` states.
- [x] Select only PhantomCommand through the oldest synchronized rule.
- [x] Add the repo-local audit family.
- [x] Record the new status, finding and output paths.
- [x] Add the central internal change log.
- [x] Update the central PhantomCommand ledger.
- [x] Push both repositories only to `main`.
- [x] Create no branch or pull request.

## Comparison

```txt
accessible repositories: 11
eligible repositories: 10
central ledger entries: 10
root .agent states: 10
new or missing: 0
runtime ahead: 0
selected: LuminaryLabs-Publish/PhantomCommand
prior central timestamp: 2026-07-15T03-24-35-04-00
next oldest: AetherVale at 2026-07-15T03-41-50-04-00
selection reason: oldest synchronized central timestamp
```

## Central reconciliation result

```txt
central repository:
  LuminaryLabs-Dev/LuminaryLabs

central status:
  public-diagnostic-capability-frame-admission-authority-central-reconciled

technical status:
  public-diagnostic-capability-frame-admission-authority-audited

retained status:
  device-control-action-coverage-authority-central-reconciled

central change log:
  internal-change-log/2026-07-15T08-41-37-04-00-phantom-command-public-diagnostic-capability.md

central reconciliation commit at time of acknowledgement:
  8b75170e6182e2ce1e2f197517d6b933d8217404
```

## Finding retained centrally

`window.GameHost` publishes live mutable campaign state and camera references plus direct wave, build and zoom functions. External callers can therefore mutate simulation or presentation truth outside normal command admission, with no caller lease, capability revision, expected state revision, idempotency key, typed result, retirement receipt or matching Canvas2D/CRT frame acknowledgement.