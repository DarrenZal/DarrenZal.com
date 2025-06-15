import { Canvas } from "@/components/Canvas";
import { Contact } from "@/components/Contact";
import { Default } from "@/components/Default";
import { Post } from "@/components/Post";
import { Toggle } from "@/components/Toggle";
import "@/css/style.css";
import { useCanvas } from "@/hooks/useCanvas";
import { createShapes } from "@/utils";
import "@tldraw/tldraw/tldraw.css";
import { inject } from "@vercel/analytics";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
inject();

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);

function App() {
	return (
		<React.StrictMode>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/card/contact" element={<Contact />} />
					<Route path="/posts/:slug" element={<Post />} />
				</Routes>
			</BrowserRouter>
		</React.StrictMode>
	);
}

function Home() {
	console.log("Home component rendering");
	const { isCanvasEnabled, elementsInfo } = useCanvas();
	const shapes = createShapes(elementsInfo);
	const [isEditorMounted, setIsEditorMounted] = useState(false);

	useEffect(() => {
		const handleEditorDidMount = () => {
			setIsEditorMounted(true);
		};

		window.addEventListener("editorDidMountEvent", handleEditorDidMount);

		return () => {
			window.removeEventListener("editorDidMountEvent", handleEditorDidMount);
		};
	}, []);

	console.log(
		"Home render - isCanvasEnabled:",
		isCanvasEnabled,
		"elementsInfo:",
		elementsInfo.length,
	);

	return (
		<>
			<Toggle />
			<div
				style={{ zIndex: 999999 }}
				className={`${isCanvasEnabled ? "transparent" : ""}`}
			>
				<Default />
			</div>
			{isCanvasEnabled && elementsInfo.length > 0 ? (
				<Canvas shapes={shapes} />
			) : null}
		</>
	);
}
