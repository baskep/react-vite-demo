import { defineConfig } from 'vite'

// import react from '@vitejs/plugin-react'

import React from './vite-preset-react/lib'

export default defineConfig({
  base: './',
  server: {
    port: 3001,
    proxy: {
      '/api': {
        target: 'https://www.test1.com',
        changeOrigin: true,
        cookieDomainRewrite: {
          '*': ''
        },
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  },
  plugins: [React({
    injectReact: false, // 如果开启，不需要在jsx中手动引入react
    legacy: {}, // 是否需要支持旧版本的浏览器(false=>不支持)
  })],
  css: {
    modules: {
      generateScopedName: '[name]__[local]___[hash:base64:5]',
      hashPrefix: 'prefix',
    },
  },
})