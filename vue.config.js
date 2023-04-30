module.exports = {
  chainWebpack: config => {
    // Set whitespace property
    config.module.rule('vue').use('vue-loader').tap(options => {
      options.compilerOptions.whitespace = 'preserve'
      return options
    })
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: []
    }
  }
}
