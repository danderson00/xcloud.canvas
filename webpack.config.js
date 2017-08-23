var fs = require('fs')

module.exports = {
  entry: './sample/animated/full.js',
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
      // include: [
      //   fs.realpathSync(__dirname + '/src'),
      //   fs.realpathSync(__dirname + '/../xcloud')
      // ],
      loader: 'babel-loader'
    }]
  }
}