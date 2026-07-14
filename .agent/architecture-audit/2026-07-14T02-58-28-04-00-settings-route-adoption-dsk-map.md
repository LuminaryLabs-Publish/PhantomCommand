# Settings Route Adoption DSK Map

**Timestamp:** `2026-07-14T02-58-28-04-00`  
**Status:** `settings-route-adoption-visible-frame-authority-audited`

## Summary

The existing settings owner is route-local. `menu-settings-persistence-kit` reads and writes a mutable object, `crt-renderer-kit` accepts unversioned render options, and `menu-audio-kit` applies ambience only inside the menu. The campaign route bypasses that state and supplies hard-coded CRT options.

## Plan ledger

**Goal:** define a minimal semantic domain family that admits one settings revision across route boundaries without replacing existing product owners.

- [x] Preserve all existing kits.
- [x] Identify current ownership and missing contracts.
- [x] Define one parent authority.
- [x] Keep adapters scoped to settings, presentation and route admission.
- [ ] Implement only by extending existing owners first.

## Existing ownership

```txt
menu-settings-persistence-kit
  -> parse localStorage document
  -> apply defaults
  -> mutate and write menu settings

crt-renderer-kit
  -> translate crt/grain/fade values into WebGL uniforms

menu-audio-kit
  -> create or close menu ambience
  -> emit UI tones

menu-route-kit
  -> initiate campaign navigation

campaign-route-shell-kit
pixel-campaign-render-kit
  -> create campaign CRT renderer
  -> submit hard-coded crt=true grain=low

legacy-gamehost-diagnostics-kit
  -> exposes campaign state but no settings revision
```

## Required parent domain

```txt
phantom-command-settings-route-adoption-visible-frame-authority-domain
```

## Coordinating surfaces

| Surface | Responsibility |
|---|---|
| `settings-schema-kit` | Canonical field names, ranges and defaults |
| `settings-version-kit` | Schema and compatibility version |
| `settings-document-kit` | Immutable settings candidate/document |
| `settings-normalization-kit` | Coercion and canonicalization |
| `settings-revision-kit` | Monotonic accepted revision identity |
| `settings-command-kit` | Typed user and route admission command |
| `settings-result-kit` | Applied, rejected, degraded or unsupported result |
| `settings-storage-adapter-kit` | Browser storage read/write boundary |
| `settings-read-result-kit` | Empty, current, migratable, malformed or unavailable read result |
| `settings-write-result-kit` | Staged, verified, rejected or unavailable write result |
| `route-settings-capability-kit` | Route support manifest for CRT, grain and ambience |
| `menu-settings-projection-kit` | Menu-side visual and audio application |
| `campaign-settings-adoption-kit` | Campaign-side settings admission |
| `crt-settings-adapter-kit` | Accepted CRT value to renderer uniforms |
| `grain-settings-adapter-kit` | Accepted grain value to renderer uniforms |
| `ambience-settings-adapter-kit` | Supported ambience policy to audio owner |
| `settings-public-readback-kit` | Route-safe revision and result readback |
| `settings-route-handoff-kit` | Successor route adoption of current revision |
| `settings-retirement-kit` | Retire predecessor route application leases |
| `first-settings-frame-ack-kit` | First visible frame carrying accepted revision |
| `menu-campaign-settings-parity-fixture-kit` | Browser cross-route proof |
| `source-build-pages-settings-fixture-kit` | Source/build/deployed parity proof |

```txt
planned coordinating surfaces: 22
```

## Required flow

```txt
SettingsChangeCommand
  -> settings-schema-kit
  -> settings-normalization-kit
  -> settings-storage-adapter-kit
  -> settings-write-result-kit
  -> route-settings-capability-kit
  -> menu-settings-projection-kit or campaign-settings-adoption-kit
  -> CRT/grain/ambience adapters
  -> SettingsAdoptionResult
  -> settings-public-readback-kit
  -> FirstSettingsRevisionFrameAck
```

## Ownership rule

Do not create a second renderer, audio or storage owner. Extend `menu-settings-persistence-kit`, `crt-renderer-kit`, `menu-audio-kit`, `campaign-route-shell-kit`, `pixel-campaign-render-kit` and `legacy-gamehost-diagnostics-kit` with typed settings contracts and revision readback.