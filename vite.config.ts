import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
const { resolve } = require('path');

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    build: {
        rollupOptions: {
            input: {
                // Use body.html when deploying
                main: resolve(__dirname, '_body.html')
            }
        }
    },
    plugins: [vue()]
});