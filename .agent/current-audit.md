# PhantomCommand Current Audit

**Timestamp:** `2026-07-11T05-50-43-04-00`

## Summary

PhantomCommand has a clear menu and fixed-step campaign, but Continue does not resume a campaign. The menu scans raw storage values only for Boolean presence, the campaign ignores `campaign=continue`, and victory stores only `{ scene, souls, wave }`. The missing fourth authority boundary is a versioned checkpoint captured at a committed simulation tick, validated and migrated before use, hydrated off-line, committed atomically under a new resume epoch, and acknowledged by the first rendered frame.

## Plan ledger

**Goal:** catalogue the complete current product and define the checkpoint/resume architecture without changing gameplay, visuals, candidate precedence, command semantics or lifecycle ownership.

- [x] Reconcile the full Publish inventory and central ledgers.
- [x] Select only `PhantomCommand` by the oldest documented-selection rule.
- [x] Read the current menu, campaign, CRT and package source.
- [x] Trace New, Continue, gameplay, victory write and render paths.
- [x] Catalogue active domains, implemented kits and services.
- [x] Classify durable and transient campaign state.
- [x] Define schema, content identity, migration and fingerprint requirements.
- [x] Define staged hydration, relational validation, rollback and resume epoch.
- [x] Define first-frame and deployment proof.
- [ ] Implement the four ordered authority gates.
- [ ] Add executable fixtures and browser smoke coverage.

## Selection audit

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
central ledger entries: 9/9
root .agent state: 9/9
selected: LuminaryLabs-Publish/PhantomCommand
selection rule: oldest eligible documented repository
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

## Interaction loops

### Menu

```txt
module evaluates
  -> create 480 x 270 source canvas
  -> create graveyard art and CRT renderer
  -> read menu settings
  -> scan three save keys across localStorage and sessionStorage
  -> reduce all candidates to Boolean hasSave
  -> create mutable menu state
  -> attach canvas/document/button listeners
  -> start recursive RAF
  -> Begin emits game.html?campaign=new
  -> Continue emits game.html?campaign=continue
```

### Campaign

```txt
module evaluates
  -> create 640 x 360 source canvas and CRT renderer
  -> build rings, lanes, pads, archetypes and waves
  -> create fresh uid/pid/tid counters
  -> create fresh camera, input and campaign state
  -> create six starter allies
  -> attach canvas/window listeners
  -> start recursive RAF
  -> browser and GameHost actions mutate live state
  -> accumulator applies exact 1/60 updates
  -> draw world, HUD, minimap and terminal overlay
  -> upload/draw CRT
  -> on victory write { scene, souls, wave }
```

### Authored Continue intent versus actual behavior

```txt
menu: campaign=continue
campaign: query ignored
result: fresh campaign state
```

### Target checkpoint/resume loop

```txt
Continue command
  -> typed candidate resolution with storage/key provenance
  -> checkpoint parse and schema/content admission
  -> supported migration
  -> canonical fingerprint validation
  -> staged hydration and reference rebuilding
  -> relational invariant validation
  -> atomic session replacement
  -> resume epoch publication
  -> first world/HUD/minimap/CRT frame acknowledgement
```

## Domains in use

### Route and menu

```txt
static-route-shell-domain
menu-route-domain
campaign-route-domain
menu-selection-domain
menu-panel-domain
menu-settings-persistence-domain
menu-save-presence-domain
menu-continue-capability-domain
menu-transition-domain
menu-audio-domain
graveyard-art-domain
source-canvas-domain
crt-display-domain
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
campaign-terminal-state-domain
camera-pan-zoom-domain
identity-counter-domain
```

### Interaction and simulation

```txt
build-action-domain
order-action-domain
wave-start-action-domain
spawn-queue-domain
unit-ai-domain
enemy-pathing-domain
ally-targeting-domain
tower-targeting-domain
projectile-domain
damage-reward-domain
effect-domain
win-loss-domain
save-on-win-domain
fixed-step-simulation-domain
```

### Render and observation

```txt
world-render-domain
hud-projection-domain
minimap-domain
modal-overlay-domain
crt-upload-domain
crt-draw-domain
phantom-menu-diagnostics-domain
gamehost-diagnostics-domain
```

### Runtime lifecycle

```txt
route-session-domain
startup-transaction-domain
runtime-lifecycle-state-domain
raf-ownership-domain
run-generation-domain
listener-lease-domain
timer-lease-domain
global-exposure-lease-domain
audio-resource-domain
webgl-resource-domain
transition-admission-domain
ordered-disposal-domain
startup-rollback-domain
lifecycle-journal-domain
lifecycle-observation-domain
```

### Missing checkpoint and resume authority

```txt
committed-checkpoint-boundary-domain
save-schema-version-domain
campaign-content-identity-domain
checkpoint-envelope-domain
checkpoint-capture-domain
checkpoint-fingerprint-domain
save-admission-domain
save-migration-domain
checkpoint-invariant-domain
hydration-staging-domain
reference-rebuild-domain
atomic-resume-transaction-domain
resume-rollback-domain
resume-epoch-domain
storage-adapter-domain
resume-result-domain
resume-journal-domain
first-frame-resume-ack-domain
roundtrip-corruption-proof-domain
```

### Proof and deployment

```txt
menu-static-check-domain
campaign-static-check-domain
static-build-domain
github-pages-deploy-domain
central-ledger-sync-domain
```

## Implemented kits and services

