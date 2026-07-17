# Known Gaps

**Generated:** `2026-07-16T23-59-01-04-00`  
**Status:** `isometric-middle-pan-anchor-convergence-authority-audited`

## Current priority

- Browser pointer coordinates are mapped into the 640×360 source surface.
- Middle pointerdown stores a source-space position.
- Middle pointermove calculates source-space dx/dy.
- The canonical inverse transform uses `1 / 1.44` for horizontal source motion.
- The active middle-pan path uses `1 / 0.72` for horizontal source motion.
- Horizontal camera displacement is therefore twice the canonical grabbed-anchor displacement.
- Vertical displacement uses the canonical `1 / 0.72` term.
- The pointer-down world anchor is not retained.
- Keyboard and middle-pan camera mutations have no explicit arbitration result.
- Camera-boundary divergence is not classified.
- No `MiddlePanResult` exists.
- No `FirstMiddlePanFrameAck` exists.
- No `PanAnchorConvergenceAck` exists.
- No browser, built-artifact or Pages fixture measures anchor error.

## Source-backed evidence

```txt
screen-to-source mapping: present
canonical screenToWorld transform: present
middle-button gesture state: present
source dx/dy calculation: present
duplicated middle-pan transform: present
canonical horizontal coefficient: absent from middle-pan path
grabbed world-anchor snapshot: absent
typed result and frame acknowledgement: absent
```

## Not claimed

```txt
every player perceives the current pan as unusable
vertical middle pan is mathematically incorrect
keyboard camera pan is broken
wheel zoom is broken
selection, orders or combat are broken
browser artifact or Pages parity
production readiness
```

## Retained gaps

Marquee selection, wheel zoom, motion preference, campaign audio, pointer capture/cancellation, pointer feedback, menu audio lifecycle, diagnostics, device coverage, render order, pause input, terminal settlement, startup readiness, settings adoption, victory persistence, route retirement, fixed-step scheduling, WebGL recovery, accessibility, combat modifiers, campaign bootstrap, keyboard commands and broad spatial input remain separately documented.