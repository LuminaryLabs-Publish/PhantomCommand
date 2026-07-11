# PhantomCommand Known Gaps

**Timestamp:** `2026-07-10T23-40-35-04-00`

## Continue-capability gaps

```txt
- hasCampaignSave() returns only Boolean presence.
- the menu calls hasCampaignSave() twice during construction.
- six storage slots have no stable IDs or deterministic precedence.
- parse, classification, provenance, and rejection evidence are discarded.
- Continue state is frozen for the page lifetime.
- malformed, foreign, unsupported, and legacy-summary payloads can enable Continue.
- campaign-scene.js ignores campaign=new and campaign=continue.
- menu and campaign do not consume one shared resolver result.
```

## Command-admission gaps

```txt
- selectAt(), build(), order(), and startWave() mutate live state directly.
- selectAt() conflates ally selection, pad selection, deselection, and build triggering.
- build(), order(), and startWave() silently return on rejected requests.
- successful, rejected, and no-op requests all return undefined.
- pointer, keyboard, GameHost, and replay sources have no common adapter.
- no session-scoped command ID or monotonic sequence exists.
- no target-tick policy exists.
- no duplicate, stale, terminal, or unsupported request vocabulary exists.
- DOM callbacks can mutate state between fixed simulation steps.
- multiple commands in one browser frame have no explicit deterministic ordering contract.
- GameHost.startWave() and GameHost.build() bypass any future queue unless converted to aliases.
```

## Preflight and application gaps

```txt
- no pure command preflight exists.
- validation, ID allocation, mutation, effect creation, and message updates are coupled.
- state-owned ID counters are not represented as a replay contract.
- rejection cannot prove fingerprint immutability.
- accepted mutation does not emit a typed result or ordered event set.
- command application is not restricted to fixed-step tick boundaries.
- wave, build, selection, and order changes have no authoritative domain events.
```

## Journal and replay gaps

```txt
- no bounded command journal exists.
- no bounded result journal exists.
- no bounded domain-event journal exists.
- no canonical simulation-state fingerprint exists.
- no pure replay entry point exists.
- browser RAF timing and performance.now() are not separated from deterministic proof.
- no fixture proves the same command stream produces the same IDs, results, events, and final state.
```

## Committed-frame and render gaps

```txt
- no simulation tick ID is published.
- no committed presentation frame ID exists.
- drawWorld, drawUI, drawMinimap, modal, and CRT consume live mutable state.
- render() and crt.render() return no structured consumption result.
- CRT texture upload and draw have no source-frame identity.
- GameHost.getState() is an independent aggregate clone, not the exact displayed frame.
- no consumer parity row proves world, HUD, minimap, modal, CRT, and GameHost used one frame.
- repeated visual frames and multi-tick visual frames are not distinguished.
```

## Runtime lifecycle gaps

```txt
- menu and campaign construct eagerly at module evaluation.
- neither route has an explicit session ID or lifecycle state.
- neither route retains requestAnimationFrame request IDs.
- neither route can cancel its recursive frame loop.
- no stopped/disposed guard prevents rescheduling.
- route listeners have no coordinated registration/removal ledger.
- most listeners are anonymous and cannot currently be removed directly.
- no startup transaction or partial-start rollback exists.
- no stop, dispose, or restart service exists.
- reload/navigation remains the cleanup boundary.
- stale callbacks cannot be rejected by session identity.
```

## Audio and render-resource gaps

```txt
- menu AudioContext, drone, and wind are not explicitly released on route navigation.
- stopAmbience() runs only when ambience is disabled through settings.
- CRT renderer allocates shaders, program, buffer, and texture but has no dispose method.
- shader handles are not retained for explicit deletion.
- no resource ownership ledger records allocation and release.
- no fixture proves zero live owned resources after disposal.
```

## Resume-fidelity gaps

```txt
- phantomCommand.save is written only on victory.
- the payload contains only scene, souls, and wave.
- the payload is a completion summary, not a resumable session.
- no schema, version, source revision, session ID, checksum, or migration contract exists.
- no atomic hydration boundary exists.
- simulation, IDs, queues, entities, selection, camera, commands, events, frames, and lifecycle state are not persisted.
- no saved-to-hydrated fingerprint parity proof exists.
```

## Validation gaps

```txt
- check-menu.mjs and check-campaign.mjs are source-pattern checks.
- no candidate resolver fixture exists.
- no action-result fixture exists.
- no fixed-step replay fixture exists.
- no committed-frame consumption fixture exists.
- no menu/campaign lifecycle fixture exists.
- no listener-ledger fixture exists.
- no CRT disposal fixture exists.
- no restart-idempotency fixture exists.
- no browser proof verifies frame identity or resource release.
- npm run build does not gate on these behaviors.
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
- Do not treat the victory summary as resumable.
- Do not implement separate menu and campaign candidate selection.
- Do not add new direct DOM-to-simulation mutation paths.
- Do not allow GameHost compatibility methods to bypass command authority.
- Do not include browser timestamps or CRT animation time in the deterministic fingerprint.
- Do not add lifecycle methods that leave listeners or RAF requests unowned.
- Do not replace rendering, camera, controls, content, or balance before proof boundaries exist.
- Do not expose more mutable objects through GameHost.
```
