import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueMacros from 'unplugin-vue-macros/vite';
import VueRouter from 'unplugin-vue-router/vite';
import Layouts from 'vite-plugin-vue-layouts';
import VueDevTools from 'vite-plugin-vue-devtools';
import WebfontDownload from 'vite-plugin-webfont-dl';
import Unocss from 'unocss/vite';
import { VitePWA } from 'vite-plugin-pwa';
import VueI18n from '@intlify/unplugin-vue-i18n/vite';
import { fileURLToPath } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    }
  },

  server: {
    host: '0.0.0.0',
    port: 4200
  },

  css: {
    modules: {
      localsConvention: 'camelCase'
    }
  },

  plugins: [
    // https://uvr.esm.is/guide/configuration.html
    VueRouter({
      root: __dirname,
      dts: 'src/typed-router.d.ts'
    }),

    // https://vue-macros.dev/guide/configurations.html
    VueMacros({
      root: __dirname,
      plugins: {
        vue: vue()
      },
      betterDefine: false
    }),

    // https://github.com/johncampionjr/vite-plugin-vue-layouts?tab=readme-ov-file#configuration
    Layouts({
      layoutsDirs: resolve(__dirname, 'src/layouts'),
      pagesDirs: resolve(__dirname, 'src/pages'),
      defaultLayout: 'AdminLayout'
    }),

    // https://github.com/antfu/unocss
    // see uno.config.ts for config
    Unocss(),

    // https://github.com/antfu/vite-plugin-pwa
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'safari-pinned-tab.svg'],
      manifest: {
        name: 'vue-template',
        short_name: 'vue-template',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    }),

    // https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      fullInstall: true,
      include: [resolve(__dirname, 'src/locales/**')]
    }),

    // https://github.com/feat-agency/vite-plugin-webfont-dl
    WebfontDownload(),

    // https://github.com/webfansplz/vite-plugin-vue-devtools
    VueDevTools()
  ]
});
