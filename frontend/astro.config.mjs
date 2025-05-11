// @ts-check
import { defineConfig } from "astro/config";
import { fileURLToPath } from "url";
import path from "path";
import react from "@astrojs/react";

// Needed to make path.resolve work in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  vite: {
    resolve: {
      alias: {
        "@assets": path.resolve(__dirname, "./src/assets"),
        "@ui": path.resolve(__dirname, "./src/components/ui"),
        "@hooks": path.resolve(__dirname, "./src/hooks"),
        "@providers": path.resolve(__dirname, "./src/components/providers"),
        "@layouts": path.resolve(__dirname, "./src/layouts"),
        "@pages": path.resolve(__dirname, "./src/pages"),
        "@styles": path.resolve(__dirname, "./src/styles"),
      },
    },
  },
  integrations: [react()],
});
