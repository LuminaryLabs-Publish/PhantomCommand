# Public Capability Browser Fixture Gate

**Timestamp:** `2026-07-15T08-41-37-04-00`

## Summary

The existing static check asserts that `window.GameHost` exists, but it does not prove that the host is least-authority, versioned, retired correctly or reflected in matching Canvas2D and CRT frames.

## Plan ledger

**Goal:** require executable source, build and Pages proof before accepting a public diagnostic capability contract.

- [x] Inspect package scripts and campaign static check.
- [x] Confirm no browser capability fixture exists.
- [x] Define source, artifact and deployed fixture rows.
- [ ] Implement the fixtures.
- [ ] Execute and retain logs, screenshots and result receipts.

## Required fixture matrix

```txt
source route:
  immutable snapshot cannot mutate campaign
  immutable camera snapshot cannot mutate camera
  allowlisted wave command settles once
  allowlisted build command settles once
  allowlisted zoom command settles once
  unsupported action is rejected
  stale expected revision is rejected
  duplicate command is rejected
  expired lease is rejected
  retired capability is rejected
  Canvas2D and CRT frame revisions match accepted result

built output:
  same matrix against dist artifact

GitHub Pages:
  same matrix against deployed route
```

## Required evidence

```txt
CapabilitySetId
CallerLeaseId
CommandId
expected and accepted revisions
PublicDiagnosticMutationResult
CanvasFrameResult
CrtFrameResult
FirstPublicMutationVisibleFrameAck
retirement receipt
artifact commit and hash
Pages URL and deployment revision
```

## Current boundary

```txt
npm run check: not run
npm run build: not run
browser fixture: unavailable
artifact fixture: unavailable
Pages fixture: unavailable
```

No deployment or readiness claim is made.