# PhantomCommand Validation

**Timestamp:** `2026-07-12T01-20-00-04-00`

## Summary

This run changed internal documentation only. It source-inspected the shared CRT renderer, menu pointer path and campaign pointer path; confirmed the GLSL contain-plus-curve versus CPU contain-only mismatch; confirmed campaign input ignores the mapper's `inside` result; and documented the missing projection identity, revision, admission and frame-evidence contracts.

## Plan ledger

**Goal:** record exactly what was observed and what remains unproved.

- [x] Confirm GLSL applies `containUv()` before `curveUv()`.
- [x] Confirm CPU `screenToSource()` omits curvature.
- [x] Confirm menu rendering changes with `settings.crt` while pointer mapping does not.
- [x] Confirm campaign rendering always enables CRT.
- [x] Confirm campaign pointer handlers ignore `inside`.
- [x] Confirm static checks do not prove coordinate parity.
- [x] Document pure and browser fixture gates.
- [ ] Execute fixtures after implementation.

## Static observations

```txt
menu source surface: 480x270
campaign source surface: 640x360
output fit policy: contain
GLSL curvature when CRT enabled: yes
CPU curvature: absent
menu CRT setting reaches renderer: yes
menu CRT setting reaches pointer mapper: no
campaign CRT enabled: always
menu hit tests check inside: yes
campaign input checks inside: no
projection ID/revision: absent
surface revision: absent
settings revision: absent
pointer sample/mapping result ID: absent
visible projection frame receipt: absent
CPU/GLSL parity fixture: absent
browser pixel-pick smoke: absent
```

## Source examples

```txt
shader:
  uv = containUv(vUv)
  if CRT enabled: uv = curveUv(uv)
  reject post-curve uv outside source

CPU:
  normalize client coordinates
  apply contain correction
  return source pixels and pre-curve inside flag

campaign:
  setPointer(event)
  use source point for screenToWorld, drag, order, pan and zoom
  never reject input.pointer.inside === false
```

## Change boundary

```txt
runtime source changed: no
pointer behavior changed: no
gameplay changed: no
rendering changed: no
persistence behavior changed: no
audio changed: no
navigation changed: no
package scripts changed: no
dependencies changed: no
deployment workflow changed: no
branch created: no
pull request created: no
```

## Commands and fixtures

```txt
npm run check: not run
npm run build: not run
browser smoke: not run
CPU/GLSL reference fixture: unavailable
CRT on/off parity fixture: unavailable
black-border admission fixture: unavailable
menu pixel-pick fixture: unavailable
campaign pixel-pick fixture: unavailable
wheel-anchor fixture: unavailable
resize/settings stale-result fixture: unavailable
projection/frame receipt fixture: unavailable
```

No projection parity, pointer-target accuracy, border rejection, zoom-anchor correctness or frame-correlation claim is made.