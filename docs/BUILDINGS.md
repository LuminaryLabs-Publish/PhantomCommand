# Buildings

## Status

Initial building set for the first PvE RTS slice.

## Building rule

Buildings should be few, clear, and data-driven.

The first four buildings are:

| Building | Role | Produces / unlocks |
|---|---|---|
| Crypt Core | Main base and command anchor | Builders, storage, base control |
| Grave Harvester | Economy extractor | Souls and bone from map nodes |
| Bone Pit | Basic unit production | Skeletons and Zombies |
| Black Chapel | Tech and elite production | Ghouls, Wights, upgrades |

## Crypt Core

The Crypt Core is the main HQ.

### Owns

- base control radius,
- starting storage,
- command anchor,
- builder production,
- defeat condition.

### Design notes

If the Crypt Core is destroyed, the mission is usually lost.

It should define the safe early base area and give the player enough initial economy to begin.

## Grave Harvester

The Grave Harvester is the first economy building.

### Owns

- extraction from grave fields,
- extraction from bone yards,
- extraction from soul wells if allowed by config,
- high-priority raid target status.

### Design notes

Harvesters should be vulnerable enough that enemy waves feel meaningful.

The player should need to defend them.

## Bone Pit

The Bone Pit is the first production building.

### Produces

- Skeletons,
- Zombies.

### Design notes

The Bone Pit unlocks the first real army loop.

It should be cheap and quick enough for the first slice.

## Black Chapel

The Black Chapel is the first tech building.

### Produces / unlocks

- Ghouls,
- Wights,
- first upgrades,
- later rituals.

### Design notes

The Black Chapel should represent the transition from survival to offensive pressure.

It should require XP/rank access plus economy payment.

## Building flow

```txt
Crypt Core
-> Grave Harvester
-> Bone Pit
-> Skeleton/Zombie army
-> XP rank and economy threshold
-> Black Chapel
-> Ghoul/Wight army
-> Totem seal push
```

## Unlock rule

XP unlocks access.

Economy pays costs.

Buildings construct things.

The building kit should ask the unlock registry and world economy kit before construction.

## Config ownership

Building definitions, costs, build times, produced units, and requirements should live in `config/buildings.config.json`.

The `necropolis-building-domain-kit` interprets those values.
