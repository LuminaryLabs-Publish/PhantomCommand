# Project Breakdown: PhantomCommand Menu Audio Lifecycle Authority

**Timestamp:** `2026-07-12T04-18-44-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`

## Plan ledger

**Goal:** trace menu audio from settings and user gesture through context creation, graph ownership, UI tones, transition, page lifecycle and browser proof.

- [x] Compare Publish inventory and central ledgers.
- [x] Exclude `TheCavalryOfRome`.
- [x] Skip concurrent repo-local work in `IntoTheMeadow` and `HorrorCorridor`.
- [x] Select only `PhantomCommand`.
- [x] Identify the complete interaction loop, domains, 20 kits and services.
- [x] Trace context, graph, tones, delayed close and navigation.
- [x] Define lifecycle authority and fixture gate.
- [x] Change documentation only.
- [ ] Runtime implementation remains future work.

## Interaction loop

```txt
menu boot -> settings -> input gesture -> ensureAudio
ensureAudio -> context/master/drone/wind -> state.audio
menu action -> transient UI oscillator/gain
ambience off -> clear state.audio -> ramp -> delayed close
transition -> fade -> location assignment
```

## Main finding

`state.audio` is a mutable owner reference, not a lifecycle result. A suspended context remains retained, `ensureAudio()` returns without `resume()`, delayed closure has no generation fence, and navigation/page lifecycle do not explicitly retire or transfer audio.

## Domains

```txt
menu route/settings/save/fade
procedural art and CRT presentation
Web Audio context/ambience/tones
input and RAF lifecycle
campaign simulation/rendering
public capabilities
checks/build/Pages/audit tracking
```

## Kits

```txt
20 implemented kits retained
menu-audio-kit is the primary current owner
22 candidate audio-lifecycle kits documented
```

The complete inventory and service map are in `.agent/current-audit.md` and `.agent/kit-registry.json`.

## Validation

```txt
runtime changed: no
audio changed: no
navigation changed: no
branch/PR: no
browser fixtures: unavailable
```
