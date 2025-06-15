import React, { useEffect, useState } from "react";

interface QuartzContentProps {
	path?: string;
}

export function QuartzContent({ path = "index.html" }: QuartzContentProps) {
	const [content, setContent] = useState<string>("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Setup global variables and environment that Quartz expects
	const setupQuartzEnvironment = async () => {
		try {
			// Define fetchData global variable that Quartz needs
			if (!(window as any).fetchData) {
				(window as any).fetchData = fetch(
					"/public/static/contentIndex.json",
				).then((data) => data.json());
			}

			// Add addCleanup function to window if it doesn't exist
			if (!(window as any).addCleanup) {
				const cleanupFunctions: (() => void)[] = [];
				(window as any).addCleanup = (fn: () => void) => {
					cleanupFunctions.push(fn);
				};
				// Store reference to cleanup functions so we can clean them up later
				(window as any).__quartzCleanup = cleanupFunctions;
			}

			// Load prescript.js now that we have DOM content
			await loadPrescript();
		} catch (err) {
			console.warn("Failed to setup Quartz environment:", err);
		}
	};

	// Load and execute prescript.js
	const loadPrescript = async () => {
		try {
			// Check if already loaded and working
			if (document.getElementById("quartz-prescript")) {
				console.log('Prescript already loaded, skipping');
				return;
			}

			const prescriptResponse = await fetch("/public/prescript.js");
			if (prescriptResponse.ok) {
				const prescriptCode = await prescriptResponse.text();
				
				// Wrap the code to ensure it runs safely
				const wrappedCode = `
					(function() {
						console.log('Attempting to run prescript...');
						try {
							${prescriptCode}
							console.log('Prescript executed successfully');
						} catch (err) {
							console.warn('Prescript execution failed:', err);
						}
					})();
				`;
				
				const prescriptScript = document.createElement("script");
				prescriptScript.type = "application/javascript";
				prescriptScript.id = "quartz-prescript";
				prescriptScript.textContent = wrappedCode;
				document.head.appendChild(prescriptScript);
			}
		} catch (err) {
			console.warn("Failed to load prescript.js:", err);
		}
	};

	// Load and execute postscript.js
	const loadPostscript = async () => {
		try {
			// Check if already loaded and working  
			if (document.getElementById("quartz-postscript")) {
				console.log('Postscript already loaded, skipping');
				return;
			}

			const postscriptResponse = await fetch("/public/postscript.js");
			if (postscriptResponse.ok) {
				const postscriptCode = await postscriptResponse.text();
				
				// Wrap the code to handle missing document properties and ensure elements exist
				const wrappedCode = `
					(function() {
						// Set up document properties that Quartz expects
						if (!document.currentScript) {
							// Create a mock currentScript object
							Object.defineProperty(document, 'currentScript', {
								value: { src: window.location.href },
								writable: false,
								configurable: true
							});
						}
						
						// Mock document.body.dataset.slug if needed
						if (!document.body.dataset.slug) {
							document.body.dataset.slug = 'index';
						}
						
						console.log('Attempting to run postscript...');
						try {
							${postscriptCode}
							console.log('Postscript executed successfully');
						} catch (err) {
							console.warn('Postscript execution failed:', err);
						}
					})();
				`;
				
				const postscriptScript = document.createElement("script");
				postscriptScript.type = "module";
				postscriptScript.id = "quartz-postscript";
				postscriptScript.textContent = wrappedCode;
				document.head.appendChild(postscriptScript);

				// Dispatch nav event to trigger Quartz's initialization
				setTimeout(() => {
					const navEvent = new CustomEvent("nav");
					document.dispatchEvent(navEvent);
				}, 50);
			}
		} catch (err) {
			console.warn("Failed to load postscript.js:", err);
		}
	};

	const updateLiveFrame = () => {
		// Update the live content frame in the canvas if it exists
		const attemptUpdate = () => {
			const liveFrame = document.querySelector("#live-website-frame");
			const currentContent = document.querySelector(".quartz-embedded");

			console.log(
				"Attempting to update live frame:",
				!!liveFrame,
				!!currentContent,
			);

			if (liveFrame && currentContent) {
				console.log(
					"Updating live frame with new content, length:",
					currentContent.outerHTML.length,
				);
				liveFrame.innerHTML = currentContent.outerHTML;
				return true;
			}
			return false;
		};

		// Try immediately
		if (!attemptUpdate()) {
			// If not successful, try again after a delay
			setTimeout(() => {
				attemptUpdate();
			}, 500);
		}
	};

	useEffect(() => {
		const fetchContent = async () => {
			try {
				setLoading(true);
				setError(null);

				console.log("Fetching Quartz content from:", `/public/${path}`);

				// Fetch the HTML file from the public directory (Quartz generated)
				const response = await fetch(`/public/${path}`);

				console.log("Response status:", response.status);

				if (!response.ok) {
					throw new Error(
						`Failed to load content: ${response.status} ${response.statusText}`,
					);
				}

				const html = await response.text();
				console.log("HTML length:", html.length);

				// Parse the HTML and extract the entire body content to preserve Quartz styling
				const parser = new DOMParser();
				const doc = parser.parseFromString(html, "text/html");

				// Get the complete quartz structure
				const quartzRoot = doc.querySelector("#quartz-root");
				console.log("Found quartz-root:", !!quartzRoot);

				let contentHtml = "";
				if (quartzRoot) {
					contentHtml = quartzRoot.outerHTML;
				} else {
					// Fallback to body if quartz-root not found
					const body = doc.querySelector("body");
					console.log("Found body:", !!body);
					if (body) {
						contentHtml = body.innerHTML;
					} else {
						console.log("Using raw HTML");
						contentHtml = html;
					}
				}

				// Fix relative paths to work with /public/ prefix
				contentHtml = contentHtml
					.replace(/href="\.\/([^"]+)"/g, 'href="/public/$1"')
					.replace(/src="\.\/([^"]+)"/g, 'src="/public/$1"')
					.replace(/fetch\("\.\/([^"]+)"\)/g, 'fetch("/public/$1")');

				setContent(contentHtml);

				// Initial load complete - setup Quartz environment and load scripts
				setTimeout(() => {
					const loadInitialScripts = async () => {
						await setupQuartzEnvironment();
						await loadPostscript();
					};
					loadInitialScripts().catch(err => console.warn('Error loading initial scripts:', err));
				}, 50);
			} catch (err) {
				console.error("Error loading Quartz content:", err);
				setError(err instanceof Error ? err.message : "Unknown error occurred");
			} finally {
				setLoading(false);
			}
		};

		fetchContent();
	}, [path]);

	useEffect(() => {
		// Load CSS
		const link = document.createElement("link");
		link.rel = "stylesheet";
		link.href = "/public/index.css";
		link.type = "text/css";
		link.id = "quartz-styles";
		document.head.appendChild(link);

		return () => {
			const existingLink = document.getElementById("quartz-styles");
			if (existingLink) {
				document.head.removeChild(existingLink);
			}
			const existingPrescript = document.getElementById("quartz-prescript");
			if (existingPrescript) {
				document.head.removeChild(existingPrescript);
			}
			const existingPostscript = document.getElementById("quartz-postscript");
			if (existingPostscript) {
				document.head.removeChild(existingPostscript);
			}
		};
	}, []);

	useEffect(() => {
		// Handle canvas link clicks
		const handleCanvasLinkClick = (event: CustomEvent) => {
			console.log("Canvas link click received:", event.detail.href);
			const href = event.detail.href;

			if (href && !href.startsWith("http") && !href.startsWith("mailto:")) {
				// Extract the path and load that content
				let newPath = href;

				// Handle different href formats
				if (newPath.startsWith("/public/")) {
					newPath = newPath.substring(8);
					if (!newPath.endsWith(".html")) {
						newPath = newPath + ".html";
					}
				} else if (
					newPath === "." ||
					newPath === "./" ||
					newPath === "./index"
				) {
					newPath = "index.html";
				} else if (newPath.startsWith("./")) {
					newPath = newPath.substring(2) + ".html";
				} else {
					if (newPath.startsWith("/")) {
						newPath = newPath.substring(1);
					}
					if (!newPath.endsWith(".html")) {
						newPath = newPath + ".html";
					}
				}

				console.log("Loading new page from canvas:", newPath);
				console.log("Original href was:", href);
				fetchNewContentDirect(newPath);
			}
		};

		// Handle document link clicks (for normal mode)
		const handleLinkClick = (event: Event) => {
			console.log(
				"Document click handler triggered, viewport:",
				window.innerWidth,
				"x",
				window.innerHeight,
			);
			let target = event.target as HTMLElement;

			// Walk up the DOM tree to find an anchor tag
			while (target && target.tagName !== "A" && target.parentElement) {
				target = target.parentElement;
			}

			if (target && target.tagName === "A") {
				const anchor = target as HTMLAnchorElement;
				const href = anchor.getAttribute("href");

				console.log("Link clicked:", href);

				if (href && !href.startsWith("http") && !href.startsWith("mailto:")) {
					event.preventDefault();
					event.stopPropagation();

					// Extract the path and load that content
					let newPath = href;

					// Handle different href formats
					if (newPath.startsWith("/public/")) {
						// Already has /public/ prefix, just add .html if needed
						newPath = newPath.substring(8); // Remove /public/
						if (!newPath.endsWith(".html")) {
							newPath = newPath + ".html";
						}
					} else if (
						newPath === "." ||
						newPath === "./" ||
						newPath === "./index"
					) {
						newPath = "index.html";
					} else if (newPath.startsWith("./")) {
						newPath = newPath.substring(2) + ".html";
					} else {
						// Remove leading slash if present
						if (newPath.startsWith("/")) {
							newPath = newPath.substring(1);
						}
						if (!newPath.endsWith(".html")) {
							newPath = newPath + ".html";
						}
					}

					console.log("Loading new page:", newPath);
					console.log("Original href was:", href);

					// Update the path state to trigger a reload
					fetchNewContent(newPath);
				}
			}
		};

		const fetchNewContent = async (newPath: string) => {
			try {
				setLoading(true);
				setError(null);

				console.log("Fetching new content from:", `/public/${newPath}`);

				const response = await fetch(`/public/${newPath}`);

				if (!response.ok) {
					throw new Error(
						`Failed to load content: ${response.status} ${response.statusText}`,
					);
				}

				const html = await response.text();
				const parser = new DOMParser();
				const doc = parser.parseFromString(html, "text/html");

				const quartzRoot = doc.querySelector("#quartz-root");
				let contentHtml = "";

				if (quartzRoot) {
					contentHtml = quartzRoot.outerHTML;
				} else {
					const body = doc.querySelector("body");
					if (body) {
						contentHtml = body.innerHTML;
					} else {
						contentHtml = html;
					}
				}

				// Fix relative paths
				contentHtml = contentHtml
					.replace(/href="\.\/([^"]+)"/g, 'href="/public/$1"')
					.replace(/src="\.\/([^"]+)"/g, 'src="/public/$1"')
					.replace(/fetch\("\.\/([^"]+)"\)/g, 'fetch("/public/$1")');

				setContent(contentHtml);

				// Notify canvas that content has updated and reload postscript
				setTimeout(() => {
					const reloadScripts = async () => {
						await setupQuartzEnvironment();
						await loadPostscript();
						window.dispatchEvent(new CustomEvent("quartzContentUpdated"));
					};
					reloadScripts().catch(err => console.warn('Error reloading scripts:', err));
				}, 50);
			} catch (err) {
				console.error("Error loading new content:", err);
				setError(err instanceof Error ? err.message : "Unknown error occurred");
			} finally {
				setLoading(false);
			}
		};

		// Attach event listeners
		const attachLinkHandlers = () => {
			// Remove any existing listeners first
			document.removeEventListener("click", handleLinkClick);
			window.removeEventListener(
				"canvasLinkClick",
				handleCanvasLinkClick as EventListener,
			);

			// Add new listeners
			document.addEventListener("click", handleLinkClick, true); // Use capture phase
			window.addEventListener(
				"canvasLinkClick",
				handleCanvasLinkClick as EventListener,
			);
		};

		// Load postscript.js and attach handlers after content loads
		let timeoutId: NodeJS.Timeout | null = null;
		
		if (content) {
			const loadScriptsAndHandlers = async () => {
				try {
					await setupQuartzEnvironment();
					await loadPostscript();
					attachLinkHandlers();
				} catch (err) {
					console.warn('Error loading scripts and handlers:', err);
				}
			};
			
			timeoutId = setTimeout(() => {
				loadScriptsAndHandlers();
			}, 50);
		}

		return () => {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
			document.removeEventListener("click", handleLinkClick, true);
			window.removeEventListener(
				"canvasLinkClick",
				handleCanvasLinkClick as EventListener,
			);
		};
	}, [content]); // Re-attach when content changes

	console.log(
		"QuartzContent render - loading:",
		loading,
		"error:",
		error,
		"content length:",
		content.length,
	);

	if (loading) {
		return (
			<div style={{ padding: "20px", fontSize: "18px" }}>
				Loading Quartz content...
			</div>
		);
	}

	if (error) {
		return (
			<div style={{ padding: "20px", color: "red", fontSize: "18px" }}>
				Error loading Quartz: {error}
			</div>
		);
	}

	if (!content) {
		return (
			<div style={{ padding: "20px", color: "orange", fontSize: "18px" }}>
				No content loaded
			</div>
		);
	}

	const handleDirectClick = (event: React.MouseEvent) => {
		console.log(
			"Direct click detected:",
			event.target,
			"viewport:",
			window.innerWidth,
			"x",
			window.innerHeight,
		);
		let target = event.target as HTMLElement;

		// Walk up the DOM tree to find an anchor tag
		while (target && target.tagName !== "A" && target.parentElement) {
			target = target.parentElement;
		}

		if (target && target.tagName === "A") {
			const anchor = target as HTMLAnchorElement;
			const href = anchor.getAttribute("href");

			console.log("Link clicked via direct handler:", href);

			if (href && !href.startsWith("http") && !href.startsWith("mailto:")) {
				event.preventDefault();
				event.stopPropagation();

				// Extract the path and load that content
				let newPath = href;

				// Handle different href formats
				if (newPath.startsWith("/public/")) {
					// Already has /public/ prefix, just add .html if needed
					newPath = newPath.substring(8); // Remove /public/
					if (!newPath.endsWith(".html")) {
						newPath = newPath + ".html";
					}
				} else if (
					newPath === "." ||
					newPath === "./" ||
					newPath === "./index"
				) {
					newPath = "index.html";
				} else if (newPath.startsWith("./")) {
					newPath = newPath.substring(2) + ".html";
				} else {
					// Remove leading slash if present
					if (newPath.startsWith("/")) {
						newPath = newPath.substring(1);
					}
					if (!newPath.endsWith(".html")) {
						newPath = newPath + ".html";
					}
				}

				console.log("Loading new page via direct handler:", newPath);
				console.log("Original href was:", href);

				// Call the fetch function directly
				fetchNewContentDirect(newPath);
			}
		}
	};

	const fetchNewContentDirect = async (newPath: string) => {
		try {
			setLoading(true);
			setError(null);

			console.log("Fetching new content from:", `/public/${newPath}`);

			const response = await fetch(`/public/${newPath}`);

			if (!response.ok) {
				throw new Error(
					`Failed to load content: ${response.status} ${response.statusText}`,
				);
			}

			const html = await response.text();
			const parser = new DOMParser();
			const doc = parser.parseFromString(html, "text/html");

			const quartzRoot = doc.querySelector("#quartz-root");
			let contentHtml = "";

			if (quartzRoot) {
				contentHtml = quartzRoot.outerHTML;
			} else {
				const body = doc.querySelector("body");
				if (body) {
					contentHtml = body.innerHTML;
				} else {
					contentHtml = html;
				}
			}

			// Fix relative paths
			contentHtml = contentHtml
				.replace(/href="\.\/([^"]+)"/g, 'href="/public/$1"')
				.replace(/src="\.\/([^"]+)"/g, 'src="/public/$1"')
				.replace(/fetch\("\.\/([^"]+)"\)/g, 'fetch("/public/$1")');

			setContent(contentHtml);

			// Notify canvas that content has updated and reload postscript
			setTimeout(() => {
				const reloadScripts = async () => {
					await setupQuartzEnvironment();
					await loadPostscript();
					window.dispatchEvent(new CustomEvent("quartzContentUpdated"));
				};
				reloadScripts().catch(err => console.warn('Error reloading scripts:', err));
			}, 100);
		} catch (err) {
			console.error("Error loading new content:", err);
			setError(err instanceof Error ? err.message : "Unknown error occurred");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div
			dangerouslySetInnerHTML={{ __html: content }}
			className="quartz-embedded"
			onClick={handleDirectClick}
			style={{
				width: "100%",
				height: "100vh",
				overflow: "auto",
			}}
		/>
	);
}
