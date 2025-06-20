import { Root } from "hast";
import { i18n } from "../../i18n";
import { QuartzPluginData } from "../../plugins/vfile";
import { htmlToJsx } from "../../util/jsx";
import { FullSlug, getAllSegmentPrefixes, simplifySlug } from "../../util/path";
import { PageList, SortFn } from "../PageList";
import style from "../styles/listPage.scss";
import {
	QuartzComponent,
	QuartzComponentConstructor,
	QuartzComponentProps,
} from "../types";

interface TagContentOptions {
	sort?: SortFn;
	numPages: number;
}

const defaultOptions: TagContentOptions = {
	numPages: 10,
};

export default (((opts?: Partial<TagContentOptions>) => {
	const options: TagContentOptions = { ...defaultOptions, ...opts };

	const TagContent: QuartzComponent = (props: QuartzComponentProps) => {
		const { tree, fileData, allFiles, cfg } = props;
		const slug = fileData.slug;

		if (!(slug?.startsWith("tags/") || slug === "tags")) {
			throw new Error(
				`Component "TagContent" tried to render a non-tag page: ${slug}`,
			);
		}

		const tag = simplifySlug(slug.slice("tags/".length) as FullSlug);
		const allPagesWithTag = (tag: string) =>
			allFiles.filter((file) =>
				(file.frontmatter?.tags ?? [])
					.flatMap(getAllSegmentPrefixes)
					.includes(tag),
			);

		const content =
			(tree as Root).children.length === 0
				? fileData.description
				: htmlToJsx(fileData.filePath!, tree);
		const cssClasses: string[] = fileData.frontmatter?.cssclasses ?? [];
		const classes = ["popover-hint", ...cssClasses].join(" ");
		if (tag === "/") {
			const tags = [
				...new Set(
					allFiles
						.flatMap((data) => data.frontmatter?.tags ?? [])
						.flatMap(getAllSegmentPrefixes),
				),
			].sort((a, b) => a.localeCompare(b));
			const tagItemMap: Map<string, QuartzPluginData[]> = new Map();
			for (const tag of tags) {
				tagItemMap.set(tag, allPagesWithTag(tag));
			}
			return (
				<div class={classes}>
					<article>
						<p>{content}</p>
					</article>
					<p>
						{i18n(cfg.locale).pages.tagContent.totalTags({
							count: tags.length,
						})}
					</p>
					<div>
						{tags.map((tag) => {
							const pages = tagItemMap.get(tag)!;
							const listProps = {
								...props,
								allFiles: pages,
							};

							const contentPage = allFiles
								.filter((file) => file.slug === `tags/${tag}`)
								.at(0);

							const root = contentPage?.htmlAst;
							const content =
								!root || root?.children.length === 0
									? contentPage?.description
									: htmlToJsx(contentPage.filePath!, root);

							return (
								<div>
									<h2>
										<a class="internal tag-link" href={`../tags/${tag}`}>
											{tag}
										</a>
									</h2>
									{content && <p>{content}</p>}
									<div class="page-listing">
										<p>
											{i18n(cfg.locale).pages.tagContent.itemsUnderTag({
												count: pages.length,
											})}
											{pages.length > options.numPages && (
												<>
													{" "}
													<span>
														{i18n(cfg.locale).pages.tagContent.showingFirst({
															count: options.numPages,
														})}
													</span>
												</>
											)}
										</p>
										<PageList
											limit={options.numPages}
											{...listProps}
											sort={opts?.sort}
										/>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			);
		} else {
			const pages = allPagesWithTag(tag);
			const listProps = {
				...props,
				allFiles: pages,
			};

			return (
				<div class={classes}>
					<article>{content}</article>
					<div class="page-listing">
						<p>
							{i18n(cfg.locale).pages.tagContent.itemsUnderTag({
								count: pages.length,
							})}
						</p>
						<div>
							<PageList {...listProps} />
						</div>
					</div>
				</div>
			);
		}
	};

	TagContent.css = style + PageList.css;
	return TagContent;
}) satisfies QuartzComponentConstructor);
