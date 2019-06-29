/*eslint no-undef: ["error", { "process": true }] */
const path = require('path');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');

module.exports = Merge(CommonConfig, {
  plugins: [],
  devServer: {
    publicPath: '/',
    port: 4000,
    contentBase: path.join(process.cwd(), 'dist'), // static file location
    host: '0.0.0.0',
    historyApiFallback: { index: '/' },
    noInfo: false,
    compress: false,
    stats: 'minimal',
  },
});
