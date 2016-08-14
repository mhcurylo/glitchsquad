const path = require('path');
const dir = __dirname;

module.exports = {
  entry: path.resolve(dir, './src/entry.js'),
  output: {
    path: path.resolve(dir, './build'),
    publicPath: '/build/',
    filename: "bundle.js"
  },
  module: {
   loaders: [
   ]
  }
};
