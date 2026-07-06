# PhantomCommand

Phantom Command is a single-player PvE RTS prototype about commanding undead forces inside a ritual construct world. The current playable proof opens on a main menu and loads a Three.js scene where concentric stone-ring layers assemble around the Grim Reaper Totem.

## Live app

This repo is configured for GitHub Pages deployment from the `main` branch using `.github/workflows/deploy-pages.yml`.

After the workflow completes, the app should be available at:

```txt
https://luminarylabs-publish.github.io/PhantomCommand/
```

## Current entry points

```txt
index.html  -> main menu
 game.html  -> opening construct scene
```

Click **Start** on the main menu to load `game.html`.

## Local development

This is a static app served through a small Node dev server.

```bash
npm install
npm start
```

Then open:

```txt
http://localhost:4173/
```

## Build

The static build copies the deployable files into `dist/`.

```bash
npm run build
```

## Deploy workflow

The GitHub Pages workflow runs:

```bash
npm ci
npm run build
```

Then uploads `dist/` with `actions/upload-pages-artifact` and deploys it with `actions/deploy-pages`.

## Design docs

The design documentation lives in `docs/` and covers:

- game design,
- undead roster,
- buildings,
- economy and progression,
- kit architecture,
- construct/map generation,
- config model,
- first playable slice,
- implementation plan.
