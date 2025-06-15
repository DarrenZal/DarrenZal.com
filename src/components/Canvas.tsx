import { SimController } from "@/physics/PhysicsControls";
import { HTMLShapeUtil } from "@/shapes/HTMLShapeUtil";
import { Editor, TLShape, TLUiComponents, Tldraw } from "@tldraw/tldraw";

const components: TLUiComponents = {
	HelpMenu: null,
	StylePanel: null,
	PageMenu: null,
	NavigationPanel: null,
	DebugMenu: null,
	ContextMenu: null,
	ActionsMenu: null,
	QuickActions: null,
	MainMenu: null,
	MenuPanel: null,
};

export function Canvas({ shapes }: { shapes: TLShape[] }) {
	console.log("Canvas component rendering with", shapes.length, "shapes");

	return (
		<div className="tldraw__editor">
			<Tldraw
				components={components}
				shapeUtils={[HTMLShapeUtil]}
				onMount={(editor: Editor) => {
					window.dispatchEvent(new CustomEvent("editorDidMountEvent"));
					editor.user.updateUserPreferences({ isDarkMode: false });
				}}
			>
				<SimController shapes={shapes} />
			</Tldraw>
		</div>
	);
}
