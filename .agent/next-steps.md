# PhantomCommand Next Steps

**Timestamp:** `2026-07-14T02-58-28-04-00`

## Summary

Implement Settings Route Adoption and Visible-Frame Authority before treating Ritual Settings as a game-wide capability.

## Plan ledger

**Goal:** move from menu-local mutable preferences to one versioned settings document applied predictably across menu and campaign routes.

- [ ] Define `phantom-command.settings.v1` with `crt`, `grain` and `ambience`.
- [ ] Add settings revision, fingerprint and compatibility policy.
- [ ] Normalize and migrate legacy unversioned documents.
- [ ] Return typed read, write, unavailable and malformed storage results.
- [ ] Verify writeback before claiming durable persistence.
- [ ] Declare menu and campaign settings capability manifests.
- [ ] Replace campaign hard-coded CRT/grain values with admitted settings.
- [ ] Explicitly classify campaign ambience as supported or unsupported.
- [ ] Add atomic participant adoption and rollback.
- [ ] Expose immutable settings revision and result through `PhantomMenu` and `GameHost`.
- [ ] Publish `FirstSettingsRevisionFrameAck` after menu and campaign application.
- [ ] Add source, browser, build and Pages settings-parity fixtures.

## Do not claim complete until

```txt
menu and campaign consume the same accepted settings revision
supported user choices are not silently overwritten
unsupported route capabilities are explicit
storage failure is observable
public readback reports route adoption
first matching visible frames are acknowledged
production output matches source behavior
```

## Retained work

The prior durable save/resume, route lifecycle, fixed-step scheduler and WebGL recovery plans remain active and are not superseded by this settings audit.