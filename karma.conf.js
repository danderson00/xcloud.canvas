module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    frameworks: ['mocha'],

    files: [
      'test/**/*.test.js'
    ],

    preprocessors: {
      'test/**/*.test.js': ['webpack', 'sourcemap']
    },
    
    webpack: {
      devtool: 'inline-source-map'
    }
  });
};