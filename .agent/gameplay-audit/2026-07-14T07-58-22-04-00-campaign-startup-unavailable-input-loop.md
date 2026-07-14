# Campaign Startup Unavailable Input Loop

**Timestamp:** `2026-07-14T07-58-22-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`

## Summary

Campaign interaction is installed only after all top-level rendering prerequisites succeed. When startup fails, the route has no gameplay-readiness result, no independent return path and no distinction between loading, unavailable and failed.

## Plan ledger

**Goal:** prevent campaign commands from existing before the current campaign startup generation is accepted, while preserving a usable fallback route when startup cannot complete.

- [x] Trace campaign state creation, input listener installation, RAF publication and `GameHost` publication.
- [x] Identify the lack of campaign startup phases and command admission state.
- [x] Identify the static-only assistive fallback.
- [x] Define accepted, unavailable and failed gameplay startup outcomes.
- [ ] Implement command gating and fallback controls later.

## Current loop

```txt
game.html loads
  -> static instructions announce expected controls
  -> campaign module evaluates
  -> rendering prerequisites are acquired
  -> authored campaign state is constructed
  -> input listeners are attached
  -> RAF is requested
  -> GameHost is published

failure before listener/host publication
  -> instructions still describe a game that is not operational
  -> no command surface is available
  -> no return-to-menu control is independently installed
  -> no retry command exists
  -> no gameplay startup result can be inspected
```

## Gameplay readiness gaps

```txt
campaign session ID: implicit
startup attempt ID: absent
campaign state candidate: not separated from live state
input admission revision: absent
first accepted simulation tick: unacknowledged
first accepted render frame: unacknowledged
unavailable state: absent
failed state: absent
retry state: absent
return-to-menu fallback: absent
public startup result: absent
```

## Required gameplay contract

```txt
CampaignStartupResult
  -> binds startup attempt and campaign session
  -> reports authored-state preparation
  -> reports input-listener readiness
  -> reports simulation readiness
  -> reports source/CRT presentation readiness
  -> admits commands only after acceptance
  -> exposes unavailable or failed status otherwise
```

## Target loop

```txt
campaign startup begins
  -> fallback shell remains usable
  -> campaign candidate prepares
  -> rendering and first-tick probes run
  -> input leases remain unpublished

accepted
  -> adopt campaign state and input leases
  -> publish GameHost
  -> publish first tick and frame acknowledgements

failed
  -> dispose candidates
  -> retain fallback shell
  -> expose retry and return-to-menu
```

## Validation boundary

No gameplay, input, campaign-state or route behavior changed.