import { useSelector } from 'react-redux';
import { useAppDispatch } from 'app/store/store';
import CommonShortcuts from '@common/core/CommonShortcuts';
import { selectIsUserGuest, selectUserShortcuts, setUserShortcuts } from 'app/auth/user/store/userSlice';
import { usePrevious } from '@common/hooks';
import { useEffect } from 'react';
import _ from '@lodash';
import { useAuth } from 'app/auth/AuthRouteProvider';
import withSlices from 'app/store/withSlices';
import { navigationSlice, selectFlatNavigation } from './store/navigationSlice';

type NavigationShortcutsProps = {
	className?: string;
	variant?: 'horizontal' | 'vertical';
};

/**
 * The navigation shortcuts.
 */
function NavigationShortcuts(props: NavigationShortcutsProps) {
	const { variant, className } = props;
	const dispatch = useAppDispatch();
	const navigation = useSelector(selectFlatNavigation);

	const userShortcuts = useSelector(selectUserShortcuts) || [];
	const isUserGuest = useSelector(selectIsUserGuest);
	const prevUserShortcuts = usePrevious(userShortcuts);

	const { updateUser: updateUserService } = useAuth();

	useEffect(() => {
		if (!isUserGuest && prevUserShortcuts && !_.isEqual(userShortcuts, prevUserShortcuts)) {
			updateUserService({ data: { shortcuts: userShortcuts } });
		}
	}, [isUserGuest, userShortcuts]);

	function handleShortcutsChange(newShortcuts: string[]) {
		dispatch(setUserShortcuts(newShortcuts));
	}

	return (
		<CommonShortcuts
			className={className}
			variant={variant}
			navigation={navigation}
			shortcuts={userShortcuts}
			onChange={handleShortcutsChange}
		/>
	);
}

export default withSlices<NavigationShortcutsProps>([navigationSlice])(NavigationShortcuts);
