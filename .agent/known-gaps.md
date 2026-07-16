# Known Gaps

**Generated:** `2026-07-16T04-27-44-04-00`  
**Status:** `motion-preference-animation-admission-authority-audited`

## Current priority

- Neither route observes `prefers-reduced-motion`.
- No product motion override or source-precedence rule exists.
- No normal, reduced or static motion-policy snapshot exists.
- Essential campaign simulation is not classified separately from optional presentation motion.
- Menu fog, twinkle, crow flap, reaper sway, selection pulse and pointer parallax always animate.
- Route flash/fade always uses the normal transition duration.
- CRT flicker and grain always use frame time when CRT is enabled.
- Campaign entity animation, effects and camera easing have no reduced-motion adapter.
- Construction choreography has no reduced/static settlement path.
- Live preference changes have no route-generation or stale-listener protection.
- No `MotionProjectionResult` exists.
- No `FirstReducedMotionMenuFrameAck` exists.
- No `FirstReducedMotionCampaignFrameAck` exists.
- No browser, built-artifact or Pages fixture proves reduced-motion behavior.

## Source-backed evidence

```txt
index.html reduced-motion CSS/media query: absent
game.html reduced-motion CSS/media query: absent
menu motion matchMedia observer: absent
campaign motion matchMedia observer: absent
menu time-based motion: present
CRT uTime flicker and grain: present
campaign animation effects and camera easing: present
motion result and acknowledgements: absent
```

## Not claimed

```txt
accessibility conformance
vestibular safety
operating-system preference adoption
product override correctness
simulation parity under reduced presentation
live preference-change correctness
reduced-motion visible-frame convergence
built artifact or Pages parity
production readiness
```

## Retained gaps

Campaign audio, pointer capture/cancellation, pointer feedback, menu audio lifecycle, diagnostics, device coverage, render order, pause input, terminal settlement, startup readiness, settings adoption, victory persistence, route retirement, fixed-step scheduling, WebGL recovery, accessibility, combat modifiers, campaign bootstrap, keyboard commands and spatial input remain separately documented.