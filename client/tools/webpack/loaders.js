/**
 * Loaders for webpack
 *
 */

const helpers = require('../helpers');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const CssLoader = () => ({
    test: /\.css$/,
    use: [ 'to-string-loader', 'css-loader' ],
    exclude: [ helpers.root('src', 'styles') ]
});

const SassLoader = () => ({
    test: /\.s?css$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader'
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: () => [
              require('autoprefixer')
            ]
          }
        },
        {
          loader: 'sass-loader'
        }
      ]
    })
});

const JsonLoader = () => ({
    test: /\.json$/,
    use: 'json-loader'
});

const HtmlLoader = () => ({
    test: /\.html$/,
    use: 'raw-loader',
    exclude: [ helpers.root('src/index.html') ]
});

const FileLoader = () => ({
    test: /\.(jpg|png|gif|eot|woff2?|svg|ttf)([\?]?.*)$/,
    use: 'file-loader'
});

const SourceMapLoader = () => ({
    enforce: 'pre',
    test: /\.js$/,
    use: 'source-map-loader',
});

const HandlebarsLoader = () => ({
    test: /\.hbs/,
    loader: 'handlebars-loader',
    query: {
      helperDirs: [ helpers.root('src', 'helpers', 'handlebars') ]
    }
});

const JavascriptLoader = () => ({
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [ 'es2015', 'stage-0' ],
        plugins: [ 'transform-es2015-modules-commonjs', 'transform-runtime' ]
      }
    }
});

const InstanbulLoader = () => ({
    test: /\.js$/,
    include: helpers.root('src'),
    loader: 'istanbul-instrumenter-loader',
    query: {
      esModules: true
    }
});

module.exports = {
  CssLoader,
  SassLoader,
  JsonLoader,
  HtmlLoader,
  FileLoader,
  SourceMapLoader,
  HandlebarsLoader,
  JavascriptLoader,
  InstanbulLoader,
};
