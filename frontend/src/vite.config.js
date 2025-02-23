import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Change this if needed
    open: true, // Auto-open the browser when running `npm run dev`
  },
  test: {
    globals: true,  // Allows global test functions like `describe`, `it`, `expect`
    environment: "jsdom", // Simulates a browser environment for React components
    setupFiles: "./src/setupTests.ts" // Ensures @testing-library/jest-dom is loaded
  }
});
