# Settings Schema, Capability and Adoption Contract

**Timestamp:** `2026-07-14T02-58-28-04-00`

## Summary

The current persisted object has no schema version, accepted revision, compatibility policy, storage result or route capability manifest. This contract defines the minimum boundary needed to keep menu and campaign settings coherent.

## Plan ledger

**Goal:** define one canonical settings document and explicit support/adoption semantics for every route.

- [x] Preserve the current fields: `crt`, `grain`, `ambience`.
- [x] Define schema and revision requirements.
- [x] Define route capability requirements.
- [x] Define atomic participant adoption and rollback.
- [x] Define visible proof.
- [ ] Implement and validate later.

## Canonical document

```txt
PhantomSettingsDocument
  schema: phantom-command.settings.v1
  revision: integer
  crt: boolean
  grain: low | high
  ambience: boolean
  updatedAt: number
  fingerprint: string
```

## Route capability manifest

```txt
MenuSettingsCapability
  crt: supported
  grain: supported
  ambience: supported

CampaignSettingsCapability
  crt: must be declared
  grain: must be declared
  ambience: supported | unsupported
```

An unsupported field is not an error by itself, but it must produce an explicit result. A supported field may not be silently replaced with a route default.

## Adoption transaction

```txt
prepare
  -> parse and normalize candidate
  -> compare expected revision
  -> inspect route capability manifest
  -> prepare storage, CRT, grain and ambience participants

commit
  -> promote canonical document
  -> apply supported participants together
  -> publish SettingsAdoptionResult

failure
  -> preserve predecessor document and participant state
  -> dispose candidates
  -> publish rejected or degraded result

proof
  -> expose immutable readback
  -> publish FirstSettingsRevisionFrameAck
```

## Migration policy

Legacy unversioned documents may be migrated only when all three fields can be normalized deterministically. Malformed documents must be quarantined or replaced with explicit defaults and a migration result; they must not be silently interpreted as a current schema.

## Storage policy

A successful write claim requires readback and fingerprint verification. Storage unavailability may allow a route-local degraded application, but that result must not be represented as durable.

## Completion criteria

```txt
menu and campaign read the same canonical revision
supported values match the visible frame
unsupported fields are reported
storage failures are typed
public readback exposes revision and result
source, build and Pages behavior agree
```
