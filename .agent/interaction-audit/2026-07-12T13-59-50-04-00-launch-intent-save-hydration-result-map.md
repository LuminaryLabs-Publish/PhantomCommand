# Launch Intent, Save and Hydration Result Map

**Timestamp:** `2026-07-12T13-59-50-04-00`

## Summary

The current flow uses booleans, URL text and ambient storage instead of typed commands and results. This map defines where intent, save admission, hydration and visible-frame acknowledgement must become explicit.

## Plan ledger

**Goal:** turn menu activation and campaign startup into one traceable command/result chain.

- [x] Map current interaction inputs and side effects.
- [x] Identify missing identities and stale-result fences.
- [x] Define required command/result sequence.
- [ ] Wire the interaction authority.

## Current map

```txt
storage string exists
  -> boolean hasCampaignSave
  -> menu item enabled
  -> click or Enter
  -> beginTransition(url)
  -> location.href assignment
  -> campaign module default initialization
  -> no result returned to menu or campaign host
```

## Required map

```txt
CampaignSaveProbeCommand
  -> CampaignSaveProbeResult

MenuCampaignLaunchCommand
  -> CampaignLaunchIntent
  -> MenuCampaignLaunchResult

CampaignBootstrapCommand
  -> CampaignSaveReadResult
  -> CampaignSaveValidationResult
  -> CampaignMigrationResult
  -> CampaignHydrationResult
  -> CampaignBootstrapResult

CampaignBootstrapResult
  -> CampaignVisibleFrameAck
  -> immutable GameHost read-model revision
```

## Admission matrix

| Mode | Save state | Result | Mutation |
|---|---|---|---|
| New | none | `CommittedNew` | commit validated default candidate |
| New | predecessor exists | `CommittedNew` with explicit retain/archive/clear policy | commit validated default candidate |
| Continue | valid current version | `CommittedContinue` | commit hydrated candidate |
| Continue | valid migratable version | `CommittedContinue` with migration receipt | commit migrated candidate |
| Continue | malformed | `RejectedInvalidSave` | none |
| Continue | foreign schema | `RejectedForeignSave` | none |
| Continue | unsupported version | `RejectedUnsupportedVersion` | none |
| Continue | storage unavailable | `RejectedStorageUnavailable` or explicit fallback | none |
| Any | stale runtime generation | `RejectedStale` | none |

## Identity chain

```txt
launchIntentId
probeCommandId
probeResultId
saveKey
storageScope
saveFingerprint
migrationId
hydrationPlanId
bootstrapCommandId
bootstrapRevision
stateFingerprint
firstFrameReceiptId
```

## Stale and duplicate behavior

```txt
duplicate launch intent
  -> return prior terminal result or reject idempotently

late save-read result
  -> reject when launch intent or runtime generation changed

late migration/hydration result
  -> reject when bootstrap command is no longer current

repeated Continue activation during fade
  -> no second bootstrap transaction
```

## Public capability boundary

`window.PhantomMenu.activate()` and `window.GameHost` should expose typed command methods and immutable results, not bypass launch admission or mutate live owners directly.

## Completion boundary

No interaction is complete until the first visible frame and public read model acknowledge the same bootstrap revision that admitted the launch intent.