const { resolve } = require('path')
const webpack = require('webpack')

global.appRoot = resolve(__dirname, '../')

module.exports = {
	entry: './docs/js/index.tsx',
	output: {
		path: resolve(global.appRoot, './docs/build'),
		filename: 'bundle.js',
		publicPath: '/build/',
	},

	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
		alias: {
			'@tk': resolve(global.appRoot, './src/index.ts'),
			'react-dom': '@hot-loader/react-dom', // если используется hot-loader
		},
	},

	module: {
		rules: [
			{
				test: /\.(j|t)sx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						cacheDirectory: true,
					},
				},
			},
			{
				test: /\.(s?)css$/,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [
									require('autoprefixer')(),
								],
							},
						},
					},
					'sass-loader',
				],
			},
		],
	},

	plugins: [
		new webpack.DefinePlugin({
			__DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
		}),
	],
}
