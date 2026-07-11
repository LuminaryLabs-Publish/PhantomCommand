# Versioned Checkpoint and Resume DSK Map

**Timestamp:** `2026-07-11T05-50-43-04-00`

## Summary

PhantomCommand needs a persistence parent domain that captures campaign state only at a committed fixed-step boundary, validates and migrates candidates before mutation, hydrates into a staged session, then atomically publishes a new resume epoch.

## Plan ledger

**Goal:** define the DSK composition required for complete, versioned and rollback-safe campaign resume without absorbing menu candidate resolution, gameplay rules, rendering or browser lifecycle ownership.

- [x] Separate candidate discovery from checkpoint semantics.
- [x] Separate checkpoint capture from browser storage.
- [x] Separate staged hydration from live-session commit.
- [x] Define durable and transient state.
- [x] Define relational validation.
- [x] Define resume epoch and first-frame proof.
- [x] Define fixtures and deployment gate.
- [ ] Implement after Continue, action and lifecycle authority gates.

## Parent domain

```txt
phantom-command-campaign-checkpoint-domain
```

Owns:

```txt
checkpoint admission at a committed simulation tick
schema and content identity
canonical payload capture
state fingerprint
candidate parsing and compatibility result
migration registry
invariant validation
staged hydration
reference/index rebuilding
atomic resume commit and rollback
resume epoch
storage adapter contract
resume result and bounded journal
first-frame resume acknowledgement
roundtrip/corruption fixtures
```

Does not own:

```txt
storage candidate precedence
menu visuals
campaign action rules
fixed-step command ordering
runtime resource disposal
world drawing or CRT shader behavior
```

## DSK breakdown

| Kit | Inputs | Outputs | Services |
|---|---|---|---|
| `checkpoint-boundary-kit` | simulation tick, pending command count | admission result | allow capture only after a committed tick |
| `save-schema-version-kit` | current schema | schema descriptor | identify format and supported versions |
| `campaign-content-identity-kit` | ring/lane/pad/archetype/wave descriptors | content identity | hash campaign-compatible content |
| `checkpoint-envelope-kit` | metadata, payload, fingerprint | immutable envelope | encode/decode canonical checkpoint |
| `checkpoint-capture-kit` | committed campaign state | detached payload | clone durable state without browser owners |
| `checkpoint-fingerprint-kit` | canonical payload | fingerprint | stable integrity and roundtrip comparison |
| `save-admission-kit` | raw candidate, expected schema/content | typed result | parse, reject or accept candidate |
| `save-migration-registry-kit` | older envelope | migrated envelope/result | deterministic version migration |
| `checkpoint-invariant-kit` | staged payload and descriptors | validation report | enforce relational and range invariants |
| `hydration-stage-kit` | validated checkpoint | staged state graph | build maps, arrays, counters and references off-line |
| `reference-rebuild-kit` | staged entities and IDs | rebuilt indexes | reconnect pad, selection, target and projectile references |
| `atomic-resume-transaction-kit` | active session, staged session | commit result | swap only after all validation passes |
| `resume-rollback-kit` | failed stage/commit | rollback report | leave prior session unchanged |
| `resume-epoch-kit` | session identity, checkpoint fingerprint | resume epoch | fence stale input, RAF and observations |
| `storage-adapter-kit` | key, envelope | storage result | read/write/remove without defining save semantics |
| `resume-result-kit` | admission/migration/hydration/commit outcome | typed result | accepted, rejected, migrated, committed or failed |
| `resume-journal-kit` | result rows | bounded detached journal | retain proof without live references |
| `first-frame-resume-ack-kit` | resume epoch, checkpoint fingerprint, frame | frame acknowledgement | prove first rendered frame consumed resumed state |
| `roundtrip-fixture-kit` | deterministic scenarios | proof report | save/load equality, corruption and rollback cases |

## Durable checkpoint payload

```txt
simulation:
  tick, time, command sequence cursor

economy/progression:
  souls, core, wave, waveActive

world state:
  spawn queue, units, towers, projectiles, pad tower ownership

identity:
  uid, pid, tid counters

interaction/presentation continuity:
  selected unit IDs, selectedPad, towerType, camera x/z/zoom/targetZoom

terminal state:
  paused, won, lost, message
```

Transient state that must be reconstructed or reset:

```txt
DOM nodes and canvas contexts
WebGL/CRT resources
AudioContext and audio nodes
listeners, timers and RAF IDs
keyboard/pointer/drag/middle-button state
wall-clock last timestamp
fixed-step accumulator remainder
```

## Required invariants

```txt
checkpoint capture occurs at a committed tick
schema and content identity are explicit
fingerprint covers canonical authoritative payload
all IDs are unique
pad tower IDs resolve to restored towers
selected IDs resolve to live player units
projectile targets resolve to live units
spawn rows are ordered and valid for the active wave
uid/pid/tid exceed all restored IDs
terminal flags are mutually consistent
failed validation or hydration cannot mutate the active session
resume publishes a new epoch before input/render admission
first rendered frame acknowledges the new epoch and checkpoint fingerprint
```
