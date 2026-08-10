import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
<<<<<<< HEAD
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],

  base: "/PSB/",

=======

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/PSB/",
>>>>>>> 150c580c8ad7708d76456ad4b3d8b7f8ffa67035
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
<<<<<<< HEAD

=======
>>>>>>> 150c580c8ad7708d76456ad4b3d8b7f8ffa67035
  server: {
    port: 3000,
    open: true,
  },
<<<<<<< HEAD
});
=======
});
>>>>>>> 150c580c8ad7708d76456ad4b3d8b7f8ffa67035
