const webpack = require('webpack');
const path = require('path');
const defaultWebpackConfig = require('./webpack.config.js');
const CompressionPlugin = require('compression-webpack-plugin');


module.exports = {
  transpileDependencies: ['vuetify'],
  devServer: {
    allowedHosts: [
      'localhost',
      '.github.com',
      '.githubusercontent.com'
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
      .rule('js')
      .use('babel-loader')
      .loader('babel-loader')
      .tap(options => {
        options.presets = [['@babel/preset-env', { modules: false }]];
        options.plugins = ['@babel/plugin-transform-runtime'];
        return options;
      });

    config.plugin('CompressionPlugin').use(CompressionPlugin);
      
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
