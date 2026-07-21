import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

const port = Number(process.env.PORT) || 5000;
const basePath = process.env.BASE_PATH || "/";

// Determine if running in Cloudflare Pages or local
const isCloudflare = process.env.CF_PAGES || process.env.NODE_ENV === "production";
const rootDir = path.resolve(import.meta.dirname);

export default defineConfig({
  base: basePath,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(rootDir, "src"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: rootDir,
  build: {
    // Output to dist in root for Cloudflare Pages, or in current dir for local
    outDir: path.resolve(rootDir, "dist"),
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: { strict: true },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
