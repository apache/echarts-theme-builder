import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import fs from 'fs'
import fse from 'fs-extra'

/**
 * Load release config from env.asf.js
 */
function loadReleaseConfig() {
  const configModule = require('./config/env.asf.js')
  return configModule.default || configModule
}

// Check if release mode is enabled with RELEASE=true environment variable
const isRelease = process.env.RELEASE === 'true'

// https://vite.dev/config/
export default defineConfig({
  define: {
    // 设置环境变量，在前端代码中可以通过import.meta.env访问
    'import.meta.env.VITE_MODE': JSON.stringify(isRelease ? 'release' : 'development')
  },
  plugins: [
    vue(),
    {
      name: 'theme-builder-processor',
      closeBundle: async () => {
        // Handle HTML files - Create language-specific index.html files
        if (fs.existsSync('app/index.html')) {
          console.log('Processing HTML output...')

          // Create directories if they don't exist
          fs.mkdirSync('app/en', { recursive: true })
          fs.mkdirSync('app/zh', { recursive: true })
          fs.mkdirSync('app/en/theme-builder', { recursive: true })
          fs.mkdirSync('app/zh/theme-builder', { recursive: true })

          // Generate HTML content - just div + script tag
          const divContent = '<div id="theme-builder"></div>'
          const scriptTag = '<script type="module" src="./theme-builder/app.min.js"></script>'

          // Create simplified index.html for both languages
          const indexHTML = `${divContent}\n${scriptTag}`

          // Write index.html files (only these, no body.html)
          fs.writeFileSync('app/en/index.html', indexHTML, 'utf-8')
          fs.writeFileSync('app/zh/index.html', indexHTML, 'utf-8')

          // Remove the original index.html
          fs.unlinkSync('app/index.html')
        }

        // Move CSS to shared styles directory
        console.log('Processing CSS and shared resources...')
        fs.mkdirSync('app/styles', { recursive: true })

        if (fs.existsSync('app/styles/main.css')) {
          // CSS is already in the correct location from the build output
          console.log('CSS output already in correct location')
        }

        // Copy theme files from public to app/themes (common resource)
        const themesDir = 'public/themes'
        const themesDestination = 'app/themes'

        if (fs.existsSync(themesDir)) {
          fs.mkdirSync(themesDestination, { recursive: true })

          // Copy theme JSON files
          fs.readdirSync(themesDir).forEach((file) => {
            if (file.endsWith('.json')) {
              fs.copyFileSync(`${themesDir}/${file}`, `${themesDestination}/${file}`)
            }
          })
        }

        // Handle release mode - copy files from app to ecWWWGeneratedDir
        if (isRelease) {
          console.log('Starting release process...')
          const config = loadReleaseConfig()

          // Validate target directories
          if (!config.ecWWWGeneratedDir) {
            console.error('Error: ecWWWGeneratedDir not defined in config')
            return
          }

          const ecWWWBaseDir = config.ecWWWGeneratedDir.replace('_generated', '')
          if (!fs.existsSync(ecWWWBaseDir)) {
            console.error(`Error: ECharts www project not found: ${ecWWWBaseDir}`)
            return
          }

          // Create destination directory if needed
          fse.ensureDirSync(config.ecWWWGeneratedDir)

          // Copy the entire app directory to ecWWWGeneratedDir
          console.log(`Copying app contents to ${config.ecWWWGeneratedDir}`)

          // Copy app directory to ecWWWGeneratedDir
          fse.copySync('app', config.ecWWWGeneratedDir)

          console.log('Release process completed successfully!')
        }
      }
    }
  ],
  build: {
    outDir: 'app',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        'en': path.resolve(process.cwd(), 'index.html'),
        'zh': path.resolve(process.cwd(), 'index.html')
      },
      output: {
        entryFileNames: () => {
          // 统一放在各自语言目录下的theme-builder目录中
          return `[name]/theme-builder/app.min.js`
        },
        chunkFileNames: (chunkInfo: any) => {
          const name = chunkInfo.name || ''
          // 根据名称推断语言
          if (name.startsWith('en') || name.includes('en-')) {
            return `en/theme-builder/chunks/[name]-[hash].js`
          } else {
            return `zh/theme-builder/chunks/[name]-[hash].js`
          }
        },
        assetFileNames: (assetInfo: any) => {
          const info = assetInfo.name || ''

          // For CSS files, put them in shared styles directory
          if (info.endsWith('.css')) {
            return `styles/main.css`
          }

          // Common assets go to app root, others to language-specific directories
          if (info.includes('assets/') || info.includes('images/')) {
            return `assets/[name]-[hash][extname]`
          }

          return `en/theme-builder/assets/[name]-[hash][extname]`
        },
        manualChunks: undefined
      }
    }
  }
})
