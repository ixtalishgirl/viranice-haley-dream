import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
  root: path.resolve(__dirname),
  build: {
    outDir: "dist/public",
    emptyOutDir: true,
  },
  server: {
    port: 8080,
  },
});
