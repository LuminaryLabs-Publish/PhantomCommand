# Campaign Phase Admission DSK Map

**Timestamp:** `2026-07-11T07-38-25-04-00`

## Summary

PhantomCommand has a fixed-step simulation but no authoritative campaign phase. Boolean flags stop simulation updates while browser callbacks continue mutating the same state graph. Phase admission belongs inside the planned campaign action-authority boundary.

## Plan ledger

**Goal:** define the domain and service-kit boundary that turns pause, terminal and transition states into enforceable command-admission phases.

- [x] Map current flag ownership and direct mutation paths.
- [x] Separate presentation overlays from authoritative phases.
- [x] Define phase transitions and command admission services.
- [x] Define typed outcomes and observation.
- [x] Keep this boundary subordinate to fixed-step action authority.
- [ ] Implement the DSKs.
- [ ] Prove deterministic behavior with fixtures.

## Current architecture

```txt
keydown/pointer/wheel/GameHost callback
  -> direct state or camera mutation

frame()
  -> camera mutation always
  -> accumulator
  -> update(1/60)
       -> return early when paused/won/lost
  -> render mutable state
  -> draw overlay from paused/won/lost flags
  -> CRT draw
```

`paused`, `won` and `lost` are currently scalar flags in `state`. They do not own an admission matrix, transition result, event journal, epoch or frame identity.

## Proposed parent domain

```txt
phantom-command-campaign-phase-authority-domain
```

Owns:

```txt
phase identity
legal phase transitions
command-to-phase admission matrix
phase transition sequence
rejection and idempotency reasons
input retirement on phase changes
phase event journal
clone-safe observation
phase/frame correlation
```

Does not own:

```txt
DOM listeners
raw pointer/keyboard normalization
combat simulation
camera transform math
render implementation
route navigation implementation
checkpoint serialization
```

## Candidate DSKs

| Kit | Services |
|---|---|
| `phantom-command-campaign-phase-kit` | Define `BOOTING`, `ACTIVE`, `PAUSED`, `WON`, `LOST`, `TRANSITIONING`, `DISPOSED`; validate phase values; expose detached snapshots |
| `phantom-command-phase-transition-kit` | Preflight and commit legal transitions; assign transition ID and sequence; return typed result |
| `phantom-command-phase-admission-matrix-kit` | Declare which command kinds are allowed, rejected or idempotent in every phase |
| `phantom-command-phase-command-preflight-kit` | Validate session, run, phase, source, command kind and target tick without mutation |
| `phantom-command-phase-reason-catalog-kit` | Stable reasons such as `PAUSED_GAMEPLAY_BLOCKED`, `TERMINAL_STATE_LOCKED`, `TRANSITION_IN_PROGRESS`, `SESSION_DISPOSED` |
| `phantom-command-paused-input-retirement-kit` | Clear held movement, drag and middle-pan state when entering pause or terminal phases |
| `phantom-command-terminal-mutation-barrier-kit` | Reject selection/build/order/wave mutations after win or loss |
| `phantom-command-phase-result-kit` | Return accepted, rejected, no-op and duplicate outcomes with before/after phase |
| `phantom-command-phase-event-journal-kit` | Record bounded ordered phase and rejected-command events |
| `phantom-command-phase-frame-correlation-kit` | Bind committed phase sequence and state fingerprint to world/HUD/minimap/overlay/CRT consumption |
| `phantom-command-phase-observation-kit` | Publish clone-safe phase, last transition, last rejection and journal metadata |
| `phantom-command-phase-admission-fixture-kit` | Exercise the complete phase/command matrix and frame proof |

## Required admission matrix

| Command family | ACTIVE | PAUSED | WON/LOST | TRANSITIONING | DISPOSED |
|---|---:|---:|---:|---:|---:|
| select | allow | reject | reject | reject | reject |
| build | allow | reject | reject | reject | reject |
| order | allow | reject | reject | reject | reject |
| start wave | allow with gameplay preflight | reject | reject | reject | reject |
| pause | transition to PAUSED | idempotent/reject duplicate | reject | reject | reject |
| resume | reject/no-op | transition to ACTIVE | reject | reject | reject |
| camera pan/zoom | policy decision, explicit | policy decision, explicit | presentation-only policy | reject | reject |
| restart/exit | typed lifecycle command | typed lifecycle command | typed lifecycle command | idempotent/reject duplicate | reject |

## Dependency placement

```txt
Continue candidate resolution
  -> campaign action command envelope
  -> campaign phase authority and admission matrix
  -> fixed-step command queue/application
  -> committed state/frame fingerprint
  -> lifecycle ownership
  -> versioned checkpoint/resume
```

Phase must be part of command preflight. It should not be implemented as more callback-local `if` statements.

## Proof requirements

```txt
same command + same phase + same state -> same typed result
rejected commands do not mutate authoritative state
pause entry retires held and drag input
terminal entry blocks all gameplay mutation
phase sequence is monotonic
rendered overlay and committed phase share one frame identity
GameHost cannot bypass phase admission
```