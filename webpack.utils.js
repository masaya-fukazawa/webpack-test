const path = require('path');

const BASEPATH = path.resolve(__dirname, 'src');
const PRODUCTS = ['hoge', 'fuga'];

function getAssetPath(filePath) {
  const regExp = new RegExp(`${BASEPATH}/`);
  const directories = filePath.replace(regExp, '').split('/');
  const targetProject = directories.shift();
  const file = directories.join('/').replace(/.(css|scss|js)/, '');
  const assetPath = `${targetProject}/src/main/webapp/${file}`;
  return assetPath;
};

module.exports = {
  getAssetPath,
  BASEPATH,
  PRODUCTS
};
