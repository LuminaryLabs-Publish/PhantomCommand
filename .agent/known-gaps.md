# PhantomCommand Known Gaps

**Timestamp:** `2026-07-10T20-19-35-04-00`

## Critical Continue-capability gaps

```txt
- hasCampaignSave() returns only Boolean presence.
- the menu calls hasCampaignSave() twice during construction.
- six storage slots are scanned without stable slot IDs.
- candidate key, storage layer, raw value, parse result, schema family, version, and reason are discarded.
- no deterministic precedence table exists across keys and storage layers.
- no selected-candidate provenance reaches PhantomMenu.getState().
- Continue enabled/note state is frozen at page construction.
- malformed, foreign, unsupported, and legacy-summary payloads can enable Continue.
- campaign-scene.js ignores campaign=new and campaign=continue.
- menu and campaign do not consume one shared resolver result.
```

## Critical action-authority gaps

```txt
- selectAt(), build(), order(), and startWave() mutate live state directly.
- selectAt() conflates pad selection with tower-construction admission.
- build(), order(), and startWave() silently return on rejection paths.
- success and rejection both return undefined.
- pointer, keyboard, GameHost, and future replay sources have no shared command adapter.
- no command ID, sequence, source, requested frame, or target tick exists.
- no typed accepted, rejected, or no-op result exists.
- no stable rejection-reason vocabulary exists.
- no bounded command or result journal exists.
```

## Fixed-step and replay gaps

```txt
- combat advances at fixed 1/60 steps, but user actions mutate between ticks from DOM callbacks.
- no tick counter identifies action execution.
- no deterministic command queue defines ordering when several requests land before a tick.
- no canonical simulation-state fingerprint exists.
- no same-command same-tick replay fixture exists.
- no fixture proves rejected commands preserve state.
- no fixture proves identifier allocation and event order are stable.
```

## Event and observation gaps

```txt
- gameplay mutations emit only transient visual effects and message text.
- no durable gameplay event rows exist.
- accepted builds, orders, wave starts, damage, rewards, wave clears, wins, and losses have no event IDs.
- no causal link connects an event to a user command or simulation tick.
- no bounded observation object combines commands, results, events, and committed frames.
```

## Render and diagnostics gaps

```txt
- render() consumes mutable state, camera, and input drag directly.
- no immutable presentation snapshot exists.
- no frame ID or state fingerprint reaches world, HUD, minimap, modal, or CRT rendering.
- several simulation ticks can precede one render with no correlation row.
- a render after zero simulation ticks has no explicit snapshot-reuse marker.
- CRT submission does not identify the source frame uploaded.
- window.GameHost exposes mutable state and camera references.
- GameHost.getState() exposes aggregate counters only.
- GameHost.startWave and GameHost.build return no outcome.
```

## Resume-fidelity gaps

```txt
- the only phantomCommand.save write occurs on victory.
- the payload contains only scene, souls, and wave.
- the payload is a completion summary, not a resumable session.
- no schema, version, source revision, session ID, checksum, or migration contract exists.
- no atomic hydration boundary exists.
- simulation time, accumulator policy, ID counters, spawn queue, units, towers, pads, projectiles, effects, selection, camera, commands, results, events, and frames are not persisted.
- no saved-to-hydrated fingerprint parity proof exists.
```

## Validation gaps

```txt
- check-menu.mjs and check-campaign.mjs are source-pattern checks.
- no DOM-free candidate resolver fixture exists.
- no action-result fixture exists.
- no fixed-step command fixture exists.
- no frame-consumption fixture exists.
- no resume-fidelity fixture exists.
- npm run build does not gate on candidate selection, action outcomes, deterministic tick admission, render consumption, or resume parity.
```

## Non-blocking product gaps

```txt
- procedural rectangle sprites remain visually simple.
- AI and targeting remain compact and inline.
- economy and persistence depth are minimal.
- menu copy cannot explain why Continue is unavailable.
- README still describes an older Three.js construct scene rather than the current pixel campaign.
```

## Do not do next

```txt
- Do not create a branch.
- Do not work on Cavalry of Rome.
- Do not hydrate raw cross-engine keys without explicit adapters.
- Do not treat the existing victory summary as resumable.
- Do not implement menu and campaign candidate selection separately.
- Do not add UI-only validation that GameHost can bypass.
- Do not mutate simulation state directly from new DOM listeners.
- Do not extract the full campaign runtime before pure command/result fixtures exist.
- Do not add content before Continue admission and action authority are proven.
- Do not replace rendering or camera behavior before committed-frame readback exists.
- Do not expose additional mutable objects through GameHost.
```
