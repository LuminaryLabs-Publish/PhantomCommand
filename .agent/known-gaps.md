# PhantomCommand Known Gaps

**Timestamp:** `2026-07-11T07-38-25-04-00`

## Summary

PhantomCommand still lacks four connected authority gates. The second gate now has a more precise blocker: campaign phase is not an enforceable mutation barrier, so paused and terminal sessions continue to accept direct gameplay actions.

## Plan ledger

**Goal:** keep unresolved risks explicit and ordered by dependency.

- [ ] Continue/save-candidate resolution.
- [ ] Campaign command, phase-admission and fixed-step action-result authority.
- [ ] Runtime session lifecycle authority.
- [ ] Versioned checkpoint capture and atomic resume authority.
- [ ] Committed-frame and first-frame acknowledgements.
- [ ] Broader content and visual work only after these gates.

## Gate 1: Continue resolution gaps

```txt
three keys x two storage layers collapse to Boolean presence
candidate parse/schema/version/content/provenance is discarded
candidate precedence is undefined
campaign ignores campaign=new|continue
candidate identity is not carried into startup
```

## Gate 2: Campaign action and phase gaps

### Direct mutation

```txt
pointer, keyboard and GameHost mutate live state
no command identity, sequence or target tick
invalid requests silently return
no typed result or stable reason catalog
no replay journal or canonical fingerprint
```

### Phase authority

```txt
paused/won/lost are independent Boolean flags
no canonical CampaignPhase
no legal transition table
no phase sequence or transition result
no command-to-phase admission matrix
no stale observed-phase rejection
```

### Paused mutation

```txt
update() returns while paused
selectAt() remains admitted
build() remains admitted
order() remains admitted
startWave() does not check paused
camera continues updating in RAF
held/drag input is not retired on pause entry
```

### Terminal mutation

```txt
update() returns when won or lost
selection/build/order callbacks remain active
camera still mutates
terminal state is not immutable
restart/exit bypass typed lifecycle authority
```

### Render proof

```txt
world/HUD/minimap/overlay read live mutable state
no committed frame identity
no phase sequence on render input
overlay can claim PAUSED/WON/LOST while underlying state changes
CRT upload/draw returns no phase/frame acknowledgement
```

## Gate 3: Lifecycle gaps

```txt
menu and campaign allocate at module scope
RAF request IDs are discarded
anonymous listeners have no deterministic removal
no sessionId, runId or runGeneration
no startup rollback
no audio or CRT resource owner
navigation/reload bypass typed transition and teardown
no lifecycle journal or clone-safe observation
```

## Gate 4: Checkpoint and resume gaps

```txt
victory writes only { scene, souls, wave }
no schema/content identity/checkpoint ID/fingerprint
no committed tick or command cursor
no full entity graph or identity counters
no load path, migration, staged hydration or reference rebuild
no atomic commit, rollback or resume epoch
no phase invariant validation
no first resumed-frame acknowledgement
```

## Validation gaps

```txt
current checks are source-pattern checks
no candidate precedence fixture
no command/replay fixture
no phase transition fixture
no paused/terminal mutation fixture
no source-parity fixture
no phase/frame correlation fixture
no lifecycle fixture
no checkpoint roundtrip/migration/corruption/rollback fixture
no browser Continue or phase smoke
```

## Do not claim

Do not claim Continue works, pause freezes authoritative state, terminal state is immutable, GameHost obeys campaign phase, fixed-step commands are deterministic, restart is lifecycle-safe, checkpoint resume works or rendered overlays prove committed phase until the corresponding fixtures and browser smoke pass on `main`.