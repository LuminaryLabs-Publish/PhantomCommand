# PhantomCommand Known Gaps

**Timestamp:** `2026-07-11T03-31-26-04-00`

## Continue and persistence gaps

```txt
- hasCampaignSave() reduces six physical storage slots to Boolean presence.
- slot identity, parse status, schema, version, candidate kind, precedence, and decision fingerprints are absent.
- malformed, foreign, unsupported, and completion-summary payloads can enable Continue.
- campaign-scene.js ignores campaign=new and campaign=continue.
- fresh and Continue routes create the same state.
- phantomCommand.save is written only after victory.
- the payload { scene, souls, wave } is not resumable session state.
- active entities, towers, health, projectiles, spawn queue, IDs, selection, camera, ticks, commands, events, and frames are not persisted.
- no atomic startup, hydration, rollback, or saved-to-hydrated fingerprint proof exists.
```

## Command-admission gaps

```txt
- selectAt(), build(), order(), and startWave() mutate live state directly.
- successful, rejected, and no-op requests all return undefined.
- selectAt() conflates unit selection, toggle selection, pad selection, second-click build, and deselection.
- build() reads mutable selectedPad and towerType rather than an explicit request payload.
- startWave() silently rejects active-wave, terminal, and exhausted-wave conditions.
- build() silently rejects missing-pad, occupied-pad, and insufficient-souls conditions.
- order() silently rejects when no units are selected.
- number keys and pause mutate state without command results.
- pointer, keyboard, GameHost, replay, and fixture sources have no shared adapter.
- no command ID, session ID, monotonic sequence, target tick, duplicate policy, or stale-session policy exists.
```

## Fixed-step authority gaps

```txt
- browser callbacks and GameHost calls can mutate state between update(1/60) steps.
- fixed-step authority covers AI, spawning, combat, economy, and terminal progression but not user commands.
- multiple requests before one simulation step have no explicit sequence contract.
- equivalent requests can land before or after a step depending on browser event timing.
- camera motion uses variable frame dt while gameplay uses fixed dt, with no frame attribution.
- no pure command preflight or accepted application plan exists.
- no bounded command, result, or domain-event journal exists.
- no canonical simulation-state fingerprint exists.
- no pure replay entry point exists.
```

## Committed-frame gaps

```txt
- no simulation tick ID or committed presentation frame ID exists.
- no frame row records RAF time, dt, step count, tick range, or applied commands.
- world, HUD, minimap, modal, source canvas, CRT, and GameHost read uncorrelated mutable observations.
- render() returns no structured consumption result.
- the campaign retains no CRT upload acknowledgement.
- no immutable presentation snapshot exists.
- frame failure cannot preserve and identify the last successful committed frame.
- no consumer fingerprint parity proof exists.
```

## GameHost gaps

```txt
- window.GameHost exposes mutable state and camera references.
- startWave and build invoke direct mutation functions.
- GameHost.build depends on mutable selectedPad and towerType.
- getState() omits session, command, result, tick, event, fingerprint, and frame identity.
- no clone-safe command request or observation API exists.
- compatibility fields are not marked as unsafe legacy authority.
```

## Runtime lifecycle gaps

```txt
- menu and campaign construct eagerly at module evaluation.
- neither route has an explicit session ID or lifecycle state.
- RAF request IDs are not retained or cancelled.
- listeners have no coordinated registration/removal ledger.
- no startup transaction or partial-start rollback exists.
- no stop, dispose, or restart service exists.
- reload/navigation remains the cleanup boundary.
- stale callbacks cannot be rejected by session identity.
- menu AudioContext and CRT WebGL resources lack complete disposal authority.
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
- npm run check and the Pages workflow cannot prove behavioral authority.
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
- Do not treat the victory summary as resumable.
- Do not implement separate menu and campaign save selection.
- Do not mutate storage during capability resolution.
- Do not silently convert rejected Continue into a fresh campaign.
- Do not add new direct DOM-to-state mutation paths.
- Do not assign target ticks from browser wall-clock time.
- Do not expose mutable state as the new proof surface.
- Do not claim a presented command without a committed-frame acknowledgement.
- Do not replace rendering, camera, controls, content, or balance before proof boundaries exist.
```