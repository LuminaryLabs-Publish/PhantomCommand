# Known Gaps

**Generated:** `2026-07-16T17-40-04-04-00`  
**Status:** `isometric-marquee-selection-geometry-authority-audited`

## Current priority

- The visible drag box is represented in source-screen coordinates.
- Selection membership is evaluated in world coordinates.
- Only the normalized top-left and bottom-right screen corners are inverse-transformed.
- The isometric inverse transform makes world z increase with screen y and decrease with screen x.
- Top-right and bottom-left therefore contain the true world-z extrema.
- The current two-corner world box is not the inverse image of the visible screen rectangle.
- Camera and viewport revisions are not bound to one drag generation.
- Pointer-up does not publish an accepted, unchanged, cancelled, stale or invalid result.
- No `MarqueeSelectionResult` exists.
- No `FirstMarqueeSelectionFrameAck` exists.
- No browser, built-artifact or Pages fixture compares visible rectangle membership with the selected unit set.

## Source-backed evidence

```txt
source-space drag origin: present
source-space live pointer: present
visible normalized rectangle: present
top-left inverse transform: present
bottom-right inverse transform: present
top-right inverse transform: absent
bottom-left inverse transform: absent
screen-space unit membership: absent
four-corner polygon membership: absent
typed result and frame acknowledgement: absent
```

## Not claimed

```txt
every drag necessarily selects the wrong set
all camera states exhibit the same error magnitude
click selection is broken
orders or combat are broken
browser artifact or Pages parity
production readiness
```

## Retained gaps

Wheel zoom, motion preference, campaign audio, pointer capture/cancellation, pointer feedback, menu audio lifecycle, diagnostics, device coverage, render order, pause input, terminal settlement, startup readiness, settings adoption, victory persistence, route retirement, fixed-step scheduling, WebGL recovery, accessibility, combat modifiers, campaign bootstrap, keyboard commands and broad spatial input remain separately documented.
