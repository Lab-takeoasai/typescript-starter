var path = require('path');
module.exports = {
  entry: {
    app: './src/app.ts'
  },
  output: {
    filename: './www/js/[name].dist.js'
  },
  resolve: {
    root: [path.join(__dirname, 'node_modules')],
    extensions: ['', '.ts', '.webpack.js', '.web.js', '.js']
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
      { test: /\.ts$/, loaders: ['ng-annotate', 'ts-loader'] },
      {
        test: /\.ts$/,
        loader: 'string-replace',
        query: {
          multiple: [
             { search: '@@imgUrl', replace: 'whatisisisisis' }
          ]
        }
      }
    ]
  }
}
