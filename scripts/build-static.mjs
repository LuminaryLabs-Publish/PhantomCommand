import { cp, mkdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";

const outputDir = "dist";
const staticPaths = [
  "index.html",
  "game.html",
  "src",
  "docs",
  "config"
];

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });

for (const sourcePath of staticPaths) {
  if (!existsSync(sourcePath)) continue;
  await cp(sourcePath, `${outputDir}/${sourcePath}`, { recursive: true });
}

console.log(`Built static site into ${outputDir}/`);
