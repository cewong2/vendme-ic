const webpack = require('webpack');

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
          VUE_APP_API_BASE_URL: JSON.stringify(process.env.VUE_APP_API_BASE_URL)
        }
      })
    ]
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = 'VendMe Image Capture';
      return args;
    });
  }
};
