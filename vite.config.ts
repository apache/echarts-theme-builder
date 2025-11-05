import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import fs from 'fs'
import fse from 'fs-extra'

const SUPPORTED_LANGUAGES: string[] = ['en', 'zh'];
const OUTPUT_DIR: string = 'app';

// Custom plugin to handle HTML output for different languages
function createHtmlOutputPlugin(): Plugin {
  return {
    name: 'html-output-plugin',
    enforce: 'post',
    apply: 'build',
    closeBundle: async () => {
      const distDir = path.resolve(__dirname, 'dist');
      const publicDir = path.resolve(__dirname, 'public');

      // Create language directories if they don't exist
      for (const lang of SUPPORTED_LANGUAGES) {
        const langDir = path.join(OUTPUT_DIR, lang);
        const assetDir = path.join(langDir, 'theme-builder');
        const themesDir = path.join(assetDir, 'themes');

        // Ensure directories exist and clean any existing assets
        await fse.ensureDir(langDir);
        await fse.ensureDir(assetDir);

        // Clean up existing JS and CSS files before copying new ones
        const existingFiles = await fse.readdir(assetDir);
        for (const file of existingFiles) {
          if (file.endsWith('.js') || file.endsWith('.css')) {
            await fse.remove(path.join(assetDir, file));
          }
        }

        await fse.ensureDir(themesDir);

        // Find JS and CSS files in the dist directory
        const files = await fse.readdir(distDir);
        const jsFiles = files.filter(file => file.endsWith('.js'));
        const cssFiles = files.filter(file => file.endsWith('.css'));

        // Read the HTML file to extract scripts and links to include in body.html
        if (fs.existsSync(path.join(distDir, 'index.html'))) {
          const htmlContent = await fse.readFile(path.join(distDir, 'index.html'), 'utf-8');

          // Extract only the content within the body tag
          let bodyContent = htmlContent.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] || '';

          // Get all script and link tags from head
          const headScripts = (htmlContent.match(/<script[^>]*src="\.\/([^"]+)"[^>]*><\/script>/g) || [])
            .map(script => script.replace(/src="\.\//g, 'src="theme-builder/'));

          const headLinks = (htmlContent.match(/<link[^>]*href="\.\/([^"]+)"[^>]*>/g) || [])
            .map(link => link.replace(/href="\.\//g, 'href="theme-builder/'));

          // Create a complete body.html with necessary script and link tags
          let finalContent = [...headLinks, ...headScripts, bodyContent.trim()].join('\n');

          // Replace any references to themes in the content
          finalContent = finalContent.replace(/(['"])\.?\/themes\//g, '$1./theme-builder/themes/');

          // Write the content to body.html
          await fse.writeFile(path.join(langDir, 'body.html'), finalContent);
        }

        // Copy JS and CSS files to the theme-builder directory
        for (const jsFile of jsFiles) {
          await fse.copy(
            path.join(distDir, jsFile),
            path.join(assetDir, jsFile)
          );
        }

        for (const cssFile of cssFiles) {
          await fse.copy(
            path.join(distDir, cssFile),
            path.join(assetDir, cssFile)
          );
        }

        // Copy themes from public directory
        if (fs.existsSync(path.join(publicDir, 'themes'))) {
          await fse.copy(
            path.join(publicDir, 'themes'),
            themesDir
          );
        }
      }

      // Clean up the original dist directory
      // await fse.remove(distDir);
    }
  };
}

// Custom plugin to rewrite theme paths in JS files
function createThemePathRewritePlugin(): Plugin {
  return {
    name: 'theme-path-rewrite',
    transform(code, id) {
      if (id.endsWith('.js') || id.endsWith('.ts')) {
        // Replace theme path references
        return code.replace(/(['"`])\.?\/themes\//g, '$1./theme-builder/themes/');
      }
      return code;
    }
  };
}

export default defineConfig({
  plugins: [
    vue({
      template: {
        transformAssetUrls: {
          base: '/src',
          includeAbsolute: false,
        },
      }
    }),
    createThemePathRewritePlugin(),
    createHtmlOutputPlugin()
  ],
  build: {
    outDir: 'dist', // Temporary build directory
    emptyOutDir: true,
    assetsDir: '.', // This will ensure assets are placed at the root level of the output directory
    rollupOptions: {
      output: {
        // Customize output file names
        entryFileNames: '[name]-[hash].js',
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: '[name]-[hash].[ext]'
      }
    }
  },
  base: './', // Make sure assets use relative paths
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
