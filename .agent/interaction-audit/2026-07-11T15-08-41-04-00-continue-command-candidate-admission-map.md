# Interaction Audit: Continue Command and Candidate Admission Map

**Timestamp:** `2026-07-11T15-08-41-04-00`

## Summary

The current Continue interaction carries only a destination URL. It does not carry the candidate identity or resolution result that justified enabling Continue, so campaign startup cannot prove it consumed the same evidence the player selected.

## Plan ledger

**Goal:** turn Continue activation into an idempotent command that references one admitted candidate and returns one typed startup result.

- [x] Trace pointer, keyboard and diagnostic Continue activation.
- [x] Trace menu state into route transition.
- [x] Identify lost candidate provenance.
- [x] Define command, admission and result fields.
- [x] Define stale and duplicate handling.
- [ ] Implement interaction authority.

## Current ingress paths

```txt
pointer click
  -> activateMain(continue item)

keyboard Enter or Space
  -> activateMain(selected continue item)

window.PhantomMenu.activate("continue")
  -> activateMain(continue item)
```

All three paths converge on:

```txt
beginTransition("./game.html?campaign=continue")
```

## Current interaction state

```txt
item.enabled: Boolean
item.note: BOUND | EMPTY
targetUrl: string
transitionStartedAt: number
```

Missing:

```txt
commandId
candidateResolutionId
candidateId
slotId
candidateFingerprint
policyVersion
source
sequence
admission result
startup result
```

## Required ContinueCommand

```txt
commandId
source: pointer | keyboard | diagnostic
sequence
issuedAt
candidateResolutionId
candidateId
candidateFingerprint
policyVersion
requestedMode: continue
```

## Required admission flow

```txt
ContinueCommand
  -> verify menu capability result is still current
  -> verify command references selected candidate
  -> reject duplicate command ID
  -> freeze candidate resolution for transition
  -> attach identity to navigation handoff
  -> campaign startup re-reads exact slot
  -> compare raw hash and candidate fingerprint
  -> admit or reject startup
  -> return CampaignStartupResult
```

## Required rejection reasons

```txt
continue-disabled
missing-resolution
resolution-superseded
candidate-missing
candidate-changed
policy-version-mismatch
duplicate-command
transition-already-active
unsupported-mode
startup-rejected
```

## Idempotency

Repeated pointer, keyboard or diagnostic activation during the fade must not create multiple transitions or multiple startup attempts. The current `transitionStartedAt !== null` check suppresses repeated URL transitions, but there is no typed duplicate result or command identity.

## Required parity proof

```txt
pointer Continue
keyboard Continue
PhantomMenu Continue
```

All must produce the same command shape, selected candidate identity, admission decision and startup result.

## Diagnostic projection

`window.PhantomMenu.getState()` should eventually expose immutable summaries only:

```txt
continueCapability
selectedCandidate
activeTransition
lastContinueCommandResult
```

It should not expose raw storage payloads.

## Validation boundary

Documentation only. Input handlers, menu transitions and `window.PhantomMenu` were not changed.