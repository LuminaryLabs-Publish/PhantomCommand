# Known Gaps

**Generated:** `2026-07-17T06-38-14-04-00`  
**Status:** `campaign-input-region-arbitration-authority-audited`

## Current priority

The campaign source canvas visually layers HUD, tower controls, minimap and modal overlays above the world. Pointer handlers map browser evidence into source coordinates but do not enforce the returned `inside` flag or classify the topmost visible region before issuing world commands.

## Confirmed by inspection

```txt
fixed 640x360 source surface: present
CRT browser-to-source mapping: present
source x/y/inside result: present
HUD/control/minimap/modal drawing: present
click selection: present
marquee selection: present
right-click orders: present
```

## Input-region gaps

```txt
inside-source rejection: absent
source-region manifest: absent
visible z-order resolver: absent
HUD hit-region authority: absent
tower-control hit-region authority: absent
minimap interaction policy: absent
modal world-input suspension result: absent
gesture-region lease: absent
stale route/frame/manifest rejection: absent
InputRegionDecisionResult: absent
WorldCommandAdmissionResult: absent
FirstRegionBoundCommandFrameAck: absent
```

## Validation gaps

```txt
HUD no-fallthrough browser fixture: absent
control-strip no-marquee fixture: absent
minimap no-order fixture: absent
modal suspension fixture: absent
letterbox rejection fixture: absent
unobscured world behavior fixture: absent
built artifact parity: not run
Pages parity: not run
```

## Risk boundary

No specific production incident was reproduced. The source-backed risk is that the rendered topmost target and the interaction target can disagree because the renderer owns visible regions while campaign commands consume only source coordinates.

## Claim boundary

Do not claim region-aware command safety, artifact parity, Pages parity or production readiness until executable fixtures pass.