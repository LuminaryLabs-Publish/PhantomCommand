# PhantomCommand Known Gaps

**Timestamp:** `2026-07-11T01-20-51-04-00`

## Continue-capability gaps

```txt
- hasCampaignSave() returns only Boolean presence.
- the menu calls hasCampaignSave() twice during construction.
- six physical storage slots have no stable IDs.
- storage reads have no injected adapter or inspection journal.
- parse, schema, version, source, migration, and rejection evidence are discarded.
- candidate precedence is not defined.
- no selected candidate or decision fingerprint exists.
- Continue state is frozen for the page lifetime.
- malformed, foreign, unsupported, and completion-summary payloads can enable Continue.
- campaign-scene.js ignores campaign=new and campaign=continue.
- menu and campaign do not consume one shared resolver result.
- rejected Continue cannot be distinguished from a successful fresh start.
```

## Current persistence gaps

```txt
- phantomCommand.save is written only after victory.
- the payload contains only scene, souls, and wave.
- the payload is a completion summary, not a resumable session.
- no schema, version, source revision, timestamp policy, checksum, or migration contract exists.
- no active-session save writer exists.
- no atomic hydration boundary exists.
- simulation, entities, towers, health, projectiles, spawn queue, IDs, selection, camera, ticks, commands, events, frames, and lifecycle state are not persisted.
- no saved-to-hydrated fingerprint parity proof exists.
```

## Route and startup gaps

```txt
- route mode parsing is absent.
- startup admission has no typed accepted, rejected, or no-op result.
- menu transition has no admission ID.
- campaign startup has no startup result or fingerprint.
- fresh and continue routes construct identical state.
- no staged startup validation or rollback exists.
- PhantomMenu exposes hasSave but not candidate provenance.
- GameHost exposes no session-admission observation.
```

## Command-admission gaps

```txt
- selectAt(), build(), order(), and startWave() mutate live state directly.
- selectAt() conflates ally selection, pad selection, deselection, and build triggering.
- build(), order(), and startWave() silently return on rejected requests.
- successful, rejected, and no-op requests all return undefined.
- pointer, keyboard, GameHost, and replay sources have no common adapter.
- no session-scoped command ID, sequence, or target-tick policy exists.
- DOM callbacks can mutate state between fixed simulation steps.
- multiple requests in one browser frame have no explicit deterministic ordering contract.
```

## Replay and committed-frame gaps

```txt
- no pure command preflight exists.
- no bounded command, result, or domain-event journal exists.
- no canonical simulation-state fingerprint exists.
- no pure replay entry point exists.
- no simulation tick ID or committed presentation frame ID exists.
- world, HUD, minimap, modal, CRT, and GameHost consume uncorrelated mutable observations.
- render() and crt.render() return no structured consumption result.
```

## Runtime lifecycle gaps

```txt
- menu and campaign construct eagerly at module evaluation.
- neither route has an explicit session ID or lifecycle state.
- neither route retains or cancels requestAnimationFrame IDs.
- listeners have no coordinated registration/removal ledger.
- no startup transaction or partial-start rollback exists.
- no stop, dispose, or restart service exists.
- reload/navigation remains the cleanup boundary.
- stale callbacks cannot be rejected by session identity.
- menu AudioContext and CRT WebGL resources have incomplete disposal authority.
```

## Validation gaps

```txt
- check-menu.mjs and check-campaign.mjs are source-pattern checks.
- no candidate-resolver fixture exists.
- no session-admission fixture exists.
- no action-result fixture exists.
- no fixed-step replay fixture exists.
- no committed-frame consumption fixture exists.
- no menu/campaign lifecycle fixture exists.
- no CRT disposal fixture exists.
- npm run check and the Pages workflow cannot detect false Continue admission.
```

## Non-blocking product gaps

```txt
- procedural rectangle sprites remain visually simple.
- AI and targeting remain compact and inline.
- economy and persistence depth are minimal.
- menu copy cannot explain why Continue is unavailable or rejected.
- README still describes an older Three.js construct scene rather than the current pixel campaign.
```

## Do not do next

```txt
- Do not create a branch.
- Do not work on Cavalry of Rome.
- Do not hydrate raw cross-engine keys without explicit adapters.
- Do not treat the victory summary as resumable.
- Do not implement separate menu and campaign candidate selection.
- Do not let Array.some(), object iteration, or storage enumeration define precedence.
- Do not mutate or overwrite storage during capability resolution.
- Do not silently convert rejected Continue into a fresh campaign.
- Do not expose raw save payloads through PhantomMenu or GameHost.
- Do not add new direct DOM-to-simulation mutation paths.
- Do not replace rendering, camera, controls, content, or balance before proof boundaries exist.
```
