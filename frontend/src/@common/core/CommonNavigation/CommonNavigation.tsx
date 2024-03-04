import Divider from '@mui/material/Divider';
import { memo } from 'react';
import GlobalStyles from '@mui/material/GlobalStyles';
import CommonNavHorizontalLayout1 from './horizontal/CommonNavHorizontalLayout1';
import CommonNavVerticalLayout1 from './vertical/CommonNavVerticalLayout1';
import CommonNavVerticalLayout2 from './vertical/CommonNavVerticalLayout2';
import CommonNavHorizontalCollapse from './horizontal/types/CommonNavHorizontalCollapse';
import CommonNavHorizontalGroup from './horizontal/types/CommonNavHorizontalGroup';
import CommonNavHorizontalItem from './horizontal/types/CommonNavHorizontalItem';
import CommonNavHorizontalLink from './horizontal/types/CommonNavHorizontalLink';
import CommonNavVerticalCollapse from './vertical/types/CommonNavVerticalCollapse';
import CommonNavVerticalGroup from './vertical/types/CommonNavVerticalGroup';
import CommonNavVerticalItem from './vertical/types/CommonNavVerticalItem';
import CommonNavVerticalLink from './vertical/types/CommonNavVerticalLink';
import { registerComponent } from './CommonNavItem';
import { CommonNavItemType } from './types/CommonNavItemType';

const inputGlobalStyles = (
	<GlobalStyles
		styles={() => ({
			'.popper-navigation-list': {
				'& .common-list-item': {
					padding: '8px 12px 8px 12px',
					height: 40,
					minHeight: 40,
					'& .common-list-item-text': {
						padding: '0 0 0 8px'
					}
				},
				'&.dense': {
					'& .common-list-item': {
						minHeight: 32,
						height: 32,
						'& .common-list-item-text': {
							padding: '0 0 0 8px'
						}
					}
				}
			}
		})}
	/>
);

/*
Register Common Navigation Components
 */
registerComponent('vertical-group', CommonNavVerticalGroup);
registerComponent('vertical-collapse', CommonNavVerticalCollapse);
registerComponent('vertical-item', CommonNavVerticalItem);
registerComponent('vertical-link', CommonNavVerticalLink);
registerComponent('horizontal-group', CommonNavHorizontalGroup);
registerComponent('horizontal-collapse', CommonNavHorizontalCollapse);
registerComponent('horizontal-item', CommonNavHorizontalItem);
registerComponent('horizontal-link', CommonNavHorizontalLink);
registerComponent('divider', () => <Divider className="my-16" />);
registerComponent('vertical-divider', () => <Divider className="my-16" />);
registerComponent('horizontal-divider', () => <Divider className="my-16" />);

export type CommonNavigationProps = {
	className?: string;
	dense?: boolean;
	active?: boolean;
	onItemClick?: (T: CommonNavItemType) => void;
	navigation?: CommonNavItemType[];
	layout?: 'horizontal' | 'vertical' | 'vertical-2';
	firstLevel?: boolean;
	selectedId?: string;
	checkPermission?: boolean;
};

/**
 * CommonNavigation
 * Component for displaying a navigation bar which contains CommonNavItem components
 * and acts as parent for providing props to its children components
 */
function CommonNavigation(props: CommonNavigationProps) {
	const { navigation, layout = 'vertical' } = props;

	if (!navigation || navigation.length === 0) {
		return null;
	}

	return (
		<>
			{inputGlobalStyles}
			{layout === 'horizontal' && (
				<CommonNavHorizontalLayout1
					checkPermission={false}
					{...props}
				/>
			)}
			{layout === 'vertical' && (
				<CommonNavVerticalLayout1
					checkPermission={false}
					{...props}
				/>
			)}
			{layout === 'vertical-2' && (
				<CommonNavVerticalLayout2
					checkPermission={false}
					{...props}
				/>
			)}
		</>
	);
}

export default memo(CommonNavigation);
