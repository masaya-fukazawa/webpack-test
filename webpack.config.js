const path = require('path');
const glob = require('glob');
const { getAssetPath, BASEPATH, PRODUCTS } = require('./webpack.utils');
const isProd = process.env.NODE_ENV === 'production';

const entries = {};
glob.sync(`${BASEPATH}/+(${PRODUCTS.join('|')})/js/**/*.js`).forEach(filePath => {
  const assetPath = getAssetPath(filePath)
  entries[assetPath] = filePath;
});

module.exports = {
  entry: entries,
  output: {
    path: path.resolve(__dirname, ''),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            babelrc: false,
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      }
    ]
  },
  devtool: isProd ? '' : 'inline-source-map'
}