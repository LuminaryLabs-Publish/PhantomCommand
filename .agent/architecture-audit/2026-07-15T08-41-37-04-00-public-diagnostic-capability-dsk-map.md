# Public Diagnostic Capability DSK Map

**Timestamp:** `2026-07-15T08-41-37-04-00`

## Summary

The current `legacy-gamehost-diagnostics-kit` publishes ambient references into the same mutable campaign and camera owners used by simulation and rendering. The proposed authority keeps diagnostics optional while separating immutable observation, allowlisted commands, caller leases, revision admission, settlement, retirement and visible-frame evidence.

## Plan ledger

**Goal:** map existing ownership and the minimum DSK family required to replace raw public runtime access without restructuring the campaign.

- [x] Preserve the 20 implemented kits.
- [x] Keep simulation ownership in the campaign runtime.
- [x] Keep Canvas2D and CRT ownership in their existing render kits.
- [x] Separate read capability from write capability.
- [x] Require expected revisions and idempotency for mutations.
- [x] Require explicit capability retirement and frame acknowledgement.
- [ ] Implement the mapped authority.

## Existing domain map

```txt
campaign-route-shell-kit
  -> canvas and module bootstrap

pixel-campaign-runtime-kit
  -> mutable state camera listeners authored content and lifecycle

fixed-step-campaign-simulation-kit
  -> update waves combat rewards and terminal outcomes

pixel-campaign-render-kit
  -> consume mutable state and camera into Canvas2D

crt-renderer-kit
  -> upload Canvas2D source and present WebGL frame

legacy-gamehost-diagnostics-kit
  -> publish live state
  -> publish live camera
  -> publish direct startWave build setZoom
  -> publish cloned summary readback
```

## Proposed parent domain

```txt
phantom-command-public-diagnostic-capability-frame-admission-authority-domain
```

## Proposed subkits

| Kit | Responsibility |
|---|---|
| `public-capability-policy-kit` | Define production, test and diagnostic exposure policies. |
| `public-capability-set-kit` | Publish one immutable versioned capability set. |
| `diagnostic-session-lease-kit` | Identify and expire approved callers. |
| `immutable-campaign-snapshot-kit` | Return copied campaign readback only. |
| `campaign-state-revision-kit` | Version accepted campaign truth. |
| `camera-state-revision-kit` | Version accepted camera truth. |
| `public-command-envelope-kit` | Bind caller, command, capability and expected revisions. |
| `expected-revision-admission-kit` | Reject stale work. |
| `public-command-idempotency-kit` | Reject duplicate commands. |
| `allowlisted-campaign-command-kit` | Expose only approved campaign commands. |
| `allowlisted-camera-command-kit` | Expose only approved camera commands. |
| `public-mutation-settlement-kit` | Settle accepted work through the normal owner. |
| `public-mutation-result-kit` | Publish immutable typed results. |
| `capability-retirement-kit` | Revoke capability sets and leases. |
| `late-caller-rejection-kit` | Reject calls after retirement or route change. |
| `canvas-frame-revision-kit` | Bind the Canvas2D frame to accepted truth. |
| `crt-frame-revision-kit` | Bind the presented CRT frame to the source frame. |
| `first-public-mutation-frame-ack-kit` | Prove first matching visible result. |
| `public-capability-browser-fixture-kit` | Exercise read, write, stale, duplicate and retirement paths. |

## Admission path

```txt
publish capability policy
  -> allocate CapabilitySetId
  -> publish immutable snapshots and allowlisted command facades
  -> allocate caller lease
  -> receive versioned public command
  -> validate capability lease and expected revisions
  -> settle through campaign or camera owner exactly once
  -> publish typed result
  -> render matching Canvas2D revision
  -> present matching CRT revision
  -> acknowledge visible frame
  -> retire capability set on route or runtime teardown
```

## Boundary

No runtime DSK, adapter, public API or renderer was changed in this documentation turn.