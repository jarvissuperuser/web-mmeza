import { defineConfig } from "vite";

export default defineConfig({
  root: './src',
  build: {
    outDir: './dist',
    rollupOptions: {
      input: {
        core: 'src/assets/js/core/index.js',
        shared: 'src/assets/js/shared/index.js',
        pages: 'src/assets/js/pages/index.js',
        vendor: 'src/assets/js/data/lazy-ops.js',
        entry: 'src/assets/index.js'
      },
      output: {
        entryFileNames: 'out-[name].js'
      }
    }
  },
  server: {
    port: 2142
  },
  plugins: []
})
