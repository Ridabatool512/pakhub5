# Deploying to Vercel

This app is built on TanStack Start. The default Lovable build targets Cloudflare Workers; to ship it to Vercel instead, do the following **after exporting the project from Lovable**:

## 1. Switch the build preset to Vercel

In `vite.config.ts`, replace the Lovable preset import with the upstream TanStack Start plugin and set the Nitro preset to `vercel`:

```ts
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tsConfigPaths(),
    tailwindcss(),
    tanstackStart({
      target: "vercel",
      server: { entry: "server" },
    }),
    viteReact(),
  ],
});
```

Then install the upstream plugin:

```bash
bun add -D @tanstack/react-start @vitejs/plugin-react vite-tsconfig-paths @tailwindcss/vite
bun remove @lovable.dev/vite-tanstack-config
```

## 2. Add `vercel.json` (already included)

The included `vercel.json` tells Vercel which command to use and where the output lives.

## 3. Deploy

```bash
vercel --prod
```

Or push to a Git repo and import into the Vercel dashboard — Vercel auto-detects the build.

---

**Note**: If you only need a static SPA on Vercel (no SSR), you can also disable SSR for every route with `ssr: false` in `createFileRoute(...)` and serve the `dist/client/` folder as a static site with a SPA fallback rewrite (already configured in `vercel.json`).
