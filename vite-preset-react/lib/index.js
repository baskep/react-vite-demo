'use strict'

const path = require('path')
const reactRefresh = require('@vitejs/plugin-react-refresh')
const reactDevtoolsPlugin = require('./devtools')
const legacyPlugin = require('../compat/legacy/vite-plugin-legacy').default
const tsconfigPaths = require('vite-tsconfig-paths').default

module.exports = function reactPlugin({
  removeDevtoolsInProd = true, // 是否生产环境下禁用React devtools 
  injectReact = false, // 注入import React from 'react'
  legacy = false, // 兼容老浏览器
  base = '',
  lessOptions = {},
} = {}) {
  return [{
      name: 'react:config',
      config(userConfig) {
        return {
          base: userConfig.base || base || process.env.PUBLIC_PATH || '/',
          build: {
            outDir: './build',
            sourcemap: 'hidden',
            manifest: true,
            cssTarget: ['chrome38', 'ios10']
          },
          resolve: {
            alias: {
              // esm 兼容
              'fbjs/lib/setImmediate': path.join(__dirname, '../compat/fbjs/setImmediate.js'),
              '@rematch/core': '@rematch/core/dist/umd/rematch.js',
            },
          },
          esbuild: {
            ...(injectReact ? {
              jsxInject: 'import React from \'react\''
            } : {}),
          },
          css: {
            preprocessorOptions: {
              less: {
                javascriptEnabled: true,
                ...lessOptions,
              },
            },
          },
        }
      },
    },
    tsconfigPaths(),
    reactRefresh(),
    reactDevtoolsPlugin({
      removeInProd: removeDevtoolsInProd
    }),
    legacy && legacyPlugin(legacy === true ? {} : legacy),
  ]
}