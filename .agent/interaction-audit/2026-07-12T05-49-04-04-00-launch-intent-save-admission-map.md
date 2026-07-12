# Interaction Audit: Launch Intent and Save Admission Map

**Timestamp:** `2026-07-12T05-49-04-04-00`

## Current interaction map

```txt
menu pointer/key activation
  -> activateMain(item)
  -> beginTransition(url)
  -> fade
  -> location.href = url
  -> campaign module starts
```

The menu exports launch intent only through URL text. No command ID, menu session, validated resume capability or handoff result crosses the route boundary.

## Current Continue admission

```txt
for each SAVE_KEY
  -> read localStorage value OR sessionStorage value
  -> Boolean(value)
  -> any true enables Continue
```

This admits:

```txt
malformed JSON
empty-object JSON
wrong product payload
wrong scene payload
unsupported version
stale session data
partial write
```

## Required command map

```txt
MenuLaunchCommand
  menuSessionId
  commandId
  intent: NEW | CONTINUE
  expectedResumeCapabilityRevision

ResumeCapabilityResult
  capabilityRevision
  available
  sourceKey
  sourceScope
  schemaVersion
  payloadFingerprint
  reason

CampaignBootstrapCommand
  commandId
  launchIntent
  expectedCapabilityRevision
  expectedSaveFingerprint
```

## Admission outcomes

```txt
ACCEPTED_NEW
ACCEPTED_RESUME
REJECTED_NO_SAVE
REJECTED_MALFORMED
REJECTED_WRONG_PRODUCT
REJECTED_WRONG_SCENE
REJECTED_UNSUPPORTED_VERSION
REJECTED_STALE_CAPABILITY
REJECTED_MIGRATION_FAILED
```

## Required interaction guarantees

```txt
one menu action creates one launch command
keyboard repeat cannot duplicate bootstrap
Continue state comes from a validated capability result
route handoff carries or reconstructs the same intent identity
rejected Continue returns to a safe menu state with a reason
no rejected command mutates campaign state
```

The route string may remain as a transport adapter, but it cannot be the sole authority for campaign bootstrap.