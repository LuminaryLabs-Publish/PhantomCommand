# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Last aligned:** `2026-07-12T16-00-03-04-00`  
**Status:** `menu-pointer-hit-admission-authority-audited`

## Summary

PhantomCommand is a static pixel-isometric campaign game with a procedural graveyard menu, CRT WebGL presentation, persisted settings, Web Audio, fixed-step combat, browser persistence and public diagnostics.

The current audit isolates Menu Pointer-Hit Admission Authority. Pointer-down performs a hit test but dispatches the previously selected main-menu item or settings row even when the hit returns `-1`. Letterbox pixels, empty graveyard space and row gaps can therefore launch routes or mutate settings. The pointer transform also does not invert the visible CRT curve.

## Plan ledger

**Goal:** require a current visible control hit before pointer-sourced menu mutation, while retaining keyboard and accessible controls as explicit non-pointer command sources.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only `PhantomCommand` as the oldest eligible synchronized repository.
- [x] Identify the complete interaction loop, domains, 20 implemented kits and services.
- [x] Trace containment, hit, stale selection, settings mutation and CRT geometry.
- [x] Define typed pointer, hit, action, observation and visible-frame contracts.
- [x] Add timestamped tracker and architecture/system audits.
- [x] Refresh required root `.agent` state.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime fixes and executable pointer fixtures remain future work.

## Read this first

```txt
.agent/trackers/2026-07-12T16-00-03-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T16-00-03-04-00.md
.agent/architecture-audit/2026-07-12T16-00-03-04-00-menu-pointer-hit-admission-authority-dsk-map.md
.agent/render-audit/2026-07-12T16-00-03-04-00-crt-visible-control-hit-geometry-gap.md
.agent/gameplay-audit/2026-07-12T16-00-03-04-00-menu-miss-stale-action-loop.md
.agent/interaction-audit/2026-07-12T16-00-03-04-00-pointer-sample-hit-action-result-map.md
.agent/menu-input-audit/2026-07-12T16-00-03-04-00-miss-containment-curve-contract.md
.agent/deploy-audit/2026-07-12T16-00-03-04-00-menu-pointer-browser-fixture-gate.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

## Current pointer loop

```txt
pointer move
  -> project through aspect containment only
  -> update selection when a control is hit
  -> retain predecessor selection on miss

pointer down on main menu
  -> calculate hit
  -> optionally update selection
  -> always activate current selected item

pointer down in settings
  -> calculate row hit
  -> optionally update selected row
  -> always activate current selected row

render
  -> draw source controls
  -> contain and optionally curve them through CRT shader
  -> publish no input/action/frame provenance
```

## Main findings

```txt
main-menu miss can execute Begin, Continue, Settings or Credits
settings-panel miss can toggle CRT, grain or ambience, or close the panel
letterbox containment=false does not stop dispatch
non-primary button and secondary pointer are not rejected
pointer capture/cancel/down-up sequence is absent
visible CRT curve has no inverse input projection
static checks dispatch no pointer events
```

## Required parent domain

```txt
phantom-command-menu-pointer-hit-admission-authority-domain
```

Required flow:

```txt
physical input
  -> pointer/source identity and policy
  -> current surface/transform/layout/panel revisions
  -> visible-geometry projection
  -> typed containment and hit results
  -> zero-mutation rejection or one action command
  -> terminal action result
  -> first visible action-frame acknowledgement
```

Keyboard and hidden accessible buttons must identify their own input source and must not fabricate pointer evidence.

## Kit census

```txt
implemented source-backed kits: 20
planned pointer-admission authority kits: 27
```

The complete kit and offered-service inventory is in the current tracker and machine registry.

## Validation boundary

```txt
runtime/menu/pointer/render behavior changed: no
package scripts/dependencies/deployment changed: no
npm run check: not run
npm run build: not run
browser/Pages pointer smoke: not run
pointer-admission fixtures: unavailable
branch created: no
pull request created: no
```

Do not treat hover selection, source containment or a visible menu row as pointer admission proof. A pointer action requires a current successful hit result and one terminal action result.