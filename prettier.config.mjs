/**
 * Some of Prettier's defaults can be overridden by an EditorConfig file. We
 * define those here to ensure that doesn't happen.
 *
 * See: https://github.com/prettier/prettier/blob/main/docs/configuration.md#editorconfig
 */
const overridableDefaults = {
	endOfLine: 'lf',
	printWidth: 120,
	tabWidth: 2,
	useTabs: true,
};

/** @type {import('prettier').Config} */
const config = {
	...overridableDefaults,
	arrowParens: 'avoid',
	bracketSameLine: false,
	bracketSpacing: true,
	jsxSingleQuote: true,
	plugins: ['prettier-plugin-tailwindcss'],
	quoteProps: 'as-needed',
	semi: true,
	singleAttributePerLine: true,
	singleQuote: true,
	trailingComma: 'es5',
	tailwindFunctions: ['cn', 'clsx', 'cx', 'tv'],
};

export default config;
