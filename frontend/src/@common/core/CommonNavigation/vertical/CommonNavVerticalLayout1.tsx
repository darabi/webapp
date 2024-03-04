import List from '@mui/material/List';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import CommonNavItem from '../CommonNavItem';
import { CommonNavigationProps } from '../CommonNavigation';
import { CommonNavItemType } from '../types/CommonNavItemType';

const StyledList = styled(List)(({ theme }) => ({
	'& .common-list-item': {
		'&:hover': {
			backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0,0,0,.04)'
		},
		'&:focus:not(.active)': {
			backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0,0,0,.05)'
		}
	},
	'& .common-list-item-text': {
		margin: 0
	},
	'& .common-list-item-text-primary': {
		lineHeight: '20px'
	},
	'&.active-square-list': {
		'& .common-list-item, & .active.common-list-item': {
			width: '100%',
			borderRadius: '0'
		}
	},
	'&.dense': {
		'& .common-list-item': {
			paddingTop: 0,
			paddingBottom: 0,
			height: 32
		}
	}
}));

/**
 * CommonNavVerticalLayout1
 * This component is used to render vertical navigations using
 * the Material-UI List component. It accepts the CommonNavigationProps props
 * and renders the CommonNavItem components accordingly
 */
function CommonNavVerticalLayout1(props: CommonNavigationProps) {
	const { navigation, active, dense, className, onItemClick, checkPermission } = props;

	function handleItemClick(item: CommonNavItemType) {
		onItemClick?.(item);
	}

	return (
		<StyledList
			className={clsx(
				'navigation whitespace-nowrap px-12 py-0',
				`active-${active}-list`,
				dense && 'dense',
				className
			)}
		>
			{navigation.map((_item) => (
				<CommonNavItem
					key={_item.id}
					type={`vertical-${_item.type}`}
					item={_item}
					nestedLevel={0}
					onItemClick={handleItemClick}
					checkPermission={checkPermission}
				/>
			))}
		</StyledList>
	);
}

export default CommonNavVerticalLayout1;
