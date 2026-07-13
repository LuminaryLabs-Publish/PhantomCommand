# WebGL Context Lifecycle Recovery DSK Map

**Timestamp:** `2026-07-13T05-59-03-04-00`

## Summary

The existing `crt-renderer-kit` owns initial WebGL construction and drawing but not context lifecycle. The missing parent domain coordinates browser context events, resource generations, presentation results, fallback projection and recovered-frame proof while leaving menu art and campaign simulation in their existing owners.

## Plan ledger

**Goal:** define a bounded DSK composition that adds lifecycle authority without moving gameplay or procedural drawing into the renderer.

- [x] Preserve `graveyard-art-kit` and `pixel-campaign-render-kit` as source-frame producers.
- [x] Preserve menu/campaign route ownership.
- [x] Keep `crt-renderer-kit` as the WebGL provider implementation.
- [x] Add context/resource identity and state.
- [x] Add typed presentation commands/results.
- [x] Add fallback, readback and recovery acknowledgement.
- [x] Add executable lifecycle fixtures.
- [ ] Implement later.

## Domain composition

```txt
phantom-command-webgl-context-lifecycle-recovery-authority-domain
  identity
    crt-surface-id-kit
    webgl-context-id-kit
    webgl-context-generation-kit
    webgl-resource-generation-kit
    source-frame-revision-kit

  lifecycle
    webgl-context-state-kit
    webgl-context-event-adapter-kit
    webgl-loss-policy-kit
    webgl-restore-admission-kit

  resources
    webgl-program-resource-kit
    webgl-buffer-resource-kit
    webgl-texture-resource-kit
    webgl-location-cache-kit
    webgl-resource-disposal-kit
    webgl-resource-rebuild-kit

  transaction
    crt-presentation-command-kit
    crt-presentation-result-kit
    crt-presentation-journal-kit

  projection
    presentation-fallback-surface-kit
    public-render-readback-kit
    first-recovered-frame-ack-kit

  proof
    context-loss-browser-fixture-kit
    context-restore-browser-fixture-kit
    resource-rebuild-failure-fixture-kit
    source-build-pages-webgl-lifecycle-fixture-kit
```

## Ownership boundaries

```txt
graveyard-art-kit
  owns menu source pixels

pixel-campaign-render-kit
  owns campaign source pixels

fixed-step-campaign-simulation-kit
  owns campaign truth

crt-renderer-kit
  implements WebGL operations under admitted generations

webgl lifecycle authority
  owns context state, resource adoption, terminal presentation results,
  fallback status and recovery proof
```

## Required invariant

No draw may use a context or resource generation that is lost, restoring, disposed, stale or not atomically adopted. No restored generation is current until a probe draw succeeds and the first recovered visible frame is acknowledged.