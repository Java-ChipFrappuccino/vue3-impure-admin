import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  // server: {
  //   proxy: {
  //     "/api/google-places": {
  //       target: "https://places.googleapis.com",
  //       changeOrigin: true,
  //       rewrite: (path) =>
  //         path.replace(/^\/api\/google-places/, "/v1/places:searchText"),
  //     },
  //   },
  // },
});
