# Next Steps

**Generated:** `2026-07-17T23-41-44-04-00`  
**Status:** `menu-pointer-target-admission-authority-audited`

## Intent

Require a valid pointer target before pointer input can activate a main-menu item, mutate a setting or dismiss a panel, while preserving keyboard selection behavior.

## Checklist

### Phase 1: Target model

- [ ] Define `MenuPointerTargetResult` classifications: outside-source, background, disabled-item, main-item, settings-item and dismiss-target.
- [ ] Bind target decisions to source-mapping, panel, row-layout and enablement generations.
- [ ] Keep keyboard selection activation as a separate explicit producer.
- [ ] Define whether Credits intentionally dismisses anywhere inside the panel or only on an authored target.

### Phase 2: Admission

- [ ] Return immediately on outside-source and background pointer results.
- [ ] Reject disabled items with a typed reason.
- [ ] Activate the exact main-menu row under the pointer.
- [ ] Mutate the exact settings row under the pointer.
- [ ] Never consume stale `menu.selected` or `state.panel.selected` after a pointer miss.
- [ ] Publish `MenuActionResult`.

### Phase 3: Frame proof

- [ ] Carry the accepted action generation into route, panel or settings state.
- [ ] Publish a menu action frame digest.
- [ ] Publish `FirstMenuPointerActionFrameAck`.
- [ ] Keep rejection frames state-stable except for an explicitly authored feedback cue.

### Phase 4: Fixtures

- [ ] Main-menu background click fixture for every retained selection.
- [ ] CRT letterbox/outside-source click fixture.
- [ ] Disabled Continue fixture.
- [ ] Valid main-row exact-action fixture.
- [ ] Settings background no-mutation fixture.
- [ ] Valid settings-row exact-mutation fixture.
- [ ] Keyboard Enter/Space compatibility fixture.
- [ ] Source, built-artifact and Pages parity fixtures.

## Recommended file cut

```txt
src/menu/graveyard-menu.js
src/menu/menu-pointer-target.js
scripts/check-menu.mjs
tests/browser/menu-pointer-target.html
```

## Compatibility constraints

Preserve procedural menu art, current row geometry, keyboard navigation, enabled Continue behavior, settings semantics, audio unlock behavior, transition timing, CRT presentation, campaign runtime and deployment unless the pointer-target contract explicitly requires otherwise.

## Claim boundary

Do not claim accidental-action prevention or menu pointer correctness until executable source, artifact and Pages fixtures prove exact target admission and matching visible state.