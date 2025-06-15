import {
	Editor,
	TLUnknownShape,
	createShapeId,
	useEditor,
} from "@tldraw/tldraw";
import { useEffect, useState } from "react";
import { usePhysicsSimulation } from "./simulation";

export const SimController = ({ shapes }: { shapes: TLUnknownShape[] }) => {
	const editor = useEditor();
	const [isPhysicsActive, setIsPhysicsActive] = useState(false);
	const { addShapes, destroy } = usePhysicsSimulation(editor);

	useEffect(() => {
		console.log("SimController: Creating", shapes.length, "shapes");
		const currentShapes = editor.getCurrentPageShapes();
		console.log("Current shapes in editor:", currentShapes.length);

		// Clear existing shapes and create new ones
		editor.deleteShapes(currentShapes);
		editor.createShapes(shapes);

		return () => {
			const currentShapes = editor.getCurrentPageShapes();
			editor.deleteShapes(currentShapes);
		};
	}, [shapes, editor]);

	useEffect(() => {
		const togglePhysics = () => {
			setIsPhysicsActive((currentIsPhysicsActive) => {
				if (currentIsPhysicsActive) {
					destroy();
					return false;
				}
				createFloor(editor);
				return true;
			});
		};

		// Listen for the togglePhysicsEvent to enable/disable physics simulation
		window.addEventListener("togglePhysicsEvent", togglePhysics);

		return () => {
			window.removeEventListener("togglePhysicsEvent", togglePhysics);
		};
	}, []);

	useEffect(() => {
		if (isPhysicsActive) {
			console.log("Physics is active, adding shapes to simulation");
			addShapes(editor.getCurrentPageShapes()); // Activate physics simulation
		} else {
			destroy(); // Deactivate physics simulation
		}
	}, [isPhysicsActive, addShapes, shapes, editor]);

	return <></>;
};

function createFloor(editor: Editor) {
	const viewBounds = editor.getViewportPageBounds();

	editor.createShape({
		id: createShapeId(),
		type: "geo",
		x: viewBounds.minX,
		y: viewBounds.maxY,
		props: {
			w: viewBounds.width,
			h: 50,
			color: "grey",
			fill: "solid",
		},
		meta: {
			fixed: true,
		},
	});
}
