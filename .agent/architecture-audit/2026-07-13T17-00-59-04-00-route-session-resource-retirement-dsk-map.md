# Route Session Resource Retirement DSK Map

**Timestamp:** `2026-07-13T17-00-59-04-00`

## Summary

Route lifetime is currently spread across menu, campaign, CRT, audio, browser location and public-host surfaces. A composition authority is required, while each bounded owner retains its own implementation.

## Plan ledger

**Goal:** place identity, admission, resource leases, retirement, navigation and proof in one composition domain without moving audio, rendering, input or gameplay semantics into it.

- [x] Identify current bounded owners.
- [x] Identify missing coordinating contracts.
- [x] Preserve existing kit boundaries.
- [x] Define composition order and failure states.
- [ ] Implement later.

## Ownership

```txt
menu-route-kit
  owns menu selection panels fade target and navigation intent

pixel-campaign-runtime-kit
  owns campaign state input commands and public game capabilities

fixed-step-campaign-simulation-kit
  owns simulation stepping

menu-audio-kit
  owns AudioContext nodes tones ambience and audio shutdown mechanics

crt-renderer-kit
  owns WebGL program buffer texture upload and draw mechanics

browser host
  owns document location pagehide reload event listeners and RAF APIs

route-session-resource-retirement authority
  owns generation identity transition admission resource manifest
  coordinates retirement receipts and navigation result
  does not own drawing audio synthesis gameplay or browser implementation
```

## DSK tree

```txt
phantom-command-route-session-resource-retirement-authority-domain
  identity
    route-transition-id-kit
    route-generation-kit
  admission
    route-transition-command-kit
    route-transition-policy-kit
    navigation-admission-kit
  resource inventory
    route-resource-manifest-kit
    raf-loop-lease-kit
    event-listener-lease-kit
    webgl-resource-lease-kit
    audio-context-lease-kit
    public-host-generation-kit
  retirement
    pagehide-retirement-kit
    beforeunload-retirement-kit
    stale-callback-rejection-kit
    candidate-retirement-kit
    resource-disposal-receipt-kit
  result and presentation
    route-transition-result-kit
    route-failure-fallback-kit
    first-route-frame-ack-kit
  proof
    menu-to-campaign-transition-fixture-kit
    campaign-to-menu-transition-fixture-kit
    reload-retirement-fixture-kit
    failed-navigation-fixture-kit
    source-build-pages-route-lifecycle-fixture-kit
```

## Composition rule

A route generation may publish public capabilities or schedule recurring work only after its resource manifest is accepted. A successor route must never rely on untyped cleanup of the predecessor. Navigation is admitted after retirement succeeds, and readiness is proven only by the successor's first matching visible-frame acknowledgement.
