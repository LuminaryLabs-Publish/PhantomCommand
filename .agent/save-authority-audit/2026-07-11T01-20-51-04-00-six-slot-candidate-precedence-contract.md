# Six-Slot Candidate Precedence Contract

**Timestamp:** `2026-07-11T01-20-51-04-00`

## Physical slots

```txt
local:phantomCommand.save
session:phantomCommand.save
local:nexus.sceneSnapshot
session:nexus.sceneSnapshot
local:phantom.command.campaign
session:phantom.command.campaign
```

## Current behavior

The first non-empty value is enough to enable Continue, but no candidate is actually selected. The code does not parse or compare values, and no precedence survives the scan.

## Proposed precedence

Precedence must be explicit and versioned. Recommended default:

1. current `phantom.command.campaign` resumable envelope in session storage
2. current `phantom.command.campaign` resumable envelope in local storage
3. supported migrated `phantomCommand.save` resumable envelope in session storage
4. supported migrated `phantomCommand.save` resumable envelope in local storage
5. explicitly supported `nexus.sceneSnapshot` adapter candidates
6. completion summaries and unsupported candidates remain inspected but non-resumable

The exact ordering may change during implementation, but it must be encoded in a data table and fixture, never implied by object iteration or `Array.some()`.

## Candidate row

```js
{
  slotId,
  layer,
  key,
  presence,
  readStatus,
  parseStatus,
  candidateKind,
  schema,
  version,
  scene,
  updatedAt,
  resumable,
  migrationRequired,
  rejectionReason,
  payloadFingerprint
}
```

Raw payloads must not be exposed through menu or GameHost diagnostics.

## Decision invariants

- inspection order is stable
- selection order is stable
- invalid candidates never enable Continue
- unsupported versions never enable Continue
- a completion summary never enables resume
- multiple valid candidates produce one deterministic winner
- ties produce a deterministic winner or explicit ambiguity rejection
- the same slot set produces the same decision fingerprint
- read failures remain observable without throwing menu startup
- storage unavailability yields an explicit empty/unavailable decision

## Migration boundary

Migration must be a pure transformation returning a new payload and evidence row. It must not overwrite source storage during capability resolution.
