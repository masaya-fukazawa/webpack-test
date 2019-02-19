const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const glob = require('glob');
const isProd = process.env.NODE_ENV === 'production';

const BASEPATH = path.resolve(__dirname, 'src');
const PROJECTS = ['hoge', 'fuga'];

const OUTPUTPOINTS = {};
PROJECTS.forEach(project => {
  OUTPUTPOINTS[project] = `${project}/src/main/webapp`;
});

const entries = {};
glob.sync(`${BASEPATH}/+(${PROJECTS.join('|')})/js/**/*.js`).forEach(target => {
  const regExp = new RegExp(`${BASEPATH}/`);
  const directories = target.replace(regExp, '').split('/');
  const targetProject = directories.shift();
  const file = directories.join('/');
  const name = `${OUTPUTPOINTS[targetProject]}/${file}`;
  entries[name] = target;
});

module.exports = {
  entry: entries,
  output: {
    path: path.resolve(__dirname, ''),
    filename: '[name]'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    })
  ],
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
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  devtool: isProd ? '' : 'inline-source-map'
}