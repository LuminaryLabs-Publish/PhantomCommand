# PhantomCommand Menu Pointer Browser Fixture Gate

**Timestamp:** `2026-07-12T16-00-03-04-00`

## Summary

Current validation is source-token based. It cannot prove pointer containment, hit admission, CRT geometry, zero mutation on miss or local/Pages parity. This gate defines the executable evidence required before the menu pointer authority can be considered deployed.

## Plan ledger

**Goal:** execute the same pointer geometry and action-result matrix against the source route, built output and GitHub Pages.

- [x] Review `package.json` check/build scripts.
- [x] Review `scripts/check-menu.mjs` assertions.
- [x] Identify missing event, geometry and mutation proof.
- [x] Define local, build and Pages fixture matrix.
- [ ] Add and run fixtures after runtime implementation.

## Existing proof

```txt
npm run check
  -> source token checks for menu and campaign

npm run build
  -> static output copy
```

The menu check confirms canvas/module references, route text, public host, art symbols and CRT shader tokens. It does not instantiate a browser or dispatch input.

## Required Node/unit fixtures

```txt
fixture:menu-control-layout
fixture:pointer-containment-wide-aspect
fixture:pointer-containment-tall-aspect
fixture:crt-forward-inverse-roundtrip
fixture:main-menu-hit-centers
fixture:main-menu-row-gap-misses
fixture:settings-hit-centers
fixture:settings-row-gap-misses
fixture:pointer-policy-primary
fixture:pointer-policy-secondary-rejection
fixture:stale-transform-rejection
fixture:duplicate-sequence-rejection
```

## Required browser fixtures

```txt
smoke:menu-pointer-source-route
smoke:menu-pointer-built-output
smoke:menu-pointer-pages
```

Each browser fixture must:

```txt
load a fresh menu session
capture the current surface/layout/transform revisions
hover each control and confirm visible selection
click each control center and confirm one terminal result
click every defined miss region and confirm rejection
assert zero settings/panel/navigation mutation after rejection
run with CRT on and off
run at wide and tall aspect ratios
run at DPR 1 and 2
exercise keyboard and hidden accessible controls
capture the first visible frame for committed actions
```

## Required Pages evidence

```txt
deployed commit SHA
route URL and load result
menu surface generation
transform/layout revisions
fixture result fingerprint
screenshot or pixel probe for visible controls
last accepted/rejected action result
first visible action-frame receipt
```

## CI gate

```txt
npm run check
npm run build
node pointer geometry fixtures
browser source-route fixture
browser built-output fixture
Pages fixture after deployment
```

No Pages readiness claim should be made from a successful static copy alone.

## Current status

```txt
runtime implementation: absent
Node pointer fixtures: absent
browser source fixture: absent
built-output fixture: absent
Pages fixture: absent
commands run this audit: none
```

This document defines the gate only. It does not assert that pointer behavior is fixed or deployed correctly.