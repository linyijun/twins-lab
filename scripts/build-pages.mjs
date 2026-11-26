import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import { resolve } from "node:path";
import { build } from "vite";

const root = fileURLToPath(new URL("../", import.meta.url));
const configFile = resolve(root, "vite.pages.config.ts");
const output = resolve(root, "dist/pages");
const renderOutput = resolve(root, "dist/pages-ssr");
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/twins-lab";

await build({ configFile });
await build({
  configFile,
  build: {
    ssr: resolve(root, "static-site/render.tsx"),
    outDir: renderOutput,
    copyPublicDir: false,
    emptyOutDir: true,
  },
});

const { renderPage } = await import(pathToFileURL(resolve(renderOutput, "render.js")));
const template = await readFile(resolve(output, "index.html"), "utf8");
if (!template.includes("<!--app-html-->")) throw new Error("Missing static HTML placeholder");
await writeFile(resolve(output, "index.html"), template.replace("<!--app-html-->", renderPage()));
await writeFile(resolve(output, ".nojekyll"), "");

for (const section of ["research", "team", "join-us"]) {
  const target = `${basePath}/#${section}`;
  const directory = resolve(output, section);
  await mkdir(directory, { recursive: true });
  await writeFile(resolve(directory, "index.html"), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=${target}"><title>TWINS Lab</title></head><body><a href="${target}">Continue to TWINS Lab</a></body></html>`);
}

console.log("GitHub Pages site built and prerendered in dist/pages/");
