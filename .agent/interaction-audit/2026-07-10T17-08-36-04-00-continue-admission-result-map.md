# Continue Admission Result Map

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Timestamp:** `2026-07-10T17-08-36-04-00`

## Current interaction

```txt
raw candidate exists
  -> Continue enabled
  -> user activates Continue
  -> transition to game.html?campaign=continue
  -> no acknowledgement of candidate identity or validity
  -> fresh campaign starts
```

## Required admission result

```txt
{
  requestedMode,
  continueEnabled,
  selectedCandidate,
  candidates,
  status,
  reason,
  storageLayer,
  key,
  schemaFamily,
  schemaVersion,
  migrationRequired
}
```

## Candidate result matrix

```txt
no value
  -> absent
  -> Continue disabled

malformed JSON
  -> invalid-json
  -> Continue disabled

nexus.sceneSnapshot without adapter
  -> foreign-schema
  -> Continue disabled

phantom.command.campaign without adapter
  -> foreign-schema
  -> Continue disabled

{ scene, souls, wave } victory payload
  -> legacy-completion-summary
  -> Continue disabled

current verified full-state envelope
  -> resumable-current
  -> Continue enabled

supported older envelope with migration
  -> resumable-migrated
  -> Continue enabled

unsupported version or checksum failure
  -> rejected
  -> Continue disabled
```

## UI compatibility

The visible menu can remain unchanged. The behavior change is authoritative admission: the Continue item should reflect the classifier result rather than raw storage presence. `PhantomMenu.getState()` should expose the selected result for tests and diagnostics.

## Failure behavior

If storage changes between menu admission and campaign load, the campaign must revalidate the selected candidate. A failed second validation must return a typed rejection or deterministic fallback-new result and must not partially hydrate state.
