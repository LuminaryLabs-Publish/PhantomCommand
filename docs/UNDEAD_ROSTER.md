# Undead Roster

## Status

Initial PvE unit roster for the first Phantom Command design pass.

## Roster rule

Start with common undead before adding exotic units.

The first roster should be readable at RTS scale:

- Skeletons are fast and fragile.
- Zombies are slower and stronger.
- Ghouls are fast raiders.
- Wights are elite linebreakers.

## Unit table

| Unit | Role | Speed | Durability | Damage | Soul upkeep | Primary use |
|---|---|---:|---:|---:|---:|---|
| Skeleton | Fast swarm / scout | High | Very low | Low-medium | Low | Rush, flank, overwhelm |
| Zombie | Mainline body | Low | Medium-high | Medium | Medium | Hold ground, protect harvesters |
| Ghoul | Raider / ambusher | Very high | Low | High | Medium | Kill workers, clerics, weak backline |
| Wight | Elite linebreaker | Medium | High | High | High | Break defended positions |

## Skeleton

Skeletons are the first mass unit.

### Identity

```txt
Fast.
Cheap.
Very fragile.
Usually dies in one solid hit.
Good in large numbers.
Low soul upkeep.
```

### Battlefield role

Skeletons scout, swarm, flank, and overwhelm weak enemies.

They should feel like brittle blades running across the map.

### Weakness

Skeletons should collapse quickly under real resistance, especially fire, area attacks, and anti-swarm enemy units.

## Zombie

Zombies are the basic durable unit.

### Identity

```txt
Slow.
Tougher than skeletons.
Average damage.
Good body-blocker.
Moderate soul upkeep.
```

### Battlefield role

Zombies hold ground, absorb damage, defend harvesters, and let Skeletons or Ghouls attack around the side.

### Weakness

Zombies are slow and easy to kite.

## Ghoul

Ghouls are fast killers.

### Identity

```txt
Very fast.
Low health.
High melee burst.
Good against harvesters, casters, builders, and weak ranged units.
```

### Battlefield role

Ghouls create action in the PvE game. They let the player raid camps, dive clerics, and punish exposed enemy structures.

### Weakness

Ghouls are fragile if caught by heavy units or sustained fire.

## Wight

Wights are the first elite undead unit.

### Identity

```txt
Armored undead.
High health.
High damage.
Expensive.
High soul upkeep.
```

### Battlefield role

Wights anchor a late push, break enemy defenses, and help kill bosses or Totem guards.

### Weakness

Wights are expensive and dangerous to overbuild because of soul upkeep.

## First balance targets

```txt
Skeletons win by numbers.
Zombies win by staying power.
Ghouls win by speed.
Wights win by force.
```

## Config ownership

Unit stats, costs, produced-by lists, command costs, and upkeep should live in `config/units.config.json`.

The `undead-unit-domain-kit` interprets those values.
