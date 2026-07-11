# Menu Route Session Admission Map

**Timestamp:** `2026-07-11T01-20-51-04-00`

## Current interaction chain

```txt
page load
  -> hasCampaignSave()
  -> menu item enabled and note assigned
  -> keyboard, pointer, hidden button, or PhantomMenu.activate()
  -> beginTransition(url)
  -> window.location.href
  -> campaign module evaluation
```

## Sources

```txt
keyboard
pointer
hidden HTML button
PhantomMenu.activate()
```

All sources share `activateMain()`, but Continue eligibility is a frozen Boolean captured at construction. The activation result is not typed, journaled, or tied to candidate provenance.

## Missing interaction services

```txt
session-intent request adapter
route-mode parser
continue-capability query
activation preflight
activation result
transition admission ID
startup result correlation
rejection projection
```

## Required interaction result

```js
{
  activationId,
  source,
  requestedMode,
  status: "accepted" | "rejected" | "no-op",
  reason,
  resolverDecisionId,
  selectedCandidateId,
  targetUrl
}
```

## Admission rules

- `new` is accepted without consuming a candidate.
- `continue` is accepted only when the resolver selected a resumable candidate.
- repeated activation during an active transition is a typed no-op.
- unsupported actions are rejected.
- candidate changes after menu construction require an explicit refresh or new resolver generation, not hidden rescans.
- the campaign must validate that the route admission and candidate decision agree before committing startup.

## Diagnostic boundary

`window.PhantomMenu.getState()` should expose a clone-safe admission projection rather than only `hasSave` and `transitionTarget`. It must not expose raw storage values.
