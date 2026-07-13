# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Last aligned:** `2026-07-13T02-49-07-04-00`  
**Status:** `accessible-command-focus-projection-authority-central-reconciled`

## Summary

PhantomCommand is a static pixel-isometric campaign with a procedural canvas menu, hidden native menu buttons, CRT presentation, fixed-step combat, browser persistence and public diagnostics. The current boundary is Accessible Command and Focus Projection Authority: visual selection, DOM focus and native button activation are separate, so Enter or Space can activate the visually selected action instead of the focused control. Panel focus, native disabled-state projection and dynamic campaign status announcements are also unowned.

## Plan ledger

**Goal:** make every visual, keyboard, assistive-technology and public command resolve to one exact action identity, focus generation, availability result and accessible acknowledgement.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only PhantomCommand as the oldest eligible central entry.
- [x] Trace visual selection, hidden controls, Enter/Space activation, panels, focus, Continue availability and campaign status.
- [x] Preserve all 20 implemented kits and offered services.
- [x] Define the parent authority and candidate kit family.
- [x] Add the timestamped tracker and audit family.
- [x] Refresh root `.agent` state and central tracking.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime accessibility implementation and executable fixtures remain future work.

## Read this first

```txt
.agent/trackers/2026-07-13T02-49-07-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-13T02-49-07-04-00.md
.agent/architecture-audit/2026-07-13T02-49-07-04-00-accessible-command-focus-dsk-map.md
.agent/render-audit/2026-07-13T02-49-07-04-00-visual-native-accessible-projection-gap.md
.agent/gameplay-audit/2026-07-13T02-49-07-04-00-menu-campaign-accessible-command-loop.md
.agent/interaction-audit/2026-07-13T02-49-07-04-00-focus-keyboard-native-activation-map.md
.agent/accessibility-audit/2026-07-13T02-49-07-04-00-command-identity-focus-status-contract.md
.agent/deploy-audit/2026-07-13T02-49-07-04-00-accessibility-fixture-gate.md
.agent/central-sync-audit/2026-07-13T02-49-07-04-00-repo-ledger-accessibility-reconciliation.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

The Combat Modifier Application audit at `2026-07-13T00-40-00-04-00` remains retained.

## Current mismatch

```txt
visual menu selection
  != browser DOM focus
  != native button activation identity

focused hidden button + Enter/Space
  -> document keydown activates menu.selected or panel.selected
  -> browser may also dispatch the focused button click
  -> two sources can identify different actions
```

## Required authority

```txt
phantom-command-accessible-command-focus-projection-authority-domain
```

Hidden buttons and static instructions are not parity proof. Completion requires exact command identity, disabled-state parity, focus transfer/restoration, panel isolation, dynamic campaign status, duplicate suppression and source/build/Pages fixtures.
