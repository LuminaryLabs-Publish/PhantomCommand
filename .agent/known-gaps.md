# Known Gaps

**Generated:** `2026-07-17T23-41-44-04-00`  
**Status:** `menu-pointer-target-admission-authority-audited`

## Current priority

Pointer activation is not bound to the row under the pointer. Main-menu and settings-panel hit-test misses leave the selected row unchanged, after which activation runs unconditionally.

## Confirmed by inspection

```txt
CRT browser-to-source mapping: present
inside-source flag: present
main-menu row hit test: present
settings-row hit test: present
enabled-state check inside activateMain: present
keyboard selection activation: present
pointer-down calls activateMain after main hit-test miss: present
pointer-down calls activatePanel after settings hit-test miss: present
```

## Menu pointer-target gaps

```txt
outside-source pointer rejection before action: absent
main-menu background rejection before action: absent
settings-panel background rejection before mutation: absent
stale selection rejection for pointer input: absent
explicit pointer/keyboard producer separation: absent
typed disabled-target result: absent
MenuPointerTargetResult: absent
MenuActionResult: absent
FirstMenuPointerActionFrameAck: absent
```

## Source pattern

```txt
main:
  index = menuHitIndex(point)
  if hit: selected = index
  activateMain(selected)  // executes after miss

settings:
  index = panelHitIndex(point)
  if hit: selected = index
  activatePanel()         // executes after miss
```

## Validation gaps

```txt
menu background fixture: absent
letterbox/outside-source fixture: absent
disabled Continue fixture: absent
settings background fixture: absent
exact-row action fixture: absent
keyboard compatibility fixture: absent
built artifact parity: not run
Pages parity: not run
```

## Risk boundary

No production incident was reproduced. The source-backed risk is that pointer location alone does not determine the action: retained keyboard or hover selection can become the pointer action after a miss.

## Claim boundary

Do not claim pointer-target correctness, accidental-action prevention, artifact parity, Pages parity or production readiness until executable fixtures pass.