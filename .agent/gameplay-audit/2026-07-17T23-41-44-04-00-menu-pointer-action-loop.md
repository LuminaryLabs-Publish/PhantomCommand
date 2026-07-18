# Gameplay Audit — Menu Pointer Action Loop

**Timestamp:** `2026-07-17T23-41-44-04-00`  
**Status:** `menu-pointer-target-admission-authority-audited`

## Interaction loop

```txt
open menu
  -> restore settings and Continue presence
  -> choose Begin, Continue, Settings or Credits
  -> transition to campaign or mutate menu state
  -> enter fixed-step campaign
  -> select, build, order, start waves and resolve victory/loss
```

## Pointer-specific gap

The menu selection model is valid for keyboard input. Pointer input should act on the row under the pointer, not the retained selection. Today a pointer miss falls through to the retained row:

```txt
background click while Begin is selected
  -> Begin Campaign can start

letterbox/outside-source click while Settings is selected
  -> Settings can open

settings background click while CRT row is selected
  -> CRT can toggle
```

The exact result depends on retained selection state. That makes pointer intent nondeterministic from the pointer location alone.

## Gameplay consequence boundary

A misadmitted menu action can alter route or settings before the player enters the campaign. The campaign simulation itself is not changed by this documentation pass. No accidental navigation was reproduced in a browser fixture.

## Required gameplay contract

```txt
pointer evidence
  -> valid target decision
  -> action admission or rejection
  -> route/settings/panel settlement
  -> matching visible menu frame
  -> campaign route only after accepted navigation target
```

## Fixtures

- Background click never starts a new campaign.
- Background click never continues a campaign.
- Background click never opens Settings or Credits.
- Settings background click never toggles CRT, grain or ambience.
- Valid row click preserves the current transition and setting behavior.
- Keyboard Enter/Space still activates the selected row.

## Boundary

No menu or campaign gameplay code changed. The authority and fixtures are proposed work.