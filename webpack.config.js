var fs = require('fs')

module.exports = {
  entry: './sample/animated/index.js',
  output: {
    path: __dirname + '/sample/animated',
    filename: 'build.js',
  },

  resolve: {
    symlinks: false
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader'
    }]
  }
}