const conf = require('./webpack.config.js');
const webpack = require('webpack');
var CompressionPlugin = require("compression-webpack-plugin");

conf.plugins.push(
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  })
);

module.exports = conf;
