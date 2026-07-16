# Render Audit — Continuous Motion Reduced-Frame Gap

**Timestamp:** `2026-07-16T04-27-44-04-00`

## Summary

Both routes render time-dependent Canvas2D layers and feed them through a CRT shader whose flicker and grain depend on `uTime`. No render policy can produce a reduced-motion frame while preserving the same accepted menu or campaign state.

## Plan ledger

**Goal:** identify every visible motion surface that must consume one shared motion-policy snapshot before presentation.

- [x] Trace menu Canvas2D animation.
- [x] Trace CRT time-dependent shader effects.
- [x] Trace campaign entity, effect and camera motion.
- [x] Separate static composition from optional motion.
- [ ] Prove a reduced-motion frame in a browser.

## Menu frame

```txt
performance time
  -> fog drift
  -> star twinkle
  -> crow wing flap
  -> reaper sway and eye pulse
  -> selected-item pulse
  -> pointer parallax
  -> transition flash and fade
  -> CRT flicker and grain
  -> presented frame
```

## Campaign frame

```txt
fixed-step accepted state
  -> entity animation frames
  -> projectile and hit effects
  -> camera velocity and zoom easing
  -> terminal overlay
  -> CRT flicker and grain
  -> presented frame
```

## Missing render evidence

```txt
motion policy revision: absent
normal/reduced/static render mode: absent
shader motion suppression: absent
Canvas2D motion adaptation: absent
camera/effect adaptation: absent
reduced-motion presented-frame acknowledgement: absent
```

## Required render rule

A reduced-motion frame should preserve layout, selection, hit regions, wave state, combat state, resource values, terminal outcomes and readable feedback. It may freeze or reduce ornamental fog, parallax, twinkle, pulsing, character sway, shader flicker/noise and transition animation. Campaign simulation must not be paused merely because visual motion is reduced.

## Validation boundary

No screenshot, browser trace or assistive preference fixture was produced. The gap is established through source inspection.