const path = require('path')
const config = require('./webpack.config.js')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const PORT = 3002

// update config
config.mode = 'development'
config.devtool = 'source-map'
config.plugins.push(new webpack.HotModuleReplacementPlugin())

const compiler = webpack(config)

const server = new WebpackDevServer(
	{
		static: {
			directory: path.resolve(__dirname, 'docs'),
			publicPath: '/',
		},
		devMiddleware: {
			publicPath: '/build/',
		},
		hot: true,
		host: '0.0.0.0',
		port: PORT,
		client: {
			logging: 'warn',
		},
	},
	compiler
)

server.start().then(() => {
	console.log(`Dev server listening on http://localhost:${PORT}`)
}).catch(err => {
	console.error('ERROR ::', err)
})
