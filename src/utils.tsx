import { createShapeId } from "@tldraw/tldraw";

export function createShapes(elementsInfo: any) {
	console.log("Creating shapes from elements:", elementsInfo);
	const shapes = elementsInfo.map((element: any) => {
		const shape = {
			id: createShapeId(),
			type: "html",
			x: element.x,
			y: element.y,
			props: {
				w: element.w,
				h: element.h,
				html: element.html,
			},
		};
		console.log("Created shape:", shape);
		return shape;
	});
	return shapes;
}
