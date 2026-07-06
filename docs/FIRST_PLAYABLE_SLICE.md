# First Playable Slice

## Status

Initial playable-slice target for Phantom Command.

## Goal

Build the smallest real PvE RTS slice that proves the core promise:

```txt
Build the dead.
Feed them souls.
Fight inward.
```

## Scope

The first playable slice should be intentionally small.

It should include:

- one map,
- one Crypt Core,
- one Grave Harvester,
- one Bone Pit,
- Skeletons,
- Zombies,
- basic enemy patrols,
- basic enemy waves,
- kill rewards,
- XP gain,
- Grim Reaper Totem placeholder at center,
- one enemy camp or one Totem seal as first win objective.

It should not yet include:

- full campaign,
- Ghouls,
- Wights,
- Black Chapel production,
- full upgrade tree,
- complex rituals,
- advanced pathfinding,
- full procedural terrain.

## First slice loop

```txt
Start at outer ring
-> inspect safe grave field and bone yard
-> build Grave Harvester
-> build Bone Pit
-> produce Skeletons and Zombies
-> defend against first wave
-> clear nearby enemy camp
-> earn souls and XP
-> trigger first unlock message
-> destroy first Totem seal or camp
-> win
```

## Map

Use a fixed map first.

Required map elements:

- square battlefield,
- player start on outer edge,
- Grim Reaper Totem at center,
- 3 grave fields,
- 2 bone yards,
- 1 middle-ring soul well placeholder,
- 3 enemy camps,
- 3 wave lanes,
- 1 Totem seal objective.

## Units

First version units:

| Unit | Included? | Notes |
|---|---:|---|
| Skeleton | Yes | Fast, cheap, very fragile |
| Zombie | Yes | Slow, durable, mainline |
| Ghoul | No | Add in pass 2 |
| Wight | No | Add in pass 2 |

## Buildings

First version buildings:

| Building | Included? | Notes |
|---|---:|---|
| Crypt Core | Yes | Main base and lose condition |
| Grave Harvester | Yes | Extracts resources |
| Bone Pit | Yes | Produces Skeletons and Zombies |
| Black Chapel | Placeholder | Unlock message only in first slice |

## Resources

First version resources:

- Souls,
- Bone,
- Command,
- XP.

XP can be visible as a simple progression meter or hidden in state until rank 2.

## Enemy

The first PvE enemy should use simple scripted behavior:

- idle camp guards,
- patrols,
- timed wave from a lane,
- attack Crypt Core or harvesters,
- no full competitive economy.

## Win condition

First slice win condition:

```txt
Destroy the first enemy camp or first Totem seal.
```

The full game win condition later becomes:

```txt
Destroy the Grim Reaper Totem.
```

## Lose condition

```txt
Crypt Core destroyed.
```

Optional later lose condition:

```txt
Soul economy collapsed for configured duration.
```

## Debug requirements

Expose a debug host when implemented:

```txt
window.GameHost.getState()
```

Debug state should include:

- resources,
- selected units,
- unit counts,
- building counts,
- enemy wave state,
- current objective,
- map descriptor,
- Totem phase.

## Completion gate

The first playable slice is complete when:

- player can select units,
- player can issue move/attack commands,
- player can build at least one production building,
- player can produce Skeletons and Zombies,
- enemies attack at least once,
- kills grant rewards through reward routing,
- the player can win,
- the player can lose,
- game state is inspectable.
