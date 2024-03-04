import CommonNavigation from '@common/core/CommonNavigation';
import clsx from 'clsx';
import { useMemo } from 'react';
import { useAppDispatch } from 'app/store/store';
import useThemeMediaQuery from '@common/hooks/useThemeMediaQuery';
import { CommonNavigationProps } from '@common/core/CommonNavigation/CommonNavigation';
import { useSelector } from 'react-redux';
import withSlices from 'app/store/withSlices';
import { navigationSlice, selectNavigation } from './store/navigationSlice';
import { navbarCloseMobile } from '../navbar/store/navbarSlice';

/**
 * Navigation
 */

type NavigationProps = Partial<CommonNavigationProps>;

function Navigation(props: NavigationProps) {
	const { className = '', layout = 'vertical', dense, active } = props;

	const navigation = useSelector(selectNavigation);

	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

	const dispatch = useAppDispatch();

	return useMemo(() => {
		function handleItemClick() {
			if (isMobile) {
				dispatch(navbarCloseMobile());
			}
		}

		return (
			<CommonNavigation
				className={clsx('navigation flex-1', className)}
				navigation={navigation}
				layout={layout}
				dense={dense}
				active={active}
				onItemClick={handleItemClick}
				checkPermission
			/>
		);
	}, [dispatch, isMobile, navigation, active, className, dense, layout]);
}

export default withSlices<NavigationProps>([navigationSlice])(Navigation);
