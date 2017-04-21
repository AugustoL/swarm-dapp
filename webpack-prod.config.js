var webpack = require('webpack');
var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  context: path.join(__dirname, "src"),
  devtool: "source-map",
  entry: "./index.js",
  externals: ['ws'],
  node: { fs: "empty" },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
        }
      },
      {
        test: /\.css/,
        use: [
          {loader: 'style-loader' },
          {loader: 'raw-loader' }
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&minetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      },
      {
        test: /\.png$/,
        loader: "url-loader",
        query: { mimetype: "image/png" }
      },
      {
      test: /\.svg$/,
        loader: "url-loader"
      }
    ]
  },
  output: {
    path: __dirname + "/build/",
    filename: "index.min.js"
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: __dirname+'/src/assets', to: __dirname+'/build/assets' },
      { from: __dirname+'/src/index.html', to: __dirname+'/build/index.html' }
    ])
  ]
};
