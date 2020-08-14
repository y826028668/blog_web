module.exports = {
  publicPath: '../../',
  productionSourceMap: true,
  lintOnSave: false,
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
