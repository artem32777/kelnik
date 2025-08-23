export default defineNuxtConfig({

	modules: [
		'@nuxt/image',
		'@pinia/nuxt',
		'pinia-plugin-persistedstate/nuxt',
		'@nuxt/eslint',
		'@nuxt/icon',
	],

	pages: {
		pattern: ['**/*.vue', '!**/_components/**'],
	},
	components: [
		'~/components', {
			path: '~/pages',
			pattern: '**/_components/**',
			pathPrefix: false,
		},
	],

	devtools: { enabled: true },

	app: {
		head: {
			htmlAttrs: {
				lang: 'ru',
			},
			titleTemplate: '%s | Кельник',
			link: [
				{
					rel: 'preload',
					href: '/fonts/pt-root-ui.woff2',
					as: 'font',
					type: 'font/woff2',
					crossorigin: '',
				},
				{
					rel: 'preload',
					href: '/fonts/pt-root-ui-medium.woff2',
					as: 'font',
					type: 'font/woff2',
					crossorigin: '',
				},
				{
					rel: 'preload',
					href: '/fonts/pt-root-ui-bold.woff2',
					as: 'font',
					type: 'font/woff2',
					crossorigin: '',
				},
			],
		},
	},

	css: ['@/assets/scss/main.scss'],

	compatibilityDate: '2025-07-18',

	nitro: {
		routeRules: {
			'/**': { isr: 60 },
		},
	},
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: '@use "@/assets/scss/variables.scss" as *; @use "@/assets/scss/mixins.scss" as *;',
				},
			},
		},
	},

	eslint: {
		config: {
			typescript: true,
			stylistic: {
				indent: 'tab',
				semi: false,
				quotes: 'single',
				commaDangle: 'always-multiline',
				braceStyle: '1tbs',
			},
		},
	},

	icon: {
		provider: 'server',
		customCollections: [
			{
				prefix: 'icon',
				dir: './app/assets/icons',
			},
		],
	},
})
