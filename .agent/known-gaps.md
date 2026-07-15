# PhantomCommand Known Gaps

**Timestamp:** `2026-07-14T23-38-29-04-00`

## Summary

World-space rendering lacks one complete painter contract. The current source depth-sorts only towers and units; projectiles, effects and the sanctum use fixed class order.

## Plan ledger

**Goal:** maintain an explicit list of unresolved render-order and evidence gaps.

- [x] Record source-backed ordering gaps.
- [x] Separate observed source behavior from unexecuted visual claims.
- [ ] Close each gap with implementation and executable proof.

## Gaps

```txt
frame identity: absent
simulation snapshot revision: absent
camera projection revision: absent
world-renderable descriptor: absent
shared depth-key service: absent
stable tie-break policy: absent
sanctum world-item admission: absent
projectile world-order admission: absent
effect world-order admission: absent
health-bar occlusion policy: implicit
immutable render plan: absent
per-item draw receipts: absent
stale mixed-revision frame rejection: absent
first CRT-visible ordered-frame acknowledgement: absent
headless ordering matrix: absent
Canvas2D pixel probes: absent
source/build/Pages parity fixture: absent
```

## Source-backed mismatch

```txt
entity painter order = ascending x + z
sanctum depth = 0
sanctum draw position = after every entity projectile and effect
```

Near-side objects with `x + z > 0` should be capable of occluding the sanctum but are drawn before it.

## Retained gaps

Earlier pause, terminal-outcome, startup, settings, save, lifecycle, scheduler, WebGL, accessibility, spatial-input, keyboard-input and combat-modifier gaps remain active until implemented and proven.
