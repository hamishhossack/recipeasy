const path = require('path');
const webpackMerge = require('webpack-merge');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');

const commonConfig = require('./common');
const helpers = require('./../helpers');
const loaders = require('./loaders.js');

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 3000;
const METADATA = webpackMerge(commonConfig({ env: ENV }).METADATA, {
  host: HOST,
  port: PORT,
  ENV: ENV,
  API_URL: process.env.API || `http://localhost:3001`,
});

module.exports = function (options) {

  return {

    devtool: 'inline-source-map',

    resolve: {
      extensions: [ '.js' ],
      modules: [ path.resolve(__dirname, 'src'), 'node_modules' ],
    },

    module: {
      rules: [
        loaders.CssLoader(),
        loaders.SassLoader(),
        loaders.HandlebarsLoader(),
        loaders.JavascriptLoader(),
        loaders.InstanbulLoader()
      ]
    },

    plugins: [

      new DefinePlugin({
        'ENV': JSON.stringify(METADATA.ENV),
        'process.env': {
          'ENV': JSON.stringify(METADATA.ENV),
          'NODE_ENV': JSON.stringify(METADATA.ENV),
        }
      }),

      new LoaderOptionsPlugin({
        debug: false,
        options: {
          // legacy options go here
        }
      }),

    ],

    performance: {
      hints: false
    },

    node: {
      global: true,
      process: false,
      crypto: 'empty',
      module: false,
      clearImmediate: false,
      setImmediate: false
    }

  };
}
