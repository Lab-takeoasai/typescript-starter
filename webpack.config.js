var webpack = require("webpack");
var path = require('path');
var replacements = require('./config/replacements.config');
var WebpackNotifierPlugin = require('webpack-notifier');
module.exports = {
  entry: {
    app: ['./src/app.ts'],
    bundle: ['ionic/js/ionic.bundle.min.js', 'ngCordova/dist/ng-cordova.min.js'],
  },
  output: {
    filename: './www/js/[name].dist.js'
  },
  resolve: {
    root: [path.join(__dirname, 'node_modules'), path.join(__dirname, 'bower_components')],
    extensions: ['', '.ts', '.webpack.js', '.web.js', '.js']
  },
  moduleDirectories: [
    'bower_components',
    'node_modules',
  ],
  watch: true,
  devtool: (process.env.ENV === 'release') ? 'eval' : 'inline-source-map',
  module: {
    loaders: [
      { test: /\.ts$/, loaders: ['ng-annotate', 'ts-loader'] },
      {
        test: /\.ts$/,
        loader: 'string-replace',
        query: {
          multiple: replacements[process.env.ENV || 'debug']
        }
      }
    ]
  },
  plugins: /*(process.env.ENV !== 'release') ? [] :*/ [
    new WebpackNotifierPlugin(),
    new webpack.optimize.UglifyJsPlugin({minimize: true})  // minify
  ]
}
