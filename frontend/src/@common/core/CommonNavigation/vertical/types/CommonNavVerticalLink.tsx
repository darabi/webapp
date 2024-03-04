import { styled } from '@mui/material/styles';
import ListItemText from '@mui/material/ListItemText';
import clsx from 'clsx';
import { useMemo } from 'react';
import { Link, ListItemButton, ListItemButtonProps } from '@mui/material';
import CommonNavBadge from '../../CommonNavBadge';
import CommonSvgIcon from '../../../CommonSvgIcon';
import { CommonNavItemComponentProps } from '../../CommonNavItem';

type ListItemButtonStyleProps = ListItemButtonProps & {
	itempadding: number;
};

const Root = styled(ListItemButton)<ListItemButtonStyleProps>(({ theme, ...props }) => ({
	minHeight: 44,
	width: '100%',
	borderRadius: '6px',
	margin: '0 0 4px 0',
	paddingRight: 16,
	paddingLeft: props.itempadding > 80 ? 80 : props.itempadding,
	paddingTop: 10,
	paddingBottom: 10,
	'&.active': {
		backgroundColor: `${theme.palette.secondary.main}!important`,
		color: `${theme.palette.secondary.contrastText}!important`,
		pointerEvents: 'none',
		transition: 'border-radius .15s cubic-bezier(0.4,0.0,0.2,1)',
		'& > .common-list-item-text-primary': {
			color: 'inherit'
		},
		'& > .common-list-item-icon': {
			color: 'inherit'
		}
	},
	'& > .common-list-item-icon': {
		marginRight: 16
	},
	'& > .common-list-item-text': {},
	color: theme.palette.text.primary,
	textDecoration: 'none!important'
}));

/**
 * CommonNavVerticalLink
 * Create a vertical Link to use inside the navigation component.
 */
function CommonNavVerticalLink(props: CommonNavItemComponentProps) {
	const { item, nestedLevel = 0, onItemClick, checkPermission } = props;

	const itempadding = nestedLevel > 0 ? 38 + nestedLevel * 16 : 16;

	let itemProps = {};

	const component = item.url ? Link : 'li';

	if (typeof component !== 'string') {
		itemProps = {
			disabled: item.disabled,
			href: item.url,
			role: 'button',
			target: item.target ? item.target : '_blank'
		};
	}

	if (checkPermission && !item?.hasPermission) {
		return null;
	}

	return useMemo(
		() => (
			<Root
				component={component}
				className="common-list-item"
				onClick={() => onItemClick && onItemClick(item)}
				itempadding={itempadding}
				sx={item.sx}
				{...itemProps}
			>
				{item.icon && (
					<CommonSvgIcon
						className={clsx('common-list-item-icon shrink-0', item.iconClass)}
						color="action"
					>
						{item.icon}
					</CommonSvgIcon>
				)}

				<ListItemText
					className="common-list-item-text"
					primary={item.title}
					secondary={item.subtitle}
					classes={{
						primary: 'text-13 font-medium common-list-item-text-primary truncate',
						secondary: 'text-11 font-medium common-list-item-text-secondary leading-normal truncate'
					}}
				/>

				{item.badge && <CommonNavBadge badge={item.badge} />}
			</Root>
		),
		[item, itempadding, onItemClick, checkPermission]
	);
}

const NavVerticalLink = CommonNavVerticalLink;

export default NavVerticalLink;
