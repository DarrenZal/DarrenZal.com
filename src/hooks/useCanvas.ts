import { useEffect, useState } from "react";

interface ElementInfo {
	tagName: string;
	x: number;
	y: number;
	w: number;
	h: number;
	html: string;
}

export function useCanvas() {
	const [isCanvasEnabled, setIsCanvasEnabled] = useState(false);
	const [elementsInfo, setElementsInfo] = useState<ElementInfo[]>([]);

	useEffect(() => {
		const toggleCanvas = async () => {
			if (!isCanvasEnabled) {
				const info = await gatherElementsInfo();
				setElementsInfo(info);
				setIsCanvasEnabled(true);
				document.body.classList.add("canvas-mode");
			} else {
				setElementsInfo([]);
				setIsCanvasEnabled(false);
				document.body.classList.remove("canvas-mode");
			}
		};

		const updateCanvasContent = async () => {
			if (isCanvasEnabled) {
				console.log("Updating canvas content due to content change");
				// Re-gather elements when content changes to get fresh HTML
				const info = await gatherElementsInfo();
				setElementsInfo(info);
			}
		};

		window.addEventListener("toggleCanvasEvent", toggleCanvas);
		window.addEventListener("quartzContentUpdated", updateCanvasContent);

		return () => {
			window.removeEventListener("toggleCanvasEvent", toggleCanvas);
			window.removeEventListener("quartzContentUpdated", updateCanvasContent);
		};
	}, [isCanvasEnabled]);

	return { isCanvasEnabled, elementsInfo };
}

async function gatherElementsInfo() {
	// Instead of decomposing the site, create a single interactive frame containing the entire website
	const container =
		document.querySelector(".quartz-embedded") ||
		document.querySelector("#quartz-root");

	const info: any[] = [];

	if (container) {
		const rect = container.getBoundingClientRect();

		console.log(
			"Gathering elements - container found, rect:",
			rect.width,
			"x",
			rect.height,
		);
		console.log(
			"Viewport dimensions:",
			window.innerWidth,
			"x",
			window.innerHeight,
		);

		// Use a reasonable maximum width to prevent canvas issues with very wide layouts
		const maxWidth = Math.min(1400, window.innerWidth * 0.9);
		const maxHeight = Math.min(1000, window.innerHeight * 0.9);

		const shapeWidth = Math.min(Math.max(1200, rect.width), maxWidth);
		const shapeHeight = Math.min(Math.max(800, rect.height), maxHeight);

		console.log(
			"Creating canvas shape with dimensions:",
			shapeWidth,
			"x",
			shapeHeight,
		);

		// Create a single shape that contains the actual content directly
		info.push({
			tagName: "WEBSITE",
			x: 100, // Position in canvas space
			y: 100,
			w: shapeWidth,
			h: shapeHeight,
			html: `<div class="website-frame" style="width: 100%; height: 100%; overflow: auto; background: white; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); pointer-events: auto;">
        ${container.outerHTML}
      </div>`,
			isInteractive: true, // Flag to indicate this should remain interactive
		});
	}

	return info;
}

function measureElementTextWidth(element: HTMLElement) {
	// Create a temporary span element
	const tempElement = document.createElement("span");
	// Get the text content from the passed element
	tempElement.textContent = element.textContent || element.innerText;
	// Get the computed style of the passed element
	const computedStyle = window.getComputedStyle(element);
	// Apply relevant styles to the temporary element
	tempElement.style.font = computedStyle.font;
	tempElement.style.fontWeight = computedStyle.fontWeight;
	tempElement.style.fontSize = computedStyle.fontSize;
	tempElement.style.fontFamily = computedStyle.fontFamily;
	tempElement.style.letterSpacing = computedStyle.letterSpacing;
	// Ensure the temporary element is not visible in the viewport
	tempElement.style.position = "absolute";
	tempElement.style.visibility = "hidden";
	tempElement.style.whiteSpace = "nowrap"; // Prevent text from wrapping
	// Append to the body to make measurements possible
	document.body.appendChild(tempElement);
	// Measure the width
	const width = tempElement.getBoundingClientRect().width;
	// Remove the temporary element from the document
	document.body.removeChild(tempElement);
	// Return the measured width
	return width === 0 ? 10 : width;
}
