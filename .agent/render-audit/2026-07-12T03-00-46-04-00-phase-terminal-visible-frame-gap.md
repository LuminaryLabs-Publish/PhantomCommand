# PhantomCommand Phase and Terminal Visible-Frame Gap

**Timestamp:** `2026-07-12T03-00-46-04-00`

## Summary

The renderer displays pause or terminal overlays from live booleans, but no committed phase revision identifies the state being presented. Commands can mutate gameplay owners while the overlay remains visible, so a terminal or paused frame can contain post-boundary towers, selection, orders, effects, or camera changes without evidence of admission.

## Plan ledger

**Goal:** make the visible overlay, world, HUD, minimap, action result, and phase revision one committed frame.

- [x] Trace `drawWorld`, `drawUI`, `drawMinimap`, overlay selection and CRT submission.
- [x] Confirm render continues while paused and terminal.
- [x] Confirm overlay label precedence is won, lost, then paused.
- [x] Confirm gameplay owners can mutate while pause/terminal overlay is active.
- [x] Confirm no phase/action/frame receipt exists.
- [ ] Add committed phase observation and browser proof.

## Current render path

```txt
live mutable state
  -> drawWorld
  -> drawUI and minimap
  -> if paused || won || lost draw dark overlay
  -> label = won ? secured : lost ? lost : paused
  -> CRT render
```

## Gap

```txt
phaseId: absent
phaseRevision: absent
actionResultId: absent
terminalRevision: absent
committedTickId: absent
sourceFrameId: absent
presentedFrameId: absent
phaseFrameReceipt: absent
```

## Consequences

```txt
paused overlay can coexist with a newly queued wave
paused overlay can coexist with newly built towers and effects
terminal overlay can coexist with post-terminal selection/order/build mutation
paused + won or paused + lost is hidden by label precedence
HUD and minimap can show owners changed after the terminal boundary
GameHost cannot identify the exact visible terminal frame
```

## Required frame observation

```txt
PhaseRenderObservation {
  sourceFrameId
  presentedFrameId
  phaseId
  phaseRevision
  terminalRevision
  lastActionResultId
  stateFingerprint
  cameraRevision
  projectionRevision
  overlayKind
  hudFingerprint
  minimapFingerprint
}
```

## Required proof

```txt
pause accepted
  -> first paused frame cites the accepted pause result

rejected paused gameplay action
  -> next frame has identical durable-state fingerprint

terminal commit
  -> first terminal frame cites terminal revision

post-terminal rejected action
  -> world, HUD and minimap fingerprints remain unchanged

camera presentation policy
  -> allowed camera-only changes are explicitly classified and receipted
```

## Validation boundary

Documentation only. No render behavior changed and no browser frame fixture exists.