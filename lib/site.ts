const configuredBasePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/^\/+|\/+$/g, "");
const basePath = configuredBasePath ? `/${configuredBasePath}` : "";

export const siteUrl = `${(process.env.NEXT_PUBLIC_SITE_URL ?? "https://twins-spatial-intelligence.lin00786.chatgpt.site").replace(/\/+$/, "")}/`;

/** Add the deployment directory to local root-relative links and assets. */
export function sitePath(path: string) {
  if (!basePath || !path.startsWith("/") || path.startsWith("//")) return path;
  if (path === basePath || path.startsWith(`${basePath}/`)) return path;
  return `${basePath}${path}`;
}

/** Resolve metadata against the complete site URL, including its directory. */
export function absoluteSiteUrl(path: string = "/") {
  return new URL(path.replace(/^\/+/, ""), siteUrl).href;
}
