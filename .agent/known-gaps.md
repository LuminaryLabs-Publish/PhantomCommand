# PhantomCommand Known Gaps

**Timestamp:** `2026-07-10T17-08-36-04-00`

## Critical save-admission gaps

```txt
- Continue is enabled by raw key presence rather than a parsed and validated save candidate.
- Candidate discovery searches both localStorage and sessionStorage without a documented priority rule.
- Three keys are treated as equivalent even though they represent different or unknown schema families.
- nexus.sceneSnapshot has no campaign adapter.
- phantom.command.campaign has no campaign adapter.
- malformed JSON still enables Continue because presence is checked without parsing.
- unsupported versions, foreign scenes, checksum failures, and stale source revisions cannot be classified.
- no candidate-selection result or reason reaches PhantomMenu.getState().
```

## Critical resume-fidelity gaps

```txt
- campaign-scene.js does not parse campaign=new or campaign=continue.
- campaign-scene.js reads no save candidate.
- the only phantomCommand.save write occurs on victory.
- the victory payload contains only scene, souls, and wave.
- the victory payload is a completion summary, not a resumable session.
- no schema, version, source revision, session identity, timestamp, checksum, or migration contract exists.
- no atomic hydration boundary exists.
- no deterministic fallback policy exists for an invalid Continue request.
- no state fingerprint proves that a hydrated session matches the saved session.
```

## Missing resume state coverage

```txt
simulation tick and accumulator policy
uid, pid, and tid counters
core health
wave-active flag and pending spawn queue
unit positions, health, cooldowns, targets, movement, animation, and lane state
tower state, occupied pads, cooldowns, and indices
projectiles and effects
selected units, selected pad, and selected tower type
camera position, zoom, target zoom, and velocity policy
paused, won, lost, and message state
command sequence and applied-command high-water mark
source fingerprint and fixture status
```

## Command-authority gaps retained after this pass

```txt
- selectAt, build, order, and startWave mutate state directly.
- selectAt conflates pad selection and build execution.
- build silently returns for missing pad, occupied pad, or insufficient souls.
- order silently returns when no allies are selected.
- startWave silently returns for active wave, won state, lost state, or completed waves.
- no command envelope, command ID, sequence, source, or logical timestamp exists.
- no typed accepted, rejected, no-op, skipped, or unsupported result contract exists.
- no bounded action journal or deterministic replay input exists.
```

## Source and descriptor gaps

```txt
- rings, lanes, pads, unit archetypes, tower archetypes, and wave scripts remain inline in campaign-scene.js.
- fresh campaign state construction is not a DOM-free module.
- generated pad count is not asserted behaviorally.
- campaign source descriptors have no source revision or fingerprint.
- the legacy construct kit is not authority for the current campaign route.
```

## Simulation and render proof gaps

```txt
- fixed-step updates have no explicit simulation tick record.
- commands are not queued against simulation frames.
- render() consumes live mutable state directly.
- world, HUD, minimap, overlay, and CRT consumers have no readback rows.
- rendered output has no session mode, selected save candidate, hydration result, or state fingerprint provenance.
- screenshots cannot prove whether Continue hydrated state or started fresh.
```

## Diagnostics and validation gaps

```txt
- window.GameHost exposes direct mutable state and camera references.
- GameHost.getState() exposes aggregate counters only.
- GameHost has no save-candidate classification, session mode, schema version, hydration result, fingerprint, migration status, simulation tick, render frame, source revision, or fixture status.
- check-campaign.mjs checks source patterns rather than behavior.
- no DOM-free save-admission fixture exists.
- no DOM-free resume-fidelity fixture exists.
- npm run build does not gate on save admission, hydration, resume parity, command replay, or render proof.
```

## Non-blocking product gaps

```txt
- procedural rectangle sprites remain visually simple.
- AI and targeting logic remain compact and inline.
- economy and persistence depth are minimal.
- accessibility copy cannot report candidate classification or hydration failure.
- menu Continue labeling currently overstates actual behavior.
```

## Do not do next

```txt
- Do not create a branch.
- Do not work on Cavalry of Rome.
- Do not hydrate raw cross-engine keys without explicit adapters.
- Do not treat the existing victory summary as a resumable save.
- Do not add waves, units, towers, or economy systems before save admission and resume parity exist.
- Do not redesign save/load UI before defining the envelope and classification contract.
- Do not replace the renderer before session provenance and render readback exist.
- Do not rewrite camera behavior before resume-state policy and frame correlation exist.
- Do not expose additional mutable objects through GameHost.
```
