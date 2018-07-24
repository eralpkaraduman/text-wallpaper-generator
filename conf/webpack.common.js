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
			logo: path.resolve('src/assets/textwallpaper-large-icon.png'),
			inject: true,
			background_color: '#f1c40f',
		}),
		new WebpackPwaManifest({
			name: pkg.name,
			short_name: 'TXTWLPR',
			orientation: "portrait",
			display: "standalone",
			start_url: ".",
			ios: true,
			inject: true,
			description: pkg.description,
			background_color: '#2c3e50',
			icons: [
				{
					src: path.resolve('src/assets/textwallpaper-large-icon.png'),
					sizes: [96, 128, 192, 256, 384, 512]
				},
				{
					src: path.resolve('src/assets/textwallpaper-large-icon.png'),
					size: '1024x1024'
				}
			]
		}),
		new OfflinePlugin()
	],
};
