# PhantomCommand Current Audit

**Timestamp:** `2026-07-11T15-08-41-04-00`

## Summary

PhantomCommand presents Continue as a real capability, but the menu only checks whether any raw string exists under three key names across local or session storage. It does not parse, validate, rank or select a candidate, and `campaign-scene.js` never reads `campaign=continue`. Continue therefore starts the same fresh default campaign as Begin.

## Plan ledger

**Goal:** catalogue the complete runtime and define one deterministic save-candidate resolution and campaign-startup admission boundary before action, phase, replay, lifecycle or checkpoint work proceeds.

- [x] Compare the current Publish inventory with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central and root `.agent` coverage.
- [x] Detect a same-window active interaction-target audit in `HorrorCorridor`.
- [x] Select only `PhantomCommand` as the oldest stable eligible repository.
- [x] Read menu save scanning, menu projection, route transition, campaign initialization and victory save source.
- [x] Identify the interaction loop, all domains, implemented kits and offered services.
- [x] Prove that raw storage presence and campaign resumability are currently unrelated.
- [x] Define candidate parsing, classification, precedence, capability, startup admission, journal and fixture contracts.
- [ ] Implement the boundary and executable fixtures.

## Selection audit

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
central ledger entries: 9/9
root .agent state: 9/9
same-window active repo skipped: HorrorCorridor at 2026-07-11T15-01-33-04-00
selected: LuminaryLabs-Publish/PhantomCommand
selected prior central timestamp: 2026-07-11T13-28-37-04-00
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

Stable comparison at selection:

```txt
PhantomCommand     2026-07-11T13-28-37-04-00 selected
ZombieOrchard      2026-07-11T13-41-23-04-00
TheUnmappedHouse   2026-07-11T13-49-30-04-00
AetherVale         2026-07-11T14-00-01-04-00
IntoTheMeadow      2026-07-11T14-08-51-04-00
PrehistoricRush    2026-07-11T14-31-27-04-00
MyCozyIsland       2026-07-11T14-41-28-04-00
TheOpenAbove       2026-07-11T14-50-59-04-00
HorrorCorridor     active repo-local audit at 2026-07-11T15-01-33-04-00
TheCavalryOfRome   excluded
```

## Interaction loops

### Menu startup loop

```txt
index.html
  -> graveyard-menu.js
  -> define three save-key names
  -> call hasCampaignSave() twice during menu construction
  -> scan localStorage then sessionStorage per key
  -> collapse any nonempty string to true
  -> project Continue as BOUND or EMPTY
```

### Begin loop

```txt
BEGIN CAMPAIGN
  -> game.html?campaign=new
  -> campaign module constructs default state
  -> souls 145, core 24, wave 0
  -> six default allied units
  -> empty towers, projectiles and effects
  -> fresh counters and camera
```

### Continue loop

```txt
CONTINUE
  -> game.html?campaign=continue
  -> campaign module never reads location.search
  -> no key or storage layer is read
  -> no candidate is selected
  -> no payload is parsed or hydrated
  -> same default state as Begin
```

### Save-write loop

```txt
final wave clears
  -> state.won = true
  -> localStorage phantomCommand.save receives:
       { scene: "grave-ring", souls, wave }
  -> no schema, checkpoint ID, content revision or fingerprint
  -> menu later treats the raw string as sufficient Continue evidence
```

## Main finding

### Six possible slots collapse to one Boolean

The declared keys are:

```txt
phantomCommand.save
nexus.sceneSnapshot
phantom.command.campaign
```

Each key can exist in:

```txt
localStorage
sessionStorage
```

The scan therefore covers six possible slots, but returns only true or false. Per key, a truthy local value hides a session value. Across keys, `Array.some()` stops at the first truthy result. No candidate object survives the scan.

### Malformed or unrelated payloads enable Continue

The menu never calls `JSON.parse()` for campaign candidates. The following values all enable Continue:

```txt
"not-json"
"null"
"{}"
legacy payload for another product revision
partial victory summary
stale session snapshot
```

A storage exception is caught around the complete scan and returns false, so one inaccessible slot can hide otherwise valid candidates without a typed read result.

### Candidate precedence is undefined

The current code implies an accidental read order:

```txt
phantomCommand.save local
phantomCommand.save session
nexus.sceneSnapshot local
nexus.sceneSnapshot session
phantom.command.campaign local
phantom.command.campaign session
```

