# PhantomCommand Validation

**Timestamp:** `2026-07-12T22-00-46-04-00`

## Summary

This documentation-only run verifies the current campaign keyboard path. Source inspection proves that global listeners accept shortcuts without route/focus/editable-target admission, one-shot actions have no repeat policy, blur clears state without generation retirement, and no typed keyboard result or visible-frame acknowledgement exists.

## Plan ledger

**Goal:** separate source-backed keyboard-admission defects from unimplemented focus, repeat, lifecycle, command, result and browser proof.

- [x] Compare the Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome` and select only `PhantomCommand`.
- [x] Verify required root `.agent` files and the new timestamped audit family.
- [x] Preserve all 20 implemented kits and offered services.
- [x] Inspect campaign keyboard ingress, blur, camera, phase, navigation, rendering and static checks.
- [x] Change documentation only.
- [ ] Execute campaign keyboard fixtures after implementation.

## Proven from source

```txt
global keydown, keyup and blur listeners exist
keydown lowercases event.key and adds it to a held Set
WASD and Arrow keys drive camera movement in RAF
Space calls startWave directly
1/2/3 mutate towerType directly
P toggles paused directly
F mutates camera focus and targetZoom directly
R reloads directly
Escape navigates directly
event.repeat is not checked
canvas/route focus is not checked
editable targets are not excluded
blur clears held keys and pointer state
visibilitychange/pagehide/pageshow are not handled
keyboard/focus generations do not exist
listeners are not removed during route teardown
keyboard command IDs and terminal results do not exist
first visible keyboard-result frame acknowledgement does not exist
```

## Proven documentation state

```txt
START_HERE current: yes
current-audit current: yes
next-steps current: yes
known-gaps current: yes
validation current: yes
kit-registry current after final update: yes
tracker and turn ledger present: yes
architecture/render/gameplay/interaction/keyboard-input/deploy audits present: yes
central ledger and internal change log required: yes
```

## Existing checks can establish, when run

```txt
campaign entry files exist
campaign source includes expected authored/runtime/render tokens
CRT renderer symbols exist
window.GameHost token exists
static build includes source files
```

## Existing checks cannot establish

```txt
active route and focus ownership
editable-target exclusion
one-shot repeat rejection
exactly-once pause/wave/navigation commands
keyboard session and focus generations
blur/visibility/page lifecycle retirement
stale keyup and duplicate command rejection
held movement release correctness
typed CampaignKeyboardResult
campaign/camera/navigation consumer receipts
first visible keyboard-result frame acknowledgement
source/build/Pages keyboard parity
```

## Required deterministic fixtures

```txt
fixture:keyboard-pause-repeat-once
fixture:keyboard-wave-repeat-rejection
fixture:keyboard-tower-repeat-rejection
fixture:keyboard-editable-target
fixture:keyboard-inactive-route
fixture:keyboard-blur-generation
fixture:keyboard-visibility-generation
fixture:keyboard-pagehide-pageshow
fixture:keyboard-stale-keyup
fixture:keyboard-held-movement-release
fixture:keyboard-duplicate-command
fixture:keyboard-listener-retirement
fixture:keyboard-visible-result-frame
```

## Required browser matrix

```txt
source route, built output and GitHub Pages
canvas focused and unfocused
editable and non-editable targets
single press and auto-repeat
WASD/Arrow held movement
Space, 1, 2, 3, P, F, R and Escape
blur, visibility hidden/restored and pagehide/pageshow
stale and duplicate events
first visible keyboard-result frame
```

## Change boundary

```txt
runtime source changed: no
keyboard behavior changed: no
campaign behavior changed: no
camera/navigation behavior changed: no
rendering changed: no
package scripts changed: no
dependencies changed: no
deployment changed: no
branch created: no
pull request created: no
target branch: main
npm run check executed: no
npm run build executed: no
browser keyboard smoke executed: no
Pages keyboard smoke executed: no
keyboard fixtures available: no
```

## Claim boundary

The audit proves that current campaign keyboard input is globally admitted, repeat-sensitive and lifecycle-unversioned. It does not claim focus safety, exactly-once one-shot commands, stale-event rejection, listener retirement or deployed keyboard parity is implemented.