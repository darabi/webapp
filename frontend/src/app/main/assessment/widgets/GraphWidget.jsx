import { useState } from 'react';
import Cytoscape from 'cytoscape';
import COSEBilkent from 'cytoscape-cose-bilkent';
import CytoscapeComponent from 'react-cytoscapejs';
import Skeleton from '@mui/material/Skeleton';
import { graphLayout, graphStylesheet } from './GraphLayout';

Cytoscape.use(COSEBilkent);

export const GraphWidget = ({ query, queryArgs, width, height }) => {
	const [currentWidth, setCurrentWidth] = useState(width);
	const [currentHeight, setCurrentHeight] = useState(height);

	// calling the query hook automatically fetches data and returns query values
	const { data, isError, isLoading, isSuccess } = query.apply(this, queryArgs);

	if (isError) {
		return (
			<div>
				<h1>There was an error!!!</h1>
			</div>
		);
	}

	if (isLoading) {
		return (
			<div>
				<h1>Loading...</h1>
			</div>
		);
	}

	if (isSuccess) {
		return (
			<CytoscapeComponent
				elements={CytoscapeComponent.normalizeElements(data)}
				style={{ width: currentWidth, height: currentHeight, flex: 1 }}
				layout={graphLayout}
				stylesheet={graphStylesheet}
			/>
		);
	}

	return null;
};
