export function Toggle() {
	console.log("Toggle component rendering");

	return (
		<>
			<button
				id="toggle-canvas"
				onClick={() => {
					console.log("Canvas toggle clicked");
					window.dispatchEvent(new CustomEvent("toggleCanvasEvent"));
				}}
				style={{
					position: "fixed",
					top: "10px",
					right: "10px",
					width: "40px",
					height: "40px",
					zIndex: 99999,
					backgroundColor: "white",
					border: "2px solid #ccc",
					borderRadius: "8px",
					cursor: "pointer",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<img
					src="/public/canvas-button.svg"
					alt="Toggle Canvas"
					style={{ width: "24px", height: "24px" }}
				/>
			</button>
			<button
				id="toggle-physics"
				className="hidden"
				onClick={() => {
					console.log("Physics toggle clicked");
					window.dispatchEvent(new CustomEvent("togglePhysicsEvent"));
				}}
				style={{
					position: "fixed",
					top: "60px",
					right: "10px",
					width: "40px",
					height: "40px",
					zIndex: 99999,
					backgroundColor: "white",
					border: "2px solid #ccc",
					borderRadius: "8px",
					cursor: "pointer",
					display: "none",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<img
					src="/public/gravity-button.svg"
					alt="Toggle Physics"
					style={{ width: "24px", height: "24px" }}
				/>
			</button>
		</>
	);
}
