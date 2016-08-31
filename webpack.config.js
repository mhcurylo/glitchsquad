const path = require('path');
const dir = __dirname;
const webpack = require('webpack');
const Copy = require('copy-webpack-plugin');

module.exports = {
  context: path.resolve(dir, './src/'),
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
  },
  entry: path.resolve(dir, './src/entry.ts'),
  output: {
    path: path.resolve(dir, './build'),
    publicPath: '/',
    filename: "bundle.js"
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loaders: ['eslint'],
        include: path.resolve(dir, './src/')
      }
    ], 
    loaders: [

       {test: /\.tsx?$/, loader: 'ts-loader'},
       {test: /\.scss$/, loaders: ["style", "css", "sass"]}
    ]
  },
  tslint: {
    emitErrors: true,
    failOnHint: true
  },
  plugins: [
//    new webpack.optimize.UglifyJsPlugin({
//      compress: {
//        warnings: false
//      }
//    }),
    new Copy([
      { 
        from: 'index.html'
      }
    ])
  ]
};
