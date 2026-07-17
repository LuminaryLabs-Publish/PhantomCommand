# Known Gaps

**Generated:** `2026-07-17T11-39-49-04-00`  
**Status:** `campaign-camera-coverage-bounds-authority-audited`

## Current priority

The circular grave-ring arena has an outer radius of `147`, while the runtime admits camera centers inside a square `[-147,147] × [-147,147]`. The camera constraint does not account for zoom, the visible isometric source footprint or a declared minimum-coverage policy.

## Confirmed by inspection

```txt
fixed 640x360 source surface: present
isometric world/source transforms: present
camera projection origin at (320,210): present
zoom range 0.34..2.45: present
keyboard pan: present
middle pan: present
wheel-anchor zoom: present
focus command: present
public mutable camera reference: present
independent x/z frame clamp: present
```

## Camera-coverage gaps

```txt
circular camera-center policy: absent
explicit aesthetic overscan policy: absent
zoom-aware visible-footprint envelope: absent
minimum arena-coverage invariant: absent
sanctum visibility invariant: absent
selection-focus visibility invariant: absent
shared admission for all camera producers: absent
pre-render camera-boundary settlement: absent
stale viewport/projection/zoom rejection: absent
CameraCoverageResult: absent
FirstCameraBoundsFrameAck: absent
```

## Quantified boundary row

```txt
outer ring radius: 147
square-clamp corner radius: 207.89
excess beyond outer ring: 60.89
excess ratio: 41.42%
```

The current source-corner footprint also ranges from approximately `1525.18` world units at minimum zoom to `211.66` at maximum zoom. A strict whole-frame-inside-arena policy is therefore not achievable and should not be assumed.

## Validation gaps

```txt
keyboard edge fixture: absent
middle-pan edge fixture: absent
wheel-anchor boundary fixture: absent
focus boundary fixture: absent
public-host mutation fixture: absent
minimum/default/maximum zoom fixture: absent
resize/DPR stale-envelope fixture: absent
built artifact parity: not run
Pages parity: not run
```

## Risk boundary

No specific production incident was reproduced. The source-backed risk is that camera reachability and tactical arena visibility are determined by incidental axis clamps rather than a named, observable gameplay and render policy.

## Claim boundary

Do not claim camera-boundary correctness, anchor preservation, coverage guarantees, artifact parity, Pages parity or production readiness until executable fixtures pass.