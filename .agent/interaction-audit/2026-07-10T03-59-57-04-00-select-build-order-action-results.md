# PhantomCommand Interaction Audit: Select Build Order Action Results

**Timestamp:** `2026-07-10T03-59-57-04-00`

## Current interactions

```txt
menu pointer and keyboard
  -> select menu item
  -> begin campaign
  -> continue campaign
  -> settings panel
  -> credits panel

campaign pointer
  -> pointermove updates source-space pointer
  -> left click starts drag
  -> left release with small delta calls selectAt(world)
  -> left drag selects allies in world rectangle
  -> right click calls order(world)
  -> middle drag pans camera
  -> wheel zooms camera around pointer

campaign keyboard
  -> Space startWave
  -> 1/2/3 choose tower type
  -> P pause
  -> R reload
  -> Escape return to menu
  -> F focus selected units
  -> WASD/arrows pan
```

## Missing action results

```txt
menu action accepted/rejected rows
select unit accepted rows
select pad accepted rows
select clear rows
build accepted/rejected rows
order move accepted rows
order attack accepted rows
order no-selection rejected rows
camera pan/zoom readback rows
tower type selection rows
pause/reload/escape/focus rows
```

## Required next contract

```txt
ActionIntent
  -> source: menu | pointer | keyboard | fixture
  -> action
  -> payload
  -> world position if relevant

ActionResult
  -> status
  -> reason
  -> before summary
  -> after summary
  -> render impact summary
  -> GameHost diagnostic row
```

Keep browser behavior unchanged until the fixture proves the action rows.
