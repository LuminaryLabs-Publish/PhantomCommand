# PhantomCommand Next Steps

**Timestamp:** `2026-07-13T02-49-07-04-00`

## Summary

Implement Accessible Command and Focus Projection Authority before claiming parity between the visual canvas menu, hidden native controls, keyboard input and assistive technology. Start with one command identity pipeline, then add availability parity, panel focus ownership and dynamic campaign status projection.

## Plan ledger

**Goal:** replace independent visual, DOM and global-keyboard activation paths with one typed, deduplicated and accessibility-aware command/result surface.

### Command identity and admission

- [ ] Give every menu and campaign action a stable command ID.
- [ ] Identify activation source and event sequence.
- [ ] Bind visual selection, focused control and focus generation.
- [ ] Reject focused-control and visual-command disagreement.
- [ ] Suppress the second half of native Enter/Space activation.
- [ ] Return typed accepted, unavailable, duplicate, stale and conflict results.
- [ ] Gate `window.PhantomMenu.activate()` through the same authority.

### Native control projection

- [ ] Reflect Continue availability with native `disabled` and `aria-disabled`.
- [ ] Synchronize visual selection and native focus without forcing pointer-hover focus.
- [ ] Expose selected/current state through native semantics.
- [ ] Project transition-in-progress and command results.
- [ ] Keep visual and native command IDs revision-aligned.

### Panel focus lifecycle

- [ ] Create native Settings and Credits panel structures.
- [ ] Transfer focus to the first panel control on open.
- [ ] Make background menu controls inert while a panel is active.
- [ ] Constrain keyboard activation to the current focus scope.
- [ ] Restore focus to the invoking control on close.
- [ ] Persist settings only after an accepted control result.

### Campaign accessibility

- [ ] Give the campaign canvas an explicit focus/admission policy.
- [ ] Add native commands for start wave, tower choice, pause and restart.
- [ ] Publish a bounded accessible status read model.
- [ ] Update live output for souls, sanctum health, wave, messages and terminal state.
- [ ] Announce selection, order and build results without per-frame flooding.
- [ ] Correlate accessible output with committed game/frame revisions.

### Proof

- [ ] Focus each native menu control and press Enter and Space.
- [ ] Prove exactly one matching command result.
- [ ] Prove disabled Continue cannot receive focus or activation.
- [ ] Prove panel open isolates background controls and restores focus.
- [ ] Prove settings values match visual and native states.
- [ ] Prove campaign status changes are announced once and in order.
- [ ] Run source, built-output and Pages parity fixtures.
- [ ] Run `npm run check` and `npm run build` after fixture wiring.

## Existing owners to update

```txt
index.html
game.html
src/menu/graveyard-menu.js
src/menu/graveyard-art.js
src/campaign/campaign-scene.js
menu-route-kit
campaign-route-shell-kit
pixel-campaign-runtime-kit
pixel-campaign-render-kit
legacy-gamehost-diagnostics-kit
menu-static-check-kit
campaign-static-check-kit
scripts/check-menu.mjs
scripts/check-campaign.mjs
package.json
```

## Dependency order

```txt
Accessible Command Identity
  -> Native Availability Projection
  -> Focus Scope and Panel Lifecycle
  -> Campaign Accessible Status Read Model
  -> Visual/Accessible Result Acknowledgement
  -> source/build/Pages parity proof
```

Do not fix this only by stopping propagation on one event. Native keyboard activation, assistive activation, programmatic click, global keyboard ingress and public host commands must converge on one exact command/result authority.
