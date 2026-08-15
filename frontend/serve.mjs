import { createReadStream } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import { createServer } from "node:http";
import { dirname, extname, resolve, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const currentDir = dirname(fileURLToPath(import.meta.url));
const dist = resolve(currentDir, "dist");
const manifest = JSON.parse(await readFile(resolve(dist, "route-manifest.json"), "utf8"));
const knownRoutes = new Set(manifest.indexable);

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webmanifest": "application/manifest+json",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8",
};

function normalizedPath(url = "/") {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(url, "http://localhost").pathname);
  } catch {
    return null;
  }
  if (pathname.includes("\0")) return null;
  return pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
}

function safeAssetPath(pathname) {
  const candidate = resolve(dist, `.${pathname}`);
  return candidate.startsWith(`${dist}${sep}`) ? candidate : null;
}

async function isFile(path) {
  try {
    return (await stat(path)).isFile();
  } catch {
    return false;
  }
}

export async function resolveRequest(url) {
  const pathname = normalizedPath(url);
  if (pathname === null) {
    return { file: resolve(dist, "404/index.html"), status: 400, cache: "no-store" };
  }

  if (knownRoutes.has(pathname)) {
    const file = pathname === "/" ? resolve(dist, "index.html") : resolve(dist, `.${pathname}/index.html`);
    return { file, status: 200, cache: "no-cache" };
  }

  if (pathname !== "/route-manifest.json") {
    const asset = safeAssetPath(pathname);
    if (asset && (await isFile(asset))) {
      const immutable = pathname.startsWith("/assets/") || pathname.startsWith("/fonts/");
      return {
        file: asset,
        status: 200,
        cache: immutable ? "public, max-age=31536000, immutable" : "public, max-age=3600",
      };
    }
  }

  return { file: resolve(dist, "404/index.html"), status: 404, cache: "no-cache" };
}

export function startServer(port = Number(process.env.PORT || 3000)) {
  return createServer(async (request, response) => {
    if (request.method !== "GET" && request.method !== "HEAD") {
      response.writeHead(405, { Allow: "GET, HEAD", "Content-Type": "text/plain; charset=utf-8" });
      response.end("Method not allowed");
      return;
    }

    try {
      const target = await resolveRequest(request.url);
      const info = await stat(target.file);
      response.writeHead(target.status, {
        "Cache-Control": target.cache,
        "Content-Length": info.size,
        "Content-Type": MIME_TYPES[extname(target.file).toLowerCase()] || "application/octet-stream",
        "X-Content-Type-Options": "nosniff",
      });
      if (request.method === "HEAD") response.end();
      else createReadStream(target.file).pipe(response);
    } catch {
      response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Internal server error");
    }
  }).listen(port, "0.0.0.0", () => {
    console.log(`Simon Host frontend listening on ${port}`);
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  startServer();
}
