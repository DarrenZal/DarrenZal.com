import { PageLayout, SharedLayout } from "./quartz/cfg";
import * as Component from "./quartz/components";

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
	head: Component.Head(),
	header: [],
	afterBody: [],
	footer: Component.Footer({
		links: {
			GitHub: "https://github.com/jackyzha0/quartz",
			"Discord Community": "https://discord.gg/cRFFHYye7t",
		},
	}),
};

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
	beforeBody: [
		Component.Breadcrumbs(),
		Component.ArticleTitle(),
		Component.ContentMeta(),
		Component.TagList(),
	],
	left: [
		Component.PageTitle(),
		Component.MobileOnly(Component.Spacer()),
		Component.Search(),
		Component.Darkmode(),
		Component.DesktopOnly(
			Component.Explorer({
				sortFn: (a, b) => {
					// Sort by creation date, descending (newest first)
					// Files with invalid or missing dates are sorted to the end.
					const getValidTime = (dateVal: Date | undefined) => {
						// Check if it's a Date object and not "Invalid Date"
						if (dateVal instanceof Date && !isNaN(dateVal.getTime())) {
							return dateVal.getTime();
						}
						return null;
					};

					const timeA = getValidTime(a.file?.dates?.created);
					const timeB = getValidTime(b.file?.dates?.created);

					if (timeA === null && timeB === null) {
						// Both dates are invalid/missing, fall back to alphabetical sort by name
						const nameA = a.name.toLowerCase();
						const nameB = b.name.toLowerCase();
						if (nameA < nameB) return -1;
						if (nameA > nameB) return 1;
						return 0;
					} else if (timeA === null) {
						return 1; // a (invalid/missing date) comes after b (valid date) -> for descending, null is "smaller"
					} else if (timeB === null) {
						return -1; // b (invalid/missing date) comes after a (valid date) -> for descending, null is "smaller"
					}

					// Both dates are valid, sort by time in descending order
					return timeB - timeA;
				},
			}),
		),
	],
	right: [
		Component.Graph(),
		Component.DesktopOnly(Component.TableOfContents()),
		Component.Backlinks(),
	],
};

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
	beforeBody: [
		Component.Breadcrumbs(),
		Component.ArticleTitle(),
		Component.ContentMeta(),
	],
	left: [
		Component.PageTitle(),
		Component.MobileOnly(Component.Spacer()),
		Component.Search(),
		Component.Darkmode(),
		Component.DesktopOnly(
			Component.Explorer({
				sortFn: (a, b) => {
					// Sort by creation date, descending (newest first)
					// Files with invalid or missing dates are sorted to the end.
					const getValidTime = (dateVal: Date | undefined) => {
						// Check if it's a Date object and not "Invalid Date"
						if (dateVal instanceof Date && !isNaN(dateVal.getTime())) {
							return dateVal.getTime();
						}
						return null;
					};

					const timeA = getValidTime(a.file?.dates?.created);
					const timeB = getValidTime(b.file?.dates?.created);

					if (timeA === null && timeB === null) {
						// Both dates are invalid/missing, fall back to alphabetical sort by name
						const nameA = a.name.toLowerCase();
						const nameB = b.name.toLowerCase();
						if (nameA < nameB) return -1;
						if (nameA > nameB) return 1;
						return 0;
					} else if (timeA === null) {
						return 1; // a (invalid/missing date) comes after b (valid date) -> for descending, null is "smaller"
					} else if (timeB === null) {
						return -1; // b (invalid/missing date) comes after a (valid date) -> for descending, null is "smaller"
					}

					// Both dates are valid, sort by time in descending order
					return timeB - timeA;
				},
			}),
		),
	],
	right: [],
};