But because the output is Boolean, the order does not actually select a candidate. There is no policy for:

```txt
current schema over legacy schema
newer checkpoint over older checkpoint
local over session
committed checkpoint over completion summary
valid candidate over malformed higher-priority slot
matching content revision over stale revision
```

### Route mode is projection only

`activateMain()` routes to either:

```txt
game.html?campaign=new
game.html?campaign=continue
```

`campaign-scene.js` constructs state immediately at module scope and contains no `URLSearchParams`, `location.search`, load, migration or hydration path. The query string changes the URL but not the campaign state.

### New mode is also undefined

Begin does not explicitly reject, archive or clear existing candidates. If later startup logic is added without a typed mode contract, a stale candidate could accidentally leak into a new campaign.

## Domains in use

### Route, menu and product shell

```txt
static-route-shell-domain
menu-route-domain
campaign-route-domain
menu-selection-domain
menu-panel-domain
menu-settings-persistence-domain
menu-transition-domain
menu-audio-domain
graveyard-art-domain
source-canvas-domain
```

### Save candidate and startup authority

```txt
save-slot-registry-domain
storage-slot-read-domain
raw-save-presence-domain
save-candidate-parse-domain-next
save-schema-classification-domain-next
save-content-identity-domain-next
save-candidate-provenance-domain-next
save-candidate-precedence-domain-next
save-candidate-resolution-domain-next
continue-capability-domain-next
campaign-startup-mode-domain-next
campaign-startup-admission-domain-next
candidate-journal-domain-next
```

### Projection and presentation

```txt
crt-display-domain
contain-projection-domain
crt-curve-domain
source-resolution-domain
pointer-hit-domain
source-to-world-domain
world-to-source-domain
wheel-anchor-domain
drag-selection-domain
display-to-source-authority-domain-next
projection-revision-domain-next
```

### Campaign content and state

```txt
ring-map-domain
lane-domain
build-pad-domain
unit-archetype-domain
tower-archetype-domain
wave-script-domain
souls-economy-domain
sanctum-core-health-domain
selection-domain
campaign-message-domain
campaign-phase-domain-next
camera-pan-zoom-domain
identity-counter-domain
```

### Simulation and interaction

```txt
build-action-domain
order-action-domain
wave-start-action-domain
pause-resume-action-domain
spawn-queue-domain
unit-ai-domain
enemy-pathing-domain
ally-targeting-domain
tower-targeting-domain
projectile-domain
damage-reward-domain
effect-domain
fixed-step-simulation-domain
command-sequence-domain-next
target-tick-domain-next
clock-overrun-domain-next
replay-journal-domain-next
state-fingerprint-domain-next
```

### Terminal, persistence and lifecycle

```txt
core-breach-predicate-domain
wave-clear-predicate-domain
terminal-outcome-arbitration-domain-next
terminal-result-domain-next
terminal-persistence-policy-domain-next
victory-summary-write-domain
runtime-lifecycle-domain-next
versioned-checkpoint-domain-next
atomic-resume-domain-next
```

### Render, diagnostics and proof

```txt
world-render-domain
hud-projection-domain
minimap-domain
modal-overlay-domain
crt-upload-domain
crt-draw-domain
phantom-menu-diagnostics-domain
gamehost-diagnostics-domain
committed-tick-domain-next
committed-frame-domain-next
frame-consumer-ack-domain-next
menu-static-check-domain
campaign-static-check-domain
static-build-domain
github-pages-deploy-domain
central-ledger-sync-domain
```

## Implemented kits and services

| Kit | Current services |
|---|---|
| `crt-renderer-kit` | WebGL setup, source upload, contain framing, CRT curvature, draw, resize and contain-only coordinate projection |
| `graveyard-art-kit` | Procedural graveyard composition and animated menu source-canvas drawing |
| `menu-route-kit` | Menu selection, panels, Begin/Continue routing and fade timing |
| `menu-settings-persistence-kit` | Read, normalize and write CRT, grain and ambience settings |
| `menu-save-presence-kit` | Scan three key names across local and session storage and return Boolean presence |
| `menu-audio-kit` | Lazy AudioContext, ambience, UI tones and delayed close |
| `campaign-route-shell-kit` | Campaign canvas boot and module execution |
| `pixel-campaign-runtime-kit` | Campaign descriptors, mutable state, selection, building, orders, wave and camera input |
| `fixed-step-campaign-simulation-kit` | Exact `1/60` spawning, AI, combat, projectiles, rewards, core damage and terminal mutation |
| `pixel-campaign-render-kit` | World, HUD, minimap, terminal overlay and source-frame drawing |
| `legacy-gamehost-diagnostics-kit` | Live state/camera exposure and direct action methods |
| `menu-static-check-kit` | Menu source-pattern checks |
| `campaign-static-check-kit` | Campaign source-pattern checks |
| `static-build-copy-kit` | Static artifact assembly |
| `pages-deploy-kit` | GitHub Pages artifact deployment |
| retained construct kits | Intro scheduling, construct IDs, piece state and sequence updates |

