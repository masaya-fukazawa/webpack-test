const NAME = 'webpack-exclude-js-plugin';
const EXCLUDE_EXTENTION = '.js';

class ExcludeJsPlugin {
  constructor() {
    this.apply = this.apply.bind(this);
  }

  apply(compiler) {
    compiler.hooks.compilation.tap(NAME, compilation => {
      compilation.hooks.chunkAsset.tap(NAME, (chunk, file) => {
        if (!file.endsWith(EXCLUDE_EXTENTION) || !chunk.hasEntryModule()) {
          return;
        }

        chunk.files = chunk.files.filter(f => f !== file);
        delete compilation.assets[file];
      });
    });
  }
}

module.exports = ExcludeJsPlugin;