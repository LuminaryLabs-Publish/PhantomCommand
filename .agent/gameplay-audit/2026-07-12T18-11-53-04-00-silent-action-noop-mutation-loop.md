# Silent Campaign Action No-op and Mutation Loop

**Timestamp:** `2026-07-12T18-11-53-04-00`

## Summary

Campaign actions are expressed as direct helper calls against one mutable aggregate. The same call surface represents success, rejection and no effect because helpers return `undefined` in every case.

## Action matrix

| Action | Current source | Success mutation | Current rejection |
|---|---|---|---|
| Start wave | Space / `GameHost.startWave()` | spawn queue, `waveActive`, message | silent return for active, terminal or exhausted campaign |
| Build tower | second pad click / `GameHost.build()` | pad, souls, tower, effect, message | silent return for missing pad, occupied pad or insufficient souls |
| Select | left click/drag | selection and selected pad | no result; empty click mutates selection |
| Order | right click | target or move for selected units, effect | silent return for empty selection; missing IDs skipped |
| Tower type | number keys | direct `towerType` replacement | no schema or result |
| Pause | P key | direct boolean toggle | no phase/capability result |
| Restart | R key | document reload | no coordinated campaign result |
| Zoom | wheel / `GameHost.setZoom()` | camera target mutation | clamp only; no result |

## Risk loop

```txt
caller emits intent
  -> helper reads live mutable state
  -> helper may partially mutate several resources
  -> helper returns undefined
  -> caller cannot retry safely or explain rejection
  -> frame loop advances simulation
  -> renderer displays whatever state now exists
```

## Multi-resource atomicity gaps

```txt
build: selected pad + pad occupancy + souls + tower registry + effect + message
wave start: wave index + spawn queue + waveActive + message
selection: selected IDs + selectedPad
order: target/move fields for N units + effect
```

There is no prepare phase, rollback, change set or terminal result tying these mutations together.

## Required gameplay result classes

```txt
BuildCommitted / BuildRejected
WaveStartCommitted / WaveStartRejected
SelectionCommitted / SelectionRejected
OrderCommitted / OrderRejected
TowerTypeCommitted / TowerTypeRejected
PauseCommitted / PauseRejected
RestartCommitted / RestartRejected
CameraActionCommitted / CameraActionRejected
```

## Completion boundary

Gameplay action authority is not complete until all action paths return one terminal result, rejected paths prove zero mutation, accepted paths identify exact changed resources and the first visible frame cites the successor campaign revision.