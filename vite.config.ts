/// <reference types="vitest/config" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/__tests__/vitest.setup.ts",
    coverage: {
      reporter: ["text"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/App.tsx",
        "src/main.tsx",
        "src/custom.d.ts",
        "src/declarations.d.ts",
        "src/api/apiClient.ts",
        "src/pages/Contact.tsx", //TODO: Remove after adding page to site
        "src/assets/**", // TODO: Not sure about this one
        "src/__tests__/**",
        "src/types/**",
      ],
    },
  },
});
