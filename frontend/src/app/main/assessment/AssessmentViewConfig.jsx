import { lazy } from 'react';

const AssessmentView = lazy(() => import('./AssessmentView'));
/**
 * The AssessmentView configuration.
 */
const AssessmentViewConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: 'assess',
			element: <AssessmentView />
		}
	]
};
export default AssessmentViewConfig;
