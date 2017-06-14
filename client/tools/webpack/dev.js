/**
 * Webpack Plugins
 */
const webpackMerge = require('webpack-merge');
const webpackMergeDll = webpackMerge.strategy({ plugins: 'replace' });
const DefinePlugin = require('webpack/lib/DefinePlugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const DllBundlesPlugin = require('webpack-dll-bundles-plugin').DllBundlesPlugin;

const helpers = require('../helpers');
const loaders = require('./loaders.js');
const commonConfig = require('./common.js');

/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 3000;
const METADATA = webpackMerge(commonConfig({ env: ENV }).METADATA, {
  host: HOST,
  port: PORT,
  ENV: ENV,
  API_URL: process.env.API || `http://localhost:3001`,
});

module.exports = () => {

  return webpackMerge(commonConfig({ env: ENV }), {

    devtool: 'cheap-module-source-map',

    output: {

      path: helpers.root('dist'),

      filename: '[name].bundle.js',

      sourceMapFilename: '[file].map',

      chunkFilename: '[id].chunk.js',

      library: 'recipe_[name]',

      libraryTarget: 'this',

    },

    plugins: [

      new DefinePlugin({
        'ENV': JSON.stringify(METADATA.ENV),
        'process.env': {
          'ENV': JSON.stringify(METADATA.ENV),
          'NODE_ENV': JSON.stringify(METADATA.ENV),
        }
      }),

      new DllBundlesPlugin({
        bundles: {
          vendor: [
            'handlebars',
          ]
        },
        dllDir: helpers.root('dll'),
        webpackConfig: webpackMergeDll(commonConfig({ env: ENV }), {
          devtool: 'cheap-module-source-map',
          plugins: []
        })
      }),

      new AddAssetHtmlPlugin([
        { filepath: helpers.root(`dll/${DllBundlesPlugin.resolveFile('vendor')}`) }
      ]),

      new LoaderOptionsPlugin({
        debug: true,
        options: {}
      }),

      new ExtractTextPlugin({ filename: '[name].css', disable: false }),

    ],

    devServer: {
      port: METADATA.port,
      host: METADATA.host,
      historyApiFallback: true,
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      }
    },

  });
};
