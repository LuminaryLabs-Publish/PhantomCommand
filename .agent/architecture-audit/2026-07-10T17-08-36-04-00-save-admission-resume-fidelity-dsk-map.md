# Save Admission and Resume Fidelity DSK Map

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Timestamp:** `2026-07-10T17-08-36-04-00`

## Current architecture

```txt
menu-save-presence-kit
  -> searches three keys in two storage layers
  -> returns Boolean presence
  -> enables Continue
  -> emits game.html?campaign=continue

pixel-campaign-runtime-kit
  -> ignores query intent
  -> reads no save candidate
  -> constructs fresh descriptors and state
  -> owns input, mutation, simulation, rendering, and persistence inline
  -> writes victory completion summary
```

## Current domain boundary problem

```txt
candidate discovery is treated as candidate admission
candidate admission is treated as resumability
completion summary is stored under the primary campaign key
session creation and session hydration are not separate operations
runtime state has no serializable authority boundary
```

## Proposed DSK composition

```txt
phantom-command-save-candidate-registry-kit
  -> phantom-command-save-classifier-kit
  -> phantom-command-campaign-session-mode-kit
  -> phantom-command-save-envelope-kit
  -> phantom-command-session-state-snapshot-kit
  -> phantom-command-save-hydration-kit
  -> phantom-command-session-fingerprint-kit
  -> phantom-command-resume-result-kit
  -> phantom-command-gamehost-session-readback-kit
  -> phantom-command-save-admission-fixture-kit
  -> phantom-command-resume-fidelity-fixture-kit
  -> phantom-command-build-fixture-gate-kit
```

## Kit responsibilities

### Save candidate registry

```txt
key
storage layer
schema family
source owner
priority
adapter availability
```

### Save classifier

```txt
absent
invalid-json
foreign-schema
legacy-completion-summary
resumable-current
resumable-migrated
unsupported-version
checksum-failed
```

### Save envelope

```txt
schema and version
source revision
scene and session identity
saved-at time
simulation and command high-water marks
entity/tower/projectile/effect state
resource/core/wave state
identifier counters
camera and selection state
checksum
```

### Hydration result

```txt
created
hydrated
migrated
rejected
fallback-new
```

### Resume fidelity

```txt
serialize source state
compute stable fingerprint
hydrate into a fresh state factory
compute hydrated fingerprint
assert equality
advance one deterministic fixed step
assert identifier and simulation continuity
```

## Compatibility rules

- Keep `game.html?campaign=new|continue` routes.
- Keep existing menu, visuals, controls, and gameplay constants.
- Keep legacy `window.GameHost` fields available.
- Add immutable diagnostics; do not add new mutable references.
- Classify the existing `{ scene, souls, wave }` payload as a legacy completion summary.
- Reject cross-engine candidates until an explicit adapter proves compatibility.

## Sequencing

Complete save admission and resume fidelity before implementing the planned command journal. The command system should inherit a stable `sessionId`, source revision, and hydrated command sequence rather than inventing authority on top of an undefined continuation state.
