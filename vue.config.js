const webpack = require('webpack');
const path = require('path');
const defaultWebpackConfig = require('./webpack.config.js');
//const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  devServer: {
    disableHostCheck: true
  },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }
      })
    ]
  },
  chainWebpack: config => {
    if (defaultWebpackConfig.module) {
      const urlLoader = defaultWebpackConfig.module.rule('url-loader');
      urlLoader
        .test(/\.(png|jpg|gif|svg|woff|woff2|ttf|eot)$/)
        .use('url-loader')
        .loader('url-loader')
        .tap(options => Object.assign(options, { limit: 8192, name: '[name].[ext]?[hash]' }));
    }

    config.module
      .rule('babel')
      .use('babel-loader')
      .tap(options => {
        options.presets = ['@babel/preset-env'];
        options.plugins = ['@babel/plugin-transform-runtime'];
        return options;
      });
    
    config.plugin('compression-webpack-plugin').use(CompressionPlugin);

    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => {
        options.transformAssetUrls = {
          img: 'src',
          'b-avatar': 'src',
          'b-img': 'src',
          'b-img-lazy': ['src', 'blank-src'],
          'b-card': 'img-src',
          'b-card-img': 'src',
          'b-card-img-lazy': ['src', 'blank-src'],
          'b-carousel-slide': 'img-src',
          'b-embed': 'src'
        };
        return options;
      });
  }
};
