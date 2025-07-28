const isProd = process.env.NODE_ENV === 'production'

module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				targets: {
					browsers: [
						'>0.5%',
						'not dead',
						'not ie 11',
						'not op_mini all',
					],
				},
			},
		],
		'@babel/preset-typescript',
		[
			'@babel/preset-react',
			{
				runtime: 'automatic',
				importSource: '@emotion/react',
			},
		],
	],
	plugins: [
		'@emotion/babel-plugin',
		!isProd && 'react-refresh/babel',
	].filter(Boolean),
}
