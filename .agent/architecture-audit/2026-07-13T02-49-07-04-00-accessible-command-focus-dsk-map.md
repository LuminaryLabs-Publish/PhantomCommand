# Accessible Command and Focus DSK Map

**Timestamp:** `2026-07-13T02-49-07-04-00`

## Summary

The current implementation has visual-menu, native-control, global-keyboard and public-host activation surfaces without one shared command/focus owner. The missing parent domain coordinates existing menu, route, campaign and render kits rather than replacing them.

## Plan ledger

**Goal:** define bounded DSK ownership for command identity, availability, focus lifecycle, accessible status and proof.

- [x] Map existing owners.
- [x] Separate semantic command state from DOM/browser adapters.
- [x] Define the parent coordinating domain.
- [x] Define candidate kits and dependency order.
- [ ] Implement later.

## Existing ownership

```txt
menu-route-kit
  owns visual menu selection, panels, activation and navigation

campaign-route-shell-kit
  owns campaign document/canvas shell and static assistive text

pixel-campaign-runtime-kit
  owns campaign input and mutable command effects

pixel-campaign-render-kit
  owns visual HUD and terminal projection

browser DOM adapter
  currently owns hidden buttons and native focus implicitly
```

## Missing parent domain

```txt
phantom-command-accessible-command-focus-projection-authority-domain
```

## Bounded subdomains

```txt
Accessible Command Identity
  command IDs, source IDs, event sequence and deduplication

Accessible Availability
  enabled state, reason, revision and native projection

Focus Lifecycle
  focus generation, panel scope, transfer, inertness and restoration

Accessible Campaign Projection
  bounded status read model, live announcements and result acknowledgement

Proof
  native activation, focus, status and source/build/Pages parity
```

## Candidate kits

```txt
accessible-surface-id-kit
accessible-focus-generation-kit
accessible-control-id-kit
visual-command-id-kit
native-control-command-id-kit
command-source-identity-kit
focused-control-binding-kit
visual-selection-binding-kit
accessible-command-envelope-kit
accessible-command-deduplication-kit
accessible-availability-projection-kit
panel-focus-scope-kit
panel-background-inertness-kit
panel-focus-transfer-kit
panel-focus-restore-kit
settings-control-projection-kit
credits-content-projection-kit
campaign-focus-admission-kit
campaign-accessible-command-kit
campaign-status-read-model-kit
campaign-live-region-projection-kit
accessible-command-result-kit
first-accessible-result-ack-kit
native-enter-space-activation-fixture-kit
disabled-continue-projection-fixture-kit
panel-focus-isolation-fixture-kit
campaign-live-status-fixture-kit
accessibility-source-build-pages-parity-fixture-kit
```

## Dependency order

```txt
stable command/control identities
  -> activation source and event sequence
  -> focus and selection binding
  -> availability admission
  -> duplicate/conflict rejection
  -> panel focus lifecycle
  -> campaign status read model
  -> visual and accessible acknowledgements
  -> executable parity fixtures
```
