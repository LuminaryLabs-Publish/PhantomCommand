# Startup Attempt, Failure and Retry Result Map

**Timestamp:** `2026-07-14T07-58-22-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`

## Summary

Startup has no command envelope or result identity. This map defines the evidence required to reject stale completions, prevent duplicate publication and make retry safe.

## Plan ledger

**Goal:** make every route startup and retry a typed interaction with one terminal result and one accepted publication generation.

- [x] Identify current implicit startup ingress.
- [x] Define command, phase and result identities.
- [x] Define supersession and duplicate rules.
- [x] Define fallback actions and first-frame settlement.
- [ ] Implement the interaction contract later.

## Current interaction map

```txt
HTML module request
  -> implicit startup attempt
  -> top-level side effects
  -> no attempt ID
  -> no phase result
  -> no terminal result

exception/rejection
  -> browser console only
  -> no route-owned interaction result
  -> no retry command
```

## Required commands

```txt
RouteStartupCommand
  routeId
  startupAttemptId
  sourceRevision
  buildRevision
  expectedPredecessorAttemptId

RouteStartupRetryCommand
  routeId
  newStartupAttemptId
  failedAttemptId
  reason

RouteFallbackAction
  routeId
  startupAttemptId
  action: retry | return-menu | reload
```

## Required results

```txt
CapabilityProbeResult
CandidatePreparationResult
RenderBootstrapProbeResult
StartupRollbackResult
RouteStartupResult
FallbackProjectionResult
FirstRouteFrameAck
```

## Admission rules

```txt
one active attempt per route generation
attempt IDs are unique
completion from a superseded attempt is rejected
public hosts belong to one accepted attempt
listener and RAF leases belong to one accepted attempt
retry cannot reuse candidate resources from a failed attempt
fallback actions cite the current failed attempt
first-frame acknowledgement must cite the accepted attempt
```

## Terminal states

```txt
accepted
  route is interactive
  host and frame leases published
  first frame acknowledged

degraded
  optional capability unavailable
  route remains usable under declared policy

failed
  candidate resources retired
  fallback visible and operable
  retry or escape available

superseded
  stale completion ignored
  stale candidates retired
```

## Validation boundary

Documentation only. No startup, input, retry or fallback interaction was implemented.