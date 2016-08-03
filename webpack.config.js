var webpack = require("webpack");
var path = require('path');
var replacements = require('./replacements.config');
var WebpackNotifierPlugin = require('webpack-notifier');
module.exports = {
  entry: {
    app: ['webpack-dev-server/client?http://localhost:8080', './src/app.ts']
  },
  devServer: {
    contentBase: 'www',
    port: 8080,
    inline: true,
    hot: false,
    quiet: false,
    noInfo: true,
    stats: {colors: true}
  },
  output: {
    filename: './www/js/[name].dist.js'
  },
  resolve: {
    root: [path.join(__dirname, 'node_modules')],
    extensions: ['', '.ts', '.webpack.js', '.web.js', '.js']
  },
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
