import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig((env) => {
  const isDev = env.mode === 'development'
  const isBuildForApp = env.mode === 'app'
  const publicDir = 'public'
  const assetsDir = isBuildForApp ? './theme-builder/' : './'
  return {
    plugins: [
      vue({
        template: {
          transformAssetUrls: {
            base: '/src',
            includeAbsolute: false,
          }
        }
      }),
      isBuildForApp && viteStaticCopy({
        targets: [
          {
            src: publicDir + '/*',
            dest: assetsDir
          }
        ]
      }),
      {
        // PENDING: Or set build.rollupOptions.output.format to 'umd' (will not extract css to separate file)
        name: 'remove-echarts-import',
        apply: 'build',
        generateBundle(_, bundle) {
          const reg = /import.*as(.*)from.*['"]echarts['"];?/g
          for (const [_fileName, chunkInfo] of Object.entries(bundle)) {
            if (chunkInfo.type === 'chunk') {
              chunkInfo.code = chunkInfo.code.replace(reg, (_match, p1) => {
                p1 = p1.trim();
                return `const ${p1}=window.echarts;!${p1}&&console.error("ECharts is not loaded!");`
              })
            }
          }
        }
      }
    ],
    publicDir,
    build: {
      outDir: isBuildForApp ? 'app' : 'dist', // Target different output directories based on the build mode
      emptyOutDir: true,
      assetsDir,
      // public dir will be copied via vite-plugin-static-copy when building for app
      copyPublicDir: !isBuildForApp,
      rollupOptions: {
        external: ['echarts'],
        output: {
          format: 'module',
          globals: {
            echarts: 'echarts'
          }
        },
        input: path.resolve(__dirname, `${isBuildForApp ? 'app' : 'index'}.html`)
      }
    },
    base: './', // Make sure assets use relative paths
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    define: {
      'import.meta.env.VITE_SHOW_LANGUAGE_SELECTOR': true,
      'import.meta.env.VITE_EXTERNAL_ECHARTS_SCRIPT': isDev || isBuildForApp
        ? `""`
        : `"<script src=\\"https://echarts.apache.org/en/js/vendors/echarts/dist/echarts.min.js\\"></script>"`,
      'import.meta.env.VITE_APP_ASSETS_DIR': JSON.stringify(assetsDir)
    }
  }
});
