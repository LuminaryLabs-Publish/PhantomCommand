# Kit Architecture

## Status

Initial Nexus Engine / DSK-style kit plan for Phantom Command.

## Architecture goal

Phantom Command should not become one giant `game.js` file.

It should be a mode kit that composes domain kits.

```txt
Mode Kit composes domains.
Domain kits own meaning.
System kits own hot-loop performance.
Renderer draws descriptors.
JSON config defines values and content.
```

## Top-level composition

```txt
phantom-command-mode-kit
├─ phantom-map-generation-domain-kit
├─ world-economy-domain-kit
├─ soul-economy-domain-kit
├─ experience-progression-domain-kit
├─ unlock-registry-domain-kit
├─ undead-unit-domain-kit
├─ necropolis-building-domain-kit
├─ upgrade-research-domain-kit
├─ pve-director-domain-kit
├─ rts-command-domain-kit
├─ rts-combat-resolution-domain-kit
├─ rts-movement-system-kit
└─ rts-render-descriptor-kit
```

## `phantom-command-mode-kit`

Scenario composition kit.

It owns:

- mission setup,
- active kit list,
- scenario config binding,
- win/loss composition,
- first playable slice boot path.

It should not own unit combat, economy math, or map generation internals.

## `phantom-map-generation-domain-kit`

Generates the PvE battlefield.

It owns:

- deterministic seed,
- radial ring model,
- Grim Reaper Totem center objective,
- resource node placement,
- enemy camp placement,
- Totem seals,
- wave lanes,
- player spawn safety.

## `world-economy-domain-kit`

Generic economy domain.

It owns resources, balances, costs, income streams, grants, spends, caps, and transaction ledgers.

## `soul-economy-domain-kit`

Undead-specific soul behavior.

It owns upkeep, decay, soul residue, soul harvesting, and army stability.

## `experience-progression-domain-kit`

Progression domain.

It owns XP, rank thresholds, mastery points, reward claims, and rank events.

## `unlock-registry-domain-kit`

Access domain.

It owns what buildings, units, upgrades, and rituals are available.

Other domains ask it whether an item is unlocked.

## `undead-unit-domain-kit`

Undead unit meaning.

It owns unit archetypes, unit state, soul stability state, command state, and production descriptors.

Subdomains can include:

- undead-archetype-domain-kit,
- undead-stability-domain-kit,
- corpse-reanimation-domain-kit,
- unit-selection-descriptor-kit.

## `necropolis-building-domain-kit`

Building domain.

It owns building placement, construction sites, completed structures, production queues, and building descriptors.

Subdomains can include:

- crypt-core-domain-kit,
- grave-harvester-domain-kit,
- bone-pit-domain-kit,
- black-chapel-domain-kit,
- production-queue-domain-kit.

## `upgrade-research-domain-kit`

Upgrade domain.

It owns research state, upgrade effects, and upgrade requirements after unlock access is granted.

## `pve-director-domain-kit`

PvE pressure domain.

It owns wave scheduling, camp activation, Totem phase pressure, and map-event escalation.

It does not own combat resolution.

## `rts-command-domain-kit`

Player command domain.

It owns:

- selection requests,
- move commands,
- attack commands,
- build commands,
- produce commands,
- rally commands.

Input should queue command requests. It should not directly mutate unit state.

## `rts-combat-resolution-domain-kit`

Combat meaning domain.

It owns damage, targeting validity, armor profiles, death events, and defeat facts.

It does not grant rewards directly.

## `rts-movement-system-kit`

Hot-loop movement system.

It owns steering, path following, collision avoidance, and unit position updates.

## `rts-render-descriptor-kit`

Read-model / presentation descriptor kit.

It exposes safe descriptors for renderer and HUD.

It should not decide gameplay.

## Command and event pattern

```txt
input requests action
-> command domain validates request
-> target domain mutates owned state
-> event is emitted
-> neighboring domains observe event
-> renderer presents descriptors
```

## Example attack flow

```txt
right-click enemy
-> rts.attack.request
-> rts-command-domain-kit validates selected units
-> rts-combat-resolution-domain-kit validates target
-> rts-movement-system-kit moves units into range
-> combat.damage.applied
-> combat.target.defeated
-> kill-reward-routing-domain-kit emits reward requests
```

## Repo implementation target

Initial docs and configs first.

Implementation should then add kit folders under:

```txt
src/game/phantom-command-mode-kit/
src/kits/<domain-kit>/
```
