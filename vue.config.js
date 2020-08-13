const path = require('path')
module.exports = {
  publicPath: path.resolve(__dirname, './'),
  productionSourceMap: false,
  lintOnSave: true,
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import '~@/assets/css/variables.scss';`
      }
    }
  },
  devServer: {
    open: true,
    proxy: {
      'api': {
        target: 'http://localhost:1234',
        changeOrigin: true
      }
    }
  }
}
