# PhantomCommand Known Gaps

**Timestamp:** `2026-07-10T21-49-26-04-00`

## Continue-capability gaps

```txt
- hasCampaignSave() returns only Boolean presence.
- the menu calls hasCampaignSave() twice during construction.
- six storage slots have no stable IDs or deterministic precedence.
- parse/classification/provenance evidence is discarded.
- Continue state is frozen for the page lifetime.
- malformed, foreign, unsupported, and legacy-summary payloads can enable Continue.
- campaign-scene.js ignores campaign=new and campaign=continue.
- menu and campaign do not consume one shared resolver result.
```

## Action-authority gaps

```txt
- selectAt(), build(), order(), and startWave() mutate live state directly.
- selectAt() conflates pad selection with tower construction.
- build(), order(), and startWave() silently return on rejection.
- success and rejection both return undefined.
- pointer, keyboard, GameHost, and future replay sources have no shared command adapter.
- no command sequence, target tick, accepted/rejected/no-op result, or stable reason vocabulary exists.
- no bounded command, result, or event journal exists.
- no canonical state fingerprint or committed-frame correlation exists.
```

## Runtime lifecycle gaps

```txt
- menu and campaign construct eagerly at module evaluation.
- neither route has an explicit session ID or lifecycle state.
- neither route retains requestAnimationFrame request IDs.
- neither route can cancel its recursive frame loop.
- no stopped/disposed guard prevents rescheduling.
- route listeners are installed without a coordinated removal ledger.
- most listeners use anonymous handlers that cannot currently be removed directly.
- no startup transaction or partial-start rollback exists.
- no stop, dispose, or restart service exists.
- reload/navigation is treated as the only cleanup boundary.
- no bounded lifecycle result journal exists.
- PhantomMenu and GameHost expose no lifecycle observation or control.
```

## Audio and render-resource gaps

```txt
- menu AudioContext, drone, and wind are not explicitly released on route navigation.
- stopAmbience() only runs when ambience is disabled through settings.
- CRT renderer allocates shaders, program, buffer, and texture but has no dispose method.
- shader handles are not retained for explicit deletion.
- no WebGL context-loss or release policy exists.
- no resource ownership ledger records allocation and release.
- no fixture proves zero live owned resources after disposal.
- no fixture proves one render loop after remount/restart.
```

## Route transition and restart gaps

```txt
- menu transition has no typed result or teardown status.
- duplicate transition attempts are ignored implicitly, not journaled.
- input admission remains open while the fade is running.
- campaign R calls location.reload() instead of a typed restart transaction.
- campaign Escape navigates directly instead of disposing first and recording a result.
- stale callbacks cannot be identified by session ID.
- win/loss freezes update() but does not close command admission through an authoritative session state.
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
- no action-result or fixed-step frame fixture exists.
- no menu/campaign lifecycle fixture exists.
- no listener-ledger fixture exists.
- no CRT disposal fixture exists.
- no restart-idempotency fixture exists.
- no browser fixture proves frame cancellation or resource release.
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
- Do not treat the existing victory summary as resumable.
- Do not implement separate menu and campaign candidate selection.
- Do not add new direct DOM-to-simulation mutation paths.
- Do not add lifecycle methods that leave anonymous listeners or RAF requests unowned.
- Do not call WebGL context loss a substitute for explicit resource release.
- Do not replace rendering, camera, controls, or content before proof boundaries exist.
- Do not expose more mutable objects through GameHost.
```