# PhantomCommand Construct Result Bootstrap Blocker

**Timestamp:** `2026-07-08T18-29-21-04-00`

## Current gameplay loop

```txt
open menu
  -> enter game.html
  -> watch construct assemble
  -> pan / zoom
  -> skip / restart
  -> reach phase command online
```

The current gameplay loop is intentionally narrow. It is a construct-viewer and presentation proof, not yet the undead RTS command loop described in the design docs.

## Current gap

The moment where `phase === "command online"` is visual/HUD state only.

It is not yet a typed gameplay result.

Missing result layer:

```txt
ConstructEventEnvelope
ConstructEventResult
ConstructEventJournal
ConstructSnapshot
ScenarioBootstrapCommand
ScenarioBootstrapResult
ScenarioBootstrapSnapshot
```

## Blocking rule

Scenario bootstrap must remain blocked until the source-profile fixture proves the live construct source.

The target blocker rule is:

```txt
if sourceProfileParity.status !== "passed":
  reject scenario bootstrap with source_profile_unproven

if construct result does not include construct_complete:
  reject scenario bootstrap with construct_incomplete

if scenario already bootstrapped:
  reject scenario bootstrap with duplicate_scenario_bootstrap
```

## Gameplay acceptance rows for the next source pass

```txt
construct_complete_is_not_emitted_by_visual_phase_alone
construct_complete_requires_sourceProfile_parity_passed
scenario_bootstrap_rejects_when_source_profile_unproven
scenario_bootstrap_rejects_when_construct_incomplete
scenario_bootstrap_rejects_duplicate_bootstrap
legacy_construct_viewer_loop_still_runs
```

## Do not add yet

```txt
- unit selection
- unit movement
- necropolis construction
- resource economy
- enemy wave spawning
- objective chains
- progression rewards
- pathfinding
- combat
```

## Next ledge dependency

```txt
Source Profile Fixture Row Acceptance + GameHost Readback Gate
  -> ConstructEventResult
  -> ScenarioBootstrapResult
  -> first RTS slice
```