// Imports
const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
require("babel-register");
const webpack = require("webpack");
// Webpack Configuration
const config = {
	// Entry
	entry: {
		main: ["babel-polyfill", "./src/index.js"],
		game: ["babel-polyfill", "./src/game.js"],
		fight: ["babel-polyfill", "./src/fight.js"]
	},
	// Output
	output: {
		path: path.resolve(__dirname, "./dist"),
		filename: "[name].js"
	},
	// Loaders
	module: {
		rules: [
			// JavaScript/JSX Files
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ["babel-loader"]
			},
			// CSS Files
			{
				test: /\.s[ac]ss$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							hmr: process.env.NODE_ENV === "development"
						}
					},
					"css-loader",
					//"postcss-loader",
					"sass-loader"
					/* // Creates `style` nodes from JS strings
					"style-loader",
					// Translates CSS into CommonJS
					"css-loader",
					// Compiles Sass to CSS
					"sass-loader" */
				]
			},
			// images
			{
				test: /\.(png|svg|jpg|gif|ttf|TTF)$/,
				use: ["file-loader"]
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: "html-loader",
						options: {
							minimize: true
						}
					}
				]
			}
		]
	},
	// Plugins
	plugins: [
		new MiniCssExtractPlugin(),
		new htmlWebpackPlugin({
			template: "./public/index.html",
			chunks: ["main"],
			filename: "index.html",
			hash: true
		}),
		new htmlWebpackPlugin({
			template: "./public/regles.html",
			chunks: ["main"],
			filename: "regles.html"
		}),
		new htmlWebpackPlugin({
			template: "./public/dev.html",
			chunks: ["main"],
			filename: "dev.html"
		}),
		new htmlWebpackPlugin({
			template: "./public/game.html",
			chunks: ["game"],
			filename: "game.html",
			hash: true
		}),
		new htmlWebpackPlugin({
			template: "./public/fight.html",
			chunks: ["fight"],
			filename: "fight.html",
			hash: true
		}),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery"
		})
	],
	resolve: {
		modules: [path.resolve("./src"), path.resolve("./node_modules")]
	},
	devServer: {
		contentBase: path.resolve(__dirname, "./public"),
		compress: true,
		port: 9000,
		open: true,
		stats: {
			assets: false,
			children: false,
			chunks: false,
			chunkModules: false,
			colors: true,
			entrypoints: false,
			hash: false,
			modules: false,
			timings: false,
			version: false
		}
	},
	// OPTIONAL
	// Reload On File Change
	watch: true,
	// Development Tools (Map Errors To Source File)
	devtool: "source-map"
};
// Exports
module.exports = config;
