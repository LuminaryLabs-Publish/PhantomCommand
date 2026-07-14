# Settings Command and Route Adoption Result Map

**Timestamp:** `2026-07-14T02-58-28-04-00`

## Summary

Settings changes currently mutate a shared menu object and attempt an unverified write. No typed command or result distinguishes accepted, rejected, unsupported, storage-degraded or stale work. Campaign startup cannot identify which settings generation it should apply.

## Plan ledger

**Goal:** define commands and results that make settings mutation, persistence and route adoption observable.

- [x] Identify current input paths.
- [x] Identify current implicit effects.
- [x] Define typed command and result envelopes.
- [x] Define duplicate and stale rejection.
- [ ] Implement later.

## Current interaction map

```txt
pointer or keyboard
  -> activatePanel()
  -> mutate settings.crt, settings.grain or settings.ambience
  -> optionally create or close menu audio
  -> saveSettings()
  -> swallow storage failure
  -> next menu frame implicitly applies values

campaign startup
  -> no settings command
  -> no settings document read
  -> hard-coded render settings
```

## Required command

```txt
SettingsChangeCommand
  commandId
  expectedSettingsRevision
  sourceRouteGeneration
  field
  value
  issuedAt
```

## Required results

```txt
SettingsAdoptionResult
  status: applied | rejected | stale | unsupported | degraded
  settingsRevision
  routeGeneration
  supportedFields
  unsupportedFields
  storageResultId
  participantReceipts

SettingsStorageResult
  status: empty | loaded | staged | verified | unavailable | malformed
  schemaVersion
  settingsRevision
  fingerprint

FirstSettingsRevisionFrameAck
  settingsRevision
  routeGeneration
  rendererGeneration
  frameSequence
```

## Rejection rules

```txt
reject stale expected revision
reject unknown fields and invalid values
reject duplicate command IDs without replaying effects
report unsupported route capabilities explicitly
preserve predecessor settings when participant adoption fails
never claim persistence after an unverified write
```

## Public readback

`PhantomMenu` and `GameHost` should expose immutable settings revision, route capability and latest adoption result only. They should not expose raw mutable renderer or audio owners.