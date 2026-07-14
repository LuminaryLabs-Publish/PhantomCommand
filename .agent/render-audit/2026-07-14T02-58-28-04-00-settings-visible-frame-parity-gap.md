# Settings Visible-Frame Parity Gap

**Timestamp:** `2026-07-14T02-58-28-04-00`

## Summary

The menu passes its live settings object into `renderer.render()` every frame. The campaign uses the same renderer implementation but always passes `{ crt: true, grain: "low", fade: 0 }`. A user can disable CRT or select high grain, see the menu change, enter the campaign and receive a contradictory campaign frame.

## Plan ledger

**Goal:** correlate accepted settings with the exact route, renderer generation and first visible frame that applied them.

- [x] Trace menu render uniforms.
- [x] Trace campaign render uniforms.
- [x] Identify the cross-route divergence.
- [x] Define visible-frame evidence.
- [ ] Add executable browser proof later.

## Current render path

```txt
menu frame
  -> renderer.render(now, { ...settings, fade })
  -> uCrtEnabled follows settings.crt
  -> uGrain follows settings.grain

campaign frame
  -> crt.render(now, { crt: true, grain: "low", fade: 0 })
  -> stored settings are not read
  -> selected menu values are not represented
```

## Missing evidence

```txt
settings revision: absent
route generation: absent
renderer application receipt: absent
uniform readback: absent
campaign capability result: absent
first matching visible frame acknowledgement: absent
source/build/Pages render parity fixture: absent
```

## Required frame envelope

```txt
SettingsFrameEnvelope
  settingsRevision
  routeGeneration
  rendererGeneration
  crtEnabled
  grainLevel
  ambienceCapability
  applicationResultId
  frameSequence
  presentedAt
```

## Acceptance rule

A route may claim settings readiness only after its renderer or audio participant accepts the same settings revision and the first resulting frame or audio state is acknowledged. Unsupported settings must be reported explicitly instead of silently replaced by route defaults.

## Validation boundary

No WebGL uniform, Canvas2D draw, audio graph or frame scheduler behavior changed in this audit.