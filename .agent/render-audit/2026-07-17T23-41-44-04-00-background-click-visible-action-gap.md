# Render Audit — Background Click Visible-Action Gap

**Timestamp:** `2026-07-17T23-41-44-04-00`  
**Status:** `menu-pointer-target-admission-authority-audited`

## Summary

The menu renders one selected row with a visible pulse, but the visible pointer target and the action target are not guaranteed to match. A click on graveyard background, CRT letterbox space or a settings-panel background can activate the previously selected row even though no actionable row was under the pointer.

## Current render path

```txt
browser pointer
  -> CRT screenToSource
  -> point.inside plus source coordinates
  -> art draws menu/panel and selected-row pulse
  -> pointer-down runs hit test
  -> miss leaves selected row unchanged
  -> action executes against unchanged selection
  -> next frame presents navigation, setting change or panel close
```

## Visible mismatch

```txt
visible pointer location: background or outside source
visible selected row: retained from keyboard or prior pointer movement
executed action: retained selected row
explicit pointer-target result: absent
matching action-frame acknowledgement: absent
```

The render surface therefore communicates hover/selection state but does not prove that a pointer action was admitted from the visible target under the pointer.

## Required render evidence

```txt
MenuPointerTargetResult
  -> accepted target identity or explicit rejection

MenuActionResult
  -> action identity and source producer

MenuActionFrameDigest
  -> route, panel, settings and selected-row generation

FirstMenuPointerActionFrameAck
  -> accepted action generation reached the presented CRT frame
```

## Fixtures

- Click each main-menu row and verify the matching action only.
- Click menu background with each row selected and verify no action.
- Click outside the contained CRT source and verify no action.
- Click disabled Continue and verify rejection without navigation.
- Click each settings row and verify only that row mutates.
- Click settings-panel background and verify no setting mutation.
- Verify source, built artifact and Pages behavior match.

## Boundary

No renderer, hit-test, pointer or frame behavior changed. No accidental-action prevention or visible-frame convergence is claimed.