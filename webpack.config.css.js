const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExcludeJsPlugin = require('./webpack.plugins');
const { getAssetPath, BASEPATH, PRODUCTS } = require('./webpack.utils');

const entries = {};
glob.sync(`${BASEPATH}/+(${PRODUCTS.join('|')})/css/**/*.+(sc|sa|c)ss`).forEach(filePath => {
  const assetPath = getAssetPath(filePath);
  entries[assetPath] = filePath;
});

module.exports = {
  entry: entries,
  output: {
    path: path.resolve(__dirname, '')
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new ExcludeJsPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
}