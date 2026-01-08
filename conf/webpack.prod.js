const pkg = require('../package.json');
const path = require('path');
const webpack = require('webpack');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
const WebpackPwaManifest = require('webpack-pwa-manifest');

module.exports = Merge(CommonConfig, {
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true,
      },
      compress: {
        screw_ie8: true,
      },
      comments: false,
    }),
    new WebpackPwaManifest({
      name: pkg.name,
      short_name: 'TEXT WPR',
      description: pkg.description,
      orientation: 'portrait',
      theme_color: '#2D2D2D',
      background_color: '#2D2D2D',
      crossorigin: null,
      display: 'standalone',
      start_url: '.',
      inject: true,
      fingerprints: false,
      publicPath: null,
      includeDirectory: true,
      ios: {
        'apple-mobile-web-app-title': 'TEXT WPR',
        'apple-mobile-web-app-status-bar-style': 'black',
      },
      icons: [
        {
          src: path.resolve('src/assets/textwallpaper-large-icon.jpg'),
          sizes: [1024, 120, 128, 152, 167, 180, 192, 256, 384, 512, 96],
          destination: path.join('icons', 'ios'),
          ios: true,
        },
        {
          src: path.resolve('src/assets/textwallpaper-large-icon.jpg'),
          sizes: [36, 48, 72, 96, 144, 192, 512, 1024],
          destination: path.join('icons', 'android'),
        },
        {
          src: path.resolve('src/assets/textwallpaper-large-icon.jpg'),
          sizes: [512],
          destination: path.join('icons', 'og'),
        },
      ],
    }),
  ],
});
