# PhantomCommand Known Gaps

**Timestamp:** `2026-07-12T01-20-00-04-00`

## Summary

The newest gap is CRT display/input projection. The visible shader applies containment plus radial curvature, while CPU pointer mapping applies containment only. Menu and campaign interactions can therefore target semantic coordinates different from the displayed pixels, and campaign input can mutate state from black border regions.

## Plan ledger

**Goal:** keep unresolved risks dependency ordered and fixture bounded.

- [ ] Continue candidate resolution and startup admission.
- [ ] Public host owner quarantine and typed command admission.
- [ ] Display/input projection parity and outside-region admission.
- [ ] Campaign phase admission.
- [ ] Fixed-step command scheduling and committed frame.
- [ ] Public host committed read model.
- [ ] Deterministic combat and exclusive terminal result.
- [ ] Runtime session lifecycle, teardown and restart.
- [ ] Versioned checkpoint capture, migration and atomic resume.

## Projection gaps

```txt
GLSL applies contain then curve
CPU screenToSource applies contain only
CPU mapper has no CRT settings input
menu CRT toggle changes display mapping only
campaign always renders with CRT enabled
campaign handlers ignore mapping inside flag
post-curve black regions can be CPU-inside
letterbox/pillarbox coordinates can issue campaign actions
no semantic sample policy for chromatic aberration
no projection ID or revision
no output/source surface revision
no CRT settings revision
no pointer sample or mapping result ID
no stale resize/settings rejection
no camera revision on world-target derivation
no projection frame receipt
no CPU/GLSL parity fixture
no browser pixel-pick fixture
```

## Public host gaps

```txt
window.GameHost exposes live state and camera
public callers bypass command and phase admission
startWave, build and setZoom return no typed result
setZoom accepts NaN
getState has no run, simulation or frame provenance
no capability descriptor, command ID or bounded journal
no stale-host rejection after navigation/disposal
window.PhantomMenu has no session identity or teardown fence
```

## Continue and checkpoint gaps

```txt
three save keys are accepted by presence only
localStorage and sessionStorage have no source precedence
candidate bytes are not parsed before Continue enablement
campaign query intent is not parsed
campaign startup always creates fresh defaults
current save is a legacy terminal summary only
no schema, migration, quarantine, rollback or first resumed-frame receipt
```

## Existing downstream gaps

```txt
Commands: browser callbacks mutate live state
Clock: commands are outside fixed-step scheduling
Combat: deleted captured entities can still act
Terminal: won and lost can both commit
Lifecycle: module-owned RAF, listeners, audio, WebGL and globals lack teardown
Checkpoint capture: no stable-boundary or full-state policy
```

## Validation gaps

```txt
no CPU/GLSL projection parity fixture
no black-border admission fixture
no menu/campaign pixel-pick smoke
no projection/frame receipt fixture
no public owner-isolation fixture
no host command-admission fixture
no save-candidate precedence fixture
no atomic hydration rollback fixture
no browser lifecycle smoke
```

## Do not claim

Do not claim projection parity, pointer accuracy, outside-region rejection, command safety, Continue, checkpoint compatibility, terminal integrity or lifecycle correctness until the corresponding fixtures pass on `main`.