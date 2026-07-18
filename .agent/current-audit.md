# Current Audit

**Timestamp:** `2026-07-17T23-41-44-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Status:** `menu-pointer-target-admission-authority-audited`

## Summary

The menu runtime has valid source-containment and row hit-test helpers, but pointer-down activation does not require a successful hit. Main-menu background and outside-source presses can activate the retained selected item. Settings-panel background presses can mutate the retained selected setting.

## Intent

Separate keyboard selection activation from pointer target activation, publish one typed pointer-target result and admit menu actions only from accepted targets.

## Checklist

- [x] Compare all 11 Publish repositories.
- [x] Exclude Cavalry of Rome.
- [x] Select PhantomCommand as the oldest synchronized eligible repository.
- [x] Preserve the complete 20-kit service inventory.
- [x] Trace CRT source mapping, main-menu and panel hit tests, pointer movement and pointer-down activation.
- [x] Add the `2026-07-17T23-41-44-04-00` audit family.
- [ ] Implement typed pointer-target and action results.
- [ ] Execute source, artifact and Pages fixtures.

## Interaction loop

```txt
pointer press
  -> CRT screenToSource
  -> menuHitIndex or panelHitIndex
  -> hit-test miss returns -1
  -> selected row remains unchanged
  -> activation still executes against retained selection
  -> route, settings or panel state can change
  -> no matching pointer-action frame acknowledgement
```

## Domains in use

```txt
browser route, modules, DOM, RAF, pointer, keyboard and storage
procedural menu, settings, save presence, audio and transition
CRT source containment and coordinate mapping
menu rows, panel rows, enabled state and selection state
pointer target classification, action admission and frame proof
Canvas2D and WebGL CRT presentation
campaign simulation, rendering, persistence and diagnostics
static checks, build and Pages deployment
```

## Current gap

```txt
main hit-test helper: present
settings hit-test helper: present
outside/background miss result: present as -1
pointer-down rejection on miss: absent
pointer/keyboard semantic separation: absent
MenuPointerTargetResult: absent
MenuActionResult: absent
FirstMenuPointerActionFrameAck: absent
```

## Required authority

`phantom-command-menu-pointer-target-admission-authority-domain`

## Boundary

Documentation only. No runtime menu, pointer, gameplay, rendering, test, build or deployment behavior changed.