var fs = require('fs')

module.exports = {
  entry: './sample/static/full.js',
  output: {
    path: __dirname + '/sample/static',
    filename: 'build.js',
  },

  resolve: {
    symlinks: false
  },
  module: {
    loaders: [{
      test: /\.js$/,
      // include: [
      //   fs.realpathSync(__dirname + '/src'),
      //   fs.realpathSync(__dirname + '/../xcloud')
      // ],
      loader: 'babel-loader'
    }]
  }
}