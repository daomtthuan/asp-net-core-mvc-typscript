const path = require('path');
const fs = require('fs');

const pathConfig = {
  src: path.resolve(__dirname, './src'),
};

// Entry are just files with .export.ts extension
// Example: ./src/Views/Home/.export.ts -> Views/Home.js -> window.ViewScripts['Views/Home']
// Example: ./src/Views/Home/module-a.export.ts -> Views/Home/module-a.js -> window.ViewScripts['Views/Home/module-a']
const entry = {};
(function searchEntry(dir) {
  const files = fs.readdirSync(dir).map((fileName) => path.join(dir, fileName));

  files.forEach((file) => {
    const stat = fs.statSync(file);
    if (stat.isDirectory()) {
      return searchEntry(file);
    }

    if (!stat.isFile()) return;

    const ext = path.extname(file);
    if (ext !== '.ts') return;

    const baseName = path.basename(file, ext);

    if (!baseName.endsWith('.export')) return;

    const dirName = path.relative(pathConfig.src, path.dirname(file));
    const entryName = path.basename(baseName, '.export');
    const key = path.join(dirName, entryName === '_' ? '' : entryName).replace(/\\/g, '/');

    entry[key] = file;
  });
})(pathConfig.src);

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  watch: true,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  entry: entry,
  output: {
    library: ['ViewScripts', '[name]'],
    filename: '[name].js',
    path: path.resolve(__dirname, '../Project/wwwroot/js'),
    clean: true,
  },
};
