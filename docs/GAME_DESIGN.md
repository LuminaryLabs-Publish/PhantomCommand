# Phantom Command Game Design

## Status

Initial design document for the single-player PvE RTS foundation.

## One-sentence game

Phantom Command is a single-player undead RTS where the player builds a necromantic base, raises a large undead host, harvests souls and bone from a cursed battlefield, gains experience from combat, unlocks stronger buildings and units, and pushes inward to destroy the Grim Reaper Totem at the center of the map.

## Player fantasy

The player is a necromantic commander rebuilding an army of the dead.

The battlefield is the economy:

- Enemies become soul value.
- Corpses become undead material.
- Experience becomes rank and unlock momentum.
- Buildings expand necromantic control.
- Undead armies become powerful but unstable if the soul economy collapses.

## Core PvE loop

```txt
Start with Crypt Core
-> scout with Skeletons
-> claim grave fields and bone yards
-> build Grave Harvesters
-> build Bone Pit
-> produce Skeletons and Zombies
-> fight patrols and enemy camps
-> gain souls, bone, corpses, and XP
-> unlock Black Chapel
-> produce Ghouls and Wights
-> break Totem seals
-> push center
-> destroy Grim Reaper Totem
```

## Single-player PvE focus

The first version is not PvP and does not require symmetrical enemy economy.

The enemy is a PvE pressure system built from:

- enemy camps,
- patrol paths,
- defensive posts,
- Totem wave lanes,
- boss phases,
- scripted objective reactions,
- map events.

The enemy can feel strategic without obeying the same build rules as the player.

## Main enemy

The main enemy is the **Grim Reaper Totem** at the center of the map.

The Totem is:

- the central objective,
- the wave source,
- the corruption source,
- the boss structure,
- the final win target.

The player starts on the outer edge and fights inward through rings of increasing danger.

## Win conditions

A mission can be won by one or more of these conditions:

- destroy the Grim Reaper Totem,
- destroy a Totem seal,
- clear the required enemy camp,
- survive a final wave,
- complete a ritual objective.

The default skirmish win condition is:

```txt
Destroy the Grim Reaper Totem.
```

## Lose conditions

A mission can be lost by one or more of these conditions:

- Crypt Core destroyed,
- required objective destroyed,
- soul economy fully collapsed for a configured duration,
- mission timer expired on specific missions.

The default first-slice lose condition is:

```txt
Crypt Core destroyed.
```

## Large-scale battle identity

Phantom Command should support many simple units rather than a small number of high-micro units.

Expected first-scale targets:

- 50 Skeletons should be normal.
- 20 Zombies should be normal.
- 8 Ghouls should feel like a raiding pack.
- 4 Wights should feel elite.

The player should mostly think about:

- where to expand,
- when to push,
- how to protect harvesters,
- whether soul income can sustain the army,
- when to sacrifice or replace fragile units,
- when to attack a Totem seal.

## First campaign/skirmish structure

### Mission 1: Raise the Host

Teach economy, basic production, Skeletons, Zombies, and clearing a small camp.

### Mission 2: Hold the Grave Fields

Defend harvesters from waves and unlock faster offensive play.

### Mission 3: Break the Chapel

Capture soul wells, unlock Black Chapel, and produce Ghouls/Wights.

### Mission 4: The Pyre March

Enemy fire/siege pressure punishes raw Skeleton swarms.

### Mission 5: The Center Totem

Break seals and destroy the Grim Reaper Totem.

## Design promise

```txt
Build the dead.
Feed them souls.
Break the living.
Destroy the Totem.
```
