(() => {
	var o = window.matchMedia("(prefers-color-scheme: light)").matches
			? "light"
			: "dark",
		r = localStorage.getItem("theme") ?? o;
	document.documentElement.setAttribute("saved-theme", r);
	var n = (t) => {
		document.body.classList.add("animation-ready");
		const d = new CustomEvent("themechange", { detail: { theme: t } });
		document.dispatchEvent(d);
	};
	document.addEventListener("nav", () => {
		const t = (c) => {
				const e =
					document.documentElement.getAttribute("saved-theme") === "dark"
						? "light"
						: "dark";
				document.documentElement.setAttribute("saved-theme", e),
					localStorage.setItem("theme", e),
					n(e);
			},
			d = (c) => {
				const e = c.matches ? "dark" : "light";
				document.documentElement.setAttribute("saved-theme", e),
					localStorage.setItem("theme", e),
					n(e);
			},
			a = document.querySelector("#darkmode");
		a.addEventListener("click", t),
			window.addCleanup(() => a.removeEventListener("click", t));
		const m = window.matchMedia("(prefers-color-scheme: dark)");
		m.addEventListener("change", d),
			window.addCleanup(() => m.removeEventListener("change", d));
	});
})();
