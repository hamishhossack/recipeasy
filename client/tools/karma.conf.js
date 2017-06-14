const testWebpackConfig = require('./webpack/test')({ env: 'test' });

module.exports = function (config) {
  config.set({

    files: [
      './src/**/*.test.js'
    ],

    preprocessors: {
      './src/**/*.test.js': [ 'webpack', 'sourcemap' ]
    },

    plugins: [
      'karma-webpack',
      'karma-jasmine',
      'karma-sourcemap-loader',
      'karma-phantomjs-launcher',
      'karma-mocha-reporter',
      'istanbul-instrumenter-loader',
    ],

    webpack: testWebpackConfig,

    webpackMiddleware: {
      noInfo: true,
      stats: {
        chunks: false
      }
    },

    reporters: [ 'mocha', 'progress' ],

    frameworks: [ 'jasmine' ],

    coverageIstanbulReporter: {
      reports: [ 'text-summary' ],
      fixWebpackSourcePaths: true
    },

    logLevel: config.LOG_INFO,

    browsers: [ 'PhantomJS' ]

  });
};
