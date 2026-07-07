# PhantomCommand Agent Notes

**Latest documented run:** `2026-07-07T03-11-00-04-00`

**Latest tracker:** `.agent/trackers/2026-07-07T03-11-00-04-00/project-breakdown.md`

## Current repo read

`PhantomCommand` is a static Vite/Three.js publish repo for a single-player PvE undead RTS prototype. The current playable app is not yet a full RTS loop. It opens through `index.html`, loads `game.html`, and presents an immediate construct scene where concentric stone-ring slabs assemble around the Grim Reaper Totem with pan, zoom, skip, and restart controls.

The design docs and config are ahead of the runtime. They describe the intended RTS foundation: Crypt Core, grave/bone economy, Skeleton and Zombie production, enemy camps/waves, XP, unlocks, and a center Totem objective.

## Current documentation status

This `.agent` folder tracks repo breakdowns and next-step recommendations. Each run gets a timestamped tracker folder so the repo can accumulate a durable project history without relying on chat context.

## Highest-value next action

Convert the current construct showcase into the first playable RTS slice by keeping the Totem ring intro as an opening/camera scene, then hand off into an interactive fixed-map scenario driven by existing config files.

```txt
main menu
  -> construct intro
  -> fixed RTS map
  -> select undead units
  -> build Grave Harvester
  -> build Bone Pit
  -> produce Skeletons/Zombies
  -> clear first enemy camp
  -> win/loss state
  -> inspectable GameHost state
```
