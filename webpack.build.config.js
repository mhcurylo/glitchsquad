const conf = require('./webpack.config.js');
const webpack = require('webpack');
const CCP = require('webpack-closure-compiler');

conf.plugins.push(
  
        new CCP({
	          compiler: {
		              language_in: 'ECMASCRIPT6',
		                language_out: 'ECMASCRIPT5',
		              compilation_level: 'ADVANCED'
	                },
          concurrency: 3,
        })	  
//  new webpack.optimize.UglifyJsPlugin({
//    compress: true,
//    test: /\.(js|jsx|ts)$/
//  })
);

module.exports = conf;
