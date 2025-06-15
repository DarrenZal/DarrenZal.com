import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import topLevelAwait from "vite-plugin-top-level-await";
import wasm from "vite-plugin-wasm";
import { markdownPlugin } from "./build/markdownPlugin";

export default defineConfig({
	plugins: [
		react(),
		wasm(),
		topLevelAwait(),
		markdownPlugin,
		viteStaticCopy({
			targets: [
				{
					src: "src/posts/",
					dest: ".",
				},
				{
					src: "public/",
					dest: "public",
				},
			],
		}),
	],
	build: {
		sourcemap: true,
	},
	base: "/",
	publicDir: false,
	resolve: {
		alias: {
			"@": "/src",
		},
	},
});
