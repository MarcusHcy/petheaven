import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" makes the built site work from any folder, including a github pages link
export default defineConfig({
  plugins: [react()],
  base: "./",

  // turns off the auto-refresh connection. If the page keeps reloading by itself, this stops it.
  // After this, press F5 yourself to see your changes.
  server: { hmr: false },
});