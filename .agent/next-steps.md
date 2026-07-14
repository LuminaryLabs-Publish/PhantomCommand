# PhantomCommand Next Steps

**Timestamp:** `2026-07-13T21-02-54-04-00`

## Summary

Implement Victory Save Durable Commit and Resume Authority before presenting Continue as a reliable campaign capability.

## Plan ledger

**Goal:** move from marker-only persistence to a verified, compatible and visibly correlated save generation.

- [ ] Define `phantom-command.campaign-save.v1` and a campaign-definition version.
- [ ] Choose checkpoint reconstruction or complete deterministic snapshot policy.
- [ ] Add campaign session, state revision and save-generation identities.
- [ ] Prepare and validate detached save candidates.
- [ ] Stage, read back, fingerprint and atomically promote saves.
- [ ] Return typed storage failure and degraded-durability results.
- [ ] Replace raw key scanning with parsed Continue capability admission.
- [ ] Implement resume reconstruction for `campaign=continue`.
- [ ] Quarantine malformed, incompatible and legacy marker-only records.
- [ ] Add first durable-outcome and first resumed-frame acknowledgements.
- [ ] Add source, build and Pages persistence fixtures.

## Do not claim complete until

```txt
successful victory persistence is verified
storage failure is visible and typed
Continue is disabled for invalid candidates
Continue resumes the admitted generation
new campaign behavior is explicit
first matching visible frames are acknowledged
production output matches source behavior
```