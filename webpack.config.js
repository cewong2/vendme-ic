const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');

plugins: [
  new VueLoaderPlugin(),
  // ...
],

{
  test: /\.js$/,
  exclude: /(node_modules)/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env']
    }
  }
}

module.exports = {
  entry: './src/main.js',
  resolve: {
    fallback: {
      assert: false,
      buffer: false,
      console: false,
      constants: false,
      crypto: false,
      domain: false,
      events: false,
      http: false,
      https: false,
      os: false,
      path: false,
      punycode: false,
      process: false,
      querystring: false,
      stream: false,
      string_decoder: false,
      sys: false,
      timers: false,
      tty: false,
      url: false,
      util: false,
      vm: false,
      zlib: false,
      } 
    }
  }
