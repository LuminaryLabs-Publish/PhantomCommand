# GameHost Read and Write Contract

**Timestamp:** `2026-07-15T08-41-37-04-00`

## Summary

`window.GameHost` currently combines unrestricted read/write references, direct gameplay functions and copied readback in one ambient global. Production diagnostics should default to immutable observation and require an explicit short-lived lease for any allowlisted mutation.

## Plan ledger

**Goal:** define a least-authority host contract that supports diagnostics without publishing mutable campaign owners.

- [x] Classify every current GameHost member.
- [x] Define production read policy.
- [x] Define leased write policy.
- [x] Define route/runtime retirement.
- [x] Define late-caller rejection and frame proof.
- [ ] Implement the contract.

## Publication policy

```txt
production default:
  immutable summary snapshots only
  no raw state
  no raw camera
  no internal function references
  no external fixed-step control

diagnostic lease:
  explicit CapabilitySetId
  explicit CallerLeaseId
  allowlisted commands only
  expected revision required
  bounded expiration
  route and runtime generation bound
```

## Read contract

```txt
getCampaignSnapshot()
  -> returns immutable copied data
  -> includes CampaignStateRevision
  -> excludes mutable collections and functions

getCameraSnapshot()
  -> returns immutable copied data
  -> includes CameraStateRevision
```

## Write contract

```txt
submit(command)
  -> validates capability and caller lease
  -> validates route and runtime generation
  -> validates expected campaign and camera revisions
  -> validates allowlist and terminal eligibility
  -> rejects duplicates
  -> settles exactly once
  -> returns typed immutable result
```

## Retirement contract

```txt
route exit or runtime replacement
  -> revoke all capability sets
  -> expire all caller leases
  -> remove window publication
  -> reject retained references and late commands
  -> publish retirement receipt
```

## Proof contract

```txt
read-only fixture
allowlisted mutation fixture
unsupported mutation fixture
stale revision fixture
duplicate command fixture
lease expiration fixture
route retirement fixture
Canvas2D and CRT frame convergence fixture
source build and Pages parity fixture
```

No public host behavior was changed.