## Candidate Continue authority kits

```txt
phantom-command-save-slot-registry-kit
phantom-command-storage-slot-read-kit
phantom-command-save-candidate-parse-kit
phantom-command-save-schema-classifier-kit
phantom-command-save-content-identity-kit
phantom-command-save-candidate-provenance-kit
phantom-command-save-candidate-precedence-kit
phantom-command-save-candidate-resolver-kit
phantom-command-continue-capability-result-kit
phantom-command-campaign-startup-mode-kit
phantom-command-campaign-startup-admission-kit
phantom-command-campaign-hydration-plan-kit
phantom-command-campaign-hydration-result-kit
phantom-command-candidate-journal-kit
phantom-command-candidate-resolver-fixture-kit
phantom-command-browser-continue-parity-smoke-kit
```

## Required resolution transaction

```txt
menu startup begins
  -> enumerate all declared candidate slots
  -> read each slot independently with typed success/failure
  -> parse every readable nonempty payload
  -> classify schema, content identity and candidate kind
  -> validate required fields and fingerprints
  -> rank valid candidates through a versioned precedence policy
  -> publish ContinueCapabilityResult
       enabled
       selectedCandidateId
       selectedSlot
       schemaVersion
       contentRevision
       reason
  -> render Continue from the result

Continue activation
  -> carry selected candidate identity into campaign startup
  -> re-read and revalidate the exact candidate
  -> reject stale or changed candidate fingerprints
  -> stage hydration without mutating live state
  -> atomically commit a continue run or return a typed failure
  -> acknowledge the first resumed frame
```

## Required contracts

### SaveSlotReadResult

```txt
slotId
key
storageLayer
status: empty | read | denied | failed
rawHash
errorCode
```

### SaveCandidateResult

```txt
candidateId
slotId
kind
schemaVersion
contentRevision
checkpointId
capturedAt
stateFingerprint
status: valid | invalid | unsupported
reason
```

### ContinueCapabilityResult

```txt
resolutionId
enabled
selectedCandidateId
selectedSlotId
policyVersion
reason
candidateCount
rejectedCandidateCount
```

### CampaignStartupResult

```txt
startupId
mode: new | continue
candidateId
accepted
reason
runId
runEpoch
stateFingerprint
firstFrameReceiptId
```

## Required proof

```txt
no slots -> Continue disabled
malformed payload only -> Continue disabled with invalid-candidate reason
unsupported schema only -> Continue disabled with unsupported-schema reason
valid lower-priority candidate plus malformed higher slot -> valid candidate selected
multiple valid candidates -> deterministic policy selects the same candidate
storage read failure in one slot -> other slots still evaluated
menu-selected candidate changed before startup -> startup rejects stale fingerprint
new mode -> starts fresh and does not hydrate a candidate
continue mode -> hydrates selected state or fails without partial mutation
Begin and Continue produce observably different admitted startup results
browser menu, URL mode, live state and first frame agree on one startup identity
```

## Ordered implementation queue

```txt
1. Continue Capability Resolver
2. Campaign Action Result Authority
   2a. CRT Display/Input Projection Authority
   2b. Campaign Phase Admission Authority
   2c. Fixed-Step Command Scheduling, Replay and Committed Frame Authority
   2d. Exclusive Terminal Outcome Transaction Authority
3. Runtime Session Lifecycle Authority
4. Versioned Campaign Checkpoint and Atomic Resume Authority
```

## Validation boundary

Documentation only. Runtime source, package scripts, dependencies, routes, gameplay, rendering, persistence and deployment configuration were not changed. Existing checks verify expected source strings; they do not execute candidate reads, malformed payload handling, precedence, query-mode admission, hydration, rollback or first-resumed-frame correlation.