'use strict';

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlPlugin = require('html-webpack-plugin');

var isDev = process.env.BUILD_ENV !== 'production';

// Plugins to be used only for production build
var prodPlugins = isDev
  ? []
  : [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin()
  ];

var config = {
  entry: 'main',

  output: {
    path: __dirname + '/dist',
    filename: 'app.[hash].js'
  },

  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx'],
    modulesDirectories: ['web_modules', 'node_modules', 'bower_components'],
    root: __dirname + '/app/scripts',
    alias: {
      styles: __dirname + '/app/styles'
    }
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules|bower_components/,
        loader: 'babel-loader?optional=runtime'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader' + (isDev ? '?sourceMap' : '')
        )
      },

      // Inline image URLs up to 10kb, then load as separate files
      { test: /\.png$/, loader: 'url?limit=10000' },
      { test: /\.svg$/, loader: 'url?limit=10000' },

      // JPEGs should probably always be loaded as separate files because they
      // tend to be larger
      { test: /\.jpe?g$/, loader: 'file' },

      // Always load fonts as a separate file, in case the stylesheet defines
      // several files for the same font face.
      { test: /\.(eot|woff2?|ttf)$/, loader: 'file' }
    ],
    postLoaders: [
        // Run JSHint after transforms because it doesn't understand JSX syntax
        {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'jshint-loader'
        }
    ],
  },

  plugins: [
    // Extract the stylesheet into a separate file
    new ExtractTextPlugin('app.[hash].css'),

    // Generate an index.html file that automatically references the generated
    // script and stylesheet
    new HtmlPlugin({
      inject: true,
      template: 'app/index.html'
    }),

    // Automatically resolve the "main" file in a Bower package
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
    )
  ].concat(prodPlugins),

  devtool: isDev ? 'source-map' : false,

  jshint: {
    failOnHint: true
  }
};

module.exports = config;
