# PhantomCommand Validation

**Timestamp:** `2026-07-12T09-28-05-04-00`

## Summary

This run changed documentation only. Source inspection proves that source-coordinate containment and row hit tests exist, but the canvas `pointerdown` path activates the current selection after a miss. No executable pointer-target or miss-safety fixture currently exists.

## Plan ledger

**Goal:** distinguish coordinate projection and visual selection from admitted pointer targeting.

- [x] Inspect `screenToSource()` contain projection and `inside` classification.
- [x] Inspect `menuHitIndex()` and `panelHitIndex()`.
- [x] Inspect pointer move and pointer down paths.
- [x] Inspect keyboard activation and hidden-button activation separately.
- [x] Confirm pointer miss results are discarded before action execution.
- [x] Confirm settings-panel misses execute the current selected row.
- [x] Document command, hit-result, generation, observation and fixture requirements.
- [ ] Execute fixtures after implementation.

## Proven from source

```txt
canvas covers the viewport
source frame is 480x270
renderer uses contain projection
screenToSource returns x, y and inside
letterbox coordinates produce inside=false
menuHitIndex returns -1 outside actionable rows
panelHitIndex returns -1 outside settings rows
pointer move only updates selection after a hit
no-panel pointerdown always calls activateMain(current selection)
settings pointerdown always calls activatePanel(current selection)
keyboard Enter/Space intentionally activates current selection
```

## Existing checks prove

```txt
menu and campaign HTML/module references exist
menu labels and campaign URLs exist
PhantomMenu and GameHost globals exist
CRT and campaign source tokens exist
static build copies source files
```

## Existing checks do not prove

```txt
background pointer misses are inert
letterbox pointer misses are inert
between-row clicks are inert
settings-panel misses are inert
pointer hit belongs to current surface or panel generation
stale hit results are rejected
disabled targets return typed results
pointer result correlates with route or settings revision
keyboard and pointer admission remain distinct
```

## Change boundary

```txt
runtime source changed: no
menu behavior changed: no
campaign behavior changed: no
pointer behavior changed: no
keyboard behavior changed: no
rendering changed: no
audio changed: no
persistence changed: no
navigation changed: no
package scripts changed: no
dependencies changed: no
deployment changed: no
branch created: no
pull request created: no
npm run check: not run
npm run build: not run
browser pointer smoke: not run
```

## Required fixtures

```txt
fixture:pointer-background-miss
fixture:pointer-letterbox-left-right-miss
fixture:pointer-letterbox-top-bottom-miss
fixture:pointer-between-row-miss
fixture:pointer-disabled-target
fixture:pointer-settings-background-miss
fixture:pointer-settings-outside-miss
fixture:pointer-stale-surface-generation
fixture:pointer-stale-panel-generation
fixture:pointer-selection-revision
fixture:pointer-hit-action-correlation
smoke:menu-pointer-target-browser
smoke:menu-keyboard-pointer-parity
smoke:pages-pointer-target
```

No pointer-target correctness, miss safety, stale-result rejection or pointer-to-action correlation claim is made.