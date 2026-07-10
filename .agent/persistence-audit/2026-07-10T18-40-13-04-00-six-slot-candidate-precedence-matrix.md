# Six-Slot Candidate Precedence Matrix

**Timestamp:** `2026-07-10T18-40-13-04-00`

## Candidate inventory

```txt
phantomCommand.save      x localStorage
phantomCommand.save      x sessionStorage
nexus.sceneSnapshot      x localStorage
nexus.sceneSnapshot      x sessionStorage
phantom.command.campaign x localStorage
phantom.command.campaign x sessionStorage
```

## Current behavior

The menu checks keys in array order and evaluates `localStorage.getItem(key) || sessionStorage.getItem(key)`, then collapses the result to Boolean. No slot identity or winner survives.

## Required classification matrix

| Classification | Continue | Hydration |
|---|---:|---:|
| absent | no | no |
| unreadable | no | no |
| invalid-json | no | no |
| foreign-schema | no | adapter only |
| legacy-completion-summary | no | no |
| unsupported-version | no | migration only |
| checksum-failed | no | no |
| resumable-current | yes | yes |
| resumable-migrated | yes | yes after migration |

## Proposed precedence principles

1. Classification occurs before priority selection.
2. Only resumable candidates participate in winner selection.
3. Key priority and storage priority are explicit data, not incidental loop order.
4. Every shadowed resumable candidate remains visible in diagnostics.
5. Malformed or foreign candidates never hide a valid candidate silently.
6. Equal-priority ties resolve through a stable rule and are fixture-tested.
7. The resolver policy has a version string included in readback.

## Candidate row

```txt
slotId
key
storageLayer
priority
present
rawFingerprint
parseStatus
classification
schemaVersion
sceneId
resumable
reason
```

## Winner row

```txt
selectedSlotId
selectionPolicyVersion
selectedClassification
selectedFingerprint
shadowedSlotIds[]
decisionReason
```

## Follow-on save envelope

The existing victory payload `{ scene, souls, wave }` remains a legacy completion summary. A later resumable envelope must contain the complete mutable campaign state, identifier counters, simulation position, source revision, schema/version, checksum, and fingerprint.