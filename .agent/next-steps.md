# PhantomCommand Next Steps

**Timestamp:** `2026-07-15T08-41-37-04-00`

## Summary

Replace `window.GameHost` raw references with immutable snapshots and an allowlisted diagnostic command facade. Keep diagnostics useful, but bind every caller, capability, expected state revision, result, retirement event and visible frame.

## Plan ledger

**Goal:** move public diagnostics from ambient mutable access to least-authority, versioned command settlement.

- [ ] Add `PublicCapabilityPolicy` for production, test and diagnostic modes.
- [ ] Add versioned `PublicCapabilitySet` publication.
- [ ] Remove live `state` and `camera` references from the public surface.
- [ ] Publish immutable campaign and camera snapshots with revisions.
- [ ] Add bounded `DiagnosticSessionLease` identities.
- [ ] Add one command envelope with capability, caller, command and expected revisions.
- [ ] Allowlist only required campaign and camera diagnostics.
- [ ] Route accepted work through normal campaign or camera ownership.
- [ ] Reject unsupported, stale, duplicate, expired and retired commands.
- [ ] Publish immutable `PublicDiagnosticMutationResult` values.
- [ ] Add capability and lease retirement on route/runtime teardown.
- [ ] Remove the public host reference after retirement.
- [ ] Add `CanvasFrameRevision` and `CrtFrameRevision` results.
- [ ] Add `FirstPublicMutationVisibleFrameAck`.
- [ ] Update the static check to reject raw owner exposure.
- [ ] Execute source, built-output and Pages browser fixtures.

## Completion gate

```txt
one route revision
one runtime generation
one capability policy revision
one active capability set
one bounded caller lease
immutable readback only
allowlisted commands only
expected revision on every write
one terminal result per command
one matching Canvas2D source frame
one matching CRT-presented frame
one retirement receipt
```

Do not claim a safe public diagnostic API until stale, duplicate, retirement and visible-frame fixtures pass.