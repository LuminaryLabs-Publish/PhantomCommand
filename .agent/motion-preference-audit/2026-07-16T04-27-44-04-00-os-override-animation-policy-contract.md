# Motion Preference Audit — OS, Override and Animation Policy Contract

**Timestamp:** `2026-07-16T04-27-44-04-00`

## Summary

PhantomCommand needs one effective motion mode derived from operating-system preference and an optional product override. Every route-specific animation adapter must consume that resolved mode rather than inventing local behavior.

## Plan ledger

**Goal:** define a complete reduced-motion contract for capability observation, policy resolution, live changes, route lifecycle and presentation proof.

- [x] Define preference sources and precedence.
- [x] Define normal, reduced and static modes.
- [x] Classify current menu, CRT, campaign and construction motion.
- [x] Define lifecycle and stale-generation rules.
- [ ] Implement settings UI and runtime adapters.
- [ ] Execute browser fixtures.

## Preference precedence

```txt
explicit product override
  -> operating-system prefers-reduced-motion
  -> normal default
```

An explicit override should be stored with a schema/version and expose `system`, `normal`, `reduced` and optionally `static` choices. Clearing the override returns control to the operating-system preference.

## Surface policy

| Surface | Normal | Reduced | Static |
|---|---|---|---|
| Fog drift | full | slower/lower distance | frozen |
| Star twinkle | full | sparse opacity change | fixed |
| Crow flap | full | infrequent | fixed pose |
| Reaper sway/eye pulse | full | reduced amplitude | fixed |
| Pointer parallax | full | small displacement | disabled |
| Menu selection pulse | full | steady highlight | steady highlight |
| Route flash/fade | animated | brief dissolve or immediate | immediate |
| CRT flicker/grain | temporal | static/low grain | disabled temporal effects |
| Campaign camera easing | full | shorter or immediate | immediate |
| Campaign decorative animation | full | reduced frames | representative pose |
| Hit/projectile effects | full | low-displacement opacity cue | static short marker |
| Construction choreography | full | shortened grouped steps | immediate final state |

## Lifecycle contract

```txt
route boot
  -> observe media query
  -> load product override
  -> resolve policy revision
  -> present first matching frame

preference change
  -> create new preference revision
  -> supersede prior policy
  -> project through active route only
  -> acknowledge matching frame

route retirement
  -> remove media-query listener
  -> reject stale callbacks
  -> retire route-local adapters
```

## Evidence gap

Current HTML, menu, campaign and CRT sources contain no reduced-motion media query, observer, override, policy result or frame acknowledgement. The existing CRT and ambience settings do not constitute a motion preference.