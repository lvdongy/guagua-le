
const config = require('./config')
const WebpackSvnciPlugin = require('webpack-svnci-plugin')
const { env } = config

module.exports = {
    
  outputDir: 'dist',

  publicPath: env === 'development' ? './' : config.path[env],

  // 发布正式服不需要source map
  productionSourceMap: env !== 'production',

  devServer: {
    https: false,
    open: false
  },

  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/variables.scss";`
      }
    }
  },

  // vue inspect
  // vue inspect --rule fonts
  chainWebpack: webpackConfig => {

    // 单页面HTML配置
    (function(webpackConfig, config) {
      if(!config.useMultiPage) {
        webpackConfig.plugin('html').tap(args => {
          args[0].title = config.title
          args[0].description = config.description
          args[0].keywords = config.keywords
          return args
        })
      }
    })(webpackConfig, config)

    webpackConfig.module
      .rule('fonts')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => {
        return Object.assign(options || {}, { 
          limit: 1024,
          publicPath: './'
        })
      })
  },

  configureWebpack: (webpackConfig) => {
    // 生产环境添加svn自动上传插件
    if ((env === 'production' || env === 'beta') && config.localSvnPath) {
      webpackConfig.plugins.push(
        new WebpackSvnciPlugin({
          path: config.localSvnPath
        })
      )
    }
  },

  // 多页面配置
  pages: config.useMultiPage ? getPagesConfig() : undefined 
}

function getPagesConfig() {

  const entry = 'src/main.js'
  const template = 'public/index.html'
  const chunks = ['chunk-vendors', 'chunk-common']
  const pages = config.multiPage
    
  for (const key in pages) {
    if (Object.hasOwnProperty.call(pages, key)) {
      const config = pages[key]
      config.entry = entry
      config.template = template
      config.chunks = chunks.concat(key)
    }
  }
  return pages
}
