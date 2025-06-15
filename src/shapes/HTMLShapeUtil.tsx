import {
	Rectangle2d,
	TLBaseShape,
	TLOnBeforeUpdateHandler,
	TLOnResizeHandler,
	resizeBox,
} from "@tldraw/tldraw";
import React from "react";
import { ShapeUtil } from "tldraw";

export type HTMLShape = TLBaseShape<
	"html",
	{ w: number; h: number; html: string }
>;

export class HTMLShapeUtil extends ShapeUtil<HTMLShape> {
	static override type = "html" as const;
	override canBind = () => true;
	override canEdit = () => false;
	override canResize = () => true;
	override isAspectRatioLocked = () => false;
	override canUnmount = () => false;

	getDefaultProps(): HTMLShape["props"] {
		return {
			w: 100,
			h: 100,
			html: "<div></div>",
		};
	}

	override onTranslate: TLOnBeforeUpdateHandler<HTMLShape> = (prev, next) => {
		if (prev.x !== next.x || prev.y !== next.y) {
			this.editor.bringToFront([next.id]);
		}
	};

	override onResize: TLOnResizeHandler<HTMLShape> = (
		shape: HTMLShape,
		info,
	) => {
		const element = document.getElementById(shape.id);
		if (!element || !element.parentElement) return resizeBox(shape, info);
		const { width, height } = element.parentElement.getBoundingClientRect();
		if (element) {
			const isOverflowing =
				element.scrollWidth > width || element.scrollHeight > height;
			if (isOverflowing) {
				element.parentElement?.classList.add("overflowing");
			} else {
				element.parentElement?.classList.remove("overflowing");
			}
		}
		return resizeBox(shape, info);
	};

	getGeometry(shape: HTMLShape) {
		return new Rectangle2d({
			width: shape.props.w,
			height: shape.props.h,
			isFilled: true,
		});
	}

	component(shape: HTMLShape) {
		console.log(
			"HTMLShapeUtil component rendering:",
			shape.id,
			"html length:",
			shape.props.html.length,
		);

		const handleShapeInteraction = (
			event: React.PointerEvent | React.MouseEvent,
		) => {
			console.log(
				"HTMLShapeUtil interaction detected:",
				event.type,
				event.target,
			);

			let target = event.target as HTMLElement;

			// Walk up the DOM tree to find an anchor tag
			while (target && target.tagName !== "A" && target.parentElement) {
				target = target.parentElement;
			}

			if (target && target.tagName === "A") {
				const anchor = target as HTMLAnchorElement;
				const href = anchor.getAttribute("href");

				console.log("Link clicked in canvas shape:", href);

				if (href && !href.startsWith("http") && !href.startsWith("mailto:")) {
					event.preventDefault();
					event.stopPropagation();

					// Dispatch a custom event that QuartzContent can listen to
					window.dispatchEvent(
						new CustomEvent("canvasLinkClick", {
							detail: { href },
						}),
					);
				}
			}
		};

		// Add event listeners directly to the DOM after render
		React.useEffect(() => {
			const element = document.getElementById(shape.id);
			if (element) {
				console.log("Adding direct event listeners to shape element", shape.id);

				const handleDirectClick = (event: Event) => {
					console.log("Direct DOM click on shape:", event.target);
					handleShapeInteraction(event as any);
				};

				element.addEventListener("click", handleDirectClick, true);
				element.addEventListener("pointerdown", handleDirectClick, true);

				return () => {
					element.removeEventListener("click", handleDirectClick, true);
					element.removeEventListener("pointerdown", handleDirectClick, true);
				};
			}
		}, [shape.id]);

		return (
			<div
				id={shape.id}
				dangerouslySetInnerHTML={{ __html: shape.props.html }}
				onClick={handleShapeInteraction}
				onPointerDown={handleShapeInteraction}
				onMouseDown={handleShapeInteraction}
				style={{
					background: "white",
					border: "1px solid red",
					pointerEvents: "auto", // Ensure clicks work
					position: "relative",
					zIndex: 1000,
				}}
			/>
		);
	}

	indicator(shape: HTMLShape) {
		return <rect width={shape.props.w} height={shape.props.h} />;
	}
}
