# PhantomCommand Known Gaps

**Timestamp:** `2026-07-11T15-08-41-04-00`

## Summary

PhantomCommand still lacks connected startup, projection, command, phase, fixed-step, terminal, lifecycle and checkpoint authority gates. The first blocker is Continue: six possible storage slots collapse to raw Boolean presence, malformed data can enable the menu item, candidate precedence is absent, and the campaign ignores the requested startup mode.

## Plan ledger

**Goal:** keep unresolved risks explicit, source-backed and ordered by dependency.

- [ ] Continue save-candidate resolution and campaign-startup admission.
- [ ] CRT display/input projection parity.
- [ ] Campaign command and phase admission.
- [ ] Fixed-step command scheduling, clock-overrun and replay authority.
- [ ] Committed-tick and render-frame authority.
- [ ] Exclusive terminal-outcome arbitration and persistence admission.
- [ ] Runtime session lifecycle authority.
- [ ] Versioned checkpoint capture and atomic resume authority.

## Gate 1: Continue capability gaps

### Slot reads

```txt
three key names x two storage layers create six possible slots
slot identity is discarded
storage-layer identity is discarded
one storage exception returns false for the whole scan
read failures are not distinguished from no save
local truthy data hides same-key session data
```

### Candidate parsing and classification

```txt
raw strings are never parsed
malformed JSON enables Continue
"null" and empty objects enable Continue
schema version is absent
content revision is absent
candidate kind is absent
legacy and current formats are not distinguished
required fields are not validated
state fingerprints are absent
```

### Candidate precedence

```txt
no candidate object survives hasCampaignSave()
no versioned ranking policy
no newest-checkpoint rule
no committed-checkpoint-over-summary rule
no valid-lower-slot fallback after invalid higher slot
no deterministic tie-breaker
no candidate resolution ID or journal
```

### Menu capability projection

```txt
Continue is based on Boolean raw presence
hasCampaignSave() is called twice during menu construction
BOUND does not mean parseable or resumable
no disabled reason is exposed
window.PhantomMenu reports only hasSave Boolean
```

### Campaign startup

```txt
campaign=new and campaign=continue change only the URL
campaign-scene.js does not read location.search
no candidate identity crosses navigation
no candidate revalidation at startup
no staged hydration
no atomic startup commit or rollback
Begin does not explicitly reject existing candidates
Continue always constructs default state
```

### Current victory write

```txt
phantomCommand.save contains only scene, souls and wave
no schema version or checkpoint ID
no content identity or campaign revision
no run, tick, command cursor or terminal result identity
no entity graph, towers, units, core, camera or counters
no fingerprint or write result
```

## Gate 2a: Projection gaps

```txt
shader uses containUv then curveUv
pointer uses contain correction only
no transform revision or typed rejection reason
click, order and wheel anchor use mismatched coordinates
drag selection uses a two-corner world AABB instead of visual inclusion
```

## Gate 2b: Command and phase gaps

```txt
pointer, keyboard and GameHost mutate live state
no command identity, source, sequence or target tick
invalid requests silently return
paused, won and lost are independent Boolean flags
no command-to-phase admission matrix
no typed command result or bounded journal
```

## Gate 2c: Fixed-step, clock and replay gaps

```txt
commands apply in browser callbacks rather than a fixed-step queue
ordering depends on callback timing relative to RAF
wall-clock delta above 50 ms is silently discarded
no hidden-tab or catch-up policy
no simulationTickId or appliedCommandCursor
no ordered domain-event or replay journal
no canonical state fingerprint
no immutable render snapshot or committed-frame receipt
```

## Gate 2d: Terminal outcome gaps

```txt
updateUnit can set lost during unit iteration
parent update can later set won during final-wave clear
state can contain won and lost simultaneously
overlay checks won first
victory summary can be written after defeat evidence
no exclusive outcome enum, arbitration policy, latch or result ID
```

## Gate 3: Lifecycle gaps

```txt
menu and campaign allocate at module scope
RAF request IDs are discarded
anonymous listeners have no deterministic removal
no sessionId, runId or runGeneration
no startup rollback
no audio or CRT resource owner
navigation and reload bypass typed transition and teardown
```

## Gate 4: Checkpoint and resume gaps

```txt
current save is a completion summary rather than a resumable checkpoint
no schema/content identity/checkpoint ID/fingerprint
no committed tick, command cursor or terminal result ID
no full entity graph or identity counters
no load path, migration, staged hydration or reference rebuild
no atomic commit, rollback or resume epoch
no first resumed-frame acknowledgement
```

## Validation gaps

```txt
current checks are source-pattern checks
no slot read-failure fixture
no malformed/unsupported candidate fixture
no six-slot precedence fixture
no menu/campaign startup-mode parity fixture
no atomic hydration rollback fixture
no first resumed-frame fixture
no CPU/GLSL projection fixture
no command, phase, cadence, stall or replay fixture
no simultaneous terminal fixture
no lifecycle fixture
no checkpoint roundtrip/migration/corruption fixture
```

## Do not claim

Do not claim Continue works, a raw save string is resumable, candidate precedence is deterministic, `campaign=continue` hydrates state, pointer targeting is exact, pause freezes authoritative mutation, commands are deterministic, stalls preserve declared time, frames correspond to a committed tick, terminal outcome is exclusive, restart is lifecycle-safe or checkpoint resume works until the corresponding fixtures pass on `main`.