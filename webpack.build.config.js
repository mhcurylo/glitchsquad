const conf = require('./webpack.config.js');
const webpack = require('webpack');
const CCP = require('webpack-closure-compiler');

conf.plugins.push(
  new CCP({
    compiler: {
      language_in: 'ECMASCRIPT6',
      language_out: 'ECMASCRIPT5',
      compilation_level: 'SIMPLE',
      create_source_map: './public/shared.map.js',
      debug: true
    },
    concurrency: 3,
  })
);

module.exports = conf;
