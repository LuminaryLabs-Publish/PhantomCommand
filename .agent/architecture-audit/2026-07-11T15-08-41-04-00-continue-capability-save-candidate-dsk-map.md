# Architecture Audit: Continue Capability and Save Candidate DSK Map

**Timestamp:** `2026-07-11T15-08-41-04-00`

## Summary

The current menu-side `menu-save-presence-kit` collapses six possible storage slots into one Boolean, while campaign startup has no corresponding load or mode-admission domain. The architecture needs one parent authority that owns slot reads, candidate classification, deterministic precedence, Continue projection and campaign startup admission.

## Plan ledger

**Goal:** define clean DSK boundaries so menu and campaign cannot resolve or hydrate save candidates through separate, drifting logic.

- [x] Trace declared save keys and storage layers.
- [x] Trace menu capability projection.
- [x] Trace route mode into campaign construction.
- [x] Trace current victory summary writing.
- [x] Separate read, parse, classify, rank, project, admit and hydrate responsibilities.
- [x] Define typed contracts and dependency order.
- [ ] Implement the composed domain.

## Current architecture

```txt
menu-save-presence-kit
  -> SAVE_KEYS array
  -> localStorage.getItem(key) || sessionStorage.getItem(key)
  -> Boolean presence
  -> Continue enabled

menu-route-kit
  -> game.html?campaign=continue

campaign-route-shell-kit
  -> module executes
  -> default state constructed
  -> query and save candidates ignored

fixed-step-campaign-simulation-kit
  -> victory summary write
  -> localStorage phantomCommand.save
```

## Missing authority split

### Slot registry

Owns the canonical set of candidate locations:

```txt
slot ID
key name
storage layer
candidate family
legacy/current classification hint
```

### Slot read service

Reads each slot independently and returns:

```txt
empty
read
denied
failed
```

A failed slot must not terminate evaluation of the remaining slots.

### Candidate parser and classifier

Owns:

```txt
safe JSON parsing
schema version detection
candidate kind detection
required-field validation
content revision admission
raw hash and state fingerprint checks
```

### Candidate precedence

Owns one versioned policy for choosing among valid candidates. Suggested ordering:

```txt
supported resumable checkpoint
  > supported legacy resumable snapshot
  > non-resumable completion summary

matching content revision
  > migratable revision
  > unsupported revision

newer committed checkpoint
  > older committed checkpoint

local/session preference only as an explicit final tie-break
```

A completion summary may enable a future chapter-select capability, but it must not masquerade as a resumable campaign checkpoint.

### Continue capability projection

Consumes only `CandidateResolutionResult` and publishes:

```txt
enabled
reason
selectedCandidateId
selectedSlotId
policyVersion
```

### Campaign startup admission

Consumes:

```txt
startup mode
selected candidate identity
selected candidate fingerprint
content revision
```

It re-reads and revalidates the exact candidate before hydration.

### Hydration transaction

Builds detached candidate state, validates references and identity counters, then commits atomically or leaves live state unchanged.

## Required parent domain

```txt
phantom-command-continue-capability-authority-domain
```

## Required kit graph

```txt
phantom-command-save-slot-registry-kit
  -> phantom-command-storage-slot-read-kit
  -> phantom-command-save-candidate-parse-kit
  -> phantom-command-save-schema-classifier-kit
  -> phantom-command-save-content-identity-kit
  -> phantom-command-save-candidate-provenance-kit
  -> phantom-command-save-candidate-precedence-kit
  -> phantom-command-save-candidate-resolver-kit
  -> phantom-command-continue-capability-result-kit
  -> phantom-command-campaign-startup-mode-kit
  -> phantom-command-campaign-startup-admission-kit
  -> phantom-command-campaign-hydration-plan-kit
  -> phantom-command-campaign-hydration-result-kit
  -> phantom-command-candidate-journal-kit
  -> phantom-command-candidate-resolver-fixture-kit
  -> phantom-command-browser-continue-parity-smoke-kit
```

## DSK service contracts

### `save-slot-registry-kit`

```txt
listSlots()
getSlot(slotId)
validateRegistry()
snapshot()
```

### `storage-slot-read-kit`

```txt
readSlot(slot)
readAllSlots(slots)
classifyStorageError(error)
```

### `save-candidate-parse-kit`

```txt
parseCandidate(slotReadResult)
normalizeCandidate(raw)
validateRequiredFields(candidate)
```

### `save-candidate-precedence-kit`

```txt
rankCandidate(candidate)
compareCandidates(a, b)
resolve(candidates, policyVersion)
```

### `continue-capability-result-kit`

```txt
createCapabilityResult(resolution)
projectMenuState(result)
```

### `campaign-startup-admission-kit`

```txt
admitNew(command)
admitContinue(command, candidate)
rejectStaleCandidate(expected, actual)
```

### `campaign-hydration-plan-kit`

```txt
prepare(candidate)
validateReferences(plan)
commit(plan)
rollback(plan)
```

## Dependency ordering

```txt
slot registry
  -> independent reads
  -> parse and schema classification
  -> content identity and provenance
  -> candidate precedence
  -> Continue capability result
  -> route command with selected identity
  -> startup revalidation
  -> detached hydration
  -> atomic commit
  -> first resumed-frame acknowledgement
```

## Architectural invariants

```txt
menu never reads raw storage directly after the resolver exists
campaign never scans all slots independently
one policy version selects the candidate
one candidate identity crosses navigation
startup revalidates the exact candidate
no partial hydration mutates live state
new mode cannot accidentally consume a candidate
completion summaries cannot impersonate resumable checkpoints
```

## Validation boundary

Documentation only. No DSK or runtime module was implemented in this pass.