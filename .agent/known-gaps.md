# PhantomCommand Known Gaps

**Timestamp:** `2026-07-10T15-38-40-04-00`

## Critical session-authority gaps

```txt
- Begin and Continue emit different query parameters, but campaign-scene.js does not parse either mode.
- Continue is enabled by save-key presence rather than a validated resumable save envelope.
- The campaign does not read phantomCommand.save, nexus.sceneSnapshot, or phantom.command.campaign.
- The only campaign write happens on victory.
- The victory payload contains only scene, souls, and wave.
- The victory payload cannot restore the live campaign state.
- No save schema, version, source revision, checksum, migration policy, or invalid-save result exists.
- No distinction exists between resumable session, completion summary, and cross-engine snapshot.
- No deterministic fallback policy exists for an invalid Continue request.
```

## Critical command-authority gaps

```txt
- selectAt, build, order, and startWave mutate state directly.
- selectAt conflates pad selection and build execution.
- build silently returns for missing pad, occupied pad, or insufficient souls.
- order silently returns when no allies are selected.
- startWave silently returns for active wave, won state, lost state, or completed wave set.
- no command envelope, command ID, sequence, source, or logical timestamp exists.
- no accepted/rejected/no-op/skipped/unsupported result contract exists.
- no bounded action journal exists.
- no deterministic replay input exists.
- rejected commands cannot be proven to preserve state.
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
- fixed-step updates have no simulation tick record.
- commands are not queued against simulation frames.
- render() consumes live mutable state directly.
- world, HUD, minimap, overlay, and CRT consumers have no readback rows.
- no state fingerprint links command result, simulation frame, and rendered frame.
- screenshots cannot prove whether Continue hydrated state or started fresh.
```

## Diagnostics and validation gaps

```txt
- window.GameHost exposes direct mutable state and camera references.
- GameHost.getState() exposes aggregate counters only.
- GameHost has no session mode, save classification, command journal, result reasons, simulation tick, render frame, source fingerprint, or fixture status.
- check-campaign.mjs checks source patterns rather than behavior.
- no DOM-free session fixture exists.
- npm run build does not gate on session, save, command, replay, or render proof.
```

## Non-blocking product gaps

```txt
- procedural rectangle sprites remain visually simple.
- AI and targeting logic remain compact and inline.
- economy and persistence depth are minimal.
- accessibility copy cannot report current session or rejected command results.
- menu Continue labeling currently overstates actual behavior.
```

## Do not do next

```txt
- Do not create a branch.
- Do not work on Cavalry of Rome.
- Do not add waves, units, towers, or economy systems before session/command authority exists.
- Do not redesign save/load UI before defining the save envelope.
- Do not replace the renderer before render readback exists.
- Do not rewrite camera behavior before frame correlation exists.
- Do not expand legacy construct-profile work before live campaign fixture proof.
- Do not expose additional mutable objects through GameHost.
```
