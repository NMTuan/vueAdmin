import { fileURLToPath, URL } from 'node:url'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Unocss(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'pinia',
        {
          axios: [['default', 'axios']]
        }
        //  'element-plus'
      ],
      dirs: [
        './src/stores',
        './src/composables/**'
      ],
      dts: 'src/auto-imports.d.ts'
    }),
    Components({
      // dts: 'src/components.d.ts',
      // extensions: ['vue'],
      // include: [/\.vue$/, /\.vue\?vue/],
      // exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
