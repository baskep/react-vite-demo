'use strict'

module.exports = function reactDevtoolsPlugin({
  removeInProd = false,
} = {}) {
  const plugin = {
    name: 'react:devtools',
    enforce: 'pre',
    apply: 'build',

    transformIndexHtml(code) {
      if (removeInProd) {
        return {
          html: code,
          tags: [{
            injectTo: 'body',
            tag: 'script',
            children: 'if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === \'object\') { window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = function () {};};',
          }],
        }
      }
      return code
    },
  }
  return plugin
}