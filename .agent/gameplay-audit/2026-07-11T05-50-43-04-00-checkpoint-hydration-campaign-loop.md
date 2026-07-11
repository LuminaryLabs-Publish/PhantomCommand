# Checkpoint Hydration Campaign Loop

**Timestamp:** `2026-07-11T05-50-43-04-00`

## Summary

The campaign currently has one construction path: create a fresh mutable singleton. Continue cannot resume because there is no staged hydration path and no way to rebuild the entity graph while preserving gameplay invariants.

## Plan ledger

**Goal:** map the exact gameplay state that must be captured, reconstructed and validated for an atomic campaign resume.

- [x] Trace fresh campaign construction.
- [x] Trace victory summary persistence.
- [x] Classify durable and transient state.
- [x] Identify ID and reference invariants.
- [x] Define staged hydration order.
- [x] Define rollback behavior.
- [ ] Implement after fixed-step action authority.

## Current loop

```txt
module load
  -> create pad descriptors
  -> initialize uid/pid/tid
  -> create default camera and input
  -> create default campaign state
  -> spawn six starter allies
  -> run gameplay
  -> on victory write scene/souls/wave summary
```

`campaign=continue` does not alter this path.

## Required hydration order

```txt
1. validate envelope schema/content/fingerprint
2. stage scalar state and terminal flags
3. stage units and towers by ID
4. stage pads and restore tower ownership
5. stage spawn queue and projectiles
6. restore selection and selected pad after reference validation
7. restore deterministic ID counters
8. restore camera continuity if requested
9. reset input, drag state, last wall time and accumulator
10. validate complete staged graph
11. commit new resume epoch atomically
12. publish first-frame proof
```

## Durable gameplay state

```txt
time, tick and command sequence
souls and core
wave and waveActive
spawn queue
units and their action/target/move/cooldown/animation state
towers and cooldown/frame state
projectiles and target references
pad-to-tower ownership
selected unit IDs and selectedPad
towerType
paused/won/lost/message
uid/pid/tid
```

Effects may be classified as presentation-transient and discarded, or included only when exact visual continuity is required. That choice must be explicit in the schema.

## Invalid resume cases

```txt
unknown content identity
unsupported schema version
fingerprint mismatch
duplicate entity ID
pad references missing tower
selected ID references missing/non-player unit
projectile references missing target
wave index outside content bounds
spawn row uses unknown archetype or lane
counter would collide with restored ID
won and lost both true
waveActive conflicts with terminal state
```

Every invalid case must return a typed rejection and leave the active session untouched.
