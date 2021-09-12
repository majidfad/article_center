module.exports = {
	root: true,
	env: {
		browser: true,
		node: true
	},
	parserOptions: {
		ecmaFeatures: {
			legacyDecorators: true
		}
	},
	extends: [
		// 'eslint:recommended',
		// https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
		// consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
		'prettier',
		'prettier/vue',
		'@nuxtjs',
		'plugin:nuxt/recommended',
		'@nuxtjs/eslint-config-typescript'
	],
	// required to lint *.vue files
	plugins: ['vue'],
	// add your custom rules here
	rules: {
		indent: ['error', 'tab', { SwitchCase: 1 }],
		'no-tabs': 0,
		'vue/html-indent': ['error', 'tab'],
		semi: ['error', 'always'],
		'no-console': 'off',
		'vue/no-v-html': 'off'
	}
};
