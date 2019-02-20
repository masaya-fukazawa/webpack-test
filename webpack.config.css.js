const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const glob = require('glob');
const { getAssetPath, BASEPATH, PRODUCTS } = require('./webpack.utils');

const entries = {};
glob.sync(`${BASEPATH}/+(${PRODUCTS.join('|')})/css/**/*.+(sc|sa|c)ss`).forEach(filePath => {
  const assetPath = getAssetPath(filePath);
  entries[assetPath] = filePath;
});

module.exports = {
  entry: entries,
  output: {
    path: path.resolve(__dirname, ''),
    filename: '[name.css]'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    })
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