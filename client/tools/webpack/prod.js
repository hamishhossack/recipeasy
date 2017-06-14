/**
 * Webpack Plugins
 */
const webpackMerge = require('webpack-merge');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const IgnorePlugin = require('webpack/lib/IgnorePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const OptimizeJsPlugin = require('optimize-js-plugin');

const helpers = require('./../helpers');
const loaders = require('./loaders.js');
const commonConfig = require('./common.js'); // the settings that are common to prod and dev

/**
 * Webpack Constants
 */
const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;
const METADATA = webpackMerge(commonConfig({
  env: ENV
}).metadata, {
  host: HOST,
  port: PORT,
  ENV: ENV,
});

module.exports = () => {

  return webpackMerge(commonConfig({ env: ENV }), {

    devtool: 'source-map',

    output: {

      path: helpers.root('dist'),

      filename: '[name].[chunkhash].bundle.js',

      sourceMapFilename: '[name].[chunkhash].bundle.map',

      chunkFilename: '[id].[chunkhash].chunk.js'

    },

    plugins: [

      new OptimizeJsPlugin({
        sourceMap: false
      }),

      new DefinePlugin({
        'ENV': JSON.stringify(METADATA.ENV),
        'process.env': {
          'ENV': JSON.stringify(METADATA.ENV),
          'NODE_ENV': JSON.stringify(METADATA.ENV),
        }
      }),

      new UglifyJsPlugin({
        beautify: false,
        output: {
          comments: false
        },
        mangle: {
          screw_ie8: true
        },
        compress: {
          screw_ie8: true,
          warnings: false,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true,
          negate_iife: false // we need this for lazy v8

        },
      }),

      new ExtractTextPlugin({ filename: '[name].[contenthash].css', disable: false }),

    ],
  });
}
