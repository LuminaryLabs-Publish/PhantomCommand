# PhantomCommand Known Gaps

**Timestamp:** `2026-07-12T18-11-53-04-00`

## Summary

The leading documented gap is Campaign Action Result Authority. Campaign action helpers cannot report whether work committed, why a request was rejected, which revision changed or which visible frame reflects the result.

## Plan ledger

**Goal:** close action identity, revision admission, atomic commit, terminal-result, zero-mutation and visible-proof gaps while preserving the existing pointer, phase, replay, lifecycle and persistence queues.

- [x] Record void-helper and direct-mutation action paths.
- [x] Record silent rejection and no-effect ambiguity.
- [x] Record multi-resource atomicity gaps.
- [x] Record public-host source and capability gaps.
- [x] Record result, observation, frame and fixture gaps.
- [x] Preserve previous authority queues.
- [ ] Implement in dependency order.

## Action identity gaps

```txt
campaign session ID
campaign session generation
campaign state revision
action ID
action sequence
action source kind
action kind registry
action payload schema
source capability
```

## Revision gaps

```txt
phase revision
selection revision
economy revision
pad revision
target revision
camera revision
expected-revision admission
stale action rejection
```

## Transaction gaps

```txt
detached action plan
prepare results
cross-resource invariant validation
atomic commit
rollback
change set
predecessor and successor revision
idempotency ledger
duplicate action rejection
```

## Result gaps

```txt
CampaignActionResult
explicit success status
explicit rejection reason
zero-mutation rejection proof
created/removed entity IDs
selection delta
economy delta
phase delta
message delta
committed simulation step
```

## Concrete current risks

```txt
wave-start request can be ignored without feedback
build request can be ignored without distinguishing missing pad, occupancy or souls
order request can be ignored when selection is empty
missing selected units are skipped silently
second pad activation can build without an explicit action boundary
number keys and pause mutate shared state directly
restart reloads without a coordinated result
GameHost exposes direct mutators without source identity
callers cannot retry safely because duplicate application cannot be detected
HUD can retain unrelated predecessor messaging after a rejected request
```

## Observation and render gaps

```txt
detached action observation
bounded action journal
feedback projection result
public readback projection result
first visible action-frame acknowledgement
stale result/frame rejection
```

## Test gaps

```txt
all action success paths
all action rejection reasons
zero state-digest change after rejection
duplicate action ID idempotency
stale revision rejection
build atomicity
wave-start atomicity
rollback after prepare failure
public/browser source parity
source/build/Pages parity
first visible frame correlation
```

## Retained campaign gaps

```txt
Menu Pointer-Hit Admission Authority
Campaign World-Pointer Admission Authority
Public Host Owner Quarantine and Typed Command Admission
CRT Display/Input Projection Authority
Campaign Phase Admission Authority
Fixed-Step Command Scheduling Replay and Committed Frame Authority
Public Host Committed Read Model
Combat Resolution and Entity Liveness Authority
Exclusive Terminal Outcome Transaction
Versioned Full Campaign Checkpoint Capture Authority
Campaign Bootstrap and Continue Resume Authority
```

## Retained lifecycle/product gaps

```txt
Runtime Session Resource Lifecycle Authority
Menu Audio Activation and Lifecycle Authority
WebGL context loss/restore and disposal
save schema, migration and atomic hydration
complete campaign replay and restored-frame proof
```

## Completion boundary

Do not count direct mutation, a changed HUD value, a helper returning, or a public method completing without throwing as action-result proof. Completion requires one terminal result, zero mutation for every rejection, exactly-once mutation for accepted action IDs and a first-visible-frame acknowledgement.