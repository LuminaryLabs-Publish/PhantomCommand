# PhantomCommand Known Gaps

**Timestamp:** `2026-07-13T21-02-54-04-00`

## Summary

Campaign persistence is currently a non-resumable marker with no durable commit or compatibility authority.

## Plan ledger

**Goal:** keep every blocker to reliable victory persistence and Continue/resume behavior explicit.

- [x] Record current source-backed gaps.
- [ ] Close them through runtime implementation and executable proof.

## Gaps

```txt
versioned campaign-save schema: absent
campaign-definition compatibility version: absent
complete checkpoint or snapshot policy: absent
campaign session and save-generation identity: absent
staged write and verified readback: absent
atomic canonical promotion: absent
storage failure classification: absent
malformed or incompatible candidate quarantine: absent
Continue candidate parsing and validation: absent
campaign query admission: absent
resume reconstruction: absent
legacy marker migration policy: absent
first durable-outcome frame acknowledgement: absent
first resumed-frame acknowledgement: absent
browser/build/Pages persistence fixtures: absent
```

## Current risks

```txt
victory can appear durable after storage rejection
Continue can appear for malformed or unrelated data
Continue starts a fresh campaign instead of resuming
marker-only records cannot reconstruct gameplay state
future campaign changes have no compatibility boundary
```