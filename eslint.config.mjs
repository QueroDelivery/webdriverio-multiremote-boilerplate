import js from "@eslint/js";
import globals from "globals";
import { configs as wdioConfigs } from "eslint-plugin-wdio";

export default [
	{
		ignores: [
			"**/node_modules/**",
			"**/reports/**",
			"**/allure-results/**",
			"**/allure-report/**",
			"**/*.json",
		],
	},
	js.configs.recommended,
	wdioConfigs["flat/recommended"],
	{
		files: ["**/*.{js,mjs,cjs}"],
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "module",
			globals: {
				...globals.node,
				...globals.mocha,
			},
		},
		rules: {
			"no-console": "warn",
			"wdio/no-pause": "error",
		},
	},
];