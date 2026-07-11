# Continue and Resume Command Result Map

**Timestamp:** `2026-07-11T05-50-43-04-00`

## Summary

Continue is currently a URL choice, not a typed command. The menu knows only that some storage key contains a value, while the campaign ignores the mode and always creates a fresh session.

## Plan ledger

**Goal:** connect menu intent, candidate resolution, lifecycle admission, persistence validation and atomic campaign commit through one observable command/result chain.

- [x] Map browser and host sources.
- [x] Map current silent/Boolean outcomes.
- [x] Define normalized commands.
- [x] Define typed result stages and reasons.
- [x] Define duplicate/stale handling.
- [ ] Implement after the candidate resolver and lifecycle boundary exist.

## Current source map

```txt
pointer / Enter / PhantomMenu.activate("continue")
  -> activateMain(continue)
  -> beginTransition(game.html?campaign=continue)
  -> location navigation
  -> campaign creates fresh state
```

Current outcomes:

```txt
candidate present: Boolean
transition accepted: implicit
candidate selected: absent
load attempted: absent
resume committed: absent
failure reason: absent
```

## Required commands

```txt
ContinueRequested
CandidateResolved
ResumeRequested
ResumeCancelled
NewCampaignRequested
```

`ResumeRequested` must carry:

```txt
commandId
source
sessionId
expectedRunGeneration
candidateId
candidateProvenance
expectedFingerprint when available
```

## Required result chain

```txt
continue request result
  -> candidate resolution result
  -> lifecycle transition admission result
  -> save parse/admission result
  -> migration result
  -> hydration staging result
  -> invariant validation result
  -> atomic commit result
  -> first-frame acknowledgement
```

## Reason catalog

```txt
no-candidate
ambiguous-candidate
storage-unavailable
parse-failed
unsupported-schema
content-mismatch
fingerprint-mismatch
migration-unavailable
invariant-failed
stale-session
transition-in-progress
hydrate-failed
commit-failed
first-frame-timeout
committed
```

## Invariants

```txt
one Continue command resolves at most one candidate
one session admits at most one terminal transition
same commandId is idempotent
stale runGeneration cannot commit
rejected resume cannot mutate campaign state
New Campaign never consumes a Continue candidate
navigation occurs only after lifecycle teardown and resume intent are durable
```
