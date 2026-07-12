# PhantomCommand Known Gaps

**Timestamp:** `2026-07-12T09-28-05-04-00`

## Summary

The newest documented gap is menu pointer-hit admission. The runtime computes valid hit and miss information, but the `pointerdown` path executes the previously selected command even when the current event hit no actionable target.

## Plan ledger

**Goal:** preserve keyboard selection while making pointer execution require a current, generation-bound target.

- [ ] Pointer-event identity.
- [ ] Surface and panel generation identity.
- [ ] Selection revision identity.
- [ ] Typed source-coordinate projection result.
- [ ] Typed menu and settings hit-test results.
- [ ] Pointer activation admission.
- [ ] Explicit miss and outside-surface no-op results.
- [ ] Stale hit-result rejection.
- [ ] Disabled-target result.
- [ ] Pointer action observation and bounded journal.
- [ ] Background, letterbox and settings-panel miss fixtures.
- [ ] Real-browser pointer-target smoke.
- [ ] Retain audio, bootstrap, host, render, combat and checkpoint gates.

## Pointer-hit gaps

```txt
pointer command ID: absent
surface generation: absent
panel generation: absent
selection revision fence: absent
typed coordinate projection: absent
typed Hit/Miss result: absent
pointer miss rejection: absent
letterbox miss rejection: absent
settings-panel miss rejection: absent
stale target rejection: absent
disabled-target result: absent
pointer action journal: absent
browser target fixtures: absent
```

## Concrete risks

```txt
first click on any canvas background can start Begin Campaign
clicking a letterbox margin can activate the selected menu item
clicking between rows can activate the previously selected row
settings panel background can toggle the selected setting
hovering one row and clicking elsewhere can execute the hovered row
visual selection is incorrectly treated as current pointer targeting evidence
```

## Retained gaps

```txt
Campaign Begin and Continue still lack validated bootstrap and hydration
GameHost exposes live mutable owners
CPU and GLSL CRT projection differ
campaign phase does not fence commands
commands are not fixed-step scheduled
combat liveness and exclusive terminal result remain unimplemented
runtime RAF/listener/WebGL lifecycle remains unowned
menu audio activation and lifecycle remain unimplemented
full checkpoint capture and replay remain incomplete
```

## Completion boundary

Do not claim pointer-target correctness because `menuHitIndex()` or `panelHitIndex()` exists. Completion requires miss-safe admission, current target identity, stale-result rejection and browser evidence.