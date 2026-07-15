# Device Control Browser Fixture Gate

**Timestamp:** `2026-07-15T03-24-35-04-00`

## Summary

The package check validates source markers but does not launch a browser, emulate touch, inspect visible controls or execute campaign actions. Device-control coverage requires source, build and deployed-origin fixtures before playability can be claimed.

## Plan ledger

**Goal:** require executable evidence that every admitted device profile can reach all campaign actions and matching visible effects.

- [x] Inspect package scripts and static checks.
- [x] Identify absent browser and device fixtures.
- [x] Define source, build and Pages matrices.
- [ ] Implement browser fixtures.
- [ ] Run fixtures against all three delivery surfaces.

## Current validation surface

```txt
npm run check
  -> source-marker assertions only

npm run build
  -> static copy only

missing
  -> browser boot assertion
  -> touch emulation
  -> visible-control inspection
  -> gesture arbitration
  -> action-effect frame binding
  -> source/build/Pages parity
```

## Required fixture matrix

| Fixture | Source | Built output | Pages |
|---|---:|---:|---:|
| Keyboard/mouse campaign start | required | required | required |
| Touch-only visible controls | required | required | required |
| Touch wave start | required | required | required |
| Touch unit selection and order | required | required | required |
| Touch tower choice and build | required | required | required |
| Touch pan and zoom | required | required | required |
| Touch pause, restart and exit | required | required | required |
| Hybrid duplicate suppression | required | required | required |
| Pointer cancellation | required | required | required |
| Orientation and safe-area replacement | required | required | required |
| First control-surface frame ack | required | required | required |
| First action-effect frame ack | required | required | required |

## Failure injections

```txt
remove one required touch control
send synthetic mouse event after touch activation
cancel pointer during order targeting
rotate viewport during active gesture
change from coarse to fine pointer profile
repeat wave-start command identity
submit stale control generation
hide and restore page during a gesture
```

## Passing gate

```txt
one route revision
one admitted device profile
complete action coverage
one active control generation
zero duplicate semantic commands
matching campaign or camera results
matching Canvas2D and CRT frames
matching source, build and Pages behavior
```

No fixture in this matrix was available or executed during this documentation run.