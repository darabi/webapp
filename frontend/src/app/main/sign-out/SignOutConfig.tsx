import { CommonRouteConfigType } from '@common/utils/CommonUtils';
import SignOutPage from './SignOutPage';

const SignOutConfig: CommonRouteConfigType = {
	settings: {
		layout: {
			config: {
				navbar: {
					display: false
				},
				toolbar: {
					display: false
				},
				footer: {
					display: false
				},
				leftSidePanel: {
					display: false
				},
				rightSidePanel: {
					display: false
				}
			}
		}
	},
	auth: null,
	routes: [
		{
			path: 'sign-out',
			element: <SignOutPage />
		}
	]
};

export default SignOutConfig;
