/*eslint no-undef: ["error", { "process": true }] */
const pkg = require('../package.json');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FlowWebpackPlugin = require('flow-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

const extractSass = new ExtractTextPlugin({
	filename: '[name].[contenthash].css'
});

module.exports = {

	context: path.join(process.cwd(), 'src'), //the home directory for webpack

	devtool: 'source-map', // enhance debugging by adding meta info for the browser devtools

	entry: {
		app: './index.js'
	},

	output: {
		path: path.join(process.cwd(), 'dist'),
		filename: '[name].[hash].js',
		publicPath: '/',
		sourceMapFilename: '[name].[hash].js.map'
	},

	resolve: {
		extensions: ['.js'],  // extensions that are used
		modules: [path.join(process.cwd(), 'src'), 'node_modules'] // directories where to look for modules
	},

	module: {
		rules: [{
			enforce: 'pre', //to check source files, not modified by other loaders (like babel-loader)
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'eslint-loader'
		}, {
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
			
		}, 
		{ test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
		{ test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
		{
			test: /\.(css|scss)$/,
			use: extractSass.extract({
				use: [{
					loader: 'css-loader',
					options: {
						sourceMap: true
					}
				}, {
					loader: 'sass-loader',
					options: {
						sourceMap: true
					}
				}]
			})
		}
		]
	},
	plugins: [
		new CleanWebpackPlugin(['dist'], { root: process.cwd() }),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor'
		}),
		new HtmlWebpackPlugin({
			title: pkg.title,
			template: 'index.html',
			minify: {
				removeComments: true,
				collapseWhitespace: true
			}
		}),
		extractSass,
		new FlowWebpackPlugin({
			printFlowOutput: true,
			flowPath: require.main.require('flow-bin'),
			flowArgs: ['--color=always'],
		}),
		new FaviconsWebpackPlugin({
			logo: path.resolve('src/assets/textwallpaper-large-icon.jpg'),
			inject: true,
			prefix: 'icons/[hash]-',
			persistentCache: false,
			background: '#2D2D2D',
			icons: {
				appleStartup: true,
				favicons: true,

				appleIcon: false,
				android: false,
				coast: false,
				firefox: false,
				opengraph: false,
				twitter: false,
				yandex: false,
				windows: false
			}
		}),
		new WebpackPwaManifest({
			name: pkg.name,
			short_name: 'TEXT WPR',
			description: pkg.description,
			orientation: "portrait",
			theme_color: '#2D2D2D',
			background_color: '#2D2D2D',
			crossorigin: null,
			display: "standalone",
			start_url: ".",
			inject: true,
			fingerprints: true,
			publicPath: null,
			includeDirectory: true,
			ios: {
				'apple-mobile-web-app-title': 'TEXT WPR',
				'apple-mobile-web-app-status-bar-style': 'black'
			},
			icons: [
				{
					src: path.resolve('src/assets/textwallpaper-large-icon.jpg'),
					sizes: [1024, 120, 128, 152, 167, 180, 192, 256, 384, 512, 96], 
					destination: path.join('icons', 'ios'),
					ios: true
				},
				{
					src: path.resolve('src/assets/textwallpaper-large-icon.jpg'),
					sizes: [36, 48, 72, 96, 144, 192, 512, 1024],
					destination: path.join('icons', 'android')
				}
			],
		}),
		new OfflinePlugin()
	],
};
