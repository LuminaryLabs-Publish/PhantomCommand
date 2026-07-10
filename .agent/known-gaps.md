# PhantomCommand Known Gaps

**Timestamp:** `2026-07-10T18-40-13-04-00`

## Critical Continue-capability gaps

```txt
- hasCampaignSave() returns only Boolean presence.
- the menu calls hasCampaignSave() twice during construction.
- six storage slots are scanned without stable slot IDs.
- candidate key, storage layer, raw value, parse result, schema family, version, and reason are discarded.
- no deterministic precedence table exists across keys and storage layers.
- no selected-candidate provenance reaches PhantomMenu.getState().
- Continue enabled/note state is frozen at page construction.
- no storage-event refresh or explicit reload policy exists.
- malformed, foreign, unsupported, and legacy-summary payloads can enable Continue.
```

## Critical session-entry gaps

```txt
- campaign-scene.js does not parse campaign=new or campaign=continue.
- campaign-scene.js reads no save candidate.
- menu and campaign do not share a resolver result.
- no typed created, hydrated, rejected, or fallback-new session-entry result exists.
- invalid Continue requests have no deterministic fallback policy.
```

## Resume-fidelity gaps

```txt
- the only phantomCommand.save write occurs on victory.
- the payload contains only scene, souls, and wave.
- the payload is a completion summary, not a resumable session.
- no schema, version, source revision, session ID, timestamp, checksum, or migration contract exists.
- no atomic hydration boundary exists.
- no state fingerprint proves saved-to-hydrated parity.
- simulation tick, accumulator policy, uid/pid/tid counters, core, queues, units, towers, pads, projectiles, effects, selection, camera, and message state are not persisted.
```

## Command-authority gaps retained

```txt
- selectAt, build, order, and startWave mutate state directly.
- selectAt conflates pad selection and build execution.
- build, order, and startWave silently return on rejection paths.
- no command envelope, typed result, sequence, source, journal, or replay input exists.
```

## Render and diagnostics gaps

```txt
- render() consumes live mutable state directly.
- world, HUD, minimap, modal, and CRT have no readback rows.
- rendered output has no session-mode or candidate provenance.
- screenshots cannot prove Continue hydrated rather than starting fresh.
- window.GameHost exposes mutable state and camera references.
- GameHost.getState() exposes aggregate counters only.
```

## Validation gaps

```txt
- check-campaign.mjs is source-pattern validation, not behavioral proof.
- no DOM-free candidate resolver fixture exists.
- no full-state resume-fidelity fixture exists.
- npm run build does not gate on candidate selection, hydration, replay, or render proof.
```

## Non-blocking product gaps

```txt
- procedural rectangle sprites remain visually simple.
- AI and targeting remain compact and inline.
- economy and persistence depth are minimal.
- menu copy cannot explain why Continue is unavailable.
```

## Do not do next

```txt
- Do not create a branch.
- Do not work on Cavalry of Rome.
- Do not hydrate raw cross-engine keys without explicit adapters.
- Do not treat the existing victory summary as resumable.
- Do not implement menu and campaign candidate selection separately.
- Do not add content before candidate admission and resume parity exist.
- Do not replace rendering or camera behavior before session provenance exists.
- Do not expose additional mutable objects through GameHost.
```