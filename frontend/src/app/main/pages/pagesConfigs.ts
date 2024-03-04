import { CommonRouteConfigsType } from '@common/utils/CommonUtils';
import authenticationPagesConfig from './authentication/authenticationPagesConfig';

/**
 * The pages routes config.
 */
const pagesConfigs: CommonRouteConfigsType = [
	...authenticationPagesConfig,
];

export default pagesConfigs;
