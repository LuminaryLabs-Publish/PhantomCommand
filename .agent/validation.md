# PhantomCommand Validation

**Timestamp:** `2026-07-12T16-00-03-04-00`

## Summary

This documentation-only run verifies the current menu pointer projection, hit and dispatch paths. Source inspection proves that a failed main-menu or settings hit does not stop action execution, and that input projection does not invert the visible CRT curve. It does not prove a runtime correction or deployed pointer safety.

## Plan ledger

**Goal:** separate source-backed pointer defects from unimplemented geometry, admission and browser proof.

- [x] Compare the Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome` and select only `PhantomCommand`.
- [x] Verify required root `.agent` files and new timestamped audit family.
- [x] Preserve all 20 implemented kits and offered services.
- [x] Inspect menu hit geometry, pointer listeners, CRT projection and checks.
- [x] Change documentation only.
- [ ] Execute pointer fixtures after implementation.

## Proven from source

```txt
source menu size: 480 × 270
main menu items: 4
settings rows: 4
screenToSource reverses aspect containment
screenToSource returns inside boolean
CRT render path applies optional curveUv
input path does not invert curveUv
main pointerdown calls activateMain after hit test regardless of hit status
panel pointerdown calls activatePanel after hit test regardless of hit status
pointer button policy is absent
isPrimary policy is absent
pointer capture/cancel is absent
menu static check dispatches no input events
```

## Proven documentation state

```txt
START_HERE current: yes
current-audit current: yes
next-steps current: yes
known-gaps current: yes
validation current: yes
kit-registry current: yes
tracker and turn ledger present: yes
architecture/render/gameplay/interaction/menu-input/deploy audits present: yes
central ledger and internal change log required: yes
```

## Existing checks can establish, when run

```txt
menu and campaign entry files exist
menu source includes expected route and public-host tokens
procedural graveyard and CRT shader symbols exist
campaign source includes expected runtime/render tokens
static build includes source files
```

## Existing checks cannot establish

```txt
pointer miss rejection
letterbox rejection
settings miss zero mutation
primary pointer/button policy
pointer sequence dedupe
visible/logical CRT geometry parity
stale transform/layout/panel rejection
typed hit and action results
keyboard/accessibility source identity
first visible action-frame acknowledgement
local/build/Pages pointer parity
```

## Required deterministic fixtures

```txt
fixture:menu-layout-descriptors
fixture:pointer-containment-wide
fixture:pointer-containment-tall
fixture:crt-forward-inverse-roundtrip
fixture:main-control-center-hits
fixture:main-row-gap-misses
fixture:settings-control-center-hits
fixture:settings-row-gap-misses
fixture:pointer-primary-policy
fixture:pointer-secondary-rejection
fixture:stale-transform-rejection
fixture:duplicate-pointer-sequence
fixture:transition-fence
fixture:keyboard-accessibility-parity
```

## Required browser matrix

```txt
source route, built output and GitHub Pages
CRT on and off
wide and tall aspect ratios
DPR 1 and 2
mouse, touch and pen primary policy
main and settings center hits
row gaps, empty canvas and letterbox misses
resize between sample and commit
transition already active
first visible action frame
```

## Change boundary

```txt
runtime source changed: no
menu behavior changed: no
pointer behavior changed: no
keyboard/accessibility behavior changed: no
settings behavior changed: no
navigation behavior changed: no
audio behavior changed: no
campaign behavior changed: no
rendering changed: no
package scripts changed: no
dependencies changed: no
deployment changed: no
branch created: no
pull request created: no
target branch: main
npm run check executed: no
npm run build executed: no
browser pointer smoke executed: no
Pages pointer smoke executed: no
pointer-admission fixtures available: no
```

## Claim boundary

The audit proves that hit-test failure is not an action fence and that displayed CRT geometry is not the same declared transform used by input. It does not claim the defect is fixed, the menu is pointer-safe, or the deployed route has passed geometry fixtures.