| Kit | Current services |
|---|---|
| `crt-renderer-kit` | WebGL context creation, shader compile/link, source texture upload, contain framing, pixel filtering, CRT uniforms, draw, resize and coordinate projection |
| `graveyard-art-kit` | Procedural graveyard menu composition and animated source-canvas drawing |
| `menu-route-kit` | Menu state, selection, panel activation, Begin/Continue routing and fade timing |
| `menu-settings-persistence-kit` | Read, normalize and write CRT, grain and ambience preferences |
| `menu-save-presence-kit` | Scan three keys across local and session storage and return Boolean presence |
| `menu-audio-kit` | Lazy AudioContext creation, ambience graph, UI tones and delayed close |
| `campaign-route-shell-kit` | Campaign canvas boot and route-level module execution |
| `pixel-campaign-runtime-kit` | Rings, lanes, pads, units, towers, waves, mutable state and input integration |
| `fixed-step-campaign-simulation-kit` | Exact `1/60` spawning, AI, combat, projectile, reward and terminal updates |
| `pixel-campaign-render-kit` | World, entity, HUD, minimap, overlay and CRT source rendering |
| `legacy-gamehost-diagnostics-kit` | Mutable state/camera exposure, direct actions and aggregate clone |
| `menu-static-check-kit` | Source-pattern checks for menu structure |
| `campaign-static-check-kit` | Source-pattern checks for campaign structure |
| `static-build-copy-kit` | Copy static route and source files to the deployment artifact |
| `pages-deploy-kit` | GitHub Pages publishing |
| retained construct kits | Historical concentric construction descriptors and sequence helpers not used by the active campaign route |

## Current persistence behavior

```txt
SAVE_KEYS:
  phantomCommand.save
  nexus.sceneSnapshot
  phantom.command.campaign

menu read:
  localStorage or sessionStorage value exists -> hasSave=true

campaign write:
  localStorage[phantomCommand.save] =
    { scene: "grave-ring", souls: state.souls, wave: state.wave }

campaign read:
  absent
```

The current payload cannot reconstruct authoritative gameplay state.

## Durable checkpoint state

A resumable checkpoint needs, at minimum:

```txt
simulation:
  committed tick, time and command sequence cursor

economy/progression:
  souls, core, wave and waveActive

entities:
  spawn queue, units, towers and projectiles

relationships:
  pad-to-tower ownership, selection and projectile targets

identity:
  uid, pid and tid counters

continuity:
  selectedPad, towerType and camera position/zoom

terminal:
  paused, won, lost and message
```

Presentation effects may be explicitly classified as transient or included for exact visual continuity. Input, DOM, WebGL, audio, listener, timer, RAF, wall-clock and accumulator state must not be persisted as live resources.

## Relational invariants

```txt
all entity IDs are unique
all pad tower references resolve
all selected IDs resolve to live player units
all projectile targets resolve to live units
spawn entries use valid archetypes and lanes
uid/pid/tid exceed every restored identifier
wave and waveActive agree with spawn/enemy state
won/lost/paused combinations are valid
schema/content identity match the loaded runtime
canonical fingerprint matches the payload
```

## Candidate checkpoint kits

```txt
phantom-command-checkpoint-boundary-kit
phantom-command-save-schema-version-kit
phantom-command-campaign-content-identity-kit
phantom-command-checkpoint-envelope-kit
phantom-command-checkpoint-capture-kit
phantom-command-checkpoint-fingerprint-kit
phantom-command-save-admission-kit
phantom-command-save-migration-registry-kit
phantom-command-checkpoint-invariant-kit
phantom-command-hydration-stage-kit
phantom-command-reference-rebuild-kit
phantom-command-atomic-resume-transaction-kit
phantom-command-resume-rollback-kit
phantom-command-resume-epoch-kit
phantom-command-storage-adapter-kit
phantom-command-resume-result-kit
phantom-command-resume-journal-kit
phantom-command-first-frame-resume-ack-kit
phantom-command-roundtrip-fixture-kit
```

## Main findings

### 1. Save presence is not save admission

A nonempty storage value can be malformed, incompatible, stale or unrelated. Boolean presence cannot support Continue safely.

### 2. The campaign ignores resume intent

The query string is never read. New and Continue both construct the same fresh singleton state.

### 3. The victory payload is not a checkpoint

Three fields cannot restore the campaign entity graph, identity counters, fixed-step position or relational state.

### 4. Hydration cannot mutate live state incrementally

A partial load could leave pads, towers, selected IDs, projectiles and counters inconsistent. Hydration must stage and validate a complete graph before commit.

### 5. Resume needs an epoch

A committed load replaces session identity. Stale input, commands, RAF callbacks, GameHost observations and frames must be fenced from the new epoch.

### 6. Render consumption requires acknowledgement

The first world, HUD, minimap and CRT frame after resume must identify the checkpoint fingerprint, tick and resume epoch.

### 7. Executable proof is absent

Current checks are source-pattern checks. There is no roundtrip, migration, corruption, rollback, idempotency or first-frame resume fixture.

## Ordered implementation queue

```txt
1. Continue Capability Resolver + Save Candidate Precedence Fixture Gate
2. Campaign Action Result Authority + Fixed-Step Replay/Frame Fixture Gate
3. Runtime Session Lifecycle Authority + Menu/Campaign Teardown Fixture Gate
4. Versioned Campaign Checkpoint Authority + Atomic Resume/First-Frame Fixture Gate
```

## Validation status

Documentation only. Runtime behavior was not changed. `npm run check`, `npm run build`, checkpoint fixtures and browser resume smoke were not run. No branch or pull request was created.
