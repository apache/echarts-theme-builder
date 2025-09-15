import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import fs from 'fs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'theme-builder-post-process',
      closeBundle: async () => {
        // Handle HTML files
        if (fs.existsSync('app/index.html')) {
          // Create directories if they don't exist
          if (!fs.existsSync('app/en')) {
            fs.mkdirSync('app/en', { recursive: true });
          }

          // Read the content from index.html but only extract the body content
          const content = fs.readFileSync('app/index.html', 'utf-8');
          const bodyContent = content.match(/<body>(.*?)<\/body>/s)?.[1] || '';

          // Write to body.html for English version
          fs.writeFileSync('app/en/body.html', bodyContent.trim(), 'utf-8');

          // Do the same for zh version
          if (!fs.existsSync('app/zh')) {
            fs.mkdirSync('app/zh', { recursive: true });
          }
          fs.writeFileSync('app/zh/body.html', bodyContent.trim(), 'utf-8');

          // Remove the original index.html
          fs.unlinkSync('app/index.html');
        }
        
        // Move CSS file to app/styles directory (common for both languages)
        if (fs.existsSync('app/en/theme-builder/main.css')) {
          const stylesDir = 'app/styles';
          if (!fs.existsSync(stylesDir)) {
            fs.mkdirSync(stylesDir, { recursive: true });
          }
          
          // Move CSS to shared styles directory
          fs.copyFileSync('app/en/theme-builder/main.css', `${stylesDir}/main.css`);
          
          // Clean up the language-specific CSS files
          if (fs.existsSync('app/en/theme-builder/main.css')) {
            fs.unlinkSync('app/en/theme-builder/main.css');
          }
        }
        
        // Create shared assets directory if needed
        const sharedAssetsDir = 'app/assets';
        if (!fs.existsSync(sharedAssetsDir)) {
          fs.mkdirSync(sharedAssetsDir, { recursive: true });
        }

        // Copy theme files to app root directory
        const themesDir = 'public/themes';
        const themesDestination = 'app/themes';

        if (fs.existsSync(themesDir)) {
          // Create themes directory in app root
          if (!fs.existsSync(themesDestination)) {
            fs.mkdirSync(themesDestination, { recursive: true });
          }

          // Copy theme files to app/themes
          fs.readdirSync(themesDir).forEach((file: string) => {
            if (file.endsWith('.json')) {
              fs.copyFileSync(`${themesDir}/${file}`, `${themesDestination}/${file}`);
            }
          });
        }
      }
    }
  ],
  build: {
    outDir: 'app',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        'main': path.resolve(process.cwd(), 'index.html')
      },
      output: {
        entryFileNames: (chunkInfo) => {
          const locale = chunkInfo.facadeModuleId?.includes('/en/') ? 'en' : 'zh';
          return `${locale}/theme-builder/app.min.js`;
        },
        chunkFileNames: (chunkInfo) => {
          const name = chunkInfo.name || '';
          const locale = name.includes('en') ? 'en' : 'zh';
          return `${locale}/theme-builder/chunks/[name]-[hash].js`;
        },
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name || '';
          
          // For CSS files, put them in shared styles directory
          if (info.endsWith('.css')) {
            return `styles/main.css`;
          }
          
          // Common assets go to app root, others to language-specific directories
          if (info.includes('assets/') || info.includes('images/')) {
            return `assets/[name]-[hash][extname]`;
          }

          return `en/theme-builder/assets/[name]-[hash][extname]`;
        },
        manualChunks: undefined
      }
    }
  }
})
