import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const [html, menu, art, crt, build] = await Promise.all([
  readFile("index.html", "utf8"),
  readFile("src/menu/graveyard-menu.js", "utf8"),
  readFile("src/menu/graveyard-art.js", "utf8"),
  readFile("src/menu/crt-renderer.js", "utf8"),
  readFile("scripts/build-static.mjs", "utf8")
]);

assert.match(html, /<canvas id="game"/);
assert.match(html, /src\/menu\/graveyard-menu\.js/);
assert.doesNotMatch(html, /class="menu"|backdrop-filter|border-radius:\s*24px/);
assert.match(menu, /BEGIN CAMPAIGN/);
assert.match(menu, /game\.html\?campaign=new/);
assert.match(menu, /window\.PhantomMenu/);
assert.match(art, /createGraveyardArt/);
assert.match(art, /drawGrave/);
assert.match(art, /PHANTOM/);
assert.match(crt, /curveUv/);
assert.match(crt, /scanline/);
assert.match(crt, /uAberration/);
assert.match(crt, /texSubImage2D/);
assert.match(build, /"src"/);
console.log("Phantom Command graveyard menu smoke check ok");
