module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2019,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
		useJSXTextNode: true,
	},
	env: {
		es6: true,
		node: true,
		jest: true,
	},
	settings: {
		react: {
			version: 'detect',
		},
		'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts', '.tsx'],
		},
	},
	plugins: [
		'react',
		'react-hooks',
		'@typescript-eslint',
		'prettier',
		'@emotion',
	],
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
	],
	globals: {
		document: true,
		window: true,
		Promise: true,
	},
	rules: {
		// JS
		curly: ['error', 'multi-line'],
		eqeqeq: ['warn', 'smart'],
		'no-eval': 'error',
		'no-var': 'warn',
		'no-use-before-define': 'off',
		'no-trailing-spaces': 'warn',
		'keyword-spacing': ['warn', { before: true, after: true }],
		'space-before-function-paren': ['warn', { anonymous: 'never', named: 'never', asyncArrow: 'ignore' }],
		'space-in-parens': ['warn', 'never'],
		'linebreak-style': 'off',
		'object-shorthand': ['error', 'properties'],
		quotes: ['warn', 'single', { allowTemplateLiterals: true }],

		// TypeScript
		'@typescript-eslint/no-unused-vars': 'off',
		'@typescript-eslint/explicit-member-accessibility': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-var-requires': 'off',
		'@typescript-eslint/no-use-before-define': ['error', { functions: false }],
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/no-empty-function': 'off',
		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/camelcase': 'off',

		// React
		'react/react-in-jsx-scope': 'off',
		'react/prop-types': 'off',
		'react/no-array-index-key': 'warn',
		'react/jsx-curly-brace-presence': 'warn',
		'react/no-typos': 'warn',
		'react/self-closing-comp': ['warn', { component: true, html: true }],
		'react/display-name': 'off',

		// React Hooks
		'react-hooks/rules-of-hooks': 'warn',
		'react-hooks/exhaustive-deps': 'warn',

		// Prettier
		'prettier/prettier': [
			'error',
			{
				arrowParens: 'avoid',
				bracketSpacing: true,
				printWidth: 90,
				proseWrap: 'preserve',
				requirePragma: false,
				semi: false,
				singleQuote: true,
				tabWidth: 4,
				trailingComma: 'all',
				useTabs: true,
			},
			{ usePrettierrc: false },
		],
	},
	ignorePatterns: ['z_*', 'z_*/'],
}
