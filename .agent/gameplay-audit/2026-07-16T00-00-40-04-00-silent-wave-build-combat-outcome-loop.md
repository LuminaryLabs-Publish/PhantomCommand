# Gameplay Audit — Silent Wave, Build, Combat and Outcome Loop

**Timestamp:** `2026-07-16T00-00-40-04-00`  
**Status:** `campaign-audio-event-projection-authority-audited`

## Summary

Campaign gameplay settles meaningful state changes and gives them visual feedback, but every gameplay branch remains silent because the campaign route has no result-driven audio projection.

## Plan ledger

**Goal:** map the gameplay transitions that need semantic audio events without treating raw input as proof of success.

- [x] Trace wave, spawn, build, order, combat, core and terminal settlement.
- [x] Distinguish accepted results from raw input attempts.
- [x] Identify current visual feedback.
- [x] Identify missing audio results.
- [ ] Implement event adapters and cue policies.

## Gameplay loops

```txt
wave
  Space attempt
  -> startWave validates state
  -> accepted queue and waveActive mutation
  -> message and spawns
  -> no accepted wave audio event

build
  selected pad and tower type
  -> build validates pad occupancy and soul cost
  -> accepted tower and resource mutation
  -> effect and message
  -> no accepted build audio event

order
  right-pointer attempt
  -> order validates selected units
  -> accepted target or movement mutation
  -> order effect
  -> no accepted order audio event

combat
  fixed-step target and cooldown resolution
  -> projectile or melee damage
  -> hit death reward and effects
  -> no attack hit death or reward audio event

sanctum and terminal
  enemy reaches core
  -> accepted core reduction
  -> loss when core reaches zero
  -> victory after final cleared wave
  -> overlay message and optional save
  -> no core-damage victory or defeat cue
```

## Event admission rule

Raw keyboard and pointer evidence must not directly emit success cues. Examples:

- Space while a wave is active must not replay the wave-start cue.
- Build attempts without enough souls must not emit a successful construction cue.
- Right click with no selected unit must not emit an accepted order cue.
- Damage cues must follow accepted damage settlement, not projectile creation alone.
- Victory and defeat must each settle once per campaign session.

## Recommended event set

```txt
CampaignWaveStarted
CampaignEnemySpawned
CampaignWaveCleared
CampaignStructureBuilt
CampaignOrderAccepted
CampaignAttackResolved
CampaignHitAccepted
CampaignUnitDefeated
CampaignSanctumDamaged
CampaignPaused
CampaignResumed
CampaignWon
CampaignLost
```

Each event requires stable identity, campaign revision and enough descriptor data for bounded cue selection.

## Validation boundary

No campaign sound was added or played. This audit does not claim the current game is defective for being silent; it records the missing semantic audio domain and proof surface.