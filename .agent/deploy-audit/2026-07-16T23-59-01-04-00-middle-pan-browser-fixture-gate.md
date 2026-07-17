# Deploy Audit — Middle-Pan Browser Fixture Gate

**Timestamp:** `2026-07-16T23-59-01-04-00`  
**Status:** `isometric-middle-pan-anchor-convergence-authority-audited`

## Required gate

A build is not proven for camera grab-pan behavior until the source route, staged `dist/` artifact and deployed Pages origin all satisfy the same fixture set.

## Fixtures

```txt
load game.html
capture initial camera and source/world anchor
perform horizontal middle drag left and right
perform vertical middle drag up and down
perform four diagonal drags
repeat at min, default and max zoom
repeat against each camera boundary
repeat after resize into letterbox and pillarbox layouts
cancel with blur and pointer cancellation
verify no stale gesture evidence applies
verify MiddlePanResult
verify FirstMiddlePanFrameAck
verify PanAnchorConvergenceAck
```

## Evidence required

- Source commit and built-artifact digest.
- Browser/version and viewport/DPR matrix.
- Initial and settled camera revisions.
- Expected and measured source anchor error.
- Explicit clamped-boundary results.
- Pages deployment revision and origin capture.

## Current state

```txt
npm run check: not run
npm run build: not run
source browser fixture: not run
built artifact fixture: not run
Pages fixture: not run
```

No deployment or production-readiness claim is made.