# Input and GameHost Command Admission Map

**Timestamp:** `2026-07-11T03-31-26-04-00`

## Current source map

| Source | Request | Current destination | Authority issue |
|---|---|---|---|
| left click | select point or finish drag | `selectAt()` or direct `state.selected` assignment | selection and build can be conflated |
| right click | move or attack | `order()` | silent empty-selection rejection |
| Space | start wave | `startWave()` | silent terminal/wave rejection |
| keys 1-3 | select tower type | direct `state.towerType` assignment | no validation or result |
| P | pause | direct Boolean toggle | no command or transition result |
| F | focus | direct camera mutation | no source or frame correlation |
| wheel | zoom around pointer | direct camera target and position mutation | variable-frame authority |
| middle drag / WASD | pan | direct camera mutation | variable-frame authority |
| `GameHost.startWave()` | start wave | direct `startWave()` | no source identity or result |
| `GameHost.build()` | build | direct `build()` | depends on mutable selected pad and tower type |
| future replay | none | no adapter | cannot reproduce requests |

## Required source adapters

Every source must normalize to the same command contract:

```txt
browser-pointer
browser-keyboard
browser-wheel
browser-focus
GameHost
replay
fixture
```

The source adapter may translate coordinates or key intent, but it must not mutate campaign state.

## Admission rules

- Pointer coordinates must be converted once and embedded in the command payload.
- Drag selection must capture normalized bounds at release.
- GameHost build requests must include explicit pad ID and tower type rather than read mutable UI selection implicitly.
- Pause and camera commands must have explicit gameplay-versus-presentation classification.
- Replay and fixtures must bypass DOM APIs while using the same command definition and preflight.
- Unknown source kinds, action types, IDs, or payloads must return typed rejection results.

## Diagnostic projection

Expose clone-safe rows only:

```txt
latestRequestedCommand
latestTerminalResult
pendingCommandCount
lastAppliedSequence
lastAppliedTick
latestStateFingerprint
latestCommittedFrameId
```

Do not expose the mutable `state` or `camera` objects as the primary authority surface. Preserve legacy references temporarily for compatibility, clearly marked as unsafe.