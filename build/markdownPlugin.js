import path from "path";
import matter from "gray-matter";
import { markdownToHtml } from "./markdownToHtml";

export const markdownPlugin = {
	name: "markdown-plugin",
	enforce: "pre",
	transform(code, id) {
		if (id.endsWith(".md")) {
			const { data, content } = matter(code);
			const filename = path.basename(id, ".md");
			const html = markdownToHtml(filename, content);
			return `export const html = ${JSON.stringify(html)}; 
			export const data = ${JSON.stringify(data)};`;
		}
	},
};
