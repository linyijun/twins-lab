import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/twins-lab";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://linyijun.github.io/twins-lab/";

export default defineConfig({
  root: `${projectRoot}static-site`,
  publicDir: `${projectRoot}public`,
  base: `${basePath}/`,
  plugins: [react()],
  define: {
    "process.env.NEXT_PUBLIC_BASE_PATH": JSON.stringify(basePath),
    "process.env.NEXT_PUBLIC_SITE_URL": JSON.stringify(siteUrl),
  },
  build: {
    outDir: `${projectRoot}dist/pages`,
    emptyOutDir: true,
  },
});
