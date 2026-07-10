# Resume State Coverage Matrix

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Timestamp:** `2026-07-10T17-08-36-04-00`

## Current saved coverage

| State family | Current victory payload | Required for resumable envelope |
|---|---:|---:|
| Scene identity | Partial: `scene` | Yes, versioned and validated |
| Souls | Yes | Yes |
| Wave index | Yes | Yes |
| Core health | No | Yes |
| Wave active | No | Yes |
| Pending spawn queue | No | Yes |
| Units | No | Yes |
| Towers | No | Yes |
| Pad occupancy | No | Yes |
| Projectiles | No | Policy required |
| Effects | No | Policy required |
| Selection | No | Policy required |
| Tower type | No | Yes |
| Camera | No | Yes or explicit reset policy |
| Pause/win/loss/message | No | Yes |
| UID/PID/TID counters | No | Yes |
| Simulation tick | No | Yes |
| Accumulator | No | Explicit persist-or-reset policy |
| Command sequence | No | Yes before command journaling |
| Schema/version | No | Yes |
| Source revision | No | Yes |
| Checksum | No | Yes |
| State fingerprint | No | Yes |

## Entity coverage

A resumable unit row must retain every field that can affect the next simulation step:

```txt
id
type
team
position
health and max health
speed, damage, range, rate, size
cooldown
frame and animation time
action
target
move target
selection
lane and archetype-specific values
```

A resumable tower row must retain identity, type, position, cooldown, index, and occupied pad relationship. The next `tid` must remain collision-free.

## Queue and counter coverage

```txt
spawn queue item type, remaining time, and lane
uid next value
pid next value
tid next value
simulation tick
command sequence
```

Without these fields, a visually similar hydrated state can diverge immediately or reuse identifiers.

## Transient-state policy

Pointer position, pressed keys, drag rectangle, middle-button state, and browser event state should normally reset on hydration. That reset must be documented and excluded from the authoritative fingerprint. Camera and accumulator behavior require explicit policy because they affect the immediate resumed experience and simulation timing.

## Fidelity rule

Resume fidelity is defined by authoritative-state fingerprint equality plus deterministic continuity across the next fixed step. It is not defined by matching only visible resources or wave number.
