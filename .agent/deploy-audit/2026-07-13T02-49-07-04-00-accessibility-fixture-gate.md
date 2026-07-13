# Accessibility Fixture and Deployment Gate

**Timestamp:** `2026-07-13T02-49-07-04-00`

## Summary

Current checks assert source markers only. They do not instantiate focus, native button activation, keyboard click synthesis, accessibility state, panel scope or dynamic campaign announcements.

## Plan ledger

**Goal:** block accessibility-readiness claims until source, built output and deployed Pages execute the same focused command/status fixtures.

- [x] Inspect package scripts and static checks.
- [x] Record missing browser behaviors.
- [x] Define fixture gates.
- [ ] Wire and execute gates later.

## Current checks

```txt
npm run check
  -> static menu source assertions
  -> static campaign source assertions

npm run build
  -> static file copy
```

## Missing fixtures

```txt
Tab focus order
Enter native activation
Space native activation
event-sequence duplicate suppression
focused-versus-selected command conflict
disabled Continue semantics
panel focus transfer
background inertness
focus restoration
settings control parity
campaign live-region ordering
visual/accessibility acknowledgement correlation
built-output parity
GitHub Pages parity
```

## Release gate

No accessibility readiness claim is valid until all fixtures pass against source, `dist`, and the deployed Pages route with recorded browser and assistive-technology environment details.
