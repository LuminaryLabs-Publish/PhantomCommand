# Event Command and Target-Tick Admission Map

**Timestamp:** `2026-07-11T11-51-06-04-00`

## Summary

Input adapters currently perform mutation. They must instead emit typed commands whose projection, phase, sequence and target tick are validated before fixed-step application.

## Plan ledger

**Goal:** separate input sampling from authoritative mutation and make every result observable.

- [x] Map browser and `GameHost` sources.
- [x] Map current direct mutation targets.
- [x] Define admission stages and result shapes.
- [ ] Implement adapters, queue and journal.

## Source map

| Source | Current target | Required command |
|---|---|---|
| left click | `selectAt` / `build` | `campaign.select-or-build` |
| right click | `order` | `campaign.order` |
| Space | `startWave` | `campaign.start-wave` |
| P | direct pause toggle | `campaign.set-paused` |
| 1/2/3 | direct tower type | `campaign.select-tower-type` |
| wheel | direct camera target zoom | `camera.zoom-anchor` |
| middle drag | direct camera position | `camera.pan` |
| WASD/arrows | mutable held-key set | `camera.move-intent` |
| `GameHost.startWave` | direct action | typed gateway command |
| `GameHost.build` | direct action | typed gateway command |
| `GameHost.setZoom` | direct camera mutation | typed gateway command |

## Admission chain

```txt
source adapter
  -> command envelope validation
  -> session/run fence
  -> projection revision validation
  -> phase admission
  -> gameplay preflight
  -> command sequence assignment
  -> target tick assignment
  -> queue admission result
```

## Result states

```txt
accepted-queued
rejected-invalid
rejected-stale-session
rejected-stale-projection
rejected-phase
rejected-gameplay
rejected-target-tick
duplicate-idempotent
duplicate-conflict
applied
superseded
```

## Invariant

No source adapter may mutate campaign state, camera authority or input latches after the gateway is installed. Debug and automation access must consume the same command result path as browser input.