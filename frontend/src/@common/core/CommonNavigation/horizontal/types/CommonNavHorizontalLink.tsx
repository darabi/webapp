import { styled } from '@mui/material/styles';
import ListItemText from '@mui/material/ListItemText';
import clsx from 'clsx';
import { memo, useMemo } from 'react';
import withRouter from '@common/core/withRouter';
import { Link, ListItemButton, ListItemButtonProps } from '@mui/material';
import { WithRouterProps } from '@common/core/withRouter/withRouter';
import CommonNavBadge from '../../CommonNavBadge';
import CommonSvgIcon from '../../../CommonSvgIcon';
import { CommonNavItemComponentProps } from '../../CommonNavItem';

const Root = styled(ListItemButton)<ListItemButtonProps>(({ theme }) => ({
	color: theme.palette.text.primary,
	textDecoration: 'none!important',
	minHeight: 48,
	'&.active': {
		backgroundColor: `${theme.palette.secondary.main}!important`,
		color: `${theme.palette.secondary.contrastText}!important`,
		pointerEvents: 'none',
		'& .common-list-item-text-primary': {
			color: 'inherit'
		},
		'& .common-list-item-icon': {
			color: 'inherit'
		}
	},
	'& .common-list-item-icon': {},
	'& .common-list-item-text': {
		padding: '0 0 0 16px'
	}
}));

type CommonNavHorizontalLinkProps = CommonNavItemComponentProps & WithRouterProps;

/*
 * CommonNavHorizontalLink
 * This is a component to render horizontal navigation links in the Common navigations.
 * It receieves `CommonNavItemComponentProps` and `WithRouterProps` as props.
 */
function CommonNavHorizontalLink(props: CommonNavHorizontalLinkProps) {
	const { item, checkPermission } = props;

	let itemProps;

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
				className={clsx('common-list-item')}
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
					classes={{ primary: 'text-13 common-list-item-text-primary truncate' }}
				/>

				{item.badge && (
					<CommonNavBadge
						className="ltr:ml-8 rtl:mr-8"
						badge={item.badge}
					/>
				)}
			</Root>
		),
		[item.badge, item.icon, item.iconClass, item.target, item.title, item.url]
	);
}

const NavHorizontalLink = withRouter(memo(CommonNavHorizontalLink));

export default NavHorizontalLink;
