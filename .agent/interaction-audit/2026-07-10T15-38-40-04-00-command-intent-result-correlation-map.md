# Interaction audit: command intent/result correlation map

Timestamp: `2026-07-10T15-38-40-04-00`

## Current input map

| Input | Current behavior | Observable result |
|---|---|---|
| Menu pointer or keyboard | changes menu selection and activates routes/panels | menu state through `PhantomMenu.getState()` |
| Begin Campaign | routes to `game.html?campaign=new` | URL transition only |
| Continue | routes to `game.html?campaign=continue` when any save key exists | URL transition only; campaign ignores mode |
| Left click unit | replace/add/toggle allied selection | mutation only |
| Left click empty pad | select pad | mutation only |
| Second left click selected pad | attempt tower build | accepted mutation or silent no-op |
| Drag selection | replace allied selection inside projected bounds | mutation only |
| Right click | order selected units or target nearest enemy | accepted mutation or silent no-op |
| Space | start next wave | accepted mutation or silent no-op |
| 1/2/3 | change selected tower type | mutation only |
| WASD/arrows | pan camera | camera mutation |
| Wheel | zoom around pointer | camera mutation |
| Middle drag | pan camera | camera mutation |
| F | focus selected units or center | camera mutation |
| P | toggle pause | mutation only |
| R | reload page | browser reload |
| Escape | return to menu | route change |

## Interaction problems

1. Inputs call mutation functions directly instead of emitting command envelopes.
2. Accepted and rejected outcomes are not represented uniformly.
3. `selectAt` conflates pad selection and build execution.
4. Right-click intent cannot be replayed without storing source-space world coordinates and target resolution.
5. Camera operations are not correlated with render frames.
6. Menu session intent is lost when the campaign module starts.
7. `window.GameHost.state` exposes direct mutable state, allowing external changes that bypass input and result attribution.

## Required command envelope

```txt
CampaignCommand
  commandId
  sequence
  sessionId
  requestedFrameId
  source: menu | pointer | keyboard | gamehost | replay
  type
  payload
  timestampPolicy: logical
```

## Required result envelope

```txt
CampaignCommandResult
  commandId
  sequence
  sessionId
  appliedFrameId
  type
  status: accepted | rejected | no-op | skipped | unsupported
  reason
  stateBeforeFingerprint
  stateAfterFingerprint
  emittedEvents
```

## Correlation rule

Every state-changing route, menu, pointer, keyboard, GameHost, or replay request must produce exactly one command result. A rejected or no-op command must preserve the state fingerprint and still advance the command sequence so diagnostics and fixtures can prove what happened.
