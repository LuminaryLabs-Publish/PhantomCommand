# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Last aligned:** `2026-07-12T19-58-07-04-00`  
**Status:** `campaign-spatial-input-admission-authority-audited`

## Summary

PhantomCommand is a static pixel-isometric campaign game with procedural menu art, CRT presentation, fixed-step combat, browser persistence and public diagnostics. The current audit isolates Campaign Spatial Input Admission Authority: campaign pointer handlers ignore source containment, do not invert the visible CRT curve, do not own pointer gestures, and map drag rectangles into an incorrect world selection region.

## Plan ledger

**Goal:** require current surface, pointer, transform and geometric evidence before any campaign pointer gesture mutates selection, orders or camera state.

- [x] Compare all ten Publish repositories and nine eligible central ledgers.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm no new, ledger-missing or root-agent-missing repository takes priority.
- [x] Select only `PhantomCommand` as the oldest eligible central entry.
- [x] Identify the complete interaction loop, all domains, 20 implemented kits and offered services.
- [x] Trace containment, CRT projection, pointer lifecycle, selection, orders, camera pan and zoom.
- [x] Prove the two-corner drag-selection geometry defect with a concrete coordinate row.
- [x] Add timestamped tracker and architecture/system audits.
- [x] Refresh required root `.agent` state.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime fixes and executable spatial-input fixtures remain future work.

## Read this first

```txt
.agent/trackers/2026-07-12T19-58-07-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T19-58-07-04-00.md
.agent/architecture-audit/2026-07-12T19-58-07-04-00-campaign-spatial-input-admission-authority-dsk-map.md
.agent/render-audit/2026-07-12T19-58-07-04-00-crt-visible-world-selection-geometry-gap.md
.agent/gameplay-audit/2026-07-12T19-58-07-04-00-campaign-pointer-selection-order-loop.md
.agent/interaction-audit/2026-07-12T19-58-07-04-00-pointer-sample-projection-selection-result-map.md
.agent/campaign-input-audit/2026-07-12T19-58-07-04-00-containment-crt-drag-polygon-contract.md
.agent/deploy-audit/2026-07-12T19-58-07-04-00-campaign-spatial-input-fixture-gate.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

## Current interaction loop

```txt
PointerEvent
  -> screenToSource returns x, y and inside
  -> campaign stores inside but does not enforce it
  -> visible CRT curvature is not inverted
  -> pointer identity and capture are not tracked
  -> point/drag/order/camera logic consumes raw projected coordinates
  -> drag selection transforms only two rectangle corners
  -> mutable campaign or camera state changes
  -> no terminal spatial-input result or visible-frame acknowledgement
```

## Main findings

```txt
outside visible source can select, order, pan and zoom
logical pointer geometry does not match visible CRT curvature
pointer down/move/up are not bound by pointer identity
pointercancel and lost capture are not handled
drag selection maps a source rectangle with only two inverse points
40 x 20 source rectangle can collapse the tested world-z interval to zero
projection results cite no surface, transform, camera, entity or selection revision
no typed miss, stale, cancellation or first-visible-frame result exists
```

## Required parent domain

```txt
phantom-command-campaign-spatial-input-admission-authority-domain
```

Required flow:

```txt
pointer evidence
  -> surface and focus admission
  -> pointer/button/capture admission
  -> viewport and CRT inverse projection
  -> typed source containment
  -> revisioned world projection
  -> point, polygon, order or camera result
  -> terminal SpatialInputResult
  -> Campaign Action Result Authority
  -> first visible successor frame acknowledgement
```

## Kit census

```txt
implemented source-backed kits: 20
planned spatial-input authority kits: 33
```

The complete per-kit service map is in the current tracker and machine registry.

## Validation boundary

```txt
runtime/pointer/selection/order/camera/render behavior changed: no
package scripts/dependencies/deployment changed: no
npm run check: not run
npm run build: not run
browser/Pages spatial-input smoke: not run
spatial-input fixtures: unavailable
branch created: no
pull request created: no
```

Do not treat the `inside` field, visible marquee or changed selection as spatial-input proof. Completion requires typed containment, transform revision, pointer ownership, correct polygon membership, one terminal result and first-visible-frame acknowledgement.
