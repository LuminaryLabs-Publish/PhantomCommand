import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const [html, scene, crt, build] = await Promise.all([
  readFile("game.html", "utf8"),
  readFile("src/campaign/campaign-scene.js", "utf8"),
  readFile("src/menu/crt-renderer.js", "utf8"),
  readFile("scripts/build-static.mjs", "utf8")
]);

assert.match(html, /<canvas id="game"/);
assert.match(html, /src\/campaign\/campaign-scene\.js/);
assert.doesNotMatch(html, /unpkg\.com\/three|smooth-ring-handoff-v6/);
assert.match(scene, /createCrtRenderer/);
assert.match(scene, /const W = 640;/);
assert.match(scene, /const H = 360;/);
assert.match(scene, /Array\.from\(\{ length: 7 \}/);
assert.match(scene, /const laneAngles = \[/);
assert.match(scene, /const archetypes = \{/);
assert.match(scene, /const towerTypes = \{/);
assert.match(scene, /const waves = \[/);
assert.match(scene, /u\.frame=Math\.floor\(u\.anim.*\)%4/);
assert.match(scene, /camera\.targetZoom/);
assert.match(scene, /window\.GameHost/);
assert.match(crt, /texSubImage2D/);
assert.match(crt, /uSourceResolution/);
assert.match(build, /"src"/);

console.log("Phantom Command campaign scene smoke check ok");
