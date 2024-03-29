export const graphLayout = {
	name: 'cose-bilkent',
	// Called on `layoutready`
	ready: function () {},
	// Called on `layoutstop`
	stop: function () {},
	// 'draft', 'default' or 'proof"
	// - 'draft' fast cooling rate
	// - 'default' moderate cooling rate
	// - "proof" slow cooling rate
	quality: 'draft',
	// Whether to include labels in node dimensions. Useful for avoiding label overlap
	nodeDimensionsIncludeLabels: false,
	// number of ticks per frame; higher is faster but more jerky
	refresh: 30,
	// Whether to fit the network view after when done
	fit: true,
	// Padding on fit
	padding: 10,
	// Whether to enable incremental mode
	randomize: true,
	// Node repulsion (non overlapping) multiplier
	nodeRepulsion: 4500,
	// Ideal (intra-graph) edge length
	idealEdgeLength: 50,
	// Divisor to compute edge forces
	edgeElasticity: 0.45,
	// Nesting factor (multiplier) to compute ideal edge length for inter-graph edges
	nestingFactor: 0.1,
	// Gravity force (constant)
	gravity: 0.25,
	// Maximum number of iterations to perform
	numIter: 1000,
	// Whether to tile disconnected nodes
	tile: true,
	// Type of layout animation. The option set is {'during', 'end', false}
	animate: false,
	// Duration for animate:end
	animationDuration: 250,
	// Amount of vertical space to put between degree zero nodes during tiling (can also be a function)
	tilingPaddingVertical: 10,
	// Amount of horizontal space to put between degree zero nodes during tiling (can also be a function)
	tilingPaddingHorizontal: 10,
	// Gravity range (constant) for compounds
	gravityRangeCompound: 1.5,
	// Gravity force (constant) for compounds
	gravityCompound: 1.0,
	// Gravity range (constant)
	gravityRange: 3.8,
	// Initial cooling factor for incremental layout
	initialEnergyOnIncremental: 0.5
};

export const graphStylesheet = [
	{
		selector: 'node',
		style: {
			backgroundColor: '#4a56a6',
			width: 30,
			height: 30,
			label: 'data(label)',

			// "width": "mapData(score, 0, 0.006769776522008331, 20, 60)",
			// "height": "mapData(score, 0, 0.006769776522008331, 20, 60)",
			// "text-valign": "center",
			// "text-halign": "center",
			'overlay-padding': '6px',
			'z-index': '10',
			//text props
			'text-outline-color': '#4a56a6',
			'text-outline-width': '2px',
			color: 'white',
			fontSize: 20
		}
	},
	{
		selector: 'node:selected',
		style: {
			'border-width': '6px',
			'border-color': '#AAD8FF',
			'border-opacity': '0.5',
			'background-color': '#77828C',
			width: 50,
			height: 50,
			//text props
			'text-outline-color': '#77828C',
			'text-outline-width': 8
		}
	},
	{
		selector: "node[type='device']",
		style: {
			shape: 'rectangle'
		}
	},
	{
		selector: 'edge',
		style: {
			width: 3,
			// "line-color": "#6774cb",
			'line-color': '#AAD8FF',
			'target-arrow-color': '#6774cb',
			'target-arrow-shape': 'triangle',
			'curve-style': 'bezier'
		}
	}
];
