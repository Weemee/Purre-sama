const DEBUG = false;
const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const sass = require('node-sass');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
	mode: 'production',
	bail: true,
	devtool: DEBUG ? 'cheap-module-eval-source-map' : false,

	/* OLD */
	entry: ['babel-polyfill', './engine/index.js', './engine/styles/merged.scss'],

	/* NEW */

	/*
	entry: {
		main: './engine/index.js',
		vendor: ['babel-polyfill', 'react', 'react-dom'],
	},*/

	output: {
		path: path.resolve(__dirname, 'distribution'),
		publicPath: './',
		filename: '[name].js',
		//filename: '[name].[contenthash:8].js',
		//chunkFilename: '[name].[contenthash:8].chunk.js',
	},

	optimization: {
		minimize: !DEBUG,
		// Automatically split vendor and commons
		// https://twitter.com/wSokra/status/969633336732905474
		// https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366

		splitChunks: {
			chunks: 'all',
		},

		// Keep the runtime chunk seperated to enable long term caching
		// https://twitter.com/wSokra/status/969679223278505985
		runtimeChunk: true,
	},

	resolve: {
		extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx', '.ts', '.tsx'],
		alias: {
			react: path.resolve(__dirname, './node_modules/react'),
			React: path.resolve(__dirname, './node_modules/react'),
		},
	},
	performance: { hints: false },

	module: {
		strictExportPresence: true,
		rules: [
			{ parser: { requireEnsure: false } },
			{
				test: /\.jsx?$/,
				use: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.(scss|css)$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
					},
					{
						loader: 'sass-loader',
					},
				],
			},
			{
				test: /\.(png|jpe?g|gif|obj)$/i,
				use: [
					{
						loader: 'file-loader',
					},
				],
			},
			{
				test: /\.svg$/,
				use: [
					{
						loader: 'file-loader',
					},
					{
						loader: 'svgo-loader',
						options: {
							plugins: [
								{
									removeTitle: true,
								},
								{
									convertColors: {
										shortHex: false,
									},
								},
								{
									convertPathData: false,
								},
							],
						},
					},
				],
			},
		],
	},

	plugins: [
		// Clean up old data and shit
		new CleanWebpackPlugin(),
		// Generates an `index.html` file with the <script> injected.
		new HTMLWebpackPlugin({
			inject: true,
			template: 'index.html',
			minify: {
				removeComments: !DEBUG,
				collapseWhitespace: !DEBUG,
				removeRedundantAttributes: !DEBUG,
				useShortDoctype: !DEBUG,
				removeEmptyAttributes: !DEBUG,
				removeStyleLinkTypeAttributes: !DEBUG,
				keepClosingSlash: !DEBUG,
				minifyJS: !DEBUG,
				minifyCSS: !DEBUG,
				minifyURLs: !DEBUG,
			},
		}),
		new WriteFilePlugin({
			test: /\.css$/,
			useHashIndex: true,
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production'),
			},
		}),

		// Generate a service worker script that will precache, and keep up to date,
		// the HTML & assets that are part of the Webpack build.
		new SWPrecacheWebpackPlugin({
			// By default, a cache-busting query parameter is appended to requests
			// used to populate the caches, to ensure the responses are fresh.
			// If a URL is already hashed by Webpack, then there is no concern
			// about it being stale, and the cache-busting can be skipped.
			dontCacheBustUrlsMatching: /\.\w{8}\./,
			filename: 'service-worker.js',
			logger(message) {
				if (message.indexOf('Total precache size is') === 0) {
					// This message occurs for every build and is a bit too noisy.
					return;
				}
				if (message.indexOf('Skipping static resource') === 0) {
					// This message obscures real errors so we ignore it.
					// https://github.com/facebook/create-react-app/issues/2612
					return;
				}
				console.log(message);
			},
			minify: !DEBUG,
			// Don't precache sourcemaps (they're large) and build asset manifest:
			staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
			// `navigateFallback` and `navigateFallbackWhitelist` are disabled by default; see
			// https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#service-worker-considerations
			// navigateFallback: publicUrl + '/index.html',
			// navigateFallbackWhitelist: [/^(?!\/__).*/],
		}),

		new webpack.LoaderOptionsPlugin({
			debug: DEBUG,
			minimize: !DEBUG,
		}),
		//new CompressionPlugin(),
	],
	node: {
		dgram: 'empty',
		fs: 'empty',
		net: 'empty',
		tls: 'empty',
		child_process: 'empty',
	},
};
