var fs = require('fs')

module.exports = {
  entry: {
    static: './sample/static/index.js',
    animated: './sample/animated/index.js'
  },
  output: {
    path: __dirname + '/sample/build',
    filename: '[name].js',
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