import { CommonRouteConfigType } from '@common/utils/CommonUtils';
import SignInPage from './SignInPage';
import authRoles from '../../auth/authRoles';

const SignInConfig: CommonRouteConfigType = {
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
	auth: authRoles.onlyGuest,
	routes: [
		{
			path: 'sign-in',
			element: <SignInPage />
		}
	]
};

export default SignInConfig;
