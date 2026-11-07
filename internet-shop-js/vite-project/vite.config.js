import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: fileURLToPath(new URL('./index.html', import.meta.url)),
        cart: fileURLToPath(new URL('./cart.html', import.meta.url)),
      },
    },
  },
});
