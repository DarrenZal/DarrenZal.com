// Cytoscape.js RDF Graph Visualization
document.addEventListener("DOMContentLoaded", () => {
	console.log("Cytoscape RDF script loaded");

	// Check if the container exists
	const container = document.getElementById("rdf-graph-container");
	console.log("Container found:", container);
	if (!container) {
		console.error("Container not found");
		return;
	}

	// Load Cytoscape.js from CDN if not already loaded
	if (!window.cytoscape) {
		console.log("Loading Cytoscape.js from CDN");
		const script = document.createElement("script");
		script.src =
			"https://cdnjs.cloudflare.com/ajax/libs/cytoscape/3.26.0/cytoscape.min.js";
		// Remove integrity check to avoid blocking
		script.crossOrigin = "anonymous";
		script.onload = () => {
			console.log("Cytoscape.js loaded successfully");
			initCytoscape();
		};
		script.onerror = () => {
			console.error("Failed to load Cytoscape.js");
		};
		document.head.appendChild(script);
	} else {
		console.log("Cytoscape.js already loaded");
		initCytoscape();
	}

	function initCytoscape() {
		// RDF data from JSON-LD
		const jsonLdData = {
			"@context": {
				schema: "http://schema.org/",
				hyphal: "http://example.org/hyphal#",
			},
			"@graph": [
				{
					"@id": "hyphal:PersonalKnowledgeManagement",
					"@type": "schema:CreativeWork",
					"schema:name": "Personal Knowledge Management",
					"schema:description":
						"A system for managing personal data, notes, information, and knowledge...",
					"hyphal:projectOffer": {
						"@id": "hyphal:InternalOrgAgent",
					},
					"hyphal:relatedTo": [
						{
							"@id": "hyphal:DiscourseGraph",
						},
						{
							"@id": "hyphal:PublicExternalOrgAgent",
						},
					],
				},
				{
					"@id": "hyphal:MemeticActivationPlatform",
					"@type": "schema:CreativeWork",
					"schema:name": "Memetic Activation Platform (the MAP)",
					"schema:description":
						"A platform designed to facilitate the spread of ideas ('memes') within a community, promoting engagement.",
				},
				{
					"@id": "hyphal:MainSt",
					"@type": "schema:CreativeWork",
					"schema:name": "Main St (Scott's Old App)",
					"schema:description":
						"A prior app developed by Scott, serving as potential inspiration or foundation for new development.",
				},
				{
					"@id": "hyphal:DiscourseGraph",
					"@type": "schema:CreativeWork",
					"schema:name": "Discourse Graph",
					"schema:description":
						"Structured visualization of ideas and dialogue. See: Bio-X AI Berlin and Darren Zal's Quartz Discourse Graphs.",
					"schema:url": [
						"https://bio-x-ai-berlin.devfolio.co/overview",
						"https://darrenzal.github.io/Quartz/DiscourseGraphs",
					],
					"hyphal:relatedTo": [
						{
							"@id": "hyphal:Relay",
						},
						{
							"@id": "hyphal:PersonalKnowledgeManagement",
						},
					],
				},
				{
					"@id": "hyphal:MotherGaia",
					"@type": "schema:Project",
					"schema:name": "MotherGaia",
					"schema:description":
						"A project involving Aaron Perry, focused on regenerative coordination and Earth-aligned intelligence. Connected to both internal and public-facing knowledge agents.",
					"schema:agent": [
						{ "@id": "hyphal:InternalOrgAgent" },
						{ "@id": "hyphal:PublicExternalOrgAgent" },
					],
					"schema:contributor": [
						{
							"@type": "schema:Person",
							"schema:name": "Aaron Perry",
						},
						{
							"@type": "schema:Organization",
							"schema:name": "Symbiocene Labs",
						},
					],
				},
				{
					"@id": "hyphal:InternalOrgAgent",
					"@type": "schema:CreativeWork",
					"schema:name": "Internal Org Agent",
					"schema:description":
						"A digital agent that supports knowledge and coordination inside an org (e.g., Y on Earth).",
				},
				{
					"@id": "hyphal:PublicExternalOrgAgent",
					"@type": "schema:CreativeWork",
					"schema:name": "Public External Org Agent",
					"schema:description":
						"A public-facing knowledge agent supporting engagement and collaboration in external networks.",
				},
				{
					"@id": "hyphal:SDGApp",
					"@type": "schema:CreativeWork",
					"schema:name": "App for Civic Participation in UN SDGs",
					"schema:description":
						"Developed with Susanna Choe to boost public action toward the UN Sustainable Development Goals.",
				},
				{
					"@id": "hyphal:RegenLink",
					"@type": "schema:CreativeWork",
					"schema:name": "Regen Link",
					"schema:description":
						"Tool/platform for connecting people to regenerative networks and projects.",
				},
				{
					"@id": "hyphal:BioregionalMapping",
					"@type": "schema:CreativeWork",
					"schema:name": "Bioregional Mapping",
					"schema:description":
						"Mapping ecosystems and social systems in a bioregion for better coordination and regeneration.",
					"hyphal:relatedTo": [
						{
							"@id": "hyphal:RegenLink",
						},
						{
							"@id": "hyphal:RegenCommons",
						},
					],
				},
				{
					"@id": "hyphal:FlowFunding",
					"@type": "schema:CreativeWork",
					"schema:name": "Flow Funding",
					"schema:description":
						"A funding model that allocates capital according to community needs.",
					"hyphal:makesUseOf": {
						"@id": "hyphal:Maps",
					},
				},
				{
					"@id": "hyphal:LocalCommitmentPooling",
					"@type": "schema:CreativeWork",
					"schema:name": "Local Commitment Pooling",
					"schema:description":
						"System for collaborative commitment of local time, money, effort toward shared goals.",
				},
				{
					"@id": "hyphal:RegenCommons",
					"@type": "schema:CreativeWork",
					"schema:name": "Regen Commons",
					"schema:description":
						"Community-managed shared resources emphasizing regeneration of ecological and social capital.",
				},
				{
					"@id": "hyphal:Games",
					"@type": "schema:CreativeWork",
					"schema:name": "Games",
					"schema:hasPart": [
						{
							"@id": "hyphal:FlowFundingGame",
							"schema:name": "Flow Funding Game",
							"schema:isPartOf": {
								"@id": "hyphal:FlowFunding",
							},
						},
					],
				},
				{
					"@id": "hyphal:Kwaxala",
					"@type": "schema:CreativeWork",
					"schema:name": "KWaxala",
					"schema:description":
						"A collaborative, cultural, or regenerative platform/project (more info needed).",
				},
				{
					"@id": "hyphal:MycoMortgages",
					"@type": "schema:CreativeWork",
					"schema:name": "Myco-Mortgages",
					"schema:description":
						"Mortgage model inspired by mycelium, supporting cooperative or regenerative housing finance.",
				},
				{
					"@id": "hyphal:OneLocal",
					"@type": "schema:CreativeWork",
					"schema:name": "One-Local",
					"schema:description":
						"Platform for localized resilience, production, and economic relocalization.",
				},
				{
					"@id": "hyphal:Maps",
					"@type": "schema:CreativeWork",
					"schema:name": "Maps",
					"schema:description":
						"App for exploring physical/conceptual space. Includes routing, recommendations, and trip planning.",
					"hyphal:projectOffer": "developer time",
					"hyphal:projectNeeds": "developer time (Mapping, GIS)",
					"hyphal:relatedTo": [
						{
							"@id": "hyphal:CitizenWallet",
						},
						{
							"@id": "hyphal:Relay",
						},
					],
				},
				{
					"@id": "hyphal:CitizenWallet",
					"@type": "schema:CreativeWork",
					"schema:name": "Citizen Wallet",
					"schema:description":
						"Web3 wallet enabling civic engagement, identity, and digital asset use.",
					"hyphal:projectOffer": "developer time",
					"hyphal:projectNeeds": {
						"@id": "hyphal:Relay",
					},
				},
				{
					"@id": "hyphal:Relay",
					"@type": "schema:CreativeWork",
					"schema:name": "Relay",
					"schema:description":
						"App with voice-to-text, AI interaction, storage, and LLM interface.",
					"hyphal:projectOffer": "developer time",
					"hyphal:projectNeeds": [
						"interface",
						"voice-to-text conversion",
						"storage and retrieval",
						{
							"@id": "hyphal:DiscourseGraph",
						},
					],
				},
				{
					"@id": "hyphal:BRICSEX",
					"@type": "schema:CreativeWork",
					"schema:name": "BRICSEX",
					"schema:description":
						"Liquidity pools for BRICS stabletokens, redistributing trading fees to impact/flow funds.",
					"hyphal:projectOffer": "developer time",
					"hyphal:projectNeeds":
						"developers, BRICS stabletokens, liquidity, offramps",
					"hyphal:relatedTo": {
						"@id": "hyphal:FlowFunding",
					},
				},
				{
					"@id": "hyphal:NewCoinCollab",
					"@type": "schema:CreativeWork",
					"schema:name": "Collab with NewCoin",
					"schema:description": "Partnership around AI or crypto innovation.",
					"schema:url": "https://newos.computer/aisummer",
				},
				{
					"@id": "hyphal:InfiniteFrontPorch",
					"@type": "schema:CreativeWork",
					"schema:name": "Infinite Front Porch / Green Rooms",
					"schema:description":
						"Social or virtual spaces for informal community interaction and open-ended dialogue.",
				},
			],
		};

		// Parse JSON-LD into Cytoscape elements
		const elements = {
			nodes: [],
			edges: [],
		};

		// Process nodes
		jsonLdData["@graph"].forEach((item) => {
			// Extract ID without prefix
			const id = item["@id"].split(":")[1];

			// Determine node type based on @type or structure
			let type = "subject";
			if (item["@type"] && item["@type"].includes("Person")) {
				type = "person";
			} else if (item["@type"] && item["@type"].includes("Organization")) {
				type = "organization";
			} else if (item["@type"] && item["@type"].includes("Project")) {
				type = "project";
			}

			// Add node
			elements.nodes.push({
				data: {
					id: id,
					label: item["schema:name"] || id,
					type: type,
					description: item["schema:description"] || "",
				},
			});

			// Add nested nodes if they exist
			if (item["schema:hasPart"] && Array.isArray(item["schema:hasPart"])) {
				item["schema:hasPart"].forEach((part) => {
					if (part["@id"] && part["schema:name"]) {
						const partId = part["@id"].split(":")[1];
						elements.nodes.push({
							data: {
								id: partId,
								label: part["schema:name"],
								type: "subject",
								description: "",
							},
						});
					}
				});
			}
		});

		// Process edges
		let edgeId = 0;
		jsonLdData["@graph"].forEach((item) => {
			const sourceId = item["@id"].split(":")[1];

			// Process all potential relationship properties
			const relationshipProperties = [
				"hyphal:relatedTo",
				"hyphal:projectOffer",
				"hyphal:projectNeeds",
				"hyphal:makesUseOf",
				"schema:agent",
				"schema:contributor",
				"schema:hasPart",
			];

			relationshipProperties.forEach((prop) => {
				if (!item[prop]) return;

				// Handle array of relationships
				const relationships = Array.isArray(item[prop])
					? item[prop]
					: [item[prop]];

				relationships.forEach((rel) => {
					// Skip if not an object with @id
					if (typeof rel !== "object" || !rel["@id"]) {
						// Handle string values as special nodes
						if (typeof rel === "string") {
							// Create a new node for the string value if it doesn't exist
							const stringNodeId = `string_${edgeId}`;
							if (!elements.nodes.find((n) => n.data.id === stringNodeId)) {
								elements.nodes.push({
									data: {
										id: stringNodeId,
										label: rel,
										type: "object",
									},
								});
							}

							// Add edge
							elements.edges.push({
								data: {
									id: `e${edgeId++}`,
									source: sourceId,
									target: stringNodeId,
									label: prop.split(":")[1],
								},
							});
						}
						return;
					}

					const targetId = rel["@id"].split(":")[1];

					// Add edge
					elements.edges.push({
						data: {
							id: `e${edgeId++}`,
							source: sourceId,
							target: targetId,
							label: prop.split(":")[1],
						},
					});
				});
			});

			// Special handling for schema:isPartOf
			if (item["schema:isPartOf"] && item["schema:isPartOf"]["@id"]) {
				const targetId = item["schema:isPartOf"]["@id"].split(":")[1];
				elements.edges.push({
					data: {
						id: `e${edgeId++}`,
						source: sourceId,
						target: targetId,
						label: "isPartOf",
					},
				});
			}
		});

		// Check if dark mode is enabled
		const isDarkMode =
			document.documentElement.getAttribute("saved-theme") === "dark";

		// Create a legend
		const legend = document.createElement("div");
		legend.style.position = "absolute";
		legend.style.bottom = "10px";
		legend.style.right = "10px";
		legend.style.padding = "10px";
		legend.style.backgroundColor = isDarkMode ? "#1D232D" : "#fffdfa";
		legend.style.border = `1px solid ${isDarkMode ? "#5A657B" : "#d1caba"}`;
		legend.style.borderRadius = "5px";
		legend.style.fontSize = "12px";
		legend.style.zIndex = "10";
		legend.style.color = isDarkMode ? "#d4d4d4" : "#08142C";
		legend.innerHTML = `
      <div style="margin-bottom: 5px; font-weight: bold;">Legend</div>
      <div style="display: flex; align-items: center; margin-bottom: 3px;">
        <div style="width: 15px; height: 15px; background-color: ${
					isDarkMode ? "#7188A9" : "#7188A9"
				}; border-radius: 50%; margin-right: 5px;"></div>
        <span>Project/CreativeWork</span>
      </div>
      <div style="display: flex; align-items: center; margin-bottom: 3px;">
        <div style="width: 15px; height: 15px; background-color: ${
					isDarkMode ? "#84a59d" : "#84a59d"
				}; border-radius: 50%; margin-right: 5px;"></div>
        <span>Person/Organization</span>
      </div>
      <div style="display: flex; align-items: center;">
        <div style="width: 15px; height: 15px; background-color: ${
					isDarkMode ? "#5A657B" : "#5A657B"
				}; border-radius: 50%; margin-right: 5px;"></div>
        <span>Resource/Value</span>
      </div>
    `;
		container.style.position = "relative";
		container.appendChild(legend);

		// Initialize Cytoscape
		const cy = cytoscape({
			container: container,
			elements: elements,
			style: [
				{
					selector: "node",
					style: {
						label: "data(label)",
						"text-valign": "center",
						"text-halign": "center",
						"font-size": "12px",
						width: "60px",
						height: "60px",
						"text-wrap": "wrap",
						"text-max-width": "80px",
						"background-color": isDarkMode ? "#1D232D" : "#f8f8f8",
						"border-width": "1px",
						"border-color": isDarkMode ? "#5A657B" : "#ddd",
						color: isDarkMode ? "#d4d4d4" : "#08142C",
						"text-outline-width": 2,
						"text-outline-color": isDarkMode ? "#1D232D" : "#f8f8f8",
						"text-outline-opacity": 1,
						"transition-property":
							"background-color, border-color, border-width",
						"transition-duration": "0.2s",
					},
				},
				{
					selector: 'node[type="subject"], node[type="project"]',
					style: {
						"background-color": "#7188A9",
						color: "#fff",
						"text-outline-color": "#7188A9",
					},
				},
				{
					selector: 'node[type="person"], node[type="organization"]',
					style: {
						"background-color": "#84a59d",
						color: "#fff",
						"text-outline-color": "#84a59d",
					},
				},
				{
					selector: 'node[type="object"]',
					style: {
						"background-color": "#5A657B",
						color: "#fff",
						"text-outline-color": "#5A657B",
					},
				},
				{
					selector: "edge[label]",
					style: {
						label: "data(label)",
						"font-size": "8px",
						"text-rotation": "autorotate",
						"text-margin-y": "-10px",
						"text-outline-width": 2,
						"text-outline-color": isDarkMode ? "#1D232D" : "#fffdfa",
						"text-outline-opacity": 0.8,
						color: isDarkMode ? "#d4d4d4" : "#08142C",
					},
				},
				{
					selector: "edge",
					style: {
						width: 2,
						"line-color": isDarkMode ? "#5A657B" : "#ccc",
						"curve-style": "bezier",
						opacity: 0.7,
						"transition-property": "line-color, opacity, width",
						"transition-duration": "0.2s",
					},
				},
				{
					selector: ":selected",
					style: {
						"border-width": 3,
						"border-color": isDarkMode ? "#7188A9" : "#274B75",
					},
				},
				{
					selector: ".highlighted",
					style: {
						"border-width": 3,
						"border-color": isDarkMode ? "#7188A9" : "#274B75",
					},
				},
				{
					selector: ".highlighted-edge",
					style: {
						width: 3,
						"line-color": isDarkMode ? "#7188A9" : "#274B75",
						opacity: 1,
					},
				},
			],
			layout: {
				name: "cose",
				idealEdgeLength: 100,
				nodeOverlap: 20,
				refresh: 20,
				fit: true,
				padding: 30,
				randomize: false,
				componentSpacing: 100,
				nodeRepulsion: 400000,
				edgeElasticity: 100,
				nestingFactor: 5,
				gravity: 80,
				numIter: 1000,
				initialTemp: 200,
				coolingFactor: 0.95,
				minTemp: 1.0,
			},
		});

		// Add interactivity

		// Highlight connected nodes and edges on hover
		cy.on("mouseover", "node", (e) => {
			const node = e.target;

			// Highlight the hovered node
			node.addClass("highlighted");

			// Get connected edges and nodes
			const connectedEdges = node.connectedEdges();
			const connectedNodes = node.neighborhood("node");

			// Highlight connected edges and nodes
			connectedEdges.addClass("highlighted-edge");
			connectedNodes.addClass("highlighted");
		});

		// Remove highlights on mouseout
		cy.on("mouseout", "node", (e) => {
			const node = e.target;

			// Remove highlight from the hovered node
			node.removeClass("highlighted");

			// Get connected edges and nodes
			const connectedEdges = node.connectedEdges();
			const connectedNodes = node.neighborhood("node");

			// Remove highlight from connected edges and nodes
			connectedEdges.removeClass("highlighted-edge");
			connectedNodes.removeClass("highlighted");
		});

		// Add click functionality
		cy.on("tap", "node", (evt) => {
			const node = evt.target;
			console.log("Tapped node: " + node.id());

			// Display node info
			const nodeType = node.data("type");
			const nodeLabel = node.data("label");

			// Create or update info box
			let infoBox = document.getElementById("rdf-info-box");
			if (!infoBox) {
				infoBox = document.createElement("div");
				infoBox.id = "rdf-info-box";
				infoBox.style.position = "absolute";
				infoBox.style.top = "10px";
				infoBox.style.left = "10px";
				infoBox.style.padding = "10px";
				infoBox.style.backgroundColor = isDarkMode ? "#1D232D" : "#fffdfa";
				infoBox.style.border = `1px solid ${
					isDarkMode ? "#5A657B" : "#d1caba"
				}`;
				infoBox.style.borderRadius = "5px";
				infoBox.style.fontSize = "12px";
				infoBox.style.zIndex = "10";
				infoBox.style.color = isDarkMode ? "#d4d4d4" : "#08142C";
				infoBox.style.maxWidth = "200px";
				container.appendChild(infoBox);
			}

			// Update info box content
			infoBox.innerHTML = `
        <div style="margin-bottom: 5px; font-weight: bold;">${nodeLabel}</div>
        <div>Type: ${nodeType.charAt(0).toUpperCase() + nodeType.slice(1)}</div>
      `;

			// Add connections info if available
			const connectedEdges = node.connectedEdges();
			if (connectedEdges.length > 0) {
				let connectionsHtml =
					'<div style="margin-top: 5px;">Connections:</div><ul style="margin: 5px 0 0 15px; padding: 0;">';

				connectedEdges.forEach((edge) => {
					const source = edge.source().data("label");
					const target = edge.target().data("label");
					const connection =
						source === nodeLabel ? `→ ${target}` : `← ${source}`;
					connectionsHtml += `<li>${connection}</li>`;
				});

				connectionsHtml += "</ul>";
				infoBox.innerHTML += connectionsHtml;
			}
		});

		// Add zoom and pan functionality
		cy.on("zoom", () => {
			// Update legend position on zoom
			const legend = document.querySelector(
				"#rdf-graph-container > div:last-child",
			);
			if (legend) {
				legend.style.bottom = "10px";
				legend.style.right = "10px";
			}
		});

		cy.on("pan", () => {
			// Update legend position on pan
			const legend = document.querySelector(
				"#rdf-graph-container > div:last-child",
			);
			if (legend) {
				legend.style.bottom = "10px";
				legend.style.right = "10px";
			}
		});

		// Add theme change listener
		document.addEventListener("themechange", (e) => {
			const newTheme = e.detail.theme;
			const isDark = newTheme === "dark";

			// Update legend colors
			const legend = document.querySelector(
				"#rdf-graph-container > div:last-child",
			);
			if (legend) {
				legend.style.backgroundColor = isDark ? "#1D232D" : "#fffdfa";
				legend.style.border = `1px solid ${isDark ? "#5A657B" : "#d1caba"}`;
				legend.style.color = isDark ? "#d4d4d4" : "#08142C";
			}

			// Update info box colors if it exists
			const infoBox = document.getElementById("rdf-info-box");
			if (infoBox) {
				infoBox.style.backgroundColor = isDark ? "#1D232D" : "#fffdfa";
				infoBox.style.border = `1px solid ${isDark ? "#5A657B" : "#d1caba"}`;
				infoBox.style.color = isDark ? "#d4d4d4" : "#08142C";
			}

			// Update graph styles
			cy.style()
				.selector("edge")
				.style({
					"line-color": isDark ? "#5A657B" : "#ccc",
				})
				.update();
		});

		// Add a reset button
		const resetButton = document.createElement("button");
		resetButton.textContent = "Reset View";
		resetButton.style.position = "absolute";
		resetButton.style.top = "10px";
		resetButton.style.right = "10px";
		resetButton.style.padding = "5px 10px";
		resetButton.style.backgroundColor = isDarkMode ? "#5A657B" : "#d1caba";
		resetButton.style.border = "none";
		resetButton.style.borderRadius = "5px";
		resetButton.style.color = isDarkMode ? "#d4d4d4" : "#08142C";
		resetButton.style.cursor = "pointer";
		resetButton.style.zIndex = "10";
		resetButton.style.fontSize = "12px";
		resetButton.addEventListener("click", () => {
			cy.fit();
			cy.center();

			// Remove any info box
			const infoBox = document.getElementById("rdf-info-box");
			if (infoBox) {
				infoBox.remove();
			}
		});
		container.appendChild(resetButton);

		// Fit the graph to the viewport
		cy.fit();
	}
});
