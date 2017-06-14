const webpack = require('webpack');
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const helpers = require('../helpers');
const loaders = require('./loaders.js');

const METADATA = {
  title: 'Reacipeasy',
  baseUrl: '/',
  isDevServer: helpers.isWebpackDevServer()
};

module.exports = () => ({
  entry: {
    main: helpers.root('src', 'index.js'),
    vendors: helpers.root('src', 'vendors.js')
  },

  resolve: {
    extensions: ['.js', '.css', '.scss'],
    modules: [
      helpers.root('src'),
      helpers.root('node_modules'),
    ],
  },

  module: {
    rules: [
      loaders.CssLoader(),
      loaders.SassLoader(),
      loaders.FileLoader(),
      loaders.HandlebarsLoader(),
      loaders.JavascriptLoader(),
    ],
  },

  plugins: [

    // This enables tree shaking of the vendor modules
    new CommonsChunkPlugin({
      name: 'vendor',
      chunks: ['main'],
      minChunks: module => /node_modules/.test(module.resource)
    }),

    // Specify the correct order the scripts will be injected in
    new CommonsChunkPlugin({
      name: ['vendor'].reverse()
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.hbs',
      title: METADATA.title,
      chunksSortMode: 'dependency',
      metadata: METADATA,
    }),

    new LoaderOptionsPlugin({}),

  ],

  node: {
    global: true,
    crypto: 'empty',
    fs: 'empty',
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false
  },
});
