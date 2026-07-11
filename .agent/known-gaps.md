# PhantomCommand Known Gaps

**Timestamp:** `2026-07-11T09-40-19-04-00`

## Summary

PhantomCommand still lacks four connected authority gates. The campaign-action gate now has an earlier coordinate blocker: the CRT display and pointer mapper do not use the same projection, so visually equivalent inputs can resolve to different source and world coordinates.

## Plan ledger

**Goal:** keep unresolved risks explicit and ordered by dependency.

- [ ] Continue/save-candidate resolution.
- [ ] CRT display/input projection parity.
- [ ] Campaign command, phase-admission and fixed-step action-result authority.
- [ ] Runtime session lifecycle authority.
- [ ] Versioned checkpoint capture and atomic resume authority.
- [ ] Committed-frame and first-frame acknowledgements.

## Gate 1: Continue resolution gaps

```txt
three keys x two storage layers collapse to Boolean presence
candidate parse/schema/version/content/provenance is discarded
candidate precedence is undefined
campaign ignores campaign=new|continue
candidate identity is not carried into startup
```

## Gate 2a: Projection gaps

### CRT display mismatch

```txt
shader render path: containUv -> curveUv -> source sample
pointer path: contain correction -> source coordinate
screenToSource does not apply CRT curvature
menu and campaign both consume the mismatched result
error increases toward display edges
```

### Containment and boundary mismatch

```txt
pointer inside flag covers the uncurved contained UV
shader may curve that UV outside the source and draw black
no typed outside-letterbox/outside-source/curved-out reason
no transform revision across resize or settings changes
```

### Campaign world projection

```txt
click/order/wheel anchor depend on mismatched source coordinates
screenToWorld returns no projection identity or result
pointer commands carry no source coordinate provenance
```

### Drag selection

```txt
visual source rectangle is inverse-projected with two corners only
screen rectangle maps to a world parallelogram, not a world AABB
selection can include visually outside allies or omit visible allies
no visual-selection parity fixture exists
```

### Projection observation

```txt
no PresentationTransform descriptor
no projection revision or fingerprint
no CPU/GLSL parity proof
no source/world projection journal
no frame-to-pointer transform correlation
```

## Gate 2b/2c: Campaign action and phase gaps

```txt
pointer, keyboard and GameHost mutate live state
no command identity, sequence or target tick
invalid requests silently return
paused/won/lost are independent Boolean flags
no command-to-phase admission matrix
camera and gameplay mutation continue outside active simulation
world/HUD/minimap/overlay read live mutable state
no committed frame identity or CRT acknowledgement
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
```

## Gate 4: Checkpoint and resume gaps

```txt
victory writes only { scene, souls, wave }
no schema/content identity/checkpoint ID/fingerprint
no committed tick or command cursor
no full entity graph or identity counters
no load path, migration, staged hydration or reference rebuild
no atomic commit, rollback or resume epoch
no first resumed-frame acknowledgement
```

## Validation gaps

```txt
current checks are source-pattern checks
no CPU/GLSL projection parity fixture
no pointer roundtrip fixture
no aspect-ratio boundary fixture
no wheel-anchor fixture
no drag-selection visual parity fixture
no candidate precedence fixture
no command/replay or phase fixture
no lifecycle fixture
no checkpoint roundtrip/migration/corruption/rollback fixture
no browser pointer, Continue or phase smoke
```

## Do not claim

Do not claim that visible pointer targets are exact under CRT curvature, drag selection matches the drawn rectangle, wheel zoom remains visually anchored, Continue works, pause freezes authoritative state, terminal state is immutable, fixed-step commands are deterministic, restart is lifecycle-safe or checkpoint resume works until the corresponding fixtures and browser smoke pass on `main`.