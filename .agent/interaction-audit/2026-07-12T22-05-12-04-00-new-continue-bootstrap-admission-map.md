# New and Continue Bootstrap Admission Map

**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Timestamp:** `2026-07-12T22-05-12-04-00`

## Summary

New and Continue currently converge on module evaluation rather than a command boundary. This map defines the required interaction from menu selection through route intent, storage admission, candidate construction, atomic commit and visible result.

## Plan ledger

**Goal:** make every menu entry action produce one explicit bootstrap command and one terminal result before gameplay starts.

- [x] Map menu pointer, keyboard and hidden-button activation.
- [x] Map fade and navigation.
- [x] Map campaign module initialization.
- [x] Map storage presence and save write surfaces.
- [x] Define command/result and rejection paths.
- [ ] Implement the interaction later.

## Current map

```txt
pointer | keyboard | hidden HTML button
  -> activateMain(item)

new
  -> beginTransition(game.html?campaign=new)

continue
  -> enabled from raw storage truthiness
  -> beginTransition(game.html?campaign=continue)

fade timer
  -> location.href = target

campaign module evaluation
  -> no route-intent parse
  -> no storage read
  -> direct mutable state construction
  -> listeners + RAF + GameHost
```

## Required map

```txt
MenuActionCommand
  -> validate menu surface, action and ContinueAvailabilityResult
  -> create CampaignBootstrapCommand(entryIntent)
  -> persist command identity across navigation

campaign route boot
  -> admit runtime session and route
  -> parse exactly one entry intent
  -> reject missing/unknown/duplicate intent

new
  -> construct FreshCandidate from NewRunPreset

continue
  -> read canonical slot
  -> validate/migrate/hydrate RestoredCandidate

candidate
  -> validate participant manifest and cross-domain invariants
  -> atomically install successor generation
  -> publish CampaignBootstrapResult

result
  -> success: start simulation and render successor
  -> failure: show typed menu/route feedback with zero gameplay mutation
  -> acknowledge first visible matching frame
```

## Command envelope

```txt
CampaignBootstrapCommand {
  commandId
  source: menu | public-host | test
  runtimeSessionId
  routeRevision
  entryIntent: new | continue
  expectedCheckpointId | null
  expectedCheckpointRevision | null
  expectedSourceFingerprint
}
```

## Terminal result

```txt
CampaignBootstrapResult {
  commandId
  kind
  predecessorRunGeneration | null
  successorRunGeneration | null
  checkpointId | null
  checkpointRevision | null
  stateFingerprint | null
  rejectionReason | null
  rolledBack
}
```

## Rejection behavior

```txt
Continue unavailable: remain outside gameplay
malformed checkpoint: remain outside gameplay
unsupported version: remain outside gameplay
incompatible source: remain outside gameplay
invariant failure: remain outside gameplay
stale/duplicate command: zero mutation
candidate commit failure: verified rollback or terminal failure
```

## Validation boundary

No menu, routing, campaign or storage interaction changed. No command-admission fixture was run.