import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const output = fileURLToPath(new URL("../dist/pages/", import.meta.url));
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/twins-lab";
const html = await readFile(resolve(output, "index.html"), "utf8");

for (const title of ["Spatial Prediction", "Spatiotemporal Modeling", "Historical Map Understanding", "Group Members", "Join us"]) {
  assert.ok(html.includes(title), `Missing prerendered content: ${title}`);
}
assert.ok(html.includes("spatiotemporal forecasting"));
assert.ok(!html.includes("<!--app-html-->"), "Page was not prerendered");

const localUrls = [...html.matchAll(/(?:src|href)="(\/[^\"]+)"/g)].map(match => match[1]);
assert.ok(localUrls.length > 5, "Missing local assets or links");
for (const url of new Set(localUrls)) {
  assert.ok(url.startsWith(`${basePath}/`), `URL escapes the repository path: ${url}`);
  const path = url.slice(basePath.length + 1).split(/[?#]/)[0];
  await access(resolve(output, path || "index.html"));
}
for (const section of ["research", "team", "join-us"]) {
  const redirect = await readFile(resolve(output, section, "index.html"), "utf8");
  assert.ok(redirect.includes(`${basePath}/#${section}`), `Incorrect ${section} redirect`);
}
await access(resolve(output, ".nojekyll"));
console.log("Verified prerendered content, repository-relative links, assets, and section redirects.");
